import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class NavigationBar extends Component {
    render() {
        return (
        <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">Readable</Link>
                    </div>
                    <Link to="/new/post" className="btn btn-success navbar-btn">Add new post</Link>
                    <Link to="/new/category" className="btn btn-success navbar-btn">Add new category</Link>
                    <Link to="/sortby/vote" className="btn btn-warning navbar-btn">Sort posts by votes</Link>
                    <Link to="/sortby/date" className="btn btn-warning navbar-btn">Sort posts by dates</Link>
                    <Link to="/sortby/title" className="btn btn-warning navbar-btn">Sort posts by title</Link>
                </div>
            </nav>
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
)(NavigationBar);