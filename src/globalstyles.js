import { makeStyles } from '@material-ui/core'

export const globalStyles = makeStyles((theme) => ({
  loadingIndicator: {
    '& .MuiCircularProgress-colorPrimary': {
      color: 'green',
    },
    position: 'absolute',
    top: '50%',
    left: '50%',
    color: 'white',
    MozTransform: 'translateX(-50%) translateY(-50%)',
    WebkitTransform: 'translateX(-50%) translateY(-50%)',
    transform: 'translateX(-50%) translateY(-50%)',
  },
  buttonStyle: {
    '&.MuiButton-root': {
      color: '#fff',
      boxShadow: 'none',
      textTransform: 'capitalize',
      padding: '10px 15px',
      backgroundColor: 'green',
    },
    '&.MuiIconButton-root': {
      fontSize: '1rem',
    },
  },
  container: {
    padding: theme.spacing(10, 5, 10, 5),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    //alignItems: 'center',
  },
  headerButtons: {
    //display: 'flex',
    //justifyContent: 'space-between',
    //padding: theme.spacing(2),
    '& .MuiButton-root': {
      color: '#fff',
      boxShadow: 'none',
      textTransform: 'capitalize',
      //padding: '5px 15px',
      backgroundColor: '#000',
    },
    '& .MuiIconButton-root': {
      fontSize: '1rem',
    },
    // '& .MuiButton-label': {
    //     fontSize: '12px'
    // },
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
}))
