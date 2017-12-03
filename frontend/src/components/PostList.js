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

function sortPosts(posts, postIds, sortMethod) {
    let tuples = postIds.map((id) => {
        switch (sortMethod) {
            case 'votes':
                // Sort by decreasing scores
                // Higher score posts will appear earlier than lower scores
                return [-posts[id].voteScore, id];
            case 'dates':
                // Sort by decreasing time stamp
                // Recent posts will appear earlier than later posts
                return [-posts[id].timestamp, id]
            case 'titles':
                // Alphabetical sorting of the post titles
                return [posts[id].title, id];
            default:
                return [id, id];
        }
    });
    tuples.sort();
    return tuples.map((tuple) => {
        return tuple[1];
    });
}

function filterAndSortPosts(posts, selectedCategory, sortMethod) {
    if (!selectedCategory) {
        return sortPosts(posts, Object.keys(posts), sortMethod);
    }
    const answer = Object.keys(posts).filter((id) => {
        return (posts[id].category === selectedCategory);
    });
    return sortPosts(posts, answer, sortMethod);
}

const mapStateToProps = (state, ownProps) => {
    const selectedCategory = ownProps.match.params.category;
    const sortMethod = state.listState.sortBy;
    const postIds = filterAndSortPosts(state.posts, selectedCategory, sortMethod);
    return {
        postIds: postIds
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostList);