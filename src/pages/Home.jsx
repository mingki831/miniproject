import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Home = () => {
  const nagivate = useNavigate();
  return (
    <Layout>
      <StContainer>
        <StMain>
          <StBoxContainer>
          <StBox1 onClick={() => {nagivate("/work/add");}}>
            Game Upload<br/>
          </StBox1>
          <StBox2 onClick={() => {nagivate("/works");}}>
            Game List
          </StBox2>
          </StBoxContainer>
        </StMain>
      </StContainer>
    </Layout>
  );
};

export default Home;

const StContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const StMain = styled.div`
  margin-top: 100px;
`;

const StBox1 = styled.div`
//padding: 0 50px;
display: flex;
align-items: center;
justify-content: center;
width: 600px;
height: 400px;
background-color: #ff7b00;
color: #000000;
border-radius: 30px;
font-size: 50px;
cursor: pointer;
:hover {
  box-shadow: rgb(255, 255, 255) 3px 3px 3px;
}
`;

const StBox2 = styled.div`
//padding: 0 50px;
display: flex;
align-items: center;
justify-content: center;
width: 600px;
height: 400px;
background-color: #8400ff;
color: #000000;
border-radius: 30px;
font-size: 50px;
cursor: pointer;
:hover {
  box-shadow: rgb(255, 255, 255) 3px 3px 3px;
}
`;

const StBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
`