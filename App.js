import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './custom.css';
import RouteConfig from './router/RouteConfig';
import Sidebar from './components/dashboard/Sidebar';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faLightbulb, faLock, faUtensils, faTh, 
  faUserCircle, faHome, faSun, faMoon, faThermometerEmpty, faTint, faShoppingBasket, 
  faThermometerFull, faPlusCircle, faChartLine, faLaptop, faChartPie, faChartBar } from '@fortawesome/free-solid-svg-icons'
 
library.add(fab, faCheckSquare, faCoffee, faLightbulb, faLock, faUtensils, faTh, 
  faUserCircle, faHome, faSun, faMoon, faThermometerEmpty, faTint, 
  faShoppingBasket, faThermometerFull, faPlusCircle, faChartLine, faChartPie, faLaptop, faChartBar)
class App extends Component {
  render() {

    return (
      <div className="container-fluid" style={{ overflow: `hidden` }}>>
        <Router>
          {this.props.authendicated === true ? <Sidebar /> : null}
          <RouteConfig />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authendicated: state.loginInfo.authendicated
})

export default connect(mapStateToProps)(App);
