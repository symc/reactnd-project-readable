import React, { Component } from 'react';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
        <div className="App">
            <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="/">Readable</a>
                    </div>
                    <button className="btn btn-success navbar-btn">Add new post</button>
                    <button className="btn btn-success navbar-btn">Add new category</button>
                    <button className="btn btn-warning navbar-btn">Sort posts by votes</button>
                    <button className="btn btn-warning navbar-btn">Sort posts by dates</button>
                    <button className="btn btn-warning navbar-btn">Sort posts by title</button>
                </div>
            </nav>
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <button className="btn btn-primary btn-sml navbar-btn">react</button>
                    <button className="btn btn-primary btn-sml navbar-btn">redux</button>
                    <button className="btn btn-primary btn-sml navbar-btn">udacity</button>
                </div>
            </nav>
            <div className="panel panel-default">
                <div className="panel-heading postHeader">Udacity is the best place to learn React</div>
                <div className="panel-body">
                    <div className="postContent">Everyone says so after all.</div>
                </div>
                <div className="row postBanner">
                    <div className="col-md-1 postAuthor">
                        thingtwo
                    </div>
                    <div className="col-md-1 postCategory">
                        #react
                    </div>
                    <div className="col-md-2">
                        2 comments
                    </div>
                    <div className="col-md-1">
                        Vote: 6
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-success btn-sm voteButton">+</button>
                        <button className="btn btn-danger btn-sm voteButton">-</button>
                    </div>
                    <div className="col-md-2">
                        <a>See post details</a>                       
                    </div>
                </div>
            </div>
            <div className="panel panel-default">
                <div className="panel-heading postHeader">Learn Redux in 10 minutes!</div>
                <div className="panel-body">
                    <div className="postContent">Just kidding. It takes more than 10 minutes to learn technology.</div>
                </div>
                <div className="row postBanner">
                    <div className="col-md-1 postAuthor">
                        thingone
                    </div>
                    <div className="col-md-1 postCategory">
                        #redux
                    </div>
                    <div className="col-md-2">
                        No comments
                    </div>
                    <div className="col-md-1">
                        Vote: -5
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-success btn-sm voteButton">+</button>
                        <button className="btn btn-danger btn-sm voteButton">-</button>
                    </div>
                    <div className="col-md-2">
                        <a>See post details</a>  
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default App;
