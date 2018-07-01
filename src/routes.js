import React from 'react';
import App from "./App";
import Dashboard from "./components/Dashboard";
import Forms from "./components/Forms";
import Concepts from "./components/Concepts";
import Breadcrumb from "./components/Breadcrumb";
import {Route, Switch} from 'react-router-dom';
import FormDetails from "./components/FormDetails";
import AdminHeader from "./components/AdminHeader";

const Default = (props) => {
    return <App header={AdminHeader} content={Dashboard} {...props}/>
};

const FormList = (props) => {
    return <App header={AdminHeader} content={Forms} breadcrumb={Breadcrumb} {...props}/>
};

const ConceptsList = (props) => {
  return <App header={AdminHeader} content={Concepts} breadcrumb={Breadcrumb} {...props}/>
};

const AddFields = (props) => {
    return <App content={FormDetails} breadcrumb={Breadcrumb} {...props}/>
};

export default function Routes(props) {
    return <Switch>
        <Route exact path="/" component={Default}/>
        <Route exact path="/forms" component={FormList}/>
        <Route exact path="/concepts" component={ConceptsList}/>
        <Route path="/forms/addFields" component={AddFields}/>
    </Switch>
};