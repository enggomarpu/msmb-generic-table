import React, { useState, useContext, useEffect } from "react";
import { gql, useMutation, Mutation } from "@apollo/client";
import { globalStyles } from '../globalstyles'

//import LoginLink from './LoginLink'

import { FORGOT_PASSWORD } from "../shared/constants";
import { Link, Redirect } from "react-router-dom";
import { Grid, makeStyles, Typography, FormControl, TextField, CircularProgress, Input, OutlinedInput,
    IconButton, InputAdornment, Paper, Button } from "@material-ui/core";
import {  NEW_PASSWORD } from '../shared/constants'
import { VisibilityOutlined, VisibilityOffOutlined } from "@material-ui/icons";
import { useToasts } from 'react-toast-notifications';

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
    }, 
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
    height: 50
  },
  textField2: {
    overflow: 'hidden',

    '& .MuiInputBase-input': {
      padding: '0 30px;',
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1c348a',
    },
    '& .MuiTypography-colorTextSecondary': {
      color: '#000',
      padding: '0px 40px',
    },
    
    
    width: '95%',
    
    margin: '5px 0px',
    height: 48,
  },
  logoImage: {
    margin: '20px',
    '& img': {
      width: 'auto',
      height: '100px'
    }
  },
  iconVisibilityButton:{
    '& .MuiIconButton-root':{
      padding: '10px'
    } 
  }
}));

const NewPassword = (props) => {
  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

  const classes = useStyles();
  const globalClasses = globalStyles()

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [formValid, setFormValid] = useState(false);
  const [passwordErr, setPasswordError] = useState("")
  const [matchPasswordError, setMatchPasswordError] = useState("")

  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  


  const showNewPasswordFunc = () => { setShowNewPassword(!showNewPassword) }
  const showConfirmPasswordFunc = () => { setShowConfirmPassword(!showConfirmPassword) }
  const { addToast } = useToasts()

  const token = props.match.params.token

  const [resetPasswordMutation, { loading, error, data }] = useMutation(NEW_PASSWORD,
    {
      variables: {
        resetPasswordInput: {
          Password: newPassword,
          Token: token,
        },
      },
      onCompleted: () => {
        addToast("Password saved successfully", { appearance: "success" });
        setFormValid(true)
      },
      onError:()=>{
        //Do nothing
      }
    }
  );

  const textHandler = (e) => {
    if (e.target.name === "newpassword") {
      setNewPassword(e.target.value);
      setPasswordError("")
    }
    if (e.target.name === "confirmpassword") {
        setConfirmPassword(e.target.value);
        setPasswordError("")
      }
  };


  

  const SubmitHandler = async (e) => {
    e.preventDefault();
    let pErr = false;
    if (!passwordRegex.test(String(newPassword))) {
      setPasswordError('Password must be at least 8, inlcuding special character, upper, lower case and numbers');
      pErr = true;
    }
   if(newPassword !== confirmPassword){
    setMatchPasswordError("Password do not match")
    pErr = true;
   }
   if (!pErr) {
     setPasswordError("")
     setMatchPasswordError("")
     setNewPassword("")
     setConfirmPassword("")
     //resetPasswordMutation()
     //setFormValid(true);
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
    <div>
      <div className={classes.logoImage}>
        <img
          src="https://apex.oracle.com/pls/apex/markitech/r/92807/files/static/v10/TELUS_2018_EN_RGB_edited.png"
          alt="Telus-Logo"
        />
      </div>
      <Paper className={classes.mainContainer}>
        <Typography className={classes.forgotMessageText}>
        Enter the New Password
        </Typography>

        {formValid ? (  
                <Redirect to="/" />
        ) : (
          <>
            <OutlinedInput
              endAdornment={
                <InputAdornment
                  position="end"
                  className={classes.iconVisibilityButton}
                >
                  <IconButton disableTouchRipple onClick={showNewPasswordFunc}>
                    {!showNewPassword ? (
                      <VisibilityOutlined />
                    ) : (
                      <VisibilityOffOutlined />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              className={classes.textField}
              type={showNewPassword ? "text" : "password"}
              onChange={textHandler}
              value={newPassword}
              name="newpassword"
              placeholder="New Password"
            />

            <Typography
              className="errPadding"
              component="p"
              color="error"
              variant="body2"
            >
              {passwordErr}
            </Typography>

            <OutlinedInput
              endAdornment={
                <InputAdornment
                  position="end"
                  className={classes.iconVisibilityButton}
                >
                  <IconButton
                    disableTouchRipple
                    onClick={showConfirmPasswordFunc}
                  >
                    {!showConfirmPassword ? (
                      <VisibilityOutlined />
                    ) : (
                      <VisibilityOffOutlined />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              className={classes.textField}
              type={showConfirmPassword ? "text" : "password"}
              onChange={textHandler}
              value={confirmPassword}
              name="confirmpassword"
              placeholder="Confirm Password"
            />

            <Typography
              className="errPadding"
              component="p"
              color="error"
              variant="body2"
            >
              {matchPasswordError}
            </Typography>

            <Button
              variant="contained"
              fullWidth
              className={globalClasses.buttonStyle}
              onClick={SubmitHandler}
            >
              Send
            </Button>
          </>
        )}
      </Paper>
    </div>
  );
};

export default NewPassword;
