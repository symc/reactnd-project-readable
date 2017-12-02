export const ADD_CATEGORY = 'ADD_CATEGORY';
export const CHANGE_SORTBY = 'CHANGE_SORTBY';

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
