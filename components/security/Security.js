import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './security.css'
import { fetchDeviceData } from '../../actions/securityAction'

class Security extends Component {
  state = {
    enableMotionBox: false,
    selectdData: [],
    motion_device: 'motion_detector',
    inside_home: 'btn btn-success',
    outside_home: null,
    inside_text: 'Inside Home',
    btn: null,
    outside_text: null,
    outerActive: false

  }
  componentWillMount = () => {
    this.props.fetchDeviceData()
  }

  enableDeviceDetialsBox = () => {
    this.setState({ enableMotionBox: true })
  }
  disableDeviceDetialsBox = () => {
    this.setState({ enableMotionBox: false })
  }
  changeToOutsideHome = () => {
    this.setState({ outerActive: true, inside_text: null, outside_text: 'Outside Home', inside_home: null, outside_home: 'btn btn-danger' })
  }
  changeToInsideHome = () => {
    this.setState({ outerActive: false, inside_text: 'Inside Home', outside_text: null, outside_home: null, inside_home: 'btn btn-success' })
  }

  render() {

    return (
      <Fragment>
        <div className='container'>

          <div className='security-card-outer'>
            <div className='security-outer'>
              <div className="card security" >
                <h5 className='device-text'>Device List</h5>

                <div className='security-icon-outer'>
                  <img onClick={() => this.enableDeviceDetialsBox()} alt='title' title='motion detector' className="card-img-device-icon" src="/assets/images/Movement_Detection.png" />
                  <label className='security-icon-label'>Motion Detector</label>
                </div>
                <div className='security-icon-outer'>
                  <img alt='title' title='Smart locker' className="card-img-device-icon" src="/assets/images/smart-lock.png" />
                  <label className='security-icon-label'>Smart locker</label>
                </div>
                <div className='security-icon-outer'>
                  <img alt='title' title='Ring Door Bell' className="card-img-device-icon" src="/assets/images/ring-door-bell.png" />
                  <label className='security-icon-label'>Ring Door Bell</label>
                </div>

              </div>
            </div>

            {this.state.enableMotionBox === true ?

              <div className='security-details-outer'>
                <div className='close-btn-outer'>
                  <img className='close-btn' onClick={() => this.disableDeviceDetialsBox()} alt='title' title='close' src="/assets/images/Close-Button.png" />
                </div>
                <div className='switch-outer'>
                  <span className='switch-btn'>
                    <button onClick={() => this.changeToOutsideHome()} type="button" className={this.state.inside_home}>{this.state.inside_text}</button>
                    <button onClick={() => this.changeToInsideHome()} type="button" className={this.state.outside_home}>{this.state.outside_text}</button>
                  </span>
                </div>
                {this.props.deviceData.length !== 0 ? this.props.deviceData.devices.map((data, index) =>
                  data.type === 'motion_detector' ?
                    <div className={"card security-details " + data.class_name} key={index} >
                      <div className="custom-control">
                        <div className='top-title'>
                          <h5 className="card-title">{data.location.name}</h5>
                        </div>
                        <span className='device-state-img'>
                          {data.fields.detected_status === true ? <img className="card-object" alt='title' title='object' src="/assets/images/motion-red.png" /> : <img className="card-object" alt='title' title='object' src="/assets/images/motion-green.png" />}
                        </span>
                      </div>
                      <div className="card-body" style={{boxShadow:'none'}}>
                        {this.state.outerActive === true || data.fields.mode === 'outer' ?
                          <div>
                            {data.fields.detected_status === true ?
                              <Fragment>
                                <div className="blink"><span className='blink-text'>Someone entered in home</span></div>
                                <audio controls autoPlay loop>
                                  <source src="/assets/sound/beep-04.mp3" type="audio/mpeg" />
                                  Your browser does not support the audio element.
                          </audio>
                              </Fragment>
                              : <div className="blink"><span style={{ color: 'green' }} className='blink-text'>No one entered in home</span></div>
                            }
                          </div>
                          :
                          <div>
                            {data.fields.detected_status === true ?
                              <div className="blink">
                                <span className='blink-text'>Object Moving</span>
                              </div>
                              :
                              <div className="blink">
                                <span style={{ color: 'green' }} className='blink-text'>
                                  Object not found
                              </span>
                              </div>
                            }
                          </div>
                        }
                      </div>
                    </div>
                    : null
                ) : null}

              </div>
              : null}
          </div>
        </div>
      </Fragment>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    deviceData: state.security.deviceData
  }
}
const mapDispatchToProps = (dispatch) => {
  return { fetchDeviceData: () => dispatch(fetchDeviceData()) }
}
export default connect(mapStateToProps, mapDispatchToProps)(Security);