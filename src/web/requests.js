const axios = require('axios');

class ChsApiRequest {
    static defaults = {baseUrl: '', authToken: '', proxyPrefix: ''};

    static _headers(user) {
        return {
            'USER-NAME': user || "Header 'USER-NAME' not set",
            'AUTH-TOKEN': ChsApiRequest.defaults.authToken
        }
    };

    static get(api, params, user) {
        return axios.get(`${ChsApiRequest.defaults.proxyPrefix}/${api}`, {
            params,
            headers: ChsApiRequest._headers(user)
        }).then(res=>res.data);
    };

    static post(api, data, params, user) {
        return axios.post(`${ChsApiRequest.defaults.proxyPrefix}/${api}`, data, {
            params,
            headers: ChsApiRequest._headers(user),
            responseType: 'text'
        }).then(res=>res.data);
    };

    static patch(api, data, params, user) {
        return axios.patch(`${ChsApiRequest.defaults.proxyPrefix}/${api}`, data, {
            params,
            headers: ChsApiRequest._headers(user)
        }).then(res=>res.data);
    };

    static delete(api, data, params, user) {
        return axios.delete(`${ChsApiRequest.defaults.proxyPrefix}/${api}`, {
            data,
            params,
            headers: ChsApiRequest._headers(user)
        }).then(res=>res.data);
    };

}

class AdminBackendRequest {
    static defaults = {baseUrl: '', authToken: '', proxyPrefix: ''};

    static get(api, params) {
        return axios.get(`${AdminBackendRequest.defaults.proxyPrefix}/${api}`, {params}).then(res=>res.data);
    };
}

export {ChsApiRequest, AdminBackendRequest};