import * as actionReqType from '../actions/action-type';

const initialState = {
    devicesList: []
}


export default function (state = initialState, action) {

    switch (action.type) {

        case actionReqType.DEVICE_LIST:
            console.log(action.payload)
            return {
                ...state,
                devicesList: action.payload
            }

        default:
            return state;
    }

}
