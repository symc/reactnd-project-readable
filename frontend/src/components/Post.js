import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { upvotePost, downvotePost, deletePost } from '../actions';
import axiosHelpers from '../utils/axiosHelpers';
import {commentString, dateString} from '../utils/formatHelpers';

class Post extends Component {
    render() {
        const thisPost = this.props.post;
        const detailsPage = `/${this.props.post.category}/${this.props.post.id}`;
        const editPage = detailsPage + '/edit';
        return (
            <div className="panel panel-info">
                <div className="panel-heading post-header">{thisPost.title}</div>
                <div className="panel-body">
                    <div className="post-content">{thisPost.body}</div>
                </div>
                <div className="row post-banner">
                    <div className="col-md-1 post-author">
                        {thisPost.author}
                    </div>
                    <div className="col-md-1 post-category">
                        #{thisPost.category}
                    </div>
                    <div className="col-md-3">
                        <div className="col-md-5">
                            {commentString(thisPost.commentCount)}
                        </div>
                        <div className="col-md-5">
                            {dateString(thisPost.timestamp)}
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="col-md-7">
                            Vote: {thisPost.voteScore}
                        </div>
                        <button 
                            className="btn btn-success btn-sm post-button"
                            onClick={() => {
                                    axiosHelpers.upvotePost(thisPost.id)
                                    .then((response) => {
                                        this.props.upvotePost({id: thisPost.id})
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
                                    axiosHelpers.downvotePost(thisPost.id)
                                    .then((response) => {
                                        this.props.downvotePost({id: thisPost.id})
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
                        {
                            this.props.showDetails &&
                            <Link 
                                className="btn btn-info btn-sm post-button" 
                                to={detailsPage}
                            >
                                DETAILS
                            </Link>
                        }              
                        <Link 
                            className="btn btn-success btn-sm post-button" 
                            to={editPage}
                        >
                            EDIT
                        </Link>                       
                        <button 
                            className="btn btn-danger btn-sm post-button"
                            onClick={() => {
                                    axiosHelpers.deletePost(thisPost.id)
                                    .then((response) => {
                                        this.props.deletePost({id: thisPost.id})
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
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        upvotePost: (id) => dispatch(upvotePost(id)),
        downvotePost: (id) => dispatch(downvotePost(id)),
        deletePost: (id) => dispatch(deletePost(id))
    };
}

const mapStateToProps = (state, ownProps) => {
    const postId = ownProps.id;
    return {
        post: state.posts[postId]
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Post);