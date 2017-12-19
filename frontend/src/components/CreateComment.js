import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createComment } from '../actions';
import { withRouter } from 'react-router';
import NotFound from './NotFound';

/**
* @description Represents a view where a user can create a comment.
* This view has two fields, one for the comment body and another for the
* comment author, which are both editable. There are two buttons: one for
* saving the comment and another for discarding the changes and routing
* back to the details page of the post.
* @constructor
*/
class CreateComment extends Component {
    /**
    * @description saves a comment both persistently on the back end server
    * and on redux store.
    */
    saveComment = () => {
        // Get the comment body and author from the view
        const commentBody = document.getElementById('commentBody').value;
        let author = document.getElementById('author').value;
        // Use the name anonymous if the author field is empty
        if (author === '') {
            author = 'anonymous';
        }
        // Record the time the comment is created
        const timestamp = Date.now();
        // Parent id of the comment is obtained from the url
        const parentId = this.props.match.params.id;
        // Create the unique id of the comment
        const CryptoJS = require('crypto-js');
        const salt = CryptoJS.MD5(author).toString();
        const id = CryptoJS.MD5(salt + timestamp + salt).toString();
        // Create the new comment object
        const newComment = {
            id: id,
            parentId: parentId,
            timestamp: timestamp,
            body: commentBody,
            author: author,
            voteScore: 0,
            deleted: false,
            parentDeleted: false
        };
        // Save the new comment in the back end server and in the redux store
        this.props.createComment(newComment);
    };

    render() {
        // Get the parent post of this comment and category of this
        // parent post
        const thisPost = this.props.post;
        const category = this.props.match.params.category;

        // If parent post of this comment is falsy or the category of the 
        // parent post does not match with the category obtained from the
        // url, then the post represented by this URL does not exist. Render
        // the NotFound component.
        if (!thisPost || thisPost.category !== category) {
            return (
                <NotFound/>
            );
        }

        // Construct the string postDetailsPath, which represents the url
        // of the page that shows the details of the parent post. If the user
        // clicks to discard, the app will navigate to this address
        const id = this.props.match.params.id;
        const postDetailsPath = `/${category}/${id}`;

        // Render the view
        return (
            <div>
                <div className='panel panel-success'>
                    <div className='panel-heading post-header'>Add a new comment</div>
                    <div className='panel-body'>
                        <div className='form-group'>
                            <label>Comment</label>
                            <input type='text' className='form-control' id='commentBody'/>
                        </div>
                        <div className='form-group'>
                            <label>Comment author</label>
                            <input type='text' className='form-control' id='author'/>
                        </div>
                        <div className='form-group'>
                            <Link
                                className='btn btn-primary'
                                to={postDetailsPath}
                                onClick={() => this.saveComment()}
                            >
                                Save
                            </Link>
                            <Link 
                                className='btn btn-danger'
                                to={postDetailsPath}
                            >
                                Discard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/**
* @description mapDispatchToProps method of CreateComment
* CreateComment component is using a redux action:
* 1) createComment to add the comment to the redux store and the server
* @param {Object} dispatch - dispatch object to access actions
* @returns {Object} - an object with a function calling the store action.
*/
function mapDispatchToProps(dispatch) {
    return {
        createComment: (comment) => dispatch(createComment(comment))
    };
}

/**
* @description mapStateToProps method of CreateComment
* @param {Object} state - redux store state
* @returns {Object} - an object with a single field post,
* which contains a post object from the redux store whose
* id matches with the post id obtained from the url
*/
const mapStateToProps = (state, ownProps) => {
    // Get the parent post id from the url
    const postId = ownProps.match.params.id;
    // and return the state with same id from the store
    return {
        post: state.posts[postId]
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateComment));