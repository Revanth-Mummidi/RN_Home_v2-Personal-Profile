// import {View, Text} from 'react-native';
// import React from 'react';
// import {createSlice} from '@reduxjs/toolkit';

// const ThemeSlice = createSlice({
//   name: 'theme',
//   initialState: {
//     theme: '',
//   },
//   reducers: {
//     setTheme(state, action) {
//       state.theme = action.payload;
//     },
//   },
// });

// export const {setTheme}= ThemeSlice.actions;
// export default ThemeSlice.reducer;
import {createSlice} from '@reduxjs/toolkit';
import { getColor } from '../../themes/GetColor';
import { getTheme } from '../../utils/LocalStorage';

const ThemeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: '',
    Colors:getColor('sysdes')
  },
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
      state.Colors = getColor(action.payload);     
    },
    
  },
});

export const {setTheme}= ThemeSlice.actions;
export default ThemeSlice.reducer;