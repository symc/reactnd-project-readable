import React, { Component } from 'react';
import { connect } from 'react-redux';

class CreateCategory extends Component {
    render() {
        return (
            <div>Page for creating a new category</div>
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
)(CreateCategory);