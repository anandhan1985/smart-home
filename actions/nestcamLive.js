
//import * as axios from 'axios';
import * as actionReqType from './action-type';
var NEST_API_URL = 'https://developer-api.nest.com/devices/cameras/4uFeThBSHa0lCbvCiWCBwHDTEGp2d41h_aehdsoMoFLjEHhmLA1nYA';
export const callNestCamApi = () => dispatch => {
    /**
 * Create an EventSource object which handles the long-running GET request to
 * the Nest REST Streaming API. The EventSource object emits events as they are
 * published by the API.
 *
 * (Note that you can't set the Authorization header in the browser EventSource API,
 *  so you need to add the auth token to the URL.)
 */
    var token = "c.Uwo0jae6FN7PB7RZbv38ATmF3gI86ngSOrGJY9kpUCnovCffp823Y1vocRA43F9PkQmXw3zUwRSWLqRFxsnwS6zNJ2irLjmUPI18yw4QnjLj3v7HDm8LA9oOyzBnBAubG79hjdRCxlxQteyT";
    var source = new EventSource(NEST_API_URL + '?auth=' + token);

    
    /**
     * The 'put' event is received when a change is made to any of the Nest devices.
     * This callback will render all of the new device states to the browser.
     */
    source.addEventListener('put', function (e) {
        console.log(e.data);
            return dispatch({
                type:actionReqType.LIVESTREAM_SUCCESS,
                payload: JSON.parse(e.data).data
            })
       
    });

    /**
     * When the authentication token is revoked, log out the user.
     */
    source.addEventListener('auth_revoked', function (e) {
        //window.location = '/auth/logout';
    });

    /**
     * The 'open' event is emitted when a connection is established with the API.
     */
    source.addEventListener('open', function (e) {
        console.log('Connection opened!');
        // $('#connect-state-img').attr('src', '/img/green-state.png');
    }, false);

    /**
     * The 'error' event is emitted when an error occurs, such as when the connection
     * between the EventSource and the API is lost.
     */
    source.addEventListener('error', function (e) {
        if (e.readyState === EventSource.CLOSED) {
            console.error('Connection was closed! ', e);
        } else {
            console.error('An error occurred: ', e);
        }
        //$('#connect-state-img').attr('src', '/img/red-state.png');
    }, false);


}


















// import * as axios from 'axios';
// import * as actionReqType from './action-type';
// var NEST_API_URL = 'https://developer-api.nest.com';
// export const callNestCamApi = () => dispatch => {
  
//     var token = "c.Uwo0jae6FN7PB7RZbv38ATmF3gI86ngSOrGJY9kpUCnovCffp823Y1vocRA43F9PkQmXw3zUwRSWLqRFxsnwS6zNJ2irLjmUPI18yw4QnjLj3v7HDm8LA9oOyzBnBAubG79hjdRCxlxQteyT";
   
//     let config = {
//         headers:{
//             "Authorization":"Bearer c.Uwo0jae6FN7PB7RZbv38ATmF3gI86ngSOrGJY9kpUCnovCffp823Y1vocRA43F9PkQmXw3zUwRSWLqRFxsnwS6zNJ2irLjmUPI18yw4QnjLj3v7HDm8LA9oOyzBnBAubG79hjdRCxlxQteyT",
//             "Access-Control-Allow-Origin":"http://localhost:3000",
//             "Content-Type":"application/json"          
//         }
//     }
//     //+"?auth=" + token
// axios.get("https://developer-api.nest.com", config).then(response => {
//     console.log(response)
//  }) 
//  .catch(err => {
//     console.log(err);
//  });
    

// }