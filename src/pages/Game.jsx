import React, { useEffect, useState} from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { __getGameThunk, __updateGameThunk,} from "../redux/modules/gameSlice";
import Comments from "../comments/Comments";
import { Button, Text } from "../elem";

// import { __toggleLike } from '../redux/modules/like';
// import { faThumbsDown } from '@fortawesome/free-regular-svg-icons';
// import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Game = () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedGame, setUpdatedGame] = useState("");

  const game = useSelector((state) => state.game.game.data);

  
  //console.log(game.data)
  //console.log(game.data.success)
  // console.log(game.data.author)

  useEffect(() => {
    dispatch(__getGameThunk(id));
    return () => dispatch();
  }, [dispatch, id]);


  // useEffect(() => {
  //   setUpdatedGame(game.content);
  // }, [game]);

  const onSaveButtonHandler = () => {
    if (updatedGame === "") {
      return alert("입력된 내용이 없습니다.");
    }
    dispatch(
      __updateGameThunk({
        title: game?.title,
        content: updatedGame,
        id: id,
      })
    );    
    setIsEditMode(false);
  };
//   //좋아요
//   const isLike = useSelector((state) => state.like)
//   const likeNumber = useSelector((state) => state.game.game.like_num)

//   const onisLike = async() => {
//     dispatch(__toggleLike(id))
// }

return (
  <>
    <Layout bgColor="#fff">

    {!isEditMode && (
      <StGameHeader>
          <Text>{game?.author} 님이 추가한 BALANCE GAME</Text>
          <Button onClick={() => window.location.replace("/works")}>
            이전으로
          </Button>
      </StGameHeader>
    )}
      
        <h1>{game?.title}</h1>
        {/* {isLike ? (<p><FontAwesomeIcon icon={faThumbsUp} />{likeNumber}</p>)
                :(<p><FontAwesomeIcon icon={faThumbsDown} />{likeNumber}</p>)}
        {isLike ? (<button onClick={onisLike}><FontAwesomeIcon icon={faThumbsUp} /></button>) 
                : (<button onClick={onisLike}><FontAwesomeIcon icon={faThumbsDown} /></button>)} */}
        
        <StBody>
        {isEditMode ? (
            <>
              <Textarea
                name="content"
                rows="10"
                maxLength={200}
                value={updatedGame}
                onChange={(event) => {
                  setUpdatedGame(event.target.value);
                }}
              />
            </>
          ) : (
            <Text size="18">{game?.content}</Text>
          )}

          <StButtonGroup>
            {isEditMode ? (
              <Button size="large" onClick={onSaveButtonHandler}>
                저장
              </Button>
            ) : (
              <Button
                size="large"
                onClick={() => {
                  setIsEditMode(true);
                }}
              >
                수정하기
              </Button>
            )}
          </StButtonGroup>
        </StBody>
      
      {/* 🔥댓글 부분 구현하면 풀기🔥 */}
      {!isEditMode && <Comments game={game}/>}

    </Layout>
  </>
);
};

export default Game;

const StGameHeader = styled.div`
  justify-content: space-between;
  display: flex;
  border-radius: 20px;
  height: 100px;
  align-items: center;
  padding: 0 30px;
  cursor: pointer;
  margin-bottom: 32px;
  background-color: #ffffff;
`;

const StBody = styled.div`
flex-direction: column;
justify-content: space-between;
margin-top: 50px;
min-height: 550px;
`;

const StButtonGroup = styled.div`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  display: flex;
  gap: 12px;
  margin-top: 50px;
`;

const Textarea = styled.textarea`
  width: 100%;
  border: 1px solid #eee;
  padding: 12px;
  font-size: 14px;
  color: white;
`;