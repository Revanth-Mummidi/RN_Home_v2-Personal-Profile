/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-lone-blocks */
{
  /* ******************** Developer Note ********************
      Objective:
        1.
        2. Screen not build on the basis that developer can directly integrate with backend.. Its more for visual representation

      ToDo:
        1. Header to goBack.
        2. 'Color3' brighter backgrounds makes the text hard to readable.
        3.
    */
}
import { Text, View, Image, Pressable, ScrollView, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import ImageColors from 'react-native-image-colors';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IoniIcons from 'react-native-vector-icons/Ionicons';
import { HandleBottomSheet, TextInputFields } from '../../../_components';
import AgeGender from '../Edit/AgeGender';
import BloodGroup from '../Edit/BloodGroup';

// import {useNavigation} from '@react-navigation/native';
import SocioEconomicScale from '../Edit/SocioEconomicScale';
import MaritalStatus from '../Edit/MaritalStatus';
import BMI from '../Edit/BMI';
import PhoneNumber from '../Edit/PhoneNumber';
import Email from '../Edit/Email';
import getStyles from '../../utils/PersonalStyles';
import QRCode from '../Edit/QRCode';
import Address from '../Edit/Address';
import { useDispatch, useSelector } from 'react-redux';
import { getColor } from '../../../../themes/GetColor';
import UserVerification from '../Edit/UserVerification';
import { useNavigation } from '@react-navigation/native';
import { ClearAddMembeData, set_AddMember_BloodGroup, set_AddMember_Complete, set_AddMember_DateOfBirth, set_AddMember_FirstName, set_AddMember_Gender, set_AddMember_IsEdit, set_AddMember_LastName } from '../../slices/AddMemberSlice';
import { parseDateString } from '../../utils/Conversions';
import { responsiveFontSize, responsiveHeight, useResponsiveHeight } from '../../../../themes/ResponsiveDimensions';
// import { Modal } from 'react-native-paper';

const initialState = {
  colorOne: { value: '', name: '' },
  colorTwo: { value: '', name: '' },
  colorThree: { value: '', name: '' },
  colorFour: { value: '', name: '' },
  colorFive: { value: '', name: '' },
  colorSix: { value: '', name: '' },
  colorSeven: { value: '', name: '' },
  colorEight: { value: '', name: '' },
  rawResult: '',
};  



const PrivateApercu = ({ imageURL }) => {
  const Color = getColor(useSelector(state => state.theme.theme));
  const navigation = useNavigation();
  const [colors, setColors] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const styles = getStyles();
  var color1 = colors.colorSeven.value;
  var color2 = colors.colorSix.value;
  var color3 = colors.colorEight.value;
  const refScreens = React.useRef(null);
  const  refTabScreens = React.useRef(null);
  const { profileDetails, slider, tabs } = getArr(refScreens);
  const [image, setImage] = useState(
    (imageURL = require('../../assets/images/Svante_Paabo_nobelPrizeMedicine.jpeg')),
  );

  const refProfileImage = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tabselectedIndex, setTabSelectedIndex] = useState(0);
  const [profileImage, setProfileImage] = useState(false);
  const [profileEditClicked, setProfileEditClicked] = useState(false);
  const dispatch = useDispatch();
  const CurrentProfile = useSelector(state => state.PersonalReducers.general_states).current_user_profile;


  // useEffect(() => {
  //   const fetchColors = async () => {
  //     const result = await ImageColors.getColors(image, {
  //       fallback: '#000000',
  //       quality: 'low',
  //       pixelSpacing: 5,
  //       cache: true,
  //       headers: {
  //         authorization: 'Basic 123',
  //       },
  //     });

  //     switch (result.platform) {
  //       case 'android':
  //       case 'web':
  //         setColors({
  //           // colorOne: {value: result.lightVibrant, name: 'lightVibrant'},
  //           // colorTwo: {value: result.dominant, name: 'dominant'},
  //           // colorThree: {value: result.vibrant, name: 'vibrant'},
  //           // colorFour: {value: result.darkVibrant, name: 'darkVibrant'},
  //           colorOne: { value: result.dominant, name: 'dominant' },
  //           colorTwo: { value: result.average, name: 'average' },
  //           colorThree: { value: result.vibrant, name: 'vibrant' },
  //           colorFour: { value: result.darkVibrant, name: 'darkVibrant' },
  //           colorFive: { value: result.lightVibrant, name: 'lightVibrant' },
  //           colorSix: { value: result.darkMuted, name: 'darkMuted' },
  //           colorSeven: { value: result.lightMuted, name: 'lightMuted' },
  //           colorEight: { value: result.muted, name: 'muted' },
  //           rawResult: JSON.stringify(result),
  //         });
  //         break;
  //       case 'ios':
  //         setColors({
  //           colorOne: { value: result.background, name: 'background' },
  //           colorTwo: { value: result.detail, name: 'detail' },
  //           colorThree: { value: result.primary, name: 'primary' },
  //           colorFour: { value: result.secondary, name: 'secondary' },
  //           rawResult: JSON.stringify(result),
  //         });
  //         break;
  //       default:
  //         throw new Error('Unexpected platform');
  //     }

  //     setLoading(false);
  //   };

  //   fetchColors();
  // }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  }
  const editProfileImage = () => {
    return (
      <View style={{ width: '100%' }}>
        <View style={{ ...styles.profileContainer, alignSelf: 'center' }}>
          <Image source={image} style={styles.Image200} resizeMode={'cover'} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Pressable style={{ ...styles.buttonContainer, minWidth: '20%' }}>
            <Image
              source={require('../../assets/icons/trush-square.png')}
              style={{ ...styles.mediumIcon, tintColor: Color.midBlue }}
              resizeMode={'cover'}
            />
            <Text style={{ color: Color.midBlue }}>Delete</Text>
          </Pressable>
          {profileEditClicked ? (
            <>
              <Pressable
                onPress={() => {
                  alert(
                    'Cancel: remove the selected image and show last saved image',
                  );
                  setProfileEditClicked(false);
                }}
                style={{ ...styles.buttonContainer, minWidth: '20%' }}>
                <Image
                  source={require('../../assets/icons/close-square.png')}
                  style={{ ...styles.mediumIcon, tintColor: Color.midBlue }}
                  resizeMode={'cover'}
                />
                <Text style={{ color: Color.midBlue }}>cancel</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  alert(
                    'Save: remove the selected image and show last saved image',
                  );
                  setProfileEditClicked(false);
                }}
                style={{ ...styles.buttonContainer, minWidth: '20%' }}>
                <Image
                  source={require('../../assets/icons/tick-square.png')}
                  style={{ ...styles.mediumIcon, tintColor: Color.midBlue }}
                  resizeMode={'cover'}
                />
                <Text style={{ color: Color.midBlue }}>Save</Text>
              </Pressable>
            </>
          ) : (
            <Pressable
              onPress={() => {
                setProfileEditClicked(!profileEditClicked);
              }}
              style={{ ...styles.buttonContainer, minWidth: '20%' }}>
              <Image
                source={require('../../assets/icons/path-square.png')}
                style={{ ...styles.mediumIcon, tintColor: Color.midBlue }}
                resizeMode={'cover'}
              />
              <Text style={{ color: Color.midBlue }}>Edit</Text>
            </Pressable>
          )}
        </View>
        {profileEditClicked && (
          <ScrollView
            style={{
              backgroundColor: Color.white,
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: Color.yellow,
                  padding: 10,
                  marginHorizontal: 4,
                }}>
                <Text>camera</Text>
              </View>
              <View
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: Color.yellow,
                  padding: 10,
                  marginHorizontal: 4,
                }}>
                <Text>gallery -image1 </Text>
              </View>
            </View>
            <Text>
              onClick of edit, open gallary here with camera button first
              followed by user gallary images below
            </Text>
          </ScrollView>
        )}
      </View>
    );

  };

  const fetchTabScreens = () => {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 20,
          }}>
          {tabs[tabselectedIndex].screen}
        </View>
      </View>
    );
  };
  const fetchScreens = () => {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 20,
          }}>
          {slider[selectedIndex].screen}
        </View>
      </View>
    );
  };

  return (
    <ScrollView nestedScrollEnabled={true} style={styles.parent}>
      {/* <HandleBottomSheet
        containerStyle={{ backgroundColor: Color.WHITE }}
        bottomSheetRef={refProfileImage}
        content={editProfileImage()}
        dragFromTop={true}
        draggableIcon={{ backgroundColor: Color.BLACK, width: 100 }}
      /> */}
      <Modal visible={profileImage} transparent animationType='fade' onRequestClose={() => {
        setProfileImage(false);
      }}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ ...styles.profileContainer, alignSelf: 'center' }}>

            {CurrentProfile.Profile_Picture!=null?(<Image source={{uri:CurrentProfile.Profile_Picture}} style={styles.Image200} resizeMode={'cover'} />):(<View style={{...styles.Image200,backgroundColor:"grey",justifyContent:"center",alignItems:"center"}}><Text style={{fontSize:responsiveFontSize(10)}}>M</Text></View>)}
          </View>
        </View>
      </Modal>
      <HandleBottomSheet
        containerStyle={{ backgroundColor: Color.WHITE }}
        bottomSheetRef={refTabScreens}
        content={fetchTabScreens()}
        dragFromTop={true}
        //height={300}
        draggableIcon={{ backgroundColor: 'white', width: 100 ,margin:20}}
      />
      <HandleBottomSheet
        containerStyle={{ backgroundColor: Color.WHITE }}
        bottomSheetRef={refScreens}
        content={fetchScreens()}
        dragFromTop={true}
        draggableIcon={{ backgroundColor: 'white', width: 100, margin: 20 }}

      />

      {profileDetails.slice(0, 1).map((item, index) => {
        return (
          <View key={index} style={{}}>
            <View
              style={{
                width: '100%',
                // position: 'absolute',
                paddingTop: 55,
                backgroundColor: color1,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  alignSelf: 'flex-end',
                  marginBottom: 10,
                  marginRight: 10,
                }}>
                <Pressable
                  onPress={() => {
                    navigation.navigate('PersonalPublicProfile');
                  }}
                  style={{
                    ...styles.borderButton,
                    borderColor: color3,
                  }}>
                  <Text style={{ color: color3 }}>Public Profile</Text>
                </Pressable>
              </View>
            </View>

            <View style={{ paddingVertical: 10, flexDirection: 'row' }}>
              <View
                style={{
                  position: 'absolute',
                  top: -45,
                }}>
                <Pressable
                  onPress={() => {
                    // refProfileImage.current.open();
                    setProfileImage(true);
                  }}
                  style={styles.profileContainer}>
                  {CurrentProfile.Profile_Picture!=null?(<Image
                    // source={image}
                    source={{uri:CurrentProfile.Profile_Picture}}
                    style={styles.profileImageBig}
                    resizeMode={'cover'}
                  />):(<View style={{...styles.profileImageBig,backgroundColor:'grey'}}>

                  </View>)}
                  <Image
                    source={require('../../assets/icons/verify.png')}
                 
                    style={{
                      ...styles.badgeVerify,
                      tintColor: item?.verified
                        ? Color.darkgreen
                        : Color.mildGray,
                    }}
                  />
                </Pressable>
              </View>
              <View
                style={{
                  marginTop: 25,
                  position: 'relative',
                  top: -20,
                  left: 160,
                }}>
                <Text
                  style={{
                    color: Color.mildGray,
                    fontWeight: '500',
                    textAlign: 'right',
                  }}>
                  {/* {item?.ehID} */}
                  {`EHID ${CurrentProfile?.eh_user_id}`}
                </Text>
              </View>
            </View>

            <View style={{ padding: 10 }}>
              <Text numberOfLines={1} style={styles.title22}>
                {/* {item?.name} */}
                {CurrentProfile?.user_first_name}
              </Text>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('../../assets/icons/location.png')}
                  style={{
                    width: 13,
                    height: 13,
                    marginRight: 4,
                    tintColor: Color.mediumGray,
                  }}
                />
                <Text style={styles.subtitle13}>{item?.Locations}</Text>
              </View>
              <Pressable
                onPress={() => {

                  //  dispatch(ClearAddMembeData());
                  // dispatch(set_AddMember_IsEdit(true));
                  const initState= {
                    first_name:CurrentProfile.user_first_name,
                    last_name:CurrentProfile.user_last_name,
                    date_of_birth:CurrentProfile.date_of_birth,
                    gender:CurrentProfile.gender,
                    blood_group:CurrentProfile.blood_group,
                    relation:CurrentProfile.relation,
                    profession:CurrentProfile.profession,
                    nationality:'',
                    ethnicity:'',
                    religion:'',
                    IsEdit:true,    
                  }
                  dispatch(set_AddMember_FirstName(CurrentProfile.user_first_name));
                  dispatch(set_AddMember_IsEdit(true));
                  dispatch(set_AddMember_LastName(CurrentProfile.user_last_name));
                  dispatch(set_AddMember_BloodGroup(CurrentProfile.blood_group));
                  dispatch(set_AddMember_Gender(CurrentProfile.gender));
                  dispatch(set_AddMember_DateOfBirth(parseDateString(CurrentProfile.date_of_birth)));
                  // dispatch(set_AddMember_Complete(initState));
                  console.log("EDITED=",initState);
                  navigation.navigate('PersonalAddChildMember');

                }}
                style={{ position: 'absolute', right: 17, top: 14 }}>
                <IconMaterialCommunityIcons
                  name="pencil"
                  size={19}
                  color={Color.lightGray}
                />
              </Pressable>
            </View>

            <View
              style={{
                ...styles.flexRowEvenly,
                marginTop: 10,
              }}>
              {tabs.map((tabs, index) => {
                return (
                  <Pressable
                    key={index}
                    onPress={() => {
                      setTabSelectedIndex(index);
                      // refTabScreens.current.open();
                    }}
                    style={styles.tabContainer}>

                    {/* {tabs?.title} */}

                    <Text style={styles.title17}>
                      
                      {tabs.subTitle === 'Age'
                        ? (CurrentProfile)?CurrentProfile.age==''?'--':CurrentProfile.age:'--'
                        : tabs.subTitle === 'Gender'
                          ? (CurrentProfile)?CurrentProfile.gender==''?'--':CurrentProfile.gender:'--'
                          : (CurrentProfile)?CurrentProfile.blood_group==''?'--':CurrentProfile.blood_group:'--'}
                    </Text>

                    <Text style={styles.subtitle13}>{tabs?.subTitle}</Text>
                  </Pressable>
                );
              })}
            </View>

            <ScrollView
              horizontal
              nestedScrollEnabled={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingVertical: 20,
                justifyContent: 'center',
              }}>
              {slider.map((slider, index) => {
                return (
                  <Pressable
                    key={index}
                    onPress={() => {
                      setSelectedIndex(index);
                      refScreens.current.open();
                      console.log('Ramp')

                    }}
                    style={{
                      alignItems: 'center',
                      marginHorizontal: 5,
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        marginHorizontal: 7,
                        justifyContent: 'center',
                        paddingVertical: 10,
                        borderRadius: 40,
                        width: 40,
                        height: 40,
                        backgroundColor: slider?.isVerfied
                          ? Color.midBlue
                          : Color.gray,
                      }}>
                      <Image
                        source={slider?.image}
                        style={{ width: 22, height: 22 }}
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={{ color: Color.midBlue, fontSize: 11, marginTop: 5 }}>
                      {slider?.subTitle}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default PrivateApercu;

const getArr = (refScreens) => {
  const Color = getColor(useSelector(state => state.theme.theme));
  const profileDetails = [
    {
      id: 1,
      // followers: '9000',
      // followed: true,
      blueTick: true,
      salutation: 'Dr',
      name: 'Vishnu Reddy',
      ehID: 'EHID 9354 9348 8934',
      verified: true,
      gender: 'Male',
      age: 28,
      phone: '+91 90294 78324',
      speciality: 'ENT ',
      Locations: 'Hyderabad,India',
      talks:
        '#MicroSurgery, #ENT,#MicroSurgery, #ENT,#MicroSurgery, #ENT,#MicroSurgery, #ENT, #ENT,#MicroSurgery, #ENT',
    },
    {
      id: 2,
      followers: '2000',
      followed: true,
      blueTick: true,
      salutation: 'Dr',
      name: 'Andriena Nikoshlav',
      ehID: 'EHID 9354 8745 8934',
      verified: false,
      gender: 'Male',
      age: 28,
      phone: '+91 90294 78324',
      speciality: 'ENT ',
      Locations: 'Hyderabad,India',
      talks: '#MicroSurgery,#ENT, #ENT,#MicroSurgery, #ENT',
    },
  ];

  const tabs = [
    {
      id: 1,
      title: 25,
      subTitle: 'Age',
      screen: <AgeGender selectedGender={'M'} />,
    },
    {
      id: 2,
      title: 'A+',
      subTitle: 'Blood',
      screen: <BloodGroup bloodGroup={'A +'} />,
    },
    {
      id: 3,
      title: 'Male',
      subTitle: 'Gender',
      screen: <AgeGender selectedGender={'M'} />,
    }
    // {
    //   id: 3,
    //   title: 20,
    //   subTitle: 'BMI',
    //   screen: (
    //     <View>
    //       <BMI />
    //     </View>
    //   ),
    // },
    // {
    //   id: 4,
    //   title: 16.5,
    //   subTitle: 'SES',
    //   screen: <SocioEconomicScale />,
    // },
  ];
  const slider = [
    {
      id: 10,
      icon: <IoniIcons name={"body"} size={22} color={Color.WHITE} />,
      title: '',
      subTitle: 'BMI',
      image: require('../../assets/icons/BMI1.png'),
      screen: <BMI refScreens={refScreens} />,
      isVerfied: true,
    },
    {
      id: 7,
      icon: <IconEntypo name={'mail'} size={22} color={Color.WHITE} />,
      title: '',
      subTitle: 'QR',
      image: require('../../assets/icons/scan-barcode.png'),
      screen: <QRCode />,
      isVerfied: true,
    },
    {
      id: 3,
      title: '',
      subTitle: 'Marital',
      icon: (
        <IconMaterialCommunityIcons name={'web'} size={22} color={Color.WHITE} />
      ),
      image: require('../../assets/icons/heart.png'),
      refScreens: 'maritalRef',
      screen: <MaritalStatus refScreens={refScreens}/>,
      isVerfied: true,
    },

    {
      id: 4,
      title: '',
      subTitle: 'Phone',
      icon: (
        <IconMaterialCommunityIcons name={'web'} size={22} color={Color.WHITE} />
      ),
      image: require('../../assets/icons/call.png'),
      refScreens: 'phoneRef',
      screen: <PhoneNumber />,
      isVerfied: true,
    },
    {
      id: 5,
      icon: <IconEntypo name={'home'} size={22} color={Color.WHITE} />,
      title: '',
      subTitle: 'Mail',
      image: require('../../assets/icons/sms.png'),
      screen: <Email />,
      isVerfied: true,
    },
    {
      id: 6,
      icon: (
        <IconEntypo name={'dribbble-with-circle'} size={22} color={Color.WHITE} />
      ),
      title: '',
      subTitle: 'Address',
      image: require('../../assets/icons/locationBold.png'),

      screen: <Address />,
      isVerfied: true,
    },

    // {
    //   id: 8,
    //   icon: <IconEntypo name={'mail'} size={22} color={Color.WHITE} />,
    //   title: '',
    //   subTitle: 'Location',
    //   image: require('../../assets/icons/signpost.png'),
    //   screen: (
    //     <View>
    //       <Text>Locn screen</Text>
    //     </View>
    //   ),
    //   isVerfied: true,
    // },
    {
      id: 9,
      icon: <IconEntypo name={'mail'} size={22} color={Color.WHITE} />,
      title: '',
      subTitle: 'ID',
      image: require('../../assets/icons/personalcard.png'),
      screen: <UserVerification refScreens={refScreens}/>,
      isVerfied: true,
    },

  ];
  return { profileDetails, tabs, slider };
}