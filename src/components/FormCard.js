import React, {Component} from 'react';
import moment from 'moment';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import updateBasicForm, {fetchGroups} from "../actions/form";
import config from '../config';

class FormCard extends Component {

    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
        const form = this.props.form;
        const duration = moment(form.lastModifiedDateTime).fromNow(true);
        
        return <div className="col-md-3" key={form.uuid}>
            <div className="card h-100">
                <div className="card-body">
                    <h4 className="card-title">
                        {/* <a href="#" onClick={openFormPage}>{form.name}</a> */}
                        <Link className={config.orgClassName(form.organisationId)} to={`/forms/${form.uuid}`}>{form.name}</Link>
                    </h4>
                    <h5>{form.formType}</h5>
                    {/* <a href="#" className="btn btn-primary" onClick={openFormPage}>Open</a> */}
                    <Link className="btn btn-primary" to={`/forms/${form.uuid}`}>Open</Link>
                </div>
                <div className="card-footer">
                    <small className="text-muted">Last updated {duration} ago</small>
                </div>
            </div>
        </div>;
    }
}
export default connect((state) => {
    return {}
}, {updateBasicForm, fetchGroups})(FormCard);