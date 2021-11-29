import React from 'react'
// import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid, TextField, Button, Dialog, DialogContent, DialogActions, DialogTitle } from '@material-ui/core'

const UserDetails = ({ nextStep, handleChange, values, errorValues, handleErrorChange, open }) => {
  
  // for continue event listener
  const Continue = e => {
    let pErr = false
    e.preventDefault();
    // if(values.email === ''){
    //   handleErrorChange('email', 'Email is required')
    // }
    nextStep();
  }

  return (
    <Container component="main" maxWidth="xs">
      <Dialog
        open={open}
        //onClose={handleClose}
        //PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Subscribe
        </DialogTitle>
        <DialogContent>
        <div>
        <Typography  component="h1" variant="h5">
          Sign up
        </Typography>
        <form>
          <Grid container spacing={2}>
              {/* email address */}
              <Grid item xs={12}>
                <TextField 
                  placeholder="Email Address"
                  label="Email Address"
                  onChange={handleChange('email')}
                  defaultValue={values.email}
                  helperText={errorValues.email}
                  // variant="outlined"
                  autoComplete="email"
                  fullWidth
                />
              </Grid>
              <br />
              {/* username */}
              <Grid item xs={12}>
                <TextField 
                  placeholder="Username"
                  label="Username"
                  onChange={handleChange('username')}
                  defaultValue={values.username}
                  // variant="outlined"
                  autoComplete="username"
                  fullWidth
                />
              </Grid>
              <br />
              {/* password */}
              <Grid item xs={12}>
                <TextField 
                  placeholder="Password"
                  label="Password"
                  onChange={handleChange('password')}
                  defaultValue={values.password}
                  // variant="outlined"
                  autoComplete="password"
                  fullWidth
                  type="password"
                />
              </Grid>
          </Grid>
          <br />
          <Button 
            onClick={ Continue }
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Next
          </Button>
        </form>
      </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus 
            //onClick={handleClose}
          >
            Cancel
          </Button>
          <Button 
            //onClick={handleClose}
          >
            Subscribe</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default UserDetails
