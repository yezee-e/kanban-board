import React, { useEffect, useState } from 'react';
import './AllBoard.scss';

import { RiDeleteBinLine } from 'react-icons/ri';
import moment from 'moment';
import axios from 'axios';
import { Draggable } from 'react-beautiful-dnd';

function TodoBoard({ content, get }) {
  const nowTime = moment().format('YYYY-MM-DD');

  const onDelete = (task) => {
    if (window.confirm('삭제하시겠습니까?')) {
      axios
        .delete(
          `https://my-json-server.typicode.com/yezee-e/kanban-board/todos/${task.id}`
        )
        .then((res) => {
          alert('삭제완료');
          get();
        });
    }
  };

  return (
    <div>
      {content.map((task, index) => (
        <Draggable draggableId={task.content} key={task.content} index={index}>
          {(provided, snapshot) => (
            <div
              className='todo'
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                ...provided.draggableProps.style,
                opacity: snapshot.isDragging ? '0.5' : '1',
              }}
              ref={provided.innerRef}
            >
              <div className='card-area'>
                <div className='todo-data'>
                  <div>{nowTime}</div>
                  <div>
                    <RiDeleteBinLine
                      className='delete'
                      onClick={() => onDelete(task)}
                    />
                  </div>
                </div>
                <div>{task.content}</div>
              </div>
              {provided.placeholder}
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
}

export default React.memo(TodoBoard);
