import AsyncStorage from '@react-native-async-storage/async-storage';

const EVH_USER_NAME = 'evaluate_user_name';
const EVH_USER_PASSWORD = 'evaluate_user_password';
const EVH_API_KEY = 'evaluate_health_api_key';
const EVH_DEPENDENT_API_KEY = 'evaluate_dependent_health_api_key';
const EVH_USER_DETAILS = 'evaluate_health_user_details'; 
const EVH_USER_PACK_DETAILS = 'evaluate_health_user_pack_details';
const EVH_USER_PRIMARY_PROOF = 'evaluate_health_user_primary_proof';
const SOCIAL_TAGS = 'social_tags';

export const getApiKey = async () => {
  try {
    return await AsyncStorage.getItem('userToken');
  } catch (error) {
    console.log('Error fetching', error);
    return null;
  }
};

export const setApiKey = api => {
  AsyncStorage.setItem(EVH_API_KEY, api);
};

export const getUserName = async () => {
  try {
    let userName = await AsyncStorage.getItem(EVH_USER_NAME);
    userName = JSON.parse(userName);
    return userName;
  } catch (error) {
    console.log('Error fetching', error);
    return null;
  }
};

export const setUserName = user => {
  AsyncStorage.setItem(EVH_USER_NAME, JSON.stringify(user));
};

export const getUserPassword = async () => {
  try {
    let userPassword = await AsyncStorage.getItem(EVH_USER_PASSWORD);
    userPassword = JSON.parse(userPassword);
    return userPassword;
  } catch (error) {
    console.log('Error fetching', error);
    return null;
  }
};

export const setUserPassword = user => {
  AsyncStorage.setItem(EVH_USER_PASSWORD, JSON.stringify(user));
};

export const getDependentApiKey = async () => {
  try {
    return await AsyncStorage.getItem(EVH_DEPENDENT_API_KEY);
  } catch (error) {
    console.log('Error fetching', error);
    return null;
  }
};

export const setDependentApiKey = api => {
  AsyncStorage.setItem(EVH_DEPENDENT_API_KEY, api);
};

export const getUserDetails = async () => {
  try {
    let userDetails = await AsyncStorage.getItem(EVH_USER_DETAILS);
    userDetails = JSON.parse(userDetails);
    return userDetails;
  } catch (error) {
    console.log('Error fetching', error);
    return null;
  }
};

export const setUserDetails = user => {
  AsyncStorage.setItem(EVH_USER_DETAILS, JSON.stringify(user));
};

export const getUserSpecialPackDetails = async () => {
  try {
    let userSpecialPackDetails = await AsyncStorage.getItem(
      EVH_USER_PACK_DETAILS,
    );
    userSpecialPackDetails = JSON.parse(userSpecialPackDetails);
    return userSpecialPackDetails;
  } catch (error) {
    console.log('Error fetching', error);
    return null;
  }
};

export const setUserSpecialPackDetails = data => {
  AsyncStorage.setItem(EVH_USER_PACK_DETAILS, JSON.stringify(data));
};

export const getUserPrimaryProof = async () => {
  try {
    let userDetails = await AsyncStorage.getItem(EVH_USER_PRIMARY_PROOF);
    userDetails = JSON.parse(userDetails);
    return userDetails;
  } catch (error) {
    console.log('Error fetching', error);
    return null;
  }
};

export const setUserPrimaryProof = user => {
  AsyncStorage.setItem(EVH_USER_PRIMARY_PROOF, JSON.stringify(user));
};

export const logout = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log(e)
  }
};

export const setSocialTags = async tags => {
  await AsyncStorage.setItem(SOCIAL_TAGS, JSON.stringify(tags));
};

export const getSocialTags = async () => {
  try {
    let tagDetails = await AsyncStorage.getItem(SOCIAL_TAGS);
    tagDetails = JSON.parse(tagDetails);
    return tagDetails;
  } catch (error) {
    console.log('Error fetching', error);
    return null;
  }
};

export const getTheme = async () =>{
  try {
    let tagDetails = await AsyncStorage.getItem('theme');
    
    return tagDetails;
  } catch (error) {
    console.log('Error fetching', error);
    return null;
  }
}
