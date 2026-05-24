import {  test, expect } from  '@playwright/test';

test("TC_API_01 - without API_key returns 401",async ({request})=>{

    const response = await request.get('https://reqres.in/api/users?page=2');
    //check the response status code
    console.log(response.status(),'check')
    expect(response.status()).toBe(401)
});

test("TC_API_02 - valid API_key returns 200", async ({request})=>{

    const response = await request.get('https://reqres.in/api/users?page=2',{
        headers:{
            'x-api-key': "free_user_3E9xdDVk2ULF9p0HSXNaAUFCnCX"
        }
    })
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.length).toBeGreaterThan(0)
})

test("TC_API_03 - invalid API_key return 401", async ({request})=>{

    const response = await request.get("https://reqres.in/api/users?page=2", {
        headers :{
            'x-api-key' :"check check check"
        }
    })
    console.log(response.status(),'check the statuss')
    expect(response.status()).toBe(403)

})