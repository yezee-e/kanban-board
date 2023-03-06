import React from 'react';
import './Card.scss';

function Card({ comment }) {
  return (
    <div className='card-area'>
      {comment.map((todo) => (
        <div key={todo.id} className='todo'>
          {todo.content}
        </div>
      ))}
    </div>
  );
}

export default Card;
