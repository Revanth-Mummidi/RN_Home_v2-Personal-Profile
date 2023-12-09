import axios from 'axios';

const URL = 'https://app.evaluatehealth.world/';

export const Base_URLs = {
  Save_Event_URL: URL + 'calendar/calender/saveEvent',
  Edit_Event_URL: URL + 'calendar/calender/editEvent',
  Edit_Event_Occurance_URL: URL + 'calendar/calender/editEventOccurances',
  Delete_Event_URL: URL + 'calendar/calender/deleteEvent',
  Delete_Event_Occurance_URL: URL + 'calendar/calender/deleteEventOccurance',
  Fetch_Events_Per_User_URL: URL + 'calendar/calender/fetchEventsPerUser',
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

  // const types=queryParams.prop




