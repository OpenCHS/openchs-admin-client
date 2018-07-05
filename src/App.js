import React from 'react';
import {withRouter} from "react-router-dom";
import './App.css';

const App = (props) => {
    const {header: Header, history, location, match, breadcrumb: Breadcrumb, content: Content} = props;
    return <div>
        {Header && <Header/>}
        {Breadcrumb && <Breadcrumb location={location}/>}
        <div className="container">
            <Content history={history} match={match}/>
        </div>
    </div>;
};
export default withRouter(App);