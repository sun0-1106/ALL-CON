/* CSS import */
import shield from '../../images/shield.png';
/* Component import */
import ConChinWritingModal from '../Modals/ConChinPage/ConChinWritingModal';
/* Store import */
import { RootState } from '../../index';
import { logout, getUserInfo } from '../../store/AuthSlice';
import {
  showConChinWritingModal,
  showLoginModal,
  showAlertModal,
  insertAlertText,
} from '../../store/ModalSlice';

/* Library import */
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';

function ConChinFindBox() {
  /* dispatch / navigate */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* useSelector */
  const { isLogin, userInfo } = useSelector((state: RootState) => state.auth);
  const { target } = useSelector((state: RootState) => state.main);
  const { targetArticle } = useSelector((state: RootState) => state.conChin);
  /* 지역상태 - useState */
  const [writeModal, setWriteModal] = useState<boolean>(false);

  /* useEffect */

  /* handler 함수 (기능별 정렬) */
  // 글쓰기 버튼 클릭시
  const handleWriteModal = async () => {
    // 만약 유저가 일반회원(role=2)이라면, (가칭) 인증하러가기 모달을 띄어준다
    if (userInfo.role === 3) {
      dispatch(
        insertAlertText('마이페이지에서 콘친 인증을 해야 작성할 수 있어요! 😖'),
      );
      dispatch(showAlertModal(true));
      // 이외의 경우, 글작성 모달을 띄어준다
    } else if (isLogin === false) {
      dispatch(
        insertAlertText('게시글을 작성하기 위해선 로그인을 해야해요! 😖'),
      );
      dispatch(showAlertModal(true));
    } else {
      if (Object.keys(target).length === 0) {
        dispatch(insertAlertText('콘서트를 먼저 선택해주세요! 😖'));
        dispatch(showAlertModal(true));
      } else {
        dispatch(showConChinWritingModal(true));
      }
    }
  };

  return (
    <div id='conChinFindBox'>
      <div className='title'>
        <div className='textWrapper'>
          <span className='text'>콘친 찾기</span>
        </div>
      </div>
      <div
        className={
          Object.keys(targetArticle).length !== 0 &&
          Object.keys(target).length !== 0
            ? 'btnWrapperAllChosen'
            : 'btnWrapper'
        }
      >
        <button
          className='btn'
          onClick={() => {
            handleWriteModal();
          }}
        >
          <img className='img' src={shield} />글 쓰기
        </button>
      </div>
    </div>
  );
}
export default ConChinFindBox;
