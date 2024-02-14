import { createSlice } from "@reduxjs/toolkit";
import { userList } from "./data";

export const studentReducer = createSlice({
  name: "student",
  initialState: [],
  reducers: {
    addStudent: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addStudent } = studentReducer.actions;

export const selectStudents = (state) => state.student.students;

export default studentReducer.reducer;
