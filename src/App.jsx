// kanban board 스타일만들기 (todo, doing, Done)
// input
// 엔터,버튼 클릭 시 todo에 카드 생성
// 음성 api를 통해 todo에 카드가 생성
// 카드 삭제기능 추가
// 카드 드래그 기능 추가

import Board from './Components/Board';
import './App.scss';
import { GrUploadOption } from 'react-icons/gr';
import { BsMicFill } from 'react-icons/bs';
import { Container, Col } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function App() {
  const [comment, setComment] = useState([]);

  useEffect(() => {
    postCard();
  }, []);

  // const addCard = (e) => {
  //   if (text.current.value === '') {
  //     e.preventDefault();
  //     alert('내용을 입력하세요');
  //   } else {
  //     postCard();
  //   }
  // };

  const postCard = (e) => {
    if (text.current.value === '') {
      alert('내용을 입력하세요');
      return;
    } else {
      axios
        .post(`http://localhost:3004/comments`, {
          content: text.current.value,
          delete: false,
        })
        .then((res) => {
          getCard();
          alert('생성이 완료되었습니다');
        });
    }
  };

  const text = useRef(null);

  const getCard = () => {
    axios
      .get(`http://localhost:3004/comments`)
      .then((res) => setComment(res.data));
  };

  return (
    <Container>
      <div className='logo-area'>
        <img src='pic/logo.png' alt='logo' className='logo' />
      </div>

      <Col className='boards'>
        <Board comment={comment} title={'Todo'} />
        <Board title={'Doing'} />
        <Board title={'Done'} />
      </Col>
      <form className='input-area' action='submit'>
        <input
          type='text'
          ref={text}
          maxLength={500}
          placeholder='내용을 작성하세요'
        />
        <div className='icon'>
          <GrUploadOption className='enter-icon' onClick={() => postCard()} />
          <BsMicFill className='enter-icon' />
        </div>
      </form>
    </Container>
  );
}

export default App;
