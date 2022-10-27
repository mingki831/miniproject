import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import LoginBox from "../modal/login/LoginBox";
import { useNavigate } from "react-router-dom";
import instance from "../shared/request";


const Header = (props) => {

  // const { userToken } = useSelector((state) => state.user);
  // 쿠키의 토큰 불러오기
  //const token = new Cookies().get("refreshToken");
  // 로컬에 저장된 name 가져오기
  const name = localStorage.getItem("name");

  //모달창
  const [IsModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(!IsModalOpen);
  };


  const [IsLogin, setIsLogin] = useState();
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   setIsLogin(token !== undefined && token !== null)
  // }, [IsLogin]);

  useEffect(() => {
    //window.location.reload()
  }, [IsLogin])
  //alert으로 처리해보기

  //1. 로그인시도 확인여부 변수 관리 useState로
  //2. 로그인 후 로그인 함수 호출 후, useState에서 나온 setter를 호출해서 state값을 변경

  //const [, , removeCookie] = useCookies("refreshToken");
  //const [, , removeCookie] = useCookies("refreshToken");

  // const COOKIE_KEY = "Bearer%20eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtaW5na2k4MzFAbmF2ZXIuY29tIiwiYXV0aCI6IlJPTEVfTUVNQkVSIiwiZXhwIjoxNjY2ODA1MzQ1fQ.YadLwNGBjwnGx9AXs7r8L08EHx5tT187jp3mM8boZk4";

  // //const logoutURL = window.LOGIN_SESSION_KEY_URL + `/=${window.location.href}`;

  // const [, , removeCookie] = useCookies([COOKIE_KEY]);

  // const onClickLogoutHandler = () => {
  //   removeCookie(COOKIE_KEY, { path: '/' });    // 쿠키삭제후
  //   window.location.href = '/';
  // }


  const onClickLogoutHandler = (event) => {
    event.preventDefault();
 
    // useCookies.removeCookie("token");
    // useCookies.removeCookie("refreshToken");
    // localStorage.removeItem("name");

    const data = instance.post(`api/auth/member/logout`,
    { withCredentials: true, })

    .then((response) => {

      console.log(response)
      var deleteCookie = function(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
      }

      deleteCookie('token');
      deleteCookie('refreshToken');
      localStorage.removeItem("name");

      if (response.data.success) {
        navigate("/"); // refresh 구현 어떻게???
      } else {
        alert("로그아웃에 실패했습니다");
      }
    });
  };

  // const onClickLogoutHandler = async() => {
  //   const contest = window.confirm("정말 로그아웃 하실건가요?");
  //   if(contest === true){
  //       const Refreshtoken = Cookies().get("refreshToken");
  //       const Authorization = Cookies().get("token");
  //       const headers = {
  //           'Content-Type': 'application/json',
  //           Authorization: `${Authorization}`,
  //           Refreshtoken: `${Refreshtoken}`
  //       }
  //       const url = 'api/auth/member/logout'
  //       axios.post(url, {}, {
  //           headers : headers
  //           })
  //       window.localStorage.clear();
  //       navigate("/")
  //       //setModalOpen(false)
  //       }
  //       else if(contest === false){
  //           return
  //       }
  //   }
  

  return (
    <StContainer>

      {/* 홈 이동 로고 버튼 */}
        <StImg src="https://velog.velcdn.com/images/mingki831/post/0137c928-a147-4ff0-a0b0-58620a1cfda4/image.png" alt="cat"
             onClick={() => window.location.replace("/")}/>
      
      <div className="loginFlexBox">
        { name ?
        (
          <>
            <p>{name}님 안녕하세요!&nbsp;&nbsp;&nbsp;</p>
            <p className="sign" onClick={onClickLogoutHandler}> 
            {/* <p className="sign" onClick={onClickLogoutHandler}> */}
              로그아웃
            </p>
          </>
        ) :
        (
          <p className="sign" onClick={showModal}>
            로그인 / 회원가입
          </p>
        )}
        
        {/* props로 보내기 */}
        {IsModalOpen && <LoginBox showModal={showModal} setIsModalOpen={setIsModalOpen} setIsLogin={setIsLogin}/>}
      </div>
      
    </StContainer>
  );
};

export default Header;

const StContainer = styled.header`
  justify-content: space-between;
  height: 150px;
  background-color: #000000;
  padding: 0 30px;
  display: flex;
  position: relative;
  align-items: center;
  margin: 0 auto;
  color: #ffffff;
  
  
  .loginFlexBox {
    border-radius: 10px;
    display: flex;
    gap: 7px;
    font-size: 18px;
    font-weight: 700;
    display: flex;
    position: relative;
    align-items: center;
    .sign {
      padding: 15px 25px;
      border-radius: 10px;
      transition: all 0.4s;
      background-color: #ff7b00;
      :hover {
        cursor: pointer;
        background-color: #7700ff;
      }
    }
  }
`;

const StImg = styled.img`
  width: 200px;
  height: 130px;
  background-color: #000000;
  cursor: pointer;
`;