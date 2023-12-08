import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  first_name: '',
  last_name: '',
  date_of_birth: new Date(),
  gender: '',
  blood_group: '',
  relation: '',
  profession: '',
  nationality: '',
  ethnicity: '',
  religion: '',
  IsEdit: '',
  EditObject:{}
};

const AddMemberSlice = createSlice({
  name: 'add_member',
  initialState: initialState,
  reducers: {
    set_AddMember_FirstName(state, action) {
      state.first_name = action.payload;
    },
    set_AddMember_LastName(state, action) {
      state.last_name = action.payload;
    },
    set_AddMember_DateOfBirth(state, action) {
      state.date_of_birth = action.payload;
    },
    set_AddMember_Gender(state, action) {
      state.gender = action.payload;
    },
    set_AddMember_BloodGroup(state, action) {
      state.blood_group = action.payload;
    },
    set_AddMember_Relation(state, action) {
      state.relation = action.payload;
    },
    set_AddMember_Profession(state, action) {
      state.profession = action.payload;
    },
    set_AddMember_Nationality(state, action) {
      state.nationality = action.payload;
    },
    set_AddMember_Ethnicity(state, action) {
      state.ethnicity = action.payload;
    },
    set_AddMember_Religion(state, action) {
      state.religion = action.payload;
    },
    set_AddMember_IsEdit(state, action) {
      state.IsEdit = action.payload;
    },
    set_AddMember_Complete(state, action) {
      state = action.payload;
    },
    set_AddMember_EditObject(state,action){
      state.EditObject=action.payload;
    },
    ClearAddMembeData(state, action) {
      state.first_name = '';
      state.last_name = '';
      state.date_of_birth = new Date();
      state.gender = '';
      state.blood_group = '';
      state.relation = '';
      state.profession = '';
      state.nationality = '';
      state.ethnicity = '';
      state.religion = '';
      state.IsEdit = '';
    },
  },
});

export const {
  set_AddMember_DateOfBirth,
  set_AddMember_Ethnicity,
  set_AddMember_FirstName,
  set_AddMember_Gender,
  set_AddMember_LastName,
  set_AddMember_Nationality,
  set_AddMember_Profession,
  set_AddMember_Relation,
  set_AddMember_Religion,
  set_AddMember_BloodGroup,
  set_AddMember_Complete,
  set_AddMember_IsEdit,
  set_AddMember_EditObject,
  ClearAddMembeData,
} = AddMemberSlice.actions;

export default AddMemberSlice.reducer;
