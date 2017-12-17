import React, { Component } from 'react';
import { connect } from 'react-redux';
import Category from './Category';
import { Link } from 'react-router-dom';

/**
* @description Represents a bar which contains available categories
* and a "Show all categories" button. Users can click these buttons
* to filter the displayed posts by category.
* @constructor
*/
class CategoriesBar extends Component {
    render() {
        const categoryIds = this.props.categoryIds;
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <Link to='/' className="btn btn-primary btn-sml navbar-btn">
                        Show all categories
                    </Link>
                    {categoryIds.map((id) => (
                        <Category key={id} id={id}/>
                    ))}
                </div>
            </nav>
        );
    }
}

/**
* @description mapStateToProps method of CategoriesBar component
* @param {Object} state - redux store state
* @returns {Object} - an object with a single field categoryIds,
* which contains the names of the available categories as an array
*/
function mapStateToProps(state) {
    return {
        categoryIds: Object.keys(state.categories)
    };
}

export default connect(
    mapStateToProps,
    null
)(CategoriesBar);