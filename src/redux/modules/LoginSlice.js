import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import axios from "axios";
import instance from "../../shared/request"
import { Cookies } from "react-cookie";

export const addMemberThunk = createAsyncThunk(
    "ADD_MEMBER",
    async (payload, thunkAPI) => {
      //console.log(payload);
      try {
        const { data } = await instance.post("api/member/signup", payload);
        //console.log(data.date);
        if (data.success === false) alert("중복된 이메일입니다.");
        return thunkAPI.fulfillWithValue(data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  const initialState = { member: [], isLoading: false, error: null };

const LoginSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
  //   logout: () => {
  //   Cookies.removeItem("authorization");
  //   Cookies.removeItem("RefreshToken");
  //   localStorage.removeItem("name"); // deletes token from storage
  // }
  },
  extraReducers: {
    [addMemberThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [addMemberThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.member.push(action.payload);
    },
    [addMemberThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

},
});

export const { logout } = LoginSlice.actions;
export default LoginSlice.reducer;