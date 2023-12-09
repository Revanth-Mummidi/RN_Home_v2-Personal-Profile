//const {configureStore} = require('@reduxjs/toolkit');
import {configureStore,combineReducers} from '@reduxjs/toolkit';

import ThemeReducer from './slices/ThemeSlice';
import UserOnboardingReducer from './slices/UserOnboardingSlice';
import LangReducer from './slices/LanguageSlice'
import ProfilePicSlice from './slices/ProfilePicSlice';
import PersonalProfileSlice from '../screens/Personal/slices/PersonalProfileSlice'
import AddDependantUserSlice from './slices/AddDependantUserSlice';
import MediaSlice from './slices/MediaSlice';
import CalendarReducers from '../screens/Calender/slices/CalScreenSlices';
import NetWorkSlice from './slices/NetWorkSlice';


const rootreducer = combineReducers({
  screen:MediaSlice,
  theme: ThemeReducer,
  userOnboarding: UserOnboardingReducer,
  lang:LangReducer,
  image:ProfilePicSlice,
  dependant_users:AddDependantUserSlice,
  CalendarReducers:CalendarReducers,
  PersonalReducers:PersonalProfileSlice,
  network:NetWorkSlice
})


export const MyStore = configureStore({
  reducer: rootreducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // disable serializable state check
    }),
});

export default MyStore;