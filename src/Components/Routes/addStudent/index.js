import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import './addStudent.css';


const courses = ['ENGINEERING','MEDICAL', 'MANAGEMENT','ARTS','SCIENCE'];

export default function AddStudentForm() {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [course, setCourse] = useState('');
  const [passedOut, setPassedOut] = useState('');

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
    setAge(
      new Date().getFullYear() - new Date(event.target.value).getFullYear()
    );
  };

  return (
    <div className='bg-container'>
      <div className="form-container">
      <TextField
        label="Name"
        fullWidth
        margin="dense"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Date of Birth"
        type="date"
        fullWidth
        margin="dense"
        value={dateOfBirth}
        onChange={handleDateOfBirthChange}
      />
      <TextField
        label="Age"
        fullWidth
        margin="dense"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <TextField
        label="City"
        fullWidth
        margin="dense"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <TextField
        label="Mobile"
        fullWidth
        margin="dense"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <TextField
        label="Email"
        fullWidth
        margin="dense"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="College"
        fullWidth
        margin="dense"
        value={college}
        onChange={(e) => setCollege(e.target.value)}
      />

      <FormControl style={{ marginBottom: '10px', width: '100%' }}>
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
      <TextField
        label="Passed Out"
        fullWidth
        margin="dense"
        value={passedOut}
        onChange={(e) => setPassedOut(e.target.value)}
      />
      </div>
    </div>
    
  );
}
