import React, {Component} from 'react';
import {FieldIcon} from "./FieldList";
import PropTypes from 'prop-types';

class BooleanComponent extends Component {
    constructor(props) {
        super(props);
    }

    onChangeField(event) {
        const fieldName = event.target.value;
        this.props.updateField(this.props.groupId, this.props.field.id, fieldName, this.props.dataType,
            this.props.fieldKeyValues);
    }

    onChangeBoolField(event) {
        const value = event.target.value;
        const isTrueValue = event.target.id === this.trueId();
        const keyValues = this.props.field.keyValues || [{'key': 'TrueValue'}, {'key': 'FalseValue'}];
        const trueValue = isTrueValue ? value : keyValues[0]['value'];
        const falseValue = !isTrueValue ? value : keyValues[1]['value'];
        this.props.updateField(this.props.groupId, this.props.field.id, this.props.field.name, this.props.dataType,
            [{...keyValues[0], 'value': trueValue}, {...keyValues[1], 'value': falseValue}]);
    }

    render() {
        const collapseId = "collapse_" + this.props.field.id;
        const headerId = "heading_" + this.props.field.id;
        const trueValue = this.props.field.keyValues && this.props.field.keyValues[0]['value'];
        const falseValue = this.props.field.keyValues && this.props.field.keyValues[1]['value'];
        return (
            <div className="card">
                <div className="card-header py-2" id={headerId}>
                    <a data-toggle="collapse" href={"#" + collapseId} aria-expanded="true"
                       aria-controls={collapseId}>
                        {this.props.field.name || 'Question'}
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
                        <div className="form-row">
                            <div className="form-group col-md-5">
                                <input type="text" className="form-control" id={this.trueId()}
                                       placeholder="True Value" onChange={this.onChangeBoolField.bind(this)}
                                       defaultValue={trueValue}/>
                            </div>
                            <div className="form-group col-md-5">
                                <input type="text" className="form-control" id={this.falseId()}
                                       placeholder="False Value" onChange={this.onChangeBoolField.bind(this)}
                                       defaultValue={falseValue}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input className="form-check-input" type="checkbox"/> Required
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    trueId() {
        return this.boolId(true);
    }

    falseId() {
        return this.boolId(false);
    }

    boolId(bool) {
        return bool + this.props.field.id;
    }
}

BooleanComponent.propTypes = {
    groupId: PropTypes.string.isRequired,
    field: PropTypes.object,
    fieldMetadata: PropTypes.object,
    collapse: PropTypes.string
};