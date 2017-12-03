import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Post from './Post';
import CommentList from './CommentList';
import NotFound from './NotFound';

class PostDetails extends Component {
    render() {
        const thisPost = this.props.post;
        if (!thisPost) {
            return (
                <NotFound/>
            )
        }
        return (
            <div>
                <Post id={thisPost.id} showDetails={false}/>
                <CommentList id={thisPost.id} />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {};
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
)(PostDetails));