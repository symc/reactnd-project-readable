const axios = require('axios');

const config = {
    headers: {'Authorization': 'readable-auth'}
};

const baseURL = 'http://localhost:3001';

const axiosHelpers = {
    getCategories: () => {
        return axios.get(baseURL + '/categories', config);
    },
    getPosts: () => {
        return axios.get(baseURL + '/posts', config);
    },
    getComments: (id) => {
        return axios.get(baseURL + `/posts/${id}/comments`, config);
    }
};

module.exports = axiosHelpers; 