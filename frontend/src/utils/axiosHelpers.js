const axios = require('axios');

const config = {
    headers: {'Authorization': 'readable-auth'}
};

const baseURL = 'http://localhost:3001';

const axiosHelpers = {
    getCategories: () => {
        return axios.get(baseURL + '/categories', config);
    }
};

module.exports = axiosHelpers; 