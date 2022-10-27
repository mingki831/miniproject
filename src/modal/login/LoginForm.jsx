import styled from "styled-components";
//import { useForm } from "react-hook-form";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import useInput from "../../hook/useInput"
import axios from "axios";
import { useCookies } from 'react-cookie';
import instance from '../../shared/request';
import { Cookies } from "react-cookie";

function LoginPage({ loginToggle, goRegister, showModal, setIsModalOpen, setIsLogin }) {

  // console.log(showModal);
  // console.log(setIsModalOpen);

  //const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const token = new Cookies().get("refreshToken");

  // redirect authenticated user to profile screen
  // useEffect(() => {
  //   if (token !== undefined && token !== null) {
  //     window.location.reload()
  //   }
  // }, [token]);


const dispatch = useDispatch();
  const [emailId, onChangeIdHandler] = useInput('');
  const [password, onChangePasswordHandler] = useInput('');

  const loginInit = {
    id: 0,
    nickname: "",
    password: "",
  }

  const [login, setLogin] = useState(loginInit)
  const [cookies, setCookie, removeCookie] = useCookies(["cook"]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const temp = {
      "nickname": emailId,
      "password": password
    }
    const data = instance.post('api/member/login', temp)
    .then(res => {
      console.log(res)
      console.log(res.data)
      console.log(res.data.error)
      console.log(res.data.success)
      // const { accessToken } = res.data;
      // accessToken을 Authorization으로 저장
      // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
      // refreshToken을 setCookie로 쿠키에 저장
      setCookie('refreshToken', res.request.getResponseHeader('refresh-token'))
      setCookie('token', res.request.getResponseHeader('authorization'))
      //console.log(res)
      //console.log(res.data.data.name)
      //로그인 실패시
      if (res.data.success === false) alert(res.data.error.message);

      //닉네임 로컬에 저장
      localStorage.setItem('name', res.data.data.name)
      
      //로그인 후 메인페이지로
      if (res.data.success) navigate("/");
      } 
    ).catch(error => {
      //alert("로그인 정보를 받아올 수 없습니다!");
    })
      setLogin({emailId: "", password: ""});
      setIsLogin("IsLogin");

      //로그인 후 모달창 닫기
      setIsModalOpen(false);
    }

  return (

    <StLoginFormBox className="login" onSubmit={onSubmitHandler}>

      <div className="signBox">

        {goRegister === false ? (
          <span
            className="login"
            style={{ borderBottom: "2px solid rgba(225, 225, 225, 0.8)" }}
          >
            로그인
          </span>
        ) : (
          <span className="login">로그인</span>
        )}
        <span className="register" onClick={loginToggle}>
          회원가입
        </span>
      </div>

      <div className="inputbox">
        <p>이메일</p>
         <input
            type='text'
            name='emailId'
            value={emailId}
            placeholder='E-mail'
            onChange={onChangeIdHandler}
          />
      </div>
      <div className="inputbox">
        <p>비밀번호</p>
         <input
            type='password'
            name='password'
            value={password}
            placeholder='PW'
            onChange={onChangePasswordHandler}
          />
      </div>
      <button type="submit">
        로그인
      </button>
    </StLoginFormBox>
  );
}

export default LoginPage;

const StLoginFormBox = styled.form`
  .signBox {
    width: 100%;
    margin-bottom: 100px;
    position: relative;
    span {
      color: #fff;
      padding: 5px 10px;
      margin-right: 30px;
      transition: all 0.4s;
      :hover {
        border-bottom: 2px solid rgba(225, 225, 225, 0.8);
      }
    }
  }
  .inputbox {
    margin-bottom: 38px;
  }
  p {
    color: #aeabab;
    margin-bottom: 0;
  }
  input {
    color: #fff;
    width: 100%;
    border: none;
    outline: none;
    height: 40px;
    font-size: 20px;
    border-bottom: 1px solid rgba(225, 225, 225, 0.8);
    background: none;
  }
  button {
    font-size: 22px;
    color: #fff;
    width: 100%;
    height: 60px;
    background-color: #ff7520;
    border: none;
    outline: none;
    border-radius: 10px;
  }
`;