import process from "node:process";

export const testData ={
    validUser: {
        email: process.env.VALID_EMAIL!,
        password: process.env.VALID_PASSWORD!
    },
    invalidUser:{
        email: process.env.INVALID_EMAIL!,
        password: process.env.INVALID_PASSWORD!
    },
    longCharacterUser:{
        email: process.env.LONG_EMAIL!,
        password: process.env.LONG_PASSWORD!
    },
    onlySpaces:{
        email:process.env.ONLYSPACES_EMAIL,
        password: process.env.ONLYSPACES_PASSWORD
    },
    leadingSpaces:{
        email:process.env.LEADING_SPACES_EMAIL,
        password: process.env.LEADING_SPACES_PASSWORD
    },
    trailingSpaces:{
        email:process.env.TRAILING_SPACES_EMAIL,
        password: process.env.TRAILING_SPACES_PASSWORD
    },
    maxValue:{
        email:process.env.MAX_EMAIL,
        pwd:process.env.MAX_PWD,
    },
    minValue:{
        email:process.env.MIN_EMAIL,
        pwd:process.env.MIN_PWD,
    },
}