import React from 'react';
import DateComponent from "./concepts/DateComponent";
import MultiCodedComponent from "./concepts/MultiCodedComponent";
import SingleCodedComponent from "./concepts/SingleCodedComponent";
import NumericComponent from "./concepts/NumericComponent";

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
    component: (groupId, field, collapse, readOnly) => (
        <div></div>)
},{
    id: "calendarField",
    icon: "calendar",
    label: "Date",
    dataType: "Date",
    component: (groupId, field, collapse, readOnly, handleKeyValuesChange) => (
        <DateComponent groupId={groupId} field={field} fieldMetadata={fieldsMetadata[2]} key={field.id}
                       collapse={collapse} readOnly={readOnly} handleKeyValuesChange={handleKeyValuesChange} />
    )
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
    component: (groupId, field, collapse, readOnly) => (
        <NumericComponent groupId={groupId} field={field} fieldMetadata={fieldsMetadata[5]} key={field.id}
                       collapse={collapse} readOnly={readOnly} />)
}];
export default fieldsMetadata;