export const CHANGE_SORTBY = 'CHANGE_SORTBY';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';
export const DELETE_POST = 'DELETE_POST';
export const ADD_POST = 'ADD_POST';
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
export const INCREASE_POST_COMMENT_COUNT = 'INCREASE_POST_COMMENT_COUNT';
export const DECREASE_POST_COMMENT_COUNT = 'DECREASE_POST_COMMENT_COUNT';
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const ADD_COMMENT = 'ADD_COMMENT';

export function changeSortBy({sortBy}) {
    return {
        type: CHANGE_SORTBY,
        sortBy
    }
};

export function upvotePost({id}) {
    return {
        type: UPVOTE_POST,
        id
    }
};

export function downvotePost({id}) {
    return {
        type: DOWNVOTE_POST,
        id
    }
};

export function deletePost({id}) {
    return {
        type: DELETE_POST,
        id
    }
};

export function addPost(post, createId) {
    return {
        type: ADD_POST,
        post,
        createId
    }
};

export function increasePostCommentCount({id}) {
    return {
        type: INCREASE_POST_COMMENT_COUNT,
        id
    }
};

export function decreasePostCommentCount({id}) {
    return {
        type: DECREASE_POST_COMMENT_COUNT,
        id
    }
};

export function upvoteComment({id}) {
    return {
        type: UPVOTE_COMMENT,
        id
    }
};

export function downvoteComment({id}) {
    return {
        type: DOWNVOTE_COMMENT,
        id
    }
};

export function deleteComment({id}) {
    return {
        type: DELETE_COMMENT,
        id
    }
};

export function addComment(comment) {
    return {
        type: ADD_COMMENT,
        comment
    }
}
