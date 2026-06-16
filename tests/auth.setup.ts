import { expect, test as setup } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/login");

  await page.getByRole("textbox", { name: "Username" }).fill("tomsmith");
  await page
    .getByRole("textbox", { name: "Password" })
    .fill("SuperSecretPassword!");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("You logged into a secure area!")).toBeVisible();
  await page.context().storageState({ path: authFile });
});
