import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeSortBy } from '../actions';

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

function mapDispatchToProps(dispatch) {
    return {
        changeSortBy: (newSortBy) => dispatch(changeSortBy(newSortBy))
    };
}

function mapStateToProps({listState}) {
    return {
        sortBy: listState.sortBy
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationBar);