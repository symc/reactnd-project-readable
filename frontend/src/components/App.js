import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavigationBar from './NavigationBar';
import PostList from './PostList';
import { Route } from 'react-router-dom';
import { withRouter, Switch } from 'react-router';
import PostDetails from './PostDetails';
import CreatePost from './CreatePost';
import CreateCategory from './CreateCategory';
import NotFound from './NotFound';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
        <div className="App">
            {/*Show the navigation bars in all views*/}
            <NavigationBar/>
            <Switch>
                <Route exact path = "/" component={PostList} />
                <Route exact path = "/new/post" component={CreatePost} />
                <Route exact path = "/new/category" component={CreateCategory} />
                <Route path = "/post/:idx" component={PostDetails} />
                <Route path = "/category/:name" component={PostList} />
                <Route component={NotFound}/>
            </Switch>
        </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return {};
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
