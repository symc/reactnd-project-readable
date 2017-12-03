import React, { Component } from 'react';
import { connect } from 'react-redux';
import { upvoteComment, downvoteComment, deleteComment } from '../actions';
import { decreasePostCommentCount} from '../actions';

class Comment extends Component {
    dateString = (timestamp) => {
        const date = new Date(timestamp);
        const day = `${date.getMonth()+1}/${date.getDay()+1}/${date.getFullYear()}`;
        const hour = `${date.getHours()}:${(date.getMinutes() < 10) ? '0' : ''}${date.getMinutes()}`
        return (`${day} ${hour}`);
    }

    render() {
        const thisComment = this.props.comment;
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading postHeader">
                        {thisComment.body}
                    </div>
                    <div className="row postBanner">
                        <div className="col-md-1 postAuthor">
                            {thisComment.author}
                        </div>
                        <div className="col-md-3">
                            {this.dateString(thisComment.timestamp)}
                        </div>
                        <div className="col-md-1">
                            Vote: {thisComment.voteScore}
                        </div>
                        <div className="col-md-1">
                            <button 
                                className="btn btn-success btn-sm postButton"
                                onClick={() => {
                                        this.props.upvoteComment({id: thisComment.id})
                                    }
                                }
                            >
                                +
                            </button>
                            <button 
                                className="btn btn-danger btn-sm postButton"
                                onClick={() => {
                                        this.props.downvoteComment({id: thisComment.id})
                                    }
                                }
                            >
                                -
                            </button>
                        </div>
                        <div className="col-md-3">
                            <button
                                className="btn btn-success btn-sm postButton" 
                            >
                                EDIT
                            </button>
                            <button 
                                className="btn btn-danger btn-sm postButton"
                                onClick={() => {
                                        this.props.deleteComment({id: thisComment.id});
                                        this.props.decreasePostCommentCount(
                                            {id: thisComment.parentId}
                                        );
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