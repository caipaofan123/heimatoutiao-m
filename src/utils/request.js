import axios from 'axios';
import store from '../store';
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 5000
});
request.interceptors.request.use(
  (config) => {
    const token = store.state.user.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default request;
