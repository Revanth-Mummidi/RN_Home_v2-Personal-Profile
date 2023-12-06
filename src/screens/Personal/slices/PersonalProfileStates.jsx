import {createSlice} from '@reduxjs/toolkit';
import { BMIconverter } from '../utils/Conversions';

const initialState = {
  bmi:BMIconverter(30,100),
  weight:30,
  height:100,
  maritalStatus:'',
  primary_contacts:[],
  primary_index:0,
  personal_email:[],
  primary_mail_index:0,
  current_user_profile:
  {
    eh_user_id: "",
    mobileno: {
      country_code: "",
      number: ""
    },
    alternate_mobileno: [],
    email_id: "",
    alternate_email_id: [],
    address: [],
    gender: "",
    marital_status: "",
    date_of_birth: "",
    weight: "",
    height: "",
    height_modified_on: "",
    weight_modified_on: "",
    bmi: "",
    profession: "",
    salary: "",
    category: "",
    profile_image: "",
    blood_group: "B+",
    identification_mark: [],
    life_style: [],
    emergency_contact: [],
    insurance: [],
    vehicle: [],
    doctor_preference: [],
    hospital_preference: [],
    consent: [],
    prescriptions: [],
    diagnostic_reports: [],
    allergy: [],
    daily_exposure: [],
    impairment: [],
    symptoms: [],
    socio_economic_status: [],
    skills: [],
    work_experience: [],
    office_address: [],
    registration: [],
    groups: [],
    professional_detail: [],
    documents: [],
    files: [],
    flag: true,
    user_first_name: "",
    user_last_name: "",
    qr_code_url: "",
    nationality: "",
    religion: "",
    age: "",
    dependent_access_token:'',
    }
};

const PersonalProfileSlice = createSlice({
  name: 'general_states',
  initialState: initialState,
  reducers: {
    setBMI(state,action){
        state.bmi=action.payload;
    },
    setBMIWeight(state,action){
        state.weight=action.payload;
    },
    setBMIHeight(state,action){
      state.height=action.payload;
    },
    setMaritalStatus(state,action){
      state.maritalStatus=action.payload;
    },
    setPrimaryContactsList(state,action){
      state.primary_contacts=action.payload;
    },
    setPrimaryIndex(state,action){
      state.primary_index=action.payload;
    },
    setPrimaryEmails(state,action){
      state.personal_email=action.payload;
    },
    setPrimaryMailIndex(state,action){
      state.primary_mail_index=action.payload;
    },
    setCurrentUserProfile(state,action){
      state.current_user_profile=action.payload;
    }
  },
});

export const {
  setBMI,
  setBMIHeight,
  setBMIWeight,
  setMaritalStatus,
  setPrimaryContactsList,
  setPrimaryIndex,
  setPrimaryEmails,
  setPrimaryMailIndex,
  setCurrentUserProfile
} = PersonalProfileSlice.actions;

export default PersonalProfileSlice.reducer;
