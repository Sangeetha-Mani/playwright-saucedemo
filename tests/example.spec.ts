import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('successful login and heading should be visisble', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Click the get started link.
  await page.getByTestId("username").fill("standard_user");
  await page.getByTestId("password").fill("secret_sauce");

  await page.getByRole("button").click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByText('Swag Lab')).toBeVisible();
});
