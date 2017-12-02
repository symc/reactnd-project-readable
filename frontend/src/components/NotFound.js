import React, { Component } from 'react';
import { connect } from 'react-redux';

class NotFound extends Component {
    render() {
        return (
            <div>Sorry, the page you are looking for is not found.</div>
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
)(NotFound);