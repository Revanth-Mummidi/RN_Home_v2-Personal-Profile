import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  selected_main_dependant_users:[],
  group_dependent_users:[], 
};

const CalendarDependentUsers = createSlice({
  name: 'calend_dependant_users',
  initialState:initialState,
  reducers: {
     setSelectedDependantUser(state, action) {
      state.selected_main_dependant_users = action.payload;
    },
    setGroupDependantUsers(state,action){
        state.group_dependent_users=action.payload;
    },
    
  },
});

export const {setGroupDependantUsers,setSelectedDependantUser} = CalendarDependentUsers.actions;
export default CalendarDependentUsers.reducer;