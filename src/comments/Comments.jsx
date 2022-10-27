import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __getCommnetsByGameId } from "../redux/modules/commentsSlice";
import Comment from "./Comment";
import AddCommentForm from "./AddCommentForm";

const Comments = (game) => {

  const { id } = useParams();
  
  const dispatch = useDispatch();

  const [isShow, setisShow] = useState(false);

  const { data } = useSelector((state) => state.comments.commentsByGameId);
  //console.log(data)
  //console.log(data.data)
  //console.log(data.data.commentResponseDtoList)

  const commentlist = game.game
  console.log(commentlist)

  useEffect(() => {
    if (isShow) {
      dispatch(__getCommnetsByGameId(id));
    }
  }, [dispatch, id, isShow]);

  if(commentlist) {
    console.log("여기", data)
    return (

    <StContainer isShow={isShow}>

      <StToggleContainer onClick={() => {setisShow((pre) => !pre);}}>
        <h3>{isShow ? "눌러서 댓글내리기" : "눌러서 댓글보기"}</h3>
      </StToggleContainer>

      <AddCommentForm />
      
      <StCommentList>
        {commentlist.commentResponseDtoList.map((comment,index) => (
          <Comment key={index} comment={comment} />
        ))}
      </StCommentList>
    </StContainer>

    
  );
  } else {return null}
  
};

export default Comments;

const StContainer = styled.div`
  height: ${({ isShow }) => (isShow ? "400px" : "50px")};
  position: absolute;
  bottom: 20px;
  left: 10px;
  width: 100%;
  transition: height 400ms ease-in-out;
`;

const StToggleContainer = styled.div`
  justify-content: space-between;
  display: flex;
  height: 50px;
  margin-bottom: 30px;
  padding: 20px;
  border-top: 1px solid #eee;
`;

const StCommentList = styled.div`

  height: 350px;
  overflow: scroll;
`;
