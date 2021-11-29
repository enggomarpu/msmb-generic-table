import { makeStyles, TableContainer } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({

}))
const TblContainer = (props) => {
  return (
    <TableContainer>
      {props.children}
    </TableContainer>
  )
}

export default TblContainer