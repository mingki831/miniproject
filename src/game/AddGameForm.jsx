import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Text, Wrapper, Input } from "../elem";
import { __addGameThunk } from "../redux/modules/gamesSlice";
import { flex } from "../lib";

const AddGameForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSuccess = useSelector((state) => state.games.isSuccess);
  const [game, setGame] = useState({
    title: "",
    content: "",
    //username: "",
  });

  useEffect(() => {
    if (!isSuccess) return;
    if (isSuccess) window.location.replace("/works");

    return () => dispatch();
  }, [dispatch, isSuccess, navigate]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setGame({
      ...game,
      [name]: value,
    });
  };

  return (
    <StContainer>
      <StForm
        onSubmit={(envet) => {
          envet.preventDefault();
          if (
            game.content.trim() === "" ||
            //game.username.trim() === "" ||
            game.title.trim() === ""
          ) {
            return alert("모든 항목을 입력해주세요.");
          }
          dispatch(__addGameThunk(game));
          setGame({ title: "", content: ""});
        }}
      >
        <StMain>
          {/* <Wrapper mg="10px 0">
            <h3>작성자</h3>
          </Wrapper>
          <Input
            type="text"
            onChange={onChangeHandler}
            placeholder="작성자의 이름을 입력해주세요. (5자 이내)"
            value={game.username}
            name="username"
            maxLength={5}
          /> */}
          <Wrapper mg="10px 0">
            <h3>제목</h3>
          </Wrapper>
          <Input
            type="text"
            onChange={onChangeHandler}
            placeholder="제목을 입력해주세요. (50자 이내)"
            value={game.title}
            name="title"
            maxLength={50}
          />
          <Wrapper mg="10px 0">
            <h3>내용</h3>
          </Wrapper>
          <Textarea
            name="content"
            rows="10"
            maxLength={200}
            onChange={onChangeHandler}
            placeholder="내용을 입력해주세요. (200자 이내)"
            value={game.content}
          />
        </StMain>
        <br/>
        <Button size="large">추가하기</Button>
      </StForm>
    </StContainer>
  );
};

export default AddGameForm;

const StForm = styled.form`
  width: 100%;
  height: 100%;
  ${flex({
    direction: "column",
    align: "start",
    jusify: "space-between",
  })}
  color: #ffffff;
`;

const StContainer = styled.div`
  height: 100%;
`;

const Textarea = styled.textarea`
  width: 100%;
  border: 1px solid #eee;
  padding: 12px;
  font-size: 14px;
  background-color: #ffffff;
`;

const StMain = styled.div`
  width: 100%;
`;
