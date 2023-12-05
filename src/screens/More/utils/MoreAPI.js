import axios from 'axios';

const URL = 'https://app.evaluatehealth.world/';

export const Base_URLs = {
  // Profile
  ChangeTheme_URL: URL + 'profile/profile/userPreferences',
  FetchTheme_URL: URL + 'profile/profile/fetchPreferences',
};

const HomeAPI = axios.create({
  baseURL: URL,
});

HomeAPI.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (!error.response) {
      error.response = {
        data: 'Server is busy. Please try again later.',
        status: 500,
      };
    }
    if (error.response.status === 401) {
      console.log('Unauthorized');
    }
    return Promise.reject(error);
  }
);

export default HomeAPI;
