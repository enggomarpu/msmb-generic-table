import React, { useEffect, useState } from 'react'
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
} from '@material-ui/core'
import { globalStyles } from '../../globalstyles';
import EditIcon from '@material-ui/icons/Edit'
import SearchIcon from '@material-ui/icons/Search'
import moment from 'moment';




const useStyles = makeStyles((theme) => ({

}))
const TblBody = (props) => {

  const { loading, data, handleRadioSelect, customerId, openEdit, page, rowsPerPage, fetchData, order, orderBy, selected } = props;
  const classes = useStyles()
  const globalClasses = globalStyles();
  const user = JSON.parse(localStorage.getItem('user'))


  //const [selected, setSelected] = useState([]);
  const isSelected = (id) => selected.indexOf(id) !== -1;

  useEffect(()=>{
    console.log('useeffect in tbody', data)
    data.length > 0 && fetchData(data)
  }, [order, orderBy])

  return (
    <TableBody>
      {loading ? (
        <div className={globalClasses.loadingIndicator}>
          <CircularProgress />
        </div>
      ) : data.length > 0 ? (
        data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer, index) => {
          const labelId = `enhanced-table-checkbox-${index}`;
          const isItemSelected = isSelected(customer.id);
          return (
            <TableRow
              hover
              onClick={() => handleRadioSelect(customer)}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={customer.id}
              selected={isItemSelected}
            >
              <TableCell component="td" id={labelId} scope="row" padding="none">
                <Radio
                  checked={customer.id === customerId ? true : false}
                  inputProps={{ "aria-labelledby": labelId }}
                />
                {customer.Email}
              </TableCell>
              <TableCell align='left'>{customer.Opportunity}</TableCell>
              <TableCell align='left'>
                {customer.OpportunityType}
              </TableCell>
              <TableCell align='left'>{customer.BusinessUnit}</TableCell>
              <TableCell align='left'>
                {moment(customer.UpdatedDate).fromNow()}
              </TableCell>

              <TableCell align='left'>
                <IconButton
                  disableRipple
                  disableTouchRipple
                  className={classes.iconTableEditButton}
                //onClick={() => openCustomerLog(customer.id, customer.CustomerName)}

                >
                  <SearchIcon />
                </IconButton>
              </TableCell>
              {
                (user.roles === 2 || user.roles === 1) &&
                <TableCell align='left'>
                  <IconButton
                    className={classes.iconEditButtonClasses}
                    onClick={() => { openEdit(customer.id) }}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              }

            </TableRow>
          )
        })
      ) : (
        <div>No data from server</div>
      )}

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
  )
}

export default TblBody