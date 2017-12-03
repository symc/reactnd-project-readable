export const ADD_CATEGORY = 'ADD_CATEGORY';
export const CHANGE_SORTBY = 'CHANGE_SORTBY';
export const UPVOTE = 'UPVOTE';
export const DOWNVOTE = 'DOWNVOTE';

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

export function upvote({id}) {
    return {
        type: UPVOTE,
        id
    }
};

export function downvote({id}) {
    return {
        type: DOWNVOTE,
        id
    }
}
