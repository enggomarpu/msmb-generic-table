import React, { useState, useEffect } from 'react'
import {
  Button,
  Container,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Radio,
  Checkbox,
  TablePagination,
} from '@material-ui/core'
import SortIcon from '@material-ui/icons/Sort'
import FilterIcon from '@material-ui/icons/Filter'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import CustomerSignup from '../components/CustomerSignup'
import { globalStyles } from '../globalstyles'
import {
  GET_ALL_CUSTOMERS,
  GET_CUSTOMER_BY_ID,
  UPDATE_CUSTOMER,
} from '../shared/constants'
import { useQuery } from '@apollo/client'
import moment from 'moment'
import SearchIcon from '@material-ui/icons/Search'
import CustomerLogModel from '../components/CustomerLogModel'
import CustomerStreamLogModel from '../components/CustomerStreamLogModel'
import useTable from '../components/table/useTable'
import TblHead from '../components/table/TblHead'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(10, 5, 10, 5),
    '& > *': {
      //padding: '10px 30px'
    },
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '0 solid #ddd',
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
      backgroundColor: '#000',
    },
    '& .MuiButton-label': {
      fontSize: '12px',
    },
    // '& .MuiButton-root.Mui-disabled': {
    //   backgroundColor: '#ffffff !important',
    // },
    '& > *': {
      margin: '0 10px',
    },
  },
  iconButtonStyle: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },

  tableFirstColumnText: {
    '&:first-child': {
      color: '#56CCF2',
    },
    width: '25%',
  },
}))

const Home = () => {
  const classes = useStyles()
  const globalClasses = globalStyles()
  const [openCustomerSignupDialog, setOpenCustomerSignupDialog] = useState(false)
  const [allCustomers, setAllCustomers] = useState([])
  const [formType, setFormType] = useState(1)
  const [customerId, setCustomerId] = useState('')
  const [customerLog, setCustomerLog] = useState(false)
  const [customerStreamLog, setCustomerStreamLog] = useState(false)
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const headCells = [
    { id: 1, label: 'Customers'},
    { id: 2, label: 'Opportunities'},
    { id: 3, label: 'Opportunity Type'},
    { id: 4, label: 'Business Unit'},
    { id: 5, label: 'IoT Platform'},
    { id: 6, label: 'Updated'},
    { id: 7, label: 'Audit'},
    { id: 8, label: 'Updated'}
  ]
  const { TblContainer } = useTable()

  const closeCustomerLog = () => {
    setCustomerLog(false)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log('event', event)
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const closeCustomerStreamLog = () => {
    setCustomerStreamLog(false)
  }

  const { loading, data, error } = useQuery(GET_ALL_CUSTOMERS, {
    skip: false,
    onError: () => {},
  })

  useEffect(() => {
    if (data) {
      console.log('customer data', data)
      setAllCustomers(data.getAllcustomers)
    }
  }, [data])

  const handleClick = (e, id) => {
    // console.log('e', e)
    // if(customerId ){
    //   setCustomerId("")
    // }
    // if(!customerId){
    //   setCustomerId(id)
    // }
    setCustomerId(id)
  }
  return (
    <>
      <div className={classes.container}>
        <header className={globalClasses.header}>
          <Typography variant='h4'>Customer</Typography>
          <div className={globalClasses.headerButtons}>
            <IconButton className={globalClasses.iconButtonStyle}>
              <SortIcon style={{ margin: '0 5px' }} /> Sort
            </IconButton>
            <IconButton className={globalClasses.iconButtonStyle}>
              <FilterIcon style={{ margin: '0 5px' }} /> Filter
            </IconButton>
            <Button disableTouchRipple disableFocusRipple>
              Export to CSV
            </Button>
            <Button
              autoFocus
              disableTouchRipple
              disableFocusRipple
              onClick={() => {
                setOpenCustomerSignupDialog(true)
                setFormType(1)
              }}
            >
              Customer Wizard
            </Button>
          </div>
        </header>
        <TblContainer>
          <TblHead headCells = {headCells} />
          <TableBody>
          {loading ? (
                <div className={globalClasses.loadingIndicator}><CircularProgress /></div>) : 
                allCustomers.length > 0 ? allCustomers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.Email}</TableCell>
                    <TableCell>{item.Opportunity}</TableCell>
                    <TableCell>{item.OpportunityType}</TableCell>
                    <TableCell>{item.BusinessUnit}</TableCell>
                    <TableCell>Siemens</TableCell>
                    <TableCell>{item.UpdatedDate === null ? moment(item.CreatedDate).fromNow() : moment(item.UpdatedDate).fromNow()}</TableCell>
                    </TableRow>
                )
              }) : <div>No data found</div>  
          }
          </TableBody>
        </TblContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={allCustomers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <header className={globalClasses.header}>
          <Typography variant='h5'>Associated Stream IDs</Typography>
          <div className={globalClasses.headerButtons}>
            <IconButton className={globalClasses.iconButtonStyle}>
              <SortIcon style={{ margin: '0 5px' }} /> Sort
            </IconButton>
            <IconButton className={globalClasses.iconButtonStyle}>
              <FilterIcon style={{ margin: '0 5px' }} /> Filter
            </IconButton>
            <Button disableTouchRipple disableFocusRipple>
              Notify to Stackholders
            </Button>
            {/* <Button autoFocus disableTouchRipple disableFocusRipple onClick = {() => {setOpenCustomerSignupDialog(true);setFormType(1)}}>Add Strean ID</Button> */}
            <Button autoFocus disableTouchRipple disableFocusRipple>
              Add Strean ID
            </Button>
          </div>
        </header>

        <TableContainer className={`${classes.tableContainer} table`}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow className={classes.tableHeaderBottomBorder}>
                <TableCell>Stream ID</TableCell>
                <TableCell align='left'>Stream Name</TableCell>
                <TableCell align='left'>Application Name</TableCell>
                <TableCell align='left'>Traffic Identifiers</TableCell>
                <TableCell align='left'>APN</TableCell>
                <TableCell align='left'>Charge Category</TableCell>
                <TableCell align='left'>Frequency</TableCell>
                <TableCell align='left'>Updated</TableCell>
                <TableCell align='left'>Audit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <div className={globalClasses.loadingIndicator}>
                  <CircularProgress />
                </div>
              ) : [0, 1, 2].length > 0 ? (
                [{id: 1, name: 'Umar'}, {id: 2, name: 'Salman'}, {id: 3, name: 'Usman'}].map((row, index) => { 
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                  <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                  aria-checked={customerId}
                  tabIndex={-1}
                  key={row.id}
                  selected={customerId === row.id ? true : false}
                >
                  <TableCell padding="checkbox">
                    <Radio
                      checked={customerId === row.id ? true : false}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </TableCell>
                  <TableCell component="th" id={labelId} scope="row" padding="none">
                    {row.name}
                  </TableCell>
                    <TableCell align='left'>Diganostics</TableCell>
                    <TableCell align='left'>Spotify Youtube, Music</TableCell>
                    <TableCell align='left'>xxxxxxxxxx</TableCell>
                    <TableCell align='left'>xxxxxxxxxx</TableCell>
                    <TableCell align='left'>xxxxxxxxxx</TableCell>
                    <TableCell align='left'>xxxxxxxxxx</TableCell>
                    <TableCell align='left'>39 minutes ago by Chris</TableCell>
                    <TableCell align='left'>
                      <IconButton
                        disableRipple
                        disableTouchRipple
                        className={classes.iconTableEditButton}
                        onClick={() => setCustomerStreamLog(true)}
                      >
                        <SearchIcon />
                      </IconButton>
                    </TableCell>

                    {/* <TableCell align="left">
                          <IconButton className={classes.iconEditButtonClasses} onClick={() => {
                            setOpenCustomerSignupDialog(true); setCustomerId(customer.id)
                            setFormType(2)}}>
                            <EditIcon  />
                          </IconButton>
                        </TableCell> */}
                  </TableRow>
                )})
              ) : (
                <div>No data from server</div>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
      </div>
      {openCustomerSignupDialog && (
        <CustomerSignup
          open={openCustomerSignupDialog}
          handleClose={() => setOpenCustomerSignupDialog(false)}
          customerId={customerId}
          formType={formType}
        />
      )}
      {customerLog && (
        <CustomerLogModel open={customerLog} handleClose={closeCustomerLog} />
      )}
      {customerStreamLog && (
        <CustomerStreamLogModel
          open={customerStreamLog}
          handleClose={closeCustomerStreamLog}
        />
      )}
    </>
  )
}
export default Home
