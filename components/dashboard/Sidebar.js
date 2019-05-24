import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Redirect } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper'
import MenuList from '@material-ui/core/MenuList';
import Avatar from '@material-ui/core/Avatar';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import { Link } from 'react-router-dom'
import { getHomeDataFromApi, setStateDrawerOpen, setStateDrawerClose, setStateHandleMenu, setStateHandleClose, logOutFunc } from '../../actions/sidebarAction';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import Person from '@material-ui/icons/Person';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import AccountCircle from '@material-ui/icons/AccountCircle';
import { connect } from 'react-redux';
import './sidebar.css';

import { DropdownItem } from 'reactstrap';
const drawerWidth = 125


const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    background: '#2f4a63 !important',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
    color: '#dee2e6 !important',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    backgroundColor: '#283847 !important',
    flexShrink: 0,
    whiteSpace: 'nowrap',

  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#283847'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    width:'50px !important',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  menuItem: {
    color: '#dee2e6',
    fontSize: '12px',
    height: '14px'
  },
  iconBtn:{
    position:'fixed',
    right:'0px',
    top:'2px',
    background: 'none',
    float:'right'
  }
});

class Sidebar extends React.Component {

  componentDidMount = () => {
    this.props.getHomeDataFromApi()
  }
  handleDrawerOpen = () => {
    this.props.setStateDrawerOpen(true);
  };
  handleDrawerClose = () => {
    this.props.setStateDrawerClose(false);
  };
  handleMenu = (event) => {
    this.props.setStateHandleMenu(event.currentTarget);
    //this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.props.setStateHandleMenu();
  };

  logOutFunc = () => {

    localStorage.clear();
    window.location.href = "/";


  }


  render() {
    const { classes, theme } = this.props;
    const { anchorEl, userInfo } = this.props;
    const isMenu = Boolean(anchorEl);
    const styles = {
      color: '#dee2e6',
      cursor: 'pointer'
    }
    console.log(this.props.stateVal)
    if (this.props.homeData === undefined) {
      return <Redirect to="/" />
    }

    if (this.props.homeData !== undefined) {


      const moduleList = this.props.homeData.map((modules, index) => (

        <Link key={index} style={styles} to={`${modules.url}`} >
          <ListItem className={classes.menuHover} button>
            <FontAwesomeIcon icon={modules.icon} style={{ width: '12px' }} />
            {this.props.open === true ? <ListItemText><Typography className={classes.menuItem}>{modules.moduleName}</Typography></ListItemText> : null}
          </ListItem>
        </Link>
      ))

      return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: this.props.open,
            })}
          >
            <Toolbar disableGutters={!this.props.open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, {
                  [classes.hide]: this.props.open,
                })}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                Smart Home
            </Typography>
              <div style={{ width: '86%'}}>
                <IconButton className={classes.iconBtn} 
                  aria-owns={isMenu ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <Avatar alt="Remy Sharp" src={userInfo.profilePic} className={classes.avatar} />

                  <ArrowDropDown />
                </IconButton>

                <Popper open={isMenu} anchorEl={anchorEl} transition disablePortal>
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      id="menu-appbar"
                      style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                      <Paper className={classes.paper}>
                        <ClickAwayListener onClickAway={this.handleClose}>
                          <MenuList>
                            <DropdownItem header>Hello, {userInfo.name} </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={this.handleClose}> <Person />My profile </DropdownItem>
                            <DropdownItem onClick={this.logOutFunc}> <PowerSettingsNew /> Log out </DropdownItem>

                            {/* <MenuItem onClick={this.handleClose}>My Profile</MenuItem> */}
                            {/* <MenuItem onClick={this.logOutFunc}><Link to="/">Log out</Link></MenuItem> */}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            </Toolbar>
          </AppBar>

          <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: this.props.open,
              [classes.drawerClose]: !this.props.open,
            })}
            classes={{
              paper: classNames(classes.drawerPaper,{
                [classes.drawerOpen]: this.props.open,
                [classes.drawerClose]: !this.props.open,
              }),
            }}
            open={this.props.open}
          >
            <div className={classes.toolbar}>
              <IconButton className={classes.menuButton} onClick={this.handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
              {moduleList}
            </List>
          </Drawer>
          <main>
            <div className={classes.drawerHeader} />
          </main>
        </div>
      );
    }
  }
}
Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    stateVal: state,
    homeData: state.sidebar.smartHomeData,
    open: state.sidebar.open,
    userInfo: state.loginInfo.loginCredentials,
    anchorEl: state.sidebar.anchorE1LogoutMenu
  }
}
const mapDispatchToprops = (dispatch) => {
  return {
    getHomeDataFromApi: () => {
      dispatch(getHomeDataFromApi())
    },
    setStateDrawerClose: (value) => {
      dispatch(setStateDrawerClose(value))
    },
    setStateDrawerOpen: (value) => {
      dispatch(setStateDrawerOpen(value))
    },
    setStateHandleMenu: (value) => {
      dispatch(setStateHandleMenu(value))
    },
    setStateHandleClose: () => {
      dispatch(setStateHandleClose())
    },
    logOutFunc: () => {
      dispatch(logOutFunc())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToprops)(withStyles(styles, { withTheme: true })(Sidebar));