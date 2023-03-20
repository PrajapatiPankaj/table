import React from 'react';
import ReactDOM from 'react-dom/client';
import  store  from './store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
 import { Provider } from "react-redux";
 import axios from 'axios';
import App from './App';
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";



// axios.defaults.baseURL = "http://localhost:3000";
// axios.defaults.headers.common['Authorization'] = 'Authoriation'

axios.interceptors.request.use((request)=>{
  console.log('interceptor Request:', request);
})
let persistor = persistStore(store);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

