import * as actionReqType from '../actions/action-type';
//import axios from 'axios';
export const showLoader = () => {
    return (dispatch) => {
        dispatch({
            type: actionReqType.SHOW_LOADER,
            payload: true
        })
    }
}
export const hideLoader = () => {
    return (dispatch) => {
        dispatch({
            type: actionReqType.HIDE_LOADER,
            payload: false
        })
    }
}
export const fetchDeviceData = () => {

    return (dispatch) => {
        fetch('devices.json')
            .then(response => response.json())
            .then(localData => {
                //console.log(localData)
                localData.devices.map(data => {
                    if (data.api_url !== null && data.type === 'hiot.light') {
                        //console.log(data.fields.brightness)

                        fetch(data.api_url + "/" + data.device_id + "/state/", {
                            method: 'PUT',
                            headers: new Headers({
                                'Authorization': 'Bearer cc20816b1c9c46dd4e42b82e3f5c0cb6315f8e0de29cea5c02231836636758f2',
                                'Content-Type': 'application/json'
                            }),
                            body: JSON.stringify({
                                "power": data.fields.power,
                                "color": "blue saturation:" + data.fields.brightness,
                                "brightness": parseFloat(data.fields.brightness),
                                "duration": 5,
                            })
                        })
                            .then((response) => response.text())
                            .then((responseText) => {
                                console.log(responseText)
                            })
                            .catch((error) => {
                                dispatch({
                                    type: actionReqType.LIGHT_CHANGE_STATE_ERROR,
                                    payload: error
                                })
                            });
                    }
                    return ''
                })
                dispatch({
                    type: actionReqType.ROOMS_DATA_FROM_API,
                    payload: localData
                })
            })
        //dispatch(hideLoader())

    }
}
export const changeLightState = (lightState) => {



    return (dispatch) => {
        fetch('https://api.lifx.com/v1/lights/' + lightState.lightId + "/state/", {
            method: 'PUT',
            headers: new Headers({
                'Authorization': 'Bearer cc20816b1c9c46dd4e42b82e3f5c0cb6315f8e0de29cea5c02231836636758f2',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                'power': lightState.state
            })
        })
            .then((response) => response.text())
            .then((responseText) => {
                // this.getRoomsListFromApi();
                console.log(responseText)
            })
            .catch((error) => {
                dispatch({
                    type: actionReqType.LIGHT_CHANGE_STATE_ERROR,
                    payload: error
                })
            });
    }
}
export const controlBrightness = (brightData) => {

    console.log(brightData.value)
    return (dispatch) => {
        fetch("https://api.lifx.com/v1/lights/" + brightData.lightId + "/state/", {
            method: 'PUT',
            headers: new Headers({
                'Authorization': 'Bearer cc20816b1c9c46dd4e42b82e3f5c0cb6315f8e0de29cea5c02231836636758f2',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                "color": "blue saturation:" + brightData.value,
                "brightness": parseFloat(brightData.value),
                "duration": 5,
            })
        })
            .then((response) => response.text())
            .then((responseText) => {
                // this.getRoomsListFromApi();
                console.log(responseText)
            })
            .catch((error) => {
                dispatch({
                    type: actionReqType.LIGHT_CHANGE_STATE_ERROR,
                    payload: error
                })
            });
    }
}
export const setSelectedRoomData = (roomData) => {
    return (dispatch) => {
        dispatch({
            type: actionReqType.SELCTD_ROOM_DATA,
            payload: roomData
        })
    }
}