import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import games from "../modules/gamesSlice";
import game from "../modules/gameSlice";
import comments from "../modules/commentsSlice";
import comment from "../modules/commentSlice";
import like from "../modules/like";
import member from "../modules/LoginSlice"

const store = configureStore({
  reducer: {
    games,
    game,
    comments,
    comment,
    like,
    member
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    // 직렬화 오류 없애기. 왜 직렬화 오류 뜨는지?
  }),
});

export default store;