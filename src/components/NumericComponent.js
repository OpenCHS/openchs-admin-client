import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';

import FormElementCard from './FormElementCard';
import ChooseConcept from './ChooseConcept';
import NumericConcept from './NumericConcept';

class NumericComponent extends Component {

  onConceptSelected = (concept) => {
    this.setState({ concept: concept });
  };

  render() {
    const mandatoryFieldId = this.props.field.id + "_mandatory";
    return (
      <FormElementCard
        collapse={this.props.collapse}
        field={this.props.field}
        headerText={this.props.field.name}>
        <FormGroup>
          <Label for="elementName">Element name</Label>
          <Input placeholder="Question title"
            id="elementName"
            name="name"
            type="text"
            onChange={({ target }) => this.props.handleInputChange(target.name, target.value, this.props.field)}
            value={this.props.field.name} />
        </FormGroup>

        <ChooseConcept
          id="chooseConcept"
          concept={this.props.field.concept}
          value={this.props.field.concept.name}
          modalHeader="Choose Concept"
          onConceptSelected={(concept) => this.props.handleInputChange('concept', concept, this.props.field)} />

        <NumericConcept readOnly={true} concept={this.props.field.concept} />

        <FormGroup check>
          <Label check>
            <Input
              name="mandatory"
              type="checkbox"
              id={mandatoryFieldId}
              onChange={({ target }) => this.props.handleInputChange(target.name, target.checked, this.props.field)}
              checked={this.props.field.mandatory} />
            Required
                  </Label>
        </FormGroup>
      </FormElementCard>
    );
  }
}

NumericComponent.propTypes = {
  groupId: PropTypes.string.isRequired,
  field: PropTypes.object,
  fieldMetadata: PropTypes.object,
  collapse: PropTypes.string
};

export default NumericComponent;