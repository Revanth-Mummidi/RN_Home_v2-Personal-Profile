import axios from 'axios';
import {Base_URLs} from './LoginApis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { err } from 'react-native-svg/lib/typescript/xml';
import { BASE_URL } from '../axios/API';

export const verifyUser = async data => {
  console.log(Base_URLs.VerifyUser_URL)
  try {
    const response = await axios.post(Base_URLs.VerifyUser_URL, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response)
  
    return response.status;
  } catch (error) {
    console.log(error.response)
    return error.response.status;
  }
};

export const generateOTP = async data => {
  try {
    const response = await axios.post(Base_URLs.GenerateOTP_URL, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("THE RESPONSE",response)
    if (response && response.data) {
   
      return response.status;
    }

    throw new Error('Failed generate OTP');
  } catch (error) {
    console.log(error)
    return error;
  }
};
export const signup = async data => {
  try {
    const response = await axios.post(Base_URLs.Signup_URL, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data)
    return response.status;
  } catch (error) {
    return error.response.status;
  }
};

export const verifyOTP = async (data) => {
  try {
    const response = await axios.post(Base_URLs.VerifyOTP_URL, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // Handle the response and return the data
    if (response && response.data) {
      console.log("RESPOND DATSA",response.data)
      return response.data.flag;
    }
    throw new Error('Failed verify OTP');
  } catch (error) {
    console.error('Error verify OTP:', error);
    return error;
    throw error;
  }
}
export const forgotPassword = async (data) => {
  try {
    const response = await axios.post(Base_URLs.ForgotPassword_URL, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response && response.data) {
      return response.status;
    }
    throw new Error('Failed forgot password');
  } catch (error) {
    return error.response.status;
  }
}

export const login = async data => {
  try {
    const response = await axios.post(Base_URLs.Login_URL, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('login response===>' + JSON.stringify(response));
    if (response && response.data) {
     // setApiKey(response.data.access_token[0]);
      return response.data;
    }
    throw new Error('Failed login');
  } catch (error) {
    return error.response.status;
  }
};
export const GetOccupation = async () => {
  try {
    const response = await axios.get(Base_URLs.GetOccupation_URL + '?table_name=profession_name');
    return response.data;
  } catch (error) {
    return error.response.status;
  }
}

export const SaveWelcomeData = async (data) => {
  const token = await AsyncStorage.getItem('userToken');
  console.log(token,"FROM SAVE WELCOME DATA")
  console.log(JSON.stringify(data)+" "+token)
  try {
    const response = await axios.post(Base_URLs.SaveWelcomeData_URL, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    console.log(response)
    console.log("successsssssssssssssssssss")
    return response.status;
  } catch (error) {
    console.log(error.response)
    return error.response.status;
  }
}

export const verifyMpin = async (data) => {
   const token = await AsyncStorage.getItem('userToken');
   const apiURL=Base_URLs.Verify_Mpin
   const queryParams = {
    mpin:data
  };
  //console.log(`Bearer ${authToken}`);
  const fullUrl = `${apiURL}?${new URLSearchParams(queryParams).toString()}`;
   try {
    const response = await axios.post(fullUrl,{}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    console.log(response.status,"FRom the function")
    console.log("succes")
    return response;
  } catch (error) {
    console.log(error,"kkkkkkk")
    return error.response;
  }

}

export const CreateMpin = async (data) => {
  const token = await AsyncStorage.getItem('userToken');
  const apiURL=Base_URLs.Create_Mpin
  const queryParams = {
   mpin:data
 };
 //console.log(`Bearer ${authToken}`);
 const fullUrl = `${apiURL}?${new URLSearchParams(queryParams).toString()}`;
 console.log(typeof(data));
  try {
   const response = await axios.post(fullUrl,{}, {
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
     },
   });
   console.log(response.status,"FRom the function")
   console.log("succes")
   return response;
 } catch (error) {
   console.log(error.response.data.response,"kkkkkkk")
   return error.response.data.response;
 }
}

export const resetmpin = async (data) => {
  const token = await AsyncStorage.getItem('userToken');
  const apiURL=Base_URLs.Reset_Mpin
  const queryParams = {
    oldMpin:data.opin,
    newMpin:data.npin
 };
 console.log(queryParams);
 console.log(`Bearer ${token}`);
 const fullUrl = `${apiURL}?${new URLSearchParams(queryParams).toString()}`;
 console.log(fullUrl)
 //https://app.evaluatehealth.world/login/register/resetMpin?oldMpin=6666&newMpin=9999
  try {
   const response = await axios.post(fullUrl,{}, {
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
     },
   });
   console.log(response.status,"FRom the function")
   console.log("succes")
   return response;
 } catch (error) {
   console.log(error.response.data.message,"kkkkkkk")
   return error.response;
 }

}

export const forgorMpin =async  (data) => {
  const token = await AsyncStorage.getItem('userToken');
  const apiURL = Base_URLs.Forgot_Mpin;
  const queryParams = {
    newMpin: data,
 };
 const fullUrl = `${apiURL}?${new URLSearchParams(queryParams).toString()}`;

 try {
  const response = await axios.post(fullUrl,{}, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  console.log(response.status,"FRom the function")
  console.log("succes")
  return response;
} catch (error) {
  console.log(error,"kkkkkkk")
  return error.response;
}

}
 
export const getDetails = async (data) => {

  const token = await AsyncStorage.getItem('userToken');
  const apiURL = Base_URLs.Get_Deatails_URL;
 // console.log(token)
  const queryParams = {
    eh_user_id: "0910000000048",
    Authorization:token
 };  
 
 const fullUrl = `${apiURL}?${new URLSearchParams(queryParams).toString()}`;

 try {
  const response = await axios.post(fullUrl,{}, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  console.log(response.status,"FRom the function")
  console.log("succes")
  return response;
} catch (error) {
  console.log(error,"From getDetails")
  return error.response;
}


}