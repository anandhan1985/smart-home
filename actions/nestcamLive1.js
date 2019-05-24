import * as axios from 'axios';
import * as actionReqType from './action-type';
var NEST_API_URL = 'https://developer-api.nest.com';
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
axios.get(NEST_API_URL,{
    headers: {
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/json'
    }
}).then(response => {
    console.log(response)
 }) 
 .catch(err => {
    console.log(err);
 });
    /**
     * The 'put' event is received when a change is made to any of the Nest devices.
     * This callback will render all of the new device states to the browser.
     */
    source.addEventListener('put', function (e) {
        console.log(e.data);

        var data = JSON.parse(e.data).data || {};
        var devices = data.devices || {};
        var thermostats = devices.thermostats || {};
        var smokeAlarms = devices.smoke_co_alarms || {};
        var cameras = devices.cameras || {};
        var structures = data.structures || {};

        var structureArr = Object.keys(structures).map(function (id) {
            var thermostatIds = structures[id].thermostats || [];
            var smokeAlarmIds = structures[id].smoke_co_alarms || [];
            var cameraIds = structures[id].cameras || [];

            return {
                name: structures[id].name,
                away: structures[id].away,
                thermostats: thermostatIds.map(function (id) { return thermostats[id]; }),
                smokeAlarms: smokeAlarmIds.map(function (id) { return smokeAlarms[id]; }),
                cameras: cameraIds.map(function (id) { return cameras[id]; })
            };
        });

        console.log(structureArr);
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
        if (e.readyState == EventSource.CLOSED) {
            console.error('Connection was closed! ', e);
        } else {
            console.error('An error occurred: ', e);
        }
        //$('#connect-state-img').attr('src', '/img/red-state.png');
    }, false);


}