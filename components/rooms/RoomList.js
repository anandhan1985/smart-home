import React, { Component, Fragment } from 'react';
import { fetchDeviceData, changeLightState, controlBrightness } from '../../actions/roomAction';
import { connect } from 'react-redux';
import './rooms.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class RoomList extends Component {
    state = {
        checkedItems: new Map(),
        type: 'hiot.light',
        listWithFilter: false,
        allList: true,
        lightState: []

    }
    componentDidMount = () => {
        this.props.fetchDeviceData()
    }
    changeDeviceLocation = (e) => {
        if (e.target.value === 'all')
            this.setState({ listWithFilter: false, allList: true })
        else
            this.setState({ selectdData: this.props.deviceData.devices.filter(item => item.location.location_id === e.target.value), listWithFilter: true, allList: false })

    }
    changeLightState = (data) => {
        const item = data.device_id;
        var isChecked, lightStat, dataItem;
        if (data.fields.power === 'on')
            isChecked = true;
        else
            isChecked = false;

        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));

        if (this.state.lightState.length === 0) {
            data.fields.power === 'on' ? document.getElementById(item).style.color = "white" : document.getElementById(item).style.color = "#f9c508";
            lightStat = data.fields.power === 'on' ? 'off' : 'on';
            dataItem = { 'id': item, 'state': lightStat }
            this.setState({
                lightState: [...this.state.lightState, dataItem]
            })
        } else {
            var ary = this.state.lightState;
            var arrVal;
            for (var index = 0; index < ary.length; index++) {
                if (item === ary[index].id) {
                    arrVal = true; break;
                } else {
                    arrVal = false;
                }
            }
            if (ary.length !== 0 && arrVal === true) {
                for (var light = 0; light < ary.length; light++) {
                    if (item === ary[light].id) {
                        this.state.lightState[light].state === 'on' ? document.getElementById(item).style.color = "white" : document.getElementById(item).style.color = "#f9c508";
                        lightStat = ary[light].state === 'on' ? 'off' : 'on';
                        let newState = Object.assign({}, this.state);
                        newState.lightState[light].state = lightStat;
                        this.setState(newState);
                        break;
                    }
                }
            } else {
                data.fields.power === 'on' ? document.getElementById(item).style.color = "white" : document.getElementById(item).style.color = "#f9c508";

                lightStat = data.fields.power === 'on' ? 'off' : 'on';
                dataItem = { 'id': item, 'state': lightStat }
                this.setState({
                    lightState: [...this.state.lightState, dataItem]
                })
            }
        }
        const lightData = {
            'state': lightStat,
            'lightId': data.device_id
        }
        if (data.api_url !== null)
            this.props.changeLightState(lightData)
    }

    getLightState = (power, name) => {
        if (this.state.lightState.length === 0) {
            return power === 'on' ? true : false;

        } else {
            return this.state.checkedItems.get(name);
        }
    }
    changeBrightness = (val, data) => {
        const brightData = {
            'value': val,
            'lightId': data.device_id
        }
        if (data.api_url !== null)
            this.props.controlBrightness(brightData)
    }

    render() {
        var arr = this.props.deviceData.devices;
        var uniqVAl = [];
        if (this.props.deviceData.length !== 0) {
            for (var i = 1; i < arr.length; i++) {
                if (arr[i].type === 'hiot.light') {
                    if (uniqVAl !== arr[i].location.location_id)
                        var value = {
                            'name': arr[i].location.name,
                            'id': arr[i].location.location_id
                        }
                    uniqVAl.push(value)
                }

            }
        }

        return (
            <Fragment>
                <div className='container light-container'>
                    <div className='location-list-outer'>
                        <label className='light-location'>Select Location</label>
                        {this.props.deviceData.length !== 0 ?
                            <select className="location-list" onChange={(e) => this.changeDeviceLocation(e)} >
                                <option value='all'>All</option>
                                {uniqVAl.map((data, index) =>
                                    <option value={data.id} key={index}>{data.name}</option>
                                )}
                            </select>
                            : null}

                    </div>
                    {this.state.allList === true ?
                        <div className='list-outer'>
                            {this.props.deviceData.length !== 0 ?
                                this.props.deviceData.devices.map((data, index) =>
                                    data.type === this.state.type ?
                                        <div className="card light-card" key={index}>
                                            <div className="card-body" style={{ height: '150px', float: 'left' }}>
                                                <h5 className="card-title device-title">{data.location.name}</h5>
                                                <FontAwesomeIcon id={data.device_id} icon='lightbulb' className={data.fields.power === 'on' ? 'on-bulb' : 'off-bulb'} />
                                                <label className="switch">
                                                    <input checked={this.getLightState(data.fields.power, data.name)} onChange={() => this.changeLightState(data)} id='lightControl' type="checkbox" name={data.device_id} />
                                                    <span className="slider round"></span>
                                                </label>
                                                <input readOnly onChange={(e) => this.changeBrightness(e.target.value, data)} className='brightness-range' defaultValue={data.fields.brightness} type="range" min="0.1" max="0.9" step='0.1' />

                                            </div>
                                        </div>
                                        : null
                                ) : null}
                        </div>
                        : null}

                    {this.state.listWithFilter === true ?
                        <div className='list-outer' style={{ width: '100%' }}>
                            {this.state.selectdData !== '' ?
                                this.state.selectdData.map((data, index) =>
                                    data.type === this.state.type ?
                                        <div className="card light-card" key={index} style={{ margin: '15px' }}>
                                            <div className="card-body" style={{ height: '150px', float: 'left', backgroundColor: ' #34465a' }}>
                                                <h5 className="card-title device-title">{data.location.name}</h5>
                                                <FontAwesomeIcon id={data.device_id} icon='lightbulb' className={data.fields.power === 'on' ? 'on-bulb' : 'off-bulb'} />
                                                <label className="switch">
                                                    <input checked={this.getLightState(data.fields.power, data.name)} onChange={() => this.changeLightState(data)} id='lightControl' type="checkbox" name={data.device_id} />
                                                    <span className="slider round"></span>
                                                </label>
                                                <input className='brightness-range' value={data.fields.brightness} type="range" min="0.1" max="0.9" step='0.1' />
                                            </div>
                                        </div>
                                        : null
                                ) : null}
                        </div>
                        : null}


                </div>

            </Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        deviceData: state.room.deviceData,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchDeviceData: () => dispatch(fetchDeviceData()),
        changeLightState: (data) => dispatch(changeLightState(data)),
        controlBrightness: (brightData) => dispatch(controlBrightness(brightData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RoomList);