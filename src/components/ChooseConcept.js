import React from 'react';
import Autosuggest from 'react-autosuggest';
import handleErrors from '../lib/handleErrors';

export default class ChooseConcept extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
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
    this.props.onConceptSelected(suggestion);
  };

  render() {
    const inputProps = {
      value: this.state.autoSuggestValue,
      onChange: this.onAutoSuggestChange
    };

    return (
      <Autosuggest
        id={this.props.id}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={(concept) => concept.name}
        renderSuggestion={(concept) => <span>{concept.name}</span>}
        inputProps={inputProps} />
    );
  }
}