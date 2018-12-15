import React, { Component } from 'react';
import ProgramCard from './ProgramCard';
import NewFormModal, { NewFormButton } from "./NewFormModal";
import Breadcrumb from './Breadcrumb';
import axios from 'axios';
import {ServerApiClient} from "../web/requests";

class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], loading: true };
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    console.log(`axios header in forms = ${JSON.stringify(axios.defaults.headers.common)}`);
    ServerApiClient.get("forms")
      .then((data) => {
        this.setState({ data, loading: false });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }

  render() {
    return <div className="container">
      <Breadcrumb location={this.props.location} />
      <div>
        <NewFormButton />
        <NewFormModal {...this.props} />
        <ProgramCard data={this.state.data} {...this.props} />
      </div>
    </div>;
  }
}

export default Forms;