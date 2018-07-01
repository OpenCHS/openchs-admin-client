import CodedComponent from "./CodedComponent";
import React, {Component} from 'react';

class SingleCodedComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <CodedComponent {...this.props} type="SingleSelect"/>
    }
}

export default SingleCodedComponent;