import * as actionReqType from '../actions/action-type';

export const fetchDeviceData = () => {
    return (dispatch) => {
        fetch('devices.json')
            .then(responce => responce.json())
            .then(data => {
                dispatch({
                    type: actionReqType.FETCH_DEVICE_DATA,
                    payload: data
                })
            })
    }
}