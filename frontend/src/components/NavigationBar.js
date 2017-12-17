import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeSortBy } from '../actions';

/**
* @description Represents the navigation bar. It encapsulates:
* 1) A text called readable. On clicking, the app navigates to the main page
* 2) A button for adding a new post
* 3) Three buttons for sorting the posts by votes, dates and titles (alphabetical)
* @constructor
*/
class NavigationBar extends Component {
    render() {
        const selectedSortMethod = `btn btn-info navbar-btn`;
        const unselectedSortMethod = `btn btn-warning navbar-btn`;
        const sortBy = this.props.sortBy;
        return (
        <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">Readable</Link>
                    </div>
                    <Link to="/newpost" className="btn btn-success navbar-btn">Add new post</Link>
                    <button 
                        className={(sortBy === 'votes') ? 
                            selectedSortMethod : unselectedSortMethod}
                        onClick={() => this.props.changeSortBy({sortBy: 'votes'})}
                    >
                        Sort posts by votes
                    </button>
                    <button 
                        className={(sortBy === 'dates') ? 
                            selectedSortMethod : unselectedSortMethod}
                        onClick={() => this.props.changeSortBy({sortBy: 'dates'})}
                    >
                        Sort posts by dates
                    </button>
                    <button 
                        className={(sortBy === 'titles') ? 
                            selectedSortMethod : unselectedSortMethod}
                        onClick={() => this.props.changeSortBy({sortBy: 'titles'})}
                    >
                        Sort posts by title
                    </button>
                </div>
            </nav>
        );
    }
}

/**
* @description mapDispatchToProps method of NavigationBar
* NavigationBar component is using a redux action:
* 1) changeSortBy to change the method of sorting when displaying the posts
* @param {Object} dispatch - dispatch object to access actions
* @returns {Object} - an object with a function calling the store action
*/
function mapDispatchToProps(dispatch) {
    return {
        changeSortBy: (newSortBy) => dispatch(changeSortBy(newSortBy))
    };
}

/**
* @description mapStateToProps method of CreatePost component
* @param {Object} state - redux store state
* @param {Object} ownProps - properties of the component
* @returns {Object} - an object which contains the current sorting
* method used by the app
*/
function mapStateToProps(state) {
    return {
        sortBy: state.listState.sortBy
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationBar);