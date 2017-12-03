export const ADD_CATEGORY = 'ADD_CATEGORY';
export const CHANGE_SORTBY = 'CHANGE_SORTBY';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';
export const DELETE_POST = 'DELETE_POST';

export function addCategory({name}){
    return {
        type: ADD_CATEGORY,
        name
    }
};

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
