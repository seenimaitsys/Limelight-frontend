import axios from "axios";
axios.defaults.withCredentials = true;
const https = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 50000,
});
export default https;
