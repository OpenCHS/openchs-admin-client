import React, { Component } from 'react';
import { FieldIcon } from "./FieldList";
import { updateField } from "../actions/fields";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import _ from "lodash";
import { FormGroup, Label, Col, Input, Row, CardHeader, Card, CardBody } from 'reactstrap';

import ChooseConcept from './ChooseConcept';

const dateSubFields = [
  { id: "days_cb", value: "days", label: "Days" },
  { id: "weeks_cb", value: "weeks", label: "Weeks" },
  { id: "months_cb", value: "months", label: "Months" },
  { id: "years_cb", value: "years", label: "Years" },
];

class DateComponent extends Component {
  constructor(props) {
    super(props);
    const dateSubFieldsState = {};
    dateSubFields.forEach((dateSubField) => {
      const checked = this.checked(dateSubField);
      Object.assign(dateSubFieldsState,
        {
          [dateSubField.id + this.props.field.id]:
          {
            checked,
            dateSubField
          }
        });
    });
    this.state = {
      concept: this.props.field.concept,
      dateSubFieldsState, 'mandatory': this.props.field.mandatory || false,
      fieldHeader: this.props.field.name || 'Question'
    };
  }

  onChangeField(event) {
    this.setState({ ...this.state, fieldHeader: event.target.value });
  }

  onConceptSelected = (concept) => {
    this.setState({ concept: concept });
  };

  renderDateSubField(dateSubField) {
    const dateSubFieldId = dateSubField.id + this.props.field.id;
    return (<div className="form-check form-check-inline" key={dateSubFieldId}>
      <label className="form-check-label">
        <input className="form-check-input" type="checkbox" id={dateSubFieldId}
          checked={this.state.dateSubFieldsState[dateSubFieldId]['checked']}
          onChange={this.onChangeDateField.bind(this)} />{dateSubField.label}
      </label>
    </div>);
  }

  checked(dateSubField) {
    const dateSubFieldValues = this.dateSubFieldValues();
    return (dateSubFieldValues && dateSubFieldValues.includes(dateSubField.value)) || false;
  }

  dateSubFieldValues() {
    return (this.props.field.keyValues &&
      this.props.field.keyValues[0] &&
      this.props.field.keyValues[0]["value"]) || [];
  }

  renderDateSubFields() {
    let dateSubFieldComponents = [];
    dateSubFields.forEach((dateSubField) => (dateSubFieldComponents.push(this.renderDateSubField(dateSubField))));
    return (<div className="form-group">
      {dateSubFieldComponents}
    </div>);
  }

  onChangeDateField(event) {
    const checked = event.target.checked;
    let dateSubFieldValues = this.dateSubFieldValues();
    const dateSubFieldValue = this.state.dateSubFieldsState[event.target.id].dateSubField.value;
    if (dateSubFieldValues && !checked) {
      _.remove(dateSubFieldValues, (e) => (e === dateSubFieldValue));
    } else {
      dateSubFieldValues.push(dateSubFieldValue);
    }
    const keyValues = dateSubFieldValues ? [{ "key": "durationOptions", "value": dateSubFieldValues }] : [];
    this.props.updateField(this.props.groupId, this.props.field.id, this.props.field.name, this.props.dataType,
      keyValues, this.props.field.answers);
    const dateField = this.state.dateSubFieldsState[event.target.id];
    this.setState(...this.state,
      {
        dateSubFieldsState: {
          ...this.state.dateSubFieldsState,
          [event.target.id]: { ...dateField, checked: checked }
        }
      });
  }

  onChangeMandatory(event) {
    const isMandatory = !this.state.mandatory;
    this.setState(...this.state, { mandatory: isMandatory });
    this.props.updateField(this.props.groupId, this.props.field.id, this.props.field.name, this.props.dataType,
      this.props.field.keyValues, this.props.field.answers, isMandatory);
  }

  render() {
    const collapseId = "collapse_" + this.props.field.id;
    const headerId = "heading_" + this.props.field.id;
    const mandatoryFieldId = this.props.field.id + "_mandatory";
    return (
      <Card>
        <CardHeader className="py-2" id={headerId}>
          <a data-toggle="collapse" href={"#" + collapseId} aria-expanded="true"
            aria-controls={collapseId}>
            {this.state.fieldHeader}
          </a>
        </CardHeader>
        <div id={collapseId} className={this.props.collapse} aria-labelledby={headerId}
          data-parent="#accordion">
          <CardBody>
            <FormGroup>
              <Label for="elementName">Element name</Label>
              <Input placeholder="Question title"
                type="text"
                onChange={this.onChangeField.bind(this)}
                value={this.state.fieldHeader} />
            </FormGroup>

            <ChooseConcept
              id="chooseConcept"
              concept={this.state.concept}
              value={this.state.concept.name}
              modalHeader="Choose Concept"
              onConceptSelected={this.onConceptSelected} />

            {this.renderDateSubFields()}

            <FormGroup check>
              <Label check>
                <Input type="checkbox" id={mandatoryFieldId} />
                Required
            </Label>
            </FormGroup>
          </CardBody>
        </div>
      </Card>
    );
  }
}

DateComponent.propTypes = {
  groupId: PropTypes.string.isRequired,
  field: PropTypes.object,
  fieldMetadata: PropTypes.object,
  collapse: PropTypes.string
};

export default connect((state) => {
  return { dataType: 'Date' };
}, { updateField })(DateComponent);