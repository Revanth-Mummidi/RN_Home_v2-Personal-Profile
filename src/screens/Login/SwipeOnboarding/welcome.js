// import {  View,  Text,  StyleSheet,  StatusBar,  TouchableOpacity,  Dimensions,  useWindowDimensions,  Image,  KeyboardAvoidingView,  Keyboard,  PermissionsAndroid,  useColorScheme,} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import Animated, { runOnJS, runOnUI, useAnimatedRef, useAnimatedScrollHandler, useSharedValue,} from 'react-native-reanimated';
// import OnboardingItem from './components/OnboardingItem';
// import {darkThemeColors} from '../../utils/Colors';
// import Geolocation from '@react-native-community/geolocation';
// import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
// import {responsiveHeight,responsiveWidth,} from '../../utils/ResponsiveDimensions';
// import {useDispatch, useSelector} from 'react-redux';
// import CustomToast from '../../components/CustomToast';
// import {useIsFocused, useNavigation} from '@react-navigation/native';
// import {GetOccupation, SaveWelcomeData} from '../../apis/ApiRequests';
// import {setTheme} from '../../redux/slices/ThemeSlice';
// import {getColor} from '../../utils/GetColor';
// import {setDataSubmitted} from '../../redux/slices/UserOnboardingSlice';
// import Loader from '../../components/Loader';
// import BottomTab from '../../navigations/bottomTab/BottomTab';
// import { requestDocumentPermission, requestLocationPermission, requestMediaPermission, requestMicrophonePermission } from '../Home/utils/Permissions';
// const Welcome = () => {
//   const {width: WIDTH} = useWindowDimensions();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const navigation = useNavigation();
//   const [firstName, setFirstName] = useState('');
//   const [laoderVisible, setLoaderVisible] = useState(false);
//   const [lastName, setLastName] = useState('');
//   const [msg, setMsg] = useState('');
//   const dispatch = useDispatch();
//   const appTheme = useColorScheme();
//   const [currentLongitude, setCurrentLongitude] = useState(0.0);
//   const [currentLatitude, setCurrentLatitude] = useState(0.0);
//   const [visibleToast, setVisibleToast] = useState(false);
//   const isFocused = useIsFocused();
//   const theme = useSelector(state => state.theme);
//   const Color = getColor(theme.theme);
//   const userData = useSelector(state => state.userOnboarding);
//   const [data, setData] = useState([
//     {
//       json: require('./json/lottie.json'),
//       title: 'page 1',
//       id: 1,
//       bg: darkThemeColors.azure,
//     },
//     {
//       json: require('./json/lottie.json'),
//       title: 'page 2',
//       id: 2,
//       bg: darkThemeColors.color1,
//     },
//     {
//       json: require('./json/lottie.json'),
//       title: 'page 3',
//       id: 3,
//       bg: darkThemeColors.color2,
//     },
//     {
//       json: require('./json/lottie.json'),
//       title: 'page 4',
//       id: 4,
//       bg: darkThemeColors.color3,
//     },
//   ]);
//   var keyid = 0;

//   const flatlistRef = useAnimatedRef();
//   const x = useSharedValue(0);
//   const toggleIndex = index => {
//     setCurrentIndex(index);
//     if (index == 4) {
//       requestLocationPermission();
//     }
//     if (index != 1) {
//       Keyboard.dismiss();
//     }
//   };

//   useEffect(() => {
//     if (theme.theme == '') {
//       dispatch(setTheme(appTheme));
//     }
//     if (currentIndex == 4) {
//       requestLocationPermission();
//     }
//   }, [isFocused]);

//   const onScroll = useAnimatedScrollHandler({
//     onScroll: event => {
//       x.value = event.contentOffset.x;
//       runOnJS(toggleIndex)((event.contentOffset.x / WIDTH).toFixed(0));
//     },
//   });
//   const getOneTimeLocation = () => {
//     Geolocation.getCurrentPosition(
//       //Will give you the current location
//       position => {
//         const mCurrentLongitude = JSON.stringify(position.coords.longitude);
//         const mCurrentLatitude = JSON.stringify(position.coords.latitude);
//         setCurrentLongitude(mCurrentLongitude);
//         setCurrentLatitude(mCurrentLatitude);
//       },
//       error => {
//         setLocationStatus(error.message);
//       },
//       {
//         enableHighAccuracy: false,
//         timeout: 30000,
//         maximumAge: 1000,
//       },
//     );
//   };
//   const submitData = async () => {
//     setLoaderVisible(true);
//     const bodyData = {
//       user_first_name: userData.firstName,
//       user_last_name: userData.lastName,
//       gender: userData.gender,
//       date_of_birth: userData.dobDate,
//       age: userData.dob,
//       // role: userData.profession,
//       // longitude: currentLatitude + '',
//       // latitude: currentLongitude + '',
//       // city: '',
//     };
//     const res = await SaveWelcomeData(bodyData);
//     setLoaderVisible(false);
//     if (res == 200) {
//       setDataSubmitted(true);
//       navigation.navigate('BottomTab');
//     } else {
//       setMsg('Something went wrong');
//       setVisibleToast(true);
//     }
//   };
//   return (
//     <KeyboardAvoidingView
//       style={[styles.container, {backgroundColor: Color.welcome_bg}]}>
//       <StatusBar backgroundColor={Color.welcome_bg} />
//       <View>
//         <Animated.FlatList
//           ref={flatlistRef}
//           onScroll={onScroll}
//           scrollEnabled={true}
//           data={data}
//           renderItem={({item, index}) => {
//             return (
//               <OnboardingItem
//                 x={x}
//                 item={item}
//                 index={index}
//                 key={index}
//                 lat={currentLatitude}
//                 lang={currentLongitude}
//               />
//             );
//           }}
//           keyExtractor={(item,index) => { return index}}
//           scrollEventThrottle={16}
//           horizontal
//           bounces={false}
//           pagingEnabled={true}
//           showsHorizontalScrollIndicator={false}
//         />
//       </View>
//       <View
//         style={{
//           width: '100%',
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//         }}>
//         <View
//           style={{
//             flexDirection: 'row',
//             marginLeft: responsiveWidth(4),
//             alignItems: 'center',
//           }}>
//           {data.map((item, index) => {
//             return (
//               <View
//                 style={{
//                   width:
//                     currentIndex == index
//                       ? responsiveWidth(6)
//                       : responsiveWidth(2),
//                   height: responsiveWidth(2),
//                   backgroundColor: 'white',
//                   marginLeft: responsiveWidth(2),
//                   borderRadius: responsiveWidth(1),
//                 }}></View>
//             );
//           })}
//         </View>
//         {currentIndex == 3 ? (
//           <TouchableOpacity
//             style={{ width: responsiveWidth(30), height: responsiveWidth(12), borderRadius: responsiveWidth(20), backgroundColor: 'white', marginRight: responsiveWidth(3), justifyContent: 'center',  alignItems: 'center',  }}
//             onPress={() => {  submitData()}}>
//             <Text style={{color: 'black', fontWeight: '500'}}>Submit</Text>
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity
//             style={{  width: responsiveWidth(14),  height: responsiveWidth(14),  borderRadius: responsiveWidth(7),  backgroundColor: Color.li_bottomsheet_bg,  marginRight: responsiveWidth(3),justifyContent: 'center',  alignItems: 'center', }}
//             onPress={() => {
//               if (currentIndex == 0) {
//                 if (userData.firstName != '' && userData.lastName != '') {
//                   if (data.length - 1 > currentIndex) {
//                     flatlistRef.current.scrollToIndex({
//                       animation: true,
//                       index: 1,
//                     });
//                   }
//                 } else {
//                   setMsg('Please Enter First and Last Name');
//                   setVisibleToast(true);
//                 }
//               } else if (currentIndex == 1) {
//                 if (userData.gender != '') {
//                   if (data.length - 1 > currentIndex) {
//                     flatlistRef.current.scrollToIndex({
//                       animation: true,
//                       index: 2,
//                     });
//                   }
//                 } else {
//                   setMsg('Please Select Gender');
//                   setVisibleToast(true);
//                 }
//               } else if (currentIndex == 2) {
//                 if (userData.dob != '') {
//                   if (data.length - 1 > currentIndex) {
//                     flatlistRef.current.scrollToIndex({
//                       animation: true,
//                       index: 3,
//                     });
//                   }
//                 } else {
//                   setMsg('Please Select Date Of Birth');
//                   setVisibleToast(true);
//                 }
//               }
//             }}>
//             <Image
//               source={require('../login/icons/right-arrows.png')}
//               style={{
//                 width: responsiveWidth(6),
//                 height: responsiveWidth(6),
//                 tintColor: 'white',
//               }}
//             />
//           </TouchableOpacity>
//         )}
//       </View>
//       {visibleToast && (
//         <CustomToast
//           visible={visibleToast}
//           onClose={() => {
//             setVisibleToast(false);
//           }}
//           title={msg}
//           bg={'red'}
//           icon={'globe'}
//           iconColor={'white'}
//           msgColor={'white'}
//         />
//       )}
//       <Loader visible={laoderVisible}/>
//     </KeyboardAvoidingView>
//   );
// };

// export default Welcome;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
