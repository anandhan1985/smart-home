import * as actionReqType from './action-type';
import axios from 'axios';


export const fetchDashboardData = () => dispatch=> {
    axios.get("/assets/modes.json")
    .then((res)=>{
        return dispatch ({
            type: actionReqType.DASHBOARD_DATA,
            payload: res.data.modes
        })
    }).catch(err => console.log(err));
}
export const fetchDevicesData = () => dispatch=> {
    axios.get("/devices.json")
    .then((res)=>{
        return dispatch ({
            type: actionReqType.DEVICES,
            payload:res.data.devices
        })
    }).catch(err => console.log(err));
}

export const getDeviceData = () => dispatch=> {
    
        return dispatch ({
            type: actionReqType.DEVICEDATA,
           
        })
}

export const getRulesForProduce = () => dispatch=> {
    axios.get("/assets/rulesForProduce.json")
    .then((res)=>{
        return dispatch ({
            type: actionReqType.RULE_PRODUCE,
            payload:res.data
        })
    }).catch(err => console.log(err));
}
export const newDevice = (data) => dispatch=> {
   
        return dispatch ({
            type: actionReqType.ADD_NEW_DEVICE,
            payload:data
        })
   
}