import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Components/Routes/Register/index";
// import Login from "./Components/Routes/Login";
import Login from './Components/Routes/Login2Design/index'
import AddStudent from "./Components/Routes/AddStudent";
import Dashboard from "./Components/Routes/Dashboard/dashboard";
import React from "react";
// import StudentList from "./Components/Routes/StudentList/studentList";
import StudentList from "./Components/Routes/list2Design/index";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        {/* <Route path="/login" element={<Login/>} /> */}
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addStudent" element={<AddStudent />} />
        <Route path="/studentList" element={<StudentList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
