import React, { useState } from "react";
import { Button, Grid, TextField, Snackbar, makeStyles, InputAdornment, IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Redux/Reducer/userReducer";
import { Alert } from "@material-ui/lab";
import Iconify from '../../../assets/iconfy';


const useStyles = makeStyles((theme) => ({
  login: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#cfd9df",
    fontFamily:"system-ui"
  },
  loginHeading: {
    textAlign: "center"
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
    width: "100%",
    '&:hover': {
      backgroundColor: "#e9ecef",
      color: "#003049",
      border: "1px solid #003049"
    }
  },
  linkNoUnderline: {
    display: "flex",
    justifyContent: "center",
    textDecoration:"none"
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



const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3005/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
      } else {
        const data = await response.json();
        const result = dispatch(login({username: username,password: password, accessToken : data.accessToken})
        );
        // console.log(result,"RESULT LOGG")
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className={classes.login}>
      <div>
        <h2 className={classes.loginHeading}>Login</h2>
        <p className={classes.alignItem}>Login and enjoy the service</p>

        <Grid className={classes.gridLayout}>
          <TextField
            type="text"
            placeholder="user name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={classes.inputField}
          />
          <TextField
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={classes.inputField}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button className={classes.btn} onClick={handleLogin}>
            Log in
          </Button>
          <p className={classes.alignItem}>If Don't Hava a Account</p>
          <Link className={classes.linkNoUnderline} to="/">
            Go to Register !!!
          </Link>
        </Grid>

        <Snackbar
          open={error !== null}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        >
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Login;
