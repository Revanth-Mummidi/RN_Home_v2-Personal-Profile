/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DualButton, TextInputFields} from '../../../_components';
import styles from '../../utils/PersonalStyles';
import {Strings} from '../../../../themes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {getColor} from '../../../../themes/GetColor';
import getStyles from '../../utils/PersonalStyles';
import {
  Clear_AddressSlice,
  set_AddressSlice_AddressList,
  set_AddressSlice_Country,
  set_AddressSlice_DoorNumber,
  set_AddressSlice_address,
  set_AddressSlice_city,
  set_AddressSlice_custom_title,
  set_AddressSlice_district,
  set_AddressSlice_landmark,
  set_AddressSlice_latitude,
  set_AddressSlice_longitude,
  set_AddressSlice_state,
  set_AddressSlice_type,
  set_pin_number,
} from '../../slices/AddressSlice';
import axios from 'axios';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../../../themes/ResponsiveDimensions';
import {useNavigation} from '@react-navigation/native';
import {getLocation} from '../../../Home/utils/Permissions';
import { createAddress } from '../../utils/PersonalServerRequests';
//changed
const Address = () => {
  const Color = getColor(useSelector(state => state.theme.theme));
  const styles = getStyles();
  const AddressList=useSelector(state=>state.PersonalReducers.add_address).address_list;
  const [addAddress, setAddAddress] = useState(false);
  const CurrentProfile = useSelector(
    state => state.PersonalReducers.general_states,
  ).current_user_profile;
  const activeColor = Color.WHITE;
  const inActiveColor = Color.mildBlue;

  const [addressData, setAddressData] = useState(AddressList);
  const [isEdit, setEdit] = useState(false);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [primary,setPrimary]=useState(0);
  // const addressData=useSelector(state=>state.PersonalReducers.add_address).address_list;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const AddAddress = () => {
    const [addressCategory, setAddressCategory] = useState('home');
    const obj = useSelector(state => state.PersonalReducers.add_address);
    const [errorArray, setErrorArray] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
    const [showError, setShowError] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [pinCode, setPinCode] = useState('');
    useEffect(() => {
      dispatch(set_AddressSlice_Country(country));
      dispatch(set_AddressSlice_city(city));
      dispatch(set_AddressSlice_district(district));
      dispatch(set_AddressSlice_state(state));
      dispatch(set_pin_number(pinCode));
    }, [state, country, district, city, pinCode]);
    const GetFromPinCode = async pincode => {
      const pin = parseInt(pincode);
      try {
        const PinCodeObj = await axios.get(
          `https://api.postalpincode.in/pincode/${pin}`,
          {},
          {
            headers: {
              'Content-Type': 'json/application',
            },
          },
        );
        const ob = PinCodeObj.data[0].PostOffice[0];
        setState(ob.State);
        setCountry(ob.Country);
        setDistrict(ob.District);
        setCity(ob.Name);
        console.log(ob.State, ob.Country, ob.District, ob.Name,);
      } catch (err) {
        console.log(err);
      }
    };
    function isValidPinCode(pincode) {
      // Regular expression for validating a pin code with 6 digits
      const pincodeRegex = /^[0-9]{6}$/;

      // Test the pin code against the regular expression
      return pincodeRegex.test(pincode);
    }
    useEffect(() => {
      let arr = errorArray;
      let n = [...arr].length;
      let c = 0;
      let arr1 = [0, 0, 0, 0, 0, 0, 0, 0];
      for (let i = n - 1; i >= 0; i--) {
        if (arr[i] == 0) {
          if (c == 1) {
            arr1[i] = 1;
          } else {
            arr1[i] = 0;
          }
        } else {
          if (c == 0) {
            c = 1;
          }
          arr1[i] = 0;
        }
      }
      // console.log("ARRAY@=",arr1);
      setShowError(arr1);
    }, [errorArray]);

    const setArrActive = (value, index) => {
      let arr = errorArray.map((data, key) => {
        if (index == key) {
          return value;
        } else {
          return data;
        }
      });

      // console.log('ARRAY=', arr, 'val', value, 'ind', index);
      setErrorArray(arr);
    };
    useEffect(() => {
      dispatch(set_AddressSlice_type(addressCategory));
    }, [addressCategory]);
    const handleSave = async (addressObj) => {
      try{
      // const addressObj=useSelector(state=>state.PersonalReducers.add_address);
      console.log('ADD=', addressObj);
      const tempObj = {
        id: 1,
        nickname: addressObj.custom_title,
        type: addressObj.type,
        address: `${
          addressObj.door_number != '' ? addressObj.door_number : ''
        }${addressObj.landmark != '' ? ',' + addressObj.landmark : ''}${
          addressObj.city != '' ? ',' + addressObj.city : ''
        }${addressObj.district != '' ? ',' + addressObj.district : ''}${
          addressObj.state != '' ? ',' + addressObj.state : ''
        }${addressObj.country != '' ? ',' + addressObj.country : ''}${
          addressObj.pin_number != '' ? '-' + addressObj.pin_number : ''
        }`,

        verify: true,
        images: [],
      };
      const bodyData = {
        address_list:[{
        address_image: '',
        address_id: '',
        address_type: addressObj.type,
        custom_title: addressObj.custom_title,
        address:addressObj.door_number ,
        pin_code: addressObj.pin_number,
        city: addressObj.city,
        district:addressObj.district,
        state:addressObj.state,
        country:addressObj.country,
        landmark:addressObj.landmark,
        longitude:addressObj.longitude ,
        latitude:addressObj.latitude,
        is_primary: '',
        }]
      };
       const res=await createAddress(CurrentProfile.dependent_access_token,bodyData);
       console.log(res.data[0])
      let arr = [...addressData, tempObj];
      setAddressData(arr);
      dispatch(set_AddressSlice_AddressList(arr));
      }catch(err){
      console.log("handleSaveErr",err)
    }
    };

    const GetLocation = async () => {
      console.log('Pressed');
      try {
        const location = await getLocation();
        console.log('Location:', location);
        setLatitude(location.latitude);
        setLongitude(location.longitude);
        // Do something with the location, e.g., update state, make an API call, etc.
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };
    return (
      <View>
        <LinearGradient
          colors={['#2899C6', '#1B88C3', '#157AC0']}
          style={{
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginHorizontal: 44,
          }}>
          <Pressable
            onPress={() => {
              setAddressCategory('office');
            }}
            style={{
              width: '40%',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              padding: 14,
            }}>
            <Image
              source={require('../../assets/icons/building.png')}
              style={{
                ...styles.mediumIcon,
                tintColor: !(addressCategory === 'office')
                  ? activeColor
                  : inActiveColor,
              }}
            />
            <Text
              style={{
                color: !(addressCategory === 'office')
                  ? activeColor
                  : inActiveColor,
                fontWeight: '700',
                fontSize: 17,
                paddingLeft: 10,
              }}>
              Office
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setAddressCategory('home');
            }}
            style={{
              width: '40%',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              padding: 14,
            }}>
            <Image
              source={require('../../assets/icons/building-3.png')}
              style={{
                ...styles.mediumIcon,
                tintColor:
                  addressCategory === 'office' ? activeColor : inActiveColor,
              }}
            />
            <Text
              style={{
                ...styles.heading17,
                color:
                  addressCategory === 'office' ? activeColor : inActiveColor,
                paddingLeft: 10,
              }}>
              Home
            </Text>
          </Pressable>
        </LinearGradient>
        <View style={{paddingVertical: 20}}>
          <TextInputFields
            label={'Custom Title *'}
            onChange={e => {
              // console.log(e);
              if (e != '') {
                if (errorArray[0] == 0) {
                  setArrActive(1, 0);
                }
              } else {
                if (errorArray[0] == 1) {
                  setArrActive(0, 0);
                }
              }
              dispatch(set_AddressSlice_custom_title(e));
            }}
            error={showError[0] ? "This field should'nt be empty" : ''}
          />
        </View>
        {/* GPS Location  */}
        <View>
          <Text style={{...styles.heading17, paddingBottom: 10}}>
            GPS Location
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Pressable
              onPress={() => {
                GetLocation();
              }}
              style={{
                width: '16%',
                backgroundColor: Color.textfieldContainer,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '16%',
                  backgroundColor: Color.textfieldContainer,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../assets/icons/locationBold.png')}
                  style={{...styles.mediumIcon, tintColor: Color.badge_bg}}
                />
              </View>
            </Pressable>
            <View style={{width: '40%'}}>
              <TextInputFields
                keyboardType="numeric"
                label={'Latitude'}
                onChange={e => {
                  setLatitude(e);
                  dispatch(set_AddressSlice_latitude(e));
                }}
                value={latitude}
              />
            </View>
            <View style={{width: '40%'}}>
              <TextInputFields
                keyboardType="numeric"
                label={'Longitude'}
                onChange={e => {
                  setLongitude(e);
                  dispatch(set_AddressSlice_longitude(e));
                }}
                value={longitude}
              />
            </View>
          </View>
        </View>
        {/* Door Number  */}
        <View style={{paddingVertical: 10}}>
          <TextInputFields
            label={'Door No *'}
            //  value={addressData}
            onChange={e => {
              // console.log(e);
              dispatch(set_AddressSlice_DoorNumber(e));
              if (e != '') {
                if (errorArray[1] == 0) {
                  setArrActive(1, 1);
                  //  setShowArrActive(1,0)
                }
              } else {
                if (errorArray[1] == 1) {
                  setArrActive(0, 1);
                  // setShowArrActive(0,0);
                }
              }
            }}
            error={showError[1] ? "This field should'nt be empty" : ''}
          />
        </View>

        <View style={styles.textFieldRowBetween}>
          {/* Pin Number  */}
          <View style={{width: '49%'}}>
            <TextInputFields
              label={'PIN Number *'}
              value={pinCode}
              onChange={e => {
                // console.log(e);
                setPinCode(e);
                if (isValidPinCode(e)) {
                  GetFromPinCode(e);
                  let arr1 = errorArray.map((data, index) => {
                    if (index >= 3) {
                      return 1;
                    } else {
                      return data;
                    }
                  });
                  setErrorArray(arr1);
                  const arr = showError.map((data, index) => {
                    if (index >= 3) {
                      return 0;
                    } else {
                      return data;
                    }
                  });
                  setShowError(arr);
                  dispatch(set_pin_number(e));
                }
                if (e != '') {
                  if (errorArray[2] == 0) {
                    setArrActive(1, 2);
                  }
                } else {
                  if (errorArray[2] == 1) {
                    setArrActive(0, 2);
                  }
                }
              }}
              error={showError[2] ? "This field should'nt be empty" : ''}
            />
          </View>

          {/* City  */}
          <View style={{width: '49%'}}>
            <TextInputFields
              label={'City *'}
              value={city}
              onChange={e => {
                setCity(e);
                dispatch(set_AddressSlice_city(e));
                if (e != '') {
                  if (errorArray[3] == 0) {
                    setArrActive(1, 3);
                  }
                } else {
                  if (errorArray[3] == 1) {
                    setArrActive(0, 3);
                  }
                }
              }}
              error={showError[3] ? "This field should'nt be empty" : ''}
            />
          </View>
        </View>

        <View style={styles.textFieldRowBetween}>
          {/* District  */}
          <View style={{width: '49%'}}>
            <TextInputFields
              label={'District *'}
              value={district}
              onChange={e => {
                setDistrict(e);
                dispatch(set_AddressSlice_district(e));
                if (e != '') {
                  if (errorArray[4] == 0) {
                    setArrActive(1, 4);
                  }
                } else {
                  if (errorArray[4] == 1) {
                    setArrActive(0, 4);
                  }
                }
              }}
              error={showError[4] ? "This field should'nt be empty" : ''}
            />
          </View>
          {/* State */}
          <View style={{width: '49%'}}>
            <TextInputFields
              label={'State *'}
              value={state}
              onChange={e => {
                // console.log(e);
                setState(e);
                dispatch(set_AddressSlice_state(e));
                if (e != '') {
                  if (errorArray[5] == 0) {
                    setArrActive(1, 5);
                  }
                } else {
                  if (errorArray[5] == 1) {
                    setArrActive(0, 5);
                  }
                }
              }}
              error={showError[5] ? "This field should'nt be empty" : ''}
            />
          </View>
        </View>
        <View style={styles.textFieldRowBetween}>
          {/* Country */}
          <View style={{width: '49%'}}>
            <TextInputFields
              label={'Country *'}
              value={country}
              onChange={e => {
                console.log(e);
                setCountry(e);
                dispatch(set_AddressSlice_Country(e));
                if (e != '') {
                  if (errorArray[6] == 0) {
                    setArrActive(1, 6);
                  }
                } else {
                  if (errorArray[6] == 1) {
                    setArrActive(0, 6);
                  }
                }
              }}
              error={showError[6] ? "This field should'nt be empty" : ''}
            />
          </View>
          {/* Landmark */}
          <View style={{width: '49%'}}>
            <TextInputFields
              label={'Landmark '}
              onChange={e => {
                console.log(e);
                dispatch(set_AddressSlice_landmark(e));
                // if (e != '') {
                //   if (errorArray[2] == 0) {
                //     setArrActive(1, 2);
                //   }
                // } else {
                //   if (errorArray[2] == 1) {
                //     setArrActive(0, 2);
                //   }
                // }
              }}
              // error={showError[2] ? "This field should'nt be empty" : ''}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', flex: 1, marginVertical: 10}}>
          <View
            style={{
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{...styles.heading17}}>Add Images</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <ScrollView horizontal>
            <Pressable
              onPress={() => {
                navigation.navigate('Recording', {mode: 'isProfile'});
              }}>
              <View
                style={{
                  marginBottom: 10,
                  height: responsiveHeight(10),
                  width: responsiveWidth(25),
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: 'grey',
                  borderStyle: 'dashed',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 10,
                }}>
                <MaterialIcons
                  name="photo-camera"
                  size={50}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0.7,
                  }}
                />
              </View>
            </Pressable>
            <View
              style={{
                marginBottom: 10,
                height: responsiveHeight(10),
                width: responsiveWidth(25),
                borderRadius: 10,
                borderWidth: 2,
                borderColor: 'grey',
                borderStyle: 'dashed',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}></View>
            <View
              style={{
                marginBottom: 10,
                height: responsiveHeight(10),
                width: responsiveWidth(25),
                borderRadius: 10,
                borderWidth: 2,
                borderColor: 'grey',
                borderStyle: 'dashed',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}></View>
            <View
              style={{
                marginBottom: 10,
                height: responsiveHeight(10),
                width: responsiveWidth(25),
                borderRadius: 10,
                borderWidth: 2,
                borderColor: 'grey',
                borderStyle: 'dashed',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}></View>
          </ScrollView>
        </View>
        <Pressable
          onPress={() => {
            setArrActive(1, 7);
            let c = 0,
              arr = errorArray,
              arr2;
            arr2 = arr.map((data, index) => {
              if (data == 0) {
                c = 1;
                return 1;
              } else {
                return 0;
              }
            });
            let arr1 = showError;
            arr1.map((data, index) => {
              if (data == 1) {
                c = 1;
              }
            });
            setShowError(arr2);
            if (c == 0) {
              setAddAddress(false);
              handleSave(obj);
            }
          }}
          style={styles.mediumButton}>
          <Text style={styles.buttonText14}>{Strings.buttonSave}</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={{...styles.parentWidth, marginBottom: 20}}>
      <Text style={[styles.heading17, styles.headingStyle]}>
        {isEdit ? 'Edit' : ''} Address{'\n'}
        <Text style={styles.subHeading13}>Logistics | Emergency </Text>
      </Text>

      {!addAddress ? (
        <Pressable
          onPress={() => {
            setAddAddress(!addAddress);
            setEdit(false);
            dispatch(Clear_AddressSlice());
          }}
          style={{
            position: 'absolute',
            right: 10,
            top: 5,
            padding: 20,
          }}>
          <Image
            source={require('../../assets/icons/add-square_bold.png')}
            style={{
              width: 30,
              height: 30,
              tintColor: Color.calend_card_color1,
            }}
          />
        </Pressable>
      ) : null}
      {addAddress ? (
        <AddAddress />
      ) : (
        addressData.map((item, index) => (
          <AddressCard
            key={index}
            item={item}
            index={index}
            setAddAddress={setAddAddress}
            setEdit={setEdit}
          />
        ))
      )}
    </View>
  );
};

const AddressCard = ({item, index, setAddAddress, setEdit}) => {
  const [longView, setLongView] = useState(false);
  console.log('Item=', item);
  const styles = getStyles();
  const Color = getColor(useSelector(state => state.theme.theme));
  return (
    <Pressable
      key={index}
      onPress={() => {
        setLongView(!longView);
      }}
      style={{
        borderRadius: 10,
        backgroundColor: Color.textfieldContainer,
        padding: 10,
        marginTop: 10,
      }}>
      <Text style={styles.heading17}>{item.nickname}</Text>
      <Text numberOfLines={1} style={styles.subHeading13}>
        {item.address}
      </Text>
      <View
        style={{
          flexDirection: longView ? 'column' : 'row',
          marginTop: 10,
        }}>
        <View style={{flexDirection: 'row', padding: 10}}>
          <View style={{marginRight: 10, width: '13%'}}>
            <Image
              source={
                item.type === 'home'
                  ? require('../../assets/icons/building-3.png')
                  : require('../../assets/icons/building.png')
              }
              style={{width: 30, height: 30, tintColor: Color.badge_bg}}
            />
          </View>
          {longView ? (
            <View style={{width: '77%', justifyContent: 'center'}}>
              <Text
                style={{
                  ...styles.text14,
                  lineHeight: 20,
                }}>
                {item.address}
              </Text>
            </View>
          ) : null}
        </View>
        <View style={{flexDirection: 'row', padding: 10}}>
          <View style={{marginRight: 10, width: '13%'}}>
            <Image
              source={require('../../assets/icons/locationBold.png')}
              style={{
                width: 30,
                height: 30,
                tintColor: Color.badge_bg,
              }}
            />
          </View>
          {longView ? (
            <View style={{width: '77%', justifyContent: 'center'}}>
              <Text style={{...styles.text14}}>Latitude , Longitude</Text>
            </View>
          ) : null}
        </View>
        <View style={{flexDirection: 'row', padding: 10}}>
          <View
            style={{
              marginRight: 10,
              width: '13%',
            }}>
            <Image
              source={require('../../assets/icons/tick-circle.png')}
              style={{
                width: 30,
                height: 30,
                tintColor: Color.badge_bg,
              }}
            />
          </View>
          {longView ? (
            <View style={{width: '77%', justifyContent: 'center'}}>
              <Text style={styles.text14}>Default</Text>
            </View>
          ) : null}
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              borderWidth: 1,
              borderColor: Color.badge_bg,
              borderRadius: 10,
              width: 70,
              height: 50,
              padding: 10,
              borderStyle: 'dotted',
            }}></View>
          <Pressable
            onPress={() => {
              setEdit(true);
              setAddAddress(true);
            }}
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <View
              style={{
                padding: 10,
              }}>
              <MaterialIcons
                name="edit"
                size={25}
                style={{color: Color.badge_bg}}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export default Address;

const address = [
  {
    id: 1,
    nickname: 'Hyderabad Flat',
    type: 'Office',
    address:
      'D.No 27-3/9823/1, Official Colony, Gajuwaka PS,Gajuwaka, Visakhaptnam,Andhra Pradesh, India - 530048',
    verify: true,
    images: [],
  },
  {
    id: 1,
    nickname: 'Hyderabad Flat',
    type: 'home',
    address:
      'D.No 27-3/9823/1, Official Colony, Gajuwaka PS,Gajuwaka, Visakhaptnam,Andhra Pradesh, India - 530048',
    verify: true,
    images: [],
  },
];
