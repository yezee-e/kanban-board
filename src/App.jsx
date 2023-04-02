// kanban board 스타일만들기 (todo, doing, Done)
// input
// 엔터,버튼 클릭 시 todo에 카드 생성
// 음성 api를 통해 todo에 카드가 생성
// 카드 삭제기능 추가
// 카드 드래그 기능 추가

import './App.scss';
import { GrUploadOption } from 'react-icons/gr';
import { BsMicFill } from 'react-icons/bs';
import { Container, Col } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TodoBoard from './Components/TodoBoard';
import DoingBoard from './Components/DoingBoard';
import DoneBoard from './Components/DoneBoard';
import { useSpeechRecognition } from 'react-speech-kit';

function App() {
  const [todos, settodos] = useState([]);
  const [inProgress, setinProgress] = useState([]);
  const [complete, setcomplete] = useState([]);
  const [comment, setcomment] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [speech, setspeech] = useState('');

  const BoardTitle = ['todo', 'In-Progress', 'Complete'];

  useEffect(() => {
    getCard();
  }, []);

  const postCard = () => {
    if (text.current.value === '') {
      alert('내용을 입력하세요');
      return;
    } else {
      axios
        .post(
          'https://my-json-server.typicode.com/yezee-e/kanban-board/todos',
          {
            content: text.current.value,
            delete: false,
          }
        )
        .then((res) => {
          alert('생성이 완료되었습니다');
          getCard();
          setcomment(res.data);
          text.current.value = '';
        });
    }
  };

  const text = useRef(null);

  const getCard = () => {
    axios
      .all([
        axios.get(
          'https://my-json-server.typicode.com/yezee-e/kanban-board/todos'
        ),
        axios.get(
          `https://my-json-server.typicode.com/yezee-e/kanban-board/inProgress`
        ),
        axios.get(
          `https://my-json-server.typicode.com/yezee-e/kanban-board/completed`
        ),
      ])
      .then(
        axios.spread((res1, res2, res3) => {
          const data1 = res1.data;
          const data2 = res2.data;
          const data3 = res3.data;
          const res = [...data1, ...data2, ...data3];

          settodos(data1);
          setinProgress(data2);
          setcomplete(data3);
          setcomment(res);
        })
      );
  };

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setspeech(result);
      console.log('들어보자', speech);
      text.current.value = speech;
    },
  });

  function handleOnDragEnd(DropResult) {
    const { destination, source } = DropResult;
    if (!destination) return; //경로를 벗어나면 오류를 일으키지 않고 원위치 시켜준다
    if (destination?.droppableId === source.droppableId) {
      const items = Array.from(eval(source.droppableId));

      //같은 보드안에서 움직임
      const [reorderDrag] = items.splice(DropResult.source.index, 1);

      items.splice(DropResult.destination.index, 0, reorderDrag);
      const setData = eval(`set${source.droppableId}`);
      setData(items);
    }
    if (destination?.droppableId !== source.droppableId) {
      const items = Array.from(eval(source.droppableId));
      const boardData = Array.from(eval(destination.droppableId));
      //다른 보드 안에서 움직임
      const [reorderDrag] = items.splice(DropResult.source.index, 1);
      boardData.splice(DropResult.destination.index, 0, reorderDrag);
      const setDData = eval(`set${source.droppableId}`);
      setDData(items);
      const setData = eval(`set${destination.droppableId}`);
      setData(boardData);
    }
  }

  return (
    <Container>
      <div className='logo-area'>
        <img src='pic/logo.png' alt='logo' className='logo' />
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Col className='boards'>
          <Droppable droppableId='todos'>
            {(provided) => (
              <div
                className='board-area'
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <div className='board-title'>todo</div>
                <TodoBoard content={todos} get={getCard} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId='inProgress'>
            {(provided) => (
              <div
                className='board-area'
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <div className='board-title'>In-Progress</div>
                <DoingBoard content={inProgress} get={getCard} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId='complete'>
            {(provided) => (
              <div
                className='board-area'
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <div className='board-title'>Complete</div>
                <DoneBoard content={complete} get={getCard} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Col>
      </DragDropContext>
      <div className='input-area'>
        <input
          type='text'
          ref={text}
          maxLength={500}
          placeholder='할일을 말하거나 적어보세요~~!!'
          autoComplete='off'
        />
        <div className='icon'>
          <GrUploadOption className='enter-icon' onClick={postCard} />
          <BsMicFill
            className='enter-icon'
            onMouseDown={listen}
            onMouseUp={stop}
          />
        </div>
      </div>
    </Container>
  );
}

export default App;
