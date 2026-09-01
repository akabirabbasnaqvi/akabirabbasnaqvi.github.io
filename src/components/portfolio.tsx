import { ArrowUpRight, Mark } from "@/components/icons";
import { PortfolioEffects } from "@/components/portfolio-effects";
import { featuredProjects, projects, type Project } from "@/content/projects";

const githubProfile = "https://github.com/akabirabbasnaqvi";
const linkedInProfile = "https://www.linkedin.com/in/akabir-abbas/";
const fiverrProfile = "https://www.fiverr.com/users/akabir_abbas";
const emailAddress = "abbasakabir@gmail.com";

const skillGroups = [
  { label: "Languages", skills: ["Python", "JavaScript", "TypeScript", "Java", "C/C++", "Kotlin", "SQL", "Dart"] },
  { label: "AI / ML", skills: ["scikit-learn", "Computer Vision", "MLOps", "NLP", "Pandas", "NumPy", "PyTorch", "TensorFlow", "Keras"] },
  { label: "Web", skills: ["React", "Next.js", "Flask", "FastAPI", "Tailwind CSS"] },
  { label: "Tools", skills: ["Docker", "Kubernetes", "Redis", "PostgreSQL", "SQLite", "Git", "FFmpeg", "Celery"] },
  { label: "Desktop", skills: ["Electron", "CustomTkinter", "Eel", "PyInstaller"] },
] as const;

function ProjectLink({ project }: Readonly<{ project: Project }>) {
  if (project.visibility === "private") {
    return <span className="project-access">Private case study</span>;
  }

  return (
    <a aria-label={`Open ${project.title} on GitHub`} className="project-access project-access--link" href={project.repository} rel="noreferrer" target="_blank">
      Repository <ArrowUpRight className="icon" />
    </a>
  );
}

function ProjectTags({ project }: Readonly<{ project: Project }>) {
  return (
    <ul aria-label={`Technologies used in ${project.title}`} className="tag-list">
      {project.technologies.map((technology) => (
        <li key={technology}>{technology}</li>
      ))}
    </ul>
  );
}

function NeuralNetwork() {
  return (
    <div aria-hidden="true" className="neural-network-shell">
      <canvas id="hero-canvas" />
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a aria-label="Akabir Abbas - back to top" className="wordmark" href="#top">
        <Mark className="wordmark__mark" />
        <span className="wordmark__text">AAs</span>
      </a>
      <nav aria-label="Primary navigation" className="site-nav">
        <a href="#work">Work</a>
        <a href="#approach">Approach</a>
        <a href="#contact">Contact</a>
      </nav>
      <details className="mobile-nav">
        <summary>Menu</summary>
        <nav aria-label="Primary navigation" className="mobile-nav__panel">
          <a href="#work">Work</a>
          <a href="#approach">Approach</a>
          <a href="#contact">Contact</a>
        </nav>
      </details>
      <a className="header-link" href={githubProfile} rel="noreferrer" target="_blank">
        GitHub <ArrowUpRight className="icon" />
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__copy">
        <div className="hero__identity">
          {/* This stays a plain image so the static profile asset can be replaced directly. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Akabir Abbas" className="hero__profile" decoding="async" fetchPriority="high" height="112" src="./assets/profile.jpg" width="112" />
          <h1>
            <span className="hero__name">Akabir Abbas</span>
            <span aria-label="AI and Software Engineer" className="hero__role">
              <span aria-hidden="true" data-typewriter>AI &amp; Software Engineer</span>
            </span>
          </h1>
        </div>
        <p className="hero__lede">I build pragmatic AI, data, and web systems for complex operational work.</p>
        <div className="hero__actions">
          <a className="button button--primary" href="#work">
            View work <ArrowUpRight className="icon" />
          </a>
          <a className="button button--secondary" download href="./assets/resume.pdf">
            Download resume <ArrowUpRight className="icon" />
          </a>
          <a className="text-link" href="#approach">
            Engineering approach <ArrowUpRight className="icon" />
          </a>
        </div>
      </div>
      <NeuralNetwork />
      <div aria-label="Portfolio evidence" className="hero__proof">
        <span><strong data-project-count="11">11</strong> verified projects</span>
        <span><strong data-project-count="11">11</strong> active projects · public and confidential work</span>
      </div>
    </section>
  );
}

function FeaturedWork() {
  return (
    <section className="section section--work reveal-section" id="work">
      <div className="section-heading">
        <h2 className="animated-heading">Selected systems built for daily use.</h2>
        <p>Four projects that show practical engineering across operations, machine learning, and product software.</p>
      </div>
      <div className="featured-grid">
        {featuredProjects.map((project, index) => (
          <article
            className={`featured-project featured-project--${index + 1} stagger-item`}
            key={project.id}
            style={{ "--project-tone": project.tone, "--stagger-index": index } as React.CSSProperties}
          >
            <div className="featured-project__topline">
              <span>{project.id}</span>
              <span>{project.category}</span>
            </div>
            <div className="featured-project__body">
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
            </div>
            <div className="featured-project__bottom">
              <ProjectTags project={project} />
              <ProjectLink project={project} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectIndex() {
  return (
    <section aria-labelledby="project-index-heading" className="section project-index reveal-section">
      <div className="section-heading section-heading--index">
        <h2 className="animated-heading" id="project-index-heading">A working index of real software.</h2>
        <p>Private work is intentionally described at a high level and never links to a restricted repository.</p>
      </div>
      <ol className="project-list">
        {projects.map((project, index) => (
          <li
            className="project-row stagger-item"
            key={project.id}
            style={{ "--project-tone": project.tone, "--stagger-index": index } as React.CSSProperties}
          >
            <span aria-hidden="true" className="project-row__number">{project.id}</span>
            <div className="project-row__main">
              <div className="project-row__titleline">
                <h3>{project.title}</h3>
                <span>{project.category}</span>
              </div>
              <p>{project.detail}</p>
            </div>
            <div className="project-row__meta">
              <ProjectTags project={project} />
              <ProjectLink project={project} />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Skills() {
  return (
    <section aria-labelledby="skills-heading" className="section skills reveal-section" id="skills">
      <div className="section-heading">
        <h2 className="animated-heading" id="skills-heading">Skills &amp; Technologies</h2>
        <p>A practical toolkit spanning model development, product engineering, data infrastructure, and desktop delivery.</p>
      </div>
      <div className="skills-grid">
        {skillGroups.map((group, groupIndex) => {
          const skillOffset = skillGroups
            .slice(0, groupIndex)
            .reduce((total, previousGroup) => total + previousGroup.skills.length, 0);

          return (
            <article
              className="skill-group stagger-item"
              key={group.label}
              style={{ "--stagger-index": groupIndex } as React.CSSProperties}
            >
              <h3>{group.label}</h3>
              <ul>
                {group.skills.map((skill, index) => (
                  <li className="skill-pill" key={skill} style={{ "--skill-index": skillOffset + index } as React.CSSProperties}>
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section className="section approach reveal-section" id="approach">
      <div className="approach__intro">
        <p className="section-kicker">How I work</p>
        <h2 className="animated-heading">From a real workflow to a dependable system.</h2>
        <p>I focus on the signal a person needs, then choose the smallest capable system that can deliver it.</p>
      </div>
      <div className="principle-list">
        <article className="stagger-item" style={{ "--stagger-index": 0 } as React.CSSProperties}>
          <span>Discover</span>
          <h3>Start with the real workflow.</h3>
          <p>Operations, reporting, assessment, and monitoring are designed around the actual decisions people need to make.</p>
        </article>
        <article className="stagger-item" style={{ "--stagger-index": 1 } as React.CSSProperties}>
          <span>Engineer</span>
          <h3>Choose the smallest capable stack.</h3>
          <p>From offline SQLite apps to queue-backed services, the architecture fits the environment rather than chasing novelty.</p>
        </article>
        <article className="stagger-item" style={{ "--stagger-index": 2 } as React.CSSProperties}>
          <span>Clarify</span>
          <h3>Make the important state visible.</h3>
          <p>Good interfaces surface priorities, drift, stock, deadlines, and report-ready outcomes before users need to ask.</p>
        </article>
      </div>
      <div className="capability-strip" role="list">
        <span role="listitem">Product systems</span>
        <span role="listitem">AI &amp; machine learning</span>
        <span role="listitem">Data workflows</span>
        <span role="listitem">Desktop software</span>
        <span role="listitem">Web engineering</span>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact reveal-section" id="contact">
      <div>
        <p className="section-kicker">Let&apos;s connect</p>
        <h2 className="animated-heading">Build the next useful system.</h2>
      </div>
      <div className="contact-links">
        <a className="contact-link" href={linkedInProfile} rel="noreferrer" target="_blank">
          <span>Connect on LinkedIn</span>
          <ArrowUpRight className="contact-link__icon" />
        </a>
        <a className="contact-link" href={githubProfile} rel="noreferrer" target="_blank">
          <span>Find me on GitHub</span>
          <ArrowUpRight className="contact-link__icon" />
        </a>
        <a className="contact-link" href={fiverrProfile} rel="noreferrer" target="_blank">
          <span>Hire me on Fiverr</span>
          <ArrowUpRight className="contact-link__icon" />
        </a>
        <a className="contact-link" href={`mailto:${emailAddress}`}>
          <span>{emailAddress}</span>
          <ArrowUpRight className="contact-link__icon" />
        </a>
      </div>
    </section>
  );
}

export function Portfolio() {
  return (
    <>
      <PortfolioEffects />
      <div aria-hidden="true" className="scroll-progress" />
      <div aria-hidden="true" className="cursor-orb" />
      <a className="skip-link" href="#work">Skip to project index</a>
      <div className="page-shell">
        <Header />
        <main>
          <Hero />
          <FeaturedWork />
          <ProjectIndex />
          <Skills />
          <Approach />
          <Contact />
        </main>
        <footer className="site-footer">
          <span>© {new Date().getFullYear()} Akabir Abbas</span>
          <span>AI and software engineering</span>
        </footer>
      </div>
    </>
  );
}
