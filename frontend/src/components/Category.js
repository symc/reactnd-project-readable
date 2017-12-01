import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Category extends Component {
    render() {
        const thisCategory = this.props.category;
        const categoryPage = `/category/${thisCategory.name}`;
        return (
            <Link to={categoryPage} className="btn btn-primary btn-sml navbar-btn">
                {thisCategory.name}
            </Link>
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