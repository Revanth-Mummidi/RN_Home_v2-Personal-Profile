import API from '../../../axios/API';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import {
  setApiKey,
  getApiKey,
  getDependentApiKey,
} from '../../../utils/LocalStorage';
import HomeAPI, {Base_URLs} from './MoreAPI';
import axios from 'axios';
import {set} from 'react-native-reanimated';
export const checkInternetConnection = async() => {
  var res = {};
  console.log("from MOre")
  const result = await NetInfo.fetch();
  return result;
  NetInfo.fetch().then(state => {
    console.log(state , "SSSSSSSKKKKKKKKKKKKKKKK")
    if (state.isConnected === false) {
      Toast.show({
        type: 'success',
        text1: 'No internet connection',
      });
      res =  state
      //   Toast.show(
      //     'No internet connection',
      //     Toast.SHORT,
      //     Toast.BOTTOM,
      //   );
    }else{
      res = state;
    }
  });
  return res;
};
export const ChangeTheme = async data => {
  try {
    console.log('data', data);
    const token = await getApiKey();
    const response = await axios.post(Base_URLs.ChangeTheme_URL, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    // Handle the response and return the data
    if (response && response.data) {
      return 'success';
    }
  } catch (error) {
    // Handle error
    console.log(error);
  }
};

export const FetchTheme = async () => {
  try {
    const token = await getApiKey();
    // console.log(token)
    const response = await axios.post(
      Base_URLs.FetchTheme_URL,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    // Handle the response and return the data
    if (response && response.data) {
      console.log('response.data', response.data.data[0].theme);
      return response.data.data[0].theme;
    }
  } catch (error) {
    // Handle error
    console.log(error);
  }
};
