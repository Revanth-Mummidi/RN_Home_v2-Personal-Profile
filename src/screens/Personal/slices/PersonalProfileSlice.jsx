import {combineReducers} from '@reduxjs/toolkit';
import AddMemberSlice from './AddMemberSlice';
import PersonalProfileStates from './PersonalProfileStates';
import AddressSlice from './AddressSlice';
import VerificationSlice from './VerificationSlice';



const PersonalProfileReducers=combineReducers({
   add_member:AddMemberSlice,
   general_states:PersonalProfileStates,
   add_address:AddressSlice,
   verification_states:VerificationSlice,

})

export default PersonalProfileReducers;
