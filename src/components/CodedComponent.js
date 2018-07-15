import React, { Component } from 'react';
import { updateCodedField } from "../actions/fields";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import _ from 'lodash';
import { FormGroup, Label, Input } from 'reactstrap';

import FormElementCard from './FormElementCard';
import ChooseConcept from './ChooseConcept';

class CodedComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      concept: this.props.field.concept,
      mandatory: false,
      answers: (this.props.field.concept && this.props.field.concept.answers) || [],
      fieldHeader: this.props.field.name || 'Question'
    };
  }

  onChangeField(event) {
    this.setState({ ...this.state, fieldHeader: event.target.value });
  }

  onConceptSelected = (concept) => {
    this.setState({ concept: concept });
  };

  onChangeAnswers(rawAnswers) {
    const answers = this.state.answers;
    _.map(rawAnswers, (rawAnswer) => {
      const currentAnswer = _.find(answers, (stateAnswer) => { return stateAnswer.name === rawAnswer });
      if (currentAnswer) {
        currentAnswer.name = rawAnswer;
      } else {
        answers.push({ name: rawAnswer });
      }
    });
    this.setState(...this.state, answers);
    this.props.updateCodedField(this.props.groupId, this.props.field.id, this.props.field.name, this.props.type,
      answers, this.state.mandatory);
  }

  render() {
    const tagsFieldId = this.props.field.id + "_tags";
    const mandatoryFieldId = this.props.field.id + "_mandatory";
    const tags = _.map(this.state.concept.answers || this.state.concept.conceptAnswers, (answer) => (answer.name));
    const readOnly = this.props.readOnly;
    const tagsFieldLabel = readOnly ? "Answers" : "Type your choices. Press enter after each choice.";

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

        <div className="form-group">
          <label htmlFor={tagsFieldId}>{tagsFieldLabel}</label>
          <TagsInput value={tags} onChange={this.onChangeAnswers.bind(this)}
            id={tagsFieldId} inputProps={{ placeholder: "Answer", readOnly: readOnly }} />
        </div>

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

CodedComponent.propTypes = {
  groupId: PropTypes.string.isRequired,
  field: PropTypes.object,
  type: PropTypes.oneOf(['SingleSelect', 'MultiSelect']),
  fieldMetadata: PropTypes.object,
  collapse: PropTypes.string
};

export default connect(() => {
  return {};
}, { updateCodedField })(CodedComponent);