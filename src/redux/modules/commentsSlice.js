import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "../../shared/request";

// export const __getCommentsThunk = createAsyncThunk(
//   "GET_COMMENTS",
//   async (_, thunkAPI) => {
//     try {
//       const { data } = await axios.get("http://localhost:3001/comments");
//       return thunkAPI.fulfillWithValue(data);
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.code);
//     }
//   }
// );

export const __getCommnetsByGameId = createAsyncThunk(
  "GET_COMMENT_BY_GAME_ID",
  async (arg, thunkAPI) => {
    try {
      const { data } = await instance.get(`/api/post/${arg}`);
      console.log(data);
      console.log(data.data);
      console.log(data.data.commentResponseDtoList);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __updateComment = createAsyncThunk(
  "UPDATE_COMMENT",
  async (arg, thunkAPI) => {
    try {
      axios.patch(`http://localhost:3001/comments/${arg.id}`, arg);
      return thunkAPI.fulfillWithValue(arg);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const __addComment = createAsyncThunk(
  "ADD_COMMENT",
  async (arg, thunkAPI) => {
    // console.log(arg.comment.content)
    // console.log(typeof(arg.comment.content))
    // console.log(arg.postId)
    // console.log(typeof(arg.postId))
    try {
      const { data } = await instance.post(`api/auth/comment`, {
        postId : arg.postId,
        content : arg.comment.content
    });
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const __deleteComment = createAsyncThunk(
  "DELETE_COMMENT",
  async (arg, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3001/comments/${arg}`);
      return thunkAPI.fulfillWithValue(arg);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

const initialState = {
  // comments: {
  //   data: [],
  //   isLoading: false,
  //   error: null,
  // },
  commentsByGameId: {
    data: [],
    isLoading: false,
    error: null,
  },
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
  },
  extraReducers: {
    // 전체 댓글 조회
    // [__getCommentsThunk.pending]: (state) => {
    //   state.comments.isLoading = true;
    // },
    // [__getCommentsThunk.fulfilled]: (state, action) => {
    //   state.comments.isLoading = false;
    //   state.comments.data = action.payload;
    // },
    // [__getCommentsThunk.rejected]: (state, action) => {
    //   state.comments.isLoading = false;
    //   state.comments.error = action.payload;
    // },

    // 댓글 조회 (gameId로)
    [__getCommnetsByGameId.pending]: (state) => {
      state.commentsByGameId.isLoading = true;
    },
    [__getCommnetsByGameId.fulfilled]: (state, action) => {
      state.commentsByGameId.isLoading = false;
      state.commentsByGameId.data = action.payload;
    },
    [__getCommnetsByGameId.rejected]: (state, action) => {
      state.commentsByGameId.isLoading = false;
      state.commentsByGameId.error = action.payload;
    },

    // 댓글 수정
    [__updateComment.pending]: (state) => {},
    [__updateComment.fulfilled]: (state, action) => {
      const target = state.commentsByGameId.data.findIndex(
        (comment) => comment.id === action.payload.id
      );
      state.commentsByGameId.data.splice(target, 1, action.payload);
    },
    [__updateComment.rejected]: () => {},
    // 댓글 추가
    [__addComment.fulfilled]: (state, action) => {
      state.commentsByGameId.isLoading = false;
      //state.commentsByGameId.data.push(action.payload);
    },
    [__addComment.rejected]: (state, action) => {
      state.commentsByGameId.isLoading = false;
      state.commentsByGameId.error = action.payload;
    },
    [__addComment.pending]: (state) => {
      state.commentsByGameId.isLoading = true;
    },
  },
});

export default commentsSlice.reducer;
