// const {createSlice} = require('@reduxjs/toolkit');

// const LangSlice = createSlice({
//   name: 'language',
//   initialState: {
//     lang: 'en',
//   },
//   reducers:{
//     setAppLang(state,action){
//         state.lang = action.payload
//     }
//   }
// });

// export const {setAppLang}=LangSlice.actions
// export default LangSlice.reducer

import {createSlice} from '@reduxjs/toolkit';

const LangSlice = createSlice({
  name: 'lang',
  initialState: {
     lang:'en'
  },
  reducers: {
    setLang(state, action) {
      state.lang =action.payload;   
    },
  },
});

export const {setLang}= LangSlice.actions;
export default LangSlice.reducer;
