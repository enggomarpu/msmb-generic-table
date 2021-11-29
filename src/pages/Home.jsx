import React, { useState, useEffect, useCallback } from 'react'
import {
  Button,
  IconButton,
  makeStyles,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Radio,
  CircularProgress,
  TablePagination,
  TableSortLabel,
  TextField,
  InputAdornment,
} from '@material-ui/core'
import SortIcon from '@material-ui/icons/Sort'
import FilterIcon from '@material-ui/icons/Filter'
import EditIcon from '@material-ui/icons/Edit'
import CustomerSignup from '../components/CustomerSignup'
import { globalStyles } from '../globalstyles'
import {
  GET_ALL_CUSTOMERS,
  GET_ALL_CUSTOMER_STREAMS,
  SEND_NOTIFICATION_EMAIL,
} from '../shared/constants'
import { useQuery } from '@apollo/client'
import moment from 'moment'
import SearchIcon from '@material-ui/icons/Search'
import CustomerLogModel from '../components/CustomerLogModel'
import CustomerStreamLogModel from '../components/CustomerStreamLogModel'
//import ConfirmDialog from '../shared/ConfirmationDialog'
//import { CsvBuilder } from 'filefy';
import { useToasts } from 'react-toast-notifications'
import { Search } from "@material-ui/icons";
import TblHead from '../components/table/TblHead'
import TblBody from '../components/table/TblBody'


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
  const [allCustomerStreams, setAllCustomerStreams] = useState([])
  const [formType, setFormType] = useState(1)
  const [customerId, setCustomerId] = useState()
  const [customer, setCustomer] = useState()
  const [customerLog, setCustomerLog] = useState(false)
  const [customerStreamLog, setCustomerStreamLog] = useState(false)
  const [selected, setSelected] = useState([]);
  const [openConfirmationDialog, setConfirmationDialog] = useState(false);
  const [isSendEmail, setSendEmail] = useState(false);
  const { addToast } = useToasts()
  const [customerName, setCustomerName] = useState('')
  const user = JSON.parse(localStorage.getItem('user'))



  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('Email');
  const [customerPage, setCustomerPage] = React.useState(0);
  const [customerRowsPerPage, setCustomerRowsPerPage] = React.useState(5);

  const [customerStreamsPage, setCustomerStreamsPage] = React.useState(0);
  const [customerStreamsRowsPerPage, setCustomerStreansRowsPerPage] = React.useState(5);
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })



  const columns = [
    { label: "Customers", field: "Email", align: "" },
    { label: "Opportunities", field: "Opportunity", align: "left" },
    { label: "Opportunity Type", field: "OpportunityType", align: "left" },
    { label: "Business Unit", field: "BusinessUnit", align: "left" },
    { label: "Updated", field: "UpdatedDate", align: "left" },
  ]

  const streamsColumns = [
    { label: "Stream ID", field: "StreamId", align: "left" },
    { label: "Stream Name", field: "StreamName", align: "left" },
    { label: "Application Name", field: "ApplicationName", align: "left" },
    { label: "Traffic Identifier", field: "TrafficIdentifier", align: "left" },
    { label: "APN", field: "APName", align: "left" },
    { label: "Charge Category", field: "ChargeCategory", align: "left" },
    { label: "Frequency", field: "ChargeFrequency", align: "left" },
    { label: "Updated", field: "UpdatedDate", align: "left" },


  ]

  const openCustomerLog = (id, name) => {
    setCustomerLog(true)
    setCustomerId(id)
    setCustomerName(name)
  }

  const openEditModel = (id) => {
    setOpenCustomerSignupDialog(true)
    setCustomerId(id)
    setFormType(2)
  }

  const handleCustomerChangePage = (event, newPage) => {
    setCustomerPage(newPage);
  };

  const handleCustomerChangeRowsPerPage = (event) => {
    setCustomerRowsPerPage(parseInt(event.target.value, 10));
    setCustomerPage(0);
  };


  const handleCustomerStreamsChangePage = (event, newPage) => {
    setCustomerStreamsPage(newPage);
  };

  const handleCustomerStreamsChangeRowsPerPage = (event) => {
    setCustomerStreansRowsPerPage(parseInt(event.target.value, 10));
    setCustomerStreamsPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleRequestSortStream = (property) => {

  }
  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    //console.log('stablesort', stabilizedThis[0][0].id)
    //setSelected(stabilizedThis[0][0].id)
    return stabilizedThis.map((el) => el[0]);
  }

  const closeCustomerLog = () => {
    setCustomerLog(false)
  }

  const closeCustomerStreamLog = () => {
    setCustomerStreamLog(false)
  }

  const { loading, data } = useQuery(GET_ALL_CUSTOMERS, {
    skip: false,
    onError: () => { },
  })

  const { loading: streamLoading, data: streamData, error, refetch } = useQuery(GET_ALL_CUSTOMER_STREAMS, {
    variables: {
      id: customerId && customerId
    },
    skip: !customerId,
    onError: () => { },
  })

  const { loading: emailLoading, data: emailData, refetch: refetchEmail } = useQuery(SEND_NOTIFICATION_EMAIL, {
    variables: {
      id: customerId && customerId
    },
    skip: !isSendEmail,
    onError: () => { },
    onCompleted: () => {
      addToast("Email Sent Successfully", { appearance: "success" });
      setConfirmationDialog(false);
      setSendEmail(false);
    },
  })

  useEffect(() => {
    if (data) {
      setAllCustomers(data.getAllcustomers)
      if (data.getAllcustomers.length > 0) {
        setSelected(data.getAllcustomers[0].id)
        setCustomerId(data.getAllcustomers[0].id);
        setCustomer(data.getAllcustomers[0]);
      }
    }
  }, [data])

  useEffect(() => {
    if (customerId) {
      refetch()
    }
  }, [customerId])

  useEffect(() => {
    if (streamData) {
      console.log('all streams customers', streamData.getAllCustomerStreams)
      setAllCustomerStreams(streamData.getAllCustomerStreams)
    }

  }, [streamData])

  const handleChangeSelect = (customer) => {
    setSelected(customer.id)
    setCustomer(customer);
    setCustomerId(customer.id);
  }

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const sendEmail = () => {
    if (isSendEmail) {
      refetchEmail()
    }
    else {
      setSendEmail(true);
    }
  }

  const exportCSV = () => {
    // var csvBuilder = new CsvBuilder("customers_list.csv")
    //   .setColumns(columns.map(x => x.header))
    //   .addRows(allCustomers.map(x => [x.CustomerName, x.Opportunity, x.OpportunityType, x.BusinessUnit, moment(x.UpdatedDate).fromNow()]))
    //   .exportFile();
  }
  const openCusotomerEdit = (id) => {
    setOpenCustomerSignupDialog(true)
    setCustomerId(id)
    setFormType(2)
  }
  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
      fn: allUsers => {
        if (target.value === "")
          return allUsers;
        else
          return allUsers.filter(x => x.Email.toLowerCase().includes(target.value.toLowerCase()))
      }
    })
  }
  const fetchData = useCallback((allCu) => {
    const allCustr = allCu.length > 0 && stableSort(allCu, getComparator(order, orderBy))
    console.log('all sorted arrays', allCustr, allCu, order, orderBy)
    setSelected(allCustr[0].id)
    setCustomerId(allCustr[0].id);
    setCustomer(allCustr[0]);
    setAllCustomers(allCustr)
  },[orderBy, order])

  const handleClick = useCallback(() => {
    console.log('Clicked!');
  }, []);

  // const fetchData = (allCu) => {
  //   const allCustr = allCu.length > 0 && stableSort(allCustomers, getComparator(order, orderBy))
  //   console.log('all sorted arrays', allCustr)
  //   setSelected(allCustr[0].id)
  //   setCustomerId(allCustr[0].id);
  //   setCustomer(allCustr[0]);
  //   setAllCustomers(allCustr)
  // }
  
  return (
    <>
      <div className={classes.container}>
        <header className={globalClasses.header}>
          <Typography variant='h6'>Customers</Typography>
          <div className={`${globalClasses.headerButtons} button-panel`}>
            <TextField className='searchbar-header' variant="outlined" onChange={handleSearch}
              InputProps={{
                startAdornment: (<InputAdornment position="start">
                  <Search />
                </InputAdornment>)
              }} />
            {/* <IconButton className={globalClasses.iconButtonStyle}>
              <SortIcon style={{ margin: '0 5px' }} /> Sort
            </IconButton>
            <IconButton className={globalClasses.iconButtonStyle}>
              <FilterIcon style={{ margin: '0 5px' }} /> Filter
            </IconButton> */}
            <Button className='btn-primary' disableTouchRipple disableFocusRipple onClick={exportCSV}>
              Export to CSV
            </Button>
            {user.roles === 2 && <Button className='btn-primary'
              autoFocus
              disableTouchRipple
              disableFocusRipple
              onClick={() => {
                setOpenCustomerSignupDialog(true)
                setFormType(1)
              }}
            >
              Customer Wizard
            </Button>}
          </div>
        </header>
        <TableContainer
          className={`${classes.tableContainer} table`}
          style={{ paddingBottom: '100px' }}
        >
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TblHead
              headCells={columns}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            {allCustomers.length > 0 && 
            <TblBody
              loading={loading}
              data={allCustomers}
              openEdit={(val) => openEditModel(val)}
              handleRadioSelect={(val) => handleChangeSelect(val)}
              customerId = {customerId}
              page={customerPage}
              rowsPerPage={customerRowsPerPage}
              fetchData = {fetchData}
              order={order}
              orderBy={orderBy}
              selected={selected}
            />}
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 15]}
          className={globalClasses.paginationIcons}
          count={allCustomers.length}
          page={customerPage}
          onPageChange={handleCustomerChangePage}
          rowsPerPage={customerRowsPerPage}
          onRowsPerPageChange={handleCustomerChangeRowsPerPage}
        />
        <header className={globalClasses.header}>
          <Typography variant='h6'>Associated Stream IDs</Typography>
          <div className={globalClasses.headerButtons}>
            <IconButton className={globalClasses.iconButtonStyle}>
              <SortIcon style={{ margin: '0 5px' }} /> Sort
            </IconButton>
            <IconButton className={globalClasses.iconButtonStyle}>
              <FilterIcon style={{ margin: '0 5px' }} /> Filter
            </IconButton>
            {/* <Button className='btn-primary' disableTouchRipple disableFocusRipple onClick={() => setConfirmationDialog(true)}>
              Notify to Stakeholders
            </Button> */}
            {(user.roles === 2 || user.roles === 1) && <Button className='btn-primary' disableTouchRipple disableFocusRipple onClick={() => { setOpenCustomerSignupDialog(true); setFormType(2) }}>
              Add Stream ID
            </Button>}
          </div>
        </header>

        <TableContainer className={`${classes.tableContainer} table`} style={{ paddingBottom: '100px' }}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow className={classes.tableHeaderBottomBorder}>
                {/* <TableCell>Stream ID</TableCell>
                <TableCell align='left'>Stream Name</TableCell>
                <TableCell align='left'>Application Name</TableCell>
                <TableCell align='left'>Traffic Identifiers</TableCell>
                <TableCell align='left'>APN</TableCell>
                <TableCell align='left'>Charge Category</TableCell>
                <TableCell align='left'>Frequency</TableCell>
                <TableCell align='left'>Updated</TableCell> */}
                {streamsColumns.map((item) => {
                  return (
                    <TableCell
                      key={item.field}
                      sortDirection={orderBy === item.field ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === item.field}
                        direction={orderBy === item.field ? order : 'asc'}
                        onClick={() => handleRequestSort(item.field)}
                      >
                        {item.label}
                      </TableSortLabel>
                    </TableCell>
                  )
                })}
                <TableCell align='left'>Audit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {streamLoading ? (
                <div className={globalClasses.loadingIndicator}>
                  <CircularProgress />
                </div>
              ) : allCustomerStreams && allCustomerStreams.length > 0 ? (
                stableSort(allCustomerStreams, getComparator(order, orderBy)).slice(customerStreamsPage * customerStreamsRowsPerPage, customerStreamsPage * customerStreamsRowsPerPage + customerStreamsRowsPerPage).map((stream) => (
                  <TableRow
                    className={classes.tableBodyBottomBorder}
                    key={stream.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align='left'>{stream.StreamId}</TableCell>
                    <TableCell align='left'>{stream.StreamName}</TableCell>
                    <TableCell align='left'>{stream.ApplicationName}</TableCell>
                    <TableCell align='left'>{stream.TrafficIdentifier}</TableCell>
                    <TableCell align='left'>{stream.APName}</TableCell>
                    <TableCell align='left'>{stream.ChargeCategory}</TableCell>
                    <TableCell align='left'>{stream.ChargeFrequency}</TableCell>
                    <TableCell align='left'>{moment(stream.UpdatedDate).fromNow()}</TableCell>
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
                  </TableRow>
                ))
              ) : (
                <div>No data from server</div>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 15]}
          className={globalClasses.paginationIcons}
          count={allCustomerStreams.length}
          page={customerStreamsPage}
          onPageChange={handleCustomerStreamsChangePage}
          rowsPerPage={customerStreamsRowsPerPage}
          onRowsPerPageChange={handleCustomerStreamsChangeRowsPerPage}
        />
        {openCustomerSignupDialog && (
          <CustomerSignup
            open={openCustomerSignupDialog}
            handleClose={() => setOpenCustomerSignupDialog(false)}
            customerId={customerId}
            formType={formType}
          />
        )}
        {customerLog && (
          <CustomerLogModel open={customerLog} handleClose={closeCustomerLog} customerId={customerId} customerName={customerName} />
        )}
        {customerStreamLog && (
          <CustomerStreamLogModel
            open={customerStreamLog}
            handleClose={closeCustomerStreamLog}
          />
        )}

        {/* {openConfirmationDialog &&
          <ConfirmDialog showConfirm={allCustomerStreams && allCustomerStreams.length > 0} message={allCustomerStreams && allCustomerStreams.length > 0 ? "Are you sure you want to send an email to " + customer.CustomerName + "?" : "There are no associated streams with selected customer."} open={openConfirmationDialog}
            handleClose={() => setConfirmationDialog(false)} confirmFunc={sendEmail}
          />
        } */}
      </div>
    </>
  )
}
export default Home
