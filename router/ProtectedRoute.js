// import React from "react";
// import { Route, Redirect} from 'react-router-dom';
// import auth from "./Auth";

// export const ProtectedRoute = ({ component: Component,
//     ...rest }) => {
//   //  console.log(rest);
    
//     return(
//         <Route
//         {...rest}
//         render={props => {
//           if (auth.isAuthentication()) { 
//               console.log(rest)
//             return <Component {...props} />;
//           } else {
//             return (
//               <Redirect
//                 to={{
//                   pathname: "/",
//                   state: {
//                     from: props.location
//                   }
//                 }}
//               />
//             );
//           }
//         }}
//       />
//     )
// }