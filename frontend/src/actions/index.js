export const ADD_CATEGORY = 'ADD_CATEGORY';

export function addCategory({name}){
    return {
        type: ADD_CATEGORY,
        name
    }
};
