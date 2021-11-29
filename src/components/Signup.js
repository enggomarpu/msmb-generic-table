import React, { useState } from 'react'
import UserDetails from './UserDetails'
import PersonalDetails from './PersonalDetails'
import Confirmation from './Confirmation'
import Success from './Success'
import { Button, makeStyles } from '@material-ui/core'
import AddStream from './AddStream'
import CustomerSignup from './CustomerSignup'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(20),
  },
}));

const Signup = () => {

  const classes = useStyles()

  const [stateValues, setStateValues] = useState({
    step: 1,
    email: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    country: '',
    levelOfEducation: '',
  });

  const [errorStateValues, setErrorStateValues] = useState({
    step: 1,
    email: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    country: '',
    levelOfEducation: '',
  });
  const [openDialog, setOpenDialog] = useState(false)

  // go back to previous step
  const prevStep = () => {
    const { step } = stateValues;
    console.log('state', stateValues)
    setStateValues((prevState) => ({ ...prevState, step: step - 1, }));
  }

  // proceed to the next step
  const nextStep = () => {
    const { step } = stateValues;
    console.log('state', stateValues)
    setStateValues((prevState) => ({ ...prevState, step: step + 1, }));
  }

  // Handle fields change
  const handleChange = input => e => {
    console.log('hello', input)
    setStateValues((prevState) => ({ ...prevState, [input]: e.target.value, }));
    //setStateValues({...stateValues,  input: e.target.value})
    //setStateValues({ [input]: e.target.value });
  }
  const handleErrorChange = (type, text) => {
    setErrorStateValues((prevState) => ({ ...prevState, [type]: text }));
  }
  const renderComponents = (step) => {
    switch (step) {
      case 1:
        return (
          <UserDetails
            nextStep={nextStep}
            handleChange={handleChange}
            values={stateValues}
            errorValues={errorStateValues}
          />
        )
      case 2:
        return (
          <PersonalDetails
            prevStep={prevStep}
            nextStep={nextStep}
            handleChange={handleChange}
            values={stateValues}
          />
        )
      case 3:
        return (
          <Confirmation
            prevStep={prevStep}
            nextStep={nextStep}
            values={stateValues}
          />
        )
      case 4:
        return (
          <Success />
        )
      default:
      // do nothing
    }
  }


  const { step } = stateValues
  const { email, username, password, firstName, lastName, country, levelOfEducation } = stateValues
  const values = { email, username, password, firstName, lastName, country, levelOfEducation }

  return (
    <div className={classes.container}>
      <Button onClick={() => setOpenDialog(true)}>Open Dialog</Button>
      <div>hello world</div>
      {step === 1 && openDialog && <UserDetails
        nextStep={nextStep}
        handleChange={handleChange}
        values={stateValues}
        open={false}
        errorValues={errorStateValues}
        handleErrorChange={handleErrorChange}
      />}
      {step === 2 && <PersonalDetails prevStep={prevStep} nextStep={nextStep} handleChange={handleChange} values={stateValues} />}
      {step === 3 && <Confirmation prevStep={prevStep} nextStep={nextStep} values={stateValues} />}
      {openDialog && <AddStream open={openDialog} handleClose={() => setOpenDialog(false)} />}
      {/* {openDialog && <CustomerSignup open={openDialog} handleClose={() => setOpenDialog(false)} /> }   */}
    </div>
  )

}


export default Signup