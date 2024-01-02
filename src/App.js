import './App.css';
import { Route,Routes } from 'react-router-dom';
import Register from './Components/Routes/Register/index';
import Login from './Components/Routes/Login/index';
import Dashboard from './Components/Routes/Dashboard/index';
import AddStudent from './Components/Routes/addStudent';


function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addStudent" element={<AddStudent/>}/>
    </Routes>
    </div>
  );
}

export default App;
