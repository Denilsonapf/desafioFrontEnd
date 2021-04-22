import React from 'react';
import Routes from './routes';
import store from './store/index';
import { Provider } from 'react-redux';
require('dotenv').config();

export default function App() {

  return(
   <Provider store ={store}> 
      <Routes />
    </Provider>
    );

}