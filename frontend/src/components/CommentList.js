import React, { Component } from 'react';
import { connect } from 'react-redux';
import Comment from './Comment';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

/**
* @description Represents a list of comments. Each list encapsulates
* a collection of comments and a button to add new comments.
* @constructor
*/
class CommentList extends Component {
    render() {
        const commentIds = this.props.commentList;
        const currentPath = this.props.location.pathname;
        const newCommentPath = currentPath + '/newcomment';
        return (
            <div>
                <div className='panel panel-warning'>
                    <div className='panel-heading post-header'>Comments</div>
                    <div className='panel-body'>
                        {commentIds.map((id) => (
                            <Comment key={id} id={id} />
                        ))}
                    </div>
                    <Link
                        className='btn btn-primary add-comment-button'
                        to={newCommentPath}
                    >
                        Add new comment
                    </Link>
                </div>
            </div>
        );
    }
}

/**
* @description mapStateToProps method of CommentList component
* @param {Object} state - redux store state
* @param {Object} ownProps - properties of the component
* @returns {Array} - an array of comment ids where the parent id
* of each comment is equal to the provided id as a component property
*/
const mapStateToProps = (state, ownProps) => {
    const postId = ownProps.id;
    return {
        // Get all comments from the store
        commentList: Object.entries(state.comments)
            .filter((comment) => {
                // then filter the ones where the parent id
                // of the comment matches the provided id
                // as a parameter
                return (comment[1].parentId === postId)
            })
            .map((comment) => {
                // then return the comment id of each element
                return comment[0];
            })
    };
};

export default withRouter(connect(
    mapStateToProps,
    null
)(CommentList));