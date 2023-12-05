import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
  name: 'image',
  initialState: {
    uri: undefined,
    backend:undefined,
  },
  reducers: {
    setImageURI(state, action) {
      state.uri = action.payload;
    },
    clearImageURI(state) {
      state.uri = undefined;
    },
    setBackendUri(state,action){
      state.backend = action.payload;
    }
  },
});

export const { setImageURI, clearImageURI,setBackendUri } = imageSlice.actions;
export default imageSlice.reducer;
