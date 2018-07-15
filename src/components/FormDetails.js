import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import _ from 'lodash';

import FormGroup from "./FormGroup";
import UpdateForm from "./UpdateForm";
import FieldList from "./FieldList";

import addField, { addGroup } from "../actions/fields";
import updateBasicForm, { fetchGroups } from "../actions/form";

class FormDetails extends Component {
  constructor(props) {
    super(props);
    if (this.props.formGroups.length === 0) {
      const firstGroup = createGroup('group_1');
      this.props.formGroups.push(firstGroup);
      this.state = { formGroups: this.props.formGroups, currentGroup: firstGroup, showFields: true };
    } else if (this.props.formGroups.length === 1) {
      this.state = { formGroups: this.props.formGroups, currentGroup: this.props.formGroups[0], showFields: true };
    }
    else {
      this.state = { formGroups: this.props.formGroups, showFields: false, currentGroup: {} };
    }

    this.onSelectField = this.onSelectField.bind(this);
    this.addGroupField = this.addGroupField.bind(this);
  }

  componentDidMount() {
    const emptyCallback = () => { };

    //debugger;
    // this.props.updateBasicForm(form.name, form.formType, form.programName, form.encounterTypes);
    this.props.fetchGroups(this.props.form.name, this.props.match.params.formUUID, emptyCallback);
  }

  renderForm() {
    return (
      <div className="col-9">
        <form>
          {this.renderGroups()}
          <button type="button" className="btn btn-success pull-right"
            onClick={() => {
              const completeForm = {
                ...this.props.form,
                formElementGroups: this.state.formGroups
              };
              this.saveForm(completeForm);
              this.props.history.push("/forms");
            }}>
            <i className={`glyphicon glyphicon-save`} />
            Save your form
                    </button>
        </form>
      </div>);
  }

  saveForm(form) {
    _.remove(form.formElementGroups, (group) => (_.isEmpty(group.name)));
    console.log(JSON.stringify(form));
    fetch("/forms", {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'ORGANISATION-NAME': 'OpenCHS'
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      });
  }

  onSelectField(field, groupId) {
    let currentGroup;
    let showFields;
    if (field.type === 'Group') {
      const groupId = "group_" + (this.props.formGroups.length + 1);
      currentGroup = createGroup(groupId);
      addGroup(currentGroup);
      this.props.formGroups.push(currentGroup);
      showFields = true;
    } else {
      currentGroup = _.find(this.props.formGroups, (group) => {
        return group.groupId === groupId;
      });
      const groupFields = currentGroup.formElements;
      const id = groupId + field.id + currentGroup.formElements.length + 1;
      let groupField = { id, icon: field.icon, concept: { dataType: field.dataType } };
      if (field.type) {
        groupField = { ...groupField, type: field.type };
      }
      addField(groupField, currentGroup.groupId);
      groupFields.push(groupField);
      showFields = false;
    }
    this.setState({ formGroups: this.props.formGroups, currentGroup, showFields });
  }

  /**
   * single group, no fields added show the fields panel
   * single group, selected a field, add field component and 'Add field' button. Except last field, all other fields
   * are collapsed.
   * single group, click on 'Add field'. Collapse all field, show fields panel
   * click on group in fields panel, a new group should be added, all other group fields collapsed. just the new group
   * will have the fields panel
   * @returns {Array}
   */
  renderGroups() {
    const formElements = [];
    let i = 0;
    _.forEach(this.props.formGroups, (group) => {
      const subElements = [];
      group.groupId = (group.groupId || group.name).replace(/[^a-zA-Z0-9]/g, "_");
      const isCurrentGroup = (this.state.currentGroup &&
        group.groupId === this.state.currentGroup.groupId) || false;
        subElements.push(
        <FormGroup group={group} id={group.groupId} name={group.name} display={group.display}
          fields={group.formElements} key={group.groupId + i++}
          collapse={this.state.showFields || !isCurrentGroup} />
      );
      if (this.state.showFields && isCurrentGroup) {
        subElements.push(this.showFields(group));
      } else {
        subElements.push(
          <button type="button" className="btn btn-secondary btn-block"
            onClick={() => (this.addGroupField(group))} key={group.groupId + "_bt"}>
            Add a field
          </button>);
      }
      
      formElements.push(<div key={group.groupId + "_border"} className="border border-secondary rounded mb-4">{subElements}</div>);
    });
    return formElements;
  }

  componentDidUpdate() {
    if (this.state.anchor) {
      this.refs[this.state.anchor].scrollIntoView();
      delete this.state.anchor;
    }
  }

  addGroupField(currentGroup) {
    this.setState({ currentGroup, showFields: true, anchor: this.props.groupId + "_FieldList" });
  }

  showFields(group) {
    return <div ref={this.props.groupId + "_FieldList"} key={this.props.groupId + "_FieldList"}>
      <FieldList onClick={this.onSelectField.bind(this)} groupId={group.groupId} groupName={group.name} />
    </div>;
  }

  render() {
    console.log("render form details");
    return (
      <div className="row">
        {this.renderForm()}
        <div className="col-3">
          <UpdateForm />
        </div>
      </div>
    );
  }
}

FormDetails.defaultProps = {
  formGroups: [createGroup('group_1')]
};

FormDetails.propTypes = {
  formGroups: PropTypes.array,
  currentGroup: PropTypes.object,
  showFields: PropTypes.bool
};

function createGroup(id) {
  return { groupId: id, name: '', display: '', formElements: [] }
}

export default connect((state) => {
  return { form: state.currentForm, formGroups: state.formElementGroups }
}, { updateBasicForm, fetchGroups, addField, addGroup })(FormDetails);