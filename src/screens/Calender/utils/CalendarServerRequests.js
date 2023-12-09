import API from '../../../axios/API';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import {
  setApiKey,
  getApiKey,
  getDependentApiKey,
} from '../../../utils/LocalStorage';
import HomeAPI, {Base_URLs} from './CalendarAPI';
import axios from 'axios';
import {set} from 'react-native-reanimated';
export const checkInternetConnection = () => {
  NetInfo.fetch().then(state => {
    if (state.isConnected === false) {
      Toast.show({
        type: 'success',
        text1: 'No internet connection',
      });
      //   Toast.show(
      //     'No internet connection',
      //     Toast.SHORT,
      //     Toast.BOTTOM,
      //   );
    }
  });
};

export const DeleteCompleteEvent = async (authToken, queryParams) => {
  try {
//     const authToken =
// 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzAxNDk2MTgxLCJqdGkiOiIzNGU0N2I0ZS01ZGQwLTRkMjktYjIxMS1hYmQyMDZmYjQ4NTQiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMDkxMDAwMDAwMDA0NiIsIm5iZiI6MTcwMTQ5NjE4MX0.GkB7RokJpLvFikmOoSmn1zBwn3j_HADTWSVN2C10QQQ';
    const body = {};
    const ApiUrl = Base_URLs.Delete_Event_URL;
    const fullUrl = `${ApiUrl}?${new URLSearchParams(queryParams).toString()}`;
    console.log("FULL URL=",fullUrl);
    console.log("QUERY PARAMS=",queryParams);
    console.log("AUTHTOKEN=",authToken);
    return await HomeAPI({
      method: 'POST',
      url: fullUrl,
      data: body,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then(res => {
      return res;
    });
  } catch (err) {
    console.log('ERROR IN DELETE EVENT', err);
    throw err;
  }
};

export const DeleteSingleOccurance=async(authToken,queryParams)=>{
    try{
         const body={};
         const ApiUrl=Base_URLs.Delete_Event_Occurance_URL;
         const fullUrl = `${ApiUrl}?${new URLSearchParams(queryParams).toString()}`;
         return await HomeAPI({
            method: 'POST',
            url: fullUrl,
            data: body,
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }).then(res => {
            // console.log("DELETED SUCCESSFULLY",err);
            return res;
          });
    }
    catch(err){
        console.log("ERROR IN DELETING SINGLE EVENT",err);
        throw err;
    }
}

export const EditEvent=async(authToken,queryParams)=>{
    try{
        const body={};
        const ApiUrl=Base_URLs.Edit_Event_URL;
        const fullUrl = `${ApiUrl}?${new URLSearchParams(queryParams).toString()}`;
        return await HomeAPI({
           method: 'POST',
           url: fullUrl,
           data: body,
           headers: {
             Authorization: `Bearer ${authToken}`,
           },
         }).then(res => {
           // console.log("DELETED SUCCESSFULLY",err);
           return res;
         });
   }
   catch(err){
       console.log("ERROR IN EDITING BASIC DETAILS",err);
       throw err;
   }
}

export const EditEventOccurances=async(authToken,queryParams)=>{
    try{
        const body={};
        const ApiUrl=Base_URLs.Edit_Event_Occurance_URL;
        const fullUrl = `${ApiUrl}?${new URLSearchParams(queryParams).toString()}`;
        return await HomeAPI({
           method: 'POST',
           url: fullUrl,
           data: body,
           headers: {
             Authorization: `Bearer ${authToken}`,
           },
         }).then(res => {
           // console.log("DELETED SUCCESSFULLY",err);
           return res;
         });
   }
   catch(err){
       console.log("ERROR IN EDITING OCCURANCES",err);
       throw err;
   }
}

export const fetchEventsPerUser=async(authToken,queryParams)=>{
    try{
        const body={};
        const ApiUrl=Base_URLs.Fetch_Events_Per_User_URL;
        const fullUrl = `${ApiUrl}?${new URLSearchParams(queryParams).toString()}`;
        return await HomeAPI({
           method: 'POST',
           url: fullUrl,
           data: body,
           headers: {
             Authorization: `Bearer ${authToken}`,
           },
         }).then(res => {
           // console.log("DELETED SUCCESSFULLY",err);
           return res;
         });
   }
   catch(err){
       console.log("ERROR IN FETCH EVENTS BY USER",err);
       throw err;
   }
} 

export const calendarSaveEvent = async (
  calendarSaveEventData,
  authorization,
) => {
  try {
    const response = await axios.post(
      Calendar_Base_URLs.Save_Event_URL,
      calendarSaveEventData,
      {
        headers: {
          Authorization: authorization,
        },
      },
    );

    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to post saved event');
    }
  } catch (error) {
    console.error('Error Posting Save Event:', error);
    throw error;
  }
};
