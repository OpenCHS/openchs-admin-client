import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
// import produce from "immer"

import FormGroup from "./FormGroup";
import UpdateForm from "./UpdateForm";
import FieldList from "./FieldList";

import config from '../config';
import handleErrors from '../lib/handleErrors';

class FormDetailsNew extends Component {

  constructor(props) {
    super(props);

    this.state = { form: {}, showFields: true, currentGroup: {} };

    this.onSelectField = this.onSelectField.bind(this);
    this.addGroupField = this.addGroupField.bind(this);
  }

  componentDidMount() {
    return fetch(`/forms/export?formUUID=${this.props.match.params.formUUID}`, {
      credentials: 'include',
      Accept: 'application/json',
      headers: { "ORGANISATION-NAME": config.orgName }
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else if (response.status === 401 || response.status === 403) {
          window.location.pathname = '/';
          return null;
        }
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      })
      .then((form) => {
        this.setState({ form: form });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderForm() {
    return (
      <div className="col-9">
        <form>
          {this.renderGroups()}
          <button type="button" className="btn btn-success pull-right"
            onClick={() => {
              this.saveForm();
              this.props.history.push("/forms");
            }}>
            <i className={`glyphicon glyphicon-save`} />
            Save your form
                    </button>
        </form>
      </div>);
  }

  saveForm() {
    const form = this.state.form;
    // form.name = "Mother Enrolment New";
    // alert(JSON.stringify(form));
    fetch("/forms", {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'ORGANISATION-NAME': config.orgName
      },
      body: JSON.stringify(form),
    })
      .then(handleErrors)
      .catch(err => {
        alert(err);
      });
  }

  onSelectField(field, groupId) {
    let currentGroup;
    let showFields;
    if (field.type === 'Group') {
      const groupId = "group_" + (this.state.form.formElementGroups.length + 1);
      currentGroup = createGroup(groupId);
      // addGroup(currentGroup);
      this.state.form.formElementGroups.push(currentGroup);
      showFields = true;
    } else {
      currentGroup = _.find(this.state.form.formElementGroups, (group) => {
        return group.groupId === groupId;
      });
      const groupFields = currentGroup.formElements;
      const id = groupId + field.id + currentGroup.formElements.length + 1;
      let groupField = { id, icon: field.icon, concept: { dataType: field.dataType } };
      if (field.type) {
        groupField = { ...groupField, type: field.type };
      }
      // addField(groupField, currentGroup.groupId);
      groupFields.push(groupField);
      showFields = false;
    }
    this.setState({ currentGroup, showFields });
  }

  handleInputChange = (name, value, field) => {
    // const target = event.target;
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    // const name = target.name;
    const draft = this.state.form;

    for (const group of draft.formElementGroups) {
      for (const element of group.formElements) {
        if (element.uuid == field.uuid) {
          element[name] = value;
          break;
        }
      }
    }

    this.setState({
      form: draft
    });

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
    _.forEach(this.state.form.formElementGroups, (group) => {
      const subElements = [];
      group.groupId = (group.groupId || group.name).replace(/[^a-zA-Z0-9]/g, "_");
      const isCurrentGroup = (this.state.currentGroup &&
        group.groupId === this.state.currentGroup.groupId) || false;
      subElements.push(
        <FormGroup group={group} id={group.groupId} name={group.name} display={group.display}
          fields={group.formElements} key={group.groupId + i++}
          handleInputChange={this.handleInputChange}
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
    return;
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
          <UpdateForm form={this.state.form} />
        </div>
      </div>
    );
  }
}

FormDetailsNew.defaultProps = {
  formGroups: [createGroup('group_1')]
};

FormDetailsNew.propTypes = {
  formGroups: PropTypes.array,
  currentGroup: PropTypes.object,
  showFields: PropTypes.bool
};

function createGroup(id) {
  return { groupId: id, name: '', display: '', formElements: [] }
}

export default FormDetailsNew;