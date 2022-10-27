import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { VscTrash } from "react-icons/vsc";
import { __deleteGameThunk } from "../redux/modules/gamesSlice";
import { Button, Stack, Text, Wrapper } from "../elem";

const Card = ({ game }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDeleteHandler = () => {
    dispatch(__deleteGameThunk(game.id));
    
    console.log("delete", game.id)
  };

  return (
    <StCard
      onClick={() => {
        navigate(`/works/${game.id}`);
      }}
    >
      <Stack jusify="space-between">
        <Text size="20">주제 : {game.title}</Text>
        <Button size="small"
          onClick={(e) => {
            e.stopPropagation();
            const result = window.confirm("이 게임을 지울까요?");
            if (result) {
              return onDeleteHandler();
            } else {
              return;
            }
          }}
        >
          <VscTrash color="#FE531F"/>
        </Button>
      </Stack>
      <Wrapper mg="10px 0">
        <Stack jusify="space-between">작성자 : {game.member.name}</Stack>
      </Wrapper>
    </StCard>
  );
};

export default Card;

const StCard = styled.div`
  margin-top: 20px;
  padding: 12px;
  height: 90px;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 12px;
  width: 100%;
  margin-bottom: 12px;
  :hover {
  box-shadow: rgb(255, 255, 255) 4px 4px 4px;
  }
`;
