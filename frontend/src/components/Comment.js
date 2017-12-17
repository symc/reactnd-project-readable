import React, { Component } from 'react';
import { connect } from 'react-redux';
import { upvoteComment, downvoteComment, deleteComment } from '../actions';
import { decreasePostCommentCount} from '../actions';
import { Link } from 'react-router-dom';
import axiosHelpers from '../utils/axiosHelpers';
import { dateString } from '../utils/formatHelpers';

/**
* @description Represents a comment. Each comment has a comment 
* body, author, a vote score, an upvote button, a downvote button,
* an edit button and a delete button
* @constructor
*/
class Comment extends Component {
    render() {
        const thisComment = this.props.comment;
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading post-header">
                        {thisComment.body}
                    </div>
                    <div className="row post-banner">
                        <div className="col-md-1 post-author">
                            {thisComment.author}
                        </div>
                        <div className="col-md-3">
                            {dateString(thisComment.timestamp)}
                        </div>
                        <div className="col-md-1">
                            Vote: {thisComment.voteScore}
                        </div>
                        <div className="col-md-1">
                            <button 
                                className="btn btn-success btn-sm post-button"
                                onClick={() => {
                                    // Upvote the comment in the back end
                                    axiosHelpers.upvoteComment(thisComment.id)
                                        .then((response) => {
                                            // then upvote it in the redux store
                                            this.props.upvoteComment({id: thisComment.id})
                                        }).catch((error) => {
                                            console.log(error);
                                        });
                                    }
                                }
                            >
                                +
                            </button>
                            <button 
                                className="btn btn-danger btn-sm post-button"
                                onClick={() => {
                                        // Downvote the comment in the back end
                                        axiosHelpers.downvoteComment(thisComment.id)
                                        .then((response) => {
                                            // then downvote it in the redux store
                                            this.props.downvoteComment({id: thisComment.id})
                                        }).catch((error) => {
                                            console.log(error);
                                        });
                                    }
                                }
                            >
                                -
                            </button>
                        </div>
                        <div className="col-md-3">
                            <Link
                                className="btn btn-success btn-sm post-button"
                                to={`/editcomment/${thisComment.id}`}
                            >
                                EDIT
                            </Link>
                            <button 
                                className="btn btn-danger btn-sm post-button"
                                onClick={() => {
                                    // Delete the comment in the back end
                                    axiosHelpers.deleteComment(thisComment.id)
                                        .then((response) => {
                                            // then delete the comment in the redux store
                                            this.props.deleteComment({id: thisComment.id});
                                            // and update the post comment count accordingly
                                            this.props.decreasePostCommentCount(
                                                {id: thisComment.parentId}
                                            );
                                        }).catch((error) => {
                                            console.log(error);
                                        });
                                    }
                                }
                            >
                                DELETE
                            </button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

/**
* @description mapDispatchToProps method of App
* App component is using four redux actions:
* 1) upvoteComment: upvotes the comment object in the redux store
* 2) downvoteComment: downvotes the comment object in the redux store
* 3) deleteComment: removes the comment object from the redux store
* 4) decreasePostCommentCount: decrease the comment count by one
* @param {Object} dispatch - dispatch object to access actions
* @returns {Object} - an object with four functions calling the store actions
*/
function mapDispatchToProps(dispatch) {
    return {
        upvoteComment: (id) => dispatch(upvoteComment(id)),
        downvoteComment: (id) => dispatch(downvoteComment(id)),
        deleteComment: (id) => dispatch(deleteComment(id)),
        decreasePostCommentCount: (id) => dispatch(decreasePostCommentCount(id))
    };
}

/**
* @description mapStateToProps method of Category component
* @param {Object} state - redux store state
* @param {Object} ownProps - properties of the component
* @returns {Object} - an object with a single field comment
* which contains a comment object that would be used by the
* component
*/
const mapStateToProps = (state, ownProps) => {
    const commentId = ownProps.id;
    return {
        comment: state.comments[commentId]
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comment);