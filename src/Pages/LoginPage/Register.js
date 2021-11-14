import React from 'react';
import { Button,TextField, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link ,useHistory, useLocation } from 'react-router-dom';
import google from '../../Images/google.png';
import swal from "sweetalert";
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';

const Register = () => {
    const {
        signInWithGoogle,
        createNewUserByEmail,
        setIsLoading,
        upsertUser
      } = useAuth();
    
      // redirect private route
      const history = useHistory();
      const location = useLocation();
      const redirectUrl = location.state?.from || "/";
    
      // google redirect
      const hanldeGoogleLogin = () => {
        signInWithGoogle()
          .then((result) => {
             // save user to database
            upsertUser(result?.user?.email, result?.user?.displayName);

            history.push(redirectUrl);
            swal({
              title: "Successfully Sign In!!",
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
    
      // form data
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const onSubmit = (data) => {
        const { Name, Email, Password } = data;
        createNewUserByEmail(Name, Email, Password);
      };
    return (
        <Box sx={{ flexGrow: 1, pt:14, pb:10}}>
            <Container>
            <Grid container spacing={{ xs:0, sm:3, md: 5 }} columns={{ xs: 12, sm:12 , md:12}} sx={{alignItems: 'center'}}>
              <Grid item xs={0} sm={0} md={3}></Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Typography color="secondary" variant="h4" sx={{textAlign:"center", fontWeight:600}}>Register</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>  
                    <TextField
                        required
                        id="standard-name-input"
                        type="text"
                        label="Name"
                        color="secondary"
                        variant="standard"
                        sx={{ width:1, mb:4, fontSize: "18px"}}
                        {...register("Name")}
                    />
                    {errors.Name && (
                        <Typography variant="subtitle1" sx={{color:"#FF0000", mb:2}}>This field is required</Typography>
                    )}
                    <TextField
                            required
                            id="standard-email-input"
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
                        Register
                    </Button>
                  <Box sx={{justifyContent:"center", display:"flex"}}>
                    <Typography variant="subtitle1" color="secondary" sx={{px:1}}>Already have an account </Typography>
                      <Link to="/login" style={{textDecoration:"none", color:"#A8A8A8"}}> Log in</Link>
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
    );
};

export default Register;