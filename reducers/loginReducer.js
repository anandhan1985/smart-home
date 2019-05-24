import * as actionReqType from '../actions/action-type';

const initialState ={
    loginCredentials : {},
    authendicated: false,
    allUsers:[]
}


export default function (state = initialState, action){

    switch(action.type){
        
        case actionReqType.LOGIN_SUCCESS:
        //console.log(action.payload.allUsers);
        return {
            ...state,
            loginCredentials:action.payload.loggedInUser,
            allUsers:action.payload.allUsers,
            authendicated: true
        }
        case actionReqType.LOGIN_FAILURE:
        return{
            ...state,
            loginFailure: action.payload,
            authendicated: false
        }

        default:
        return state;
    }

}
