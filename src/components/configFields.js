import React from 'react';
import TextComponent from "./TextComponent";
import DateComponent from "./DateComponent";
import MultiCodedComponent from "./MultiCodedComponent";
import SingleCodedComponent from "./SingleCodedComponent";
import NumericComponent from "./NumericComponent";

const fieldsMetadata = [{
    id: "groupField",
    icon: "object-group",
    label: "Group",
    type: "Group"
}, {
    id: "textField",
    icon: "font",
    label: "Text",
    dataType: "Text",
    component: (groupId, field, collapse, readOnly, handleInputChange) => (
        <TextComponent groupId={groupId} field={field} fieldMetadata={fieldsMetadata[1]} key={field.id}
                       collapse={collapse} readOnly={readOnly} handleInputChange={handleInputChange}/>)
},{
    id: "calendarField",
    icon: "calendar",
    label: "Date",
    dataType: "Date",
    component: (groupId, field, collapse, readOnly) => (
        <DateComponent groupId={groupId} field={field} fieldMetadata={fieldsMetadata[2]} key={field.id}
                       collapse={collapse} readOnly={readOnly}/>)
}, {
    id: "multiCodedField",
    icon: "align-left",
    label: "Multiple choices",
    type: "MultiSelect",
    dataType: "Coded",
    component: (groupId, field, collapse, readOnly) => (
        <MultiCodedComponent groupId={groupId} field={field} fieldMetadata={fieldsMetadata[3]} key={field.id}
                            collapse={collapse} readOnly={readOnly}/>)
},{
    id: "singleCodedField",
    icon: "list",
    label: "Multiple choices",
    type: "SingleSelect",
    dataType: "Coded",
    component: (groupId, field, collapse, readOnly) => (
        <SingleCodedComponent groupId={groupId} field={field} fieldMetadata={fieldsMetadata[4]} key={field.id}
                             collapse={collapse} readOnly={readOnly}/>)
},{
    id: "numericField",
    icon: "circle-o-#",
    isStack: true,
    iconWrapper: "circle-o",
    iconContent: "#",
    label: "Number",
    dataType: "Numeric",
    component: (groupId, field, collapse, readOnly, handleInputChange) => (
        <NumericComponent groupId={groupId} field={field} fieldMetadata={fieldsMetadata[5]} key={field.id}
                       collapse={collapse} readOnly={readOnly} handleInputChange={handleInputChange} />)
}];
export default fieldsMetadata;