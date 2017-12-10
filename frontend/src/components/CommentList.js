import React, { Component } from 'react';
import { connect } from 'react-redux';
import Comment from './Comment';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class CommentList extends Component {
    render() {
        const commentIds = this.props.commentList;
        const currentPath = this.props.location.pathname;
        const newCommentPath = currentPath + '/newcomment'
        return (
            <div>
                <div className="panel panel-warning">
                    <div className="panel-heading postHeader">Comments</div>
                    <div className="panel-body">
                        {commentIds.map((id) => (
                            <Comment key={id} id={id}/>
                        ))}
                    </div>
                    <Link
                        className="btn btn-primary addCommentButton" 
                        to={newCommentPath}
                    >
                        Add new comment
                    </Link>
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
        commentList: Object.entries(state.comments)
        .filter((comment) => {
            return (comment[1].parentId === postId)})
            .map((comment) => {
                return comment[0];
            })
    };
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentList));