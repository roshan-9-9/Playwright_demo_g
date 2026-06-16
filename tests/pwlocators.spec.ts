/*
Locator - Identifies the element on the page.
DOM - Document Object Model
DOM is an API Interface provided by browser.


1) page getByAltText() to locate an element, usually image, by its text alternative.
2) page getByText() to locate by text content.
3) page getByRole() to locate by explicit and implicit accessibility attributes.
) page. getByLabel) to locate a form control by associated label's text.
5) page.getByPlaceholder() to locate an input by placeholder.
6) page getByTitle() to locate an element by its title attribute.
7) page-getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured)
*/

import { test, expect, Locator } from "@playwright/test";
import * as path from "path";

test("Verify Playwright Locator", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  // 1. page.getByAltText() - identifies images (and similar elements) based on the alt attribute.
  // Use this locator when your element supports alt text such as img and area elements.

  const logo: Locator = page.getByAltText("Playwright logo").first();

  await expect(logo).toBeVisible();

  await logo.click();
});

test("Verify Playwright getByText Locator", async ({ page }) => {
  await page.goto(
    `file://${path.join(__dirname, "fixtures", "locators-practice.html")}`
  );

  // 2. page.getByText() - identifies elements by their visible text content.
  //  page.getByText() - Find an element by the text it contains. You can match by a substring, exact string,
  // Locate by visible text
  // Use this locator to find non interactive elements like div, span, P, etc.
  // For interactive elements like button, a, input, etc. use role locators.
  /*
<p›welcome</p>
<div›hellow‹/div>
*/
  const welcomeText: Locator = page.getByText(
    "Welcome to the locator practice page."
  );
  const successMessage: Locator = page.getByText("Order placed successfully.");
  const continueButton: Locator = page.getByText("Continue shopping");
  //   const productStatus: Locator = page.getByText("Product status: Available");

  await expect(welcomeText).toBeVisible();
  await expect(successMessage).toBeVisible();
  await expect(continueButton).toBeVisible();
  //   await expect(productStatus).toBeVisible();

  //above both combine to single statement
  //   await expect(page.getByText("Product status: Available")).toBeVisible(); //full string //full text

  // await expect(page.getByText("Product status: ")).toBeVisible(); // provided substring // partial text

  await expect(
    page.getByText(/Product\s+status:\s+Available/i)
  ).toBeVisible();
});

test("getByRole", async ({ page }) => {
  ///"getByRole on Playwright website"
  await page.goto("https://playwright.dev/");
  // 3. page.getByRole() - Locating by Role (role is not an attribute)
  /* Role locators include buttons, checkboxes, headings, links, lists, tables,
and many more and follow W3C specifications for ARIA role.
Prefer for interactive elements like buttons, checkboxes, links, lists, headings, tables, etc.
*/

  //   const role: Locator = page.getByRole("link", { name: /Playwright/ }).first();
  //   await role.click();
  // or
  await page
    .getByRole("link", { name: /Playwright/ })
    .first()
    .click();

  await expect(
    page.getByRole("heading", { name: "Playwright Test" })
  ).toBeVisible(); // here we can also use getByText

  ///"getByRole on login page"

  await page.goto("https://the-internet.herokuapp.com/login");

  await page.getByRole("textbox", { name: "Username" }).fill("tomsmith");
  await page
    .getByRole("textbox", { name: "Password" })
    .fill("SuperSecretPassword!");
  await page.getByRole("button", { name: "Login" }).click();
});

test("getByLabel", async ({ page }) => {
  await page.goto(
    `file://${path.join(__dirname, "fixtures", "locators-practice.html")}`
  );
  // 4. page.getBylabel) - Locate form control by label's text
  // When to use: Ideal for form fields with visible labels.
  //page-getByLabel('First name: ').type("John"); // type is deprecated

  await page.getByLabel("First name:").fill("John");
  await page.getByLabel("Last name:").fill("Kenedy");
  await page.getByLabel("Email:").fill("abc@gmail.com");
});
