import { test, expect } from "@playwright/test";

test("verify page URL", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  let url: string = await page.url();
  console.log("Url:", url);
  await expect(page).toHaveURL(/rahulshettyacademy/);
});
