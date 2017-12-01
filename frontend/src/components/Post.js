import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Post extends Component {
    commentString = (commentCount) => {
        if (commentCount === 0) {
            return 'No comments';
        } else if (commentCount === 1) {
            return '1 comment';
        } else {
            return `${commentCount} comments`;
        }
    };
    render() {
        const thisPost = this.props.post;
        const detailedPage = `/post/${this.props.post.id}`;
        return (
            <div className="panel panel-default">
                <div className="panel-heading postHeader">{thisPost.title}</div>
                <div className="panel-body">
                    <div className="postContent">{thisPost.body}</div>
                </div>
                <div className="row postBanner">
                    <div className="col-md-1 postAuthor">
                        {thisPost.author}
                    </div>
                    <div className="col-md-1 postCategory">
                        #{thisPost.category}
                    </div>
                    <div className="col-md-2">
                        {this.commentString(thisPost.commentCount)}
                    </div>
                    <div className="col-md-1">
                        Vote: {thisPost.voteScore}
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-success btn-sm voteButton">+</button>
                        <button className="btn btn-danger btn-sm voteButton">-</button>
                    </div>
                    <div className="col-md-2">
                        <Link to={detailedPage}>See post details</Link>                       
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {};
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