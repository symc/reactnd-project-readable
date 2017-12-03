import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class NotFound extends Component {
    render() {
        return (
            // Redirect to main page if the entered URL cannot 
            // be found
            <Redirect to="/"/>
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