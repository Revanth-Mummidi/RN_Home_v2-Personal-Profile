import {createSlice} from '@reduxjs/toolkit';
import { BMIconverter } from '../../screens/Personal/utils/Conversions';
//changed
const initialState = {
  bmi:BMIconverter(30,100),
  weight:30,
  height:100,
  maritalStatus:'',
  primary_contacts:[],
  primary_index:0,
  personal_email:[],
  primary_mail_index:0,
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
  setPrimaryMailIndex
} = PersonalProfileSlice.actions;

export default PersonalProfileSlice.reducer;
