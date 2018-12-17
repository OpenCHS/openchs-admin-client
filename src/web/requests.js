const axios = require('axios');

class ServerApiClient {
    static defaults = {baseUrl: '', authToken: '', readUser: ''};

    static _headers(user) {
        return {
            'USER-NAME': user || "Header 'USER-NAME' not set",
            'AUTH-TOKEN': ServerApiClient.defaults.authToken
        }
    };

    static get(api, params, user) {
        return axios.get(`${api}`, {
            params,
            headers: ServerApiClient._headers(user || ServerApiClient.defaults.readUser)
        }).then(res => res.data);
    };

    static post(api, data, user, params) {
        return axios.post(`${api}`, data, {
            params,
            headers: ServerApiClient._headers(user),
            responseType: 'text'
        }).then(res => res.data);
    };

    static patch(api, data, user, params) {
        return axios.patch(`${api}`, data, {
            params,
            headers: ServerApiClient._headers(user)
        }).then(res => res.data);
    };

    static delete(api, data, user, params) {
        return axios.delete(`${api}`, {
            data,
            params,
            headers: ServerApiClient._headers(user)
        }).then(res => res.data);
    };

}

ServerApiClient.GET = ServerApiClient.get;
ServerApiClient.POST = ServerApiClient.post;
ServerApiClient.PATCH = ServerApiClient.patch;
ServerApiClient.DELETE = ServerApiClient.delete;

class AdminDaemonClient {
    static defaults = {baseUrl: '', authToken: '', proxyPrefix: ''};

    static get(api, params) {
        return axios.get(`${AdminDaemonClient.defaults.proxyPrefix}/${api}`, {params}).then(res => res.data);
    };
}

AdminDaemonClient.GET = AdminDaemonClient.get;

export {ServerApiClient, AdminDaemonClient};