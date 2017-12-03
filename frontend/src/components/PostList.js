import React, { Component } from 'react';
import CategoriesBar from './CategoriesBar';
import { connect } from 'react-redux';
import Post from './Post';

class PostList extends Component {
    render() {
        const postIds = this.props.postIds;
        return (
            <div>
                <CategoriesBar />
                <div>
                    {postIds.map((id) => (
                        <div key={id}>
                            <Post id={id} showDetails={true}/>
                        </div>
                    ))}
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
        postIds: Object.keys(posts)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostList);