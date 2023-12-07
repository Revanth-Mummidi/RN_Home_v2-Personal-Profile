//const {configureStore} = require('@reduxjs/toolkit');
import {configureStore,combineReducers} from '@reduxjs/toolkit';

import ThemeReducer from './slices/ThemeSlice';
import UserOnboardingReducer from './slices/UserOnboardingSlice';
import LangReducer from './slices/LanguageSlice'
import ProfilePicSlice from './slices/ProfilePicSlice';
import PersonalProfileSlice from '../screens/Personal/slices/PersonalProfileSlice'
import AddDependantUserSlice from './slices/AddDependantUserSlice';
import MediaSlice from './slices/MediaSlice';


const rootreducer = combineReducers({
  screen:MediaSlice,
  theme: ThemeReducer,
  userOnboarding: UserOnboardingReducer,
  lang:LangReducer,
  image:ProfilePicSlice,
  dependant_users:AddDependantUserSlice,
  PersonalReducers:PersonalProfileSlice,
})


export const MyStore = configureStore({
  reducer: rootreducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // disable serializable state check
    }),
});

export default MyStore;