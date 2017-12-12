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
    ADD_COMMENT,
    INITIALIZE_CATEGORIES,
    INITIALIZE_POSTS,
    UPDATE_COMMENTS
} from '../actions';

function categories(state = {}, action) {
    switch (action.type) {
        case INITIALIZE_CATEGORIES:
            return action.initialState;
        default:
            return state;
    }
}

function posts(state = {}, action) {
    switch (action.type) {
        case INITIALIZE_POSTS:
            return action.initialState;
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

function comments(state = {}, action) {
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
            let createId = action.createId;
            if (createId) {
                const CryptoJS = require('crypto-js');
                const salt = CryptoJS.MD5(comment.author).toString();
                comment.id = CryptoJS.MD5(salt + comment.timestamp + salt).toString();
            }
            return {
                ...state,
                [comment.id]: comment
            }
        case UPDATE_COMMENTS:
            const newComments = Object.assign(action.comments, state);
            return newComments;
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
