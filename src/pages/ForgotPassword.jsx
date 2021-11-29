import React, { useState, useContext, useEffect } from "react";
import { gql, useMutation, Mutation } from "@apollo/client";
import { globalStyles } from '../globalstyles'

//import LoginLink from './LoginLink'
import { Link } from "react-router-dom";
import {
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
  Button,
  TextField,
  Paper,
} from "@material-ui/core";
import { FORGOT_PASSWORD } from "../shared/constants";

const useStyles = makeStyles(() => ({
  inputContainer: {
    marginBottom: "50px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& .MuiGrid-grid-md-6": {
      marginTop: "150px",
    },
  },
  mainContainer:{
    maxWidth: "650px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    marginTop: "30px",
    '& > *':{
        marginBottom: '10px'
    }
  },
  successMessage: {
    color: "#61FF00",
    textAlign: "center",
  },
  successMessageDetail: {

    textAlign: "center",
  },
  forgotMessageText: {
    //marginTop: '30px'
    
    textAlign: "center",
    marginBottom: "10px",
  },
  loadingIndicator: {
    "& .MuiCircularProgress-colorPrimary": {
      color: "red",
    },
    position: "fixed",
    top: "50%",
    left: "50%",
    color: "white",
    MozTransform: "translateX(-50%) translateY(-50%)",
    WebkitTransform: "translateX(-50%) translateY(-50%)",
    transform: "translateX(-50%) translateY(-50%)",
  },
  btnContainer: {
    textAlign: "center",
    margin: "20px",
  },
  btnBackground: {
    backgroundColor: "white",
  },
  textField: {
    "& .MuiInputBase-input": {
        paddingLeft: '10px',   
    },
    "& .MuiTypography-colorTextSecondary": {
        color: "#000",
        padding: "0px 40px",
    },
    
    '& .MuiOutlinedInput-adornedStart': {
        paddingLeft: '10px',
        paddingRight: '10px'
    },
    width: "100%",
    // height: 50
  },
  logoImage: {
    margin: '20px',
    '& img': {
      width: 'auto',
      height: '100px'
    }
   
  }
}));

const ForgotPassword = (props) => {
  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const classes = useStyles();
  const globalClasses = globalStyles()

  const [loginEmail, setLoginEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [apiSuccess, setApiSuccess] = useState(false);

  const textHandler = (e) => {
    if (e.target.name === "loginEmail") {
      setLoginEmail(e.target.value);
    }
  };

  const [forgotPasswordMutation, { loading, error, data }] = useMutation(
    FORGOT_PASSWORD,
    {
      variables: {
        forgetPasswordInput: {
          Email: loginEmail,
        },
      },
      onCompleted: () => {
        setEmailErr("");
        setApiSuccess(true);
      },
      onError: () => {
        //do nothing
      },
    }
  );

  const SubmitHandler = async (e) => {
    console.log("loginEmail", loginEmail);
    e.preventDefault();
    let pErr = false;
    if (!emailRegex.test(String(loginEmail).toLowerCase())) {
      setEmailErr("Please enter valid email address");
      pErr = true;
    }
    if (!(loginEmail.length > 0)) {
      setEmailErr("This field is required");
      pErr = true;
    }
    if (!pErr) {
      //setFormValid(true);
      await forgotPasswordMutation();
    }
  };
  useEffect(() => {
    if (data) {
      //setApiSuccess(true)
    }
  }, [data]);

  if (loading)
    return (
      <div className={classes.loadingIndicator}>
        <CircularProgress />
      </div>
    );
  // if (error) return <p>Error :(</p>;

  return (
    <div style={{paddingTop: '70px'}}>
       <div className={classes.logoImage}>
            <img src="https://apex.oracle.com/pls/apex/markitech/r/92807/files/static/v10/TELUS_2018_EN_RGB_edited.png" 
             alt="Telus-Logo" />
          </div>
      <Paper className={classes.mainContainer}>
        <Typography className={classes.forgotMessageText}>
          Forgot Password
        </Typography>

        {apiSuccess ? (
          <div>
            <Typography className={classes.successMessage}>
              Success!!!
            </Typography>
            <Typography className={classes.successMessageDetail}>
              New password link is sent to your email, please click that link to
              generate new password.
            </Typography>

            <div className={classes.btnContainer}>
              <Button
                variant="outlined"
                className={classes.btnBackground}
                onClick={() => {
                  props.history.push('/')
                }}
              >
                Back to Login
              </Button>
            </div>
          </div>
        ) : (
          <>
            <TextField
              className={classes.textField}
              variant="outlined"
              onChange={textHandler}
              value={loginEmail}
              size="small"
              name="loginEmail"
              placeholder="Email"
            />
            <Typography component="p" color="error" variant="body2">
              {emailErr}
            </Typography>

           <Button variant="contained" fullWidth className={globalClasses.buttonStyle}
           onClick={SubmitHandler}>Send</Button>
          </>
        )}
      </Paper>
    </div>
  );
};

export default ForgotPassword;
