import React, { Component } from 'react';
import addNewForm from "../actions/form";
import { connect } from "react-redux";
import TagsInput from 'react-tagsinput';

class UpdateForm extends Component {
  constructor(props) {
    super(props);
  }

  onUpdate() {
    //this.props.addNewForm(this.state.name, this.state.formType, this.state.programName, this.state.encounterTypes);
  };

  onChangeField(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onChangeEncounterField(encounterTypes) {
    this.setState({
      encounterTypes: encounterTypes
    });
  };

  programNameElement() {
    return <div className="form-group">
      <label htmlFor="programName">Program Name</label>
      <select className="form-control" id="programNameSelect" name="programName"
        onChange={this.onChangeField.bind(this)}
        defaultValue={this.props.form.programName}>
        <option>Mother</option>
        <option>Child</option>
        <option>Diabetes</option>
      </select>
    </div>
  }

  encounterTypesElement() {
    return <div className="form-group">
      <label htmlFor="encounterTypes">Encounter Type</label>
      <TagsInput value={this.props.form.encounterTypes || []} onChange={this.onChangeEncounterField.bind(this)} id="encounterTypes"
        inputProps={{ placeholder: "" }} />
    </div>;
  }

  render() {
    const encounterTypes = this.props.form.formType === "Encounter" || this.props.form.formType === "ProgramEncounter";
    const programBased = this.props.form.formType === "ProgramEncounter" ||
      this.props.form.formType === "ProgramExit" ||
      this.props.form.formType === "ProgramEnrolment";
    return (
      <form>
        <div className="form-group has-danger">
          <label htmlFor="formName">Form Name</label>
          <input type="text" className="form-control  form-control-danger" id="formName"
            name="name"
            aria-describedby="formNameHelp"
            defaultValue={this.props.form.name}
            placeholder="Enter form name" onChange={this.onChangeField.bind(this)} />
        </div>
        <div className="form-group">
          <label htmlFor="formType">Form Type</label>
          <select className="form-control" id="formTypeSelect"
            name="formType"
            onChange={this.onChangeField.bind(this)}
            defaultValue={this.props.form.formType}>
            <option>IndividualProfile</option>
            <option>Encounter</option>
            <option>ProgramEncounter</option>
            <option>ProgramEnrolment</option>
            <option>ProgramExit</option>
          </select>
        </div>
        {programBased && this.programNameElement()}
        {encounterTypes && this.encounterTypesElement()}
        <button type="button" className="btn btn-primary" onClick={this.onUpdate.bind(this)}>Update</button>

        <div className="mt-5"><pre>{JSON.stringify(this.props.form, null, 2)}</pre></div>
      </form>
    );
  }
}

export default UpdateForm;

// export default connect((state) => {
//   return {
//     name: state.currentForm.name, formType: state.currentForm.formType,
//     programName: state.currentForm.programName, encounterTypes: state.currentForm.encounterTypes
//   }
// }, { addNewForm })(UpdateForm);