import React, { Component } from 'react';
import { connect } from 'react-redux';
import Category from './Category';

class CategoriesBar extends Component {
    render() {
        const categoryIds = this.props.categoryIds;
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
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