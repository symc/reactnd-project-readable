import React, { Component } from 'react';
import { connect } from 'react-redux';

class CreatePost extends Component {
    render() {
        return (
            <div>Page for creating a new post</div>
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
)(CreatePost);