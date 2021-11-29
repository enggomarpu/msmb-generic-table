import React, { useState, useEffect } from "react";
import Controls from "../components/controls/Control";
import { Avatar, Grid, makeStyles, Paper, Typography } from "@material-ui/core";

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

const initialFValues = {
  id: 0,
  fullName: "",
  email: "",
  mobile: "",
  city: "",
  gender: "male",
  departmentId: "",
  hireDate: new Date(),
  isPermanent: false,
};

const useStyles = makeStyles((theme) => ({
  appMain: {
    paddingLeft: "320px",
    width: "100%",
  },
  pageContent: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
  },
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
  sideAvatar: {
    flex: "1 1 auto",
    textAlign: "center",
    padding: '10px',
    margin: '0 20px'
  },
  logoImage: {
    margin: '20px',
    '& img': {
      width: 'auto',
      height: '100px'
    }
  },
}));
const UpdateProfile = () => {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrorValues] = useState(initialFValues);
  const classes = useStyles();

  const handleInputChange = () => { };
  return (
    <div>
      <div className={classes.pageContent}>
      
      <div className={classes.logoImage}>
        <img
          src="https://apex.oracle.com/pls/apex/markitech/r/92807/files/static/v10/TELUS_2018_EN_RGB_edited.png"
          alt="Telus-Logo"
        />
      </div>

        <div className={classes.root}>
          <Grid container>

            <Paper className={classes.sideAvatar}>
              <Grid item xs={4}>
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  style={{ width: "90px", height: "90px" }}
                />
                <Typography variant="h5">Yahya Hussainni</Typography>
                <Typography variant="body2">enggomarpu@gmail.com</Typography>
              </Grid>
            </Paper>

            <Grid item xs={8}>
              <Paper style={{padding: '20px 20px'}}>
                <Grid container>
                  <Grid item xs={6}>
                    <Controls.Input
                      name="fullName"
                      label="Full Name"
                      value={values.fullName}
                      onChange={handleInputChange}
                      error={errors.fullName}
                    />
                    <Controls.Input
                      label="Email"
                      name="email"
                      value={values.email}
                      onChange={handleInputChange}
                      error={errors.email}
                    />
                    <Controls.Input
                      label="Mobile"
                      name="mobile"
                      value={values.mobile}
                      onChange={handleInputChange}
                      error={errors.mobile}
                    />
                    <Controls.Input
                      label="City"
                      name="city"
                      value={values.city}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controls.RadioGroup
                      name="gender"
                      label="Gender"
                      value={values.gender}
                      onChange={handleInputChange}
                      items={genderItems}
                    />
                    <Controls.Select
                      name="departmentId"
                      label="Department"
                      value={values.departmentId}
                      onChange={handleInputChange}
                      options={[1, 2, 3]}
                      error={errors.departmentId}
                    />
                    <Controls.DatePicker
                      name="hireDate"
                      label="Hire Date"
                      value={values.hireDate}
                      onChange={handleInputChange}
                    />
                    <Controls.Checkbox
                      name="isPermanent"
                      label="Permanent Employee"
                      value={values.isPermanent}
                      onChange={handleInputChange}
                    />

                    <div>
                      <Controls.Button type="submit" text="Submit" />
                      <Controls.Button
                        text="Reset"
                        color="default"
                      //onClick={resetForm}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

          </Grid>
        </div>
      </div>
    </div>
  );
};
export default UpdateProfile;
