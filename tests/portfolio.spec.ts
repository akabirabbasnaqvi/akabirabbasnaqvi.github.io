import { expect, test } from "@playwright/test";

test("portfolio has eleven implemented projects and complete profile actions", async ({ page }, testInfo) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText("Akabir Abbas");
  await expect(page.locator(".wordmark__text")).toHaveText("AAs");
  await expect(page.locator(".project-row")).toHaveCount(11);
  await expect(page.getByText("Project Pilot AI")).toHaveCount(0);
  await expect(page.getByText("11 verified projects")).toBeVisible();
  await expect(page.getByText(/11 active projects/)).toBeVisible();
  await expect(page.getByRole("heading", { level: 3, name: "RetailOps Reporting Suite" })).toBeVisible();
  await expect(page.locator(".hero__profile")).toHaveCount(0);
  await expect(page.getByRole("link", { name: /Download resume/ })).toHaveAttribute("href", "./assets/resume.pdf");
  await expect(page.getByRole("link", { name: "Connect on LinkedIn" })).toHaveAttribute("href", "https://www.linkedin.com/in/akabir-abbas/");
  await expect(page.getByRole("link", { name: "Hire me on Fiverr" })).toHaveAttribute("href", "https://www.fiverr.com/users/akabir_abbas");
  await expect(page.getByRole("link", { name: "WhatsApp +92 303 3224737" })).toHaveAttribute("href", "https://wa.me/923033224737");
  await expect(page.getByRole("link", { name: "abbasakabir@gmail.com" })).toHaveAttribute("href", "mailto:abbasakabir@gmail.com");

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);

  for (const section of await page.locator(".reveal-section").all()) {
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(120);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(2_700);

  const screenshot = testInfo.outputPath("portfolio.png");
  const viewportScreenshot = testInfo.outputPath("viewport.png");
  await page.screenshot({ path: screenshot, fullPage: true });
  await page.screenshot({ path: viewportScreenshot });
  await testInfo.attach("portfolio", { path: screenshot, contentType: "image/png" });
  await testInfo.attach("viewport", { path: viewportScreenshot, contentType: "image/png" });
});

test("navigation switches cleanly between desktop and mobile", async ({ page }, testInfo) => {
  await page.goto("/");

  const desktopNav = page.locator(".site-nav");
  const mobileMenu = page.locator(".mobile-nav");

  if (testInfo.project.name === "mobile") {
    await expect(desktopNav).toBeHidden();
    await expect(mobileMenu).toBeVisible();
    await expect(page.locator(".mobile-nav__panel")).toBeHidden();
    await page.getByText("Menu", { exact: true }).click();
    await expect(page.locator(".mobile-nav__panel")).toBeVisible();
  } else {
    await expect(desktopNav).toBeVisible();
    await expect(mobileMenu).toBeHidden();
  }
});

test("keyboard users can reach the project index", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByText("Skip to project index")).toBeFocused();
  await expect(page.getByText("Skip to project index")).toHaveCSS("top", "16px");
  await page.keyboard.press("Enter");
  await expect(page.locator("#work")).toBeInViewport();
});

test("has clear landmarks, responsive canvas behavior, and no runtime errors", async ({ page }, testInfo) => {
  const browserErrors: string[] = [];
  page.on("pageerror", (error) => browserErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") browserErrors.push(message.text());
  });

  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();
  await expect(page.locator("canvas#hero-canvas")).toHaveCount(1);
  await expect(page.locator("img.hero__profile")).toHaveCount(0);
  if (testInfo.project.name === "mobile") {
    await expect(page.locator(".neural-network-shell")).toBeHidden();
  } else {
    await expect(page.locator(".neural-network-shell")).toBeVisible();
    const firstFrame = await page.locator("#hero-canvas").screenshot();
    await page.waitForTimeout(160);
    const laterFrame = await page.locator("#hero-canvas").screenshot();
    expect(laterFrame.equals(firstFrame)).toBe(false);
  }
  expect(browserErrors).toEqual([]);

  const network = await page.evaluate(() => {
    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
    return {
      externalRequests: resources.filter((resource) => !resource.name.startsWith(window.location.origin)).length,
      mediaRequests: resources.filter((resource) => ["img", "video", "audio"].includes(resource.initiatorType)).length,
      totalTransferBytes: resources.reduce((sum, resource) => sum + resource.transferSize, 0),
    };
  });

  expect(network.externalRequests).toBe(0);
  expect(network.mediaRequests).toBeLessThanOrEqual(1);
  expect(network.totalTransferBytes).toBeLessThan(1_500_000);
});

test("typewriter and skill reveals complete without external libraries", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(2_700);

  await expect(page.locator("[data-typewriter]")).toHaveText("AI & Software Engineer");
  await expect(page.locator("[data-typewriter]")).toHaveClass(/typewriter-complete/);
  await expect(page.locator(".skill-pill")).toHaveCount(34);
  await page.locator("#skills").scrollIntoViewIfNeeded();
  await expect(page.locator("#skills")).toHaveClass(/in-view/);
});

test("reduced motion keeps all content visible and freezes motion enhancements", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.locator("[data-typewriter]")).toHaveText("AI & Software Engineer");
  await expect(page.locator("html")).not.toHaveClass(/motion-enhanced/);
  await expect(page.getByText("11 verified projects")).toBeVisible();
  await expect(page.locator(".cursor-orb")).toBeHidden();
  if (testInfo.project.name === "desktop") {
    const firstFrame = await page.locator("#hero-canvas").screenshot();
    await page.waitForTimeout(200);
    const laterFrame = await page.locator("#hero-canvas").screenshot();
    expect(laterFrame.equals(firstFrame)).toBe(true);
  }
});

test("dark mode, sticky navigation, and scroll progress remain polished", async ({ page }, testInfo) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");

  await page.evaluate(() => window.scrollTo(0, Math.round(window.innerHeight * 0.9)));
  await page.waitForTimeout(200);

  await expect(page.locator(".site-header")).toHaveClass(/is-scrolled/);
  const progressTransform = await page.locator(".scroll-progress").evaluate((element) => getComputedStyle(element).transform);
  expect(progressTransform).not.toBe("none");

  const screenshot = testInfo.outputPath("dark-viewport.png");
  await page.screenshot({ path: screenshot });
  await testInfo.attach("dark viewport", { path: screenshot, contentType: "image/png" });
});
