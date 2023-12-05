import axios from 'axios';

const URL = 'https://app.evaluatehealth.world/main/';

export const Base_URLs = {
  // social
  Block_User_URL: 'https://app.evaluatehealth.world/home/social/blockUser',
  Delete_Like_URL: 'https://app.evaluatehealth.world/home/social/deleteLike',
  Delete_Post_URL: 'https://app.evaluatehealth.world/home/social/deletePost',
  Edit_Feeds_URL: 'https://app.evaluatehealth.world/home/social/editFeeds',
  Fetch_Post_URL: 'https://app.evaluatehealth.world/home/social/fetch_post_',
  Follow_URL: 'https://app.evaluatehealth.world/home/social/follow',
  Get_Banners_URL: 'https://app.evaluatehealth.world/home/social/getBanners',
  Get_Contacts_URL: 'https://app.evaluatehealth.world/home/social/getContacts',
  Get_Groups_URL: 'https://app.evaluatehealth.world/home/social/getGroups',
  Get_Personal_Info_URL: 'https://app.evaluatehealth.world/home/social/getPersonalInfo',
  Save_Feeds_URL: 'https://app.evaluatehealth.world/home/social/saveFeeds',
  Unblock_User_URL: 'https://app.evaluatehealth.world/home/social/unblockUser',
  Post_Social_URL: 'https://app.evaluatehealth.world/home/social/postSocial',
  Social_Articles_URL: 'https://app.evaluatehealth.world/home/social/socialArticles',
  // news APIs
  Health_News_URL: 'https://app.evaluatehealth.world/home/news/healthnews',
  News_Feedback_URL: 'https://app.evaluatehealth.world/home/news/newsfeedback',
  // s APIs
  Upload_File_URL: 'https://app.evaluatehealth.world/util/bucket/Upload',
  View_File_URL: 'https://app.evaluatehealth.world/util/bucket/viewFile',
  View_FileList_URL: 'https://app.evaluatehealth.world/util/bucket/viewFileList',
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
