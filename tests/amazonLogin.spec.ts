import test, {expect} from '@playwright/test';
import { AmazonLoginPage } from '../pages/amazonLoginPage';
import { testData } from '../testData/testData';

const validEmail = testData.validUser.email;
const validPwd = testData.validUser.password;
const invalidEmail =testData.invalidUser.email;
const invalidPwd = testData.invalidUser.password;
const longEmail= testData.longCharacterUser.email;
const longPwd= testData.longCharacterUser.password;



// min values
const minEmail = testData.minValue.email;
const minPwd= testData.minValue.pwd;



// maximum values
const maxEmail = testData.maxValue.email;
const maxPwd= testData.maxValue.pwd;

// spacing values
const onlySpacesEmail = testData.onlySpaces.email;
const leadingSpacesPhone = testData.leadingSpaces.email;
const trailingSpacesPhone = testData.trailingSpaces.email;

test.beforeEach(async({page})=>{
    await page.goto("/ap/signin?openid.return_to=https%3A%2F%2Fwww.amazon.in%2F%3Fref_%3Dnav_ya_signin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=inflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0")
    await expect(page.getByRole("heading")).toHaveText("Sign in or create account")
})

test.describe("TC_001 - Successful Login Scenarios",()=>{
    test("User should see Amazon Home page when successful login", async ({page})=>{
    const validPage = new AmazonLoginPage(page);
    await validPage.login(validEmail,validPwd)
    await expect(validPage.nav_list_Hello_sign_in).toBeVisible();
    await expect(validPage.nav_list_Hello_sign_in).not.toContainText("sign in")
    });
});

test.describe("TC_002 - Invalid Login Scenarios", ()=>{
     test("User should see validation message when email is invalid",async ({page})=>{
       const invalidPage = new AmazonLoginPage(page);
       await invalidPage.login(invalidEmail);
       await expect(invalidPage.ErrorMsg).toHaveText("Invalid email address")
    });

    test("User shoule see validation message when password is invalid",async ({page})=>{
        const invalidPage = new AmazonLoginPage(page);
        await invalidPage.login(validEmail,invalidPwd);
        await expect(invalidPage.pwdHeaderErrormsg).toHaveText("There was a problem");
        await expect(invalidPage.pwdErrorMsg).toHaveText("Your password is incorrect")
    });
});

test.describe("TC_003 - Empty Field Validations", ()=>{
     test("User should see validation message when email is empty ",async ({page})=>{
        const LoginEmptyPage = new AmazonLoginPage(page);
        await LoginEmptyPage.login("");
        await expect(LoginEmptyPage.enterEmailErrorMsg).toHaveText("Enter your mobile number or email")
    });

      test("User should see validation message when password is empty", async ({page})=>{
        const PwdMissingAlert = new AmazonLoginPage(page);
        await PwdMissingAlert.login(validEmail,"");
        await expect(PwdMissingAlert.authoPwdMissingAlert).toHaveText("Enter your password")   
    });
});

test.describe("TC_004 - Boundary Test Case of LongInput Validations", ()=>{
    
    test("User should see valiation when give email long input value", async ({page})=>{
        const longInputPage = new AmazonLoginPage(page);
        await longInputPage.login(longEmail);
        await expect(longInputPage.ErrorMsg).toHaveText("Invalid email address");

    })
    test("User should see valiation when password has long input value", async ({page})=>{
        const longInputPage = new AmazonLoginPage(page);
        await longInputPage.login(validEmail,longPwd);
        await expect(longInputPage.pwdErrorMsg).toHaveText("Your password is incorrect");

    })

})
test.describe("TC_005 - Boundary Test Case of Minimum Input Value Validations", ()=>{
     test("User should see valiation Msg when email is minimum input value", async ({page})=>{
        const minInputPage = new AmazonLoginPage(page);
        await minInputPage.login(minEmail);
        await expect(minInputPage.ErrorMsg).toHaveText("Invalid email address");

    })
     test("User should see valiation Msg when pwd is minimum input value", async ({page})=>{
        const minInputPage = new AmazonLoginPage(page);
        await minInputPage.login(validEmail,minPwd);
        await expect(minInputPage.pwdErrorMsg).toHaveText("Your password is incorrect");

    })
})
test.describe("TC_006 - Boundary Test Case of Maximum Input Value Validations", ()=>{
     test("User should see valiation Msg when email has maximum input value", async ({page})=>{
        const maxInputPage = new AmazonLoginPage(page);
        await maxInputPage.login(maxEmail);
        await expect(maxInputPage.newEmailUser).toContainText("It looks like");

    })
     test("User should see valiation Msg when pwd has maximum input value", async ({page})=>{
        const maxInputPage = new AmazonLoginPage(page);
        await maxInputPage.login(validEmail,maxPwd);
        await expect(maxInputPage.pwdErrorMsg).toHaveText("Your password is incorrect");

    })
})
test.describe("TC_007 - Boundary Test Case of Leading and Trailing Spaces Validations", ()=>{
    // amazon application trims the spaces automatically so i just check the navigate to password page and no validation
    
    test("User should see valiation Msg when email have only spaces", async ({page})=>{
        const spacesPage = new AmazonLoginPage(page);
        await spacesPage.login(onlySpacesEmail);
        await expect(spacesPage.enterEmailErrorMsg).toHaveText("Enter your mobile number or email");
    });

     test("User should see valiation Msg when phone has leading spaces", async ({page})=>{
        const spacesPage = new AmazonLoginPage(page);
        await spacesPage.login(leadingSpacesPhone);
       await expect(spacesPage.enterEmailErrorMsg).not.toBeVisible();
        await expect(spacesPage.password).toBeVisible();

    })
    test("User should see valiation Msg when phone has trailing spaces", async ({page})=>{
        const spacesPage = new AmazonLoginPage(page);
        await spacesPage.login(trailingSpacesPhone);
      await expect(spacesPage.enterEmailErrorMsg).not.toBeVisible();
        await expect(spacesPage.password).toBeVisible();

    })
})

    


