import {combineReducers} from '@reduxjs/toolkit';
import SaveSlice from './SaveSlice';
import CalendarStates from './CalendarStates';
import ViewCardSlice from './ViewCardSlice';

const CalendarReducers=combineReducers({
  savetask:SaveSlice,
  cal_states:CalendarStates,
  view_card_states:ViewCardSlice,
})
export default CalendarReducers;
