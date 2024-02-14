import {
  Alert,
  Checkbox,
  IconButton,
  InputAdornment,
  Link,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Iconify from "../../../../assets/iconfy";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { login } from "../../../Redux/Reducer/userReducer";



function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userToken, setUserToken] = useState(localStorage.getItem("username") || "");

  const handleClick = () => {
    navigate("/dashboard", { replace: true });
  };

  useEffect(() => {
    const savedUserToken = localStorage.getItem("userToken");
    if (savedUserToken) {
      setUserToken(savedUserToken);
    }
  }, []); 

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
        localStorage.setItem("userToken", data.accessToken);
        // console.log(result,"RESULT LOGG")
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again later.");
    }
  };


  return (
    <>
      <Stack spacing={3}>
        <TextField 
        name="user name" 
        placeholder="user name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        label="User Name" />

        <TextField
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          value={password}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleLogin}
      >
        Login
      </LoadingButton>

      <Snackbar
          open={error !== null}
          autoHideDuration={2000}
          onClose={() => setError(null)}
        >
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Snackbar>
    </>
  );
}

export default Login;
