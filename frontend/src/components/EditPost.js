import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editPostEverywhere } from '../actions';
import { withRouter } from 'react-router';
import NotFound from './NotFound';
import MutablePost from './MutablePost';

/**
* @description Represents a view where a user can edit a post. Renders 
* a mutable post object with the appropriate fields so that user can
* edit a post using the mutable post
* @constructor
*/
class EditPost extends Component {
    savePost = (thisPost) => {
        let title = document.getElementById('title').value;
        const postBody = document.getElementById('postBody').value;
        let author = document.getElementById('author').value;
        const category = document.getElementById('category').value;
        // Use the name anonymous if the author field is empty
        if (author === '') {
            author = 'anonymous';
        }
        // Use the title [No title] if the title is empty
        if (title === '') {
            title = '[No title]';
        }
        // Record the time the comment is created
        const timestamp = Date.now();
        // Edit the current post
        thisPost.title = title;
        thisPost.body = postBody;
        thisPost.author = author;
        thisPost.category = category;
        thisPost.timestamp = timestamp;
        this.props.editPostEverywhere(thisPost);
    };

    render() {
        // Get the post which is being edited currently and the category
        // of this post from the url
        const thisPost = this.props.post;
        const category = this.props.match.params.category;

        // If the post is falsy or the category of the post does not match 
        // with the category obtained from the url, then the post represented
        // by this URL does not exist. Render the NotFound component.
        if (!thisPost || thisPost.category !== category) {
            return (
                <NotFound/>
            );
        }

        // Define the fields and onClick call of the mutable post
        const categoryIds = this.props.categoryIds;
        const panelTitle = 'Editing the post';
        const id = this.props.match.params.id;
        const discardPath = `/${category}/${id}`;
        const initialTitle = thisPost.title;
        const initialBody = thisPost.body;
        const initialAuthor = thisPost.author;
        const initialCategory = thisPost.category;
        const onClickFunction = () => this.savePost(thisPost);
        // Render the mutable post
        return (
            <MutablePost
                categoryIds = {categoryIds}
                panelTitle = {panelTitle}
                discardPath = {discardPath}
                initialTitle = {initialTitle}
                initialBody = {initialBody}
                initialAuthor = {initialAuthor}
                initialCategory = {initialCategory}
                onClickFunction = {onClickFunction}
            />
        );
    }
}

/**
* @description mapDispatchToProps method of EditPost
* EditPost component is using a redux action:
* 1) editPostEverywhere to add the comment to the redux store and the server
* @param {Object} dispatch - dispatch object to access actions
* @returns {Object} - an object with a function calling the store action
*/
function mapDispatchToProps(dispatch) {
    return {
        editPostEverywhere: (post) => dispatch(editPostEverywhere(post))
    };
}

/**
* @description mapStateToProps method of CreatePost component
* @param {Object} state - redux store state
* @param {Object} ownProps - properties of the component
* @returns {Object} - an object which contains the current post 
* being edited and available categories.
*/
const mapStateToProps = (state, ownProps) => {
    const postId = ownProps.match.params.id;
    return {
        post: state.posts[postId],
        categoryIds: Object.keys(state.categories)
    };
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPost));