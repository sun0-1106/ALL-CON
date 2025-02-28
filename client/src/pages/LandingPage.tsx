/* CSS import */
import img1 from '../images/landingImage1.png';
import img2 from '../images/landingImage2.png';
import img3 from '../images/landingImage3.png';
import findConchin from '../images/findConchin.png';
import chanwon from '../images/chanwon.png';
import concert from '../images/concertss.png';
import Footer from '../components/Footer';
import LandingPosterSlide from '../components/LandingPosterSlide';
/* Store import */
import { RootState } from '../index';
import { setAllConcerts, setTargetIdx, setTarget } from '../store/MainSlice';
/* Library import */
import axios, { AxiosError } from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /* 반응형 화면 크기 */
  let mobileSize = window.matchMedia('screen and (max-width: 768px)');
  let tabSize = window.matchMedia('screen and (max-width: 1200px)');

  const { targetIdx, allConcerts } = useSelector(
    (state: RootState) => state.main,
  );
  /*현재 스크린 크기 */
  // const [windowSize, setWindowSize] = useState(window.innerWidth);
  /* 스크롤 바 위치 */
  const [scrollPosition, setScrollPosition] = useState(0);
  /* 애니메이션 상태 여부 */
  const [animation, setAnimation] = useState(false);
  const [animation2, setAnimation2] = useState(false);
  const [animation3, setAnimation3] = useState(false);
  const [animation4, setAnimation4] = useState(false);
  const [animation5, setAnimation5] = useState(false);

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
  });

  /* 1회만 렌더링 */
  useEffect(() => {
    getAllConcerts();
  }, []);

  useEffect(() => {
    if (mobileSize.matches) {
      check2();
    } else if (tabSize.matches) {
      check3();
    } else {
      check();
    }
  }, [scrollPosition]);

  /*현재 스크린 크기 감지*/
  // -> 여기 현재 스크린이 막 변할때 감지하는게 없음.
  // 모바일, 탭 왔다갔다할때 scrollPosition이 유동적으로 변하지x
  // useEffect(() => {
  //   console.log(windowSize);
  //   if (windowSize < 1200) {
  //     check3();
  //     if (windowSize < 767) {
  //       check2();
  //     }
  //   }
  // }, [windowSize]);

  /*전체 콘서트 받아오기(1회) */
  const getAllConcerts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert?order=view`,
        { withCredentials: true },
      );
      if (response.data) {
        /* 서버 응답값이 있다면 & target 상태 변경 */
        dispatch(setAllConcerts(response.data.data.concertInfo));
        dispatch(setTargetIdx(0));
        dispatch(setTarget(allConcerts[targetIdx]));
      }
    } catch (err) {
      console.log(err);
    }
  };

  /*데스크탑 사이즈 스크롤 확인 함수 */
  const check = () => {
    if (scrollPosition > 4300) {
      setAnimation5(true);
      if (scrollPosition > 3300) {
        setAnimation4(true);
        if (scrollPosition > 2700) {
          setAnimation3(true);
          if (scrollPosition > 1300) {
            setAnimation2(true);
            if (scrollPosition > 340) {
              setAnimation(true);
              // console.log(animation);
            }
          }
        }
      }
    }
  };
  /*모바일 사이즈 스크롤 확인 함수 */
  const check2 = () => {
    if (scrollPosition > 1590) {
      setAnimation5(true);
      if (scrollPosition > 1100) {
        setAnimation4(true);
        if (scrollPosition > 700) {
          setAnimation3(true);
          if (scrollPosition > 200) {
            // console.log('animation2', animation2);
            setAnimation2(true);
            if (scrollPosition > 200) {
              // console.log(scrollPosition);
              // console.log('animation', animation);
              setAnimation(true);
            }
          }
        }
      }
    }
  };
  /*탭 사이즈 스크롤 확인 함수 */
  const check3 = () => {
    if (scrollPosition > 2800) {
      setAnimation5(true);
      // console.log(animation5);
      // console.log(scrollPosition);
      if (scrollPosition > 2010) {
        setAnimation4(true);
        if (scrollPosition > 1580) {
          setAnimation3(true);
          if (scrollPosition > 790) {
            setAnimation2(true);
            if (scrollPosition > 300) {
              setAnimation(true);
            }
          }
        }
      }
    }
  };

  /*---모바일----*/
  if (mobileSize.matches) {
    return (
      <div id='landingContainer'>
        {/*점보트론 */}
        <div id='landingJumboWrapper'>
          {/*jumbotronBackground */}
          <div id='jumboContainer'>
            <div className='jumboTopBox'>
              <div className='jumboTextBox'>
                <h1 id='jumboWhat'>국내 모든 콘서트 정보를 한눈에!</h1>
                <h1 id='jumboClassify'>ALL-CON</h1>
              </div>
              <div id='jumboPosterSlideWrapper'>
                <LandingPosterSlide />
              </div>
            </div>
          </div>
        </div>

        {/*중간 박스 */}
        <div id='middleWrapper'>
          <img id='firstImgAnimated' src={img1} alt='밴드 일러스트'></img>
          <div
            className={
              scrollPosition > 200 || animation
                ? 'alignBoxAnimated'
                : 'alignBox'
            }
          >
            <div id='paddingBox'>
              <div className='grayGif'>
                <img src={concert}></img>
              </div>
            </div>
            <div id='textBox'>
              <div id='texts'>
                <p>ALL-CON은 각 사이트들의 </p>
                <p>콘서트 정보를 한 눈에 볼 수 있는</p>
                <p>콘서트 통합 정보 플랫폼이에요.</p>
                <p>각 사이트들의 단독 기획 콘서트도</p>
                <p>한 눈에 비교해 보세요!</p>
              </div>
            </div>
          </div>

          <img
            id={
              scrollPosition > 200 || animation2
                ? 'secondImgAnimated'
                : 'secondImg'
            }
            src={img2}
            alt='콘친찾기 일러스트'
          ></img>

          <div
            className={
              scrollPosition > 700 || animation3
                ? 'alignBox2Animated'
                : 'alignBox2'
            }
          >
            <div id='paddingBox'>
              <div className='grayGif'>
                <img src={findConchin}></img>
              </div>
            </div>
            <div id='textBox'>
              <div id='texts'>
                <p>콘서트에 가고 싶은데 </p>
                <p>같이 갈 친구가 없어 외로우셨나요?</p>
                <p>함께 즐길 '콘친'을 찾아 보세요!</p>
              </div>
            </div>
          </div>

          <img
            id={
              scrollPosition > 1100 || animation4
                ? 'thirdImgAnimated'
                : 'thirdImg'
            }
            src={img3}
            alt='알림 일러스트'
          ></img>

          <div
            className={
              scrollPosition > 1590 || animation5
                ? 'alignBox3Animated'
                : 'alignBox3'
            }
          >
            <div id='paddingBox'>
              <div className='grayGif'>
                <img src={chanwon}></img>
              </div>
            </div>
            <div id='textBox'>
              <div id='texts'>
                <p>알림 기능으로 내가 원하는 </p>
                <p>콘서트 예매시간을 놓치지</p>
                <p>않을 수 있어요!</p>
              </div>
            </div>
          </div>
        </div>

        {/*하단 박스 */}
        <div id='bottomBox'>
          <div id='bottomAlignBox'>
            <div id='bottomTextBox'>
              <p>ALL-CON에서</p>
              <p>예매부터 동료찾기까지</p>
              <p>한번에 해결해요!</p>
            </div>
            <button id='goBtn' onClick={() => navigate('/main')}>
              시작하기
            </button>
          </div>
        </div>
        {/*바닥글*/}
        <div id='fullFooter'>
          <div id='landingFooterWrapper'>
            <Footer />
          </div>
        </div>

        {/*하단 박스 */}
        <div id='bottomBox'>
          <div id='bottomAlignBox'>
            <div id='bottomTextBox'>
              <p>ALL-CON에서</p>
              <p>예매부터 동료찾기까지</p>
              <p>한번에 해결해요!</p>
            </div>
            <button id='goBtn' onClick={() => navigate('/main')}>
              시작하기
            </button>
          </div>
        </div>
        {/*바닥글*/}
        <div id='fullFooter'>
          <div id='landingFooterWrapper'>
            <Footer />
          </div>
        </div>
      </div>
    );
  } /*---------------------------------탭사이즈-----------------------*/ else if (
    tabSize.matches
  ) {
    return (
      <div id='landingContainer'>
        {/*점보트론 */}
        <div id='landingJumboWrapper'>
          {/*jumbotronBackground */}
          <div id='jumboContainer'>
            <div className='jumboTopBox'>
              <div className='jumboTextBox'>
                <h1 id='jumboWhat'>국내 모든 콘서트 정보를 한눈에!</h1>
                <h1 id='jumboClassify'>ALL-CON</h1>
              </div>
              <div id='jumboPosterSlideWrapper'>
                <LandingPosterSlide />
              </div>
            </div>
          </div>
        </div>

        {/*중간 박스 */}
        <div id='middleWrapper'>
          <img id='firstImgAnimated' src={img1} alt='밴드 일러스트'></img>
          <div
            className={
              scrollPosition > 300 || animation
                ? 'alignBoxAnimated'
                : 'alignBox'
            }
          >
            <div id='paddingBox'>
              <div className='grayGif'>
                <img src={concert}></img>
              </div>
            </div>
            <div id='textBox'>
              <div id='texts'>
                <p>ALL-CON은 각 사이트들의 </p>
                <p>콘서트 정보를 한 눈에 볼 수 있는</p>
                <p>콘서트 통합 정보 플랫폼이에요.</p>
                <p>각 사이트들의 단독 기획 콘서트도</p>
                <p>한 눈에 비교해 보세요!</p>
              </div>
            </div>
          </div>

          <img
            id={
              scrollPosition > 790 || animation2
                ? 'secondImgAnimated'
                : 'secondImg'
            }
            src={img2}
            alt='콘친찾기 일러스트'
          ></img>

          <div
            className={
              scrollPosition > 1580 || animation3
                ? 'alignBox2Animated'
                : 'alignBox2'
            }
          >
            <div id='paddingBox'>
              <div className='grayGif'>
                <img src={findConchin}></img>
              </div>
            </div>
            <div id='textBox'>
              <div id='texts'>
                <p>콘서트에 가고 싶은데 </p>
                <p>같이 갈 친구가 없어 외로우셨나요?</p>
                <p>함께 즐길 '콘친'을 찾아 보세요!</p>
              </div>
            </div>
          </div>

          <img
            id={
              scrollPosition > 2010 || animation4
                ? 'thirdImgAnimated'
                : 'thirdImg'
            }
            src={img3}
            alt='알림 일러스트'
          ></img>

          <div
            className={
              scrollPosition > 2800 || animation5
                ? 'alignBox3Animated'
                : 'alignBox3'
            }
          >
            <div id='paddingBox'>
              <div className='grayGif'>
                <img src={chanwon}></img>
              </div>
            </div>
            <div id='textBox'>
              <div id='texts'>
                <p>알림 기능으로 내가 원하는 </p>
                <p>콘서트 예매시간을 놓치지</p>
                <p>않을 수 있어요!</p>
              </div>
            </div>
          </div>
        </div>

        {/*하단 박스 */}
        <div id='bottomBox'>
          <div id='bottomAlignBox'>
            <div id='bottomTextBox'>
              <p>ALL-CON에서</p>
              <p>예매부터 동료찾기까지</p>
              <p>한번에 해결해요!</p>
            </div>
            <button id='goBtn' onClick={() => navigate('/main')}>
              시작하기
            </button>
          </div>
        </div>
        {/*바닥글*/}
        <div id='fullFooter'>
          <div id='landingFooterWrapper'>
            <Footer />
          </div>
        </div>
      </div>
    );
  } else {
    /*-----------데스크탑-------------*/
    return (
      <div id='landingContainer'>
        {/*점보트론 */}
        <div id='landingJumboWrapper'>
          {/*jumbotronBackground */}
          <div id='jumboContainer'>
            <div className='jumboTopBox'>
              {/*여기 부분 landingpage.scss에 있음(jumbotronBackground 아님) */}
              <div className='jumboTextBox'>
                <h1 id='jumboWhat'>국내 모든 콘서트 정보를 한눈에!</h1>
                <h1 id='jumboClassify'>ALL-CON</h1>
              </div>
              <div id='jumboPosterSlideWrapper'>
                <LandingPosterSlide />
              </div>
            </div>
          </div>
        </div>

        {/*중간 박스 */}
        <div id='middleWrapper'>
          <img id='firstImgAnimated' src={img1} alt='밴드 일러스트'></img>
          {/*만약 className alignBoxAnimated이 존재한다면 animation상태가 true로 바뀐다 
animation이 true라면 className은 alignBox로 고정된다 */}
          <div
            className={
              scrollPosition > 340 || animation
                ? 'alignBoxAnimated'
                : 'alignBox'
            }
          >
            <div id='paddingBox'>
              <div className='grayGif'>
                <img src={concert}></img>
              </div>
            </div>
            <div id='textBox'>
              <div id='texts'>
                <p>ALL-CON은 각 사이트들의 </p>
                <p>콘서트 정보를 한 눈에 볼 수 있는</p>
                <p>콘서트 통합 정보 플랫폼이에요.</p>
                <p>각 사이트들의 단독 기획 콘서트도</p>
                <p>한 눈에 비교해 보세요!</p>
              </div>
            </div>
          </div>

          <img
            id={
              scrollPosition > 1300 || animation2
                ? 'secondImgAnimated'
                : 'secondImg'
            }
            src={img2}
            alt='콘친찾기 일러스트'
          ></img>

          <div
            className={
              scrollPosition > 2700 || animation3
                ? 'alignBox2Animated'
                : 'alignBox2'
            }
          >
            <div id='paddingBox'>
              <div className='grayGif'>
                <img src={findConchin}></img>
              </div>
            </div>
            <div id='textBox'>
              <div id='texts'>
                <p>콘서트에 가고 싶은데 </p>
                <p>같이 갈 친구가 없어 외로우셨나요?</p>
                <p>함께 즐길 '콘친'을 찾아 보세요!</p>
              </div>
            </div>
          </div>

          <img
            id={
              scrollPosition > 3300 || animation4
                ? 'thirdImgAnimated'
                : 'thirdImg'
            }
            src={img3}
            alt='알림 일러스트'
          ></img>

          <div
            className={
              scrollPosition > 4300 || animation5
                ? 'alignBox3Animated'
                : 'alignBox3'
            }
          >
            <div id='paddingBox'>
              <div className='grayGif'>
                <img src={chanwon}></img>
              </div>
            </div>
            <div id='textBox'>
              <div id='texts'>
                <p>알림 기능으로 내가 원하는 </p>
                <p>콘서트 예매시간을 놓치지</p>
                <p>않을 수 있어요!</p>
              </div>
            </div>
          </div>
        </div>

        {/*하단 박스 */}
        <div id='bottomBox'>
          <div id='bottomAlignBox'>
            <div id='bottomTextBox'>
              <p>ALL-CON에서</p>
              <p>예매부터 동료찾기까지</p>
              <p>한번에 해결해요!</p>
            </div>
            <button id='goBtn' onClick={() => navigate('/main')}>
              시작하기
            </button>
          </div>
        </div>
        {/*바닥글*/}
        <div id='fullFooter'>
          <div id='landingFooterWrapper'>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}
export default LandingPage;
