import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';

import ChooseConcept from './ChooseConcept';
import FormElementCard from './FormElementCard';

class TextComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      concept: this.props.field.concept,
      fieldHeader: this.props.field.name || 'Question'
    };
  }

  onConceptSelected = (concept) => {
    this.setState({ concept: concept });
  };

  onChangeField(event) {
    this.setState({ ...this.state, fieldHeader: event.target.value });
  }

  render() {
    const mandatoryFieldId = this.props.field.id + "_mandatory";
    return (
      <FormElementCard
        collapse={this.props.collapse}
        field={this.props.field}
        headerText={this.state.fieldHeader}>
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

        <FormGroup check>
          <Label check>
            <Input type="checkbox" id={mandatoryFieldId} />
            Required
              </Label>
        </FormGroup>
      </FormElementCard>
    );
  }
}

TextComponent.propTypes = {
  groupId: PropTypes.string.isRequired,
  field: PropTypes.object,
  fieldMetadata: PropTypes.object,
  collapse: PropTypes.string,
  readonly: PropTypes.bool
};

export default TextComponent;