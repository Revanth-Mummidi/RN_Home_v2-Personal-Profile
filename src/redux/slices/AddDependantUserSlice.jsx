import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  dependant_users_data:[],
  dependant_users_ehid:[], 
  parent_profile:{}
};

const AddDependantUserSlice = createSlice({
  name: 'dependant_users',
  initialState:initialState,
  reducers: {
     setDependantUsers(state, action) {
      state.dependant_users_data = action.payload;
    },
    setDependantUsersEHID(state,action){
        state.dependant_users_ehid=action.payload;
    },
    setParentProfile(state,action){
      state.parent_profile=action.payload;
    }
  },
});

export const {setDependantUsers,setDependantUsersEHID,setParentProfile} = AddDependantUserSlice.actions;
export default AddDependantUserSlice.reducer;