import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  alarm_status: '',
  colour_code: '',
  confirm_date: '',
  confirm_end_time: '',
  confirm_start_time: '',
  details: '',
  duration: '',
  eh_grp_id: '',
  eh_sch_evnt_id: '',
  eh_user_id: '',
  end_date: '',
  end_time: '',
  event_by: '',
  event_grp_id: '',
  event_id: '',
  event_name: '',
  event_note_data: [],
  event_occurance_data: [],
  event_occurance_id: '',
  is_never: '',
  occurance: '',
  priority: '',
  sch_cat_id: '',
  sch_event_id: '',
  start_date: '',
  start_time: '',
  status: 'unconfirmed',
  isEdit: false,
  EditObj:{},
  isConfirmed:false
};

const ViewSlice = createSlice({
  name: 'view_card_states',
  initialState: {initialState},
  reducers: {
    setViewData(state,action){
      state.alarm_status=action.payload.alarm_status;
      state.confirm_date=action.payload.confirm_date;
      state.colour_code=action.payload.colour_code;
      state.confirm_end_time=action.payload.confirm_end_time;
      state.confirm_start_time=action.payload.confirm_start_time;
      state.details=action.payload.details;
      state.duration=action.payload.duration;
      state.eh_user_id=action.payload.eh_user_id;
      state.end_date=action.payload.end_date;
      state.end_time=action.payload.end_time;
      state.event_by=action.payload.event_by;
      state.event_id=action.payload.event_id;
      state.event_name=action.payload.event_name;
      state.event_occurance_id=action.payload.event_occurance_id;
      state.is_never=action.payload.is_never;
      state.occurance=action.payload.occurance;
      state.priority=action.payload.priority;
      state.start_date=action.payload.start_date;
      state.start_time=action.payload.start_time;
      state.status=action.payload.status;
    },
    setIsEdit(state,action)
    {
       state.isEdit=action.payload;
    },
    setConfirmStatus(state,action){
       state.isConfirmed=action.payload;
    },
    setEditingObject(state,action){
       state.EditObj=action.payload;
    },
    ClearViewData(state,action){
      setViewData(initialState);
    }
  },
});

export const {
  setViewData,setIsEdit,setConfirmStatus,
  setEditingObject,
  ClearViewData
} = ViewSlice.actions;

export default ViewSlice.reducer;
