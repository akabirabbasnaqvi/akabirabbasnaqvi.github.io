import { expect, test } from "@playwright/test";

test("portfolio has the verified project index and no overflow", async ({ page }, testInfo) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText("Akabir Abbas");
  await expect(page.getByText("AI & Software Engineer", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Shopkeeper POS" })).toBeVisible();
  await expect(page.getByText("Private case study").first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Connect on LinkedIn" })).toHaveAttribute("href", "https://www.linkedin.com/in/akabir-abbas/");

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);

  const screenshot = testInfo.outputPath("portfolio.png");
  const viewportScreenshot = testInfo.outputPath("viewport.png");
  await page.screenshot({ path: screenshot, fullPage: true });
  await page.screenshot({ path: viewportScreenshot });
  await testInfo.attach("portfolio", { path: screenshot, contentType: "image/png" });
  await testInfo.attach("viewport", { path: viewportScreenshot, contentType: "image/png" });
});

test("keyboard users can reach the project index", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByText("Skip to project index")).toBeFocused();
  await expect(page.getByText("Skip to project index")).toHaveCSS("top", "16px");
  await page.keyboard.press("Enter");
  await expect(page.locator("#work")).toBeInViewport();
});

test("has clear document landmarks and no runtime errors", async ({ page }, testInfo) => {
  const browserErrors: string[] = [];
  page.on("pageerror", (error) => browserErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") browserErrors.push(message.text());
  });

  await page.goto("/", { waitUntil: "networkidle" });

  if (testInfo.project.name === "mobile") {
    await page.getByText("Menu", { exact: true }).click();
  }

  await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.locator("video, img")).toHaveCount(0);
  expect(browserErrors).toEqual([]);

  const network = await page.evaluate(() => {
    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
    return {
      mediaRequests: resources.filter((resource) => ["img", "video", "audio"].includes(resource.initiatorType)).length,
      totalTransferBytes: resources.reduce((sum, resource) => sum + resource.transferSize, 0),
    };
  });

  expect(network.mediaRequests).toBe(0);
  expect(network.totalTransferBytes).toBeLessThan(1_500_000);
});

test("uses a stable static project map without WebGL", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.getByText("12 active projects")).toBeVisible();
});

test("keeps the systems palette and scroll animation in dark mode", async ({ page }, testInfo) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText("Akabir Abbas");
  await expect(page.locator("canvas")).toHaveCount(0);

  const theme = await page.evaluate(() => ({
    background: getComputedStyle(document.body).backgroundColor,
    supportsScrollTimeline: CSS.supports("animation-timeline: view()"),
  }));

  expect(theme.background).not.toBe("rgb(237, 240, 237)");
  expect(theme.supportsScrollTimeline).toBe(true);

  const screenshot = testInfo.outputPath("dark-viewport.png");
  await page.screenshot({ path: screenshot });
  await testInfo.attach("dark viewport", { path: screenshot, contentType: "image/png" });
});

test("scroll gives the spatial project map a distinct second state", async ({ page }) => {
  await page.goto("/");

  const map = page.locator(".signal-map-shell");
  const before = await map.evaluate((element) => getComputedStyle(element).transform);

  await page.evaluate(() => window.scrollTo(0, Math.round(window.innerHeight * 0.7)));
  await page.waitForTimeout(150);

  const after = await map.evaluate((element) => getComputedStyle(element).transform);
  expect(after).not.toBe(before);
});
