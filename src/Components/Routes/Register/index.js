import React, { useState } from "react";
import {
  Button,
  Grid,
  Snackbar,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Link, useNavigate } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  register: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#cfd9df",
    fontFamily: "system-ui",
  },
  signin: {
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#003049",
    color: "#e9ecef",
    fontSize: "1em",
    cursor: "pointer",
    border: "1px solid #e9ecef",
    padding: "0.9em 1em",
    marginTop: "1em",
    marginBottom: "1em",
    width:"100%",
    '&:hover': {
      backgroundColor: "#e9ecef",
      color: "#003049",
      border: "1px solid #003049"
    }
  },
  linkNoUnderline: {
    display: "flex",
    justifyContent: "center",
    textDecoration: "none",
  },
  alignItem: {
    display: "flex",
    justifyContent: "center",
  },
  gridLayout: {
    maxWidth: "320px",
    width: "100%",
    margin: "2em auto",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    backgroundColor: "#f2f2f2",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
  },
  inputField: {
    marginBottom: "1em",
    width: "100%",
  },
}));


const Register = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === "") {
      setError("Please enter user name");
      return;
    }
    if (password === "") {
      setError("Please enter password");
      return;
    }
    if (confirmpassword === "") {
      setError("Please enter confirm password");
      return;
    }
    if (mobile === "") {
      setError("Please enter mobile");
      return;
    }
    if (password !== confirmpassword) {
      setError("Password or confirm password is mismatch");
      return;
    }
    if (email === "") {
      setError("Enter Email");
      return;
    }

    // Send POST request to register API
    fetch("http://localhost:3005/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        confirmpassword,
        mobile,
        email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
        setError("Registration failed");
      });
  };

  return (
    <div className={classes.register}>
      <div>
        <h2 className={classes.signin}>Sign In</h2>
        <p className={classes.alignItem}>Please Register Your Details</p>

        <Grid className={classes.gridLayout}>
          <TextField
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="username"
            className={classes.inputField}
          />
          <TextField
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="password"
            className={classes.inputField}
          />
          <TextField
            type="password"
            value={confirmpassword}
            onChange={(event) => setconfirmpassword(event.target.value)}
            placeholder="confirm password"
            className={classes.inputField}
          />
          <TextField
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className={classes.inputField}
          />
          <TextField
            type="text"
            value={mobile}
            onChange={(event) => setMobile(event.target.value)}
            placeholder="mobile number"
            className={classes.inputField}
          />
          <Button className={classes.btn} onClick={handleSubmit}>
            Sign In
          </Button>
          <p className={classes.alignItem}>If Already Have an Account</p>
          <Link className={classes.linkNoUnderline} to="/login">
            Go to Login!!!
          </Link>
        </Grid>

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
    </div>
  );
};

export default Register;
