import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [],
};

export const studentReducer = createSlice({
  name: 'student',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
  },
});

export const { addStudent } = studentReducer.actions;

export const selectStudents = (state) => state.student.students;

export default studentReducer.reducer;
