import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addPost } from '../actions';
import { withRouter } from 'react-router';

class CreatePost extends Component {
    savePost = (prepopulateWith) => {
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
        if (prepopulateWith) {
            prepopulateWith.title = title;
            prepopulateWith.body = postBody;
            prepopulateWith.author = author;
            prepopulateWith.category = category;
            prepopulateWith.timestamp = timestamp
            this.props.addPost(prepopulateWith, false)
        } else {
            const newPost = {
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
            this.props.addPost(newPost, true);
        }
    };

    render() {
        const categoryIds = this.props.categoryIds;
        const prepopulateWith = this.props.prepopulateWith;
        const panelTitle = (prepopulateWith) ?
            "Editing the post" :
            "Add a new post";
        const category = this.props.match.params.category;
        const id = this.props.match.params.id;
        const discardPath = (prepopulateWith) ?
            `/${category}/${id}` :
            "/";
        const initialTitle = (prepopulateWith) ? 
            prepopulateWith.title :
            "";
        const initialBody = (prepopulateWith) ? 
            prepopulateWith.body :
            "";
        const initialAuthor = (prepopulateWith) ? 
            prepopulateWith.author :
            "";
        const initialCategory = (prepopulateWith) ? 
            prepopulateWith.category :
            "";
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
                                onClick={() => this.savePost(prepopulateWith)}
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
    const postId = ownProps.editedPostId;
    return {
        prepopulateWith: state.posts[postId],
        categoryIds: Object.keys(state.categories)
    };
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CreatePost));