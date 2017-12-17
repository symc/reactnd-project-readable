import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { upvotePost, downvotePost, deletePost } from '../actions';
import axiosHelpers from '../utils/axiosHelpers';
import {commentString, dateString} from '../utils/formatHelpers';

/**
* @description Represents a post in the main page.
* @constructor
*/
class Post extends Component {
    render() {
        // Construct the link for editing this post
        const thisPost = this.props.post;
        const detailsPage = `/${this.props.post.category}/${this.props.post.id}`;
        const editPage = detailsPage + '/edit';

        return (
            <div className='panel panel-info'>
                <div className='panel-heading post-header'>{thisPost.title}</div>
                <div className='panel-body'>
                    <div className='post-content'>{thisPost.body}</div>
                </div>
                <div className='row post-banner'>
                    <div className='col-md-1 post-author'>
                        {thisPost.author}
                    </div>
                    <div className='col-md-1 post-category'>
                        #{thisPost.category}
                    </div>
                    <div className='col-md-3'>
                        <div className='col-md-5'>
                            {commentString(thisPost.commentCount)}
                        </div>
                        <div className='col-md-5'>
                            {dateString(thisPost.timestamp)}
                        </div>
                    </div>
                    <div className='col-md-2'>
                        <div className='col-md-7'>
                            Vote: {thisPost.voteScore}
                        </div>
                        <button 
                            className='btn btn-success btn-sm post-button'
                            onClick={() => {
                                    // Upvote the post in the back end
                                    axiosHelpers.upvotePost(thisPost.id)
                                    .then((response) => {
                                        // then, upvote it in the redux store
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
                            className='btn btn-danger btn-sm post-button'
                            onClick={() => {
                                    // Downvote a post in the back end
                                    axiosHelpers.downvotePost(thisPost.id)
                                    .then((response) => {
                                        // then, downvote it in the redux store
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
                    <div className='col-md-3'>
                        {
                            !this.props.showDetails &&
                            <Link 
                                className='btn btn-info btn-sm post-button' 
                                to={detailsPage}
                            >
                                DETAILS
                            </Link>
                        }              
                        <Link 
                            className='btn btn-success btn-sm post-button' 
                            to={editPage}
                        >
                            EDIT
                        </Link>                       
                        <button 
                            className='btn btn-danger btn-sm post-button'
                            onClick={() => {
                                    // Delete a post from the back end
                                    axiosHelpers.deletePost(thisPost.id)
                                    .then((response) => {
                                        // then delete it from the redux store
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

/**
* @description mapDispatchToProps method of Post
* Post component is using three redux actions:
* 1) upvotePost to upvote it
* 2) downvotePost to downvote it
* 3) deletePost to delete it from the store
* @param {Object} dispatch - dispatch object to access actions
* @returns {Object} - an object with functions calling the store actions
*/
function mapDispatchToProps(dispatch) {
    return {
        upvotePost: (id) => dispatch(upvotePost(id)),
        downvotePost: (id) => dispatch(downvotePost(id)),
        deletePost: (id) => dispatch(deletePost(id))
    };
}

/**
* @description mapStateToProps method of Post component
* @param {Object} state - redux store state
* @param {Object} ownProps - properties of the component
* @returns {Object} - an object which contains the current post.
*/
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