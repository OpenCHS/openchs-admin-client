import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { FormGroup, Label, Input, CardHeader, Card, CardBody } from 'reactstrap';

import ChooseConcept from './ChooseConcept';
import NumericConcept from './NumericConcept';
import { updateNumericField } from "../actions/fields";

class NumericComponent extends Component {
  constructor(props) {
    super(props);
    let concept = this.props.field.concept;
        
    this.state = {
      concept: concept,
      mandatory: false,
      fieldHeader: this.props.field.name || 'Question'
    };
  }

  onConceptSelected = (concept) => {
    this.setState({ concept: concept });
  };

  onChangeField(event) {
    const fieldName = event.target.value;
    this.props.updateNumericField(this.props.groupId, this.props.field.id, fieldName, this.props.field.lowAbsolute,
      this.props.field.highAbsolute, this.props.field.lowNormal, this.props.field.unit, this.state.mandatory);
    this.setState({ ...this.state, fieldHeader: fieldName });
  }

  onChangeMandatory() {
    this.setState(...this.state, { mandatory: !this.state.mandatory });
    this.props.updateNumericField(this.props.groupId, this.props.field.id, this.props.field.fieldName,
      this.props.field.lowAbsolute, this.props.field.highAbsolute,
      this.props.field.lowNormal, this.props.field.unit, this.state.mandatory);
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

            <NumericConcept readOnly={true} concept={this.state.concept} />

            <FormGroup check>
              <Label check>
                <Input type="checkbox" id={mandatoryFieldId}
                  onChange={this.onChangeMandatory.bind(this)}
                  checked={this.state.mandatory} />
                Required
                  </Label>
            </FormGroup>
          </CardBody>
        </div>
      </Card>
    );
  }
}

NumericComponent.propTypes = {
  groupId: PropTypes.string.isRequired,
  field: PropTypes.object,
  fieldMetadata: PropTypes.object,
  collapse: PropTypes.string
};

export default connect(() => {
  return {};
}, { updateNumericField })(NumericComponent);