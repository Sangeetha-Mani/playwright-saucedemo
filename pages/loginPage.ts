import { Page, Locator, expect} from '@playwright/test';

export class LoginPage {
    readonly page: Page;
// variable declaration
    readonly username : Locator;
    readonly password : Locator;
    readonly signInButton : Locator;
    readonly errorMessage : Locator;
    constructor(page: Page) {
        this.page = page;
        this.username = page.locator("#user-name");
        this.password = page.locator("#password");
        this.signInButton = page.locator("#login-button");
        this.errorMessage = page.locator(".error-message-container")
    }

    // define the function properties in class
    //actions
    async goto(){
        await this.page.goto("https://www.saucedemo.com/");

    }

    async login(email: string, password: string){
        await this.username.fill(email);
        await this.password.fill(password);
        await expect(this.signInButton).toBeVisible();
        await this.signInButton.click();
    }

    async getErrorMessage() {
        
        return await this.errorMessage.innerText();
    }
}