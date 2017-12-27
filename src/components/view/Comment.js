import React, { Component } from 'react';

class Comment extends Component {
    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <strong>{this.props.comment.username}</strong><span> | </span><span className="text-muted">Commented: {this.props.comment.timestamp}</span>
                    </div>
                    <div className="panel-body">
                        {this.props.comment.body}
                    </div>
                </div>
            </div>
        )
    }
}

export default Comment;