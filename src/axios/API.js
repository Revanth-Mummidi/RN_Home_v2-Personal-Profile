import axios from 'axios';
const URL = 'https://app.evaluatehealth.world/main/';
export const BASE_URL = 'https://app.evaluatehealth.world/';
export const BASE_URL_ICON = 'https://app.evaluatehealth.world/main/';

const API = async config => {
  axios.interceptors.response.use(
    response => {
      return response;
    },
    function (error) {
      if (!error.response) {
        error.response = {
          data:
            error.response.data !== undefined && error.response.data !== null
              ? error.response.data
              : 'server is busy try after sometimes',
          status: 500,
        };
      }
      if (error.response.status === 401) {
        console.log('Unauthorised');
      }
      return Promise.reject(error);
    },
  );
  config.baseURL = URL;
  return axios(config);
};
export default API;
