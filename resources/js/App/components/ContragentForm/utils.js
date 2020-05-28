import validator from "validator";

export const validatorMessage = (value, name) => {
    const strValue = value ? value.toString() : "";
    if(strValue.length > 0) {
        switch(name) {
            case "email":
                return !validator.isEmail(strValue) ? "Не коректна пошта" : "";
            case "phone":
                return !validator.isMobilePhone(strValue) ? "Не коректний номер телефону" : "";
            case "balance":
                return !validator.isNumeric(strValue) ? "Баланс повинен бути числом" : "";
            default:
                return "";
        }
    }
    else
        return "Поле обов'язкове!"
};
export const formValid = (form) => {
    let newFormErrors = {};
    let isValid = true;
    for(let [key, value] of Object.entries(form)) {
        const message = validatorMessage(value, key);
        if(message.length > 0)
            isValid = false;
        newFormErrors[key] = message;
    }
    return {
        isValid,
        newFormErrors
    }
};

