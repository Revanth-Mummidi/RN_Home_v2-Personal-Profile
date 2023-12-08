import API, { BASE_URL } from '../../../axios/API';
import NetInfo from '@react-native-community/netinfo';
// import Toast from 'react-native-toast-message';
import { Toast } from '../../_components';
import { getApiKey, getDependentApiKey } from '../../../utils/LocalStorage';
import HomeAPI, { Base_URLs } from './PersonalAPI';
import axios from 'axios';
import CustomToast from '../../_components/toast/CustomToast';
//changed
export const checkInternetConnection = () => {
  NetInfo.fetch().then(state => {
    if (state.isConnected === false) {
      <CustomToast
          visible={toastVisible}
          onClose={() => {
            setToastVisible(false);
          }}
          bg={
            msgType == 'error'
              ? 'red'
              : msgType == 'success'
              ? 'green'
              : msgType == 'warning'
              ? 'orange'
              : 'white'
          }
          title={msg}
          icon={'globe'}
          iconColor={'white'}
          msgColor={
            msgType == 'error'
              ? 'white'
              : msgType == 'success'
              ? 'white'
              : msgType == 'warning'
              ? 'white'
              : 'black'
          }
        />
    }
  });
};

export const addDependent = async (queryParams) => {
  const authToken=await getApiKey()

// const authToken='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzAxNDk2MTgxLCJqdGkiOiIzNGU0N2I0ZS01ZGQwLTRkMjktYjIxMS1hYmQyMDZmYjQ4NTQiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMDkxMDAwMDAwMDA0NiIsIm5iZiI6MTcwMTQ5NjE4MX0.GkB7RokJpLvFikmOoSmn1zBwn3j_HADTWSVN2C10QQQ';

  const body ={};
  const ApiUrl=Base_URLs.AddDependent_URL;
  const fullUrl = `${ApiUrl}?${new URLSearchParams(queryParams).toString()}`;
  return await HomeAPI({
    method: 'POST',
    url: fullUrl,
    data: body,
    headers:{
      Authorization:`Bearer ${authToken}`
    }
  }).then(res => {
    console.log("ADDED",res.data);
    return res;
  });
};

export const getMembers = async () => {
  try{
    const authToken=await getApiKey()
    console.log("REVANTH AUTHTOKEN=",authToken);
  // const authToken='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzAxNDk2MTgxLCJqdGkiOiIzNGU0N2I0ZS01ZGQwLTRkMjktYjIxMS1hYmQyMDZmYjQ4NTQiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMDkxMDAwMDAwMDA0NiIsIm5iZiI6MTcwMTQ5NjE4MX0.GkB7RokJpLvFikmOoSmn1zBwn3j_HADTWSVN2C10QQQ';
  const body ={};
  const ApiUrl=Base_URLs.GetMembers_URL;
  const fullURL=`${ApiUrl}`
  return await HomeAPI({
    method: 'POST',
    url: fullURL,
    data: body,
    headers:{
      Authorization:`Bearer ${authToken}`
    }
  }).then(res => {
    // console.log(res)
    
    return res;
  });
}
catch(err){
  console.log("Error in GetMemebers",err);
  throw err;
}
};

export const accessDependent = async (queryParamsArray) => {
  try {
  const authToken = await getApiKey()
  // const authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzAxNDk2MTgxLCJqdGkiOiIzNGU0N2I0ZS01ZGQwLTRkMjktYjIxMS1hYmQyMDZmYjQ4NTQiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMDkxMDAwMDAwMDA0NiIsIm5iZiI6MTcwMTQ5NjE4MX0.GkB7RokJpLvFikmOoSmn1zBwn3j_HADTWSVN2C10QQQ';

  const body = {};
  const ApiUrl = Base_URLs.AccessDependent_URL;

 
    const results = [];

    for (const queryParams of queryParamsArray) {
      const fullUrl = `${ApiUrl}?${new URLSearchParams(queryParams).toString()}`;
      console.log("AUTH TOKEN=",authToken);
      console.log("QUERY",queryParams);

      const response = await HomeAPI({
        method: 'POST',
        url: fullUrl,
        data: body,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      results.push(response.data);
    }

    // console.log('Results:', results);

    return results;
  } catch (error) {
    console.error('Error in accessDependent:', error);
    throw error;
  }
};

export const getDependentUsers=async(authTokenArray)=>{
  try{
    const ApiURl=Base_URLs.FetchProfile_URL;
      const body={};
      console.log("ARRAY=",authTokenArray);
      let resultArray=[];
    for(const authToken of authTokenArray){
      console.log("AUTHTOKEN IN GET",authToken);
      const response = await HomeAPI({
                method: 'POST',
                url: ApiURl,
                data: body,
                headers: {
                  Authorization: `Bearer ${authToken.authToken}`,
                },
              });
          resultArray.push(response.data);
          console.log("DATA IN ARRAY=",response.data.user_first_name);
    }
    console.log("RESULT ARRAY IN GET",resultArray);
    return resultArray;
  }
  catch(err){
    console.log("ERROR IN GET DEPENDENT USERS =",err);
    throw err;
  }
}

export const getMainProfile = async () => {
  try{
  const authToken=await getApiKey()

// const authToken='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzAxNDk2MTgxLCJqdGkiOiIzNGU0N2I0ZS01ZGQwLTRkMjktYjIxMS1hYmQyMDZmYjQ4NTQiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMDkxMDAwMDAwMDA0NiIsIm5iZiI6MTcwMTQ5NjE4MX0.GkB7RokJpLvFikmOoSmn1zBwn3j_HADTWSVN2C10QQQ';

  const body ={};
  const ApiUrl=Base_URLs.FetchProfile_URL;
  const fullUrl = `${ApiUrl}`;
  return await HomeAPI({
    method: 'POST',
    url: fullUrl,
    data: body,
    headers:{
      Authorization:`Bearer ${authToken}`
    }
  }).then(res => {
    console.log("ADDED",res.data);
    return res.data;
  });
}catch(err){
  console.log("ERROR IN FETCH PROFILE",err);
  throw err;
}
};

export const addBasicDetails=async(authToken,body,queryParams) =>{
   try{
    if(authToken==undefined){
      authToken=await getApiKey();
    }
    const ApiUrl=Base_URLs.EditBasicDetails_URL;
    const fullUrl = `${ApiUrl}?${new URLSearchParams(queryParams).toString()}`;
    return await HomeAPI({
      method: 'POST',
      url: fullUrl,
      data: body,
      headers:{
        Authorization:`Bearer ${authToken}`
      }
    }).then(res => {
      console.log("ADDED BASIC DETAILS=",res.data);

      return res.data;
    });
  }
  catch(err){
    console.log("ERROR",err);
    throw err;
  }
}
export const uploadtoAWS=async(authToken,base64Code,queryParams)=>{
  try{
    if(!authToken){
      authToken=await getApiKey();
    }
    const ApiUrl=Base_URLs.UploadToAWS_URL;
    const body={
      base64_code:base64Code
    };
    const fullUrl = `${ApiUrl}?${new URLSearchParams(queryParams).toString()}`;
    return await HomeAPI({
      method: 'POST',
      url: fullUrl,
      data: body,
      headers:{
        Authorization:`Bearer ${authToken}`
      }
    }).then(res => {
      console.log("uploaded to cloud",res.data);
      return res.data;
    });
  }
  catch(err)
  {
    console.log("ERROR WHILE UPLOADING TO AWS",err);
    throw err;
  }
}

export const saveDocument=async(authToken,queryParams)=>{
  try{
    if(!authToken){
      authToken=await getApiKey();
    }
    const ApiUrl=Base_URLs.UploadToAWS_URL;
    const body={}
    const fullUrl = `${ApiUrl}?${new URLSearchParams(queryParams).toString()}`;
    return await HomeAPI({
      method: 'POST',
      url: fullUrl,
      data: body,
      headers:{
        Authorization:`Bearer ${authToken}`
      }
    }).then(res => {
      console.log("File added to global documents",res.data);
      return res.data;
    });
  }
  catch(err){
    console.log("ERROR WHILE UPLOADING TO GLOBAL DOCS",err);
    throw err;
  }
}

export const UploadProfileVerification=async(authToken,queryParams)=>{
  try{
    if(authToken==undefined){
      authToken=await getApiKey();
    }
    const ApiUrl=Base_URLs.ProfileVerification_URL;
    const body={};
    const fullUrl = `${ApiUrl}?${new URLSearchParams(queryParams).toString()}`;
    return await HomeAPI({
      method: 'POST',
      url: fullUrl,
      data: body,
      headers:{
        Authorization:`Bearer ${authToken}`
      }
    }).then(res => {
      console.log("uPLOAD PROFILE VERIFICATION",res.data);
      return res.data;
    });
  }
  catch(err){
    console.log("ERROR WHILE PROFILE VERIFICATION",err);
    throw err;
  }
}

export const createAddress=async(authToken,body)=>{
  try{
    if(!authToken){
      authToken=await getApiKey();  
    }
    const ApiUrl=Base_URLs.AddAddress_URL;
    return await HomeAPI({
      method: 'POST',
      url: ApiUrl,
      data: body,
      headers:{
        Authorization:`Bearer ${authToken}`
      }
    }).then(res => {
      return res.data
    });
  }
  catch(err){
    throw err;
  }
}

export const fetchAddress=async(authToken)=>{
  try{
    if(!authToken){
      authToken=await getApiKey();  
    }
    // console.log(authToken)
    const ApiUrl=Base_URLs.FetchAddress_URL;
    // console.log(ApiUrl)
    
    return await HomeAPI({
      method: 'POST',
      url: ApiUrl,
      data: {},
      headers:{
        Authorization:`Bearer ${authToken}`
      }
    }).then(res => {
      return res.data
    });
  }
  catch(err){
    throw err;
  }
}

// export const editAddress=async(authToken)=>{
//   try{
//     if(!authToken){
//       authToken=await getApiKey();  
//     }
//     // console.log(authToken)
//     const ApiUrl=Base_URLs.EditAddress_URL;
//     // console.log(ApiUrl)
//     return await HomeAPI({
//       method: 'POST',
//       url: ApiUrl,
//       data: {},
//       headers:{
//         Authorization:`Bearer ${authToken}`
//       }
//     }).then(res => {
//       return res.data
//     });
//   }
//   catch(err){
//     throw err;
//   }
// }

export const getUserProfile=async(authToken,filepath)=>{
  try{
    if(!authToken){
      authToken=await getApiKey();  
    }
    // console.log(authToken)
    let ApiUrl=Base_URLs.FetchAddress_URL;
    // console.log(ApiUrl)
    ApiUrl=`${ApiUrl}?file_name=${filepath}`
    return await HomeAPI({
      method: 'POST',
      url: ApiUrl,
      data: {},
      headers:{
        Authorization:`Bearer ${authToken}`
      }
    }).then(res => {
      return res.data
    });
  }
  catch(err){
    throw err;
  }
}
// export const UploadProfileVerification=async(authToken,queryParams)=>{
//   try{
//     console.log("IN Verification ");
//     if(authToken==undefined)
//     {
//       authToken=await getApiKey();
//     }
//     const ApiUrl=Base_URLs.AddAddress_URL;
//     const fullUrl = `${ApiUrl}?${new URLSearchParams(queryParams).toString()}`;
//     return await HomeAPI({
//       method: 'POST',
//       url: fullUrl,
//       data: body,
//       headers:{
//         Authorization:`Bearer ${authToken}`
//       }
//     }).then(res => {
//       console.log("ADDED Address=",res.data);

//       return res.data;
//     });
//   }
//   catch(err){
//     console.log("ERROR hj",err);
//     throw err;
//   }
// }

export const getQRCode=async(authToken,queryparams)=>{
  try{
    console.log("IN Verification ");
    if(authToken==undefined)
    {
      authToken=await getApiKey();
    }
    const ApiUrl=Base_URLs.PersonalQRCode_URL;
    const fullUrl = `${ApiUrl}?${new URLSearchParams(queryparams).toString()}`;
    return await HomeAPI({
      method: 'POST',
      url: fullUrl,
      data: {},
      headers:{
        Authorization:`Bearer ${authToken}`
      }
    }).then(res => {
      console.log("QR LINK=",res.data.file.url);

      return res.data.file.url;
    });
  }
  catch(err){
    console.log("GET QR",err);
  }
}

export const addEmergencyContacts=async(authToken,queryParams) =>{
  try{
   if(authToken==undefined){
     authToken=await getApiKey();
   }
   const ApiUrl=Base_URLs.AddEmergencyContact_URL;
   const params={
    contact_name:queryParams.name,
    mobileno:queryParams.phoneNumber,
    relation:queryParams.relation
   }
   console.log(queryParams,params,"AD");
   const fullUrl = `${ApiUrl}?${new URLSearchParams(params).toString()}`;
   return await HomeAPI({
     method: 'POST',
     url: fullUrl,
     data:{},
     headers:{
       Authorization:`Bearer ${authToken}`
     }
   }).then(res => {
     console.log("ADDED EMERGENCY CONTACTS=",res.data);

     return res.data;
   });
 }
 catch(err){
   console.log("ERROR IN EMERGENCY CONTACTS",err,queryParams);
   throw err;
 }
}

export const FetchEmergencyContacts=async(authToken)=>{
  try{
    if(authToken==undefined){
      authToken=await getApiKey();
    }
    const ApiUrl=Base_URLs.FetchEmergencyContacts_URL;
    // const fullUrl = `${ApiUrl}?${new URLSearchParams(params).toString()}`;
    return await HomeAPI({
      method: 'POST',
      url: ApiUrl,
      data:{},
      headers:{
        Authorization:`Bearer ${authToken}`
      }
    }).then(res => {
      console.log("FETCHED EMERGENCY CONTACTS=",res.data);
 
      return res.data;
    });
  }
  catch(err){
    console.log("ERROR IN FETCH EMERGENCY CONTACTS",err);
    throw err;
  }
}

export const DeleteAddressItem=async(authToken,addressID)=>{
  console.log("ADDRESS ID ",addressID);
  try{
    if(authToken==undefined){
      authToken=await getApiKey();
    }
    const ApiUrl=Base_URLs.DeleteAddress_URL;
    // const fullUrl = `${ApiUrl}?${new URLSearchParams(params).toString()}`;
    return await HomeAPI({
      method: 'POST',
      url: ApiUrl,
      data:{address_id_list:[addressID]},
      headers:{
        Authorization:`Bearer ${authToken}`
      }
    }).then(res => {
      console.log("FETCHED EMERGENCY CONTACTS=",res.data);
 
      return res.data;
    });
  }
  catch(err){
    console.log("ERROR IN DELETE ADDRESS",err);
    throw err;
  }
}

export const EditAddressItem=async(authToken,queryParams)=>{
  try{
    const ApiUrl=Base_URLs.EditAddress_URL;
    const body={}
    const fullUrl = `${ApiUrl}?${new URLSearchParams(queryParams).toString()}`;
    return await HomeAPI({
      method: 'POST',
      url: fullUrl,
      data: body,
      headers:{
        Authorization:`Bearer ${authToken}`
      }
    }).then(res => {
      console.log("EDITED SUCCESSFULLY=",res.data);

      return res.data;
    });

  }
  catch(err){
    console.log("ERROR IN EDIT ADDRESS",err)
  }
}