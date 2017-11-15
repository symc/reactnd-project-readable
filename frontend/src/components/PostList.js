import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';

class PostList extends Component {
    render() {
        const postIds = this.props.postIds;
        return (
            <div>
                {postIds.map((id) => (
                    <div key={id}>
                        <Post id={id}/>
                    </div>
                ))}
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