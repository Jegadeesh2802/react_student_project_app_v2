import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Reducer/userReducer";
import studentReducer from "../Reducer/studentReducer";


export default configureStore({
  reducer: {
    user: userReducer,
    student : studentReducer
  }
})
