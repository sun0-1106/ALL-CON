/* Store import */
import { RootState } from '../../../index';
import { setTarget, setTargetIdx, setOrder, setAllConcerts, setIsRendering } from '../../../store/MainSlice';
import { setTargetArticle, setArticleRendered, setArticleCurPage } from '../../../store/ConChinSlice';
import { logout, getUserInfo } from '../../../store/AuthSlice';
import { setPageNum } from '../../../store/ConcertCommentSlice';
import {
  getCommentBtnType,
  getArticleInfo,
  getMyArticleTotalPage,
  getMyConcertCommentTotalPage,
  getMyConcertCommentInfo,
  getMyTotalConcertComment,
  getMyArticleCommentInfo,
  getMyArticleCommentTotalPage,
  getMyTotalArticleComment,
  getBtnSwitchState,
  getMyTotalArticle,
  getMyConcertCommentCurrentPage
} from '../../../store/MySlice';
import { setAlarm, setEmailClick, setSmsClick } from '../../../store/ConcertAlarmSlice';
import {
  showMyDropDown,
  showLoginModal,
  showConcertModal,
  showAlertModal,
  insertAlertText,
} from '../../../store/ModalSlice';
/* Library import */
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function MyDropDown() {
  /* dispatch / navigate */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  /* useSelector */
  const { scrollCount } = useSelector((state: RootState) => state.header);
  
  /* 지역상태 - useState */
  /* useEffect */
  
  /* handler 함수 (기능별 정렬) */
  // 로그아웃 후 메인페이지 리다이렉트 핸들러
  const goHomeHandler = () => {
    /* 메인페이지 상태 초기화 */
    dispatch(setTarget({}));
    dispatch(setTargetIdx(0));
    dispatch(setOrder('view')); 
    dispatch(setPageNum(1));
    dispatch(setIsRendering(false));
    dispatch(setAlarm({}));
    dispatch(setEmailClick(false));
    dispatch(setSmsClick(false));
    /* 켜져있는 모달창 모두 종료 */
    dispatch(showConcertModal(false)); // concertPage 모달창    
    dispatch(showLoginModal(false));
    /* 홈으로 이동 */
    navigate('/main');
  };

  // 로그아웃 핸들러
  const logoutHandler = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/logout`,
        {},
        { withCredentials: true },
      );
      /* 로그인 상태 변경 & main 페이지로 이동 & 로그아웃 성공 모달 생성 */
      dispatch(logout());
      dispatch(getUserInfo({}));
      dispatch(showAlertModal(true));
      dispatch(insertAlertText(`로그아웃 되었습니다!`));
      goHomeHandler();
    } catch (err) {
      // console.log(err);
      dispatch(showAlertModal(true));
      dispatch(insertAlertText(`로그아웃에 실패했습니다!`));
    }
  };

  // 이동 시 타겟 초기화 핸들러
  const resetHandler = async () => {
    /* Common */
    dispatch(setTarget({}));
    /* MainPage */
    dispatch(setTargetIdx(0));
    dispatch(setPageNum(1));
    dispatch(setOrder('view'));
    /* ConcertPage */
    dispatch(showConcertModal(false));
    /* ConchinPage */
    dispatch(setTargetArticle({}));
    dispatch(setArticleRendered(false));
    dispatch(setArticleCurPage(1));
  };

  // 마이페이지 버튼을 누르면, 다음이 실행된다
  const handleMypageBtn = async () => {

    // 프로필 수정 / 콘친인증 버튼 SWITCH OFF
    dispatch(getBtnSwitchState({
      profileEdit: false,
      conchinCertification: false,
      userResign: false
    }))

    // 내가 쓴 댓글 기본값을 '콘서트'로 설정
    dispatch(getCommentBtnType('콘서트'));
    
    /****************************************************************************************************/
    // 내가 쓴 게시물 axios 테스트
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/myarticle?pageNum=1`,
      { withCredentials: true },
    );

    dispatch(getArticleInfo(response.data.data));
    dispatch(getMyArticleTotalPage(response.data.data.totalPage));

    dispatch(getMyTotalArticle(response.data.data.totalArticle))

    /****************************************************************************************************/
    // 내가 쓴 댓글(콘서트 게시물) axios 테스트
    const responseMyConcertComment = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/mycomment?pageNum=1`,
      { withCredentials: true },
    );

    dispatch(getMyConcertCommentInfo(responseMyConcertComment.data.data));
    dispatch(
      getMyConcertCommentTotalPage(
        responseMyConcertComment.data.data.totalPage,
      ),
    );
    dispatch(
      getMyTotalConcertComment(
        responseMyConcertComment.data.data.totalConcertComment,
      ),
    );
    // 전체 페이지가 0이 아니라면, 항상 마이페이지에 진입했을 때 내가 쓴 댓글의 현재페이지는 1이다
    if(responseMyConcertComment.data.data.totalPage !== 0) dispatch(getMyConcertCommentCurrentPage(1))
    
    /****************************************************************************************************/
    // 내가 쓴 댓글(콘친 게시물) axios 테스트
    const responseMyArticleComment = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/mycomment?pageNum=1&comment_type=article`,
      { withCredentials: true },
    );

    /* 마이페이지 -> 메인페이지 이동시 가져갈 전체 콘서트 목록(조회수 고정) */
    const responseAllConcerts = await axios.get(
      `${process.env.REACT_APP_API_URL}/concert`,
      { withCredentials: true },
    );

    dispatch(getMyArticleCommentInfo(responseMyArticleComment.data.data));
    dispatch(
      getMyArticleCommentTotalPage(
        responseMyArticleComment.data.data.totalPage,
      ),
    );
    dispatch(
      getMyTotalArticleComment(
        responseMyArticleComment.data.data.totalArticleComment,
      ),
    );
    dispatch(setAllConcerts(responseAllConcerts.data.data.concertInfo));
    resetHandler();
  };

  return (
    <div id='myDropModal'>
      <div id='bg' onClick={() => dispatch(dispatch(showMyDropDown(false)))} />
      <div
        id={scrollCount < 0.5 ? 'modalBox' : 'downedModalBox'}
        onClick={() => dispatch(dispatch(showMyDropDown(false)))}
      >
        <div id={scrollCount < 0.5 ? 'modal' : 'downedModal'}>
          <div id='myMenuWrapper'>
            <Link to='/mypage' className='menus' onClick={handleMypageBtn}>
              <p>마이페이지</p>
            </Link>
            <Link to='/main' className='menus' onClick={logoutHandler}>
              <p>로그아웃</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyDropDown;
