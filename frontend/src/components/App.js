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
import { fetchPosts, fetchCategories } from '../actions';

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
        // Fetch the categories from the server
        this.props.fetchCategories();
        // Fetch the posts from the server
        this.props.fetchPosts();
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
* 1) fetchPost to fetch posts from the server and
* initialize the posts in redux store
* 2) fetchCategories to fetch categories from the server and
* initialize the categories redux store
* @param {Object} dispatch - dispatch object to access actions
* @returns {Object} - an object with two functions calling the store actions
*/
function mapDispatchToProps(dispatch) {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        fetchCategories: () => dispatch(fetchCategories())
    };
}

export default withRouter(connect(
    null,
    mapDispatchToProps
)(App));
