import React, { useState, useEffect} from 'react';
import { Button, Container, Grid, IconButton, makeStyles, Typography, TableContainer, Table, 
    TableHead, TableRow, TableCell, TableBody, CircularProgress } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import FilterIcon from '@material-ui/icons/Filter';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CustomerSignup from '../components/CustomerSignup';
import AddUser from './AddUser';
import { gql, useMutation, useQuery } from '@apollo/client'
import { globalStyles } from '../globalstyles';
import moment from 'moment'
import { GET_ALL_USERS, GET_USER_ID } from '../shared/constants'




const useStyles = makeStyles((theme) => ({
   
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
      tableBodyBottomBorder:{
        '& .MuiTableCell-root':{
          borderBottom: "none"
        },
        '& .MuiTableCell-body':{
          color: 'black',
          fontSize: '16px',
          paddingTop: 0,
          paddingBottom: 0
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
  

const UserListing = (props) => {


const { loading, data, error } = useQuery(GET_ALL_USERS, {
  skip: false,
  onError:{
    //Do nothiing
  }
});

    const classes = useStyles()
    const globalClasses = globalStyles()
    const [openCustomerSignupDialog, setOpenCustomerSignupDialog] = useState(false)
    const [allUsers, setAllUsers] = useState([])
    const [userId, setUserId] = useState('')
    const [openEditModel, setOpenEditModel] = useState(false)
    const [formType, setFormType] = useState(0)

    useEffect(()=>{
      if(data){
        //console.log('data', data.getAllUserss)
        setAllUsers(data.getAllUserss)
      }
    }, [data])
    return(
        <>
        <div className={globalClasses.container}>
                <header className={globalClasses.header}>
                    <Typography variant="h5">User Details</Typography>
                    <div className={globalClasses.headerButtons}>
                        <IconButton className={globalClasses.iconButtonStyle}>
                            <SortIcon style={{ margin: '0 5px' }} /> Sort
                        </IconButton>
                        <IconButton className={globalClasses.iconButtonStyle}>
                            <FilterIcon style={{ margin: '0 5px' }} /> Filter
                        </IconButton>
                        <Button variant="contained" onClick={() => {setOpenCustomerSignupDialog(true); setFormType(1)}}>Add User</Button>
                    </div>
                </header>
            <TableContainer className={classes.tableContainer}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className={classes.tableHeaderBottomBorder}>
                <TableCell align="left">User Email</TableCell>
                <TableCell align="left">Firstname</TableCell>
                <TableCell align="left">Lastname</TableCell>
                <TableCell align="left">Access Level</TableCell>
                <TableCell align="left">Last Updated</TableCell>
                <TableCell align="left">Edit User</TableCell>
              </TableRow>
            </TableHead>
              <TableBody>
                {loading ? <div className={globalClasses.loadingIndicator}><CircularProgress /></div> :
                    allUsers.length > 0 ? allUsers.map((user) => (
                      <TableRow
                        className={classes.tableBodyBottomBorder}
                        key={user.id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell align="left">{user.Email}</TableCell>
                        <TableCell align="left">{user.Firstname}</TableCell>
                        <TableCell align="left">{user.Lastname}</TableCell>
                        <TableCell align="left">{user.roles === 1 ? 'User' : 'Admin'}</TableCell>
                        <TableCell align="left">{moment(user.UpdatedDate).fromNow()}</TableCell>
                        <TableCell align="left">
                          <IconButton className={classes.iconEditButtonClasses} onClick={() => {
                            setOpenCustomerSignupDialog(true); setUserId(user.id)
                            setFormType(2)}}>
                            <EditIcon  />
                          </IconButton>
                        </TableCell>

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

                      </TableRow>
                    )) : <div>No data from server</div>
                }

              </TableBody>
          </Table>
        </TableContainer>
    </div>
    {openCustomerSignupDialog && <AddUser open={openCustomerSignupDialog} handleClose={() => setOpenCustomerSignupDialog(false)} 
    userId={userId} formType={formType} />}
    </>
    )
}
export default UserListing