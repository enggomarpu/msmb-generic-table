import { Container, easing, makeStyles, Typography } from "@material-ui/core";
import { useGlobalContext } from '../context/globalContext'
import {
  Bookmark,
  List,
  ExitToApp,
  Home,
  Person,
  PhotoCamera,
  PlayCircleOutline,
  Settings,
  Storefront,
  TabletMac,
} from "@material-ui/icons";
import LayersIcon from '@material-ui/icons/Layers';
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import { Link, NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    color: "white",
    width: "250px",
    paddingTop: theme.spacing(10),
    backgroundColor: theme.palette.primary.main,
    position: "fixed",
    top: 0,
    [theme.breakpoints.up("sm")]: {
      backgroundColor: "#545454",
      color: "#fff",
      
    },
    transition: "width .2s ease-in",
  },
  menuitem: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    //padding: "8px 0px 8px 16px",
    listStyle: "none",
    height: "60px",
    "& span":{
      marginLeft: '16px'
    },
    "& a": {
      textDecoration: "none",
      color: "#fff",
      fontSize: "18px",
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      padding: "0 16px",
      borderRadius: "4px",
      '&:hover': {
        backgroundColor: '#000'
      }

    },
  },
  inactive: {
    width: 70,
  },
  inactivespan: {
    // marginLeft: 0,
    // opacity: 0,
    // width: 0,
    // height: 0,
    // overflow: "hidden",
    display:"none"
  },
  
  mainmenu: {
    border: "1px solid red",
    width: '100%'
  },
}));

const Leftbar = (props) => {
  const SidebarData = [
    
  
    {
      title: 'Customers',
      path: '/',
      icon:<LayersIcon fontSize="large" />,
      
    }, 
    {
      title: 'Streams',
      path: '/streams',
      icon: <ViewStreamIcon fontSize="large" />,
    },
    {
      title: 'Users',
      path: '/userlisting',
      icon: <Person fontSize="large" />,
    },
   
  ];
  const classes = useStyles();
  const { isSidebarOpen } = useGlobalContext()
  return (
    <div className={ isSidebarOpen ? `${classes.container} ${classes.inactive}` : `${classes.container}`} >
     
      {/* <ul className={classes.mainmenu}>
        <li>
          <NavLink to="/" className={classes.menuitem}>
            <Home /><span className={isSidebarOpen ? `${classes.inactivespan}` : ``}>Home</span> 
          </NavLink>
        </li>
        <li>
          <NavLink to="/userlisting" className={classes.menuitem}>
          <Person /><span className={isSidebarOpen ? `${classes.inactivespan}` : ``}>Person</span> 
          </NavLink>
        </li>
      </ul> */}
       {SidebarData.map((item, index) => {
              return (
                <li key={index} className={classes.menuitem}>
                  <Link to={item.path}>
                    {item.icon}
                    <span className={isSidebarOpen ? `${classes.inactivespan}` : ``}>{item.title}</span>
                  </Link>
                </li>
              );
            })}


    </div>
  );
};

export default Leftbar;
