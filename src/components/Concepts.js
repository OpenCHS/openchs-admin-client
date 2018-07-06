import React from 'react';
import { Link } from 'react-router-dom';
import FindConcept from './FindConcept';

const Concepts = () =>
  <React.Fragment>
    <div className="row">
      <div className="col">
        <nav className="navbar float-left">
          <Link to="/concepts/addConcept">
            Add Concept
        </Link>
        </nav>

      </div>
    </div>
    <div className="row">
      <div className="col">
        <FindConcept />
      </div>
    </div>
  </React.Fragment>
export default Concepts;