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

class App extends Component {
    componentDidMount() {
        // Initialize categories in redux store
        axiosHelpers.getCategories().then((response) => {
            let categories = {};
            response.data['categories'].forEach((element) => {
                categories = {
                    ...categories,
                    [element.name]: element
                };
            });
            this.props.initializeCategories(categories);
        }).catch((error) => {
            console.log(error);
        });
        // Initialize posts in redux store
        axiosHelpers.getPosts().then((response) => {
            let posts = {};
            response.data.forEach((element) => {
                posts = {
                    ...posts,
                    [element.id]: element
                };
            });
            this.props.initializePosts(posts);
        }).catch((error) => {
            console.log(error);
        });
    }
    render() {
        return (
            <div className="App">
                {/*Show the navigation bars in all views*/}
                <NavigationBar/>
                <Switch>
                    <Route exact path = "/" component={PostList} />
                    <Route exact path = "/newpost" component={CreatePost} />
                    <Route exact path = "/editcomment/:commentid" component={EditComment} />
                    <Route exact path = "/:category" component={PostList} />
                    <Route exact path = "/:category/:id" component={PostDetails} />
                    <Route exact path = "/:category/:id/newcomment" component={CreateComment} />
                    <Route path = "/:category/:id/edit" component={EditPost} />
                    <Route component={NotFound}/>
                </Switch>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        initializePosts: (posts) => dispatch(initializePosts(posts)),
        initializeCategories: (categories) => dispatch(initializeCategories(categories))
    };
}

function mapStateToProps({categories, posts, comments}) {
    return {
        categories,
        posts,
        comments
    };
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));
