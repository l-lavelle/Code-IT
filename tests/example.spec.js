const { test, expect } = require("@playwright/test");

// test("has title", async ({ page }) => {
//   await page.goto("https://playwright.dev/");

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test("get started link", async ({ page }) => {
//   await page.goto("https://playwright.dev/");

//   // Click the get started link.
//   await page.getByRole("link", { name: "Get started" }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(
//     page.getByRole("heading", { name: "Installation" })
//   ).toBeVisible();
// });
test.describe("Signup Failed", async () => {
  test("Username Character", async ({ page }) => {
    await page.goto("/Login");
    await page.locator(".SL-switch-text").first().click();
    await page.locator("input[name='username']").last().fill("four");
    await page.locator("input[name='password']").last().fill("four");
    await page.locator("input[name='confirmPassword']").last().fill("four");
    await page.getByRole("button").last().click();
    const errorL = page.locator(".sl-error").last();
    await expect(errorL).toHaveText(/Username must be between 5-40 characters/);
  });
  test("Password Constraints", async ({ page }) => {
    await page.goto("/Login");
    await page.locator(".SL-switch-text").first().click();
    await page.locator("input[name='username']").last().fill("lmlavelle");
    await page.locator("input[name='password']").last().fill("four");
    await page.locator("input[name='confirmPassword']").last().fill("four");
    await page.getByRole("button").last().click();
    const errorL = page.locator(".sl-error").last();
    await expect(errorL).toHaveText(
      /Password needs lowercase, uppercase, number and special character/
    );
  });
  test("Password Match", async ({ page }) => {
    await page.goto("/Login");
    await page.locator(".SL-switch-text").first().click();
    await page.locator("input[name='username']").last().fill("lmlavelle");
    await page.locator("input[name='password']").last().fill("Abc#1");
    await page.locator("input[name='confirmPassword']").last().fill("four");
    await page.getByRole("button").last().click();
    const errorL = page.locator(".sl-error").last();
    await expect(errorL).toHaveText(/Passwords do not match/);
  });
  test("Unique Username", async ({ page }) => {
    await page.goto("/Login");
    await page.locator(".SL-switch-text").first().click();
    await page.locator("input[name='username']").last().fill("lmlavelle");
    await page.locator("input[name='password']").last().fill("Abc#1");
    await page.locator("input[name='confirmPassword']").last().fill("Abc#1");
    await page.getByRole("button").last().click();
    const errorL = page.locator(".sl-error").last();
    await expect(errorL).toHaveText(/Username already exists/);
  });
});
