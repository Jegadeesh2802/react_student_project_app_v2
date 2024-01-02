import {
  Button,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Iconify from "../../../assets/iconfy";
import LoginForm from "./loginForm/index";
import useResponsive from "../../../assets/responsive";

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  // minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

export default function index() {
  const mdUp = useResponsive("up", "md");
  return (
    <>
      <Container maxWidth="sm">
        <StyledContent>
          <Typography variant="h4" gutterBottom>
            {" "}
            Sign in to Local Enviroment{" "}
          </Typography>
          <Typography variant="body2" sx={{ mb: 5 }}>
            Don’t have an account? {""}
            <Link variant="subtitle2">Get started</Link>
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button fullWidth size="large" color="inherit" variant="outlined">
              <Iconify
                icon="eva:google-fill"
                color="#DF3E30"
                width={22}
                height={22}
              />
            </Button>

            <Button fullWidth size="large" color="inherit" variant="outlined">
              <Iconify
                icon="eva:facebook-fill"
                color="#1877F2"
                width={22}
                height={22}
              />
            </Button>

            <Button fullWidth size="large" color="inherit" variant="outlined">
              <Iconify
                icon="eva:twitter-fill"
                color="#1C9CEA"
                width={22}
                height={22}
              />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              OR
            </Typography>
          </Divider>

          <LoginForm />
        </StyledContent>
      </Container>
    </>
  );
}
