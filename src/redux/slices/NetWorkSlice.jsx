import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isOnline: false ,  
};

const NetworkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setOnline(state, action) {
      state.isOnline = action.payload;
    },
  },
});

export const {setOnline} = NetworkSlice.actions;
export default NetworkSlice.reducer;
