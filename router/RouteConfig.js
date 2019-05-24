import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../components/login/Login';
import Dashboard from '../components/dashboard/Dashboard';
import RoomList from '../components/rooms/RoomList';
import { connect } from 'react-redux';
import Security from '../components/security/Security';
import Kitchen from '../components/kitchen/Kitchen';
import DeviceLocations from '../components/devices/DeviceLocations'
import ThermostatConfig from '../components/devices/ThermostatConfig';
import DeviceList from '../components/devices/DeviceList';
class RouteConfig extends Component {


  render() {
    const ProtectedRoute = ({ component: Component,
      ...rest }) => {

      return (
        <Route
          {...rest}
          render={props => (
            this.props.authendicated ?
              <Component {...props} /> :
              <Redirect
                to="/"
              />
          )}
        />
      )
    }

    return (
      <div>
        <Switch>
          <Route exact path='/' component={Login} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <ProtectedRoute path='/lights' component={RoomList} />
          <ProtectedRoute path="/security" component={Security} />
          <ProtectedRoute path="/kitchen" component={Kitchen} />
          <ProtectedRoute path='/deviceLocations' component={DeviceLocations}/>
          <ProtectedRoute path='/thermostatConfig' component={ThermostatConfig}/>
          <ProtectedRoute path='/deviceList' component={DeviceList}/>
          <Route excat path="*" component={() => "404 Not Found"} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  authendicated: state.loginInfo.authendicated
})

export default connect(mapStateToProps)(RouteConfig);

