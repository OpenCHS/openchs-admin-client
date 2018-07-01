import basicForm from "./basicForm";
import addField from "./addField";

export default class Reducers {
    static createReducers() {
        const reducerMap = {};
        reducerMap['currentForm'] = basicForm;
        reducerMap['formElementGroups'] = addField;
        return reducerMap;
    }
}