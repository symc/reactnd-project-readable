import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreatePost from './CreatePost';

class EditPost extends Component {
    render() {
        const postId = this.props.match.params.id;
        return (
            <CreatePost editedPostId={postId}/>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {};
}

function mapStateToProps({categories, posts, comments}) {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPost);