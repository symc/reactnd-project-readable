import React, { Component } from 'react';
import { connect } from 'react-redux';

class PostDetails extends Component {
    render() {
        const postID = this.props.match.params.idx;
        return (
            <div>Post details will be here for {postID}</div>
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
)(PostDetails);