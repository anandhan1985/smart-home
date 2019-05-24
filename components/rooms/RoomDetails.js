import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './rooms.css';
import { changeLightState, controlBrightness } from '../../actions/roomAction';
import { Link } from 'react-router-dom'

class RoomDetails extends Component {
    state = {
        checked: false,
        brightController: false,
    }
    componentWillMount = () => {
        if (this.props.roomData.power === 'off')
            this.setState({ checked: false, brightController: false });
        else
            this.setState({ checked: true, brightController: true });
    }
    lightControl = (e) => {
        this.setState({ checked: !this.state.checked });
        const lightData = {
            'checked': e.target.checked,
            'lightId': this.props.roomData.id
        }
        this.props.changeLightState(lightData)
        if (e.target.checked === false) {
            this.setState({ brightController: false })
            document.getElementById("roomLight").src = "assets/images/light-bulb.png"
        } else {
            this.setState({ brightController: true })
            document.getElementById("roomLight").src = "assets/images/bulb-512.png"

        }
    }
    controlBrightness = (e) => {
        //console.log(e.target.value)
        const brightData = {
            'value': e.target.value,
            'lightId': this.props.roomData.id
        }
        this.props.controlBrightness(brightData)
    }
    render() {

        const styles = {
            display: 'flex',
            margin: 'auto'
        }

        return (
            <Fragment>
                <Link to='/rooms' className='btn btn-secondary back-btn'>Back</Link>
                <div className='container' style={styles}>

                    <div className="card" style={{ margin: 'auto' }} >

                        {this.props.roomData.power === 'off' ?
                            <img id='roomLight' className="card-img-nolight" alt="title" src="assets/images/light-bulb.png"></img>
                            :
                            <img id='roomLight' className="cad-img-light" alt="title" src="assets/images/bulb-512.png"></img>
                        }
                        <div className="card-body">
                            <h5 className="card-title">{this.props.roomData.product.name}</h5>
                            <p className="card-text">{this.props.roomData.group.name}</p>
                            <label className="switch">
                                <input checked={this.state.checked} id='lightControl' type="checkbox" name='lightControl' onChange={e => { this.lightControl(e) }} />
                                <span className="slider round"></span>
                            </label>

                            {this.state.brightController === true ? <input onClick={(e) => this.controlBrightness(e)} type="range" min="0.1" max="0.9" step='0.1' /> : null}

                        </div>
                    </div>

                </div>
            </Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        roomData: state.room.selctdRoomData
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeLightState: (lightState) => dispatch(changeLightState(lightState)),
        controlBrightness: (brightData) => dispatch(controlBrightness(brightData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RoomDetails);