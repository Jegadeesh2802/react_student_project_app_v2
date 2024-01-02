import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Snackbar, makeStyles } from '@material-ui/core';
import './dashboard.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Redux/Reducer/userReducer';
import {selectStudents } from '../../Redux/Reducer/studentReducer';
import { Alert } from '@material-ui/lab';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  // Add responsive styles here
  tableContainer: {
    overflowX: 'auto',
  },
  // Add more styles as needed
}));


function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [city, setCity] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [course, setCourse] = useState('');
  const [passedOut, setPassedOut] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAddStudent = () => {
    navigate('/addStudent');
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (name === '') {
      setError('Please enter user name');
      return;
    }
    fetch('http://localhost:3000/student/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({name,age,dateOfBirth,city,mobile,email,college,course,passedOut})
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setOpen(false);
      })
      .catch(error => {
        console.log(error);
    })
  }

  const courses = [
    'ENGINEERING','MEDICAL', 'MANAGEMENT','ARTS','SCIENCE'
  ];
  const user = useSelector(selectUser);

  if (user && user.username) {
    localStorage.setItem('username', user.username)
  }

  const username = localStorage.getItem('username')
  console.log(username,"username")

  const welcomeMessage = username ? `Welcome, ${username}` : '';

  const students = useSelector(selectStudents);


  
   console.log(students, "student")
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5);

  // Get current students
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);
  const handleDateOfBirthChange = (event) => {
    const dob = event.target.value;
    const ageDiff = Date.now() - new Date(dob).getTime();
    const ageDate = new Date(ageDiff);
    const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    setDateOfBirth(dob);
    setAge(calculatedAge);
  }

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className='dashboard'>
      <div className="button-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'fixed', top: '0', left: '0', right: '0' }}>
        <h1 style={{ color: 'white', marginLeft: '10px' }}>{welcomeMessage}</h1>
        
      </div>

      <div className={classes.tableContainer}>
        <table>
      <div className='table-align'>
      <table>
        <thead>
          <tr>
            <th className="highlight">Name</th>
            <th className="highlight">Age</th>
            <th className="highlight">Date of Birth</th>
            <th className="highlight">City</th>
            <th className="highlight">Mobile</th>
            <th className="highlight">Email</th>
            <th className="highlight">College</th>
            <th className="highlight">Course</th>
            <th className="highlight">Passed Out</th>
            <tr>
              <th className="highlight" colSpan="8" style={{ textAlign: 'right' }}>
                <Button style={{color: 'white'}} onClick={handleAddStudent}>
                Add Student
                </Button>
              </th>
            </tr>
            </tr>
            
        </thead>
        <tbody>
          {currentStudents.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.dateOfBirth}</td>
              <td>{student.city}</td>
              <td>{student.mobile}</td>
              <td>{student.email}</td>
              <td>{student.college}</td>
              <td>{student.course}</td>
              <td>{student.passedOut}</td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>
      </table>
      </div>
      
      <div className="pagination">
        {students.length > studentsPerPage &&
          Array.from({ length: Math.ceil(students.length / studentsPerPage) }).map((_, i) => (
            <button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
              {i + 1}
            </button>
          ))}
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth margin="dense" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label="Date of Birth" type='date' fullWidth margin="dense" value={dateOfBirth} onChange={handleDateOfBirthChange} />
          <TextField label="Age" fullWidth margin="dense" value={age} onChange={(e) => setAge(e.target.value)} />

          <TextField label="City" fullWidth margin="dense" value={city} onChange={(e) => setCity(e.target.value)} />
          <TextField label="Mobile" fullWidth margin="dense" value={mobile} onChange={(e) => setMobile(e.target.value)} />
          <TextField label="Email" fullWidth margin="dense" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="College" fullWidth margin="dense" value={college} onChange={(e) => setCollege(e.target.value)} />
          
          <FormControl  style={{ marginBottom: '10px', width: '100%' }}>
            <InputLabel id="course-label">Course</InputLabel>
            <Select
              labelId="course-label"
              id="course"
              value={course}
              onChange={(event) => setCourse(event.target.value)}
              label="Course"
            >
              {courses.map((course) => (
                <MenuItem key={course} value={course}>
                  {course}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField label="Passed Out" fullWidth margin="dense" value={passedOut} onChange={(e) => setPassedOut(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {error && (
          <Snackbar open={error !== null} autoHideDuration={6000} onClose={() => setError(null)}>
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          </Snackbar>
        )}
    </div>
  );
}

export default Dashboard;