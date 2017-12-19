import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Post from './Post';
import CommentList from './CommentList';
import NotFound from './NotFound';
import { fetchComments } from '../actions';

/**
* @description Represents a detailed view of a post. In contrast to the
* posts in the main view (which is handled by Post component), this view
* also shows the comments of the post.
* @constructor
*/
class PostDetails extends Component {
    /**
    * @description componentDidMount method of PostDetails
    * Lazily updates comments in the redux store by adding
    * comments associated with this post if the comments
    * are not already in the redux store
    */
    componentDidMount() {
        // Fetch the comments
        this.props.fetchComments(this.props.match.params.id);
    }
    render() {
        // Get the post object being displayed and its category
        const thisPost = this.props.post;
        const category = this.props.category;
        // If the post object is falsy or its category does not match
        // with the category obtained from the url, render the NotFound object
        if (!thisPost || thisPost.category !== category) {
            return (
                <NotFound/>
            );
        }
        // Render the post and it's comments
        return (
            <div>
                <Post id={thisPost.id} showDetails={true}/>
                <CommentList id={thisPost.id} />
            </div>
        );
    }
}

/**
* @description mapDispatchToProps method of PostDetails
* Post component is using a redux action:
* 1) fetchComments to get the comment from the server update 
* the comments in redux store and add the comments of this post 
* if they are not already in the store
* @param {Object} dispatch - dispatch object to access actions
* @returns {Object} - an object with a functioncalling the store action
*/
function mapDispatchToProps(dispatch) {
    return {
        fetchComments: (id) => dispatch(fetchComments(id))
    };
}

/**
* @description mapStateToProps method of PostDetails component
* @param {Object} state - redux store state
* @param {Object} ownProps - properties of the component
* @returns {Object} - an object which contains the current post
* and the category of this post
*/
const mapStateToProps = (state, ownProps) => {
    // Get the post id and the category from the url
    const postId = ownProps.match.params.id;
    const category = ownProps.match.params.category;
    return {
        category: category,
        post: state.posts[postId]
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetails));