import {
  //alpha,
  AppBar,
  Avatar,
  Badge,
  Card,
  CardHeader,
  IconButton,
  Input,
  InputAdornment,
  InputBase,
  ListItem,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { Cancel, Height, Mail, Notifications, Search } from '@material-ui/icons'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useGlobalContext } from '../context/globalContext'
import MenuOpenIcon from '@material-ui/icons/MenuOpen'
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#4b286d',
  },
  logoLg: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  logoSm: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    //backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      //backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      display: (props) => (props.open ? 'flex' : 'none'),
      width: '70%',
    },
    paddingLeft: '50px',
  },
  input: {
    color: 'white',
    marginLeft: theme.spacing(1),
  },
  cancel: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  searchButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  icons: {
    alignItems: 'center',
    display: (props) => (props.open ? 'none' : 'flex'),
  },
  badge: {
    marginRight: theme.spacing(2),
  },
  listItemStyle: {
    '&.MuiListItem-root': {
      textAlign: 'right',
    },
    '& .MuiTypography-body2': {
      fontSize: '1.1rem',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      lineHeight: 1.43,
      letterSpacing: '0.1rem',
      marginRight: '15px',
      color: 'white',
    },
  },
  avatarStyle: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  logoImage: {
    flexGrow: 1,
    whiteSpace: 'nowrap',
    //overflow: "hidden",
    //textOverflow: "ellipsis",
    fontSize: '1.8rem',
    lineHeight: '2.4rem',
    fontWeight: 500,
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    '& img': {
      height: '50px',
      width: 'auto',
    },
  },
  textField: {
    //overflow: 'hidden',

    '& .MuiInputBase-input': {
      padding: '0 30px;',
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1c348a',
    },
    '& .MuiTypography-colorTextSecondary': {
      color: '#000',
      padding: '0px 40px',
    },
    '&.MuiInput-underline:before': {
      borderBottom: 0,
    },
    '&.MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: 0,
    },
    '&.MuiInput-underline:after': {
      borderBottom: 0,
    },
    background: '#fff',
    borderRadius: 25,
    width: '75%',
    borderBottom: '0px',
    margin: '5px 0px',
    height: 48,
  },
}))

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const classes = useStyles({ open })
  const user = JSON.parse(localStorage.getItem('user'))
  const history = useHistory()
  const { setLogout, toggleSideBar } = useGlobalContext()
  console.log('navbar', user)

  const logout = () => {
    setLogout()
    localStorage.clear()
    history.push('/')
  }
  return (
    <AppBar position='fixed'>
      <Toolbar className={classes.toolbar}>
        <IconButton onClick={toggleSideBar}>
          <MenuOpenIcon fontSize='large' />
        </IconButton>
        <div className={classes.logoImage}>
          <img
            src='https://apex.oracle.com/pls/apex/markitech/r/92807/files/static/v10/TELUS%20Logo%20White.png'
            alt='Telus-Logo'
          />
          <span>MSMB Stream Managment Tool</span>
        </div>
        {/* <Typography variant="h6" className={classes.logoLg}></Typography>
          <Typography variant="h6" className={classes.logoSm}>
          LAMAfffffffffffffffffffffffffffffffff
        </Typography> */}

        <div className={`${classes.search} searchbar`}>
          {/* <Search />
          <InputBase
            placeholder="Search..."
            className={classes.input}
            style={{ backgroundColor: "white" }}
          />
          <Cancel className={classes.cancel} onClick={() => setOpen(false)} /> */}
          <Input
            startAdornment={
              <InputAdornment
                position='end'
                className={classes.iconVisibilityButton}
              >
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            className={classes.textField}
            //type={showNewPassword ? "text" : "password"}
            //onChange={textHandler}
            //value={newPassword}
            type='text'
            name='newpassword'
            placeholder='Search Keyboard'
          />
        </div>

        <div className={classes.icons}>
          <Search
            className={classes.searchButton}
            onClick={() => setOpen(true)}
          />

          <ListItem className={classes.listItemStyle}>
            <ListItemText
              primary={
                <Typography variant='body2'>
                  {user && user.Firstname}
                </Typography>
              }
              secondary={
                <span style={{ cursor: 'pointer' }} onClick={logout}>
                  Logout
                </span>
              }
            />
            <Link to='/updateprofile'>
              <Avatar
                className={classes.avatarStyle}
                alt='Remy Sharp'
                src='https://images.pexels.com/photos/8647814/pexels-photo-8647814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
              />
            </Link>
          </ListItem>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
