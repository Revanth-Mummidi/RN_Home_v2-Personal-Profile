const {createSlice} = require('@reduxjs/toolkit');

const UserOnboardingSlice = createSlice({
  name: 'user_onboarding',
  initialState: {
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    dobDate:'',
    profession: '',
    keyboardVisible: false,
    token: '',
    isDataSubmitted:false,
    mpin:false,
  },
  reducers: {
    setUserFirstName(state, action) {
      state.firstName = action.payload;
    },
    setUserLastName(state, action) {
      state.lastName = action.payload;
    },
    setUserGender(state, action) {
      state.gender = action.payload;
    },
    setUserDob(state, action) {
      state.dob = action.payload;
    },
    setUserProfession(state, action) {
      state.profession = action.payload;
    },
    setKeyboardVisible(state, action) {
      state.keyboardVisible = action.payload;
    },
    setUserToken(state, action) {
      state.token = action.payload;
    },
    setDobDate(state, action) {
      state.dobDate = action.payload;
    },
    setDataSubmitted(state,action){
      state.isDataSubmitted = action.payload;
    },
    setMpins(state,action){
      state.mpin = action.payload;
    }
  },
});
export const {
  setUserDob,
  setUserFirstName,
  setUserGender,
  setUserLastName,
  setUserProfession,
  setKeyboardVisible,
  setUserToken,
  setDobDate,
  setDataSubmitted,
  setMpins
} = UserOnboardingSlice.actions;
export default UserOnboardingSlice.reducer;
