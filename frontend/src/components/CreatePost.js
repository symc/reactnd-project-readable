import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addPost } from '../actions';
import { withRouter } from 'react-router';
import axiosHelpers from '../utils/axiosHelpers';

class CreatePost extends Component {
    savePost = () => {
        let title = document.getElementById('title').value;
        const postBody = document.getElementById('postBody').value;
        let author = document.getElementById('author').value;
        const category = document.getElementById('category').value;
        // Use the name anonymous if the author field is empty
        if (author === '') {
            author = 'anonymous';
        }
        // Use the title [No title] if the title is empty
        if (title === '') {
            title = '[No title]';
        }
        const timestamp = Date.now();
        // Create a new id for the post
        const CryptoJS = require('crypto-js');
        const salt = CryptoJS.MD5(author).toString();
        const id = CryptoJS.MD5(salt + timestamp + salt).toString();
        const newPost = {
            id: id,
            timestamp: timestamp,
            title: title,
            body: postBody,
            author: author,
            category: category,
            voteScore: 0,
            deleted: false,
            commentCount: 0
        };
        axiosHelpers.addPost(newPost).then((response) => {
            this.props.addPost(newPost)
        }).catch((error) => {
            console.log(error);
        });
    };

    render() {
        const categoryIds = this.props.categoryIds;
        const panelTitle = "Add a new post";
        const discardPath = "/";
        const initialTitle = "";
        const initialBody = "";
        const initialAuthor = "";
        const initialCategory = "";
        const onClickFunction = () => this.savePost();
        return (
            <div>
                <div className="panel panel-success">
                    <div className="panel-heading postHeader">{panelTitle}</div>
                    <div className="panel-body">
                        <div className="form-group">
                            <label>Post title</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="title"
                                defaultValue={initialTitle}
                            />
                        </div>
                        <div className="form-group">
                            <label>Post body</label>
                            <textarea 
                                className="form-control" 
                                rows="5"
                                id="postBody"
                                defaultValue={initialBody}
                            />
                        </div>
                        <div className="form-group">
                            <label>Post author</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="author"
                                defaultValue={initialAuthor}
                            />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select 
                                id="category"
                                className="form-control"
                                defaultValue={initialCategory}
                            >
                                {categoryIds.map((id) => (
                                    <option key={id}>{id}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <Link
                                className="btn btn-primary"
                                to='/'
                                onClick={onClickFunction}
                            >
                                Save
                            </Link>
                            <Link 
                                className="btn btn-danger"
                                to={discardPath}
                            >
                                Discard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addPost: (post, createId) => 
            dispatch(addPost(post, createId))
    };
}

const mapStateToProps = (state, ownProps) => {
    return {
        categoryIds: Object.keys(state.categories)
    };
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CreatePost));