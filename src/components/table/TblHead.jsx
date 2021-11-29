import { makeStyles, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({

}))
const TblHead = (props) => {
  const { headCells, order, orderBy, onRequestSort } = props;
  const user = JSON.parse(localStorage.getItem('user'))


  const handleRequestSort = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((item) => {
          return (
            <TableCell
              key={item.field}
              sortDirection={orderBy === item.field ? order : false}
            >
              <TableSortLabel
                active={orderBy === item.field}
                direction={orderBy === item.field ? order : 'asc'}
                onClick={handleRequestSort(item.field)}
              >
                {item.label}
              </TableSortLabel>
            </TableCell>
          )
        })}
        <TableCell align='left'>Audit</TableCell>
        {(user.roles === 2 || user.roles === 1) && <TableCell align='left'></TableCell>}
      </TableRow>
    </TableHead>
  )
}

export default TblHead