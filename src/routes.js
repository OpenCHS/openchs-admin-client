import React from 'react';
import App from "./App";
import Dashboard from "./components/Dashboard";
import Forms from "./components/Forms";
import Concepts from "./components/Concepts";
import { Route, Switch } from 'react-router-dom';
import FormDetails from "./components/FormDetails";
import NewConcept from './components/NewConcept';
import Concept from './components/Concept';
import DebugForms from './components/DebugForms';
import { hot } from 'react-hot-loader'

const Default = (props) => {
  return <App content={Dashboard} {...props} />
};

const FormList = (props) => {
  return <App content={Forms} {...props} />
};

const ConceptsList = (props) => {
  return <App content={Concepts} {...props} />
};

const AddConcept = (props) => {
  return <App content={NewConcept} {...props} />
}

const ViewConcept = (props) => {
  return <App content={Concept} {...props} />
}

const AddFields = (props) => {
  return <App content={FormDetails} {...props} />
};

function Routes() {
  //TODO: Remove debugforms route and related code of setting local state.
  return <Switch>
    <Route exact path="/" component={Default} />
    <Route exact path="/forms" component={FormList} />
    <Route exact path="/concepts" component={ConceptsList} />
    <Route path="/concepts/addConcept" component={AddConcept} />
    <Route path="/concepts/:conceptId" component={ViewConcept} />
    <Route path="/forms/:formUUID" component={AddFields} />
    <Route path="/debugforms" component={DebugForms} />
  </Switch>
};

export default hot(module)(Routes)