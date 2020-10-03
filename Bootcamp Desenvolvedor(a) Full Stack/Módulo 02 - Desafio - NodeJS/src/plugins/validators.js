/*jslint node: true */
"use strict";

//let errors = [];

class Validators {
    constructor() {
        this.errors = [];
    }

    isRequired(value, message) {
        if (!value || value.length <= 0) {
            this.errors.push({ message });
        }
    }

    hasMinLen(value, min, message) {
        if (!value || value.length < min) {
            this.errors.push({ message });
        }
    }

    hasMaxLen(value, max, message) {
        if (!value || value.length > max) {
            this.errors.push({ message });
        }
    }

    hasFixedLen(value, len, message) {
        if (value.length === parseInt(len)) {
            this.errors.push({ message });
        }
    }

    isNumber(value, message) {
        if (!value || isNaN(value)) {
            this.errors.push({ message });
        }
    }

    isEmail(value, message) {
        let reg = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
        if (!reg.test(value)) {
            this.errors.push({ message });
        }
    }

    showErrors() {
        let allErrors = [];
        for (let error of this.errors) {
            allErrors.push(error.message);
        }

        this.clear();
        return allErrors;
    }

    clear() {
        this.errors = [];
    }

    isValid() {
        return this.errors.length === 0;
    }
}

export default Validators;
