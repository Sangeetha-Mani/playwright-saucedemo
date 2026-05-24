import {test, expect} from '@playwright/test';

import { LoginPage } from '../pages/loginPage';

test.describe('SwagLabs - Login', () => {
    // create instances for loginpage
   test("user can login", async ({page})=>{
    const loginPage = new LoginPage(page);

    // step1 :login
    await loginPage.goto();
    await loginPage.login("standard_user","secret_sauce");
    
   
    
    await expect(page.getByText("Swag Labs")).toBeVisible();
   })

   test("Login fails with wrong password",async({page})=>{
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("standard_user","wrongpassword");
    const error  = await loginPage.getErrorMessage();
    //console.log(error,'check the error')
    expect(error).toContain("Username and password do not match any user in this service")
   })

   test("Login - edge cases", async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("","");
    const error = await loginPage.getErrorMessage();
    console.log(error,'edge case');
    expect(error).toContain("Username is required")
   })
})