import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMemberThunk } from '../redux/modules/LoginSlice';
import useInput from "../hooks/useInput"
// input 훅 import
import axios from "axios";
import { useCookies } from 'react-cookie';
// 쿠키에 refresh 쿠키를 저장하기 위함
import instance from '../shared/request';

const LoginPost = () => {

  const dispatch = useDispatch();
  const [emailId, onChangeIdHandler] = useInput('');
  const [password, onChangePasswordHandler] = useInput('');
  // 로그인 인풋
  const [signId, onChangeSignIdHandler] = useInput('');
  const [signNick, onChangeSignNickHandler] = useInput('');
  const [signPw, onChangeSignPasswordHandler] = useInput('');
  const [signPwOk, onChangeSignPasswordOkHandler] = useInput('');
  // 회원가입 인풋

  const loginInit = {
    id: 0,
    nickname: "",
    password: "",
  }

  const signInit = {
    id: 0,
    nickname: "",
    password: "",
  }

  const [login, setLogin] = useState(loginInit)
  const [signUp, setSignUp] = useState(signInit)
  const [cookies, setCookie, removeCookie] = useCookies(["cook"]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    //dispatch(checkMemberThunk({nickname:emailId, password:password}));
    // redux 쿠키 hook 사용불가 이슈
  const temp = {
    "nickname": emailId,
    "password": password
  }
  // 이메일 비밀번호 BE양식 : nickname:~, password: ~
  const data = instance.post('api/member/login', temp)
    .then(res => {
      //const { accessToken } = res.data;
      //axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
      console.log(res)
      // date포함 모든 정보.
      console.log(res.request.getResponseHeader('authorization'))
      // access 토큰을 받아와짐.
      //setCookie('token', res.request.getResponseHeader('authorization'))
      // access 토큰을 쿠키가 아닌 쿠키의 헤더에 담기
      setCookie('refreshToken', res.request.getResponseHeader('refresh-token'))
    }
  ).catch(error => {
    alert("로그인 정보를 받아올 수 없습니다!");
  })
    setLogin({emailId: "", password: ""});
  }

  const onSubmitSignHandler = (event) => {
    event.preventDefault();
    dispatch(addMemberThunk({
      nickname:signId,
      password:signPw, 
      passwordConfirm:signPwOk, 
      name:signNick}));
      setSignUp(signInit);
  }

  return (
    <div>
      <section>
        <form onSubmit={onSubmitHandler}>
          <h3>로그인</h3>
          <input
            type='text'
            name='emailId'
            value={emailId}
            placeholder='E-mail'
            onChange={onChangeIdHandler}
          />
          <input
            type='password'
            name='password'
            value={password}
            placeholder='PW'
            onChange={onChangePasswordHandler}
          />
          <b>계정이 없으신가요?</b> <b>회원가입</b>
          <button>로그인</button>
          <button>메인으로</button>
        </form>
        <br/>
        <hr/>
        <br/>
        <form onSubmit={onSubmitSignHandler}>
          <h3>회원가입</h3>
          <input
            type='text'
            name='signId'
            value={signId}
            placeholder="E-mail"
            onChange={onChangeSignIdHandler}
          />
          <button>중복확인</button>
          <p>이메일을 입력해주세요.</p>
          <input
            type='text'
            name='signNick'
            value={signNick}
            placeholder='ID'
            onChange={onChangeSignNickHandler}
          />
          <p>아이디를 입력해 주세요.</p>         
          <input
            type='password'
            name='signPw'
            value={signPw}
            placeholder="PW"
            onChange={onChangeSignPasswordHandler}
          />
          <p>영문/숫자//특수문자를 각각 1글자 이상 사용하여 8~20자</p>
          <input
            type='password'
            name='signId'
            value={signPwOk}
            placeholder="PW 확인"
            onChange={onChangeSignPasswordOkHandler}
          />
          <p>비밀번호 재확인</p>
          <b>이미 가입하셨나요?</b> <b>로그인</b>
          <button>회원가입</button>
        </form>
      </section>
    </div>
  );
}

export default LoginPost;