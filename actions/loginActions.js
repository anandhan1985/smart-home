import * as actionReqType from './action-type';
import axios from 'axios';

export const logIn = (values) => dispatch => {
   
        axios.get('/assets/loginCredentials.json')
    .then((res) => {
       // console.log(res.data);
       
        for(var i=0;i<res.data.length;i++){
            if((res.data[i].userName===values.userName) && (res.data[i].password === values.password)){
               
            
                return dispatch ({
                    type: actionReqType.LOGIN_SUCCESS,
                    payload: {"loggedInUser":res.data[i],"allUsers":res.data}
                })
            }
            else{
                console.log("not allowed")
            }
        }
        //response.forEach(function(indres, index){
            
        // })
        
    //     if(val) {
           
    //         return dispatch ({
    //         type: actionReqType.LOGIN_FAILURE,
    //         payload: 'Invalid email or password'
    //     })
    // }
        
    })
    .catch(err => dispatch(errorCall(JSON.stringify(err))))
   
    
    
} 



export const errorCall = (err) => dispatch => {
    return dispatch ({
        type: actionReqType.LOGIN_FAILURE,
        payload: err
    })
}