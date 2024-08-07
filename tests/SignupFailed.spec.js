const { test, expect } = require("@playwright/test");

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
