import React from 'react'
// import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  makeStyles,
  FormControl,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  InputAdornment,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'
import { DatePicker } from '@material-ui/pickers'
import DateRangeIcon from '@material-ui/icons/DateRange'
const useStyles = makeStyles((theme) => ({
  mainContainer: {},
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2, 5, 5, 5),
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
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(82, 107, 198, 0.32)',
    },
    '& .MuiInputBase-input': {
      fontSize: '16px',
    },
  },
  gridItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: '10px 0',
  },
  stepper: {
    '& .MuiStepLabel-labelContainer span': {
      fontSize: '24px',
    },
    padding: theme.spacing(5, 0, 5, 0),
  },
  dialogTitle: {
    backgroundColor: '#4b286d',
    color: '#fff',
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    '& .MuiButton-root': {
      color: '#fff',
      boxShadow: 'none',
      textTransform: 'capitalize',
      padding: '10px 30px',
    },
    '& .MuiButton-label': {
      fontSize: '16px',
    },
    // '& .MuiButton-root.Mui-disabled': {
    //   backgroundColor: '#ffffff !important',
    // },
  },
  cancelButton: {
    '&.MuiButton-root': {
      backgroundColor: '#BDBDBD',
    },
  },
  nextButton: {
    '&.MuiButton-root': {
      backgroundColor: '#000',
    },
  },
  checkboxContainer: {
    display: 'flex',
    //justifyContent: 'space-between'
  },
  formControl: {
    margin: theme.spacing(3),
  },
  checkboxStyle: {
    transform: 'scale(2)',
    marginRight: '20px',
  },
  checkboxLabel: {
    '& .MuiTypography-body1': {
      fontSize: '1.4rem',
    },
  },
}))

const AddStream = (props) => {
  const classes = useStyles()
  const steps = ['Customer Information', 'Service Information']

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      maxWidth='lg'
      fullWidth
      //PaperComponent={PaperComponent}
      aria-labelledby='draggable-dialog-title'
    >
      <DialogTitle className={classes.dialogTitle}>
        New Stream Wizard
      </DialogTitle>
      <DialogContent className={classes.mainContainer}>
        <Grid container className={classes.formContainer}>
          <Grid container xs={12} className={classes.gridItem}>
            <Grid item xs={3}>
              <Typography variant='h5'>Oppertunity Type</Typography>
            </Grid>
            <Grid item xs={4}>
              <FormControl
                variant='outlined'
                fullWidth
                className={classes.textField}
              >
                <Select
                  name='developer'
                  //value={developer}
                >
                  {[0, 1, 2].map((dev) => (
                    <MenuItem value={dev}>{dev}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <Typography variant='h5' style={{ marginLeft: '20px' }}>
                Business Unit
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <FormControl
                variant='outlined'
                fullWidth
                className={classes.textField}
              >
                <Select
                  name='developer'
                  //value={developer}
                >
                  {[0, 1, 2].map((dev) => (
                    <MenuItem value={dev}>{dev}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container xs={12} className={classes.gridItem}>
            <Grid item xs={3}>
              <Typography variant='h5'>Customer Name</Typography>
            </Grid>
            <Grid item xs={9}>
              <FormControl fullWidth className={classes.textField}>
                <TextField
                  name='visitDetails'
                  variant='outlined'
                  placeholder='Enter Customer Name'
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container xs={12} className={classes.gridItem}>
            <Grid item xs={3}>
              <Typography variant='h5'>Oppertunity</Typography>
            </Grid>
            <Grid item xs={9}>
              <FormControl fullWidth className={classes.textField}>
                <TextField
                  name='visitDetails'
                  variant='outlined'
                  placeholder='Enter Oppertunity Name'
                />
              </FormControl>
            </Grid>
          </Grid>

          {/* 2nd Step */}
          <Grid container xs={12} className={classes.gridItem}>
            <Grid item xs={3}>
              <Typography variant='h5'>Service Type</Typography>
            </Grid>
            <Grid item xs={9} className={classes.checkboxContainer}>
              <FormControl component='fieldset' className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    className={classes.checkboxLabel}
                    control={
                      <Checkbox
                        className={classes.checkboxStyle}
                        name='gilad'
                      />
                    }
                    label='HTTP URL or HTTPS Domain'
                  />
                  <FormControlLabel
                    control={<Checkbox name='jason' />}
                    label='Jason Killian'
                  />
                  <FormControlLabel
                    control={<Checkbox name='antoine' />}
                    label='Antoine Llorca'
                  />
                </FormGroup>
              </FormControl>
              <FormControl
                required
                component='fieldset'
                className={classes.formControl}
              >
                <FormGroup>
                  <FormControlLabel
                    className={classes.checkboxLabel}
                    control={
                      <Checkbox
                        className={classes.checkboxStyle}
                        name='gilad'
                      />
                    }
                    label='HTTP URL or HTTPS Domain'
                  />
                  <FormControlLabel
                    control={<Checkbox name='jason' />}
                    label='Jason Killian'
                  />
                  <FormControlLabel
                    control={<Checkbox name='antoine' />}
                    label='Antoine Llorca'
                  />
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container xs={12} className={classes.gridItem}>
            <Grid item xs={3}>
              <Typography variant='h5'>Enterprise Account Name</Typography>
            </Grid>
            <Grid item xs={9}>
              <FormControl fullWidth className={classes.textField}>
                <TextField
                  name='visitDetails'
                  variant='outlined'
                  placeholder='Enterprise Account Name'
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container xs={12} className={classes.gridItem}>
            <Grid item xs={3}>
              <Typography variant='h5'>Term Start Date</Typography>
            </Grid>
            <Grid item xs={4}>
              <FormControl className={classes.textField} fullWidth>
                <DatePicker
                  name='visitDate'
                  inputVariant='outlined'
                  // style={{ width: '100%'}}
                  //value={visDate}
                  //onChange={handleDate}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position='end'
                        className={classes.arrowIconStyle}
                      >
                        <IconButton>
                          <DateRangeIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <Typography variant='h5' style={{ marginLeft: '20px' }}>
                Term End Date
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <FormControl className={classes.textField} fullWidth>
                <DatePicker
                  name='visitDate'
                  inputVariant='outlined'
                  // style={{ width: '100%'}}
                  //value={visDate}
                  //onChange={handleDate}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position='end'
                        className={classes.arrowIconStyle}
                      >
                        <IconButton>
                          <DateRangeIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
          {/* 2nd Step End */}
        </Grid>
        <Grid className={classes.modalFooter}>
          <Button
            autoFocus
            onClick={props.handleClose}
            className={classes.cancelButton}
          >
            Cancel
          </Button>
          <Button className={classes.nextButton}>Subscribe</Button>
        </Grid>
      </DialogContent>

      <DialogActions></DialogActions>
    </Dialog>
  )
}

export default AddStream
