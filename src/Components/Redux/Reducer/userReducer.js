import { createSlice } from "@reduxjs/toolkit";
export const userReducer = createSlice({
  name: "user",
  initialState: {
    user: [],
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    }
  }
})

export const { login } = userReducer.actions;

export const selectUser = (state) => state.user.user;

export default userReducer.reducer;