import React, { useState, useEffect } from 'react'
// import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid, TextField, Button, 
    Dialog, DialogContent, DialogActions, DialogTitle, makeStyles, FormControl, Select, MenuItem,  Stepper,
    Step,
    StepLabel,
    IconButton,
    InputAdornment,
    CircularProgress, } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { USER_SIGN_UP, GET_USER_ID, UPDATE_USER, GET_ALL_USERS } from '../shared/constants'
import { globalStyles } from '../globalstyles';
import { useMutation, useQuery } from '@apollo/client';
import { useToasts } from 'react-toast-notifications';



const useStyles = makeStyles((theme) => ({
    mainContainer:{

    }, 
    formContainer:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2, 5, 5, 5)
        // paddingLeft: 100,
        // paddingRight: 100,
        // '& .MuiTextField-root': {
        //   margin: theme.spacing(1),
        //   width: '300px',
        // },
        // '& .MuiButtonBase-root': {
        //   margin: theme.spacing(2),
        // },
    },
    textField: {
        '& .MuiTextField-root': {
          width: '100%',
          margin: 0,
        },
        '& .MuiOutlinedInput-root':{
          backgroundColor: 'rgba(82, 107, 198, 0.32)',
        },
        
      },
    gridItem:{
        flexDirection: 'row', 
        alignItems:"center",
        margin: '10px 0'
    },
    stepper: {
        '& .MuiStepLabel-labelContainer span': {
            fontSize: '24px'
        },
        padding: theme.spacing(5, 0, 5, 0)
      },
    dialogTitle:{
      backgroundColor: '#4b286d',
        color: '#fff'
    },
    modalFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(4),
        '& .MuiButton-root': {
          color: '#fff',
          boxShadow: 'none',
          textTransform: 'capitalize',
          padding: '10px 30px',
        },
        '& .MuiButton-label': {
            fontSize: '16px'
        }
        // '& .MuiButton-root.Mui-disabled': {
        //   backgroundColor: '#ffffff !important',
        // },
      },
    cancelButton: {
        '&.MuiButton-root': {
            backgroundColor: '#BDBDBD',
        }
       
    },
    nextButton: {
        '&.MuiButton-root': {
            backgroundColor: '#000'
        }  
    }, 
    asterikClass: {
        color: 'red'
    }, 
    errorStyle:{
        //marginBottom: '10px'
    }      

})) 

const AddUser = (props) => {
  
   const classes = useStyles()
   const globalClasses = globalStyles()
   const user = JSON.parse(localStorage.getItem("user"));
   const { addToast } = useToasts()

   const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   const phoneRegex = new RegExp(/^[0-9\b]+$/);
   const [stateValues, setStateValues] = useState({
       
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        contactno: '',
       
        // usergroup: '',
        // useraccess: '',
        // userstatus: false
   })
   const [stateValuesError, setStateValuesError] = useState({
       
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    contactno: '',

    // usergroup: '',
    // useraccess: '',
    // userstatus: false
})
const [addUser, { loading, error, data }] = useMutation(USER_SIGN_UP, {

  variables: {
    createUsersInput: {
      Username: stateValues.username,
      Firstname: stateValues.firstname,
      Lastname: stateValues.lastname,
      Email: stateValues.email,
      ContactNo: stateValues.contactno
      //Image: profileImagePath
    },
  },
  onError: () => {
    //Do nothing
  },
  onCompleted: () => {
    addToast("User Created Successfully", { appearance: "success" });
    //history.push("/welcomepage")
    props.handleClose()
  },
  refetchQueries: [{ query: GET_ALL_USERS }],
  awaitRefetchQueries: true,

});

const { loading: loadingUser, data: dataUser, error: errorUser, } = useQuery( GET_USER_ID, {
  variables: { id: props && props.userId },
  skip: props.formType === 1,
  onError: () => {
    props.handleClose()
  }
});

// const [updateUserMutation, { loading:loadingUpdate, data:dataUpdate, error:errorUpdate,  }] = useMutation(UPDATE_USER, {
//   variables: {
//     updateUserInput: {
//       Firstname: stateValues.firstname,
//       Lastname: stateValues.lastname,
//       Email: stateValues.email,
//       ContactNo: stateValues.contactno
//     },
//     id: props && props.userId,
//   },
//   skip: props.formType === 1,
//   refetchQueries: [{ query: GET_ALL_USERS }],
//   awaitRefetchQueries: true,
//   onError: () => {
//     //do nothing
//   },
//   onCompleted: () => {
//     addToast("Annoucement Created Successfully", { appearance: "success" });
//     console.log('complete')
//     //history.push("/adminlanding")
//   },
 
// }
// );

const [updateUserMutation, {  loading:loadingUpdate, data:dataUpdate, error:errorUpdate,  }] = useMutation(UPDATE_USER, {
  onCompleted:()=>{
    addToast("User saved Successfully", { appearance: "success" });
    props.handleClose()
    console.log('completed')
  }, 
  variables:{
    updateUserInput: {
      Firstname: stateValues.firstname,
      Lastname: stateValues.lastname,
      Email: stateValues.email,
      ContactNo: stateValues.contactno
    },
    id: props && props.userId,
  },
  //refetchQueries: [{ query: GET_ALL_USERS }],
  //refetchQueries: [{ query: GET_USER_ID, variables: { id: props && props.userId }  }], 
  //awaitRefetchQueries: true,
  update:(cache)=>{
    cache.evict({ 
      id: "ROOT_QUERY", 
      field: "id"
    })
  },
  onError:()=>{
    //Do nothing
  }
})


useEffect(() => {
  if(props.formType === 2){
    if(dataUser){
      console.log('data', dataUser)
      setStateValues((prevState) => ({ ...prevState, firstname: dataUser.UsersById.Firstname }));
      setStateValues((prevState) => ({ ...prevState, lastname: dataUser.UsersById.Lastname }));
      setStateValues((prevState) => ({ ...prevState, email: dataUser.UsersById.Email }));
      setStateValues((prevState) => ({ ...prevState, contactno: dataUser.UsersById.ContactNo }));
    }
  }
  
  if(dataUpdate){
    console.log('data', dataUpdate)
  }
  
}, [dataUser, dataUpdate])


    const textHandler = (e) => {

        const { name, value } = e.target;
        setStateValues({...stateValues, [name]: value})
        setStateValuesError({...stateValuesError, [name]: ''})
    };

    const saveHandler = async () => {

        let pErr = false
         

        // let pErr = false;
      if (props.formType === 1) {
        if (stateValues.username === "") {
          setStateValuesError((prevState) => ({ ...prevState, username: 'Please enter user name', }));
          pErr = true
        }
      }
        

        if (!emailRegex.test(String(stateValues.email).toLowerCase())) {
            setStateValuesError((prevState) => ({ ...prevState, email: 'Please enter valid email', }));
            pErr = true;
        }
      //   if (!phoneRegex.test(String(stateValues.contactno))) {
      //     setStateValuesError((prevState) => ({ ...prevState, contactno: 'Please enter contact no', }));
      //     pErr = true
      // }
      // if (stateValues.firstname === "") {
      //     setStateValuesError((prevState) => ({ ...prevState, firstname: 'Please enter fistname', }));
      //     pErr = true
      // }
      // if (!stateValues.lastname) {
      //     setStateValuesError((prevState) => ({ ...prevState, lastname: 'Please enter lastname', }));
      //     pErr = true
      // }
    
       
    
       
            if(props && props.userId){
              if (stateValues.email && !pErr){
                console.log('update')
                 await updateUserMutation()
              }
             
            }

            if(!(props && props.userId)){
              if (stateValues.username && stateValues.email && !pErr){
                console.log('create')
                 await addUser()
              }
             
            }

            
                      
            
        
        //console.log('stateValues', stateValues, stateValuesError)
        
        // if (stateValues.usergroup === "") {
        //     setStateValuesError((prevState) => ({ ...prevState, usergroup: 'Please enter user group', }));
        //     pErr = true
        // }
        // if (stateValues.useraccess === "") {
        //     setStateValuesError((prevState) => ({ ...prevState, useraccess: 'Please enter user access', }));
        //     pErr = true
        // }
        // if (!stateValues.userstatus) {
        //     setStateValuesError((prevState) => ({ ...prevState, userstatus: 'Please enter user status', }));
        //     pErr = true
        // }




      }

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      maxWidth="lg"
      fullWidth
      //PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle className={classes.dialogTitle}>
        <Typography variant="h5">New User Wizard</Typography>
      </DialogTitle>
      <DialogContent className={classes.mainContainer}>

       


        
        <Grid container className={classes.formContainer}>
        <Grid container xs={12} className={classes.gridItem}>
            <Grid item xs={3}>
              <Typography variant="h5">FirstName</Typography>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth className={classes.textField}>
                <TextField
                  name="firstname"
                  variant="outlined"
                  placeholder="Enter Firstname"
                  onChange={textHandler}
                  //size="small"
                  value={stateValues.firstname}
                  inputProps={{
                    maxLength: 500
                }}
                />
              </FormControl>
              {/* <Typography
                className={classes.errorStyle}
                component="p"
                color="error"
                variant="body2"
              >
               {stateValuesError.lastname}
              </Typography> */}
            </Grid>
           
            <Grid item xs={3}>
              <Typography variant="h5" style={{ marginLeft: "20px" }}>LastName</Typography>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth className={classes.textField}>
                <TextField
                  name="lastname"
                  variant="outlined"
                  placeholder="Enter Lastanme"
                  onChange={textHandler}
                  value={stateValues.lastname}
                  inputProps={{
                      maxLength: 500
                  }}
                />
              </FormControl>
              {/* <Typography
                className={classes.errorStyle}
                component="p"
                color="error"
                variant="body2"
              >
                {stateValuesError.lastname}
              </Typography> */}
            </Grid>
           
          </Grid>    
         
        { props.formType === 1 && <Grid container xs={12} className={classes.gridItem}>
            <Grid item xs={3}>
              <Typography variant="h5">User Name<span className={classes.asterikClass}>*</span></Typography>
            </Grid>
            <Grid item xs={9}>
              <FormControl fullWidth className={classes.textField}>
                <TextField
                  name="username"
                  variant="outlined"
                  placeholder="User Name"
                  onChange={textHandler}
                  value={stateValues.username}
                  inputProps={{
                    maxLength: 500
                }}
                />
              </FormControl>
              <Typography
                className={classes.errorStyle}
                component="p"
                color="error"
                variant="body2"
              >
                {stateValuesError.username}
              </Typography>
            </Grid>
          </Grid> 
          }

          <Grid container xs={12} className={classes.gridItem}>
            <Grid item xs={3}>
              <Typography variant="h5">Email<span className={classes.asterikClass}>*</span></Typography>
            </Grid>
            <Grid item xs={9}>
              <FormControl fullWidth className={classes.textField}>
                <TextField
                  name="email"
                  variant="outlined"
                  placeholder="example@example.com"
                  onChange={textHandler}
                  value={stateValues.email}
                  inputProps={{
                    maxLength: 500,
                    readOnly: props.formType === 2 ? true : false
                }}
                />
              </FormControl>
              <Typography
                className={classes.errorStyle}
                component="p"
                color="error"
                variant="body2"
              >
                {stateValuesError.email}
              </Typography>
            </Grid>
          </Grid>

          <Grid container xs={12} className={classes.gridItem}>
            <Grid item xs={3}>
              <Typography variant="h5">Contact No</Typography>
            </Grid>
            <Grid item xs={9}>
              <FormControl fullWidth className={classes.textField}>
                <TextField
                  name="contactno"
                  variant="outlined"
                  placeholder="12345678"
                  onChange={textHandler}
                  value={stateValues.contactno}
                  inputProps={{
                    maxLength: 500
                }}
                />
              </FormControl>
              {/* <Typography
                className={classes.errorStyle}
                component="p"
                color="error"
                variant="body2"
              >
                {stateValuesError.contactno}
              </Typography> */}
            </Grid>
          </Grid>
         {/* Not reuquired till now */}

          {/* <Grid container xs={12} className={classes.gridItem}>
            <Grid item xs={3}>
              <Typography variant="h5">User Group<span className={classes.asterikClass}>*</span></Typography>
            </Grid>
            <Grid item xs={9}>
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.textField}
                
              >
                <Select
                  name="usergroup"
                  onChange={textHandler}
                  value={stateValues.usergroup}
                >
                  {['Tech Strategy Team', 'Business Team'].map((dev) => (
                    <MenuItem value={dev}>{dev}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography
                className={classes.errorStyle}
                component="p"
                color="error"
                variant="body2"
              >
                {stateValuesError.usergroup}
              </Typography>
            </Grid>
          </Grid> */}

         
          {/* <Grid container xs={12} className={classes.gridItem}>
            <Grid item xs={3}>
              <Typography variant="h5">Access Level</Typography>
            </Grid>
            <Grid item xs={9}>
              <FormControl
                variant="outlined"
                fullWidth
                
                className={classes.textField}
              >
                <Select
                 name="useraccess"
                  value={stateValues.useraccess}
                  onChange={textHandler}
                >
                  {['Administrator', 'User', 'Viewer'].map((dev) => (
                    <MenuItem value={dev}>{dev}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography
                className={classes.errorStyle}
                component="p"
                color="error"
                variant="body2"
              >
                {stateValuesError.useraccess}
              </Typography>
            </Grid>
          </Grid> */}


          {/* <Grid container xs={12} className={classes.gridItem}>
            <Grid item xs={3}>
              <Typography variant="h5">Status<span className={classes.asterikClass}>*</span></Typography>
            </Grid>
            <Grid item xs={9}>
           
            
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.textField}
              >
                <Select
                  name="userstatus"
                  value={stateValues.stateValues}
                  onChange={textHandler}
                >
                  {[{id: 1, status: 'Active'}, {id: 0, status: 'In Active'}].map((dev) => (
                    <MenuItem value={dev.id}>{dev.status}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography
                className={classes.errorStyle}
                component="p"
                color="error"
                variant="body2"
              >
                {stateValuesError.userstatus}
              </Typography>
           
            </Grid>
          </Grid> */}

        </Grid>
        {(loading || loadingUser || loadingUpdate) && <div className={globalClasses.loadingIndicator}><CircularProgress /></div>}
      </DialogContent>

      <DialogActions className={classes.modalFooter}>
        <Button
          autoFocus
          onClick={props.handleClose}
          className={classes.cancelButton}
        >
          Cancel
        </Button>
        <Button className={classes.nextButton} onClick={saveHandler}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddUser
