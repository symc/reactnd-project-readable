import React, { Component } from 'react';
import { connect } from 'react-redux';
import Comment from './Comment';

class CommentList extends Component {
    render() {
        const commentIds = this.props.commentList;
        return (
            <div>
                <div className="panel panel-warning">
                    <div className="panel-heading postHeader">Comments</div>
                    <div className="panel-body">
                        {commentIds.map((id) => (
                            <Comment key={id} id={id}/>
                        ))}
                    </div>
                    <button
                        className="btn btn-primary addCommentButton" 
                    >
                        Add new comment
                    </button>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentList);