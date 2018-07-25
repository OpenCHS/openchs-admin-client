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
    this.state = { groupName: this.props.group.name };
  }

  renderGroup() {
    const {group, handleGroupChange} = this.props;
    const groupId = group.groupId;
    const collapse = "collapse";
    const collapseClass = this.state['groupName'] ? collapse : collapse + " show";
    const collapseId = "collapse_" + groupId;
    const headerId = "heading_" + groupId;
    const formHeader = group.name ? ' ' + group.name :
      (group.display ? ' ' + group.display : '');
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
                  <a href="#0" id="form-group-uuid" className="badge badge-secondary">{this.props.group.uuid}</a>
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
                  id={groupId + '_groupName'}
                  placeholder="Enter group" value={group.name} name="name"
                  onChange={({ target }) => handleGroupChange(target.name, target.value, this.props.group.uuid)} />

                <label htmlFor="groupDisplay" className="mr-sm-2">Display:</label>
                <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0"
                  id={groupId + '_groupDisplay'} name="display"
                  placeholder="Enter display" value={group.display}
                  onChange={({ target }) => handleGroupChange(target.name, target.value, this.props.group.uuid)} />

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
        console.error("Null concept for: " + inputField.name);
        console.error(" name, " + inputField.name + ", type: " + inputField.type);
      }
      i++;
      const fieldMetadata = _.find(fieldsMetadata, (metadata) => {
        return inputField.concept && (metadata.dataType === inputField.concept.dataType);
      });
      if (!fieldMetadata) {
        console.error("No field metadata found for " + (inputField.name + ", dataType " + inputField.dataType));
      } else {
        const collapseClass = this.props.collapse === true ? collapse :
          (this.props.fields.length === i ? collapse + " show" : collapse);
        const readonly = true;
        const fieldComponent = fieldMetadata.component(this.props.group.groupId, inputField, collapseClass, readonly, this.props.handleKeyValuesChange);

        inputFields.push(
          <div className="row" key={inputField.uuid}>
            <div className="col-12">
              <ConceptComponent field={inputField} collapseClass={collapseClass} handleFieldChange={this.props.handleFieldChange}>
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
  group: PropTypes.object.isRequired,
  handleGroupChange: PropTypes.func.isRequired,
  handleKeyValuesChange: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  fields: PropTypes.array,
  collapse: PropTypes.bool
};

export default FormGroup;