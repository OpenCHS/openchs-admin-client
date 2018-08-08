import React from 'react';
import { withRouter } from "react-router-dom";
import './App.css';

const App = (props) => {
  const { header: Header, history, location, match, breadcrumb: Breadcrumb, content: Content } = props;
  return <div>
    {Header && <Header />}
    <Content history={history} match={match} location={location} />
  </div>;
};

export default withRouter(App);