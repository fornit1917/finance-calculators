type ValueParser = ((s: string) => number) | null;
type FormValues = { [key: string] : string } | undefined;
type Validator = (s: string, formValues: FormValues) => [boolean, string?];
export type ValidationRules = { [key: string] : Validator }

export function isRequired(value: string): [boolean, string?] {
    return value.trim() === "" ? [false, "Обязательное поле"] : [true];
}

export function createLessThanValidator(maxValue: number, valueParser: ValueParser): Validator {
    return (s: string) => {
        const parsedValue = valueParser === null ? parseInt(s.trim()) : valueParser(s);
        return parsedValue > maxValue ? [false, `Максимальное значение ${maxValue}`] : [true];
    }
}

export function createMoreThanValidator(minValue: number, valueParser: ValueParser): Validator {
    return (s: string) => {
        const parsedValue = valueParser === null ? parseInt(s.trim()) : valueParser(s);
        return parsedValue < minValue ? [false, `Минимальное значение ${minValue}`] : [true];
    }
}

export function createConditionalValidator(condition: (formValues: FormValues) => boolean, ...validators: Validator[]): Validator {
    return (s: string, formValues: FormValues) => {
        if (condition(formValues)) {
            for (let validator of validators) {
                const result = validator(s, formValues);
                if (!result[0]) {
                    return result;
                }
            }
            return [true];
        }
        return [true];
    }
}

export function validate(formValues: FormValues, rules: ValidationRules, ...fieldsToValidation: string[]) {
    const errors = {};
    if (!fieldsToValidation || fieldsToValidation.length === 0) {
        fieldsToValidation = Object.keys(rules);
    }
    fieldsToValidation.forEach(key => {
        if (formValues[key] !== undefined) {
            const validator = rules[key];
            const [isValid, message] = validator(formValues[key], formValues)
            if (!isValid) {
                errors[key] = message;
            }
        }        
    });

    return errors;
}