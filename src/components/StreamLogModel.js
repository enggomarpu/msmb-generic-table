import React, { useEffect, useState } from 'react'
// import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { globalStyles } from '../globalstyles'; 
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


import { useToasts } from 'react-toast-notifications'
import { Button, TableBody, Dialog, DialogActions, DialogTitle, TableCell, TableContainer, TableHead, makeStyles, Table, TableRow, CircularProgress, DialogContent, Typography, IconButton} from '@material-ui/core'




const useStyles = makeStyles((theme) => ({
  mainContainer: {},
  tableContainer: {},
  tableHeaderBottomBorder: {
    "& .MuiTableCell-root": {
      //borderBottom: "1px solid black",
    },
    "& .MuiTableCell-head": {
      color: "black",
      fontSize: "16px",
      fontWeight: 600,
      paddingTop: 7.5,
      paddingBottom: 7.5,
    },
  },
  tableBodyBottomBorder: {
    "& .MuiTableCell-root": {
      borderBottom: "none",
    },
    "& .MuiTableCell-body": {
      color: "black",
      fontSize: "16px",
      paddingTop: 10,
      paddingBottom: 10,
    },
    margin: 0,
  },

  dialogTitle: {

    // '& .MuiDialogTitle-root':{
    //   flex: '1 1 auto'
    // },
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#4b286d",
    color: "#fff",
    "& .MuiIconButton-root": {
      //backgroundColor: "white",
      color: 'white',
      padding: 0
    },
    '& .MuiSvgIcon-root':{
      fontSize: 40
    }
  },
  modalFooter: {

    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(4),
    "& .MuiButton-root": {
      color: "#fff",
      boxShadow: "none",
      textTransform: "capitalize",
      padding: "10px 30px",
    },
    "& .MuiButton-label": {
      fontSize: "16px",
    },
    // '& .MuiButton-root.Mui-disabled': {
    //   backgroundColor: '#ffffff !important',
    // },
  },
  cancelButton: {
    "&.MuiButton-root": {
      backgroundColor: "#BDBDBD",
    },
  },
  nextButton: {
    "&.MuiButton-root": {
      backgroundColor: "#000",
    },
  },
  asterikClass: {
    color: "red",
  },
  errorStyle: {
    //marginBottom: '10px'
  },
})); 

const StreamLogModel = (props) => {
  
   const classes = useStyles()
   const globalClasses = globalStyles();
   const { addToast } = useToasts()
 
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      maxWidth="lg"
      fullWidth
      //PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle disableTypography className={classes.dialogTitle}>
        <Typography variant="h5">Stream Master Audit</Typography>
        <IconButton
          disableRipple
          disableTouchRipple
          onClick={props.handleClose}
          fontSize="large"
        >
          <HighlightOffIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.mainContainer}>
        <TableContainer className={classes.tableContainer}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className={classes.tableHeaderBottomBorder}>
                <TableCell>Stream ID</TableCell>
                <TableCell align="left">Stream Name</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Type</TableCell>
                <TableCell align="right">User</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {false ? (
                <div className={globalClasses.loadingIndicator}>
                  <CircularProgress />
                </div>
              ) : [0, 1, 2].length > 0 ? (
                [0, 1, 2].map((customer) => (
                  <TableRow
                    className={classes.tableBodyBottomBorder}
                    key={customer}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">7686935034846</TableCell>
                    <TableCell align="left">Catch All</TableCell>
                    <TableCell align="left">30-Jun-2021 08:03 AM</TableCell>
                    <TableCell align="left">Updated</TableCell>
                    <TableCell align="right">fufanezu@boximail.com</TableCell>
                  </TableRow>
                ))
              ) : (
                <div>No data from server</div>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>

      <DialogActions className={classes.modalFooter}>
        <Button
          autoFocus
          onClick={props.handleClose}
          className={classes.cancelButton}
        >
          Cancel
        </Button>
        {/* <Button className={classes.nextButton} onClick={saveHandler}>Submit</Button> */}
      </DialogActions>
    </Dialog>
  );
}

export default StreamLogModel;
