import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react'
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
// import green from '@material-ui/core/colors/green';
// import red from '@material-ui/core/colors/red';
// import orange from '@material-ui/core/colors/orange';
import Chip from '@material-ui/core/Chip';
//import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Moment from 'react-moment';
import {
  Card, CardContent, Divider,
  Typography,
  Button
} from '@material-ui/core';
//import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import { fetchDashboardData, fetchDevicesData, getDeviceData } from '../../actions/dashboardActions';
import { Paper } from '@material-ui/core';
const styles = theme => ({
  root: {
    color: '#21638a',

  },

  card: {

  },
  media: {
    height: 140,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  input: {
    margin: theme.spacing.unit,
  },
});


class DeviceLocations extends Component {
  state = {
    name: [],
    produceName: '',
    position: '',
    showEmptyErrorMsg: false,
    showTrayError: false,
    showLocation: false,
    showAddStocks: false,
    veggiesStocks: [],
    trayMsg: {}
  };

  componentDidMount() {
    this.props.getDeviceData();
  }
  //to dispaly location name
  handleChange = event => {
    this.setState({ name: event.target.value, showLocation: true });
  };

  //on change of adding stocks

  onInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'position') {
      for (var pos = 0; pos < this.state.veggiesStocks.length; pos++) {
        if (value.toLowerCase() === this.state.veggiesStocks[pos].position.toLowerCase()) {
          this.setState({
            showTrayError: true,
            showEmptyErrorMsg: false,
            trayMsg: this.state.veggiesStocks[pos]
          })
          break;
        }
        else {
          this.setState({
            [name]: value,
            showTrayError: false
          });
        }
      }
    }
    else {
      this.setState({
        [name]: value,
        showTrayError: false
      });
    }
  }


  //adding more veggies 

  addTray = () => {

    this.setState({
      showAddStocks: true,
      showEmptyErrorMsg: false
    })

  }
  //on submit of add stocks

  addStocks = (e) => {
    e.preventDefault();
    var today = new Date();

    if (this.state.produceName !== '' && this.state.position !== '' && !this.state.showTrayError) {

      this.setState({
        showAddStocks: false,
        showEmptyErrorMsg: false,
        veggiesStocks: this.state.veggiesStocks.concat([{
          "id": "096444",
          "name": this.state.produceName,
          "addedOn": <Moment format="MM/DD/YYYY">
            {today}
          </Moment>,
          "expectedExpiry": "2019/05/15",
          "status": "Fresh",
          "position": this.state.position
        }]),
        produceName: '',
        position: '',
      })


    }
    else {
      if (this.state.showTrayError) {
        this.setState({
          showAddStocks: true,
          showEmptyErrorMsg: false,
          showTrayError: true
        })
      }
      else {
        this.setState({
          showAddStocks: true,
          showEmptyErrorMsg: true
        })
      }

    }

  }
  render() {


    const { deviceDataDisplay, classes } = this.props;

    const { veggiesStocks, showAddStocks, produceName, position, trayMsg, showTrayError, showEmptyErrorMsg } = this.state;

    // console.log(stocks);
    const locationsArray = [];
    if (veggiesStocks.length === 0 || locationsArray.length === 0) {

      console.log(deviceDataDisplay);
      Object.entries(deviceDataDisplay).map(([key, value]) => {
        if (veggiesStocks.length === 0) {
          for (var i = 0; i < value.fields.availableVeggies.length; i++) {
            veggiesStocks.push(value.fields.availableVeggies[i]);

          }
          for (var j = 0; j < value.fields.availableFruits.length; j++) {
            veggiesStocks.push(value.fields.availableFruits[j]);
          }
          for (var v = 0; v < veggiesStocks.length; v++) {
            if (veggiesStocks[v].status === 'Fresh' || veggiesStocks[v].status === 'Good') {
              veggiesStocks[v].label = "Expires on"


            }
            if (veggiesStocks[v].status === 'Bad') {
              veggiesStocks[v].label = "Expired on"

            }

          }
        }
        if (locationsArray.length === 0) {
          Object.entries(value).map(([key, value]) => {
            console.log(key)
            if (key === "location") {
              locationsArray.push(value);
              return locationsArray;
            }



          });
        }

        // console.log(veggiesStocks)
      })
    }

    for (var v = 0; v < veggiesStocks.length; v++) {
      if (veggiesStocks[v].status === 'Fresh' || veggiesStocks[v].status === 'Good') {
        veggiesStocks[v].label = "Expires on"


      }
      if (veggiesStocks[v].status === 'Bad') {
        veggiesStocks[v].label = "Expired on"

      }

    }

    return (
      <div className='container' >

        <Grid container spacing={24}>
          <Grid item xs={8} style={{ position: 'relative', top: '0em', left: '10em' }}>
            <FormControl className={classes.formControl} style={{ display: 'flex' }}>
              <InputLabel htmlFor="select-multiple-checkbox" style={{ color: 'white' }}>Select Location</InputLabel>
              <Select className={classes.root}
                multiple
                value={this.state.name}
                onChange={this.handleChange}
                input={<Input id="select-multiple-checkbox" />}
                renderValue={selected => selected.join(', ')}
                style={{ color: 'white' }}
              >
                {/* {returnSelect} */}
                {locationsArray.map(name => (
                  <MenuItem key={name.id} value={name.name} >
                    <Checkbox checked={this.state.name.indexOf(name.name) > -1} />
                    <ListItemText primary={name.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          </Grid>

        </Grid>
        <Grid container spacing={24} style={this.state.showLocation ? { display: 'block' } : { display: 'none' }}>
          <Grid item xs={8} style={{ position: 'relative', top: '0em', left: '10em' }}>
            <Paper>
              <Card className={classes.card} style={{ borderRadius: 0 }}>
                <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                  <Icon name="shopping basket" style={{ fontSize: '2em', color: '#21638a' }} />
                  <Typography gutterBottom variant="h5" component="h2">
                    My Kitchen - Food Container
                  </Typography>
                  <Tooltip title="Add" aria-label="Add">
                    <Fab className={classes.absolute}
                      style={{
                        width: '35px', height: '35px', marginLeft: '1em',
                        background: "#21638a", position: 'relative', top: '-8px'
                      }}>
                      <AddIcon onClick={this.addTray} />
                    </Fab>
                  </Tooltip>

                </CardContent>



                <Divider />
                <Paper style={showAddStocks ? { display: 'block' } : { display: 'none' }}>
                  <Typography style={showTrayError ? { display: 'flex', marginLeft: '1em' } : { display: 'none' }} gutterBottom variant="h6" component="h5">
                    <br /> {trayMsg.position} already has {trayMsg.name} !!!
                  </Typography>
                  <Typography style={showEmptyErrorMsg ? { display: 'flex', marginLeft: '1em' } : { display: 'none' }} gutterBottom variant="h6" component="h5">
                    <br /> Empty tray found !!!
                  </Typography>
                  <form className={classes.form} name="addStocks"
                    style={{ display: 'flex', justifyContent: 'space-evenly', margin: '1em', padding: '1em' }}
                    onSubmit={(e) => this.addStocks(e)} autoComplete="off">

                    <FormControl >
                      <InputLabel className={classes.fontSizeCss} htmlFor="produceName">ProduceName</InputLabel>
                      <Input className={classes.fontSizeCss} id="produceName" name="produceName" value={produceName}
                        onChange={(e) => this.onInputChange(e)} />
                    </FormControl>

                    <FormControl >
                      <InputLabel className={classes.fontSizeCss} htmlFor="position">Tray</InputLabel>
                      <Input className={classes.fontSizeCss} id="position" name="position" value={position}
                        onChange={(e) => this.onInputChange(e)} />
                    </FormControl>
                    <Button style={{ background: "#21638a" }} type="submit" variant="contained" >
                      Add
                      </Button>

                  </form>
                </Paper>
                {veggiesStocks.map(value => {
                  if (value.id !== '') {
                    return (

                      <List key={value.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                        <ListItem style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                          <ListItemText primary={value.name} secondary={value.position} />
                          <Chip label={`${value.label} ${value.expectedExpiry}`}
                            style={value.status === 'Fresh' ? { background: 'green' } : value.status === 'Bad' ?
                              { background: 'red' } : { background: 'orange' }}
                            variant="outlined" />
                          {/* <Icon name="trash alternate" style={{ fontSize: '2em', color: '#21638a' }} /> */}
                        </ListItem>
                        <Divider />
                      </List>
                    )
                  } else {
                    return ''
                  }

                }

                )}


              </Card>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {

    devicesData: state.dashboardData.devicesData,
    deviceTypes: state.dashboardData.deviceTypes,
    deviceDataDisplay: state.dashboardData.deviceDataDisplay
  }
}
const mapDispatchToprops = (dispatch) => {
  return {

    fetchDashboardData: () => {
      dispatch(fetchDashboardData())
    },
    fetchDevicesData: () => {
      dispatch(fetchDevicesData())
    },
    getDeviceData: () => {
      dispatch(getDeviceData())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToprops)(withStyles(styles, { withTheme: true })(DeviceLocations));
