import React, { Component } from 'react';
import { render } from 'react-dom';
import CommentList from './components/CommentList';

class Root extends Component {
  render() {
    return (
      <div>
        <h1>React TDD</h1>
        <CommentList/>
      </div>
    );
  }
}

render(<Root />, document.getElementById('root'));
