import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
* @description Represents a category button. On clicking, this button
* navigates to a page which list the posts under this category.
* This is a functional stateless component.
*/
const Category = props => {
    const thisCategory = props.category;
    const categoryPage = `/${thisCategory.name}`;
    return (
        <Link to={categoryPage} className='btn btn-primary btn-sml navbar-btn'>
            {thisCategory.name}
        </Link>
    );
}

/**
* @description mapStateToProps method of Category component
* @param {Object} state - redux store state
* @param {Object} ownProps - properties of the component
* @returns {Object} - an object with a single field category,
* which contains a category entry that would be used by the
* component
*/
const mapStateToProps = (state, ownProps) => {
    const categoryId = ownProps.id;
    return {
        category: state.categories[categoryId]
    };
};

Category.propTypes = {
    id: PropTypes.string.isRequired
};

export default connect(
    mapStateToProps,
    null
)(Category);