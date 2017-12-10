import React, { Component } from 'react';
import { connect } from 'react-redux';
import Category from './Category';
import { Link } from 'react-router-dom';

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

function mapDispatchToProps(dispatch) {
    return {};
}

function mapStateToProps({categories, posts, comments}) {
    return {
        categoryIds: Object.keys(categories)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoriesBar);