import React, { Component } from 'react';
import fieldsMetadata from './configFields';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col, UncontrolledTooltip } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import ConceptComponent from './concepts/ConceptComponent';
import config from '../config';

class FormGroup extends Component {
  constructor(props) {
    super(props);
    this.state = { groupName: this.props.name };
  }

  onChangeField(event) {
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
          <Row>
            <Col sm="7">
              <a className={config.orgClassName(this.props.group.organisationId)} data-toggle="collapse" href={"#" + collapseId} aria-expanded="true"
                aria-controls={collapseId}>
                <strong>{formHeader}</strong>
              </a>
            </Col>
            <Col>
              <CopyToClipboard text={this.props.group.uuid}>
                <div>
                  <a href="#" id="form-group-uuid" className="badge badge-secondary">{this.props.group.uuid}</a>
                  <UncontrolledTooltip placement="bottom" target="form-group-uuid">
                    Click to copy the uuid
                  </UncontrolledTooltip>
                  {/* <i class="fa fa-clipboard" aria-hidden="true"></i> */}
                </div>
              </CopyToClipboard>
            </Col>
          </Row>
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
                  onChange={this.onChangeField.bind(this)} />

                <label htmlFor="groupDisplay" className="mr-sm-2">Display:</label>
                <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0"
                  id={this.props.id + '_groupDisplay'} name="displayName"
                  placeholder="Enter display" defaultValue={this.props.displayName}
                  onChange={this.onChangeField.bind(this)} />

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
        console.error("Null concept for: " + inputField.id);
        console.error(" name, " + inputField.name + ", type: " + inputField.type);
      }
      i++;
      const fieldMetadata = _.find(fieldsMetadata, (field) => {
        return inputField.concept && (field.dataType === inputField.concept.dataType);
      });
      if (!fieldMetadata) {
        console.error("No field metadata found for " + (inputField.name + ", dataType " + inputField.dataType));
      } else {
        const fieldId = (inputField.id || inputField.name).replace(/[^a-zA-Z0-9]/g, "_");
        const collapseClass = this.props.collapse === true ? collapse :
          (this.props.fields.length === i ? collapse + " show" : collapse);
        inputField.id = fieldId;
        const readonly = true;
        const fieldComponent = fieldMetadata.component(this.props.id, inputField, collapseClass, readonly, this.props.handleKeyValuesChange);

        inputFields.push(
          <div className="row" key={fieldId}>
            <div className="col-12">
              <ConceptComponent field={inputField} collapseClass={collapseClass} handleInputChange={this.props.handleInputChange}>
                {fieldComponent}
              </ConceptComponent>
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

export default FormGroup;