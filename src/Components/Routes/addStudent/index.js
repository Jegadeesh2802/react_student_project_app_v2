import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import "./addStudent.css";
import { Button, Snackbar, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useNavigate } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { useDispatch,useSelector } from "react-redux";
import { addStudent } from "../../Redux/Reducer/studentReducer";
import { login, selectUser } from "../../Redux/Reducer/userReducer";
import SideBar from "../../../assets/SideBar"



const courses = ["ENGINEERING", "MEDICAL", "MANAGEMENT", "ARTS", "SCIENCE"];
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop:"100px"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  addStudent: {
    position: "fixed",
    top: 10,
    left: 10,
    right: 10,
    padding: "20px",
    backgroundColor: "#f5f5f5",
    zIndex: 1,
  },
  btn:{
    padding:"20px"
  }
}));

export default function AddStudent() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [passedOut, setPassedOut] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

 

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
    setAge(
      new Date().getFullYear() - new Date(event.target.value).getFullYear()
    );
  };
  const user = useSelector(selectUser);
  
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    if (storedAccessToken) {
      dispatch(login({ accessToken: storedAccessToken }));
    }
  }, [dispatch]);


  console.log(user.accessToken,"LOG ACCESS TOKEN")
  function handleSaveStudent() {
    if (name === "") {
      setError("Please enter name");
      return;
    }
    fetch("http://localhost:3005/student/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': user.accessToken
      },
      body: JSON.stringify({
        name: name,
        age: age,
        dateOfBirth: dateOfBirth,
        city: city,
        mobile: mobile,
        email: email,
        college: college,
        course: course,
        passedOut: passedOut,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create student");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(addStudent({name,age,dateOfBirth,city,mobile,email,college,course,passedOut}))
        navigate("/studentList");
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to create student");
      });
  }

  return (
    <div className={classes.addStudent}>
      <SideBar/>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs>
            <TextField
              label="Name"
              fullWidth
              margin="dense"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs>
            <TextField
              label="Date of Birth"
              type="date"
              fullWidth
              margin="dense"
              value={dateOfBirth}
              onChange={handleDateOfBirthChange}
            />
          </Grid>
          <Grid item xs>
            <TextField
              label="Age"
              fullWidth
              margin="dense"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs>
            <TextField
              label="City"
              fullWidth
              margin="dense"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
          <Grid item xs>
            <TextField
              label="Mobile"
              fullWidth
              margin="dense"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </Grid>
          <Grid item xs>
            <TextField
              label="Email"
              fullWidth
              margin="dense"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs>
            <TextField
              label="College"
              fullWidth
              margin="dense"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
            />
          </Grid>
          <Grid item xs>
            <FormControl fullWidth>
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
          </Grid>
          <Grid item xs>
            <TextField
              label="Passed Out"
              fullWidth
              margin="dense"
              value={passedOut}
              onChange={(e) => setPassedOut(e.target.value)}
            />
          </Grid>
        </Grid>
        
       
      
      </div>
      <Button
            className={classes.btn}
            variant="contained"
            color="primary"
            onClick={handleSaveStudent}
          >
            Add Student
          </Button>
      {error && (
        <Snackbar
          open={error !== null}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        >
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}
