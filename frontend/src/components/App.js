import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavigationBar from './NavigationBar';
import CategoriesBar from './CategoriesBar';
import PostList from './PostList';
import { Route } from 'react-router-dom';
import { withRouter, Switch } from 'react-router';
import PostDetails from './PostDetails';
import CreatePost from './CreatePost';
import CreateCategory from './CreateCategory';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
        <div className="App">
            {/*Always show the navigation and categories bars for all views*/}
            <NavigationBar />
            <CategoriesBar />
            <Switch>
                <Route exact path = "/" component={PostList} />
                <Route exact path = "/new/post" component={CreatePost} />
                <Route exact path = "/new/category" component={CreateCategory} />
                <Route path = "/post/:idx" component={PostDetails} />
                <Route path = "/:filterMethod/:name" component={PostList} />
                {/*If the page is not found, show the main view*/}
                <Route component={PostList}/>
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
