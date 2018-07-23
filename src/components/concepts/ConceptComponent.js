import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, Row, Col, UncontrolledTooltip } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FormGroup, Label, Input } from 'reactstrap';

import config from '../../config';
import ChooseConcept from '../ChooseConcept';

const ConceptComponent = ({ field, collapseClass, handleInputChange, children }) => {
  const collapseId = "collapse_" + field.uuid;
  const headerId = "heading_" + field.id;

  return (
    <Card>
      <CardHeader className="py-2" id={headerId}>
        <Row>
          <Col sm="7">
            <a className={config.orgClassName(field.organisationId)} data-toggle="collapse" href={"#" + collapseId} aria-expanded="true"
              aria-controls={collapseId}>
              {field.name}
            </a>
          </Col>
          <Col>
            <CopyToClipboard text={field.uuid}>
              <div>
                <a href="#" id={`${field.id}_uuid`} className="badge badge-secondary">{field.uuid}</a>
                <UncontrolledTooltip placement="bottom" target={`${field.id}_uuid`}>
                  Click to copy the uuid
              </UncontrolledTooltip>
                {/* icon is looking ugly so commenting it out for now */}
                {/* <i class="fa fa-clipboard" aria-hidden="true"></i> */}
              </div>
            </CopyToClipboard>
          </Col>
        </Row>
      </CardHeader>

      <div id={collapseId} className={collapseClass} aria-labelledby={headerId}
        data-parent="#accordion">
        <CardBody>
          <FormGroup>
            <Label for="elementName">Element name</Label>
            <Input placeholder="Question title"
              id="elementName"
              name="name"
              type="text"
              onChange={({ target }) => handleInputChange(target.name, target.value, field)}
              value={field.name} />
          </FormGroup>

          <ChooseConcept
            id="chooseConcept"
            concept={field.concept}
            value={field.concept.name}
            modalHeader="Choose Concept"
            onConceptSelected={(concept) => handleInputChange('concept', concept, field)} />

          {children}

          <FormGroup check>
            <Label check>
              <Input
                name="mandatory"
                type="checkbox"
                id={field.id + "_mandatory"}
                onChange={({ target }) => handleInputChange(target.name, target.checked, field)}
                checked={field.mandatory} />
              Required
          </Label>
          </FormGroup>
        </CardBody>
      </div>
    </Card>
  );
}

ConceptComponent.propTypes = {
  field: PropTypes.object.isRequired,
  collapseClass: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default ConceptComponent;