import {createSlice} from '@reduxjs/toolkit';
const initialstate={
  IsPreviousCards:false,
  IsSearch:0,
  ProfileSliderView:false,
  CurrentDate:new Date(),
  searchText:'',
};
const CalendarStates = createSlice({
  name: 'cal_states',
  initialState: initialstate,
  reducers: {
    setIsPreviousCards(state, action) {
      state.IsPreviousCards = action.payload;
    },
    setIsSearch(state,action)
    {
      state.IsSearch=action.payload;
    },
    setProfileSliderView(state,action)
    {
      state.ProfileSliderView=action.payload;
    },
    setCurrentDate(state,action)
    {
      state.CurrentDate=action.payload;
    },
    setSearchText(state,action){
      state.searchText=action.payload;
    },
    Clear_Cal_States(state,action)
    {
      state=initialstate;
    }
  },
});


export const {setIsPreviousCards,setIsSearch,setProfileSliderView,setCurrentDate,setSearchText,Clear_Cal_States} = CalendarStates.actions;
export default CalendarStates.reducer;
