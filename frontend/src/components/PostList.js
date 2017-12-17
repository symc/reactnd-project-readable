import React, { Component } from 'react';
import CategoriesBar from './CategoriesBar';
import { connect } from 'react-redux';
import Post from './Post';

/**
* @description Represents a list of posts. Each list contains a 
* categories bar to filter the list by category name and a list
* of sorted posts
* @constructor
*/
class PostList extends Component {
    render() {
        const postIds = this.props.postIds;
        return (
            <div>
                <CategoriesBar />
                <div>
                    {postIds.map((id) => (
                        <div key={id}>
                            <Post id={id} showDetails={false}/>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

/**
* @description Helper function to sort a list of posts
* @param {Array} posts - list of post objects
* @param {Array} postIds - list of post ids
* @param {string} sortMethod - method of sorting
* @returns {Array} - an array of post ids, where corresponding
* posts are in sorted order
*/
function sortPosts(posts, postIds, sortMethod) {
    // Obtain a list of tuples where for each post, the list
    // contains a tuple (valueOfInterest, postId). In this tuple,
    // valueOfInterest is the field of the post which will be used
    // for sorting and postId is the id of the post. In the case of
    // an unknown sorting method, sort by postId.
    let tuples = postIds.map((id) => {
        switch (sortMethod) {
            case 'votes':
                // sort by vote score
                return [posts[id].voteScore, id];
            case 'dates':
                // sort by date, from newest to oldest
                return [posts[id].timestamp, id]
            case 'titles':
                // sort by title (alphabetical)
                return [posts[id].title, id];
            default:
                return [id, id];
        }
    });
    // Perform the sort operation on the tuple list
    switch (sortMethod) {
        case 'votes':
        case 'dates':
            // Reverse sort in the case of votes and dates
            // since we want the highest vote and newest day
            // to appear on top
            tuples.sort(function(a, b){return b[0]-a[0]});
            break;
        default:
            // Sort in other cases
            tuples.sort();
    }
    // Return an array which contains the postIds only
    return tuples.map((tuple) => {
        return tuple[1];
    });
}

/**
* @description Helper function to filter and sort the posts
* @param {Array} posts - list of post objects
* @param {string} selectedCategory - category to be used for filtering
* @param {string} sortMethod - method of sorting
* @returns {Array} - an array of post ids, where corresponding
* posts are in sorted order and filtered by category
*/
function filterAndSortPosts(posts, selectedCategory, sortMethod) {
    // If no category is selected, return all post in sorted order
    if (!selectedCategory) {
        return sortPosts(posts, Object.keys(posts), sortMethod);
    }
    // Otherwise, return posts with the selected category only
    const answer = Object.keys(posts).filter((id) => {
        return (posts[id].category === selectedCategory);
    });
    return sortPosts(posts, answer, sortMethod);
}
/**
* @description mapStateToProps method of PostList component
* @param {Object} state - redux store state
* @param {Object} ownProps - properties of the component
* @returns {Object} - an object which contains a list of post ids
* to be displayed by the view. 
*/
const mapStateToProps = (state, ownProps) => {
    // Get the sort method and selected category
    const selectedCategory = ownProps.match.params.category;
    const sortMethod = state.listState.sortBy;
    // Filter and sort the posts using the sort method and selected category
    const postIds = filterAndSortPosts(state.posts, selectedCategory, sortMethod);
    return {
        postIds: postIds
    };
}

export default connect(
    mapStateToProps,
    null
)(PostList);