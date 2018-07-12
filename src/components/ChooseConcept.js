import React from 'react';
import Autosuggest from 'react-autosuggest';
import { Label, FormGroup, Container, Col, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import handleErrors from '../lib/handleErrors';

export default class ChooseConcept extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      modal: false,
      autoSuggestValue: props.value
    };
  }

  onAutoSuggestChange = (event, { newValue, method }) => {
    this.setState({ autoSuggestValue: newValue });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    fetch(`/search/concept?name=${value}`, { headers: { "ORGANISATION-NAME": "OpenCHS" } })
      .then(handleErrors)
      .then(response => response.json())
      .then(concepts => this.setState({ suggestions: concepts }))
      .catch(err => {
        console.log(err);
      });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event, { suggestion }) => {
    this.setState({
      autoSuggestValue: '',
      modal: false
    });

    this.props.onConceptSelected(suggestion);
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const inputProps = {
      value: this.state.autoSuggestValue,
      onChange: this.onAutoSuggestChange
    };

    // return (
    //   <Autosuggest
    //     id={this.props.id}
    //     suggestions={this.state.suggestions}
    //     onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
    //     onSuggestionsClearRequested={this.onSuggestionsClearRequested}
    //     onSuggestionSelected={this.onSuggestionSelected}
    //     getSuggestionValue={(concept) => concept.name}
    //     renderSuggestion={(concept) => <span>{concept.name}</span>}
    //     inputProps={inputProps} />
    // );
    return (
      <div>
        <a href="#" className="text-danger" onClick={this.toggle}>{this.props.linkText}</a>
        <Modal centered isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{this.props.modalHeader}</ModalHeader>
          <ModalBody>
            <form onSubmit={(e) => e.preventDefault()}>
              <FormGroup>
                <Label for="findConcept">Find Concept</Label>
                <Autosuggest
                  id={this.props.id}
                  suggestions={this.state.suggestions}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                  onSuggestionSelected={this.onSuggestionSelected}
                  getSuggestionValue={(concept) => concept.name}
                  renderSuggestion={(concept) => <span>{concept.name}</span>}
                  inputProps={inputProps} />
              </FormGroup>
            </form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}