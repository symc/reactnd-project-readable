import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addComment, increasePostCommentCount } from '../actions';
import { withRouter } from 'react-router';
import NotFound from './NotFound';

class EditComment extends Component {
    saveComment = (thisComment) => {
        const commentBody = document.getElementById('commentBody').value;
        let author = document.getElementById('author').value;
        // Use the name anonymous if the author field is empty
        if (author === '') {
            author = 'anonymous';
        }
        const timestamp = Date.now();
        thisComment.body = commentBody;
        thisComment.author = author;
        thisComment.timestamp = timestamp;
        this.props.addComment(thisComment, false);
    };

    render() {
        const thisPost = this.props.post;
        const thisComment = this.props.comment;
        if (!thisPost || !thisComment) {
            return (
                <NotFound/>
            )
        }
        const category = thisPost.category;
        const id = thisPost.id;
        const postDetailsPath = `/${category}/${id}`;
        return (
            <div>
                <div className="panel panel-success">
                    <div className="panel-heading postHeader">Editting a comment</div>
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

function mapDispatchToProps(dispatch) {
    return {
        addComment: (post) => dispatch(addComment(post)),
        increasePostCommentCount: (id) => dispatch(increasePostCommentCount(id))
    };
}

const mapStateToProps = (state, ownProps) => {
    const commentId = ownProps.match.params.commentid;
    const comment = state.comments[commentId]
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