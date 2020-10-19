import axios from 'axios';
import { API_ENDPOINTS } from '../constants';
import isEmpty from '../utils/isEmpty';

const createURL = (baseURL = '', urlParam = '', queryParam = {}) => {
  return `${baseURL}/${urlParam}${new URLSearchParams(queryParam).toString()}`;
};

const createErrorMessage = (err: any) => ({
  message: !isEmpty(err?.response?.data?.message) ? err?.response?.data?.message : 'Failed to connect to server!'
});

const API = {
  auth: {
    post: async (data: {}) => {
      const { AUTH: BaseURL } = API_ENDPOINTS;
      try {
        const res = await axios.post(createURL(BaseURL), data);
        return { ...res.data };
      } catch (err) {
        return createErrorMessage(err);
      }
    },
  },
  user: {
    get: async (urlParam = '', queryParam = {}) => {
      const { USER: BaseURL } = API_ENDPOINTS;
      try {
        const res = await axios.get(createURL(BaseURL, urlParam, queryParam));
        return { ...res.data };
      } catch (err) {
        return createErrorMessage(err);
      }
    },
    post: async (data: {}) => {
      const { USER: BaseURL } = API_ENDPOINTS;
      try {
        const res = await axios.post(createURL(BaseURL), data);
        return { ...res.data };
      } catch (err) {
        return createErrorMessage(err);
      }
    },
  },
  project: {
    get: async (urlParam = '', queryParam = {}) => {
      const { PROJECT: BaseURL } = API_ENDPOINTS;
      try {
        const res = await axios.get(createURL(BaseURL, urlParam, queryParam));
        return { ...res.data };
      } catch (err) {
        return createErrorMessage(err);
      }
    },
  },
  agg: {
    get: async (urlParam = '', queryParam = {}) => {
      const { AGG: BaseURL } = API_ENDPOINTS;
      try {
        const res = await axios.get(createURL(BaseURL, urlParam, queryParam));
        return { ...res.data };
      } catch (err) {
        return createErrorMessage(err);
      }
    },
  },
};

export default API;
