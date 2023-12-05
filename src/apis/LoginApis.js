import axios from 'axios';

const URL = 'https://app.evaluatehealth.world/';
//const URL = 'https://app.evaluate-health.com/';

export const Base_URLs = {
  // Login
  CreateIndependentProfile_URL: URL + 'login/register/createIndependentProfile',
  ForgotPassword_URL: URL + 'login/register/forgotPassword',
  ForgotPasswordWithoutOTP_URL: URL + 'login/register/forgotPasswordWithoutOTP',
  GenerateOTP_URL: URL + 'login/register/generateOTP',
  Login_URL: URL + 'login/register/login',
  LoginOutsource_URL: URL + 'login/register/loginOutsource',
  Refresh_URL: URL + 'login/register/refresh',
  Signup_URL: URL + 'login/register/signup',
  SignupWithoutOTP_URL: URL + 'login/register/signupWithoutOTP',
  VerifyOTP_URL: URL + 'login/register/verifyOTP',
  VerifyUser_URL: URL + 'login/register/verifyUser',
  Verify_Mpin:URL + 'login/register/verifypin',
  Create_Mpin:URL + 'login/register/createPin',
  Reset_Mpin:URL + 'login/register/resetMpin',
  Forgot_Mpin:URL + 'login/register/forgotMpin',

  // Utils
  GetOccupation_URL: URL + 'util/generaldata/fetchData',
  // Profile
  SaveWelcomeData_URL: URL + 'profile/profile/saveWelcomeData',
  Get_Deatails_URL:URL + 'profile/profile/fetchProfile',
 // https://app.evaluatehealth.world/profile/profile/accessDependent
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
  },
);

export default HomeAPI;
