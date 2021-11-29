import React, { useState, useEffect } from 'react'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import {
  Grid,
  Typography,
  Button,
  TextField,
  makeStyles,
  Divider,
  Paper,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from '@material-ui/core'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import { gql, useMutation, Mutation } from '@apollo/client'
import { Link, useHistory } from 'react-router-dom'
import { globalStyles } from '../globalstyles'
import { useGlobalContext } from '../context/globalContext'

const useStyles = makeStyles({
  mainContainer: {
    position: 'relative',
    maxWidth: '100%',
  },

  paperStyle: {
    // position: "fixed",
    // top: "50%",
    // left: "50%",
    // MozTransform: "translateX(-50%) translateY(-50%)",
    // WebkitTransform: "translateX(-50%) translateY(-50%)",
    // transform: "translateX(-50%) translateY(-50%)",
    // padding: "10px 20px",
    // //width: '60%'

    maxWidth: '650px',
    margin: '0 auto',
    //display: "flex",
    //flexDirection: "column",
    //background: "#ddd",
    padding: '20px',
    marginTop: '30px',
    '& > *': {
      marginBottom: '10px',
    },
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',

    '& > *': {
      margin: '5px 0',
    },
  },
  headerText: {
    padding: '20px 20px',
  },
  textField: {
    //overflow: "hidden",

    '& .MuiInputBase-input': {
      paddingLeft: '10px',
      //fontSize: "20px",
      //fontWeight: "bold",
      //color: "#1c348a",
    },
    '& .MuiTypography-colorTextSecondary': {
      color: '#000',
      padding: '0px 40px',
    },
    //background: "#FFFFFF",
    //borderRadius: 25,
    width: '100%',
    //borderBottom: "0px",
    //margin: "5px 0px",
    //height: 45,
    '& .MuiOutlinedInput-adornedStart': {
      paddingLeft: '10px',
      paddingRight: '10px',
    },
  },

  buttonStyle: {
    '&.MuiButton-root': {
      color: '#fff',
      boxShadow: 'none',
      textTransform: 'capitalize',
      padding: '10px 15px',
      backgroundColor: 'green',
    },
    '&.MuiIconButton-root': {
      fontSize: '1rem',
    },
  },
  logoImage: {
    margin: '20px',
    '& img': {
      width: 'auto',
      height: '100px',
    },
  },
})
const Login = (props) => {
  const classes = useStyles()
  const globalClasses = globalStyles()
  const { setLogin } = useGlobalContext()
  const [stateValues, setStateValues] = useState({
    username: '',
    password: '',
  })
  const [stateErrorValues, setStateErrorValues] = useState({
    username: '',
    password: '',
  })

  const history = useHistory()
  const user = JSON.parse(localStorage.getItem('user'))
  const accessToken = JSON.parse(localStorage.getItem('accessToken'))

  const SIGN_IN = gql`
    mutation signIn($usersInput: SignInUsersInput!) {
      signIn(usersInput: $usersInput) {
        id
        accessToken
        Firstname
        Lastname
        Email
        ContactNo
        Message
      }
    }
  `
  const [createLink, { loading, error, data }] = useMutation(SIGN_IN, {
    variables: {
      usersInput: {
        Username: stateValues.username,
        Password: stateValues.password,
      },
    },
    onError: ({ graphQLErrors, networkError }) => {
      console.log('errors', graphQLErrors, networkError)
      graphQLErrors.map((error) => {
        // addToast(error.message.message, { appearance: "error" });
        //console.log("errors", error.networkError.result.errors);
      })
    },
    onCompleted: (data) => {
      localStorage.setItem(
        'accessToken',
        JSON.stringify(data.signIn.accessToken)
      )
      localStorage.setItem('user', JSON.stringify(data.signIn))
      setLogin()
      props.history.push('/landing')
    },
    // onError: (e) => {
    //   console.log('hello', e.networkError )
    //   //addToast(error.networkError.result.errors, { appearance: "error" });
    // }
  })
  const changeHandler = (e) => {
    const { name, value } = e.target
    setStateValues({ ...stateValues, [name]: value })
    setStateErrorValues({ stateErrorValues, [name]: '' })
  }

  const saveHandler = async () => {
    let pErr = false

    if (stateValues.username === '') {
      setStateErrorValues((prevState) => ({
        ...prevState,
        username: 'Please enter username',
      }))
      pErr = true
    }
    if (stateValues.password === '') {
      setStateErrorValues((prevState) => ({
        ...prevState,
        password: 'Please enter password',
      }))
      pErr = true
    }

    if (!pErr) {
      await createLink()
    }
  }

  useEffect(() => {
    if (accessToken) {
      history.push('/landing')
    }
  }, [])

  return (
    <div className='mainContainer'>
      <div className='header-logo'>
        <img
          src='https://apex.oracle.com/pls/apex/markitech/r/92807/files/static/v10/TELUS_2018_EN_RGB_edited.png'
          alt='Telus-Logo'
        />
      </div>

      <div className='page-body'>
        <div className='login-header'>
          <Typography variant='h5' className={classes.headerText}>
            Your TELUS MSMB Login
          </Typography>
        </div>

        <Paper className='login-container'>
          <div className='row-container colum-2'>
            <div className='colum'>
              <Typography variant='h5'>Log in</Typography>
              <Grid className={classes.formContainer}>
                <label class='form-label' htmlFor='email'>
                  Email/Username
                </label>
                <TextField
                  InputProps={{
                    startAdornment: <InputAdornment></InputAdornment>,
                  }}
                  className={classes.textField}
                  variant='outlined'
                  onChange={changeHandler}
                  value={stateValues.username}
                  size='small'
                  name='username'
                  placeholder='Email'
                  id='email'
                />
                <Typography
                  className={classes.errorStyle}
                  component='p'
                  color='error'
                  variant='body2'
                >
                  {stateErrorValues.username}
                </Typography>

                <label class='form-label' htmlFor='password'>
                  Password <Link to='/forgotpassword'>Forgot Password</Link>
                </label>
                <TextField
                  InputProps={{
                    startAdornment: <InputAdornment></InputAdornment>,
                  }}
                  className={classes.textField}
                  variant='outlined'
                  type='password'
                  onChange={changeHandler}
                  value={stateValues.password}
                  size='small'
                  name='password'
                  placeholder='Password'
                />

                <Typography
                  className={classes.errorStyle}
                  component='p'
                  color='error'
                  variant='body2'
                >
                  {stateErrorValues.password}
                </Typography>

                <FormControlLabel
                  className='checkbox'
                  control={<Checkbox defaultChecked />}
                  label='Remember Username'
                />

                <Button
                  variant='contained'
                  onClick={saveHandler}
                  className='btn-success'
                >
                  SignIn
                </Button>
              </Grid>
            </div>
            <div className='colum'>
              <div className='login-bg'>
                <Typography variant='h4'>
                  Top tips to improve your safety online
                </Typography>
                <label class='form-label mb-15'>
                  <Link to='/'>Learn more</Link>
                </label>

                <label class='form-label mb-15'>
                  <Link to='/'>Need help?</Link>
                </label>
              </div>
            </div>
          </div>
        </Paper>
        {loading && (
          <div className={globalClasses.loadingIndicator}>
            <CircularProgress />
          </div>
        )}
      </div>

      <footer className='footer'>
        <p>This is a secure page</p>
        <div className='footer-logo'>logo</div>
        <p>
          <small>@2021 Probase.co.uk</small>
        </p>
      </footer>
    </div>
  )
}

export default Login
