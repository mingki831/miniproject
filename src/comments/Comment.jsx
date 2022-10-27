import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { VscTrash } from "react-icons/vsc";
import { VscEdit } from "react-icons/vsc";
import { Button, Text, Input } from "../elem"
import { __deleteComment, __updateComment } from "../redux/modules/commentsSlice"
import { globalEditModeToggle, __getComment,} from "../redux/modules/commentSlice";

const Comment = ({ comment }) => {

  const { id } = useParams();

  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);

  const [updatedComment, setUpdatedComment] = useState("");

  const { content } = useSelector((state) => state.comment.data);
  const { isGlobalEditmode } = useSelector((state) => state.comment);

  console.log(comment)

  //수정 핸들러
  const onUpdateButtonHandler = () => {
    dispatch(
      __updateComment({
        id: comment.id,
        content: updatedComment,
        username: comment.username,
        gameId: id,
      })
    );
    setIsEdit(false);
    dispatch(globalEditModeToggle(false));
  };

  //수정한거 저장
  const onChangeEditButtonHandler = () => {
    setIsEdit(true);
    dispatch(__getComment(comment.id));
    dispatch(globalEditModeToggle(true));
  };

  //수정한거 취소
  const onCancelButtonHandler = () => {
    setIsEdit(false);
    dispatch();
    dispatch(globalEditModeToggle(false));
  };

  //수정 후 바뀐 댓글
  useEffect(() => {
    setUpdatedComment(content);
  }, [content]);

  //삭제 핸들러
  const onDeleteButtonHandler = () => {
    const result = window.confirm("삭제하시겠습니까?");
    if (result) {
      dispatch(__deleteComment(comment.id));
    } else {
      return;
    }
  };

return (
    <StComment>
      {isEdit ? (
        <>
          <StInputWrapper>
            <Input
              type="text"
              value={updatedComment}
              maxlength={100}
              onChange={(event) => {
                setUpdatedComment(event.target.value);
              }}
            />
          </StInputWrapper>
          <StControlGroup>
            <Button
              size="small"
              bgColor="#FE531F"
              onClick={onCancelButtonHandler}
            >
              <Text color="#fff">취소</Text>
            </Button>
            <Button
              size="small"
              bgColor="#FE531F"
              onClick={onUpdateButtonHandler}
            >
              <Text color="#fff">저장</Text>
            </Button>
          </StControlGroup>
        </>
      ) : (
        <>
          <StInputWrapper>
            <Text>
              작성자 : {comment.author} <br/>
            </Text>
            <Text size="16">{comment.content}</Text>
          </StInputWrapper>

          <StControlGroup>
            <Button
              size="small"
              bgColor="#FE531F"
              disabled={isGlobalEditmode}
              onClick={onChangeEditButtonHandler}
            >
              <VscEdit size="16" color="#fff" />
            </Button>
            <Button
              size="small"
              bgColor="#FE531F"
              onClick={onDeleteButtonHandler}
              disabled={isGlobalEditmode}
            >
              <VscTrash size="16" color="#fff" />
            </Button>
          </StControlGroup>
        </>
      )}
    </StComment>
  );
};

export default Comment;

const StComment = styled.div`
  justify-content: space-between;
  display: flex;
  border-bottom: 1px solid #eee;
  height: 100px;
  align-items: center;
  padding: 0 12px;
`;

const StControlGroup = styled.div`
  flex-shrink: 0;
  gap: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const StInputWrapper = styled.div`
  width: 70%;
`;
