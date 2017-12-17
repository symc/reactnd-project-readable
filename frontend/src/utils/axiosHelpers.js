const axios = require('axios');

//Define an authorization header
const config = {
    headers: {'Authorization': 'readable-auth'}
};

// Define the base url. The server listens on port 3001
const baseURL = 'http://localhost:3001';

// The object axios helpers contains a list of methods that can be used to
// communicate with the back end server. For the details of these functions,
// please see the readme file of the backend server.
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
        return axios.post(baseURL + `/posts/${id}`, {option: 'downVote'}, config);
    },
    deletePost: (id) => {
        return axios.delete(baseURL + `/posts/${id}`, config);
    },
    addPost: (post) => {
        return axios.post(baseURL + '/posts', post, config);
    },
    addComment: (comment) => {
        return axios.post(baseURL + '/comments', comment, config);
    },
    editComment: (comment, id) => {
        return axios.put(baseURL + `/comments/${id}`, comment, config);
    },
    upvoteComment: (id) => {
        return axios.post(baseURL + `/comments/${id}`, {option: 'upVote'}, config);
    },
    downvoteComment: (id) => {
        return axios.post(baseURL + `/comments/${id}`, {option: 'downVote'}, config);
    },
    deleteComment: (id) => {
        return axios.delete(baseURL + `/comments/${id}`, config);
    },
    networkErrorMessage: 'Network connection failed. Requested action will not be completed.',
    networkErrorComments: 'Network connection failed. Unable to update the comments'
};

module.exports = axiosHelpers; 