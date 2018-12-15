import React, {Component} from 'react';
import Breadcrumb from './Breadcrumb';
import axios from 'axios';
import _ from 'lodash';

const taskPrecedence = [
    'organisation-sql',
    'admin-users',
    'locations',
    'catchments',
    'operationalPrograms',
    'operationalEncounterTypes',
    'concepts',
    'forms',
    'form-deletions',
    'form-additions',
    'checklist-details',
    'users',
    'rules'
];

class Deployments extends Component {
    constructor(props) {
        super(props);
        this.state = {impls: [], loading: true};
        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        axios.get("/admin-backend/implementations/all")
            .then((response) => {
                this.setState({impls: response.data, loading: false});
            })
            .catch((error) => {
                this.setState({error: error, loading: false});
            });
    }

    groups(filesMap) {
        return _.map(filesMap, (files, type) => ({files, type})).sort((a, b) => {
            return taskPrecedence.indexOf(a.type) - taskPrecedence.indexOf(b.type);
        });
    }

    flatten(files, implementation) {
        // console.log(this.groups(files));
        return _.reduce(files, (flattened, paths, type) => {
            _.forEach(paths, (path) => {
                flattened.push({path, type, implementation});
            });
            return flattened;
        }, []);
    }

    getTableRow(type, path, action1, action2, action3, key) {
        return (
            <div style={styles.container} key={key}>
                <div style={styles.fileType}>{type}</div>
                <div style={styles.filePath}>{path}</div>
                <div style={styles.action}>{action1}</div>
                <div style={styles.action}>{action2}</div>
                <div style={styles.action}>{action3}</div>
            </div>
        );
    }

    getTableHeader(name) {
        return (<h5 style={{fontWeight: 'bold'}}>{name}</h5>)
    }

    deployDev(file) {
        this.deploy(file, 'Dev');
    }

    deployStaging(file) {
        // this.deploy(file, 'Staging');
    }

    deployProd(file) {
        // this.deploy(file, 'Prod');
    }

    deploy(file, env) {
        this.setState((state) => {
            return {
                ...state,
                deploying: true
            };
        }, () => {
            axios.post(`/admin-backend/implementations/do`, {
                implementation: file.implementation,
                type: file.type,
                path: file.path,
            }).then((response) => {
                this.setState({deployment: {response}, deploying: false});
            }).catch((error) => {
                this.setState({deployment: {error}, deploying: false});
            });
        });
    }

    render() {
        return <div className="container">
            <Breadcrumb location={this.props.location}/>
            {this.state.impls.map((impl, idx) => {
                return (
                    <div key={idx}>
                        <h1>{impl.definition['organisation-name']}</h1>
                        {this.getTableRow.apply(this, ['Type', 'File', 'Dev', 'Staging', 'Prod'].map(this.getTableHeader))}
                        {this.flatten(impl.definition.files, impl.definition['implementation-name']).map((file, idx) => {
                            return this.getTableRow(file.type, file.path,
                                <button onClick={() => this.deployDev(file)}
                                        disabled={this.state.deploying}>Deploy</button>,
                                <button onClick={() => this.deployStaging(file)}
                                        disabled={this.state.deploying}>Deploy</button>,
                                <button onClick={() => this.deployProd(file)}
                                        disabled={this.state.deploying}>Deploy</button>,
                                idx);
                        })}
                    </div>
                );
            })}

        </div>;
    }
}

export default Deployments;

const styles = {
    container: {display: 'flex', flexWrap: 'nowrap', border: '0.05em solid grey'},
    cell: {
        boxSizing: 'border-boxing',
        overflow: 'hidden',
        width: '100%',
        lineHeight: '1.8em',
        verticalAlign: 'center',
        padding: '0.20em'
    }
};
styles.fileType = {...styles.cell, flex: 7};
styles.filePath = {...styles.cell, flex: 15};
styles.action = {...styles.cell, flex: 3};
