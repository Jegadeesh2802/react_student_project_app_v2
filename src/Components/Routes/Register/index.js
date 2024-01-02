import React, { useState } from "react";
import "./register.css"

import { Button, Grid, Snackbar, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectUser } from "../../Redux/Reducer/userReducer";


const Register = () => {

  const user = useSelector(selectUser);
  console.log(user,"Logger Data")
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === '') {
      setError('Please enter user name');
      return;
    }
    if (password === '') {
      setError('Please enter password');
      return;
    }
    if (confirmpassword === '') {
      setError('Please enter confirm password');
      return;
    }
    if (mobile === '') {
      setError('Please enter mobile');
      return;
    }
    if (password !== confirmpassword) {
      setError('Password or confirm password is mismatch');
      return;
    }

    // Send POST request to register API
    fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, confirmpassword, mobile }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        navigate('/login');
      })
      .catch(error => {
        console.error(error);
        setError('Registration failed');
      });
  };

  return (
    <div className="register">
      <div className="col-1">
        <h2>Sign In</h2>
        <span>Please Register Your Details</span>

        <Grid id='grid-layout' className='flex flex-col' >
          <TextField type="text" value={username} onChange={(event) => setUsername(event.target.value)} placeholder='username'  style={{ width: '100%' }}/>
          <TextField type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder='password'  style={{ width: '100%' }} />
          <TextField type="password" value={confirmpassword} onChange={(event) => setconfirmpassword(event.target.value)} placeholder='confirm password'  style={{ width: '100%' }} />
          <TextField type="text" value={mobile} onChange={(event) => setMobile(event.target.value)} placeholder='mobile number'  style={{ width: '100%' }} />
          <Button className='btn' onClick={handleSubmit}>Sign In</Button>
          <p>If Already Hava a Account</p>
          <Link className="link-no-underline" to="/login">Go to Login !!!</Link>
        </Grid>

        {error && (
          <Snackbar open={error !== null} autoHideDuration={6000} onClose={() => setError(null)}>
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          </Snackbar>
        )}

      </div>
      
    </div>
  );
}

export default Register
