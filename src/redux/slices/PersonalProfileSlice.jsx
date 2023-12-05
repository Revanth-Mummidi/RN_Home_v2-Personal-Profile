import {combineReducers} from '@reduxjs/toolkit';
import AddMemberSlice from './AddMemberSlice';
import PersonalProfileStates from './PersonalProfileStates';


const PersonalProfileReducers=combineReducers({
   add_member:AddMemberSlice,
   general_states:PersonalProfileStates
})

export default PersonalProfileReducers;
