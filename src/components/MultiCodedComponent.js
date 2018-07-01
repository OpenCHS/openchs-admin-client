import CodedComponent from "./CodedComponent";
import React, {Component} from 'react';

class MultiCodedComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <CodedComponent {...this.props} type="MultiSelect"/>
    }
}

export default MultiCodedComponent;