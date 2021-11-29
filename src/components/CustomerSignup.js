import React, { useEffect, useState } from 'react'
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
  CircularProgress,
} from '@material-ui/core'
import { DatePicker } from '@material-ui/pickers'
import DateRangeIcon from '@material-ui/icons/DateRange'
import { CUSTOMER_SIGN_UP } from '../shared/constants'
import { useMutation, useQuery } from '@apollo/client'
import moment from 'moment'
import { globalStyles } from '../globalstyles'
import {
  GET_CUSTOMER_BY_ID,
  UPDATE_CUSTOMER,
  GET_ALL_CUSTOMERS,
} from '../shared/constants'
import { useToasts } from 'react-toast-notifications'

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
    padding: theme.spacing(4),
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
  asterikClass: {
    color: 'red',
  },
  errorStyle: {
    //marginBottom: '10px'
  },
}))

const CustomerSignup = (props) => {
  const classes = useStyles()
  const globalClasses = globalStyles()
  const { addToast } = useToasts()
  const steps = ['Customer Information', 'Service Information']

  const [stateValues, setStateValues] = useState({
    customername: '',
    email: '',
    oppertunityname: '',
    oppertunitytype: '',
    businessunit: '',
    servicetype: '',
    ccaccountid: '',
    enteraccountname: '',
    termstartdate: null,
    termenddate: null,
  })
  const [stateErrorValues, setStateErrorValues] = useState({
    customername: '',
    email: '',
    oppertunityname: '',
    oppertunitytype: '',
    businessunit: '',
    servicetype: '',
    ccaccountid: '',
    enteraccountname: '',
    termstartdate: null,
    termenddate: null,
  })
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const [addCustomer, { loading, error, data }] = useMutation(
    CUSTOMER_SIGN_UP,
    {
      variables: {
        createcustomerInput: {
          CustomerName: stateValues.customername,
          Opportunity: stateValues.oppertunityname,
          Email: stateValues.email,
          //OpportunityType = "OPERTUNIRTY1",
          BusinessUnit: stateValues.businessunit,
          //ServiceType = "SERCICETYPE1",
          CCaccountid: stateValues.ccaccountid,
          // Discription
          EnterpriseAccountName: stateValues.enteraccountname,
          TermStarDate: stateValues.termstartdate,
          TermEndDate: stateValues.termenddate,
        },
      },
      refetchQueries: [{ query: GET_ALL_CUSTOMERS }],
      awaitRefetchQueries: true,
      onError: () => {
        //Do nothing
      },
      onCompleted: () => {
        //addToast("User Saved Successfully", { appearance: "success" });
        //history.push("/welcomepage")
        props.handleClose()
      },
    }
  )
  const {
    loading: loadingCustomer,
    data: dataCustomer,
    error: errorCustomer,
  } = useQuery(GET_CUSTOMER_BY_ID, {
    variables: { id: props && props.customerId },
    skip: props.formType === 1,
    onError: () => {
      props.handleClose()
    },
  })

  const [
    updateCustomerMutation,
    { loading: loadingUpdate, data: dataUpdate, error: errorUpdate },
  ] = useMutation(UPDATE_CUSTOMER, {
    onCompleted: () => {
      addToast('User saved Successfully', { appearance: 'success' })
      props.handleClose()
    },
    variables: {
      updatecustomerInput: {
        CustomerName: stateValues.customername,
        Opportunity: stateValues.oppertunityname,
        Email: stateValues.email,
        //OpportunityType = "OPERTUNIRTY1",
        BusinessUnit: stateValues.businessunit,
        //ServiceType = "SERCICETYPE1",
        CCaccountid: stateValues.ccaccountid,
        // Discription
        EnterpriseAccountName: stateValues.enteraccountname,
        TermStarDate: stateValues.termstartdate,
        TermEndDate: stateValues.termenddate,
      },
      id: props && props.customerId,
    },
    //refetchQueries: [{ query: GET_ALL_USERS }],
    //refetchQueries: [{ query: GET_USER_ID, variables: { id: props && props.userId }  }],
    //awaitRefetchQueries: true,
    update: (cache) => {
      cache.evict({
        id: 'ROOT_QUERY',
        field: 'id',
      })
    },
    onError: () => {
      //Do nothing
    },
  })

  useEffect(() => {
    if (props.formType === 2) {
      if (dataCustomer) {
        console.log('data', dataCustomer)
        setStateValues((prevState) => ({
          ...prevState,
          customername: dataCustomer.customerById.CustomerName,
        }))
        setStateValues((prevState) => ({
          ...prevState,
          oppertunityname: dataCustomer.customerById.Opportunity,
        }))
        setStateValues((prevState) => ({
          ...prevState,
          oppertunitytype: dataCustomer.customerById.OpportunityType,
        }))
        setStateValues((prevState) => ({
          ...prevState,
          businessunit: dataCustomer.customerById.BusinessUnit,
        }))
        setStateValues((prevState) => ({
          ...prevState,
          email: dataCustomer.customerById.Email,
        }))
        setStateValues((prevState) => ({
          ...prevState,
          termstartdate:
            dataCustomer.customerById.TermStarDate === null
              ? null
              : new Date(dataCustomer.customerById.TermStarDate),
        }))
        setStateValues((prevState) => ({
          ...prevState,
          termenddate:
            dataCustomer.customerById.TermEndDate === null
              ? null
              : new Date(dataCustomer.customerById.TermEndDate),
        }))
        setStateValues((prevState) => ({
          ...prevState,
          ccaccountid: dataCustomer.customerById.CCaccountid,
        }))
        setStateValues((prevState) => ({
          ...prevState,
          enteraccountname: dataCustomer.customerById.EnterpriseAccountName,
        }))
        setStateValues((prevState) => ({
          ...prevState,
          servicetype: dataCustomer.customerById.ServiceType,
        }))
      }
    }
  }, [dataCustomer])

  const textHandler = (e) => {
    const { name, value } = e.target
    setStateValues({ ...stateValues, [name]: value })
    setStateErrorValues({ ...stateErrorValues, [name]: '' })
  }

  const saveHandler = async () => {
    let pErr = false
    if (!emailRegex.test(String(stateValues.email).toLowerCase())) {
      setStateErrorValues((prevState) => ({
        ...prevState,
        email: 'Please enter valid email',
      }))
      pErr = true
    }
    if (stateValues.customername === '') {
      setStateErrorValues((prevState) => ({
        ...prevState,
        customername: 'Please enter customer name',
      }))
      pErr = true
    }
    if (stateValues.oppertunityname === '') {
      setStateErrorValues((prevState) => ({
        ...prevState,
        oppertunityname: 'Please enter oppertunity name',
      }))
      pErr = true
    }
    if (stateValues.oppertunitytype === '') {
      setStateErrorValues((prevState) => ({
        ...prevState,
        oppertunitytype: 'Please select oppertunity type',
      }))
      pErr = true
    }
    if (stateValues.businessunit === '') {
      setStateErrorValues((prevState) => ({
        ...prevState,
        businessunit: 'Please select business unit',
      }))
      pErr = true
    }
    // if(stateValues.termenddate === null){
    //   setStateErrorValues((prevState) => ({ ...prevState, termenddate: 'Please select end date', }));
    // }
    // if(stateValues.termstartdate === null){
    //   setStateErrorValues((prevState) => ({ ...prevState, termenddate: 'Please select start date', }));
    // }
    // if(!moment(stateValues.termenddate).isAfter(stateValues.termstartdate)){
    //   setStateErrorValues((prevState) => ({ ...prevState, termenddate: 'Please enter end date greater than start date', }));
    //     pErr = true
    // }

    if (!pErr) {
      if (props.formType === 1) {
        await addCustomer()
      }
      if (props.formType === 2) {
        await updateCustomerMutation()
      }
    }

    console.log('statevalues', stateValues)
  }

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
        New Customer Wizard
      </DialogTitle>
      <DialogContent className={classes.mainContainer}>
        {/* <Grid container justify="center">
                  <Stepper activeStep={0} className={classes.stepper}>
                      {steps.map(label => (
                          <Step key={label}>
                              <StepLabel>{label}</StepLabel>
                          </Step>
                      ))}
                  </Stepper>
              </Grid> */}
        <Grid container className={classes.formContainer}>
          <Grid container xs={12} className={classes.gridItem}>
            <Grid item xs={2}>
              <Typography variant='h5'>
                Customer Name<span className={classes.asterikClass}>*</span>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth className={classes.textField}>
                <TextField
                  required
                  name='customername'
                  variant='outlined'
                  placeholder='Enter Customer Name'
                  onChange={textHandler}
                  value={stateValues.customername}
                  inputProps={{
                    maxLength: 500,
                  }}
                />
              </FormControl>
              <Typography
                className={classes.errorStyle}
                component='p'
                color='error'
                variant='body2'
              >
                {stateErrorValues.customername}
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <Typography variant='h5' style={{ marginLeft: '50px' }}>
                Email<span className={classes.asterikClass}>*</span>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth className={classes.textField}>
                <TextField
                  name='email'
                  variant='outlined'
                  placeholder='Enter Email Address'
                  onChange={textHandler}
                  value={stateValues.email}
                  inputProps={{
                    maxLength: 500,
                    readOnly: props.formType === 2 ? true : false,
                  }}
                />
              </FormControl>
              <Typography
                className={classes.errorStyle}
                component='p'
                color='error'
                variant='body2'
              >
                {stateErrorValues.email}
              </Typography>
            </Grid>
          </Grid>

          <Grid container xs={12} className={classes.gridItem}>
            <Grid item xs={2}>
              <Typography variant='h5'>
                Oppertunity<span className={classes.asterikClass}>*</span>
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <FormControl fullWidth className={classes.textField}>
                <TextField
                  name='oppertunityname'
                  variant='outlined'
                  placeholder='Enter Oppertunity Name'
                  onChange={textHandler}
                  value={stateValues.oppertunityname}
                  inputProps={{
                    maxLength: 500,
                  }}
                />
              </FormControl>
              <Typography
                className={classes.errorStyle}
                component='p'
                color='error'
                variant='body2'
              >
                {stateErrorValues.oppertunityname}
              </Typography>
            </Grid>
          </Grid>
          <Grid container xs={12} className={classes.gridItem}>
            <Grid item xs={2}>
              <Typography variant='h5'>
                Oppertunity Type<span className={classes.asterikClass}>*</span>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <FormControl
                variant='outlined'
                fullWidth
                className={classes.textField}
                value={stateValues.oppertunitytype}
              >
                <Select
                  name='oppertunitytype'
                  onChange={textHandler}
                  value={stateValues.oppertunitytype}
                >
                  {['OPERTUNIRTY1', 'OPERTUNIRTY2', 'OPERTUNIRTY3'].map(
                    (dev) => (
                      <MenuItem value={dev}>{dev}</MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
              <Typography
                className={classes.errorStyle}
                component='p'
                color='error'
                variant='body2'
              >
                {stateErrorValues.oppertunitytype}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant='h5' style={{ marginLeft: '50px' }}>
                Business Unit<span className={classes.asterikClass}>*</span>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <FormControl
                variant='outlined'
                fullWidth
                className={classes.textField}
              >
                <Select
                  name='businessunit'
                  value={stateValues.businessunit}
                  onChange={textHandler}
                >
                  {['Type 1', 'Type 2', 'Type 3'].map((dev) => (
                    <MenuItem value={dev}>{dev}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography
                className={classes.errorStyle}
                component='p'
                color='error'
                variant='body2'
              >
                {stateErrorValues.businessunit}
              </Typography>
            </Grid>
          </Grid>

          {/* 2nd Step */}
          <Grid container xs={12} className={classes.gridItem}>
            <Grid item xs={2}>
              <Typography variant='h5'>Service Type</Typography>
            </Grid>
            <Grid item xs={4}>
              <FormControl
                variant='outlined'
                fullWidth
                className={classes.textField}
              >
                <Select
                  name='servicetype'
                  value={stateValues.servicetype}
                  onChange={textHandler}
                >
                  {['SERCICETYPE1', 'SERCICETYPE2', 'SERCICETYPE3'].map(
                    (dev) => (
                      <MenuItem value={dev}>{dev}</MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <Typography variant='h5' style={{ marginLeft: '50px' }}>
                CC Account ID
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth className={classes.textField}>
                <TextField
                  name='ccaccountid'
                  variant='outlined'
                  placeholder='Enter Customer Name'
                  value={stateValues.ccaccountid}
                  onChange={textHandler}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container xs={12} className={classes.gridItem}>
            <Grid item xs={2}>
              <Typography variant='h5'>Enterprise Account Name</Typography>
            </Grid>
            <Grid item xs={10}>
              <FormControl fullWidth className={classes.textField}>
                <TextField
                  name='enteraccountname'
                  variant='outlined'
                  placeholder='Enterprise Account Name'
                  value={stateValues.enteraccountname}
                  onChange={textHandler}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container xs={12} className={classes.gridItem}>
            <Grid item xs={2}>
              <Typography variant='h5'>Term Start Date</Typography>
            </Grid>
            <Grid item xs={4}>
              <FormControl className={classes.textField} fullWidth>
                <DatePicker
                  name='termstartdate'
                  value={stateValues.termstartdate}
                  inputVariant='outlined'
                  onChange={(value, name) => {
                    //setStateValues({...stateValues, [name]: value})
                    setStateValues((prevState) => ({
                      ...prevState,
                      termstartdate: moment(value).format(
                        'YYYY-MM-DDTHH:mm:ss.SSSZ'
                      ),
                    }))
                  }}
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
              <Typography
                className={classes.errorStyle}
                component='p'
                color='error'
                variant='body2'
              >
                {stateErrorValues.termstartdate}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant='h5' style={{ marginLeft: '50px' }}>
                Term End Date
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <FormControl className={classes.textField} fullWidth>
                <DatePicker
                  name='termenddate'
                  value={stateValues.termenddate}
                  inputVariant='outlined'
                  onChange={(value, name) => {
                    setStateValues((prevState) => ({
                      ...prevState,
                      termenddate: moment(value).format(
                        'YYYY-MM-DDTHH:mm:ss.SSSZ'
                      ),
                    }))
                  }}
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
              <Typography
                className={classes.errorStyle}
                component='p'
                color='error'
                variant='body2'
              >
                {stateErrorValues.termenddate}
              </Typography>
            </Grid>
          </Grid>
          {/* 2nd Step End */}
        </Grid>
        {loading && (
          <div className={globalClasses.loadingIndicator}>
            <CircularProgress />
          </div>
        )}
      </DialogContent>

      <DialogActions className={classes.modalFooter}>
        <Button
          autoFocus
          onClick={props.handleClose}
          className={classes.cancelButton}
        >
          Cancel
        </Button>
        <Button className={classes.nextButton} onClick={saveHandler}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CustomerSignup
