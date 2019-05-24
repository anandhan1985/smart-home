import React, { Component, Fragment } from 'react';
import AddDevice from '../devices/AddDevice';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {
  Card, CardContent,
  Typography
} from '@material-ui/core';

//import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getHomeDataFromApi } from '../../actions/sidebar';
//import { CssBaseline } from '@material-ui/core';
// import VideoComponent from './VideoComponent';
import { callNestCamApi } from '../../actions/nestcamLive';
import { fetchDashboardData, fetchDevicesData } from '../../actions/dashboardActions';
import Tooltip1 from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import moment from 'moment';
//import { Icon } from 'semantic-ui-react'
// import ReactPlayer from 'react-player'
//import classNames from 'classnames';
import './dashboard.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import ReactSpeedometer from "react-d3-speedometer";
import {
  PieChart, Pie, Cell, Legend, Tooltip,
} from 'recharts';

import red from '@material-ui/core/colors/red';
import Radio from '@material-ui/core/Radio';
// import {
//   Carousel,
//   CarouselItem,
//   CarouselControl,
//   CarouselIndicators,
//   CarouselCaption
// } from 'reactstrap';
import Thermometer from 'react-thermometer-component'
import { color } from 'd3-color';
import { interpolateRgb } from 'd3-interpolate';
import LiquidFillGauge from 'react-liquid-gauge';
import { WiDaySunny } from 'weather-icons-react';
const data = [
  { name: 'Living Room', value: 50 },
  { name: 'Bed Room ', value: 30 },
  { name: 'Kitchen', value: 20 },
  { name: 'Garage', value: 10 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//matrial ui - grid

const styles = theme => ({
  root: {
    color: red[600],
    '&$checked': {
      color: red[500],
    },
  },
  checked: {},
  typography: {
    color: '#dee2e6'
  },
  card: {
    width: 345,
    height: 100,
    marginLeft: `1em`,
    background: `#35475a`,
    color: 'floralwhite'
  },
  title: {
    fontSize: 18,
    color: 'floralwhite'
  },
  subTitle: {
    fontSize: 14,
    color: 'floralwhite'
  },
  circle: {
    height: '115px',
    width: '115px',
    border: 'floralwhite 2px solid',
    backgroundColor: 'none',
    borderRadius: '50%',
    display: 'inline-block'
  },
  media: {
    height: `auto`,
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 3}px`,
  },
  paper: {
    height: `auto`,
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    background: `#35475a`,
    borderRadius: 5,
    marginBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`,
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  margin: {
    margin: theme.spacing.unit * 2,
  },

  badge: {
    height: `8px`,
    padding: 0,
    minWidth: `8px`,
    top: '14px',
    right: `24px`,
    backgroundColor: 'green !important',
    // The border color match the background color.

  },
});


const style = {
  top: 50,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  left: 250,
  lineHeight: '24px',
};

class Dashboard extends Component {

  //get modules data
  constructor() {
    super();
    this.state = {
      openDialog: false,
      currentTime: moment()
        .utcOffset('+05:30')
        .format(' hh:mm:ss a')
    }
  }
  componentDidMount() {
    this.props.getHomeDataFromApi();
    //this.props.callNestCamApi();
    this.props.fetchDashboardData();
    this.props.fetchDevicesData();
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  tick() {
    this.setState({
      currentTime: moment()
        .utcOffset('+05:30')
        .format(' hh:mm:ss a')
    });
  }

  displayAddDeviceDialog = () => {
    this.setState({
      openDialog: true
    })
  }
  callParentFunc = () => {
    this.setState({
      openDialog: false
    })
    // this.props.newDevice(e);
  }
  cancelAddDevice = () => {
    this.setState({
      openDialog: false
    })
  }

  render() {
    const { classes, deviceTypes, nestcamData } = this.props;
    const newArraywithDevices = [];

    var humidity = "", indoorTemp = "";



    Object.entries(deviceTypes).map(([key, value]) => {

      if (key === 'hiot.light') {
        newArraywithDevices.push({
          "type": "Light",
          "iconName": "lightbulb",
          "value": value,
          "link": "/lights"
        })
      }
      if (key === 'motion_detector') {
        newArraywithDevices.push({
          "type": "Security",
          "iconName": "lock",
          "value": value,
          "link": "/security"
        })
      }
      if (key === 'Food Container') {
        newArraywithDevices.push({
          "type": key,
          "iconName": "utensils",
          "value": value,
          "link": "/deviceLocations"
        })
      }
      if (key === 'Thermostat') {
        value.map(datas => (
          humidity = datas.outdoorHumidity,
          indoorTemp = datas.indoorTemperature))
        localStorage.setItem('indoorTemp', indoorTemp);
        newArraywithDevices.push({
          "type": key,
          "iconName": "thermometer-full",
          "value": value,
          "link": "/thermostatConfig"
        })
      }
      return "objects";
    });
    const radius = 50;
    const interpolate = interpolateRgb('#002447', '#5f1b82');
    const fillColor = interpolate(humidity / 100);
    const gradientStops = [
      {
        key: '0%',
        stopColor: color(fillColor).darker(0.5).toString(),
        stopOpacity: 1,
        offset: '0%'
      },
      {
        key: '50%',
        stopColor: fillColor,
        stopOpacity: 0.75,
        offset: '50%'
      },
      {
        key: '100%',
        stopColor: color(fillColor).brighter(0.5).toString(),
        stopOpacity: 0.5,
        offset: '100%'
      }
    ];
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var n = weekday[d.getDay()];
    var hours = new Date().getHours();
    var modeName = "GOOD MORNING!"
    if (hours >= 18 || hours < 4) {
      modeName = "GOOD NIGHT!"
    }
    if (hours >= 4 && hours <= 11) {
      modeName = "GOOD MORNING!"
    }
    if (hours >= 12 && hours < 18) {
      modeName = "GOOD EVENING!"
    }
    return (
      <Fragment>
        <div style={{ marginTop: '4%' }}>
          <div className="row" >
            <div className="col-6">
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <Paper className={`bg-overlaylivestream ${classes.paper}`} style={{ height: '400px' }}>
                    <img width="630" height="380" src="/assets/images/gettyimages-496698632-612x612.jpg" alt="Blured Home" />
                    <div className="top-right">
                      <Radio checked name="radio-button-demo" classes={{ root: classes.root, checked: classes.checked, }} />
                      Recording</div>
                  </Paper>
                </Grid>
              </Grid>
            </div>
            <div className="col-6">
              <Grid container spacing={0}>
                <Grid item xs={4}>
                  <Paper style={{ background: `#35475a`, height: '400px' }}>
                    <Typography className={classes.title} gutterBottom style={{ position: 'relative', top: '3px', textAlign: 'center', fontWeight: 'normal', fontSize: '14px' }}>
                      {modeName} <br />
                      <WiDaySunny size={100} color='#cf6f3c' />
                      <Typography className={classes.title} gutterBottom style={{ margin: '1em', fontWeight: 'normal', fontSize: '18px' }}>
                        {n}, <br /> {this.state.currentTime}
                      </Typography>
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={8}>
                  <Paper style={{ background: `#35475a`, height: '200px', borderRadius: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Typography className={classes.subTitle} gutterBottom
                      style={{ margin: '1em', position: 'relative', left: '4em', textAlign: 'center', fontSize: '12px' }}>
                      INSIDE TEMP
                   </Typography>
                    <div style={{ position: 'relative', top: '4em', right: '4em' }}>
                      <Thermometer theme="dark" value={indoorTemp} max="100" steps="3"
                        format="°C" size="small" height="100" style={{ marginTop: '3em !important' }} />
                    </div>
                    <Typography className={classes.subTitle} gutterBottom
                      style={{ margin: '1em', position: 'relative', left: '6em', textAlign: 'center', fontSize: '12px' }}>
                      HUMIDITY
                   </Typography>
                    <LiquidFillGauge style={{ margin: '2em', position: "relative", top: '1em', right: "3em", color: 'floralwhite' }} width={radius * 2} height={radius * 2}
                      value={humidity} percent="%" textSize={1} textOffsetX={0} textOffsetY={0}
                      textRenderer={(props) => {
                        const value = Math.round(props.value);
                        const radius = Math.min(props.height / 2, props.width / 2);
                        const textPixels = (props.textSize * radius / 2);
                        const valueStyle = {
                          fontSize: textPixels
                        };
                        const percentStyle = {
                          fontSize: textPixels * 0.6
                        };
                        return (
                          <tspan>
                            <tspan className="value" style={valueStyle}>{value}</tspan>
                            <tspan style={percentStyle}>{props.percent}</tspan>
                          </tspan>
                        );
                      }}
                      riseAnimation waveAnimation waveFrequency={2} waveAmplitude={1} gradient gradientStops={gradientStops}
                      circleStyle={{
                        fill: fillColor
                      }}
                      waveStyle={{
                        fill: fillColor
                      }}
                      textStyle={{
                        fill: color('#444').toString(),
                        fontFamily: 'Arial'
                      }}
                      waveTextStyle={{
                        fill: color('#fff').toString(),
                        fontFamily: 'Arial'
                      }} />
                  </Paper>
                  <Paper style={{ background: `#35475a`, height: '200px', borderRadius: 0, }}>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.typography}
                      style={{ position: 'relative', left: '6em', textAlign: 'center', fontSize: '12px', top: '15px' }}>
                      CONSUMPTION BY ROOMS
                      </Typography>
                    <PieChart width={200} height={200} onMouseEnter={this.onPieEnter} style={{ marginTop: "-2em" }}>
                      <Pie data={data} cx={100} cy={100} innerRadius={30} outerRadius={50} fill="#8884d8"
                        paddingAngle={5} dataKey="value" >
                        {
                          data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }
                      </Pie>
                      <Tooltip />
                      <Legend iconSize={10} width={100} height={100} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
                    </PieChart>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
          <div className="row" style={{ marginTop: '1em', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            {newArraywithDevices.map((device, index) => (
              <Link to={`${device.link}`} key={index}>
                <Card className={classes.card}
                  style={{ display: 'flex', borderRadius: 5, width: '250px' }}>
                  <Tooltip1 title={device.iconName} aria-label="Add " style={{ fontSize: '20px' }}>
                    <Fab className={classes.absolute}
                      style={{
                        position: 'relative', top: '21px', left: '25px', width: '45px',
                        height: '45px', background: "#21638a"
                      }}>
                      <FontAwesomeIcon style={{ fontSize: '3em', margin: '0em', position: 'absolute', top: '10px', left: '15px' }} icon={device.iconName} />
                      {/* color="#cf6f3c"  */}
                    </Fab>
                  </Tooltip1>
                  <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5" style={{ marginLeft: '4em', position: 'relative', top: '21px' }} className={classes.typography}>
                      {device.type}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            ))
            }
            <Card style={{ width: '100px', position: 'relative', left: '3em', background: `#35475a` }}>
              <Tooltip1 title="Add Device" aria-label="Add " style={{ fontSize: '20px' }}>
                <Fab className={classes.absolute}
                  style={{
                    position: 'relative', top: '30px', left: '25px', width: '45px',
                    height: '45px', background: "#21638a"
                  }}>
                  <AddIcon onClick={this.displayAddDeviceDialog} />
                </Fab>
              </Tooltip1>
            </Card>
          </div>
          <div style={this.state.openDialog ? { display: 'flex' } : { display: 'none' }}>
            <AddDevice openDialog={this.state.openDialog}
              callParentFunc={this.callParentFunc} cancelAddDevice={this.cancelAddDevice} />
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.loginInfo.loginCredentials,
    allUsers: state.loginInfo.allUsers,
    homeData: state.sidebar.smartHomeData,
    nestcamData: state.nestcam.nestcamData,
    dashboardData: state.dashboardData.modesDashboardData,
    devicesData: state.dashboardData.devicesData,
    deviceTypes: state.dashboardData.deviceTypes
  }
}
const mapDispatchToprops = (dispatch) => {
  return {
    getHomeDataFromApi: () => {
      dispatch(getHomeDataFromApi())
    },
    callNestCamApi: () => {
      dispatch(callNestCamApi())
    },
    fetchDashboardData: () => {
      dispatch(fetchDashboardData())
    },
    fetchDevicesData: () => {
      dispatch(fetchDevicesData())
    },
  }
}
export default connect(mapStateToProps, mapDispatchToprops)(withStyles(styles, { withTheme: true })(Dashboard));