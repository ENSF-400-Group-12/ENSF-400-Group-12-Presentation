import { expect, test } from "@playwright/test";

test.describe("deck", () => {
  test("shows slide 1 and navigates to slide 2", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("group", { name: /slide 1 of 7/i })
    ).toBeVisible();
    await page.keyboard.press("ArrowRight");
    await expect(
      page.getByRole("group", { name: /slide 2 of 7/i })
    ).toBeVisible();
  });

  test("export mode locks to requested slide", async ({ page }) => {
    await page.goto("/?export=3");
    await expect(
      page.getByRole("group", { name: /slide 3 of 7/i })
    ).toBeVisible();
    await page.keyboard.press("ArrowRight");
    await expect(
      page.getByRole("group", { name: /slide 3 of 7/i })
    ).toBeVisible();
  });

  test("document is not vertically scrollable", async ({ page }) => {
    await page.goto("/");
    const delta = await page.evaluate(
      () => document.documentElement.scrollHeight - document.documentElement.clientHeight
    );
    expect(delta).toBeLessThanOrEqual(2);
  });
});
