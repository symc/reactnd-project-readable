import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../actions';
import { withRouter } from 'react-router';
import axiosHelpers from '../utils/axiosHelpers';
import MutablePost from './MutablePost';

/**
* @description Represents a view where a user can create a post. Renders 
* a mutable post object with the appropriate fields so that user can
* create a post using the mutable post
* @constructor
*/
class CreatePost extends Component {
    /**
    * @description saves a post both persistently on the back end server
    * and on redux store.
    */
    savePost = () => {
        // Get the fields of the new posts from the view
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
        // Create the unique id of the comment
        const CryptoJS = require('crypto-js');
        const salt = CryptoJS.MD5(author).toString();
        const id = CryptoJS.MD5(salt + timestamp + salt).toString();
        // Create the new post object
        const newPost = {
            id: id,
            timestamp: timestamp,
            title: title,
            body: postBody,
            author: author,
            category: category,
            voteScore: 0,
            deleted: false,
            commentCount: 0
        };
        // Save the new post persistently in the back end server
        axiosHelpers.addPost(newPost).then((response) => {
            // then save the post to the redux store
            this.props.addPost(newPost)
        }).catch((error) => {
            console.log(error);
        });
    };

    render() {
        // Define the fields and onClick call of the mutable post
        const categoryIds = this.props.categoryIds;
        const panelTitle = "Add a new post";
        const discardPath = "/";
        const initialTitle = "";
        const initialBody = "";
        const initialAuthor = "";
        const initialCategory = "";
        const onClickFunction = () => this.savePost();
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
* @description mapDispatchToProps method of CreatePost
* CreatePost component is using a redux actions:
* 1) addPost to add the post to the redux store
* @param {Object} dispatch - dispatch object to access actions
* @returns {Object} - an object with a function calling the store action
*/
function mapDispatchToProps(dispatch) {
    return {
        addPost: (post, createId) => 
            dispatch(addPost(post, createId))
    };
}

/**
* @description mapStateToProps method of CreatePost component
* @param {Object} state - redux store state
* @param {Object} ownProps - properties of the component
* @returns {Object} - an object with a single field categoryIds
* which contains a list of available categories
*/
const mapStateToProps = (state, ownProps) => {
    return {
        categoryIds: Object.keys(state.categories)
    };
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CreatePost));