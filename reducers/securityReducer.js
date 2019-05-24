import * as actionReqType from '../actions/action-type';
const initailState = {
    deviceData: []
}
export default function securityReducer(state = initailState, action) { 
    switch (action.type) {
        case actionReqType.FETCH_DEVICE_DATA: { 
            return {
                ...state,
                deviceData: action.payload
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}