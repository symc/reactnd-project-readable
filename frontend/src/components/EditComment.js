import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addComment } from '../actions';
import { withRouter } from 'react-router';
import NotFound from './NotFound';
import axiosHelpers from '../utils/axiosHelpers';

/**
* @description Represents a view where a user can edit a comment.
* This view has two fields, one for the comment body and another for the
* comment author, which are both editable. There are two buttons: one for
* saving the comment and another for discarding the changes and routing
* back to the details page of the post. The fields are prepopulated with
* the existing data.
* @constructor
*/
class EditComment extends Component {
    /**
    * @description edits a comment both persistently on the back end server
    * and on redux store.
    * @param {Object} thisComment - current comment which is being edited
    */
    saveComment = (thisComment) => {
        // Get the comment body and author from the view
        const commentBody = document.getElementById('commentBody').value;
        let author = document.getElementById('author').value;
        // Use the name anonymous if the author field is empty
        if (author === '') {
            author = 'anonymous';
        }
        // Record the time the comment is created
        const timestamp = Date.now();
        // Edit the current comment which is being edited
        thisComment.body = commentBody;
        thisComment.author = author;
        thisComment.timestamp = timestamp;
        // Save the edited comment persistently in the back end
        axiosHelpers.editComment(thisComment, thisComment.id).then((response) => {
            // then, save it to the redux store
            this.props.addComment(thisComment);
        }).catch((error) => {
            console.log(error);
        });
    };

    render() {
        // Get the parent post of this comment and category of this
        // parent post
        const thisPost = this.props.post;
        const thisComment = this.props.comment;

        // If parent post of this comment is falsy or the category of the 
        // parent post does not match with the category obtained from the
        // url, then the post represented by this URL does not exist. Render
        // the NotFound component.
        if (!thisPost || !thisComment) {
            return (
                <NotFound/>
            )
        }

        // Construct the string postDetailsPath, which represents the url
        // of the page that shows the details of the parent post. If the user
        // clicks to discard, the app will navigate to this address
        const category = thisPost.category;
        const id = thisPost.id;
        const postDetailsPath = `/${category}/${id}`;

        // Render the view
        return (
            <div>
                <div className="panel panel-success">
                    <div className="panel-heading post-header">Editing a comment</div>
                    <div className="panel-body">
                        <div className="form-group">
                            <label>Comment</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="commentBody"
                                defaultValue={thisComment.body}
                            />
                        </div>
                        <div className="form-group">
                            <label>Comment author</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="author"
                                defaultValue={thisComment.author}
                            />
                        </div>
                        <div className="form-group">
                            <Link
                                className="btn btn-primary"
                                to={postDetailsPath}
                                onClick={() => this.saveComment(thisComment)}
                            >
                                Save
                            </Link>
                            <Link 
                                className="btn btn-danger"
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
* @description mapDispatchToProps method of EditComment
* EditComment component is using a redux action:
* 1) addComment to add the comment to the redux store
* @param {Object} dispatch - dispatch object to access actions
* @returns {Object} - an object with a function calling the store action
*/
function mapDispatchToProps(dispatch) {
    return {
        addComment: (post) => dispatch(addComment(post))
    };
}

/**
* @description mapStateToProps method of EditComment
* @param {Object} state - redux store state
* @param {Object} ownProps - properties of the component
* @returns {Object} - an object with a two fields comment and post.
* Comment field maps to the current post being edited. The post field
* maps to the parent post of this comment
*/
const mapStateToProps = (state, ownProps) => {
    // Get the comment id from the url
    const commentId = ownProps.match.params.commentid;
    // and get the corresponding comment from the store using that id
    const comment = state.comments[commentId];
    // Get parent post of this comment
    const postId = (comment) ? comment.parentId : undefined;
    const post = (postId) ? state.posts[postId] : undefined;
    return {
        comment: comment,
        post: post
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(EditComment));