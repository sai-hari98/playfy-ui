import { isNullOrEmpty } from "./string-utils";

const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

const isPasswordValid = (password) => {
    return passwordPattern.test(password);
}

export const validateField = (field = null) => {
    let isValid = !isNullOrEmpty(field.value);
    if(isValid && field.validation){
        if(field.validation.password){
            isValid = isValid && isPasswordValid(field.value);
        }
        if(field.validation.email){
            isValid = isValid && isEmailValid(field.value);
        }
        if(field.validation.minChar){
            isValid = isValid && field.value.length >= field.validation.minChar;
        }
        if(field.validation.maxChar){
            isValid = isValid && field.value.length <= field.validation.maxChar;
        }
    }
    return isValid;
}

const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const isEmailValid = (email) => {
    return !isNullOrEmpty(email) && emailPattern.test(email);
}