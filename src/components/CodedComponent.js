import React, { Component } from 'react';
import { FieldIcon } from "./FieldList";
import { updateCodedField } from "../actions/fields";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import _ from 'lodash';
import { FormGroup, Label, Col, Input, Row, CardHeader, Card, CardBody } from 'reactstrap';

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
    const collapseId = "collapse_" + this.props.field.id;
    const headerId = "heading_" + this.props.field.id;
    const tagsFieldId = this.props.field.id + "_tags";
    const mandatoryFieldId = this.props.field.id + "_mandatory";
    const tags = _.map(this.state.concept.answers || this.state.concept.conceptAnswers, (answer) => (answer.name));
    const readOnly = this.props.readOnly;
    const tagsFieldLabel = readOnly ? "Answers" : "Type your choices. Press enter after each choice.";

    return (
      <div className="card">
        <div className="card-header py-2" id={headerId}>
          <a data-toggle="collapse" href={"#" + collapseId} aria-expanded="true"
            aria-controls={collapseId}>
            {this.state.fieldHeader}
          </a>
        </div>
        <div id={collapseId} className={this.props.collapse} aria-labelledby={headerId}
          data-parent="#accordion">
          <div className="card-body">

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

          </div>
        </div>
      </div>
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

export default connect((state) => {
  return {}
}, { updateCodedField })(CodedComponent);