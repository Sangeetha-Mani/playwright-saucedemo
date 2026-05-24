import {Page, Locator} from "@playwright/test";

export class CartPage {

    readonly page: Page;
    readonly cartTitle: Locator;
    readonly cartItem: Locator;
    readonly removeCartItem : Locator;
    readonly checkoutButton: Locator;
    readonly continueShopping: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartTitle = page.getByTestId('title');
        this.cartItem = page.getByTestId("inventory-item-name")
        this.removeCartItem = page.getByTestId("remove-sauce-labs-bike-light");
        this.checkoutButton = page.getByTestId("checkout");
        this.continueShopping = page.getByTestId("continue-shopping");
    }

   async verifyRemoveButton() {
       return await this.removeCartItem.innerText()
    }

    async verifyContinueShopping() {
       return await this.continueShopping.innerText();
    }

}