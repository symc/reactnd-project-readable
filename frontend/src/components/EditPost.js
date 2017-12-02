import React, { Component } from 'react';
import { connect } from 'react-redux';

class EditPost extends Component {
    render() {
        const postID = this.props.match.params.idx;
        return (
            <div>Edit post form for {postID}</div>
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