import * as actionReqType from '../actions/action-type';

const initialState = {
    modesDashboardData: [],
    roomsDashBoardData: {},
    devicesData: [],
    deviceTypes: {},
    deviceDataDisplay: [],
    rulesProduce: [],
    newDevice : {},
    deviceState: 'Food Container'
}


export default function (state = initialState, action) {

    switch (action.type) {

        case actionReqType.DASHBOARD_DATA:

            return {
                ...state,
                modesDashboardData: action.payload
            }
        case actionReqType.DEVICES:

            const groupBy = key => array =>
                array.reduce((objectsByKeyValue, obj) => {
                    // console.log(objectsByKeyValue)
                    // console.log(obj)
                    const value = obj[key];
                    //console.log(value)

                    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
                    // console.log(objectsByKeyValue)
                    return objectsByKeyValue;
                }, {});
            let devicesVar = groupBy('type');


            return {
                ...state,
                devicesData: action.payload,
                deviceTypes: devicesVar(action.payload)
            }

        case actionReqType.DEVICEDATA:

            Object.entries(state.deviceTypes).map(([key, value]) => {
                //console.log(key)
                if (key === initialState.deviceState) {

                    initialState.deviceDataDisplay = value;
                }
                return 0;
            });
            return {
                ...state,
                deviceDataDisplay: initialState.deviceDataDisplay
            }
            case actionReqType.RULE_PRODUCE:
            return {
                ...state,
                rulesProduce: action.payload
            }
            case actionReqType.ADD_NEW_DEVICE:
            console.log(action.payload)
            return {
                ...state,
                newDevice: action.payload
            }
        default:
            return state;
    }

}
