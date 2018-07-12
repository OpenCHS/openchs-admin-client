import React, { Component } from 'react';
import { FieldIcon } from "./FieldList";
import { updateNumericField } from "../actions/fields";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import ChooseConcept from './ChooseConcept';
import NumericConcept from './NumericConcept';
import { Card, CardHeader, CardBody, CardText, CardTitle, CardSubtitle } from 'reactstrap';

function nullToEmpty(object) {
  Object.keys(object).forEach((key) => {
    if (object[key] == null) {
      object[key] = "";
    }
  });
}

class NumericComponent extends Component {
  constructor(props) {
    super(props);
    let concept = this.props.field.concept;
    nullToEmpty(concept);
    this.state = {
      concept: concept,
      mandatory: false,
      fieldHeader: this.props.field.name || 'Question'
    };
  }

  onConceptSelected = (concept) => {
    nullToEmpty(concept);
    this.setState({ concept: concept });
  };

  onChangeField(event) {
    const fieldName = event.target.value;
    this.props.updateNumericField(this.props.groupId, this.props.field.id, fieldName, this.props.field.lowAbsolute,
      this.props.field.highAbsolute, this.props.field.lowNormal, this.props.field.unit, this.state.mandatory);
    this.setState({ ...this.state, fieldHeader: fieldName });
  }

  onChangeMandatory(event) {
    this.setState(...this.state, { mandatory: !this.state.mandatory });
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
            <div className="form-group">
              <ChooseConcept
                id="chooseConcept"
                value={this.state.concept.name}
                linkText="Choose a different concept"
                modalHeader="Choose a Concept"
                onConceptSelected={this.onConceptSelected} />
            </div>

            <div className="form-row">
              <div className="form-group col-md-10">
                <input type="text" className="form-control" id={this.props.field.id}
                  placeholder="Question Title"
                  value={this.props.field.name} />
              </div>
              <div className="form-group col-md-2">
                <FieldIcon
                  fieldMetadata={this.props.fieldMetadata} />
                {" " + this.props.fieldMetadata.label}
              </div>
            </div>



            <NumericConcept readOnly={true} concept={this.state.concept} />

            <div className="form-group">
              <div className="form-check">
                <label className="form-check-label">
                  <input className="form-check-input" type="checkbox" id={mandatoryFieldId}
                    onChange={this.onChangeMandatory.bind(this)}
                    checked={this.state.mandatory} />
                  Required
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

export default connect((state) => {
  return {};
}, { updateNumericField })(NumericComponent);