import { validateField} from "./validation-utils";
import { isNullOrEmpty } from "./string-utils";

export const createInputObject = (validation) => {
    return { 
        value : '',
        valid : false,
        validation : validation,
        touched : false
    }
}

export const updateField = (state, fieldName, value) => {
    let field = {...state[fieldName]};
    field.value = value;
    field.valid = validateField(field);
    field.touched = !isNullOrEmpty(value);
    state[fieldName] = field;
    return state;
}