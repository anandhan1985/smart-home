import * as actionReqType from '../actions/action-type';
const initialStore = {
    deviceData: [],
    selctdRoomData: {},
    loader: true
}
export default function sideBarReducer(state = initialStore, action) {
    switch (action.type) {
        case actionReqType.ROOMS_DATA_FROM_API: {
            return {
                ...state,
                deviceData: action.payload
            }
        }
        case actionReqType.SELCTD_ROOM_DATA: {
            return {
                ...state,
                selctdRoomData: action.payload
            }
        }
        case actionReqType.SHOW_LOADER: {
            return {
                ...state,
                loader: action.payload,
            }
        }
        case actionReqType.HIDE_LOADER: {
            return {
                ...state,
                loader: action.payload,
            }
        }
        case actionReqType.LIGHT_CHANGE_STATE_ERROR: {
            return {
                ...state,
                error: action.payload,
            }
        }
        default:
            return { ...state }
    }
}