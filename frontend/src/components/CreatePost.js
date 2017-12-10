import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addPost } from '../actions';

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
        const post = {
            id: timestamp,
            timestamp: timestamp,
            title: title,
            body: postBody,
            author: author,
            category: category,
            voteScore: 0,
            deleted: false,
            commentCount: 0
        };
        this.props.addPost(post);
    };

    render() {
        const categoryIds = this.props.categoryIds;
        return (
            <div>
                <div className="panel panel-success">
                    <div className="panel-heading postHeader">Add a new post</div>
                    <div className="panel-body">
                        <div className="form-group">
                            <label>Post title</label>
                            <input type="text" className="form-control" id="title"/>
                        </div>
                        <div className="form-group">
                            <label>Post body</label>
                            <textarea 
                                className="form-control" 
                                rows="5"
                                id="postBody"
                            />
                        </div>
                        <div className="form-group">
                            <label>Post author</label>
                            <input type="text" className="form-control" id="author"/>
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select id="category" className="form-control">
                                {categoryIds.map((id) => (
                                    <option key={id}>{id}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <Link
                                className="btn btn-primary"
                                to='/'
                                onClick={() => this.savePost()}
                            >
                                Save
                            </Link>
                            <Link 
                                className="btn btn-danger"
                                to='/'
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
        addPost: (post) => dispatch(addPost(post))
    };
}

function mapStateToProps({categories, posts, comments}) {
    return {
        categoryIds: Object.keys(categories)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreatePost);