import React, { Component } from "react";
import TagsInput from 'react-tagsinput';

export function NewConceptButton() {
  return (
    <div className="row justify-content-end">
      <div className="col-1">
        <nav className="navbar float-right">
          <form className="form-inline">
            <button className="btn btn-primary" data-toggle="modal" data-target="#newFormModal" type="button">
              New Concept
          </button>
          </form>
        </nav>
      </div>
    </div>
  );
}

class NewConceptModal extends Component {
  constructor(props) {
    super(props);
  }

  onChangeField(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div
        className="modal fade"
        id="newFormModal"
        role="dialog"
        aria-labelledby="newFormModalTitle"
        aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="newFormModalTitle">New Concept</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form>
              <div className="modal-body">
                <div className="form-group has-danger">
                  <label htmlFor="name">Name</label>
                  <input type="text" 
                    className="form-control form-control-danger" 
                    id="name"
                    name="name"
                    placeholder="Enter concept name" 
                    onChange={this.onChangeField.bind(this)}
                    required />
                </div>
                <div className="form-group">
                  <label htmlFor="dataType">Concept Type</label>
                  <select
                    className="form-control"
                    id="dataType"
                    name="dataType"
                    onChange={this.onChangeField}>
                    <option>NA</option>
                    <option>Numeric</option>
                    <option>Text</option>
                    <option>Coded</option>
                    <option>Date</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button"
                  data-dismiss="modal"
                  className="btn btn-primary btn-block"
                  onClick={console.log("add concept")}>
                  Add Concept
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewConceptModal;