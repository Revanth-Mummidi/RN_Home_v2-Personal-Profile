import {createSlice} from '@reduxjs/toolkit';
import { act } from 'react-test-renderer';

const initialState = {
    verification_type:'',
    verification_pin:'',
    verification_image:[],
    verification_step:0
};

const VerificationSlice= createSlice({
  name: 'verification_states',
  initialState: initialState,
  reducers: {
    setVerificationType(state,action)
    {
       state.verification_type=action.payload;
    },
    setVerificationPin(state,action)
    {
        state.verification_pin=action.payload;
    },
    setVerificationStep(state,action)
    {
      state.verification_step=action.payload;
    }
  },
});

export const {
setVerificationPin,
setVerificationType,
setVerificationStep
} = VerificationSlice.actions;

export default VerificationSlice.reducer;
