import React, { useState } from "react";
import styled from "styled-components";
import { FaWindowClose } from "react-icons/fa";
import LoginForm from "../login/LoginForm";
import RegisterForm from "../login/RegisterForm";

const LoginBox = ({ showModal, setIsModalOpen, setIsLogin }) => {
  // 모달 닫는
  const [goRegister, setGoRegister] = useState(false);
  
  // 로그인 회원가입 toggle
  const loginToggle = () => {
    setGoRegister(!goRegister);
  };
  return (
    <StLoginPage className="blur">
    <StLoginBox>
      <div className="iconBox">
        <FaWindowClose className="icon" onClick={showModal} />
      </div>
      {goRegister === false ? (
        <LoginForm
          loginToggle={loginToggle}
          goRegister={goRegister}
          setIsModalOpen={setIsModalOpen}
          setIsLogin={setIsLogin}
        ></LoginForm>
      ) : (
        <RegisterForm
          loginToggle={loginToggle}
          goRegister={goRegister}
        ></RegisterForm>
      )}
    </StLoginBox>
  </StLoginPage>
  );
};

export default LoginBox;



const StLoginBox = styled.div`
  position: absolute;
  width: 700px;
  background-color: rgb(0, 0, 0);
  box-shadow: rgb(225 225 255 / 13%) 0px 6px 15px 7px;
  border-radius: 30px;
  z-index: 6;
  padding: 60px 100px;
  box-sizing: border-box;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  .iconBox {
    position: relative;
    width: 100%;
    height: 30px;

    .icon {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 30px;
      fill: #fff;
    }
  }
`;

const StLoginPage = styled.div`
  cursor: pointer;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
  background-color: #45454599;
  backdrop-filter: blur(5px);
`;