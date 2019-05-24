import * as actionReqType from '../actions/action-type';
import storage from 'redux-persist/lib/storage';
const initialStore = {
    smartHomeData: [],
    open: false,
    error: {},
    anchorE1LogoutMenu: null,
    roomsData: {},
    selctdRoomData: {}
}
export default function sideBarReducer(state = initialStore, action) {
    switch (action.type) {
        case actionReqType.HOME_DATA: {
            return {
                ...state,
                smartHomeData: action.payload
            }
        }
        case actionReqType.DRAWER_OPEN: {
            return {
                ...state,
                open: action.payload
            }
        }
        case actionReqType.DRAWER_ClOSE: {
            return {
                ...state,
                open: action.payload
            }
        }
        case actionReqType.HOME_DATA_ERROR: {
            return {
                ...state,
                error: action.payload
            }
        }
        case actionReqType.ANCHOR_OPEN: {
            return {
                ...state,
                anchorE1LogoutMenu: action.payload
            }
        }

        case actionReqType.ANCHOR_CLOSE: {
            return {
                ...state,
                anchorE1LogoutMenu: null
            }
        }
        case actionReqType.LOGOUT: {
            storage.removeItem('persist:root')
           state = undefined
          return {
              ...state
          }
        }
        default:
            return { ...state }
    }
}