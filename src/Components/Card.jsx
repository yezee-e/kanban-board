import React, { useEffect, useState } from 'react';
import './Card.scss';
import { RiDeleteBinLine } from 'react-icons/ri';
import moment from 'moment';
import axios from 'axios';

function Card({ comment, setComment }) {
  const nowTime = moment().format('YYYY-MM-DD');

  //   useEffect(() => {
  //     onDelete();
  //   }, [trash]);
  const onDelete = (todo) => {
    if (window.confirm('삭제하시겠습니까?')) {
      axios.delete(`http://localhost:3004/comments/${todo.id}`).then((res) => {
        alert('삭제완료');
        setComment(comment);
      });
    }
  };

  return (
    <div className='card-area'>
      {comment.map((todo, index) => (
        <div key={todo.id} className='todo'>
          <div className='todo-data'>
            <div>{nowTime}</div>
            <div>
              <RiDeleteBinLine
                className='delete'
                onClick={() => onDelete(todo)}
              />
            </div>
          </div>
          {todo.content}
        </div>
      ))}
    </div>
  );
}

export default Card;
