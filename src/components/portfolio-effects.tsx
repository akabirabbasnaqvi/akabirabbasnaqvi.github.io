"use client";

import { useEffect } from "react";

type Particle = {
  colorMix: number;
  size: number;
  vx: number;
  vy: number;
  vz: number;
  x: number;
  y: number;
  z: number;
};

type ProjectedParticle = Particle & {
  depth: number;
  scale: number;
  screenX: number;
  screenY: number;
  source: Particle;
};

const TYPEWRITER_TEXT = "AI & Software Engineer";

function initializeTypewriter(reducedMotion: boolean) {
  const target = document.querySelector<HTMLElement>("[data-typewriter]");
  if (!target || reducedMotion) return () => undefined;

  const timeouts = new Set<number>();
  target.textContent = "";

  const typeNext = (index: number) => {
    target.textContent = TYPEWRITER_TEXT.slice(0, index);
    if (index <= TYPEWRITER_TEXT.length) {
      const timeout = window.setTimeout(() => typeNext(index + 1), 80);
      timeouts.add(timeout);
      return;
    }
    target.classList.add("typewriter-complete");
  };

  const startTimeout = window.setTimeout(() => typeNext(1), 600);
  timeouts.add(startTimeout);

  return () => {
    timeouts.forEach((timeout) => window.clearTimeout(timeout));
    target.textContent = TYPEWRITER_TEXT;
    target.classList.remove("typewriter-complete");
  };
}

function initializeCounters(reducedMotion: boolean) {
  const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-project-count]"));
  if (reducedMotion || counters.length === 0) return () => undefined;

  let animationFrame = 0;
  let startTime = 0;
  const duration = 2_000;
  const delay = window.setTimeout(() => {
    counters.forEach((counter) => {
      counter.textContent = "0";
    });

    const update = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counters.forEach((counter) => {
        const target = Number(counter.dataset.projectCount ?? "11");
        counter.textContent = String(Math.round(target * eased));
      });
      if (progress < 1) animationFrame = window.requestAnimationFrame(update);
    };

    animationFrame = window.requestAnimationFrame(update);
  }, 1_200);

  return () => {
    window.clearTimeout(delay);
    window.cancelAnimationFrame(animationFrame);
    counters.forEach((counter) => {
      counter.textContent = counter.dataset.projectCount ?? "11";
    });
  };
}

function initializeSectionReveals(reducedMotion: boolean) {
  if (reducedMotion || !("IntersectionObserver" in window)) return () => undefined;

  document.documentElement.classList.add("motion-enhanced");
  const sections = Array.from(document.querySelectorAll<HTMLElement>(".reveal-section"));
  const headings = Array.from(document.querySelectorAll<HTMLElement>(".animated-heading"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in-view");
        if (entry.target instanceof HTMLElement) {
          entry.target.querySelectorAll(".animated-heading").forEach((heading) => heading.classList.add("in-view"));
        }
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 },
  );

  sections.forEach((section) => observer.observe(section));
  headings.filter((heading) => !heading.closest(".reveal-section")).forEach((heading) => observer.observe(heading));

  return () => {
    observer.disconnect();
    document.documentElement.classList.remove("motion-enhanced");
    [...sections, ...headings].forEach((element) => element.classList.remove("in-view"));
  };
}

function initializeCardTilt(reducedMotion: boolean, touchOnly: boolean) {
  if (reducedMotion || touchOnly) return () => undefined;

  const cards = Array.from(document.querySelectorAll<HTMLElement>(".featured-project"));
  const cleanups = cards.map((card) => {
    const move = (event: PointerEvent) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      card.style.setProperty("--tilt-x", `${(-y * 16).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${(x * 16).toFixed(2)}deg`);
    };
    const reset = () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    };

    card.addEventListener("pointermove", move);
    card.addEventListener("pointerleave", reset);
    return () => {
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", reset);
      reset();
    };
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}

function initializeCursorTrail(reducedMotion: boolean, touchOnly: boolean) {
  const orb = document.querySelector<HTMLElement>(".cursor-orb");
  if (!orb || reducedMotion || touchOnly) return () => undefined;

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  let animationFrame = 0;
  let idleTimeout = 0;

  const move = (event: PointerEvent) => {
    targetX = event.clientX;
    targetY = event.clientY;
    orb.classList.add("is-visible");
    window.clearTimeout(idleTimeout);
    idleTimeout = window.setTimeout(() => orb.classList.remove("is-visible"), 1_000);
  };

  const render = () => {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    orb.style.transform = `translate3d(${currentX - 6}px, ${currentY - 6}px, 0)`;
    animationFrame = window.requestAnimationFrame(render);
  };

  window.addEventListener("pointermove", move, { passive: true });
  animationFrame = window.requestAnimationFrame(render);

  return () => {
    window.removeEventListener("pointermove", move);
    window.clearTimeout(idleTimeout);
    window.cancelAnimationFrame(animationFrame);
  };
}

function initializeScrollChrome(reducedMotion: boolean) {
  const header = document.querySelector<HTMLElement>(".site-header");
  const progress = document.querySelector<HTMLElement>(".scroll-progress");
  if (!header || !progress) return () => undefined;

  let ticking = false;
  let animationFrame = 0;
  const update = () => {
    const scrollTop = window.scrollY;
    const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const ratio = Math.min(Math.max(scrollTop / scrollable, 0), 1);
    header.classList.toggle("is-scrolled", scrollTop > 50);
    progress.style.transform = `scaleX(${ratio})`;
    ticking = false;
  };
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    animationFrame = window.requestAnimationFrame(update);
  };

  if (reducedMotion) progress.style.transition = "none";
  window.addEventListener("scroll", onScroll, { passive: true });
  update();

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.cancelAnimationFrame(animationFrame);
    header.classList.remove("is-scrolled");
    progress.style.transform = "scaleX(0)";
  };
}

function initializeNeuralCanvas(reducedMotion: boolean, mobile: boolean) {
  const canvas = document.querySelector<HTMLCanvasElement>("#hero-canvas");
  const hero = document.querySelector<HTMLElement>(".hero");
  if (!canvas || !hero || mobile) return () => undefined;

  const context = canvas.getContext("2d");
  if (!context) return () => undefined;

  let width = 0;
  let height = 0;
  let angle = 0;
  let animationFrame = 0;
  let pointerX: number | null = null;
  let pointerY: number | null = null;
  let particles: Particle[] = [];

  const createParticles = () => {
    const spreadX = width * 0.72;
    const spreadY = height * 0.72;
    particles = Array.from({ length: 60 }, () => ({
      colorMix: Math.random(),
      size: 2 + Math.random() * 2,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      vz: (Math.random() - 0.5) * 0.08,
      x: (Math.random() - 0.5) * spreadX,
      y: (Math.random() - 0.5) * spreadY,
      z: (Math.random() - 0.5) * 260,
    }));
  };

  const resize = () => {
    const bounds = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    width = Math.max(bounds.width, 1);
    height = Math.max(bounds.height, 1);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    createParticles();
    draw(false);
  };

  const project = (particle: Particle): ProjectedParticle => {
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    const rotatedX = particle.x * cosine - particle.z * sine;
    const rotatedZ = particle.x * sine + particle.z * cosine;
    const focalLength = 440;
    const scale = focalLength / Math.max(focalLength + rotatedZ, 180);
    return {
      ...particle,
      depth: rotatedZ,
      scale,
      screenX: width / 2 + rotatedX * scale,
      screenY: height / 2 + particle.y * scale,
      source: particle,
    };
  };

  const updateParticles = () => {
    const boundX = width * 0.4;
    const boundY = height * 0.4;
    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.z += particle.vz;
      if (Math.abs(particle.x) > boundX) particle.vx *= -1;
      if (Math.abs(particle.y) > boundY) particle.vy *= -1;
      if (Math.abs(particle.z) > 150) particle.vz *= -1;
    });
  };

  const draw = (advance: boolean) => {
    if (advance) {
      angle += 0.002;
      updateParticles();
    }

    context.clearRect(0, 0, width, height);
    const projected = particles.map(project).sort((a, b) => b.depth - a.depth);
    context.globalCompositeOperation = "lighter";

    for (let first = 0; first < projected.length; first += 1) {
      for (let second = first + 1; second < projected.length; second += 1) {
        const dx = projected[first].screenX - projected[second].screenX;
        const dy = projected[first].screenY - projected[second].screenY;
        const distance = Math.hypot(dx, dy);
        if (distance >= 120) continue;
        context.beginPath();
        context.moveTo(projected[first].screenX, projected[first].screenY);
        context.lineTo(projected[second].screenX, projected[second].screenY);
        context.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - distance / 120)})`;
        context.lineWidth = 0.75;
        context.stroke();
      }
    }

    projected.forEach((particle) => {
      if (pointerX !== null && pointerY !== null && advance) {
        const dx = particle.screenX - pointerX;
        const dy = particle.screenY - pointerY;
        const distance = Math.hypot(dx, dy);
        if (distance > 0 && distance < 100) {
          const force = (1 - distance / 100) * 0.035;
          particle.source.x += (dx / distance) * force * 18;
          particle.source.y += (dy / distance) * force * 18;
        }
      }

      const red = Math.round(99 + (129 - 99) * particle.colorMix);
      const green = Math.round(102 + (140 - 102) * particle.colorMix);
      const blue = Math.round(241 + (248 - 241) * particle.colorMix);
      const radius = Math.max(1.5, particle.size * particle.scale);
      const glow = context.createRadialGradient(
        particle.screenX,
        particle.screenY,
        0,
        particle.screenX,
        particle.screenY,
        radius * 3.2,
      );
      glow.addColorStop(0, `rgba(${red}, ${green}, ${blue}, 0.95)`);
      glow.addColorStop(0.34, `rgba(${red}, ${green}, ${blue}, 0.58)`);
      glow.addColorStop(1, `rgba(${red}, ${green}, ${blue}, 0)`);
      context.beginPath();
      context.arc(particle.screenX, particle.screenY, radius * 3.2, 0, Math.PI * 2);
      context.fillStyle = glow;
      context.fill();
      context.beginPath();
      context.arc(particle.screenX, particle.screenY, radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(${red}, ${green}, ${blue}, 0.95)`;
      context.fill();
    });

    context.globalCompositeOperation = "source-over";
  };

  const render = () => {
    draw(true);
    animationFrame = window.requestAnimationFrame(render);
  };

  const handlePointerMove = (event: PointerEvent) => {
    const bounds = canvas.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    if (x < 0 || y < 0 || x > bounds.width || y > bounds.height) {
      pointerX = null;
      pointerY = null;
      return;
    }
    pointerX = x;
    pointerY = y;
  };

  const handlePointerLeave = () => {
    pointerX = null;
    pointerY = null;
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  hero.addEventListener("pointermove", handlePointerMove, { passive: true });
  hero.addEventListener("pointerleave", handlePointerLeave);
  resize();
  if (!reducedMotion) animationFrame = window.requestAnimationFrame(render);

  return () => {
    resizeObserver.disconnect();
    hero.removeEventListener("pointermove", handlePointerMove);
    hero.removeEventListener("pointerleave", handlePointerLeave);
    window.cancelAnimationFrame(animationFrame);
    context.clearRect(0, 0, width, height);
  };
}

export function PortfolioEffects() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touchOnly = window.matchMedia("(hover: none)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;

    const cleanups = [
      initializeTypewriter(reducedMotion),
      initializeCounters(reducedMotion),
      initializeSectionReveals(reducedMotion),
      initializeCardTilt(reducedMotion, touchOnly),
      initializeCursorTrail(reducedMotion, touchOnly),
      initializeScrollChrome(reducedMotion),
      initializeNeuralCanvas(reducedMotion, mobile),
    ];

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return null;
}
