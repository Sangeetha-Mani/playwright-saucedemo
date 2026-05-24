import { test, expect } from "playwright/test";
import { ProductPage } from "../pages/productPage";
import { CartPage } from "../pages/cartPage";
import { CheckoutPage } from "../pages/checkoutPage";

test("TC_ETE_01 - swag labs endtoend test", async ({ page }) => {
  const prdPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await page.goto("https://www.saucedemo.com/");

  await page.getByTestId("username").fill("standard_user");
  await page.getByTestId("password").fill("secret_sauce");
  await page.getByTestId("login-button").click();

  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  await expect(page.getByText("Swag Labs")).toBeVisible();

  // ProductPage Assertions
  await expect(prdPage.productTitle).toBeVisible();
  await prdPage.getLowtoHighCost();
  await expect(prdPage.prdoductFilter).toHaveValue("lohi");
  const totalCount = await prdPage.getTotalProducts();
  expect(totalCount).toBe(6);
  prdPage.productName.click();

  await page.getByTestId("add-to-cart").click();

  await page.getByTestId("shopping-cart-link").click();

  // cartpage Asserstion

  await expect(cartPage.cartTitle).toBeVisible();
  const buttonContinueTxt = await cartPage.verifyContinueShopping();
  console.log(buttonContinueTxt, "check");
  expect(buttonContinueTxt).toBe("Continue Shopping");
  const buttonRemoveTxt = await cartPage.verifyRemoveButton();
  expect(buttonRemoveTxt).toBe("Remove");
  await expect(cartPage.cartItem).toHaveText("Sauce Labs Bike Light");
  await cartPage.checkoutButton.click();

  //   checkoutPag ASserstion
  await checkoutPage.validCheckoutInfo("Sangeetha", "Sarada", 631501);

  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-two.html",
  );
  await expect(checkoutPage.checkoutOverviewTitle).toHaveText(
    "Checkout: Overview",
  );
  await expect(checkoutPage.checkoutFinishButton).toBeVisible();
  await checkoutPage.checkoutFinishButton.click();

  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-complete.html",
  );
  await expect(page.getByTestId("complete-header")).toHaveText(
    "Thank you for your order!",
  );

  await page.getByTestId("back-to-products").click();
});
