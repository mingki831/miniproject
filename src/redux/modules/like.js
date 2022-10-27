import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const urlLike = {
  like: process.env.REACT_APP_LIKE
}


const initialState = {
  data: true,
  isLoading: false,
  success: null,
  error: null,
};

export const __toggleLike = createAsyncThunk(
  "like/__toggleLike",
  async (postId, thunkAPI) => {
    try {
      const Refreshtoken = localStorage.getItem('refreshToken');
      const Authorization = localStorage.getItem('authorization');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${Authorization}`,
        Refreshtoken: `${Refreshtoken}`
      }
      const response = await axios.post(
        `${urlLike.like}/${postId}`,{},{headers: headers} 
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)



const gameSlice = createSlice({
  name: "games",
  initialState,
  reducer: {},
  extraReducers: {
    [__toggleLike.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__toggleLike.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    [__toggleLike.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
})
// export const { } = postSlice.actions;
export default gameSlice.reducer;