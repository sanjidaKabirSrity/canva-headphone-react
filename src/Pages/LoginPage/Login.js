import React from 'react';
import { Button,TextField, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import { Link ,useHistory, useLocation } from 'react-router-dom';
import google from '../../Images/google.png';
import swal from "sweetalert";
import useAuth from '../../Hooks/useAuth';

const Login = () => {
    const { signInWithGoogle, setIsLoading, loginWithEmail, upsertUser } = useAuth();

      // redirect private route
      const history = useHistory();
      const location = useLocation(); 
      const redirectUrl = location.state?.from || "/dashboard";

    // form data
    const {
        register,
        handleSubmit, 
        formState: {errors},
    } = useForm();
    const onSubmit = (data) => {
        const { Email, Password } = data;
        handleEmailLogin(Email, Password);
    };

    const handleEmailLogin = (Email, Password) => {
      loginWithEmail(Email, Password)
        .then((result) => {
          // setUser(result.user);
          history.push(redirectUrl);
          swal({
            title: "LogIn Successfull!!",
            icon: "success",
          });
        })
        .catch((error) => {
          swal({
            text: error.message,
            icon: "error",
          });
        });
    };

    // google redirect
  const hanldeGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
         // save user to database
         upsertUser(result?.user?.email, result?.user?.displayName);

        history.push(redirectUrl);
        swal({
          title: "Successfully Log In!!",
          icon: "success",
        });
      })
      .catch((error) => {
        swal({
          text: error.message,
          icon: "error",
        });
      })
      .finally(() => setIsLoading(false));
  };

    return (
        <>
            <Box sx={{ flexGrow: 1, pt:14, pb:10}}>
            <Container>
              <Grid container spacing={{ xs:0, sm:3, md: 5 }} columns={{ xs: 12, sm:12 , md:12}} sx={{alignItems: 'center'}}>
              <Grid item xs={0} sm={0} md={3}></Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Typography color="secondary" variant="h4" sx={{textAlign:"center", fontWeight:600}}>Log In</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    required
                    id="standard-password-input"
                    type="email"
                    label="Email"
                    color="secondary"
                    variant="standard"
                    sx={{ width:1, mb:4, fontSize: "18px"}}
                    {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
                  />
                  {errors.Email && (
                    <Typography variant="subtitle1" sx={{color:"#FF0000", mb:2}}>This field is required</Typography>
                  )}
                  <TextField
                    required
                    id="standard-password-input"
                    type="password"
                    autoComplete="current-password"
                    label="Password"
                    color="secondary"
                    variant="standard"
                    sx={{ width:1, mb:4, fontSize: "18px"}}
                    {...register("Password", {
                      required: true,
                      min: 8,
                    })}
                  />
                  {errors.Password && (
                    <Typography variant="subtitle1" sx={{color:"#FF0000", mb:2}}>
                      Password should have at least 8 chracters, 2 uppercase, 3
                      lowercase, 1 special character, 2 numbers.
                    </Typography>
                  )} 
                    <Button 
                         variant="outlined"
                        type="submit"
                        color="secondary"
                        sx={{my:2, fontSize: 16, fontWeight:600, py:1, width:"100%" }}
                    >
                        Login
                    </Button>
                  <Box sx={{justifyContent:"center", display:"flex"}}>
                    <Typography variant="subtitle1" color="secondary" sx={{px:1}}>New to Canvas? </Typography>
                      <Link to="/register" style={{textDecoration:"none", color:"#A8A8A8"}}> Create a account</Link>
                  </Box>
                </form>
                <Box sx={{borderTop:"#333", textAlign:"center", pt:4}}>
                  <Box>
                    <Button
                      onClick={hanldeGoogleLogin}
                      variant="text"
                    >
                      <img src={google} alt="" />
                      <Typography variant="subtitle1" color="secondary" sx={{pl:1}}>Continue with Google</Typography>
                    </Button>
                  </Box>
                </Box>
                </Grid>
                <Grid item xs={0} sm={0} md={3}></Grid>
                </Grid>
            </Container>
            </Box>
        </>
    );
};

export default Login;



/* import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Button,TextField, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import useFirebase from '../../Hooks/useFirebase';

const Login = () => {
    const {signInWithGoogle, user, isLoading, authError} = useFirebase();

    const location = useLocation();
    const history = useHistory();

    const [loginData , setLoginDate] = useState({});

    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginDate = {...loginData};
        newLoginDate[field] = value;
        setLoginDate(newLoginDate);
    }

    const handleLoginSubmit= e =>{
        alert("are you sure to login")
        // loginWithEmail(loginData.email, loginData.password, location, history);
        e.preventDefault();
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle(location, history);
    }

    return (
    <div>
        <Container>
            <Box sx={{ flexGrow: 1}}>
                        {!isLoading && <Box sx={{boxShadow:"2px 2px 10px #dddd", py:8, px:4}}>
                            <Typography color="primary" variant="body1" sx={{textAlign:"center", fontWeight:600 , fontSize:22}}>Log In</Typography>
                            <form onSubmit={handleLoginSubmit} sx={{width:'100%'}}>
                            <TextField
                                id="standard-password-input"
                                label="Email"
                                type="Email"
                                variant="standard"
                                sx={{ width:1, mb:4}}
                                name="email"
                                onBlur={handleOnChange}
                            />
                            <TextField
                                id="standard-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                variant="standard"
                                sx={{width:1, mb:4}}
                                name="password"
                                onBlur={handleOnChange}
                            />
                            <Button 
                                variant="contained" 
                                className="btn" 
                                type="submit"
                                sx={{color:"white", my:2, fontSize: 16, fontWeight:600, borderRadius:0, py:1, width:"100%" }}
                            >
                                Login
                            </Button>
                            </form>
                            <Typography variant="subtitle1" color='secondary' sx={{textAlign:"center"}}>
                                New to Dentist Portal ? 
                                <Link to="/register">
                                    <Typography variant="subtitle1" color='primary' sx={{display:"inline-block", textDecoration:"none", pl:1}}>
                                        Register
                                    </Typography>
                                </Link>
                            </Typography>
                            <Button onClick={handleGoogleSignIn} variant="text">Google</Button>
                        </Box>}
                        {isLoading && <CircularProgress color="secondary" sx={{ mx:"auto", display:"flex" ,justifyContent:{xs:"center", md:"center"}}} />}
                        {
                        user?.email && 
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="success">User Login — Successfully!</Alert>
                        </Stack>
                        }
                        {
                            authError && <Stack sx={{ width: '100%' }} spacing={2}>
                                            <Alert severity="error">{authError}</Alert>
                                        </Stack>
                        }
            </Box>
        </Container>
    </div>
    );
};

export default Login; */