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

class App extends Component {
    componentDidMount() {
        axiosHelpers.getCategories().then((response) => {
            console.log(response.data);
            console.log(response.status);
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
