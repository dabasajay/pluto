import axios from 'axios';
import { API_ENDPOINTS } from '../constants';
import isEmpty from '../utils/isEmpty';

const createURL = (baseURL = '', urlParam = '', queryParam = {}) => {
  return `${baseURL}/${urlParam}${new URLSearchParams(queryParam).toString()}`;
};

const API = {
  auth: {
    post: async (data: {}) => {
      const { AUTH: BaseURL } = API_ENDPOINTS;
      try {
        const res = await axios.post(createURL(BaseURL), data);
        return { ...res.data };
      } catch (err) {
        const { message } = err.response.data;
        return { message: !isEmpty(message) ? message : 'Failed to connect to server!' };
      }
    },
  },
  user: {
    post: async (data: {}) => {
      const { USER: BaseURL } = API_ENDPOINTS;
      try {
        const res = await axios.post(createURL(BaseURL), data);
        return { ...res.data };
      } catch (err) {
        const { message } = err.response.data;
        return { message: !isEmpty(message) ? message : 'Failed to connect to server!' };
      }
    },
  },
  agg: {
    get: async () => {
      const { AGG: BaseURL } = API_ENDPOINTS;
      try {
        const res = await axios.get(createURL(BaseURL + '/count/userandproject'));
        return { ...res.data };
      } catch (err) {
        const { message } = err.response.data;
        return { message: !isEmpty(message) ? message : 'Failed to connect to server!' };
      }
    },
  },
};

export default API;
