import API from '../../../axios/API';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import {getApiKey, getDependentApiKey} from '../../../utils/LocalStorage';
import HomeAPI, { Base_URLs } from './HomeAPI';
import axios from 'axios';
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

export const fetchUserProfileData = async () => {
  const token = await getApiKey();
  return await API({
    method: 'POST',
    url: `profile/fetchProfile`,
    data: {},
    headers: {
      Authorization: token,
    },
  }).then(res => {
    return res;
  });
};

export const postHealthNews = async (page, x_api_key, token) => {
  try {
    const response = await axios.post(Base_URLs.Health_News_URL, page, {
      headers: {
        'X-Api-Key': x_api_key,
        Authorization: token,
      },
    });

    // Handle the response and return the data
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to post news feedback');
    }
  } catch (error) {
    console.error('Error posting news feedback:', error);
    throw error;
  }
};

export const postNewsFeedback = async (newsFeedbackData, authorization) => {
  try {
    const response = await axios.post(Base_URLs.News_Feedback_URL, newsFeedbackData, {
      headers: {
        Authorization: authorization,
      },
    });

    // Handle the response and return the data
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to post news feedback');
    }
  } catch (error) {
    console.error('Error posting news feedback:', error);
    throw error;
  }
};

export const blockUser = async (blockUserData, authorization) => {
  try {
    const response = await axios.post(Base_URLs.Block_User_URL, blockUserData, {
      headers: {
        Authorization: authorization,
      },
    });

    // Handle the response and return the data
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to block user');
    }
  } catch (error) {
    console.error('Error blocking user:', error);
    throw error;
  }
}

export const deleteLike = async (likeData, authorization) => {
  try {
    const response = await axios.post(Base_URLs.Delete_Like_URL, likeData, {
      headers: {
        Authorization: authorization,
      },
    });

    // Handle the response and return the data
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to delete like');
    }
  } catch (error) {
    console.error('Error deleting like:', error);
    throw error;
  }
}

export const deletePost = async (deletePostData, authorization) => {
  try {
    const response = await axios.post(Base_URLs.Delete_Post_URL, deletePostData, {
      headers: {
        Authorization: authorization,
      },
    });

    // Handle the response and return the data
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to delete post');
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}

export const editFeeds = async (editFeedsData, authorization) => {
  try {
    const response = await axios.post(Base_URLs.Edit_Feeds_URL, editFeedsData, {
      headers: {
        Authorization: authorization,
      },
    });

    // Handle the response and return the data
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to edit feeds');
    }
  } catch (error) {
    console.error('Error editing feeds:', error);
    throw error;
  }
}

export const fetch_post_ = async (userData) => {
  // post id and eh user id 
  // get request
  // no authorization
  try {
    const response = await axios.get(Base_URLs.Fetch_Post_URL, userData);
    // Handle the response and return the data
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to fetch post');
    }
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
}

// POST
// /social/follow
// POST
// /social/getBanners
// POST
// /social/getContacts
// GET
// /social/getGroups
// POST
// /social/getPersonalInfo
// POST
// /social/postSocial
// POST
// /social/saveFeeds
// POST
// /social/socialArticles
// POST
// /social/unblockUser

export const follow = async (followData, authorization) => {
  try {
    const response = await axios.post(Base_URLs.Follow_URL, followData, {
      headers: {
        Authorization: authorization,
      },
    });

    // Handle the response and return the data
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Failed follow');
    }
  } catch (error) {
    console.error('Error follow:', error);
    throw error;
  }
}

export const getBanners = async (authorization) => {
  try {
    const response = await axios.post(Base_URLs.Get_Banners_URL, {}, {
      headers: {
        Authorization: authorization,
      },
    });
    // Handle the response and return the data
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Failed get banners');
    }
  } catch (error) {
    console.error('Error get banners:', error);
    throw error;
  }
}

export const getContacts = async (getContactsData, authorization) => {
  try {
    const response = await axios.post(Base_URLs.Get_Contacts_URL, getContactsData, {
      headers: {
        Authorization: authorization,
      },
    });
    // Handle the response and return the data
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Failed get contacts');
    }
  } catch (error) {
    console.error('Error get contacts:', error);
    throw error;
  }
}

export const getGroups = async (authorization) => {
  try {
    const response = await axios.get(Base_URLs.Get_Groups_URL, {
      headers: {
        Authorization: authorization,
      },
    });
    // Handle the response and return the data
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Failed get groups');
    }
  } catch (error) {
    console.error('Error get groups:', error);
    throw error;
  }
}

export const getPersonalInfo = async (getPersonalInfoData, authorization) => {
  try {
    const response = await axios.post(Base_URLs.Get_Personal_Info_URL, getPersonalInfoData, {
      headers: {
        Authorization: authorization,
      },
    });
    // Handle the response and return the data
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Failed get personal info');
    }
  } catch (error) {
    console.error('Error get personal info:', error);
    throw error;
  }
}

export const postSocial = async (postSocialData, authorization) => {
  try {
    const response = await axios.post(Base_URLs.Post_Social_URL, postSocialData, {
      headers: {
        Authorization: authorization,
      },
    });
    // Handle the response and return the data
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Failed post social');
    }
  } catch (error) {
    console.error('Error post social:', error);
    throw error;
  }
}

export const saveFeeds = async (saveFeedsData, authorization) => {
  try {
    const response = await axios.post(Base_URLs.Save_Feeds_URL, saveFeedsData, {
      headers: {
        Authorization: authorization,
      },
    });
    // Handle the response and return the data
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Failed save feeds');
    }
  } catch (error) {
    console.error('Error save feeds:', error);
    throw error;
  }
}

export const socialArticles = async (socialArticlesData, authorization) => {
  try {
    const response = await axios.post(Base_URLs.Social_Articles_URL, socialArticlesData, {
      headers: {
        Authorization: authorization,
      },
    });
    // Handle the response and return the data
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Failed social articles');
    }
  } catch (error) {
    console.error('Error social articles:', error);
    throw error;
  }
}

export const unblockUser = async (unblockUserData, authorization) => {
  try {
    const response = await axios.post(Base_URLs.Unblock_User_URL, unblockUserData, {
      headers: {
        Authorization: authorization,
      },
    });
    // Handle the response and return the data
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Failed unblock user');
    }
  } catch (error) {
    console.error('Error unblock user:', error);
    throw error;
  }
}

export const getGeneralDataLists = async (getGeneralDataListsData, authorization) => {
  try {
    const response = await axios.get(Base_URLs.Get_General_Data_Lists_URL, {
      params: getGeneralDataListsData,
      headers: {
        Authorization: authorization,
      },
    });
    // Handle the response and return the data
    if (response && response.data && response.data.data) {
      return response.data.data;
    } else {
      throw new Error('Failed get general data lists');
    }
  } catch (error) {
    console.error('Error get general data lists:', error);
    throw error;
  }
}

export const fetchData = async (fetchData, authorization) => {
  try {
    const response = await axios.post(Base_URLs.Fetch_Data_URL, fetchData, {
      headers: {
        Authorization: authorization,
      },
    });
    // Handle the response and return the data
    if (response && response.data && response.data.data) {
      return response.data.data;
    } else {
      throw new Error('Failed fetch data');
    }
  } catch (error) {
    console.error('Error fetch data:', error);
    throw error;
  }
}

export const UploadFile = async (formData, authorization) => {
  try {
    const response = await axios.post(Base_URLs.Upload_File_URL, formData, {
      headers: {
        Authorization: authorization,
        'Content-Type': 'application/json',
      },
    });
    // Handle the response and return the data
    if (response && response.data && response.data.data) {
      return response.data.data;
    }
    throw new Error('Failed upload file');
  } catch (error) {
    console.error('Error upload file:', error);
    throw error;
  }
}

export const ViewFile = async (formData, authorization) => {
  try {
    const response = await axios.post(Base_URLs.View_File_URL, formData, {
      headers: {
        Authorization: authorization,
        'Content-Type': 'application/json',
      },
    });
    // Handle the response and return the data
    if (response && response.data && response.data.data) {
      return response.data.data;
    }
    throw new Error('Failed view file');
  } catch (error) {
    console.error('Error view file:', error);
    throw error;
  }
}
