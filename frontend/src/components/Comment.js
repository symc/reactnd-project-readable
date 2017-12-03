import React, { Component } from 'react';
import { connect } from 'react-redux';

class Comment extends Component {
    render() {
        const thisComment = this.props.comment;
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading postHeader">
                        {thisComment.body}
                    </div>
                    <div className="row postBanner">
                        <div className="col-md-4 postAuthor">
                            {thisComment.author}
                        </div>
                        <div className="col-md-1">
                            Vote: {thisComment.voteScore}
                        </div>
                        <div className="col-md-1">
                            <button 
                                className="btn btn-success btn-sm postButton"
                            >
                                +
                            </button>
                            <button 
                                className="btn btn-danger btn-sm postButton"
                            >
                                -
                            </button>
                        </div>
                        <div className="col-md-3">
                            <button
                                className="btn btn-success btn-sm postButton" 
                            >
                                EDIT
                            </button>
                            <button 
                                className="btn btn-danger btn-sm postButton"
                            >
                                DELETE
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

const mapStateToProps = (state, ownProps) => {
    const commentId = ownProps.id;
    return {
        comment: state.comments[commentId]
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comment);