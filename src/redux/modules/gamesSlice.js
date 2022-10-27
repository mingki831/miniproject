import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import axios from "axios";
import instance from "../../shared/request";

export const __addGameThunk = createAsyncThunk(
  "ADD_GAME",
  async (arg, thunkAPI) => {
    console.log(arg)
    try {
      const { data } = await instance.post("/api/auth/post", arg);
      console.log(data)
      console.log(data.data)
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const __getGamesThunk = createAsyncThunk(
  "GET_GAMES",
  async (arg, thunkAPI) => {
    try {
      const { data } = await instance.get("/api/post");
      //console.log(data)
      //console.log(data.data)> useeffect로 바로붙임. 게임 목록불러오기
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

//삭제
export const __deleteGameThunk = createAsyncThunk(
  "DELETE_GAME",
  async (arg, thunkAPI) => {
    try {
      console.log("arg : ", arg)
      const { data } = await instance.delete(`/api/auth/post/${arg}`);
      console.log("true?", data);

      if(data.success) {
        alert("삭제 완료!")
      }else {
        alert("장난치지마")
      }
      // ⭐️콘솔 찍히는지 보고 삭제 되는지 보고
      return thunkAPI.fulfillWithValue(arg);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
      
    }
  }
);

const initialState = {
  games: [],
  error: null,
  isLoading: false,
  isSuccess: false,
};

export const gameSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
  },
  extraReducers: {
    //목록
    [__getGamesThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.games = action.payload;
    },
    [__getGamesThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getGamesThunk.pending]: (state) => {
      state.isLoading = true;
    },

    //추가
    [__addGameThunk.pending]: (state) => {
      state.isSuccess = false;
      state.isLoading = true;
    },
    [__addGameThunk.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.games.push(action.payload);
    },
    [__addGameThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = gameSlice.actions;
export default gameSlice.reducer;
