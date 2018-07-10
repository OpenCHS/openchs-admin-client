import React, {Component} from 'react';
import {FieldIcon} from "./FieldList";
import PropTypes from 'prop-types';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import _ from 'lodash';

class CodedComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mandatory: false,
            answers: (this.props.field.concept && this.props.field.concept.answers)|| [],
            fieldHeader: this.props.field.name || 'Question'};
    }

    onChangeFieldName(event) {
        const fieldName = event.target.value;
        this.props.updateCodedField(this.props.groupId, this.props.field.id, fieldName, this.props.type,
            this.state.answers, this.state.mandatory);
        this.setState({...this.state, fieldHeader: fieldName});
    }

    onChangeAnswers(rawAnswers) {
        const answers = this.state.answers;
        _.map(rawAnswers, (rawAnswer)=>{
            const currentAnswer = _.find(answers, (stateAnswer)=>{return stateAnswer.name === rawAnswer});
            if (currentAnswer) {
                currentAnswer.name = rawAnswer;
            } else {
                answers.push({name: rawAnswer});
            }
        });
        this.setState(...this.state, answers);
        this.props.updateCodedField(this.props.groupId, this.props.field.id, this.props.field.name, this.props.type,
            answers, this.state.mandatory);
    }

    onChangeMandatory(event) {
        this.setState(...this.state, {mandatory: !this.state.mandatory});
        this.props.updateCodedField(this.props.groupId, this.props.field.id, this.props.field.name, this.props.type,
            this.state.answers, this.state.mandatory);
    }

    render() {
        const collapseId = "collapse_" + this.props.field.id;
        const headerId = "heading_" + this.props.field.id;
        const tagsFieldId = this.props.field.id + "_tags";
        const mandatoryFieldId = this.props.field.id + "_mandatory";
        const tags = _.map(this.state.answers, (answer)=>(answer.name));
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
                        <div className="form-row">
                            <div className="form-group col-md-10">
                                <input readOnly={readOnly} type="text" className="form-control" id={this.props.field.id}
                                       placeholder="Question Title" onChange={this.onChangeFieldName.bind(this)}
                                       defaultValue={this.props.field.name}/>
                            </div>
                            <div className="form-group col-md-2">
                                <FieldIcon
                                    fieldMetadata={this.props.fieldMetadata}/>{" " + this.props.fieldMetadata.label}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor={tagsFieldId}>{tagsFieldLabel}</label>
                            <TagsInput value={tags} onChange={this.onChangeAnswers.bind(this)}
                                       id={tagsFieldId} inputProps={{placeholder: "Answer", readOnly: readOnly}}/>
                        </div>
                        <div className="form-group">
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox" name={mandatoryFieldId}
                                    required={this.state.mandatory} onChange={this.onChangeMandatory.bind(this)}/> Required
                                </label>
                            </div>
                        </div>
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

export default CodedComponent;