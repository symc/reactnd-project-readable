import axiosHelpers from '../utils/axiosHelpers';

/* Constants for categories */
export const INITIALIZE_CATEGORIES = 'INITIALIZE_CATEGORIES';

/* Constants for posts */
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';
export const DELETE_POST = 'DELETE_POST';
export const ADD_POST = 'ADD_POST';
export const INCREASE_POST_COMMENT_COUNT = 'INCREASE_POST_COMMENT_COUNT';
export const DECREASE_POST_COMMENT_COUNT = 'DECREASE_POST_COMMENT_COUNT';

/* Constants for comments */
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const ADD_COMMENT = 'ADD_COMMENT';
export const INITIALIZE_POSTS = 'INITIALIZE_POSTS';
export const UPDATE_COMMENTS = 'UPDATE_COMMENTS';

/* Constants for listState */
export const CHANGE_SORTBY = 'CHANGE_SORTBY';

/* Actions for categories */

export function initializeCategories(initialState) {
    return {
        type: INITIALIZE_CATEGORIES,
        initialState
    }
}

export const fetchCategories = () => dispatch => {
    // Get categories from the server
    axiosHelpers.getCategories().then((response) => {
        let categories = {};
        response.data['categories'].forEach((element) => {
            categories = {
                ...categories,
                [element.name]: element
            };
        });
        // then, initialize categories in redux store
        dispatch(initializeCategories(categories));
    }).catch((error) => {
        console.log(error);
    });
};

/* Actions for posts */

export function initializePosts(initialState) {
    return {
        type: INITIALIZE_POSTS,
        initialState
    }
}

export const fetchPosts = () => dispatch => {
    // Get posts from the server
    axiosHelpers.getPosts().then((response) => {
        let posts = {};
        response.data.forEach((element) => {
            posts = {
                ...posts,
                [element.id]: element
            };
        });
        // then, initialize posts in redux store
        dispatch(initializePosts(posts));
    }).catch((error) => {
        console.log(error);
    });
};

export function upvotePost({id}) {
    return {
        type: UPVOTE_POST,
        id
    }
}

export const upvotePostEverywhere = (id) => dispatch => {
    // Upvote the post in the back end
    axiosHelpers.upvotePost(id)
    .then((response) => {
        // then, upvote it in the redux store
        dispatch(upvotePost({id: id}))
    }).catch((error) => {
        window.alert(axiosHelpers.networkErrorMessage);
        console.log(error);
    });
};

export function downvotePost({id}) {
    return {
        type: DOWNVOTE_POST,
        id
    }
}

export const downvotePostEverywhere = (id) => dispatch => {
    // Downvote a post in the back end
    axiosHelpers.downvotePost(id)
    .then((response) => {
        // then, downvote it in the redux store
        dispatch(downvotePost({id: id}));
    }).catch((error) => {
        window.alert(axiosHelpers.networkErrorMessage);
        console.log(error);
    });
};

export function deletePost({id}) {
    return {
        type: DELETE_POST,
        id
    }
}

export const deletePostEverywhere = (id) => dispatch => {
    // Delete a post from the back end
    axiosHelpers.deletePost(id)
    .then((response) => {
        // then delete it from the redux store
        dispatch(deletePost({id: id}))
    }).catch((error) => {
        window.alert(axiosHelpers.networkErrorMessage);
        console.log(error);
    });
};

export function addPost(post) {
    return {
        type: ADD_POST,
        post
    }
}

export function increasePostCommentCount({id}) {
    return {
        type: INCREASE_POST_COMMENT_COUNT,
        id
    }
}

export function decreasePostCommentCount({id}) {
    return {
        type: DECREASE_POST_COMMENT_COUNT,
        id
    }
}

export const createPost = (post) => dispatch => {
    // Save the new post persistently in the back end server
    axiosHelpers.addPost(post).then((response) => {
        // then save the post to the redux store
        dispatch(addPost(post));
    }).catch((error) => {
        window.alert(axiosHelpers.networkErrorMessage);
        console.log(error);
    });
};

export const editPostEverywhere = (post) => dispatch => {
    // Save the edited post persistently in the back end
    axiosHelpers.editPost(post).then((response) => {
        // then, save it to the redux store
        dispatch(addPost(post));
    }).catch((error) => {
        window.alert(axiosHelpers.networkErrorMessage);
        console.log(error);
    });
};

/* Actions for comments */

export function upvoteComment({id}) {
    return {
        type: UPVOTE_COMMENT,
        id
    }
}

export const upvoteCommentEverywhere = (id) => dispatch => {
    // Upvote the comment in the back end
    axiosHelpers.upvoteComment(id)
    .then((response) => {
        // then upvote it in the redux store
        dispatch(upvoteComment({id: id}));
   }).catch((error) => {
        window.alert(axiosHelpers.networkErrorMessage);
        console.log(error);
    });
};

export function downvoteComment({id}) {
    return {
        type: DOWNVOTE_COMMENT,
        id
    }
}

export const downvoteCommentEverywhere = (id) => dispatch => {
    // Downvote the comment in the back end
    axiosHelpers.downvoteComment(id)
    .then((response) => {
        // then downvote it in the redux store
        dispatch(downvoteComment({id: id}));
    }).catch((error) => {
        window.alert(axiosHelpers.networkErrorMessage);
        console.log(error);
    });
};

export function deleteComment({id}) {
    return {
        type: DELETE_COMMENT,
        id
    }
}

export const deleteCommentEverywhere = (comment) => dispatch => {
    // Delete the comment in the back end
     axiosHelpers.deleteComment(comment.id)
    .then((response) => {
        //then delete the comment in the redux store
        dispatch(deleteComment({id: comment.id}));
        // and update the post comment count accordingly
        dispatch(decreasePostCommentCount({id: comment.parentId}));
    }).catch((error) => {
        window.alert(axiosHelpers.networkErrorMessage);
        console.log(error);
    });
};

export function addComment(comment) {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export const createComment = (comment) => dispatch => {
    // Save the new comment persistently in the back end server
    axiosHelpers.addComment(comment).then((response) => {
        // then save the comment in the redux store
        dispatch(addComment(comment));
        // and update the comment count of the parent post
        dispatch(increasePostCommentCount({id: comment.parentId}));
    }).catch((error) => {
        window.alert(axiosHelpers.networkErrorMessage);
        console.log(error);
    });
};

export const editCommentEverywhere = (comment) => dispatch => {
    // Save the edited comment persistently in the back end
    axiosHelpers.editComment(comment, comment.id).then((response) => {
        // then, save it to the redux store
        dispatch(addComment(comment));
    }).catch((error) => {
        debugger;
        window.alert(axiosHelpers.networkErrorMessage);
        console.log(error);
    });
};

export function updateComments(comments) {
    return {
        type: UPDATE_COMMENTS,
        comments
    }
}

export const fetchComments = (id) => dispatch => {
    // Get the comments of the current post from the back end
    axiosHelpers.getComments(id).then((response) => {
        // then construct an object containing these posts
        let comments = {};
        response.data.forEach((element) => {
            comments = {
                ...comments,
                [element.id]: element
            };
        });
        // and update the redux store
        dispatch(updateComments(comments));
    }).catch((error) => {
        window.alert(axiosHelpers.networkErrorComments);
        console.log(error);
    });
};

/* Actions for listState */

export function changeSortBy({sortBy}) {
    return {
        type: CHANGE_SORTBY,
        sortBy
    }
}