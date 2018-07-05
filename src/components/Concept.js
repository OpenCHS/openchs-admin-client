import React from 'react';

class Concept extends React.Component {
  render() {
    const concept = this.props.history.location.state.concept;
    const answers = concept.conceptAnswers.map(cA => cA.answerConcept.name);
    return <div>Hello {JSON.stringify(answers)}</div>
  }
}

export default Concept;