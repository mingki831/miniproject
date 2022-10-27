import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "../../shared/request";

export const __getGameThunk = createAsyncThunk(
  "GET_GAME",
  async (arg, thunkAPI) => {
    try {
      //console.log(arg)
      const { data } = await instance.get(`/api/post/${arg}`);
      //console.log(data)
      //console.log(data.data)
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __updateGameThunk = createAsyncThunk(
  "UPDATE_GAME",
  async (arg, thunkAPI) => {
    console.log(arg.id)
    console.log(arg.title)
    console.log(arg.content)
    try {
      const { data } = await instance.put(`/api/auth/post/${arg.id}`, { title: arg.title, content: arg.content});
      return thunkAPI.fulfillWithValue(arg);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

const initialState = {
  game: {
    id: 0,
    content: "",
    // username: "",
    title: "",
  },
  error: null,
  isLoading: false,
};

export const gameSlice = createSlice({
  name: "games",
  initialState,
  reducers: {},
  extraReducers: {
    //게임 상세보기
    [__getGameThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.game = action.payload;
    },
    [__getGameThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getGameThunk.pending]: (state) => {
      state.isLoading = true;
    },
    //게임 수정
    [__updateGameThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.game = action.payload;
    },
    [__updateGameThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateGameThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = gameSlice.actions;
export default gameSlice.reducer;
