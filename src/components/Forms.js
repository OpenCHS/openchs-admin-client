import React, {Component} from 'react';
import 'whatwg-fetch';
import ProgramCard from './ProgramCard';
import NewFormModal, {NewFormButton} from "./NewFormModal";

class Forms extends Component {
    constructor(props) {
        super(props);
        this.state = {data: [], loading: true};
        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        fetch("/forms",
            {
                method: 'GET',
                credentials: 'include',
                Accept: 'application/json',
                headers: { "ORGANISATION-NAME": "OpenCHS" }})
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
                this.setState({data: data, loading: false});
            })
            .catch((error) => {
                this.setState({loading: false});
            });

    }

    render() {
        return <div>
            <NewFormButton/>
            <NewFormModal {...this.props}/>
            <ProgramCard data={this.state.data} {...this.props}/>
        </div>
    }
}

export default Forms;