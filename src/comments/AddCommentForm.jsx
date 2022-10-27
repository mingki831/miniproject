import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { __addComment } from "../redux/modules/commentsSlice";
import {Input, Button} from "../elem";

const AddCommentForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [comment, setComment] = useState({
    content: "",
  });

  const onAddCommentButtonHandler = (event) => {
    event.preventDefault();
    if (comment.content.trim() === "") {
      return alert("모든 항목을 입력해주세요.");
    }
    dispatch(__addComment({ postId: id, comment:comment }));
    setComment({
      // username: "",
      content: "",
    });
  };

  const onChangeInputHandler = (event) => {
    const { name, value } = event.target;
    setComment({  
      [name]: value,
    });
  };

//  console.log("id:",id)

  return (
    <StForm onSubmit={onAddCommentButtonHandler}>
      {/* <StNameInput>
        <Input
          placeholder="이름 (5자 이내)"
          value={comment.username}
          type="text"
          name="username"
          onChange={onChangeInputHandler}
          maxLength={5}
        />
      </StNameInput> */}
      <Input
        placeholder="댓글을 추가하세요. (100자 이내)"
        value={comment.content}
        name="content"
        type="text"
        onChange={onChangeInputHandler}
        maxLength={100}
      />
      <Button type="submit" onClick={onAddCommentButtonHandler}>
        추가하기
      </Button>
    </StForm>
  );
};

export default AddCommentForm;

const StNameInput = styled.div`
  width: 150px;
`;

const StForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 12px;
  width: 100%;
  padding: 0 12px;
`;
