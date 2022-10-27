import styled from "styled-components";
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useInput from '../../hook/useInput'
import { addMemberThunk } from "../../redux/modules/LoginSlice";

import React from "react";

function RegisterForm({ loginToggle, goRegister }) {

  const dispatch = useDispatch()
  const [signId, onChangeSignIdHandler] = useInput('');
  const [signNick, onChangeSignNickHandler] = useInput('');
  const [signPw, onChangeSignPasswordHandler] = useInput('');
  const [signPwOk, onChangeSignPasswordOkHandler] = useInput('');
  //const { register, handleSubmit } = useForm();
  //const navigate = useNavigate();

  const signInit = {
    id: 0,
    nickname: "",
    password: "",
    passwordConfirm: "",
    name: "",
  }

  const [signUp, setSignUp] = useState(signInit)

  const onSubmitSignHandler = (event) => {
    event.preventDefault();
    if(signPw != signPwOk) alert("비밀번호와 확인란의 입력 값이 동일한지 확인해주세요!")
    dispatch(addMemberThunk({
      nickname:signId,
      password:signPw, 
      passwordConfirm:signPwOk, 
      name:signNick}));
    setSignUp(signInit);
    loginToggle(); //가입 후 로그인토글로 이동
  }

  return (
    <StRegisterBox className="Register"  onSubmit={onSubmitSignHandler}>

      <div className="registerBox">

        <span className="login" onClick={loginToggle}>
          로그인
        </span>

        {goRegister === true ? (
          <span
            className="register"
            style={{ borderBottom: "2px solid rgba(225, 225, 225, 0.8)" }}
          >
            회원가입
          </span>
        ) : (
          <span className="register">회원가입</span>
        )}
        
      </div>
      
      <div className="inputbox">
        <p>이메일</p>
        <input  
          type='text'
          name='signId'
          value={signId}
          placeholder="E-mail"
          onChange={onChangeSignIdHandler}
          required
         />
      </div>
      <div className="inputbox">
        <p>아이디</p>
        <input  
          type='text'
          name='signNick'
          value={signNick}
          placeholder='ID는 8글자 이하'
          onChange={onChangeSignNickHandler}
          maxLength={8}
         />
      </div>
      <div className="inputbox">
        <p>비밀번호</p>
        <input 
          type='password'
          name='signPw'
          value={signPw}
          placeholder="PW"
          onChange={onChangeSignPasswordHandler}
          required
        /> 
      </div>
      <div className="inputbox">
        <p>비밀번호재확인</p>
        <input 
          type='password'
          name='signId'
          value={signPwOk}
          placeholder="PW 확인"
          onChange={onChangeSignPasswordOkHandler}
          required
         />
      </div>
      <button type='submit'>가입하기</button>
      {/* onClick={loginToggle} */}
    </StRegisterBox>
  );
}

export default RegisterForm;

const StRegisterBox = styled.form`
  .registerBox {
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
    margin-top: 50px;
    width: 100%;
    height: 60px;
    background-color: #ff7520;
    border: none;
    outline: none;
    border-radius: 10px;
  }
`;