import React from 'react';

class Concept extends React.Component {
  render() {
    const concept = this.props.history.location.state.concept;
    // const answers = concept.conceptAnswers.map(cA => cA.answerConcept.name);
    return <div><pre>{JSON.stringify(concept, null, 2)}</pre></div>
  }
}

export default Concept;