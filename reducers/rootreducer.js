import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import sidebarReducer from './sidebarReducer';
import roomReducer from './roomReducer';
import securityReducer from './securityReducer';

import nestcamLiveReducer from './nestcamLiveReducer';
import dashboardRuder from './dashboardReducer';
import deviceopsReducer from './deviceopsReducer';
export default combineReducers({
    loginInfo: loginReducer,
    sidebar: sidebarReducer,
    room: roomReducer,
    nestcam: nestcamLiveReducer,
    dashboardData: dashboardRuder,
    security: securityReducer,
    devicesops: deviceopsReducer

});

