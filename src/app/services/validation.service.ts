//Original version created by Cory Rylan: https://coryrylan.com/blog/angular-2-form-builder-and-validation-management
import { IsValidDate } from '../helpers/date.helper'


export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config = {
            'required': 'Required',
            'invalidNumberField': 'Only numbers allowed',
            'invalidDateField': 'Not a valid date',
            'invalidCreditCard': 'Is invalid credit card number',
            'invalidEmailAddress': 'Invalid email address',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
            'invalidPasswords': 'Invalid passwords. Passwords must match.',
            'minlength': `Minimum length ${validatorValue.requiredLength}`
        };

        // console.log(" config = " + JSON.stringify(config));
        // console.log(" validator name: " + validatorName);
        // console.log(" config = req " + JSON.stringify(config["required"]));
        // console.log(" config = nan " + JSON.stringify(config["invalidNumberField"]));
        return config[validatorName];
    }

    static numberFieldValidator(control) {
        // if (control.value(/^([0-9]|[0-9][0-9]|[1-9][0-9][0-9])$/)) {
        //     return null;
        // } else {
        //     return { 'invalidNumberField': true };
        // }

        return null;
    }

    static dateFieldValidator(control) {
        var e: boolean;

        if (IsValidDate(control.value)) {
            return null;
        } else {
            return { 'invalidDateField': true };
        }
    }

    static creditCardValidator(control) {
        // Visa, MasterCard, American Express, Diners Club, Discover, JCB
        // if (control.value(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
        //     return null;
        // } else {
        //     return { 'invalidCreditCard': true };
        // }

        return null
    }

    static emailValidator(control) {
        // RFC 2822 compliant regex
        // if (control.value(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
        //     return null;
        // } else {
        //     return { 'invalidEmailAddress': true };
        // }

        return null;
    }

    static passwordValidator(control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        // if (control.value(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
        //     return null;
        // } else {
        //     return { 'invalidPassword': true };
        // }

        return null;
    }

    static passwordCompareValidator(fg) {
        if (fg.value.password === fg.value.confirmPassword) {
            return null;
        } else {
            return { 'invalidPasswords': true };
        }
    }
}
