import React, {Component} from 'react';
import {connect} from "react-redux";
import {updateGroup} from "../actions/fields";
import fieldsMetadata from './configFields';
import PropTypes from 'prop-types';
import _ from 'lodash';

class FormGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {groupName: this.props.name};
    }

    onChangeField(event) {
        this.props.updateGroup(this.props.id, event.target.name, event.target.value);
    }

    renderGroup() {
        const collapse = "collapse";
        const collapseClass = this.state['groupName'] ? collapse : collapse + " show";
        const collapseId = "collapse_" + this.props.id;
        const headerId = "heading_" + this.props.id;
        const formHeader = this.props.name ? ' ' + this.props.name :
            (this.props.displayName ? ' ' + this.props.displayName : '');
        return (
            <div className="card">
                <div className="card-header py-2" id={headerId}>
                    <a data-toggle="collapse" href={"#" + collapseId} aria-expanded="true"
                       aria-controls={collapseId}>
                        <strong>{formHeader}</strong>
                    </a>
                </div>
                <div id={collapseId} className={collapseClass} aria-labelledby={headerId}
                     data-parent="#accordion">
                    <div className="card-body">
                        <div className="form-row">
                            <div className="form-inline mb-2">
                                <label htmlFor="groupName" className="mr-sm-2">Group: </label>
                                <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0"
                                       id={this.props.id + '_groupName'}
                                       placeholder="Enter group" defaultValue={this.props.name} name="name"
                                       onChange={this.onChangeField.bind(this)}/>
                                <label htmlFor="groupDisplay" className="mr-sm-2">Display:</label>
                                <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0"
                                       id={this.props.id + '_groupDisplay'} name="displayName"
                                       placeholder="Enter display" defaultValue={this.props.displayName}
                                       onChange={this.onChangeField.bind(this)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }

    renderFields() {
        const inputFields = [];
        let i = 0;
        const collapse = "collapse";
        _.forEach(this.props.fields, (inputField) => {
            if (!inputField.concept) {
                console.log("Null concept for: " + inputField.id);
                console.log(" name, " + inputField.name + ", type: " + inputField.type);
            }
            i++;
            const fieldMetadata = _.find(fieldsMetadata, (field) => {
                return inputField.concept && (field.dataType === inputField.concept.dataType);
            });
            if (!fieldMetadata) {
                console.log("No field metadata found for " + (inputField.name + ", dataType " + inputField.dataType));
            } else {
                const fieldId = (inputField.id || inputField.name).replace(/[^a-zA-Z0-9]/g, "_");
                const collapseClass = this.props.collapse === true ? collapse :
                    (this.props.fields.length === i ? collapse + " show" : collapse);
                inputField.id = fieldId;
                const readonly = true;
                const fieldComponent = fieldMetadata.component(this.props.id, inputField, collapseClass, readonly);

                console.log(fieldId + " cmp: " + fieldComponent);
                inputFields.push(
                    <div className="row" key={fieldId}>
                        <div className="col-12">
                            {fieldComponent}
                        </div>
                    </div>
                );
            }
        });
        return inputFields;
    }

    render() {
        return (
            <div>
                {this.renderGroup()}
                <div id="accordion" role="tablist">
                    {this.renderFields()}
                </div>
            </div>
        );
    }
}

FormGroup.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    displayName: PropTypes.string,
    fields: PropTypes.array,
    collapse: PropTypes.bool
};

export default connect((state) => {
    return {}
}, {updateGroup})(FormGroup);