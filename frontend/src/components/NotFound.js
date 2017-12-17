import React, { Component } from 'react';
import { Redirect } from 'react-router';

/**
* @description Represents an object which is rendered when a page is not
* found or a url is invalid. Component redirects to the main page
* @constructor
*/
class NotFound extends Component {
    render() {
        return (
            <Redirect to="/"/>
        );
    }
}

export default NotFound;