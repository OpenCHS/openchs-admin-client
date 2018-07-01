export const ADD_FIELD = "ADD_FIELD";
export const ADD_GROUP = "ADD_GROUP";
export const UPDATE_GROUP = "UPDATE_GROUP";
export const UPDATE_FIELD = "UPDATE_FIELD";
export const UPDATE_TEXT_FIELD = "UPDATE_TEXT_FIELD";
export const UPDATE_NUMERIC_FIELD = "UPDATE_NUMERIC_FIELD";
export const UPDATE_DATE_FIELD = "UPDATE_DATE_FIELD";
export const UPDATE_CODED_FIELD = "UPDATE_CODED_FIELD";
export const INIT_GROUPS = "INIT_GROUPS";

export default function addField(field, groupId) {
    return {type: ADD_FIELD, field, groupId}
}

export function addGroup(group) {
    return {type: ADD_GROUP, group}
}

export function updateGroup(groupId, groupField, value) {
    return {type: UPDATE_GROUP, groupId, groupField, value}
}

export function updateField(groupId, fieldId, fieldName, fieldType, fieldKeyValues, answers, mandatory) {
    return {type: UPDATE_FIELD, groupId, fieldId, fieldName, fieldType, fieldKeyValues, answers, mandatory}
}

export function updateTextField(groupId, fieldId, fieldName, mandatory) {
    return {type: UPDATE_TEXT_FIELD, groupId, fieldId, fieldName, mandatory}
}

export function updateCodedField(groupId, fieldId, fieldName, fieldType, answers, mandatory) {
    return {type: UPDATE_CODED_FIELD, groupId, fieldId, fieldName, fieldType, answers, mandatory}
}

export function updateNumericField(groupId, fieldId, fieldName, lowAbsolute, highAbsolute,
                                   lowNormal, highNormal, unit, mandatory) {
    return {type: UPDATE_NUMERIC_FIELD, groupId, fieldId, fieldName, lowAbsolute, highAbsolute,
        lowNormal, highNormal, unit, mandatory}
}

export function initGroups(groups) {
    return {type: INIT_GROUPS, groups}
}