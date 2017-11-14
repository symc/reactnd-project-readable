import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavigationBar from './NavigationBar';
import CategoriesBar from './CategoriesBar';
import PostList from './PostList';
import '../styles/App.css';

class App extends Component {
  render() {
    console.log(this.props);
    return (
        <div className="App">
            <NavigationBar />
            <CategoriesBar />
            <PostList />
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
