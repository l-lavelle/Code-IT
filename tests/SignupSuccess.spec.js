const { test, expect } = require("@playwright/test");

test("Signup Worked", async ({ page }) => {
  await page.goto("/Login");
  await page.locator(".SL-switch-text").first().click();
  await page.locator("input[name='username']").last().fill("newTrial4");
  await page.locator("input[name='password']").last().fill("Abc#1");
  await page.locator("input[name='confirmPassword']").last().fill("Abc#1");
  await page.getByRole("button").last().click();
  await page.goto("/");
  const sessionStorage = await page.evaluate(() =>
    JSON.stringify(sessionStorage)
  );
  expect(Object.values(sessionStorage)).toBeTruthy();
});
