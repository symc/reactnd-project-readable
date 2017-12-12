import React, { Component } from 'react';
import { Redirect } from 'react-router';

class NotFound extends Component {
    render() {
        return (
            // Redirect to main page if the entered URL cannot 
            // be found
            <Redirect to="/"/>
        );
    }
}

export default NotFound;