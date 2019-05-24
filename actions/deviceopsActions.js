import * as actionReqType from './action-type';
import axios from 'axios';


export const deviceList = () => dispatch=> {
    axios.get("/devices.json")
    .then((res)=>{
        return dispatch ({
            type: actionReqType.DEVICE_LIST,
            payload: res.data.devices
        })
    }).catch(err => console.log(err));
}
