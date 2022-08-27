import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import apiPath from "../../apiPath";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        BookIt
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const [orgName, setOrgName] = useState();
  const [orgEmail, setOrgEmail] = useState();
  const [orgPhone, setOrgPhone] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!orgPhone || !orgName || !userName || !password || !orgEmail) {
      alert("Please Fill all the details");
    } else if (password != confirmPassword) {
      alert("Two two passwords is not match");
    } else {
      try {
        let url =
          apiPath +
          `/Organization/InsertOrganization?` +
          `name=${orgName}` +
          `&phone=${orgPhone}` +
          `&email=${orgEmail}` +
          `&userName=${userName}` +
          `&password=${password}`;
        const response = await axios.post(url);
        console.log(response);
        alert("Organization Registered Successfully");
        navigate("/OrgManager", { state: { orgId: response.data.id } });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLinkClick = () => {
    // navigate("/SupportRep");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="organizationName"
              label="Organization Name"
              name="organizationName"
              autoComplete="Organization Name"
              autoFocus
              onChange={(e) => {
                setOrgName(e.target.value);
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Organization Phone"
              name="phone"
              autoComplete="Organization Phone"
              onChange={(e) => {
                setOrgPhone(e.target.value);
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Organization Email"
              name="email"
              autoComplete="Organization Email"
              onChange={(e) => {
                setOrgEmail(e.target.value);
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="User Name"
              name="email"
              autoComplete="User Name"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="confirmPassword"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" onClick={handleLinkClick} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
