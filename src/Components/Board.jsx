import React from 'react';
import './Board.scss';
import Card from './Card';

function Board({ comment, title }) {
  return (
    <div className='board-area'>
      <div>{title}</div>
      {comment ? <Card comment={comment} /> : ''}
    </div>
  );
}

export default Board;
