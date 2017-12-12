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
    },
    upvotePost: (id) => {
        return axios.post(baseURL + `/posts/${id}`, {option: 'upVote'}, config);
    },
    downvotePost: (id) => {
        return axios.post(baseURL + `/posts/${id}`, {'option': 'downVote'}, config);
    },
    deletePost: (id) => {
        return axios.delete(baseURL + `/posts/${id}`, config);
    },
    addPost: (post) => {
        return axios.post(baseURL + '/posts', post, config);
    }
};

module.exports = axiosHelpers; 