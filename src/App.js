import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useScrollTrigger, Slide } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import './App.css';
import Header from "./Shared/Header";
import Home from "./Pages/HomePage/Home";
import NotFound from './Pages/NotFoundPage/NotFound';
import Footer from "./Shared/Footer";

const theme = createTheme({
  palette: {
    // mode: "dark",
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#000",
    },
    info: {
      main: "#A8A8A8",
    },
  },
  // background: {
  //   default: "#222222",
  //   paper:"#101620"
  // },
});


// For Navbar
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction={"down"} in={!trigger}>
      {children}
    </Slide>
  );
}


function App(props) {
  
  const classes = useStyles();

  return (
    <CssBaseline>
      <div className="App">
        <ThemeProvider theme={theme}>
          <div className={classes.root}>
            <HideOnScroll {...props}>
              <Router>
              <Header classes={classes} theme={theme} style={{background:"#000"}}/>
                <Switch>
                  <Route exact path="/">
                    <Home></Home>
                    {/* <Home classes={classes} theme={theme}></Home> */}
                  </Route>
                  <Route exact path="/home">
                    <Home></Home>
                  </Route>
                  <Route exact path="/services">
                    {/* <Services></Services> */}
                  </Route>
                  <Route exact path="/about">
                    {/* <About></About> */}
                  </Route>
                  <Route exact path="/contact">
                    {/* <About></About> */}
                  </Route>
                  <Route exact path="*">
                    <NotFound></NotFound>
                    {/* <NotFound classes={classes} theme={theme}></NotFound> */}
                  </Route>
                </Switch>
                <Footer></Footer>
              </Router>
            </HideOnScroll>
          </div>
        </ThemeProvider>
      </div>
    </CssBaseline>
  );
}

export default App;
