import React, {Component} from 'react';
import {FieldIcon} from "./FieldList";
import PropTypes from 'prop-types';

class TextComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {mandatory: false, fieldHeader: this.props.field.name || 'Question'}
    }

    onChangeField(event) {
        const fieldName = event.target.value;
        this.props.updateTextField(this.props.groupId, this.props.field.id, fieldName, this.state.mandatory);
        this.setState({...this.state, fieldHeader: fieldName});
    }

    onChangeMandatory(event) {
        this.setState(...this.state, {mandatory: !this.state.mandatory});
        this.props.updateTextField(this.props.groupId, this.props.field.id, this.props.field.name,
            this.state.mandatory);
        this.setState({...this.state, mandatory: !this.state.mandatory});
    }

    render() {
        const collapseId = "collapse_" + this.props.field.id;
        const headerId = "heading_" + this.props.field.id;
        const mandatoryFieldId = this.props.field.id + "_mandatory";
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
                                <input type="text" className="form-control" id={this.props.field.id}
                                       placeholder="Question Title" onChange={this.onChangeField.bind(this)}
                                       defaultValue={this.props.field.name}/>
                            </div>
                            <div className="form-group col-md-2">
                                <FieldIcon
                                    fieldMetadata={this.props.fieldMetadata}/>{" " + this.props.fieldMetadata.label}
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox" id={mandatoryFieldId}
                                           onChange={this.onChangeMandatory.bind(this)}
                                           checked={this.state.mandatory}/> Required
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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