import React, { Component } from 'react';
import { connect } from 'react-redux';

class CategoriesBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <button className="btn btn-primary btn-sml navbar-btn">react</button>
                    <button className="btn btn-primary btn-sml navbar-btn">redux</button>
                    <button className="btn btn-primary btn-sml navbar-btn">udacity</button>
                </div>
            </nav>
        );
    }
}

export default CategoriesBar;