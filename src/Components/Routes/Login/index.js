import React, { useState } from 'react';
import './login.css';

import { Button, Grid, TextField, Snackbar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../Redux/Reducer/userReducer';
import { Alert } from "@material-ui/lab";


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      dispatch(login({ username, password }));
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

 
  
  
  return (
    <div className='login'>
      <div className='col-1'>
        <h2>Login</h2>
        <span>Login and enjoy the service</span>
  
        <Grid id='grid-layout' className='flex flex-col'>
          <TextField type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}  style={{ width: '100%' }} />
          <TextField type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}  style={{ width: '100%' }} />
  
          <Button className='btn' onClick={handleLogin}>
            Log in
          </Button>
        </Grid>
  
        {/* Display error alert if openSnackbar state is true */}
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
  
};

export default Login;
