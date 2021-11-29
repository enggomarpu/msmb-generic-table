import React, { useState, useEffect} from 'react';
import { Button, Container, Grid, IconButton, makeStyles, Typography, TableContainer, Table, 
    TableHead, TableRow, TableCell, TableBody, CircularProgress } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import FilterIcon from '@material-ui/icons/Filter';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CustomerSignup from '../components/CustomerSignup';
import { globalStyles } from '../globalstyles';
import { GET_ALL_CUSTOMERS, GET_CUSTOMER_BY_ID, UPDATE_CUSTOMER} from '../shared/constants'
import { useQuery } from '@apollo/client';
import moment from 'moment'
import AddStream from '../components/AddStream';
import SearchIcon from '@material-ui/icons/Search';
import StreamLogModel from '../components/StreamLogModel'



const useStyles = makeStyles((theme) => ({
    container: {
      padding: theme.spacing(10, 5, 10, 5),
    '& > *':{
        //padding: '10px 30px'
    }  
    },
    header:{
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid red'
    },
    headerButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(2),
        '& .MuiButton-root': {
          color: '#fff',
          boxShadow: 'none',
          textTransform: 'capitalize',
          padding: '5px 15px',
          backgroundColor: '#000'
        },
        '& .MuiButton-label': {
            fontSize: '12px'
        },
        // '& .MuiButton-root.Mui-disabled': {
        //   backgroundColor: '#ffffff !important',
        // },
        '& > *': {
            margin: '0 10px'
        }
      },
      iconButtonStyle:{
          "&:hover": {
            backgroundColor: 'transparent'
          },
      },
      tableContainer:{
      },
      tableHeaderBottomBorder:{

        '& .MuiTableCell-root':{
          borderBottom: "1px solid black",
        },
        '& .MuiTableCell-head':{
          color: 'black',
          fontSize: '16px',
          paddingTop: 7.5,
          paddingBottom: 7.5
        }
      },
      iconTableEditButton:{
        "&.MuiIconButton-root":{
            padding: 0
          }
      },
      tableBodyBottomBorder:{
        '& .MuiTableCell-root':{
          borderBottom: "none"
        },
        '& .MuiTableCell-body':{
          color: 'black',
          fontSize: '16px',
          paddingTop: 10,
          paddingBottom: 10
        },
        margin: 0
        
      },
      tableFirstColumnText:{
        '&:first-child':{
          color: '#56CCF2',
        },
        width: '25%'
      },
      

  }));

const Streams = () => {

    const classes = useStyles()
    const globalClasses = globalStyles()
    const [openCustomerSignupDialog, setOpenCustomerSignupDialog] = useState(false)
    const [allCustomers, setAllCustomers] = useState([])
    const [formType, setFormType] = useState(1)
    const [customerId, setCustomerId] = useState('')
    const [openLogModel, setOpenLogModel] = useState(false)
    
    const { loading, data, error } = useQuery(GET_ALL_CUSTOMERS, {
      skip: false,
      onError: () => {

      }
    });

    const closeLogModel = () => {
      setOpenLogModel(false)
    }
    
   

    useEffect(()=>{
      if(data){
        console.log('customer data', data)
        setAllCustomers(data.getAllcustomers)
      }
    }, [data])

    return(
        <>
        <div className={classes.container}>

        <header className={globalClasses.header}>
                    <Typography variant="h5">Stream IDs</Typography>
                    <div className={globalClasses.headerButtons}>
                        <IconButton className={globalClasses.iconButtonStyle}>
                            <SortIcon style={{ margin: '0 5px' }} /> Sort
                        </IconButton>
                        <IconButton className={globalClasses.iconButtonStyle}>
                            <FilterIcon style={{ margin: '0 5px' }} /> Filter
                        </IconButton>
                        <Button disableTouchRipple disableFocusRipple>Export to CSV</Button>
                    </div>
                </header>

        <TableContainer className={classes.tableContainer} style={{marginBottom: '100px'}}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className={classes.tableHeaderBottomBorder}>

                <TableCell align="left">Rating Group ID</TableCell>
                <TableCell align="left">Service ID</TableCell>   
                <TableCell>Stream ID</TableCell>
                <TableCell align="left">Stream Name</TableCell>
                <TableCell align="left">Application Name</TableCell>
                <TableCell align="left">Total Customers</TableCell>
                <TableCell align="left">Charge Category</TableCell>
                <TableCell align="left">Audit</TableCell>
                <TableCell align="left"></TableCell>
               
              </TableRow>
            </TableHead>
            <TableBody>

            {loading ? <div className={globalClasses.loadingIndicator}><CircularProgress /></div> :
                    [0, 1, 2].length > 0 ? [0, 1, 2].map((customer) => (
                      <TableRow
                        className={classes.tableBodyBottomBorder}
                        key={customer}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell align="left">03484667</TableCell>
                        <TableCell align="left">034846</TableCell>
                        <TableCell align="left">7686935034846</TableCell>
                        <TableCell align="left">Diganostics</TableCell>
                        <TableCell align="left">Spotify Youtube, Music</TableCell>
                        <TableCell align="left">5</TableCell>
                        <TableCell align="left">39 minutes ago by Chris</TableCell>
                        
                        <TableCell align="left">
                          <IconButton disableRipple disableTouchRipple className={classes.iconTableEditButton}
                            onClick = {() => setOpenLogModel(true)}>
                            <SearchIcon  />
                          </IconButton>
                        </TableCell>

                        <TableCell align="left">
                          <IconButton className={classes.iconTableEditButton} onClick={() => {
                            setOpenCustomerSignupDialog(true); 
                            setFormType(2)}}>
                            <EditIcon  />
                          </IconButton>
                        </TableCell>

                      </TableRow>
                     
                    )) : <div>No data from server</div>
                }
               
            </TableBody>
          </Table>
        </TableContainer>

            <header className={globalClasses.header}>
                    <Typography variant="h5">Associated Customers</Typography>
                    <div className={globalClasses.headerButtons}>
                        <IconButton className={globalClasses.iconButtonStyle}>
                            <SortIcon style={{ margin: '0 5px' }} /> Sort
                        </IconButton>
                        <IconButton className={globalClasses.iconButtonStyle}>
                            <FilterIcon style={{ margin: '0 5px' }} /> Filter
                        </IconButton>
                    </div>
                </header>
            <TableContainer className={classes.tableContainer} style={{paddingBottom: '100px'}}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className={classes.tableHeaderBottomBorder}>
                <TableCell>Customers</TableCell>
                <TableCell align="left">Oppertunities</TableCell>
                <TableCell align="left">APNs</TableCell>
                <TableCell align="left">Traffic Identifiers</TableCell>
                <TableCell align="left">IoT Platform</TableCell>
                <TableCell align="left">Updated</TableCell>
                {/* <TableCell align="left"></TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
            {loading ? <div className={globalClasses.loadingIndicator}><CircularProgress /></div> :
                    [0, 1, 2, 3].length > 0 ? [0, 1, 2, 3].map((customer) => (
                      <TableRow
                        className={classes.tableBodyBottomBorder}
                        key={customer}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell align="left">Six Sense Service Controls Inc.</TableCell>
                        <TableCell align="left">Acquisition of 20 new sims</TableCell>
                        <TableCell align="left">xxxxxxxxx</TableCell>
                        <TableCell align="left">xxxxxxxxx</TableCell>
                        <TableCell align="left">Jasper</TableCell>
                        <TableCell align="left">3 minutes ago by Gary John</TableCell>
                        {/* <TableCell align="left">{moment(customer.UpdatedDate).fromNow()}</TableCell> */}

                        {/* <TableCell align="left">
                          <IconButton className={classes.iconTableEditButton} onClick={() => {
                            setOpenCustomerSignupDialog(true); 
                            setFormType(2)}}>
                            <EditIcon  />
                          </IconButton>
                        </TableCell> */}

                      </TableRow>
                     
                    )) : <div>No data from server</div>
                }


                  {/* <TableCell align="right">
                    <IconButton
                      className={classes.iconEditButtonClasses}
                      //onClick = { () => { setOpenEditDialog(true); setAnnouncementId(annoucement.id) }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      className={classes.iconDeleteButtonClasses}
                      //onClick= {() => { setDeleteDialogOpen(true); setAnnouncementId(annoucement.id) }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell> */}
               
            </TableBody>
          </Table>
        </TableContainer>

        
    </div>
    {openCustomerSignupDialog && <AddStream open={openCustomerSignupDialog} handleClose={() => setOpenCustomerSignupDialog(false)}
        formType={formType} />}
    { openLogModel && <StreamLogModel open={openLogModel} handleClose={closeLogModel} />}
    </>
    )
}
export default Streams