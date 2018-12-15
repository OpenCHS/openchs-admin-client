const _ = require('lodash');
const {ServerApiClient} = require('./requests');
const {POST, PATCH, DELETE} = ServerApiClient;

const BY_ADMIN = () => 'admin';
const BY_ORG_ADMIN = (impl) => impl['organisation-admin-name'];

const Action = (method, resource, userFn) => (data, implementation) => {
    return method(resource, data, userFn(implementation));
};

const actionToTake = {
    // 'organisation-sql':[],
    'admin-users': Action(POST, 'users', BY_ADMIN),
    'forms': Action(POST, 'forms', BY_ORG_ADMIN),
    'checklist-details': Action(POST, 'checklistDetail', BY_ORG_ADMIN),
    'locations': Action(POST, 'locations', BY_ORG_ADMIN),
    'catchments': Action(POST, 'catchments', BY_ORG_ADMIN),
    'operationalPrograms': Action(POST, 'operationalPrograms', BY_ORG_ADMIN),
    'operationalEncounterTypes': Action(POST, 'operationalEncounterTypes', BY_ORG_ADMIN),
    'concepts': Action(POST, 'concepts', BY_ORG_ADMIN),
    'form-deletions': Action(DELETE, 'forms', BY_ORG_ADMIN),
    'form-additions': Action(PATCH, 'forms', BY_ORG_ADMIN),
    'users': Action(POST, 'users', BY_ORG_ADMIN),
    // 'rules':[]
};

const precedence = [
    'rules',
    'users',
    'checklist-details',
    'form-additions',
    'form-deletions',
    'forms',
    'concepts',
    'operationalEncounterTypes',
    'operationalPrograms',
    'catchments',
    'locations',
    'admin-users',
    'organisation-sql'
];

class DeployActions {
    static run(type, data, implementation) {
        const action = actionToTake[type];
        if (_.isFunction(action)) {
            return action(data, implementation);
        }
        console.log('Action not defined');
        return {error: 'Action not defined'};
    }
}
DeployActions.Precedence = class {
    static of(resourceType) {
        return precedence.indexOf(resourceType);
    }
};

export default DeployActions;