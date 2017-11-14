import React, { Component } from 'react';
import { connect } from 'react-redux';

class NavigationBar extends Component {
    render() {
        return (
        <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="/">Readable</a>
                    </div>
                    <button className="btn btn-success navbar-btn">Add new post</button>
                    <button className="btn btn-success navbar-btn">Add new category</button>
                    <button className="btn btn-warning navbar-btn">Sort posts by votes</button>
                    <button className="btn btn-warning navbar-btn">Sort posts by dates</button>
                    <button className="btn btn-warning navbar-btn">Sort posts by title</button>
                </div>
            </nav>
        );
    }
}

export default NavigationBar;