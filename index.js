import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import { PersistGate } from 'redux-persist/integration/react'
import  thunk  from "redux-thunk";
import rootReducer from './reducers/rootreducer';
import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


//font family changes
const THEME = createMuiTheme({
    typography: {
     "fontFamily": "\"Roboto\"",
     "fontSize": 10,
     color:"white",
     "fontWeightLight": 300,
     "fontWeightRegular": "normal",
     "fontWeightMedium": 500
    },
    inputlabel:{
        "color":"white"
    }
 });

 //keep data on refresh - persist config

const persistConfig = {
    key: 'root',
    storage,
  }

 const persistedReducer = persistReducer(persistConfig, rootReducer)

 //store creation redux
const store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store)


ReactDOM.render(( <MuiThemeProvider theme={THEME}><Provider store={store}>
<PersistGate loading={null} persistor={persistor}>
<App /></PersistGate></Provider></MuiThemeProvider>), document.getElementById('root'));
