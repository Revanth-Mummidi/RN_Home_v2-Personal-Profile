import axios from 'axios';
import { BASE_URL as URL } from '../../../axios/API';

export const Base_URLs = {
  // Profile
  AccessDependent_URL: URL + 'profile/profile/accessDependent',
  AddAllergy_URL: URL + 'profile/addAllergy',
  AddLifeStyle_URL: URL + 'profile/addLifeStyle',
  AddMember_URL: URL + 'profile/addMember',
  AddAddress_URL:URL + 'profile/profile/addAddress',
  AddSymptoms_URL: URL + 'profile/addSymptoms',
  AddDependent_URL:URL+'profile/profile/addDependent',
  CheckWelcomeData_URL: URL + 'profile/checkWelcomeData',
  ComparePin_URL: URL + 'profile/comparePin',
  CreateMember_URL: URL + 'profile/createMember',
  CreatePin_URL: URL + 'profile/createPin',
  DeleteAllergy_URL: URL + 'profile/deleteAllergy',
  EditAddress_URL: URL + 'profile/editAddress',
  EditBasicDetails_URL: URL + 'profile/profile/editBasicDetails',
  EditConsent_URL: URL + 'profile/editConsent',
  EditDailyExposure_URL: URL + 'profile/editDailyExposure',
  EditDoctorPreference_URL: URL + 'profile/editDoctorPreference',
  EditFamilyContact_URL: URL + 'profile/editFamilyContact',
  EditHospitalPreference_URL: URL + 'profile/editHospitalPreference',
  EditImpairment_URL: URL + 'profile/editImpairment',
  EditOccupation_URL: URL + 'profile/editOccupation',
  EditPersonalIdentification_URL: URL + 'profile/editPersonalIdentification',
  EditSocioEco_URL: URL + 'profile/editSocioEco',
  EditVehicle_URL: URL + 'profile/editVehicle',
  FetchProfile_URL: URL + 'profile/profile/fetchProfile',
  GetGroups_URL: URL + 'profile/getGroups',
  GetIds_URL: URL + 'profile/getIds',
  GetPinStatus_URL: URL + 'profile/getPinStatus',
  GetMembers_URL: URL + 'profile/profile/getMembers',
  GetDoctors_URL: URL + 'profile/get_doctors',
  GetHospitals_URL: URL + 'profile/get_hospitals',
  IdentityParser_URL: URL + 'profile/identityParser',
  MemberApproval_URL: URL + 'profile/memberApproval',
  SaveDocument_URL: URL + 'profile/saveDocument',
  SaveWelcomeData_URL: URL + 'profile/saveWelcomeData',
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