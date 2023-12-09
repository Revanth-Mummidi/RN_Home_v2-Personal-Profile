import {combineReducers} from '@reduxjs/toolkit';
import SaveSlice from './SaveSlice';
import CalendarStates from './CalendarStates';
import ViewCardSlice from './ViewCardSlice';
import Calendar_Dependent_Users from './Calendar_Dependent_Users';

const CalendarReducers=combineReducers({
  savetask:SaveSlice,
  cal_states:CalendarStates,
  view_card_states:ViewCardSlice,
  calend_dependent_users:Calendar_Dependent_Users
})
export default CalendarReducers;
