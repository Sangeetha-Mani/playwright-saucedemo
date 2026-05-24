import {Page , Locator } from "playwright/test"

export class ProductPage {

    readonly page : Page;

    readonly productTitle : Locator;
    readonly prdoductFilter : Locator;
    readonly productItem: Locator;
    readonly productName: Locator;
    //readonly productAddToCart : Locator;


    constructor(page:Page) {
        this.page = page;
        this.productTitle = page.getByTestId("title");
        this.prdoductFilter = page.getByTestId("product-sort-container");
        this.productItem = page.locator(".inventory_item");
        this.productName = page.getByTestId("item-0-title-link");
        //this.productAddToCart = page.locator("#add-to-cart-sauce-labs-bike-light");
    }

    getTotalProducts () {
        return  this.productItem.count();
    }

    async getLowtoHighCost() {
       await this.prdoductFilter.selectOption("lohi")
       
    }


    
}