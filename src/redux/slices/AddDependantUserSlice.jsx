import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  dependant_users_data:[],
  dependant_users_ehid:[], 
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
    }
  },
});

export const {setDependantUsers,setDependantUsersEHID} = AddDependantUserSlice.actions;
export default AddDependantUserSlice.reducer;