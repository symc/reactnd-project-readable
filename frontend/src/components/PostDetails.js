import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Post from './Post';
import CommentList from './CommentList';
import NotFound from './NotFound';
import axiosHelpers from '../utils/axiosHelpers';
import { updateComments } from '../actions';

class PostDetails extends Component {
    componentDidMount() {
        // Lazily update comments in the redux store
        // by adding comments associated with this post
        // if the comments are not already in the redux
        // store
        axiosHelpers.getComments(this.props.match.params.id).then((response) => {
            let comments = {};
            response.data.forEach((element) => {
                comments = {
                    ...comments,
                    [element.id]: element
                };
            });
            this.props.updateComments(comments);
        }).catch((error) => {
            console.log(error);
        });
    }
    render() {
        const thisPost = this.props.post;
        const category = this.props.match.params.category;
        if (!thisPost || thisPost.category !== category) {
            return (
                <NotFound/>
            )
        }
        return (
            <div>
                <Post id={thisPost.id} showDetails={false}/>
                <CommentList id={thisPost.id} />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateComments: (comments) => dispatch(updateComments(comments))
    };
}

const mapStateToProps = (state, ownProps) => {
    const postId = ownProps.match.params.id;
    const category = ownProps.match.params.category;
    return {
        category: category,
        post: state.posts[postId]
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetails));