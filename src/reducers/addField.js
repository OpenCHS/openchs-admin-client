import {
    ADD_FIELD, UPDATE_FIELD, ADD_GROUP, UPDATE_GROUP, INIT_GROUPS,
    UPDATE_TEXT_FIELD, UPDATE_CODED_FIELD, UPDATE_NUMERIC_FIELD
} from "../actions/fields";
import _ from 'lodash';
import {FETCH_GROUPS} from "../actions/form";

export default function addField(formGroups = [], action) {
    if (action.type === INIT_GROUPS) {
        return [];
    }
    if (action.type === FETCH_GROUPS) {
        return action.groups;
    }
    const clonedFormGroups = formGroups.slice(0);
    const groupId = action.groupId;
    const formGroup = _.find(clonedFormGroups, function (formGroup) {
        return formGroup.groupId === groupId;
    });
    if (!formGroup) {
        //console.log("no form group found for " + groupId);
    }
    let fieldIndex;
    let fieldElement;
    let concept;
    if (action.type === UPDATE_FIELD || action.type === UPDATE_CODED_FIELD ||
        action.type === UPDATE_NUMERIC_FIELD || action.type === UPDATE_TEXT_FIELD) {
        fieldIndex = _.findIndex(formGroup.formElements, function (field) {
            return field.id === action.fieldId;
        });
        fieldElement = formGroup.formElements[fieldIndex];
        concept = fieldElement.concept;
    }
    switch (action.type) {
        case ADD_FIELD:
            formGroup.formElements.push(action.field);
            return clonedFormGroups;
        case ADD_GROUP:
            clonedFormGroups.push(action.group);
            return clonedFormGroups;
        case UPDATE_GROUP:
            formGroup[action.groupField] = action.value;
            return clonedFormGroups;
        case UPDATE_FIELD:
            const formElement = _.find(formGroup.formElements, function(field) {
                return field.id === action.fieldId;
            });
            console.log(JSON.stringify(formElement));
            formElement.name = action.fieldName;
            formElement.dataType = action.fieldType;
            formElement.mandatory = action.mandatory;
            formElement.keyValues = action.fieldKeyValues;
            formElement.answers = action.answers;
            return clonedFormGroups;
        case UPDATE_TEXT_FIELD:
            formGroup.formElements[fieldIndex] =
                {
                    ...fieldElement,
                    name: action.fieldName,
                    concept: {...concept, name: action.fieldName, dataType: "Text"},
                    mandatory: action.mandatory
                };
            return clonedFormGroups;
        case UPDATE_CODED_FIELD:
            const answers = action.answers;
            formGroup.formElements[fieldIndex] =
                {
                    ...fieldElement,
                    name: action.fieldName,
                    type: action.fieldType,
                    concept: {...concept, name: action.fieldName, dataType: "Coded", answers},
                    mandatory: action.mandatory
                };
            return clonedFormGroups;
        case UPDATE_NUMERIC_FIELD:
            formGroup.formElements[fieldIndex] =
                {
                    ...fieldElement,
                    name: action.fieldName,
                    concept: {...concept, name: action.fieldName, dataType: "Numeric",
                        lowAbsolute: action.lowAbsolute, highAbsolute: action.highAbsolute,
                        lowNormal: action.lowNormal, highNormal: action.highNormal, unit: action.unit
                    },
                    mandatory: action.mandatory
                };
            return clonedFormGroups;
        default:
            return formGroups;
    }
}