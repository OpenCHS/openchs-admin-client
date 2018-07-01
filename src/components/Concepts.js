import React, { Component } from 'react';
import NewConceptModal, { NewConceptButton } from "./NewConceptModal";

class Concepts extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], loading: true };
  }

  render() {
    return (
      <div>
        <NewConceptButton />
        <NewConceptModal {...this.props} />
      </div>
    )
  }
}

export default Concepts;