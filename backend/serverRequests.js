const axios = require('axios');
const defaults = {baseUrl:''};

const get = (api, user, token) => {
    return axios.get(`${defaults.baseUrl}/${api}`, {
        headers: {
            'ORGANISATION-USER': user,
            'AUTH-TOKEN': token
        }
    });
};

const post = (api, data, user, token) => {
    return axios.post(`${defaults.baseUrl}/${api}`, data, {
        headers: {
            'ORGANISATION-USER': user,
            'AUTH-TOKEN': token
        },
        responseType: 'text'
    });
};

const patch = (api, data, user, token) => {
    return axios.patch(`${defaults.baseUrl}/${api}`, data, {
        headers: {
            'ORGANISATION-USER': user,
            'AUTH-TOKEN': token
        }
    });
};

const delte = (api, data, user, token) => {
    return axios.delete(`${defaults.baseUrl}/${api}`, {
        data,
        headers: {
            'ORGANISATION-USER': user,
            'AUTH-TOKEN': token
        }
    });
};

module.exports = {get, post, patch, 'delete': delte, defaults};