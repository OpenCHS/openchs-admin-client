const settings = require('./settings');
const {join} = require('path');
const requests = require('./serverRequests');

const actionToTake = {
    // 'organisation-sql':"",
    'admin-users': (data, token) => requests.post('users', data, 'admin', token),
    'forms': (data, orgAdmin, token) => requests.post('forms', data, orgAdmin, token),
    'checklist-details': (data, orgAdmin, token) => requests.post('checklistDetail', data, orgAdmin, token),
    'locations': (data, orgAdmin, token) => requests.post('locations', data, orgAdmin, token),
    'catchments': (data, orgAdmin, token) => requests.post('catchments', data, orgAdmin, token),

    // 'operationalPrograms': (data, orgAdmin,token) => requests.post('users', require(data), orgAdmin, token),
    // 'operationalEncounterTypes': (data,orgAdmin, token) => requests.post('users', require(data), orgAdmin, token),
    // 'concepts': (data, orgAdmin,token) => requests.post('users', require(data), orgAdmin, token),
    // 'form-deletions': (data,orgAdmin, token) => requests.post('users', require(data), orgAdmin, token),
    // 'form-additions': (data, orgAdmin,token) => requests.post('users', require(data), orgAdmin, token),
    // 'users': (data,orgAdmin, token) => {},
    // 'rules':""
};

function takeActions(groupActionReq) {
    console.log('Group Action not implemented');
}

function takeAction(actionReq) {
    const action = actionToTake[actionReq.type];
    if (action) {
        const data = settings.getImplFileJson(actionReq.implementation, actionReq.path);
        const orgAdmin = settings.getImplementationOrgAdmin(actionReq.implementation);
        console.log(data,'fullpth');
        console.log(actionReq.implementation,'actionreq.impl');
        console.log(actionReq.path,'actionreq.path');
        console.log(actionReq.token,'actionreq.token');
        return action(data, orgAdmin, actionReq.token || '');
    }
    console.log('Action not defined');
    return {error: 'Action not defined'};
}

exports.do = takeAction;