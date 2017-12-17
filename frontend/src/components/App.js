import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavigationBar from './NavigationBar';
import PostList from './PostList';
import { Route } from 'react-router-dom';
import { withRouter, Switch } from 'react-router';
import PostDetails from './PostDetails';
import CreatePost from './CreatePost';
import CreateComment from './CreateComment';
import NotFound from './NotFound';
import EditPost from './EditPost';
import EditComment from './EditComment';
import '../styles/App.css';
import axiosHelpers from '../utils/axiosHelpers';
import { initializePosts, initializeCategories } from '../actions';

/**
* @description Represents the main component where the app lives
* @constructor
*/
class App extends Component {
    /**
    * @description componentDidMount method of the App
    * Gets all categories and posts from the backend server
    * and uses the returned values from the server to initialize
    * the redux store.
    */
    componentDidMount() {
        // Get categories from the server
        axiosHelpers.getCategories().then((response) => {
            let categories = {};
            response.data['categories'].forEach((element) => {
                categories = {
                    ...categories,
                    [element.name]: element
                };
            });
            // then, initialize categories in redux store
            this.props.initializeCategories(categories);
        }).catch((error) => {
            console.log(error);
        });

        // Get posts from the server
        axiosHelpers.getPosts().then((response) => {
            let posts = {};
            response.data.forEach((element) => {
                posts = {
                    ...posts,
                    [element.id]: element
                };
            });
            // then, initialize posts in redux store
            this.props.initializePosts(posts);
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className='App'>
                {/*Show the navigation bars in all views*/}
                <NavigationBar/>
                <Switch>
                    <Route exact path = '/' component={PostList} />
                    <Route exact path = '/newpost' component={CreatePost} />
                    <Route exact path = '/editcomment/:commentid' component={EditComment} />
                    <Route exact path = '/:category' component={PostList} />
                    <Route exact path = '/:category/:id' component={PostDetails} />
                    <Route exact path = '/:category/:id/newcomment' component={CreateComment} />
                    <Route path = '/:category/:id/edit' component={EditPost} />
                    <Route component={NotFound}/>
                </Switch>
            </div>
        );
    }
}

/**
* @description mapDispatchToProps method of App
* App component is using two redux actions:
* 1) initializePost to initialize the posts in redux store
* 2) initializeCategories to initialize the categories redux store
* @param {Object} dispatch - dispatch object to access actions
* @returns {Object} - an object with two functions calling the store actions
*/
function mapDispatchToProps(dispatch) {
    return {
        initializePosts: (posts) => dispatch(initializePosts(posts)),
        initializeCategories: (categories) => dispatch(initializeCategories(categories))
    };
}

export default withRouter(connect(
    null,
    mapDispatchToProps
)(App));
