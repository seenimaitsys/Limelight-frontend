import axios from "axios";
import { store } from "../redux/store"; // Ensure this path is correct to your Redux store

const https = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API, // Update to your correct base URL
  timeout: 50000,
});

https.interceptors.request.use(
  function (config) {
    // Get the current state from the store
    const state = store.getState();
    const token = state.loginReducer.accesstoken || {};

    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default https;
