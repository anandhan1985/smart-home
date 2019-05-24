import * as actionReqType from '../actions/action-type';

const initialState ={
    nestcamData:{}
}


export default function (state = initialState, action){

    switch(action.type){
        
        case actionReqType.LIVESTREAM_SUCCESS:
        console.log(action.payload)
        return {
            ...state,
           nestcamData:action.payload
        }
       

        default:
        return state;
    }

}
