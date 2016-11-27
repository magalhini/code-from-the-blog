import React, { Component, PropTypes } from 'react';
import Comment from './Comment';

class CommentList extends Component {
  constructor(props) {
    super(props);

    this.state = { comments: [] };
    this.reverseComments = this.reverseComments.bind(this);
  }

  componentDidMount() {
    this.setState({
      comments: ['Comment number one', 'Comment number two']
    });
  }

  renderComments(comments) {
    return comments.map((comment, idx) => <Comment key={idx} comment={comment} />);
  }

  reverseComments() {
    const { comments } = this.state;
    const newComments = comments.map(comment => comment
      .split('')
      .reverse()
      .join('')
    );

    this.setState({ comments: newComments });
  }

  render() {
    const commentsNode = this.renderComments(this.state.comments);
    return (
      <div className="comments-list">
        {commentsNode}
        <button onClick={this.reverseComments}>{this.props.buttonValue}</button>
      </div>
    )
  }
}

CommentList.defaultProps = {
  buttonValue: 'Reverse text'
}

export default CommentList;
