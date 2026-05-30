import { Page, Locator } from '@playwright/test';

export class AmazonLoginPage {
    readonly page: Page;
    readonly emailorphonenumber : Locator;
    readonly continueBtn: Locator;
    readonly password: Locator;
    readonly loginBtn: Locator;
    readonly ErrorMsg: Locator;
    readonly pwdHeaderErrormsg : Locator;
    readonly pwdErrorMsg: Locator;
    readonly enterEmailErrorMsg : Locator;
    readonly authoPwdMissingAlert: Locator;
    readonly nav_list_Hello_sign_in: Locator;
    readonly newEmailUser: Locator;
    

    constructor(page: Page) {
        //assign the properties with respective locators
        this.page = page;
        this.emailorphonenumber = page.locator("#ap_email_login");
        this.continueBtn = page.locator("#continue .a-button-input");
        this.password = page.locator("#ap_password");
        this.loginBtn = page.locator("#signInSubmit");
        this.ErrorMsg = page.locator("#invalid-email-alert .a-box-inner > .a-alert-content");
        this.pwdHeaderErrormsg = page.locator("#auth-error-message-box  .a-alert-heading");
        this.pwdErrorMsg = page.locator("#auth-error-message-box .a-alert-content");
        this.enterEmailErrorMsg = page.locator("#empty-claim-alert .a-box-inner > .a-alert-content")
        this.authoPwdMissingAlert = page.locator("#auth-password-missing-alert .a-box-inner > .a-alert-content")
        this.nav_list_Hello_sign_in = page.locator("#nav-link-accountList-nav-line-1");
        this.newEmailUser = page.locator("#intent-confirmation-container").getByRole("heading");
    }
   
   async login(email: string , password?:string){
     await this.emailorphonenumber.fill(email);
     await this.continueBtn.click();
     if(password !== undefined) {
        await this.password.fill(password);
        await this.loginBtn.click();
     }
     
    }

   
}