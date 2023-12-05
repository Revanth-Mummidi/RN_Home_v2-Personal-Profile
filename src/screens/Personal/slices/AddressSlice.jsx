import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  door_number:'',
  pin_number:'',
  district:'',
  city:'',
  state:'',
  landmark:'',
  custom_title:'',
  latitude:'',
  longitude:'',
  country:'',
  type:'',
  isEdit:false,
  isPrimary:'0',
  address_list:[],
};

const AddressSlice = createSlice({
  name: 'add_address',
  initialState: initialState,
  reducers: {
    set_AddressSlice_AddressList(state,action)
    {
      state.address_list=action.payload;
    },
     set_AddressSlice_DoorNumber(state,action){
        state.door_number=action.payload;
     },
     set_pin_number(state,action){
        state.pin_number=action.payload;
     },
     set_AddressSlice_district(state,action){
        state.district=action.payload;
     },
     set_AddressSlice_city(state,action){
        state.city=action.payload;
     },
     set_AddressSlice_state(state,action){
        state.state=action.payload;
     },
     set_AddressSlice_landmark(state,action){
        state.landmark=action.payload;
     },
     set_AddressSlice_custom_title(state,action){
        state.custom_title=action.payload;
     },
     set_AddressSlice_latitude(state,action){
        state.latitude=action.payload;
     },
     set_AddressSlice_longitude(state,action){
        state.longitude=action.payload;
     },
     set_AddressSlice_type(state,action){
        state.type=action.payload;
     },
     set_AddressSlice_Country(state,action){
        state.country=action.payload;
     },
     set_AddressSlice_IsEdit(state,action){
      state.isEdit=action.payload;
     },
     set_AddressSlice_IsPrimary(state,action){
      state.isPrimary=action.payload;
     },
     Clear_AddressSlice(state,action){
        state.door_number='';
        state.city='';
        state.custom_title='';
        state.district='';
        state.landmark='';
        state.latitude='';
        state.longitude='';
        state.pin_number='';
        state.state='';
        state.type='';
        state.country='';
        state.isPrimary='0';
        
     }
  },
});

export const {
  set_AddressSlice_DoorNumber,
  set_AddressSlice_city,
  set_AddressSlice_custom_title,
  set_AddressSlice_district,
  set_AddressSlice_landmark,
  set_AddressSlice_latitude,
  set_AddressSlice_longitude,
  set_AddressSlice_state,
  set_AddressSlice_type,
  set_pin_number,
  set_AddressSlice_Country,
  set_AddressSlice_IsEdit,
  set_AddressSlice_IsPrimary,
  Clear_AddressSlice,
  set_AddressSlice_AddressList
} = AddressSlice.actions;

export default AddressSlice.reducer;
