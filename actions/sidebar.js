import * as actionReqType from './action-type';
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
                type: 'HOME_DATA',
                payload: data
            })
        }).catch(error => {
            dispatch({
                type: 'HOME_DATA_ERROR',
                payload: error
            })
        })
    }
}
export const setStateDrawerOpen = (val) => {
    return (dispatch) => {
        dispatch({
            type: 'DRAWER_OPEN',
            payload: val
        })
    }
}
export const setStateDrawerClose = (val) => {
    return (dispatch) => {
        dispatch({
            type: 'DRAWER_ClOSE',
            payload: val
        })
    }
}

// var header = {

//     'Authorization': 'Bearer cc20816b1c9c46dd4e42b82e3f5c0cb6315f8e0de29cea5c02231836636758f2',
//     'Access-Control-Allow-Headers': "Access-Control-*, Origin, X-Requested-With, Content-Type, Accept",
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin': '*'
// }
export const getRoomsListFromApi = () => {
    return (dispatch) => {
        // axios.get('https://api.lifx.com/v1/lights/all',{ headers: { header } })
        // .then(roomData =>{
        //     console.log(roomData.data)
        // })

        fetch('https://api.lifx.com/v1/lights/all', {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer cc20816b1c9c46dd4e42b82e3f5c0cb6315f8e0de29cea5c02231836636758f2',
                'Content-Type': 'application/json'
            }),
        }).then(response => response.json())
            .then(data => {
                dispatch({
                    type: 'ROOMS_DATA_FROM_API',
                    payload: data
                })
            })

    }
}
export const setSelectedRoomData = (roomData) => {
    return (dispatch) => {
        dispatch({
            type: 'SELCTD_ROOM_DATA',
            payload: roomData
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

