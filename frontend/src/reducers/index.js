import { combineReducers } from 'redux';

import {
    CHANGE_SORTBY,
    UPVOTE_POST,
    DOWNVOTE_POST,
    DELETE_POST,
    ADD_POST,
    INCREASE_POST_COMMENT_COUNT,
    DECREASE_POST_COMMENT_COUNT,
    UPVOTE_COMMENT,
    DOWNVOTE_COMMENT,
    DELETE_COMMENT,
    ADD_COMMENT
} from '../actions';


const initialCategoriesState = {
    "react": {
        name: 'react',
        path: 'react'
    },
    "redux": {
        name: 'redux',
        path: 'redux'
    },
    "udacity": {
        name: 'udacity',
        path: 'udacity'
    }
  }

function categories(state = initialCategoriesState, action) {
    switch (action.type) {
        default:
            return state;
    }
}

const initialPostsState = {
    "8xf0y6ziyjabvozdd253nd": {
        id: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1467166872634,
        title: 'Udacity is the best place to learn React',
        body: 'Everyone says so after all.',
        author: 'thingtwo',
        category: 'react',
        voteScore: 6,
        deleted: false,
        commentCount: 2
    },
    "6ni6ok3ym7mf1p33lnez": {
        id: '6ni6ok3ym7mf1p33lnez',
        timestamp: 1468479767190,
        title: 'Learn Redux in 10 minutes!',
        body: 'Just kidding. It takes more than 10 minutes to learn technology.',
        author: 'thingone',
        category: 'redux',
        voteScore: -5,
        deleted: false,
        commentCount: 0
    }
}

function posts(state = initialPostsState, action) {
    switch (action.type) {
        case UPVOTE_POST:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    voteScore: state[action.id].voteScore + 1
                }
            };
        case DOWNVOTE_POST:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    voteScore: state[action.id].voteScore - 1
                }
            };
        case DELETE_POST:
            let newState = Object.assign({}, state);
            delete newState[action.id];
            return newState;
        case ADD_POST:
            let post = action.post;
            const CryptoJS = require('crypto-js');
            const salt = CryptoJS.MD5(post.author).toString();
            post.id = CryptoJS.MD5(salt + post.timestamp + salt).toString();
            return {
                ...state,
                [post.id]: post
            };
        case INCREASE_POST_COMMENT_COUNT:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    commentCount: state[action.id].commentCount + 1
                }
            }
        case DECREASE_POST_COMMENT_COUNT:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    commentCount: state[action.id].commentCount - 1
                }
            }
        default:
            return state;
    }
}

const initialCommentsState = {
    "894tuq4ut84ut8v4t8wun89g": {
        id: '894tuq4ut84ut8v4t8wun89g',
        parentId: "8xf0y6ziyjabvozdd253nd",
        timestamp: 1468166872634,
        body: 'Hi there! I am a COMMENT.',
        author: 'thingtwo',
        voteScore: 6,
        deleted: false,
        parentDeleted: false
    },
    "8tu4bsun805n8un48ve89": {
        id: '8tu4bsun805n8un48ve89',
        parentId: "8xf0y6ziyjabvozdd253nd",
        timestamp: 1469479767190,
        body: 'Comments. Are. Cool.',
        author: 'thingone',
        voteScore: -5,
        deleted: false,
        parentDeleted: false
    }
}

function comments(state = initialCommentsState, action) {
    switch (action.type) {
        case UPVOTE_COMMENT:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    voteScore: state[action.id].voteScore + 1
                }
        };
        case DOWNVOTE_COMMENT:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    voteScore: state[action.id].voteScore - 1
                }
            };
        case DELETE_COMMENT:
            let newState = Object.assign({}, state);
            delete newState[action.id];
            return newState;
        case ADD_COMMENT:
            let comment = action.comment;
            const CryptoJS = require('crypto-js');
            const salt = CryptoJS.MD5(comment.author).toString();
            comment.id = CryptoJS.MD5(salt + comment.timestamp + salt).toString();
            return {
                ...state,
                [comment.id]: comment
            }
        default:
            return state;
    }
}

const initialListState = {
    sortBy : "votes",
};

function listState(state = initialListState, action) {
    switch (action.type) {
        case CHANGE_SORTBY:
            return {
                ...state,
                sortBy: action.sortBy
            }
        default:
            return state;
    }
}

export default combineReducers({
    categories,
    posts,
    comments,
    listState
});
