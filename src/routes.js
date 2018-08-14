import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import { hot } from 'react-hot-loader'
import Auth from '@aws-amplify/auth';
import { withAuthenticator } from 'aws-amplify-react';
import axios from 'axios';

import Shell from "./Shell";
import FormDetails from "./components/FormDetails";
import NewConcept from './components/NewConcept';
import Concept from './components/Concept';
import Dashboard from "./components/Dashboard";
import Forms from "./components/Forms";
import Concepts from "./components/Concepts";
import config from './config';

class Routes extends Component {
  componentWillMount() {
    if (this.props.authData) {
      console.log(`REACT_APP_API_URL = ${process.env.REACT_APP_API_URL}`);
      const signInUserSession = this.props.authData.signInUserSession;
      let jwtToken = null;
      if (signInUserSession) {
        jwtToken = signInUserSession.idToken.jwtToken;
        axios.defaults.headers.common['AUTH-TOKEN'] = jwtToken;
      } else {
        console.log('signInUserSession is null');
      }
    }
  }

  render() {
    const Default = () => {
      return <Shell content={Dashboard} />;
    };

    const FormList = () => {
      console.log('init FormList');
      return <Shell content={Forms} />;
    };

    const ConceptsList = () => {
      return <Shell content={Concepts} />;
    };

    const AddConcept = () => {
      return <Shell content={NewConcept} />;
    }

    const ViewConcept = () => {
      return <Shell content={Concept} />;
    }

    const AddFields = () => {
      return <Shell content={FormDetails} />;
    };

    return <Switch>
      <Route exact path="/" component={Default} />
      <Route exact path="/forms" component={FormList} />
      <Route exact path="/concepts" component={ConceptsList} />
      <Route path="/concepts/addConcept" component={AddConcept} />
      <Route path="/concepts/:conceptId" component={ViewConcept} />
      <Route path="/forms/:formUUID" component={AddFields} />
    </Switch>
  }
}

class SecuredRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cognitoDetailsLoaded: false
    };
  }

  componentDidMount() {
    console.log(`NODE_ENV ${process.env.NODE_ENV}`);
    if (process.env.NODE_ENV !== "development") {
      axios.defaults.baseURL = process.env.REACT_APP_API_URL;
      axios.get('/cognito-details')
        .then(response => response.data)
        .then(data => {
          Auth.configure({
            region: 'ap-south-1',
            userPoolId: data.poolId, // Amazon Cognito User Pool ID
            userPoolWebClientId: data.clientId, // Amazon Cognito Web Client ID
          });
          this.setState({ cognitoDetailsLoaded: true });
        });
    }
    else {
      axios.defaults.headers.common['ORGANISATION-NAME'] = config.orgName;
      this.setState({ cognitoDetailsLoaded: true });
    }
  }

  render() {
    if (this.state.cognitoDetailsLoaded) {
      const Authenticator = withAuthenticator(Routes);
      return process.env.NODE_ENV === "development"
        ? <Routes />
        : <Authenticator />;
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default SecuredRoutes;
// export default hot(module)(SecuredRoutes)