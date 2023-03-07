import React from 'react';
import './Board.scss';
import Card from './Card';

function Board({ comment, title, setComment }) {
  return (
    <div className='board-area'>
      <div className='board-title'>{title}</div>
      {comment ? <Card comment={comment} setComment={setComment} /> : ''}
    </div>
  );
}

export default Board;
