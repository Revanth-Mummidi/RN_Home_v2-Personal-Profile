import { createSlice } from '@reduxjs/toolkit';

const MediaSlice = createSlice({
  name: 'screen',
  initialState: {
    uri: undefined,
    backend:undefined,
  },
  reducers: {
    setScreen(state, action) {
      state.uri = action.payload;
    },
    // clearImageURI(state) {
    //   state.uri = undefined;
    // },
    // setBackendUri(state,action){
    //   state.backend = action.payload;
    // }
  },
});

export const { setScreen} = MediaSlice.actions;
export default MediaSlice.reducer;