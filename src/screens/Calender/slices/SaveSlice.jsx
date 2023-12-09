import {createSlice} from '@reduxjs/toolkit';
const initialstate={
  colour_code: '',
  details: '',
  duration: '15',
  end_date: '',
  eh_user_id:[],
  end_time: '',
  event_name: '',
  occurance: '',
  priority: 1,
  hour: 0,
  day: 0,
  month: 0,
  isWeek:-1,
  weeks: [0,0,0,0,0,0,0],
  start_time: '',
  start_date: '',
  status: 'unconfirmed',
};
const SaveSlice = createSlice({
  name: 'savetask',
  initialState:initialstate,
  reducers: {
    setColorCode(state, action) {
      state.colour_code = action.payload;
    },
    setDetails(state, action) {
      state.details = action.payload;
    },
    setDuration(state, action) {
      state.duration = action.payload;
    },
    setEndDate(state, action) {
      state.end_date = action.payload;
    },
    setEhUserId(state, action) {
      state.eh_user_id = action.payload;
    },
    setEndTime(state, action) {
      state.end_time = action.payload;
    },
    setEventName(state, action) {
      state.event_name = action.payload;
    },
    setOccurance(state, action) {
      state.occurance = action.payload;
    },
    setPriority(state, action) {
      state.priority = action.payload;
    },
    setStartTime(state, action) {
      state.start_time = action.payload;
    },
    setStartDate(state, action) {
      state.start_date = action.payload;
    },
    setHour(state, action) {
      state.hour = action.payload;
    },
    setDay(state, action) {
      state.day = action.payload;
    },
    setMonth(state, action) {
      state.month = action.payload;
    },
    setWeeks(state, action) {
      state.weeks = action.payload;
    },
    setIsWeek(state,action){
      state.isWeek=action.payload;
    },
    resetSaveTask(state) {
      state=initialstate;
    },
  },
});

export const {
  setColorCode,
  setDetails,
  setDuration,
  setEhUserId,
  setEndDate,
  setEndTime,
  setEventName,
  setOccurance,
  setPriority,
  setStartDate,
  setStartTime,
  setDay,
  setHour,
  setMonth,
  setWeeks,
  setIsWeek,
  resetSaveTask
} = SaveSlice.actions;

export default SaveSlice.reducer;
