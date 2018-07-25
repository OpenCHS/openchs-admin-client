import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import _ from 'lodash';

class CodedComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: (this.props.field.concept && this.props.field.concept.answers) || []
    };
  }

  onChangeAnswers(rawAnswers) {
    if(this.props.readOnly) {
      return;
    }

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
  }

  render() {
    const tagsFieldId = this.props.field.uuid + "_tags";
    const tags = _.map(this.props.field.concept.answers || this.props.field.concept.conceptAnswers, (answer) => (answer.name));
    const readOnly = this.props.readOnly;
    const tagsFieldLabel = readOnly ? "Answers" : "Type your choices. Press enter after each choice.";

    return (
      <div className="form-group">
        <label htmlFor={tagsFieldId}>{tagsFieldLabel}</label>
        <TagsInput value={tags} onChange={this.onChangeAnswers.bind(this)}
          id={tagsFieldId} inputProps={{ placeholder: "Answer", disabled: readOnly }} />
      </div>
    );
  }
}

CodedComponent.propTypes = {
  field: PropTypes.object,
};

export default CodedComponent;