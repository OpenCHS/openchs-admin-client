import {BASIC_FORM, FETCH_FORM} from "../actions/form";

export default function basicForm(state = {}, action) {
    switch (action.type) {
        case BASIC_FORM:
            const {name, formType, programName, encounterTypes} = action;
            return {...state,
                name,
                formType,
                programName,
                encounterTypes
            };
        case FETCH_FORM:
            return action.form;
        default:
            return state;
    }
}