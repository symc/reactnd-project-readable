import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addComment, increasePostCommentCount } from '../actions';
import { withRouter } from 'react-router';
import NotFound from './NotFound';

class CreateComment extends Component {
    saveComment = () => {
        const commentBody = document.getElementById('commentBody').value;
        let author = document.getElementById('author').value;
        // Use the name anonymous if the author field is empty
        if (author === '') {
            author = 'anonymous';
        }
        const timestamp = Date.now();
        const parentId = this.props.match.params.id;
        const comment = {
            id: timestamp,
            parentId: parentId,
            timestamp: timestamp,
            body: commentBody,
            author: author,
            voteScore: 0,
            deleted: false,
            parentDeleted: false
        };
        this.props.addComment(comment);
        this.props.increasePostCommentCount({id: parentId});
    };

    render() {
        const thisPost = this.props.post;
        if (!thisPost) {
            return (
                <NotFound/>
            )
        }
        const category = this.props.match.params.category;
        const id = this.props.match.params.id;
        const postDetailsPath = `/${category}/${id}`;
        return (
            <div>
                <div className="panel panel-success">
                    <div className="panel-heading postHeader">Add a new comment</div>
                    <div className="panel-body">
                        <div className="form-group">
                            <label>Comment</label>
                            <input type="text" className="form-control" id="commentBody"/>
                        </div>
                        <div className="form-group">
                            <label>Comment author</label>
                            <input type="text" className="form-control" id="author"/>
                        </div>
                        <div className="form-group">
                            <Link
                                className="btn btn-primary"
                                to={postDetailsPath}
                                onClick={() => this.saveComment()}
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
    const postId = ownProps.match.params.id;
    return {
        post: state.posts[postId]
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateComment));