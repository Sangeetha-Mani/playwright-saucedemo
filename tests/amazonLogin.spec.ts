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

//security Values
const sqlInjection = testData.sqlInjection;
const xssAttack = testData.xssAttack;
const htmlInjection = testData.htmlInjection;

test.beforeEach(async({page})=>{
    console.log("before goto")
    await page.goto("/ap/signin?openid.return_to=https%3A%2F%2Fwww.amazon.in%2F%3Fref_%3Dnav_ya_signin&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=inflex&openid.mode=checkid_setup&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0")
     console.log("after goto and waiting for email to be visible")
        await expect(page.locator("#ap_email_login")).toBeVisible();
        console.log("sigin heading to be waiting")
    await expect(page.getByRole("heading")).toContainText("Sign in")
   
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
});
test.describe("TC_008 - Security Testing", ()=>{

    test("User should see validation msg when do SQL Injection", async ({page})=>{
        const securityPage = new AmazonLoginPage(page);
        await securityPage.login(sqlInjection);
        await expect(securityPage.ErrorMsg).toContainText("Invalid email");
    })

     test("User should see validation msg when do XSS attack", async ({page})=>{
        const securityPage = new AmazonLoginPage(page);
        await securityPage.login(xssAttack);
        await expect(securityPage.ErrorMsg).toContainText("Invalid email");
    })

     test("User should see validation msg when do HTML Injection", async ({page})=>{
        const securityPage = new AmazonLoginPage(page);
        await securityPage.login(htmlInjection);
        await expect(securityPage.ErrorMsg).toContainText("Invalid email");
    })

    // test("Password Assitance page appears after multiple invalid password attempts", async ({page})=>{
    // //    Brute force protection 
    // // Note:
    // // Amazon tracks failed login attempts server-side.
    // // CAPTCHA or Password Assistance may appear earlier than expected.
    // // Run sparingly to avoid account/IP throttling.
    //     const securityPage = new AmazonLoginPage(page);
       
    //     await securityPage.login("7548829368",invalidPwd);
    //     console.log(page.url());
    //     await page.pause();
    //     await expect(securityPage.pwdErrorMsg).toContainText("password is incorrect", {timeout: 15000})
        
    //     for(let attempt = 1; attempt < 5 ; attempt++){

    //     await securityPage.password.fill(invalidPwd);
    //     console.log(attempt,'chck')
    //     await securityPage.loginBtn.click();
       
    //     if(attempt !== 4) await expect(securityPage.pwdErrorMsg).toContainText("password is incorrect", {timeout: 15000})

    //     }
    //    await expect(securityPage.passwordAssistance).toBeVisible();
    //    await expect(securityPage.passwordAssistance).toContainText("Password assistance")
    //     await expect(page).toHaveURL(/ap\/forgotpassword/i)
    //   await expect(securityPage.password).not.toBeVisible();

       
    // })

     

})

test.describe('TC_009 - Login Edge Cases', ()=> {
    test("Login form is submitted when enter key is pressed", async ({page})=>{
            const edgeCasePage = new AmazonLoginPage(page);
            await edgeCasePage.login(validEmail,validPwd, true);
            await expect(edgeCasePage.nav_list_Hello_sign_in).toBeVisible();
            await expect(edgeCasePage.nav_list_Hello_sign_in).not.toContainText("sign in")
 
        })

    // test("should hanlde multiple click on continue button with invalid email", async ({page})=>{
    //      const edgeCasePage = new AmazonLoginPage(page);
    //      await edgeCasePage.login(invalidEmail,undefined,false,true);
    //      await expect(edgeCasePage.ErrorMsg).toBeVisible();
    //      await expect(edgeCasePage.ErrorMsg).toContainText("Invalid email")
    // })

    // test("should hanlde multiple click on continue button with valid phone", async ({page})=>{
    //      const edgeCasePage = new AmazonLoginPage(page);
    //      const successResponse = [];
    //      page.on("response", (response)=>{
    //         if(response.request().resourceType() === 'document') {
    //             console.log(`[Response] ${response.status()} -> ${response.url()}`)
    //         }
    //         if(response.request().resourceType() === 'document' && response.status() === 200){
    //             successResponse.push(response)
    //         }
    //      });
      
    //      const docRequests =[];
    //        page.on("request", (request) => {
    //         if (request.resourceType() === "document") {
    //         docRequests.push({
    //             method: request.method(),
    //             url: request.url(),
    //         });
    //         console.log(`[DOC REQUEST] ${request.method()} → ${request.url()} `);
    //         }
    //     });
    //     await edgeCasePage.login(validEmail,undefined,false,true);
        
    //     console.log("Successful:", successResponse.length);
    //     console.log("request:", docRequests.length);
    //    expect(successResponse.length).toBe(1);
    //     expect(docRequests.length).toBe(1);
    //     await expect(edgeCasePage.password).toBeVisible();
    // })


})


test.describe("TC_010 - Session Managment", ()=> {

    test("Refresh Page after successful login" , async ({page})=>{
        const sessionPage = new AmazonLoginPage(page);
        await sessionPage.login(validEmail,validPwd);
        await expect(sessionPage.nav_list_Hello_sign_in).toBeVisible();
        await expect(sessionPage.nav_list_Hello_sign_in).not.toContainText("sign in");
        await page.reload();
        await expect(sessionPage.nav_list_Hello_sign_in).not.toContainText("sign in");

    })

    test("browser back button should not reopen account page after successful logout", async ({page})=>{
        const sessionPage = new AmazonLoginPage(page);
        await sessionPage.login(validEmail,validPwd);
        await expect(sessionPage.hello_Nav_Div).toBeVisible({timeout: 20000});
        //direct logout
        await page.goto("https://www.amazon.in/gp/flex/sign-out.html?path=%2Fgp%2Fyourstore%2Fhome&signIn=1&useRedirectOnSuccess=1&action=sign-out&ref_=nav_AccountFlyout_signout",{
            waitUntil: "domcontentloaded"
        })
        await expect(page).toHaveURL(/signin|sign-in/, {timeout: 15000});
           await expect(sessionPage.signIn_Create_Account.getByRole("heading"))
        .toContainText("Sign in", { timeout: 15000 });

         console.log("Post-logout URL:", page.url());
         await page.goBack({ waitUntil: "domcontentloaded" });
        await page.waitForLoadState("domcontentloaded");
      // chekcing the procted page url able to access it
         await page.goto(
        "https://www.amazon.in/gp/css/homepage.html?ref_=nav_AccountFlyout_ya",
        { waitUntil: "domcontentloaded" }
    );

        console.log("After goBack URL:", page.url());
         await expect(sessionPage.nav_list_Hello_sign_in)
        .toContainText("Hello, sign in", { timeout: 15000 });
        

    console.log("✅ Passed: session not restored after goBack");

    // ── Step 7: Abort all pending requests so teardown doesn't hang ───────────
    await page.route("**/*", route => route.abort());
    await page.goto("about:blank", { waitUntil: "domcontentloaded" });
    })
})

test.describe("TC_011 - UI Testing" ,()=>{
    test("password should be masked", async ({page})=>{
         const uiPage = new AmazonLoginPage(page);
        await uiPage.login(validEmail,invalidPwd);
        await expect(uiPage.password).toBeVisible();
        await expect(uiPage.password).toHaveAttribute("type","password");


    })
})


    


