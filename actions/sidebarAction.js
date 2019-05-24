import * as actionReqType from '../actions/action-type';
//import axios from 'axios';

export const getHomeDataFromApi = () => {
    return (dispatch) => {
        fetch('smart-home.json').then(response => {
            if (response.ok)
                return response.json()
            else
                throw new Error('Something went wrong');
        }).then(data => {
            dispatch({
                type: actionReqType.HOME_DATA,
                payload: data
            })
        }).catch(error => {
            dispatch({
                type: actionReqType.HOME_DATA_ERROR,
                payload: error
            })
        })
    }
}
export const setStateDrawerOpen = (val) => {
    return (dispatch) => {
        dispatch({
            type: actionReqType.DRAWER_OPEN,
            payload: val
        })
    }
}
export const setStateDrawerClose = (val) => {
    return (dispatch) => {
        dispatch({
            type: actionReqType.DRAWER_ClOSE,
            payload: val
        })
    }
}
//header logout
export const setStateHandleMenu = (val) => {
    return (dispatch) => {
        dispatch({
            type: actionReqType.ANCHOR_OPEN,
            payload: val
        })
    }
}

export const setStateHandleClose = () => {
    return (dispatch) => {
        dispatch({
            type: actionReqType.ANCHOR_CLOSE

        })
    }
}


//logout

export const logOutFunc = () => dispatch => {
    return dispatch ({
        type: actionReqType.LOGOUT
    })
    
}