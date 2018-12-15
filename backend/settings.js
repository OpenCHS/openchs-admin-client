const fs = require('fs');
const path = require('path');
const rootDir = process.env.OPENCHS_IMPLEMENTATIONS_ROOT;
const {readFileSync} = require('fs');

function settings() {
    return getJson(path.join(rootDir, '.openchs.json'));
}

function getJson(filepath) {
    if (process.env.OPENCHS_RUN_MODE !== 'live') {
        return JSON.parse(readFileSync(filepath));
    }
    return require(filepath);
}

function getImplFile(name, file) {
    return readFileSync(path.join(rootDir, name, file));
}

function getImplFileJson(name, file) {
    return getJson(path.join(rootDir, name, file));
}

function getImplementationOrgAdmin(name) {
    return getImplFileJson(name, 'impl.json')['organisation-admin-name'];
}

function getAll() {
    return settings().implementations.map((implDir) => {
        const json = getImplFileJson(implDir, 'impl.json');
        return {
            implementation: json['organisation-name'],
            definition: json
        };
    });
}

module.exports = {getAll, getImplFileJson, getImplFile, getImplementationOrgAdmin};