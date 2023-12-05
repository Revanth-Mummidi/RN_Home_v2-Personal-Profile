// import { View, Text, useWindowDimensions, StyleSheet, ScrollView, TouchableOpacity, Image,Button, FlatList, TextInput, Keyboard, Modal, Pressable,} from 'react-native';
// import React, {useEffect, useRef, useState} from 'react';
// import LottieView from 'lottie-react-native';
// import {launchCamera,launchImageLibrary,ImagePicker} from 'react-native-image-picker'
// import {responsiveFontSize,responsiveHeight,responsiveWidth,} from '../../../utils/ResponsiveDimensions';
// import Animated, { Extrapolate, Layout, interpolate, useAnimatedStyle,} from 'react-native-reanimated';
// import CustomTextInput from '../../../components/CustomTextInput';
// import Geolocation from '@react-native-community/geolocation';
// import {commonColors, darkThemeColors} from '../../../utils/Colors';
// import DatePicker from 'react-native-date-picker';
// import LinearGradient from 'react-native-linear-gradient';
// import {useDispatch, useSelector} from 'react-redux';
// import {setDobDate,setKeyboardVisible,setUserDob,setUserFirstName,setUserGender,setUserLastName,setUserProfession,} from '../../../redux/slices/UserOnboardingSlice';
// import ScrollPicker from './ScrollPicker';
// import {GetOccupation, SaveWelcomeData} from '../../../apis/ApiRequests';
// import {useIsFocused} from '@react-navigation/native';
// import {getColor} from '../../../utils/GetColor';
// import { getLocation, requestLocationPermission, selectFile} from '../../Home/utils/Permissions';
// import Icon from 'react-native-vector-icons/MaterialIcons'
// import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
// import { useNavigation } from '@react-navigation/native';
// import ProfilePicSlice, { clearImageURI, setImageURI } from '../../../redux/slices/ProfilePicSlice';
// // import {TextInput} from 'react-native-paper';
// let fName = '';
// let lName = '';
// const OnboardingItem = ({item, index, x, lat, lang}) => {
//   const navigation = useNavigation();
//   const imageURI = useSelector(state => state.image.uri);

//   const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = useWindowDimensions();
//   const [selectedGender, setSelectedGender] = useState(-1);
//   const [date, setDate] = useState(new Date());
//   const [firstName, setFirstName] = useState('');
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [lastName, setLastName] = useState('');
//   const dispatch = useDispatch();
//   const [professions, setProfessions] = useState([]);
//   const userData = useSelector(state => state.userOnboarding);
//   const [counting, setCounting] = useState(0);
//   const theme = useSelector(state => state.theme);
//   const Color = getColor(theme.theme);
//   const isFocused = useIsFocused();
//   const ref1 = useRef();
//   const ref2 = useRef();
//   const [imageSource, setImageSource] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(null);
  
//   const circleAnimation = useAnimatedStyle(() => {
//     const scale = interpolate(
//       x.value,
//       [
//         (index - 1) * SCREEN_WIDTH,
//         index * SCREEN_WIDTH,
//         (index + 1) * SCREEN_WIDTH,
//       ],
//       [1, 4, 4],
//       Extrapolate.CLAMP,
//     );
//     return {
//       transform: [{scale: scale}],
//     };
//   });
//   const lottieAnimationStyle = useAnimatedStyle(() => {
//     const traslateYAnimation = interpolate(
//       x.value,
//       [
//         (index - 1) * SCREEN_WIDTH,
//         index * SCREEN_WIDTH,
//         (index + 1) * SCREEN_WIDTH,
//       ],
//       [200, 0, -200],
//       Extrapolate.CLAMP,
//     );
//     return {
//       transform: [{translateY: traslateYAnimation}],
//     };
//   });

//   const FirstFormRender = ({index,src}) => {
//     return (
//       <View style={{flexDirection:"column",alignItems:'center',justifyContent:'space-around'}}>
//       <SubmitFormRender src={src}/>
//       <View style={{width: '100%', height: responsiveHeight(20)}} key={index}>
//         {/* <Text
//           style={{
//             alignSelf: 'flex-end',
//             textAlign: 'right',
//             marginRight: 20,
//             fontSize: responsiveFontSize(3.2),
//             fontWeight: '800',
//             color: Color.welcome_label,
//            marginTop:20
//           }}>
//           {'My\nName'}
//         </Text> */}
//         <View
//           style={{
//             width: '90%',
//             alignSelf: 'center',
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             marginTop: responsiveHeight(5),
//             marginLeft:20
//           }}>
//           <CustomTextInput
//             w={'45%'}
//             onChangeText={txt => {
//               fName = txt;
//               //  setFirstName(txt);
//             }}
//             h={responsiveHeight(7)}
//             onSubmitEditing={() => {
//               setFirstName(fName);
//               dispatch(setUserFirstName(fName));
//               dispatch(setKeyboardVisible(false))
//             }}
//             onBlur={() => {
//               setFirstName(fName);
//               dispatch(setUserFirstName(fName));
//               dispatch(setKeyboardVisible(false))
//             }}
//             title={'First Name'}
//             value={firstName}
//             color={Color.welcome_textfield_inactive}
//           />
//           <CustomTextInput
//             w={'45%'}
//             value={lastName}
//             onChangeText={txt => {
//               lName = txt;
//             }}
//             // onFocusCall={()=>{
//             //   dispatch(setKeyboardVisible(true))
//             // }}
//             onSubmitEditing={() => {
//               setLastName(lName);
//               dispatch(setUserLastName(lName));
//               dispatch(setKeyboardVisible(false))
//             }}
//             onBlur={() => {
//               setLastName(lName);
//               dispatch(setUserLastName(lName));
//               dispatch(setKeyboardVisible(false))
//             }}
//             h={responsiveHeight(7)}
//             title={'Last Name'}
//             color={Color.welcome_textfield_inactive}
//           />
//         </View>
//       </View>
//       </View>
//     );
//   };
//   const GenderFormRender = () => {
//     return (
//       <View style={{width: '100%'}}>
//         <Text
//           style={{  textAlign:'center',marginBottom:responsiveHeight(3), fontSize: responsiveFontSize(3.2), fontWeight: '800', color: Color.welcome_label, }}>
//           {'I am'}
//         </Text>
//         <View style={{ flexDirection:'column',  alignItems: 'center',justifyContent:'space-between' }}>

//                 <View style={{flexDirection:'row',justifyContent:'space-around',margin:15,width:'90%'}}>
//               <TouchableOpacity
//                 activeOpacity={1}
//                 style={{
//                   width: '36%',  backgroundColor: selectedGender == 0 ? commonColors.common_white : 'transparent',
//                   borderRadius: responsiveWidth(2),  
//                 }}
//                 onPress={() => {
//                   setSelectedGender(0);
//                   dispatch(setUserGender('Trans Male'));
//                 }}>
//                 <Image
//                   source={require('../../login/icons/trans_male.jpg')}
//                   style={{
//                     width: '100%',
//                     height: responsiveHeight(16),
//                     borderRadius: responsiveWidth(2),
//                   }}
//                 />
//                 <Text
//                   style={{
//                     color:
//                       selectedGender == 0
//                         ? Color.welcome_textSubtitle
//                         : 'white',
//                     fontWeight: '500',
//                     marginBottom: responsiveHeight(1),
//                     alignSelf: 'center',
//                     marginTop: responsiveHeight(1),
//                     fontSize: responsiveFontSize(1.5),
//                   }}>
//                   Trans Male
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 activeOpacity={1}
//                 style={{
//                   width: '36%',
//                   backgroundColor: selectedGender == 1 ? commonColors.common_white : 'transparent',
//                   borderRadius: responsiveWidth(2),
//                   overflow: 'hidden',
//                 }}
//                 onPress={() => {
//                   setSelectedGender(1);
//                   dispatch(setUserGender('Trans Female'));
//                 }}>
//                 <Image
//                   source={require('../../login/icons/trans_female.jpg')}
//                   style={{
//                     width: '100%',
//                     height: responsiveHeight(16),
//                     borderRadius: responsiveWidth(2),
//                   }}
//                 />
//                 <Text
//                   style={{
//                     color:
//                       selectedGender == 1
//                         ? Color.welcome_textSubtitle
//                         : 'white',
//                     fontWeight: '500',
//                     marginBottom: responsiveHeight(1),
//                     alignSelf: 'center',
//                     marginTop: responsiveHeight(1),
//                     fontSize: responsiveFontSize(1.5),
//                   }}>
//                   Trans Female
//                 </Text>
//               </TouchableOpacity>
//                 </View>


//                 <View style={{flexDirection:'row',justifyContent:'space-around',margin:15,width:'90%'}}>
//                 <TouchableOpacity
//                   activeOpacity={1}
//                   style={{
//                     width: '36%',
//                     backgroundColor: selectedGender == 2 ? commonColors.common_white : 'transparent',
//                     borderRadius: responsiveWidth(2),
//                     overflow: 'hidden',
//                   }}
//                   onPress={() => {
//                     setSelectedGender(2);
//                     dispatch(setUserGender('Male'));
//                   }}>
//                   <Image
//                     source={require('../../login/icons/man.jpg')}
//                     style={{
//                       width: '100%',
//                       height: responsiveHeight(16),
//                       borderRadius: responsiveWidth(2),
//                     }}
//                   />
//                   <Text
//                     style={{
//                       color:
//                         selectedGender == 2
//                           ? Color.welcome_textSubtitle
//                           : 'white',
//                       fontWeight: '500',
//                       marginBottom: responsiveHeight(1),
//                       alignSelf: 'center',
//                       marginTop: responsiveHeight(1),
//                       fontSize: responsiveFontSize(1.5),
//                     }}>
//                     Male
//                   </Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   activeOpacity={1}
//                   style={{
//                     width: '36%',
//                     backgroundColor: selectedGender == 3 ? commonColors.common_white : 'transparent',
//                     borderRadius: responsiveWidth(2),
//                     overflow: 'hidden',
//                   }}
//                   onPress={() => {
//                     setSelectedGender(3);
//                     dispatch(setUserGender('Female'));
//                   }}>
//                   <Image
//                     source={require('../../login/icons/woman.jpg')}
//                     style={{
//                       width: '100%',
//                       height: responsiveHeight(16),
//                       borderRadius: responsiveWidth(2),
//                     }}
//                   />
//                   <Text
//                     style={{
//                       color:
//                         selectedGender == 3
//                           ? Color.welcome_textSubtitle
//                           : 'white',
//                       fontWeight: '500',
//                       marginBottom: responsiveHeight(1),
//                       alignSelf: 'center',
//                       marginTop: responsiveHeight(1),
//                       fontSize: responsiveFontSize(1.5),
//                     }}>
//                     Female
//                   </Text>
//                 </TouchableOpacity>
//                 </View>

//         </View>
//       </View>
//     );
//   };

//   const DatePickerRender = () => {
//     return (
//       <View style={{width: '100%'}}>
//         <Text
//           style={{
//             alignSelf: 'flex-end',
//             textAlign: 'right',
//             marginRight: responsiveHeight(2),
//             fontSize: responsiveFontSize(3.2),
//             fontWeight: '800',
//             color: Color.welcome_label,
//           }}>
//           {'My\nBirth date'}
//         </Text>
//         <View
//           style={{
//             backgroundColor: Color.welcome_bg,
//             borderRadius: responsiveWidth(2),
//             width: '90%',
//             alignSelf: 'center',
//             height: responsiveHeight(23),
//             marginTop: responsiveHeight(2),
//           }}>
//           <DatePicker
//             date={date}
//             androidVariant ={'iosClone'}
//             dividerHeight = {90}
//             onDateChange={x => {
//               let time = x.toISOString();
//               const year = time.split('T')[0].split('-')[0];
//               let currentYear = new Date().getFullYear();
//               let age = parseInt(currentYear) - parseInt(year);
//               dispatch(setUserDob(age.toString()));
//               dispatch(setDobDate(time.split('T')[0]));
//               setDate(x);
//             }}
//             mode="date"
//             theme="dark"
//             textColor={commonColors.common_white}
//             androidVariant="nativeAndroid"
//           />
//         </View>
//       </View>
//     );
//   };
//   useEffect(() => {
//     console.log(counting);
//     if (counting == 0) {
//       getProfessionList();
//       setCounting(counting + 1);
//     }
//   }, [counting]);
//   const getProfessionList = async () => {
//     const response = await GetOccupation();
//     let listt = [];
//     if (response) {
//       let list = [];
//       list = response.map(item => item.profession_name);
//       console.log(list);
//       // select profession at first
//       let list2 = ['', 'Select Profession', ...list];
//       list2.map(item => {
//         listt.push(item);
//       });
//     }

//     setProfessions(listt);
//   };
  

//   const ProfessionRender = () => {
//     return (
//       <View style={{width: '100%'}}>
//         <View style={{flexDirection:'row'}}>
//         <Text
//          style={{ textAlign: 'center',marginLeft:10, marginRight:10, fontSize: responsiveFontSize(3.2), fontWeight: '800', color: Color.welcome_label,}}>
//           {'Tap on Icon to Get Location'}
//         </Text>
//           <Pressable onPress={()=>{location()}}>
//               <View style={{justifyContent:'center',width:'100%'}}>

//                      <Icons name='map-marker' size={35} color={Color.color2}/>

//               </View>
//         </Pressable>
//               </View>
//       </View>
//     );
//   };
// function location(){
// getLocation().then(({ latitude, longitude }) => {
//     const baseUrl = 'https://nominatim.openstreetmap.org/reverse?format=json'; 
//     console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
//     const apiUrl = `${baseUrl}&lat=${latitude}&lon=${longitude}`;
//     fetch(apiUrl)
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.display_name) {
//         const address = data.display_name;
//         console.log('Address:', address);
//         dispatch(setUserProfession(address))
//       } else {
//         console.log('Location not found');
//       }
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
//   })
//   .catch(error => {
//     console.log('Location error:', error);
//   });
// }
//   async function selectImageFromCamera()  {
//     const options = {
//       title: 'Select Image',
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };

//    await launchCamera(options, (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled camera picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//       } else {
//         setImageSource(response.assets)
       
//       }
//     });
//   };

//   const handleit = async () => {
//    let data =  await selectFile()
//    if(data.length!=0){
//     setImageSource(data);
//    }
//     setModalVisible(false);
//     console.log(imageSource)
//   }
//   const handle = async () =>{
//    await selectImageFromCamera();
//     setModalVisible(false);
//   }
//   const SubmitFormRender = ({src}) => {
//     return (
//       <View >
//          <TouchableOpacity onPress={()=>{
//           console.log("IIIIIIIIIIIIIIIIIIIIIIIIII",imageURI);
//            navigation.navigate('Recording',{isProfile:true})
//           }}>
//             <View style={{   flexDirection: 'row', height:150,width:150,borderRadius:100,backgroundColor:Color.color1,justifyContent:"center",alignItems:"center"}}>
//                 {imageURI!= null ?(
//                   <Image source={{uri:imageURI}} style={{height:"100%",width:'100%',resizeMode:'cover',borderRadius:100}}/>
//                 ):(
//                   <View style={{overflow:'hidden'}}>
//                <LottieView
//               autoPlay
//               source={require('../../../assets/json/camera.json')}
//               loop
//               style={{   height:200, width:200   }}
//             />
//                 </View>
//                 )}          
//             </View>
//         </TouchableOpacity>

//       </View>
//     );
//   };
//   return (

//       <View
//         style={[
//           styles.itemContainer,
//           {
//             width: SCREEN_WIDTH,
//             height: SCREEN_HEIGHT - 80,
//           },
//         ]} key={10}>
//           <View style={styles.circleContainer}>
//            <Animated.View
//           style={[
//             {
//               width: SCREEN_WIDTH,
//               height: SCREEN_WIDTH,
//               borderRadius: SCREEN_WIDTH / 2,
//               backgroundColor: item.bg,
//             },
//             circleAnimation,
//           ]}
//         />
//         </View>
//         <View style={{height: '25%', marginTop: 50}} key={12}>
//           {index != 0?(
//           <Text style={{color: 'white', fontSize: 25}}>
//             {'Hi,' + userData.firstName + ' ' + userData.lastName}
//           </Text>):
//             (
//               <>
//               <View style={{alignItems:'center'}}>
//                 <Text style={{color: 'white', fontSize: 30,marginBottom:10}} >
//                      Profile Info
//                 </Text> 
//                 </View>
//                 <Text style={{color: 'white', fontSize: 15}}>
//                     Please Provide your Name and photo  
//                 </Text> 
//               </>
//             )
// }
//           <View
//             style={{
//               flexDirection: 'row',
//               alignSelf: 'center',
//               marginTop: responsiveHeight(1),
//             }}>
//             {userData.gender != '' && (
//               <Text
//                 style={{
//                   color: darkThemeColors.welcome_textSubtitle,
//                   fontSize: 20,

//                 }}>
//                 {userData.gender}
//               </Text>
//             )}
//             {userData.dob != '' && (
//               <Text
//                 style={{
//                   color: darkThemeColors.welcome_textSubtitle,
//                   fontSize: 20,

//                 }}>
//                 {', ' + userData.dob}
//               </Text>
//             )}
//           </View>
//           {userData.profession != '' && (
//             <Text
//               style={{
//                 color: Color.welcome_textSubtitle,
//                 fontSize: 20,
//                 alignSelf: 'center',
//                 marginTop: responsiveHeight(1),
//               }}>
//               {userData.profession == 'Select Profession' ? '' : ''}
//             </Text>
//           )}
//         </View>
//         <View
//           style={{
//             height: '75%',
//             width: '100%',
//             position: 'absolute',
//             bottom: 0,
//             justifyContent: 'space-between',
//             alignItems: 'center',
//           }}>
//          {index!=3 && index!=1 && index!=0  && <Animated.View style={lottieAnimationStyle}>
//             <LottieView
//               autoPlay
//               source={item.json}
//               loop
//               style={{
//                 width: userData.keyboardVisible
//                   ? SCREEN_WIDTH * 0.3
//                   : SCREEN_WIDTH * 0.6,
//                 height: userData.keyboardVisible
//                   ? SCREEN_WIDTH * 0.3
//                   : SCREEN_WIDTH * 0.6,
//               }}
//             />
//           </Animated.View>}
//           {index == 0 && <FirstFormRender src={item.json}/>}
//           {index == 1 && <GenderFormRender  />}
//           {index == 2 && <DatePickerRender />}
//           {index == 3 && <ProfessionRender />}
//           {/* {index == 4 && <SubmitFormRender  />} */}
//         </View>
//       </View>
   
//   );
// };

// export default OnboardingItem;
// const styles = StyleSheet.create({
//   itemContainer: {
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: responsiveFontSize(5),
//     marginBottom: responsiveHeight(5),
//     color: 'white',
//   },
//   circleContainer: {
//     ...StyleSheet.absoluteFillObject,
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//   },
// });
