import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getGamesThunk } from "../redux/modules/gamesSlice";
import Card from "../components/Card";

const GameList = () => {
  const dispatch = useDispatch();
  const { games, error } = useSelector((state) => state.games);
  // 목록 저장한것 불러오기

  //__getGamesThunk 함수로 불러옴
  useEffect(() => {
    dispatch(__getGamesThunk());
  }, [dispatch]);

  //games가 비었다면
    
  if (games.length === 0)
    return <div><h2>등록된 게임이 없네요!</h2></div>;

  //에러났다면
  if (error) return <div>알수 없는 에러가 발생했습니다.</div>;

  //두 경우를 제외한 모든 경우
    //console.log(games); 가져와서 map으로 돌림
      return (
    <div>
      {/* 배열!!! */}
      {games.data.content.map((game,index) => (
        <Card key={index} game={game} />
      ))}
    </div>
  );
};

export default GameList;