import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

/**
* @description Represents a mutable post which can be used for editing
* an existing post or creating a new post. In the case of editing, the fields
* are prepopulated with the existing data. In the case of new post creation,
* the fields are empty
* @constructor
*/
class MutablePost extends Component {
    render() {
        // Get the list of categories, initial field values,
        // discard path and 
        const categoryIds = this.props.categoryIds;
        const panelTitle = this.props.panelTitle;
        const discardPath = this.props.discardPath;
        const initialTitle = this.props.initialTitle;
        const initialBody = this.props.initialBody;
        const initialAuthor = this.props.initialAuthor;
        const initialCategory = this.props.initialCategory;
        const onClickFunction = this.props.onClickFunction;
        return (
            <div>
                <div className="panel panel-success">
                    <div className="panel-heading post-header">{panelTitle}</div>
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

export default withRouter(connect(
    null,
    null
)(MutablePost));