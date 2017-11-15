import React, { Component } from 'react';
import { connect } from 'react-redux';

class Category extends Component {
    render() {
        const thisCategory = this.props.category;
        return (
            <button className="btn btn-primary btn-sml navbar-btn">
                {thisCategory.name}
            </button>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {};
}

const mapStateToProps = (state, ownProps) => {
    const categoryId = ownProps.id;
    return {
        category: state.categories[categoryId]
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Category);