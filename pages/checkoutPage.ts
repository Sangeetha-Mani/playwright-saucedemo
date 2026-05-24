import {Page, Locator } from "@playwright/test";

export class CheckoutPage {
   readonly page: Page;
   readonly checkoutTitle: Locator;
   readonly checkoutFirstName: Locator;
   readonly checkoutLastName : Locator;
   readonly checkoutPostalCode: Locator;
   readonly checkoutButton: Locator;
   readonly checkoutFinishButton: Locator;
   readonly checkoutOverviewTitle: Locator;


   constructor(page:Page) {
    this.page = page;
    this.checkoutTitle = page.getByTestId("title");
    this.checkoutFirstName = page.getByTestId("firstName")
    this.checkoutLastName = page.getByTestId("lastName")
    this.checkoutPostalCode = page.getByTestId("postalCode");
    this.checkoutButton = page.getByTestId("continue");
    this.checkoutFinishButton = page.getByTestId("finish");
   this.checkoutOverviewTitle = page.getByTestId("title")
   }

//    valid checkout info
  async validCheckoutInfo(firstName: string, lastName : string , pincode: number) {
    await  this.checkoutFirstName.fill(firstName);
    await  this.checkoutLastName.fill(lastName);
    await this.checkoutPostalCode.fill(pincode.toString());
    await this.checkoutButton.click();
   }


}

