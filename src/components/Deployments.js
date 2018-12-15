import React, {Component} from 'react';
import Breadcrumb from './Breadcrumb';
import {AdminDaemonClient} from '../web/requests';
import _ from 'lodash';
import DeployActions from "../web/DeployActions";

class Deployments extends Component {
    constructor(props) {
        super(props);
        this.state = {impls: [], loading: true};
        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        AdminDaemonClient.get('implementations/all')
            .then((impls) => {
                this.setState({impls, loading: false});
            })
            .catch((error) => {
                this.setState({error: error, loading: false});
            });
    }

    groups(filesMap) {
        return _.map(filesMap, (files, type) => ({files, type})).sort((a, b) =>
            DeployActions.Precedence.of(b.type) - DeployActions.Precedence.of(a.type));
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

    getTableRow(file, key) {
        const {type, path} = file;
        return (
            <li style={{...styles.rowContainer, lineHeight: '2em'}} key={key}
                className="list-group-item list-group-item-action">
                <div style={styles.fileType}>{type}</div>
                <div style={styles.filePath}>{path}</div>
                <div style={styles.deployment}>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        marginLeft: '0.5em',
                        justifyContent: 'space-between'
                    }}>
                        <button
                            style={{...styles.deploymentButton}}
                            onClick={() => this.deployDev(file)}
                            disabled={this.state.deploying}
                            className='btn btn-outline-secondary'>Dev
                        </button>
                        <button style={styles.deploymentButton}
                                onClick={() => this.deployStaging(file)}
                                disabled={this.state.deploying}
                                className='btn btn-outline-secondary'>Staging
                        </button>
                        <button style={styles.deploymentButton}
                                onClick={() => this.deployProd(file)}
                                disabled={this.state.deploying}
                                className='btn btn-outline-danger'>Prod
                        </button>
                    </div>
                </div>
            </li>
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
        this.setState((state) => ({...state, deploying: true}), () => {
            AdminDaemonClient.get(`implementations/${file.implementation.name}/file`, {
                path: file.path,
            }).then((fileContent) => {
                return DeployActions.run(file.type, JSON.stringify(fileContent), file.implementation);
            }).then((success) => {
                console.log('response', success);
                this.setState({deployment: {success}, deploying: false});
            }).catch((error) => {
                console.log('error', error.response);
                this.setState({deployment: {error: error.reponse}, deploying: false});
            });
        });
    }

    render() {
        return <div className="container">
            <Breadcrumb location={this.props.location}/>
            {this.state.impls.map((impl, idx) => {
                return (
                    <ul key={idx} className="list-group">
                        <h1>{impl.definition['organisation-name']}</h1>
                        <li style={styles.rowContainer} className="list-group-item-dark">
                            <div style={{...styles.fileType, margin: '4px 25px'}}>
                                <h5 style={{fontWeight: 'bold'}}>Type</h5>
                            </div>
                            <div style={{...styles.filePath, margin: '4px 25px'}}>
                                <h5 style={{fontWeight: 'bold'}}>File</h5>
                            </div>
                            <div style={{...styles.deployment, margin: '4px 25px'}}>
                                <h5 style={{fontWeight: 'bold'}}>Deploy To</h5>
                            </div>
                        </li>
                        {this.flatten(impl.definition.files, impl.definition).map((file, idx) => this.getTableRow(file, idx))}
                    </ul>
                );
            })}

        </div>;
    }
}

export default Deployments;

const styles = {
    rowContainer: {display: 'flex', flexWrap: 'nowrap', border: '0.05em solid grey'},
    cell: {
        flex: 1,
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
styles.deployment = {
    ...styles.cell,
    flex: 9,
};
styles.deploymentButton = {
    flex: 1,
    boxSizing: 'border-boxing',
    verticalAlign: 'center',
    margin: '0px 6px',
    padding: '0px 20px',
};
