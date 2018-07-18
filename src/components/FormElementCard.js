import React from 'react';
import { Card, CardHeader, CardBody, Row, Col, UncontrolledTooltip } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import config from '../config';

const FormElementCard = ({ field, headerText, collapse, children }) => {
  const collapseId = "collapse_" + field.uuid;
  const headerId = "heading_" + field.id;

  return (
    <Card>
      <CardHeader className="py-2" id={headerId}>
        <Row>
          <Col sm="7">
            <a className={config.orgClassName(field.organisationId)} data-toggle="collapse" href={"#" + collapseId} aria-expanded="true"
              aria-controls={collapseId}>
              {headerText}
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
      <div id={collapseId} className={collapse} aria-labelledby={headerId}
        data-parent="#accordion">
        <CardBody>
          {children}
        </CardBody>
      </div>
    </Card>
  );
}

export default FormElementCard;