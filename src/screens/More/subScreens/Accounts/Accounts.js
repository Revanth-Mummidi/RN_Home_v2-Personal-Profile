import { Dimensions, StyleSheet, Animated, Text, View, Pressable, ScrollView, Image, Appearance,TouchableOpacity} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import SwipeableBar from '../../../_components/userInteractions/SwipeableBar';
import {State, Swipeable} from 'react-native-gesture-handler';
import {Colors} from '../../../../themes';
import {useNavigation} from '@react-navigation/native';
import {useSelector,useDispatch} from 'react-redux';
import {color} from 'react-native-reanimated';
import Modal from 'react-native-modal';
import { ButtonHeader, ProfileSliderList, ScreenHeader, TextInputFields,} from '../../../_components';
import {logout} from '../../../../utils/LocalStorage';
import getStyles from '../../utils/MoreStyles';
import ThemePreferences from './ThemePreferences';
import Languages from './Languages.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {t} from '../../../../services/language/Translate.js'
import axios from 'axios';
import CustomTextInput from '../../../_components/userInteractions/CustomTextInput.js';
import { responsiveHeight,responsiveWidth,responsiveFontSize } from '../../../../themes/ResponsiveDimensions';
import LinearGradient from 'react-native-linear-gradient';
import Creatempin from '../../../_components/security/Creatempin.js';
import { CreateMpin } from '../../../../apis/ApiRequests.js';
import ResetMpin from '../../../_components/security/ResetMpin.js';
const WIDTH = Dimensions.get('window').width;

const Accounts = () => {
  const [mpin,setMpin] = useState('');
  const [mod,setMod] = useState(false);
  const [cpin,setCpin]=useState('');
  const themeObj= useSelector(state => state.theme);
  const Color = themeObj.Colors;
  const styles = getStyles(Color);
  const navigation = useNavigation();
  const [darkTheme, setDarkTheme] = useState(false);
  const [security, setSecurity] = useState('');
  const [showmodal, setShowModal] = useState(false);
  const [relation, setRelation] = useState('');
  const [showInSlider, setShowInSlider] = useState(true);
  const [rpinm,setRpinm] = useState(false);
  var activeColor = Color.more_button;
  var inactiveColor = Color.more_buttonActive;
  const [showSecurityPref, setShowSecurityPref] = useState(false);
  const logouticon = {
    image: require('../../assets/icons/lock-circle.png'),
    text: 'Swipe to Logout',
    offText: 'Log Out',
  };

  const handleMpin =(txt)=> { if(txt.length<=4) setMpin(txt)}
  const handlecpin = (txt)=>{if(txt.length<=4)setCpin(txt)}

  async function test() {
    console.log('HI')
    const token = await AsyncStorage.getItem('userToken');

    try {
     const response = await axios.post('https://app.evaluate-health.com/login/createPin/', '1234', {
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
       },
     });
     console.log(response.status,"FRom the function")
     console.log("succes")
     return response;
   } catch (error) {
     console.log(error,"kkkkkkk")
     return error.response;
   }
  }
  

 async function mpinflow(){
           //  await AsyncStorage.setItem('Mpin',true);
                    let res = await CreateMpin();
                    console.log(res,"FOROKOKROKROKROK");
                    if(res != "mpin already created to this user"){
                      setMod(true)
                   
                    }else {
                      console.log("FAALSLSSL")
                      setRpinm(true);
                    }
 }

  const initiateLogout = async () => {
    await logout();
    navigation.replace('AuthStack', {screen: 'UserVerification'});
  };
  const onComplete = (src) =>{ setMod(false),setRpinm(false)}

  return (
    <>
      <ButtonHeader title={'preferences'} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.parent}>
        <Pressable
          style={styles.card}
          onPress={() => {
            setShowSecurityPref(!showSecurityPref);
          }}>
          <Text style={{...styles.titleText,color:Color.account_heading}}>{t("Accounts.Security Preferences")}</Text>
          <ProfileSliderList />
          {showSecurityPref && (
            <View style={styles.card}>
              <Text style={{...styles.titleText,color:Color.account_heading}}>Lock Preferences </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <Pressable
                  onPress={() => {
                    setSecurity('faceID');
                  }}
                  style={[
                    styles.button,
                    {
                      backgroundColor:
                        security === 'faceID' ? activeColor : inactiveColor,
                    },
                  ]}>
                  <Image
                    source={require('../../assets/icons/Lock.png')}
                    style={{
                      ...styles.icon30,
                      tintColor:
                        security === 'faceID' ? inactiveColor : activeColor,
                    }}
                  />
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        color:
                          security === 'faceID' ? inactiveColor : activeColor,
                      },
                    ]}>
                    faceID
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setSecurity('fingerprint');
                  }}
                  style={[
                    styles.button,
                    {
                      backgroundColor:
                        security === 'fingerprint'
                          ? activeColor
                          : inactiveColor,
                    },
                  ]}>
                  <Image
                    source={require('../../assets/icons/Lock.png')}
                    style={{
                      ...styles.icon30,
                      tintColor:
                        security === 'fingerprint'
                          ? inactiveColor
                          : activeColor,
                    }}
                  />
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        color:
                          security === 'fingerprint'
                            ? inactiveColor
                            : activeColor,
                      },
                    ]}>
                    Fingerprint
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setSecurity('mPIN');
                    mpinflow();
                    // let res = Creatempin()
                    // if(res != "mpin already created to this user"){
                    // setMod(true)
                    // }else {
                    //   console.log("FAALSLSSL")
                    // }
                    
                  }}
                  style={[
                    styles.button,
                    {
                      backgroundColor:
                        security === 'mPIN' ? activeColor : inactiveColor,
                    },
                  ]}>
                  <Image
                    source={require('../../assets/icons/Lock.png')}
                    style={{
                      ...styles.icon30,
                      tintColor:
                        security === 'mPIN' ? inactiveColor : activeColor,
                    }}
                  />
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        color:
                          security === 'mPIN' ? inactiveColor : activeColor,
                      },
                    ]}>
                    mPIN
                  </Text>
                </Pressable>
              </View>
              <Text style={{color: Color.more_subtitle, marginTop: 10}}>
                Apply locks on
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginVertical: 10,
                }}>
                {locks.map((lock, index) => {
                  return (
                    <Pressable
                      key={index}
                      onPress={() => {}}
                      style={[
                        styles.chipButton,
                        {
                          backgroundColor: lock?.locked
                            ? activeColor
                            : inactiveColor,
                        },
                      ]}>
                      <Text
                        style={[
                          styles.buttonText,
                          {
                            color: lock?.locked ? inactiveColor : activeColor,
                          },
                        ]}>
                        {lock?.title}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
              <Text style={{...styles.titleText,color:Color.account_heading,marginTop: 10}}>
                Profile Preferences
              </Text>

              <View style={{width: '100%', marginTop: 10}}>
                <TextInputFields
                  label={'Relation'}
                  value={relation}
                  onChange={text => {
                    setRelation(text);
                  }}
                  tintColor={Color.red}
                  containerStyle={{backgroundColor: inactiveColor}}
                  inputContainerStyle={{backgroundColor: inactiveColor}}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Pressable
                  onPress={() => {
                    setShowInSlider(!showInSlider);
                  }}
                  style={[
                    {
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 8,
                      // borderTopRightRadius: 5,
                      // borderBottomRightRadius: 5,
                      marginRight: 10,
                      marginTop: 10,
                      backgroundColor: showInSlider
                        ? inactiveColor
                        : activeColor,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        color: showInSlider ? activeColor : inactiveColor,
                      },
                    ]}>
                    {showInSlider ? 'Show' : 'Dont show'}
                  </Text>
                </Pressable>
                <Text style={{color: Color.more_subtitle, marginTop: 10}}>
                  In Profile Slider
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: 14,
                  marginBottom: 10,
                }}>
                <Pressable
                  style={{
                    ...styles.submitButton,
                    backgroundColor: Color.more_cancel,
                  }}>
                  <Text
                    style={{
                      color: Color.more_buttonActive,
                      fontWeight: '500',
                    }}>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
               
                  style={{
                    ...styles.submitButton,
                    backgroundColor: Color.more_save,
                  }}>
                  <Text
                    style={{
                      color: Color.more_buttonActive,
                      fontWeight: '500',
                    }}>
                    Save
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </Pressable>

         <Modal visible={mod} onBackButtonPress={()=>setMod(false)} style={{height:responsiveHeight(100),width:responsiveWidth(100)}}>          
                        <Creatempin mode = {"create"} complete={onComplete}/>
         </Modal>

         <Modal visible={rpinm} onBackButtonPress={()=>setRpinm(false)} style={{height:responsiveHeight(100),width:responsiveWidth(100)}}>          
                      
                       <Creatempin mode = {"reset"} complete={onComplete}/>
         </Modal>

        <ThemePreferences/>
        <Languages/>
        <View style={styles.card}>
          <Text style={{...styles.titleText,color:Color.account_heading}} >{t("Accounts.Logout")}</Text>
          <SwipeableBar
            image={logouticon.image}
            text={logouticon.text}
            execute={initiateLogout}
            addShimmer={true}
            offText={logouticon.offText}
            customStyle = {{bgOutColor:Color.inactiveColor}}
          />
        </View>
        <View style={{padding: 50}} />
      </ScrollView>
    </>
  );
};

export default Accounts;

// const styles = StyleSheet.create({
//   leftactionText: {
//     color: Color.WHITE,
//     paddingHorizontal: 20,
//     fontWeight: '600',
//     fontSize: 15,
//   },
//   card: {
//     marginTop: 20,
//     borderRadius: 10,
//     padding: 10,
//     backgroundColor: Color.WHITE,
//   },
//   titleText: {fontSize: 15, fontWeight: '600', color: Color.blue},
//   button: {
//     marginHorizontal: 20,
//     marginVertical: 10,
//     padding: 10,
//     backgroundColor: Color.aquaBlue,
//     borderRadius: 28,
//   },
//   buttonText: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: Color.blue,
//     paddingHorizontal: 10,
//   },
//   chipButton: {
//     padding: 10,
//     backgroundColor: Color.aquaBlue,
//     borderRadius: 28,
//     marginRight: 10,
//     marginTop: 10,
//   },
// });

const users = [
  {
    id: 1,
    userphoto:
      'https://i.pinimg.com/originals/c6/ed/d0/c6edd00118ab487379b8137ed7b2e461.jpg',
    userName: 'Rajesh',
    relationWithMain: 'Father',
    profileInSlider: true,
    deleteProfile: false,
  },
  {
    id: 2,
    userphoto:
      'https://i.pinimg.com/originals/c6/ed/d0/c6edd00118ab487379b8137ed7b2e461.jpg',
    userName: 'Naresh',
    relationWithMain: 'Mother',
    profileInSlider: true,
    deleteProfile: true,
  },
];

const locks = [
  {
    id: 1,
    title: 'Home',
    locked: true,
  },
  {
    id: 2,
    title: 'Tracker',
    locked: false,
  },

  {
    id: 4,
    title: 'Calendar',
    locked: false,
  },
  {
    id: 5,
    title: 'Explore',
    locked: false,
  },
  {
    id: 3,
    title: 'Global Documents',
    locked: true,
  },
];