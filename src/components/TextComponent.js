import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Col, Input, Row, CardHeader, Card, CardBody } from 'reactstrap';

import ChooseConcept from './ChooseConcept';

class TextComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      concept: this.props.field.concept,
      fieldHeader: this.props.field.name || 'Question'
    };
  }

  onConceptSelected = (concept) => {
    this.setState({ concept: concept });
  };

  onChangeField(event) {
    this.setState({ ...this.state, fieldHeader: event.target.value });
  }

  render() {
    const collapseId = "collapse_" + this.props.field.id;
    const headerId = "heading_" + this.props.field.id;
    const mandatoryFieldId = this.props.field.id + "_mandatory";
    return (
      <Card>
        <CardHeader className="py-2" id={headerId}>
          <a data-toggle="collapse" href={"#" + collapseId} aria-expanded="true"
            aria-controls={collapseId}>
            {this.state.fieldHeader}
          </a>
        </CardHeader>
        <div id={collapseId} className={this.props.collapse} aria-labelledby={headerId}
          data-parent="#accordion">
          <CardBody>
            <FormGroup>
              <Label for="elementName">Element name</Label>
              <Input placeholder="Question title"
                type="text"
                onChange={this.onChangeField.bind(this)}
                value={this.state.fieldHeader} />
            </FormGroup>

            <ChooseConcept
              id="chooseConcept"
              concept={this.state.concept}
              value={this.state.concept.name}
              modalHeader="Choose Concept"
              onConceptSelected={this.onConceptSelected} />

            <FormGroup check>
              <Label check>
                <Input type="checkbox" id={mandatoryFieldId} />
                Required
              </Label>
            </FormGroup>
          </CardBody>
        </div>
      </Card>
    );
  }
}

TextComponent.propTypes = {
  groupId: PropTypes.string.isRequired,
  field: PropTypes.object,
  fieldMetadata: PropTypes.object,
  collapse: PropTypes.string,
  readonly: PropTypes.bool
};

export default TextComponent;