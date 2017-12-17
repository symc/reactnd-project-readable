import React, { Component } from 'react';
import { connect } from 'react-redux';
import { upvoteComment, downvoteComment, deleteComment } from '../actions';
import { decreasePostCommentCount} from '../actions';
import { Link } from 'react-router-dom';
import axiosHelpers from '../utils/axiosHelpers';
import { dateString } from '../utils/formatHelpers';

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
                                    axiosHelpers.upvoteComment(thisComment.id)
                                        .then((response) => {
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
                                        axiosHelpers.downvoteComment(thisComment.id)
                                        .then((response) => {
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
                                    axiosHelpers.deleteComment(thisComment.id)
                                        .then((response) => {
                                            this.props.deleteComment({id: thisComment.id});
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

function mapDispatchToProps(dispatch) {
    return {
        upvoteComment: (id) => dispatch(upvoteComment(id)),
        downvoteComment: (id) => dispatch(downvoteComment(id)),
        deleteComment: (id) => dispatch(deleteComment(id)),
        decreasePostCommentCount: (id) => dispatch(decreasePostCommentCount(id))
    };
}

const mapStateToProps = (state, ownProps) => {
    const commentId = ownProps.id;
    return {
        comment: state.comments[commentId]
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comment);