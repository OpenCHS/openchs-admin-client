import React, {Component} from 'react';
import {FieldIcon} from "./FieldList";
import PropTypes from 'prop-types';

class NumericComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {mandatory: false, fieldHeader: this.props.field.name || 'Question'}
    }

    onChangeField(event) {
        const fieldName = event.target.value;
        this.props.updateNumericField(this.props.groupId, this.props.field.id, fieldName, this.props.field.lowAbsolute,
            this.props.field.highAbsolute, this.props.field.lowNormal, this.props.field.unit, this.state.mandatory);
        this.setState({...this.state, fieldHeader: fieldName});
    }

    onChangeMandatory(event) {
        this.setState(...this.state, {mandatory: !this.state.mandatory});
        this.props.updateNumericField(this.props.groupId, this.props.field.id, this.props.field.fieldName,
            this.props.field.lowAbsolute, this.props.field.highAbsolute,
            this.props.field.lowNormal, this.props.field.unit, this.state.mandatory);
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
                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <label htmlFor="lowAbsolute">Low Absolute</label>
                                <input type="text" className="form-control" id="lowAbsolute"
                                       defaultValue={this.props.field.concept.lowAbsolute}/>
                            </div>
                            <div className="form-group col-md-2">
                                <label htmlFor="highAbsolute">High Absolute</label>
                                <input type="text" className="form-control" id="highAbsolute"
                                       defaultValue={this.props.field.concept.highAbsolute}/>
                            </div>
                            <div className="form-group col-md-2">
                                <label htmlFor="lowNormal">Low Normal</label>
                                <input type="text" className="form-control" id="lowNormal"
                                       defaultValue={this.props.field.concept.lowNormal}/>
                            </div>
                            <div className="form-group col-md-2">
                                <label htmlFor="highNormal">High Normal</label>
                                <input type="text" className="form-control" id="highNormal"
                                       defaultValue={this.props.field.concept.highNormal}/>
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="unit">Unit</label>
                                <select id="unit" className="form-control"
                                        defaultValue={this.props.field.concept.unit}>
                                    <option defaultValue="">Choose...</option>
                                    <option>cm</option>
                                    <option>kg</option>
                                    <option>mm Hg</option>
                                    <option>g/dL</option>
                                    <option>beats/minute</option>
                                    <option>breaths/minute</option>
                                    <option>&#8451;</option>
                                    <option>&#8457;</option>
                                </select>
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

NumericComponent.propTypes = {
    groupId: PropTypes.string.isRequired,
    field: PropTypes.object,
    fieldMetadata: PropTypes.object,
    collapse: PropTypes.string
};

export default NumericComponent;