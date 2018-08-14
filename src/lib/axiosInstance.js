import config from '../config';
import axios from 'axios';

let instance;

if (process.env.NODE_ENV === "development") {
  instance = axios.create({
    // headers: { "ORGANISATION-NAME": config.orgName }
  });
} else {
  instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  });
}

export default instance;