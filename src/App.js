import React, {useState} from "react";
import "./App.css";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Grid, makeStyles } from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import Navbar from "./components/Navbar";
import Leftbar from "./components/Leftbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import CustomerSignup from "./components/CustomerSignup";
import Signup from "./components/Signup";
import UserListing from "./components/UserListing";
import Login from "./pages/Login";
import AuthRoute from "./components/AuthRoute";
import ForgotPassword from "./pages/ForgotPassword";
import { useGlobalContext } from "./context/globalContext";
import { ToastProvider } from "react-toast-notifications";
import Sidebar from "./components/Sidebar";
import UpdateProfile from "./pages/UpdateProfile";
import NewPassword from "./pages/NewPassword";
import Streams from "./pages/Streams";

const useStyles = makeStyles((theme) => ({
  right: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  bodyactive:{
    marginLeft: '250px',
    transition: 'marginLeft .2s ease-in'
  },
  bodyinactive:{
    marginLeft: '50px'
  }
}));
const App = () => {
  const classes = useStyles();
  const token = JSON.parse(localStorage.getItem("accessToken"));
  //const token = localStorage.getItem('accessToken');
  const { isLoggedIn, isSidebarOpen } = useGlobalContext()
  const [ishide, sethide] = useState(false)
  return (
    <ToastProvider autoDismiss={true} placement="bottom-right">
      <MuiPickersUtilsProvider utils={MomentUtils}>
        
        <BrowserRouter>
          {(token || isLoggedIn) && <Navbar />}
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route exact path="/updateprofile" component={UpdateProfile} />
            <Route path="/newpassword/:token" component={NewPassword} />
            <React.Fragment>
              
              <Sidebar />
              <div className={ isSidebarOpen ? `${classes.bodyinactive}` : `${classes.bodyactive}`}>
                <AuthRoute path="/landing" component={Home} />
                <AuthRoute path="/userlisting" component={UserListing} />
                <AuthRoute path="/streams" component={Streams} />
              </div>
             
              {/* <Grid container>
                <Grid item sm={2} xs={2}>
                  <Leftbar />
                </Grid>

                <Grid item sm={10} xs={10}>

                  <AuthRoute path="/userlisting" component={UserListing} />
                  <AuthRoute path="/landing" component={Home} />
                </Grid>
              </Grid> */}



            </React.Fragment>
          </Switch>
        </BrowserRouter>
       
      </MuiPickersUtilsProvider>
      </ToastProvider>
      
    
  );
}

export default App;
