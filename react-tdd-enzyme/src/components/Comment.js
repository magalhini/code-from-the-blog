import React, { Component } from 'react';

class Comment extends Component {
  render() {
    return (
      <li className='comment-item'>
        <span>{this.props.comment}</span>
      </li>
    )
  }
}

export default Comment;
