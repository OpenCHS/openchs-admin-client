import React from 'react';
import { withRouter } from "react-router-dom";
import './App.css';

const App = (props) => {
  const { header: Header, history, location, match, content: Content } = props;
  return <div>
    {Header && <Header />}
    <Content history={history} match={match} location={location} {...props} />
  </div>;
};

export default withRouter(App);