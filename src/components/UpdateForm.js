import React, {Component} from 'react';
import addNewForm from "../actions/form";
import {connect} from "react-redux";
import TagsInput from 'react-tagsinput';

class UpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {name: this.props.name, formType: this.props.formType, programName: this.props.programName,
            encounterTypes: this.props.encounterTypes}
    }

    update() {
        this.props.addNewForm(this.state.name, this.state.formType, this.state.programName, this.state.encounterTypes);
    };

    onChangeField(event) {
        this.setState(Object.assign({}, this.state, {[ event.target.name ]: event.target.value}));
    };

    onChangeEncounterField(encounterTypes) {
        this.setState(Object.assign({}, this.state, {encounterTypes: encounterTypes}));
    };

    programNameElement() {
        return <div className="form-group">
            <label htmlFor="programName">Program Name</label>
            <select className="form-control" id="programNameSelect" name="programName"
                    onChange={this.onChangeField.bind(this)}
                    defaultValue={this.state.programName}>
                <option>Mother</option>
                <option>Child</option>
                <option>Diabetes</option>
            </select>
        </div>
    }

    encounterTypesElement() {
        return <div className="form-group">
            <label htmlFor="encounterTypes">Encounter Type</label>
            <TagsInput value={this.state.encounterTypes || []} onChange={this.onChangeEncounterField.bind(this)} id="encounterTypes"
                       inputProps={{placeholder: ""}}/>
        </div>;
    }

    render() {
        const encounterTypes = this.state.formType === "Encounter" || this.state.formType === "ProgramEncounter";
        const programBased = this.state.formType === "ProgramEncounter" ||
            this.state.formType === "ProgramExit" ||
            this.state.formType === "ProgramEnrolment";
        return (
            <form>
                <div className="form-group has-danger">
                    <label htmlFor="formName">Form Name</label>
                    <input type="text" className="form-control  form-control-danger" id="formName"
                           name="name"
                           aria-describedby="formNameHelp"
                           defaultValue={this.state.name}
                           placeholder="Enter form name" onChange={this.onChangeField.bind(this)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="formType">Form Type</label>
                    <select className="form-control" id="formTypeSelect"
                            name="formType"
                            onChange={this.onChangeField.bind(this)}
                            defaultValue={this.state.formType}>
                        <option>IndividualProfile</option>
                        <option>Encounter</option>
                        <option>ProgramEncounter</option>
                        <option>ProgramEnrolment</option>
                        <option>ProgramExit</option>
                    </select>
                </div>
                {programBased && this.programNameElement()}
                {encounterTypes && this.encounterTypesElement()}
                <button type="button" className="btn btn-primary" onClick={this.update.bind(this)}>Update</button>
            </form>
        );
    }
}

export default connect((state) => {
    return {name: state.currentForm.name, formType: state.currentForm.formType,
        programName: state.currentForm.programName, encounterTypes: state.currentForm.encounterTypes}
}, {addNewForm})(UpdateForm);