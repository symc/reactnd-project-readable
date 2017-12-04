import React, { Component } from 'react';
import { connect } from 'react-redux';

class CreatePost extends Component {
    render() {
        const categoryIds = this.props.categoryIds;
        return (
            <div>
                <div className="panel panel-success">
                    <div className="panel-heading postHeader">Add a new post</div>
                    <div className="panel-body">
                        <div className="form-group">
                            <label for="title">Post title</label>
                            <input type="text" className="form-control" id="title"/>
                        </div>
                        <div className="form-group">
                            <label for="postBody">Post body</label>
                            <textarea 
                                className="form-control" 
                                rows="5"
                                id="postBody"
                            />
                        </div>
                        <div className="form-group">
                            <label for="author">Post author</label>
                            <input type="text" className="form-control" id="author"/>
                        </div>
                        <div className="form-group">
                            <label for="category">Category</label>
                            <select id="category" className="form-control">
                                {categoryIds.map((id) => (
                                    <option key={id}>{id}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">
                                Save
                            </button>
                            <button className="btn btn-danger">
                                Discard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {};
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