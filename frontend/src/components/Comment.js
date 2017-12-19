import React from 'react';
import { connect } from 'react-redux';
import { 
    upvoteCommentEverywhere, 
    downvoteCommentEverywhere, 
    deleteCommentEverywhere
} from '../actions';
import { Link } from 'react-router-dom';
import { dateString } from '../utils/formatHelpers';
import PropTypes from 'prop-types';

/**
* @description Represents a comment. Each comment has a comment 
* body, author, a vote score, an upvote button, a downvote button,
* an edit button and a delete button. This is a functional stateless
* component.
*/
const Comment = props => {
    const thisComment = props.comment;
    return (
        <div>
            <div className='panel panel-default'>
                <div className='panel-heading post-header'>
                    {thisComment.body}
                </div>
                <div className='row post-banner'>
                    <div className='col-md-1 post-author'>
                        {thisComment.author}
                    </div>
                    <div className='col-md-3'>
                        {dateString(thisComment.timestamp)}
                    </div>
                    <div className='col-md-1'>
                        Vote: {thisComment.voteScore}
                    </div>
                    <div className='col-md-1'>
                        <button
                            className='btn btn-success btn-sm post-button'
                            onClick={() => props.upvoteCommentEverywhere(thisComment.id)}
                        >
                            +
                        </button>
                        <button 
                            className='btn btn-danger btn-sm post-button'
                            onClick={() => props.downvoteCommentEverywhere(thisComment.id)}
                        >
                            -
                        </button>
                    </div>
                    <div className='col-md-3'>
                        <Link
                            className='btn btn-success btn-sm post-button'
                            to={`/editcomment/${thisComment.id}`}
                        >
                            EDIT
                        </Link>
                        <button 
                            className='btn btn-danger btn-sm post-button'
                            onClick={() => props.deleteCommentEverywhere(thisComment)}
                        >
                            DELETE
                        </button>
                </div>
                </div>
            </div>
        </div>
    );
}

/**
* @description mapDispatchToProps method of App
* App component is using three redux actions:
* 1) upvoteCommentEverywhere: upvotes the comment object in the redux store and the server
* 2) downvoteCommentEverywhere: downvotes the comment object in the redux store and the server
* 3) deleteCommentEverywhere: removes the comment object from the redux store and the server
* @param {Object} dispatch - dispatch object to access actions
* @returns {Object} - an object with three functions calling the store actions
*/
function mapDispatchToProps(dispatch) {
    return {
        upvoteCommentEverywhere: (id) => dispatch(upvoteCommentEverywhere(id)),
        downvoteCommentEverywhere: (id) => dispatch(downvoteCommentEverywhere(id)),
        deleteCommentEverywhere: (comment) => dispatch(deleteCommentEverywhere(comment)),
    };
}

/**
* @description mapStateToProps method of Category component
* @param {Object} state - redux store state
* @param {Object} ownProps - properties of the component
* @returns {Object} - an object with a single field comment
* which contains a comment object that would be used by the
* component
*/
const mapStateToProps = (state, ownProps) => {
    const commentId = ownProps.id;
    return {
        comment: state.comments[commentId]
    };
};

Comment.propTypes = {
    id: PropTypes.string.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comment);