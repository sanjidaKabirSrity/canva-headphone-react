import { AppBar, IconButton,Button, Box, Toolbar, Typography, Container } from '@mui/material';
import { MenuItem, Menu , useMediaQuery } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link  , useHistory } from 'react-router-dom';
import React from 'react';
import logo from "../Images/logo.png"
import useAuth from '../Hooks/useAuth';

const Header = ({classes, theme}) => {
    const [anchor, setAnchor] = React.useState(null);
    const open = Boolean(anchor);
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const handleMenu = (event) => {
        setAnchor(event.currentTarget);
      };

      const { user, logOut } = useAuth();

      const history = useHistory();
      const handleClick =() => {
          history.push('/login')
      }

    return (
        <AppBar style={{backgroundColor:"transparent", boxShadow:"none"}}>
            <Container>
              <Toolbar>
                <Typography
                  component="p"
                  color="secondary"
                  className={classes.title}
                >
                  <img src={logo} alt="" style={{width:"180px"}} />
                </Typography>
                {isMobile ? (
                  <>
                    <IconButton
                      color="secondary"
                      className={classes.menuButton}
                      edge="start"
                      aria-label="menu"
                      onClick={handleMenu}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchor}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                      }}
                      KeepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right"
                      }}
                      open={open}
                    >
                      <MenuItem
                        onClick={() => setAnchor(null)}
                        component={Link}
                        to="/home"
                      >
                        <Typography variant="h6" 
                        sx={{
                            xs:{color:"black"},
                            sm:{color:"black"},
                            md:{color:"white"}
                        }}
                        > Home </Typography>
                      </MenuItem>
                      <MenuItem
                        onClick={() => setAnchor(null)}
                        component={Link}
                        to="/products"
                      >
                        <Typography variant="h6"
                        sx={{
                            xs:{color:"black"},
                            sm:{color:"black"},
                            md:{color:"white"}
                        }}
                        > Products </Typography>
                      </MenuItem>
                      {
                            user?.email && 
                            (
                                <MenuItem
                                onClick={() => setAnchor(null)}
                                component={Link}
                                to="/dashboard"
                              >
                                <Typography variant="h6"
                                sx={{
                                    xs:{color:"black"},
                                    sm:{color:"black"},
                                    md:{color:"white"}
                                }}
                                > Dashboard </Typography>
                              </MenuItem>
                            )
                        }
                        <span style={{margin:"0px 5px 0px 5px"}}>
                            {user?.photoURL ? (
                            <span style={{margin:"0px 5px 0px 5px"}}>
                              <small style={{color:"#ffff"}}>{user?.displayName}</small>
                              <img src={user.photoURL} alt=""  style={{width:"50px", border:"50%"}} />
                            </span>
                            ) : (
                            <small style={{color:"#ffff"}}>{user?.displayName}</small>
                            )}
                        </span>
                        {
                        user?.email ?
                        (
                            <MenuItem
                              onClick={() => setAnchor(null)}
                              component={Link}
                              to="/login"
                            >
                              <Typography variant="h6"
                              onClick={logOut}
                              sx={{
                                  xs:{color:"black"},
                                  sm:{color:"black"},
                                  md:{color:"white"}
                              }}
                              > Log Out </Typography>
                            </MenuItem>
                        )
                        :
                        (
                          <MenuItem
                            onClick={() => setAnchor(null)}
                            component={Link}
                            to="/login"
                          >
                            <Typography variant="h6"
                            sx={{
                                xs:{color:"black"},
                                sm:{color:"black"},
                                md:{color:"white"}
                            }}
                            > Login </Typography>
                          </MenuItem>
                        )
                        }
                    </Menu>
                  </>
                ) : (
                  <Box style={{ marginRight: "2rem"}}>
                    <Button
                      variant="text"
                      component={Link}
                      to="/home"
                      color="primary"
                    >
                      Home
                    </Button>
                    <Button
                      variant="text"
                      component={Link}
                      to="/products"
                      color="primary"
                    >
                      Products
                    </Button>
                    {
                            user?.email && 
                            (
                              <Button
                                variant="text"
                                component={Link}
                                to="/dashboard"
                                color="primary"
                              >
                                Dashboard
                              </Button>
                            )
                        }
                        <span style={{margin:"0px 5px 0px 5px"}}>
                            {user?.photoURL ? (
                            <span style={{margin:"0px 5px 0px 5px"}}>
                              <small style={{color:"#ffff"}}>{user?.displayName}</small>
                              <img src={user.photoURL} alt=""  style={{width:"50px", border:"50%"}} />
                            </span>
                            ) : (
                            <small style={{color:"#ffff"}}>{user?.displayName}</small>
                            )}
                        </span>
                        {
                          user?.email ?
                          (
                            <Button
                              variant="text"
                              component={Link}
                              to="/login"
                              color="primary"
                              onClick={logOut}
                            >
                              Log Out
                            </Button>
                          )
                          :
                          (
                            <Button
                              variant="text"
                              component={Link}
                              to="/login"
                              color="primary"
                            >
                              Login
                            </Button>
                          )
                          }
                  </Box>
                )}
              </Toolbar>
            </Container>
           </AppBar>
    );
};

export default Header;