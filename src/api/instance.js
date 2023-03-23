import axios from 'axios';

const instance = axios.create({
  baseURL: "http://localhost:3000",
}); 

instance.defaults.headers.common['Authorization']='Authorization';
 
instance.interceptors.request.use(function (config){

  config.params= config.params || {};
  config.params['auth'] ='put-token'
    console.log("Config:",config)
    return config;
})

export default instance;