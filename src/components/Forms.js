import React, { Component } from 'react';
import 'whatwg-fetch';
import ProgramCard from './ProgramCard';
import NewFormModal, { NewFormButton } from "./NewFormModal";
import config from '../config';
import Breadcrumb from './Breadcrumb';

class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], loading: true };
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    const signInUserSession = this.props.authData.signInUserSession;
    let accessToken = null;
    if (signInUserSession) {
      accessToken = signInUserSession.accessToken.jwtToken;
      console.log(`accessToken = ${accessToken}`);
    } else {
      console.log('signInUserSession is null');
    }

    fetch("/forms",
      {
        method: 'GET',
        credentials: 'include',
        Accept: 'application/json',
        headers: { "ORGANISATION-NAME": config.orgName }
      })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else if (response.status === 401 || response.status === 403) {
          window.location.pathname = '/';
          return null;
        }
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      })
      .then((data) => {
        this.setState({ data: data, loading: false });
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