import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../../../themes';
import AppStatusBar from './AppStatusBar';
import ProfileSliderList from './ProfileSliderList';
import {ThemeContext} from '../../../themes/components/ThemeContext';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../../themes/ResponsiveDimensions';
import { useSelector } from 'react-redux';
import getRandomLGColor from '../uiStyles/GetRandomLGColors';

const BAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBar.currentHeight;

export default function AppHeader({
  backgroundColor,
  user,
  title,
  suffix,
  rightElement,
  expandView,
  onPressImage,
  onPressIcon,
  showProfileBadge,
  profileBadge,
  isProfessional = false,
  ...props
}) {
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  const styles = getStyles(Color);
  const dependentUsers=useSelector(state=>state.dependant_users).dependant_users_data;
  const CurrentProfile=useSelector(state=>state.dependant_users).parent_profile;
  const [profileSlider, setProfileSlider] = useState(false);
  const list = isProfessional ? professional : profile;
  const [selectedItem,setSelectedItem]=useState(CurrentProfile);
  const [current, setCurrent] = useState(list[user]);
  useEffect(() => {
    console.log("IN APP HEADER");
  }, []);
 const {RandomLinearColor1,RandomLinearColor2}=getRandomLGColor();
  return (
    <>
      <AppStatusBar
        backgroundColor={Color.linear1}
        barStyle="light-content"
        visibleStatusBar={false}
        translucent
      />
      <LinearGradient
        colors={[Color.linear1, Color.linear2, Color.linear3]}
        style={styles.linearGradient}>
        {profileSlider == false && <View style={styles.container}>
          <View style={{flexDirection: 'row', alignItems: 'center',height:responsiveHeight(5)}}>
            <Pressable activeOpacity={1} style={{}} onPress={onPressImage}>
            {selectedItem && selectedItem.Profile_Picture!=null?(<Image
                  source={{uri: selectedItem.Profile_Picture}}
                  style={styles.userImage}
                />):selectedItem && selectedItem.user_first_name?(
                  <LinearGradient
                  colors={[RandomLinearColor1, RandomLinearColor2]} style={{backgroundColor:'grey',...styles.userImage,justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:responsiveFontSize(2)}}>{selectedItem.user_first_name[0]}</Text>
                </LinearGradient>):null}
            </Pressable>
            <Pressable
              onPress={() => {
                setProfileSlider(!profileSlider);
              }}
              style={{flexDirection: 'row'}}>
              <Text style={styles.title}>
                {/* {title} {current?.name} {suffix} */}
                 {selectedItem?.user_first_name}
              </Text>

              <View style={{marginLeft: 5, justifyContent: 'flex-end'}}>
                <IconFontAwesome
                  name={profileSlider ? 'angle-up' : 'angle-down'}
                  size={17}
                  color={Color.fontReadTheme}
                  style={{marginLeft: 5}}
                />
              </View>
            </Pressable>
          </View>
          <View>{rightElement}</View>
        </View>}
        {profileSlider == true && (
           <View style={{flexDirection:"row",height:responsiveHeight(5),width:'100%'}}>
            <Pressable
            style={{height:responsiveHeight(3),width:responsiveWidth(8),justifyContent:'center'}}
              onPress={() => {
                setProfileSlider(!profileSlider);
              }}>
          <View style={{marginLeft: 5,justifyContent:'center'}}>
          <IconFontAwesome
            name={profileSlider ? 'angle-left' : 'angle-down'}
            size={profileSlider ?  32 :18 }
            color={Color.fontReadTheme}
            style={{marginLeft: 5}}
          />
        </View>
            </Pressable>
        <ScrollView horizontal>
          <View style={{flexDirection: 'row'}}>
            {dependentUsers.map((profile, index) => {
              return (
                <View
                  key={index}
                  // horizontal
                  // showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{flexDirection: 'row'}}>
                  <View
                    style={{
                      width: isProfessional ? 85 : 55,
                      marginRight: 5,
                    }}>
                    <Pressable
                      style={{alignItems: 'center'}}
                      onPress={() => {
                        onPressIcon(index);
                        // setCurrent(profile);
                        setSelectedItem(profile);
                        setProfileSlider(!profileSlider);
                      }}>
                       {profile!=null?profile.Profile_Picture!=null?(<Image
                          source={{uri: profile.Profile_Picture}}
                          style={{
                            height: responsiveHeight(3),
                            width: responsiveHeight(3),
                            borderRadius: 40,
                          }}
                        />):(
                          <LinearGradient
                          colors={[RandomLinearColor1, RandomLinearColor2]} style={{height:responsiveHeight(3),width:responsiveHeight(3),borderRadius:40,backgroundColor:'grey',justifyContent:'center',alignItems:'center'}}>
                         <Text style={{fontSize:responsiveFontSize(1.5)}}>{profile.user_first_name[0]}</Text>
                        </LinearGradient>):null}

                      <Text
                        numberOfLines={1}
                        style={{fontSize: responsiveFontSize(1.2), color: Color.headersubtitles,marginVertical:3}}>
                        {/* {profile.name} */}
                        {profile.user_first_name}
                      </Text>
                      {/* {profile?.showBadge ? (
                        <Text
                          style={{
                            position: 'absolute',
                            top: 10,
                            right: 2,
                            fontSize: 11,
                            fontWeight: '600',
                            color: Color.badge,
                            backgroundColor: Color.badge_bg,
                            borderRadius: 50,
                            paddingVertical: 2,
                            paddingHorizontal: 5,
                          }}>
                          {profile?.badge}
                        </Text>
                      ) : null}
                     */}
                    </Pressable>
                  </View>
                  
                </View>
                
              );
            })}
          </View>
         </ScrollView>
       </View>
        )}
      </LinearGradient>
    </>
  );
}
const getStyles = Color => {
  const style = StyleSheet.create({
    statusBar: {
      height: BAR_HEIGHT,
    },
    linearGradient: {
      flexDirection: 'column',
      alignContent: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      // height: 80,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 5,
    },
    userImage: {height: 35, width: 35, borderRadius: 100},
    title: {
      marginLeft: 10,
      fontSize: 17,
      fontWeight: '500',
      color: Color.headerTitle,
    },
  });
  return style;
};
const profile = [
  {
    id: 1,
    name: 'Kishore',
    showBadge: true,
    badge: 2,
    userImage:
      'https://photos1.blogger.com/blogger/6684/469/1600/Jake%20Glyllenhaal%20smile.0.jpg',
  },
  {
    id: 2,
    name: 'Mutyalu',
    showBadge: false,
    badge: 4,
    userImage:
      'https://images.unsplash.com/photo-1623184663110-89ba5b565eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c21pbGluZyUyMG1hbnxlbnwwfHwwfHw%3D&w=1000&q=80',
  },
  {
    id: 3,
    name: 'Savitri',
    showBadge: false,
    badge: 2,
    userImage:
      'https://media.istockphoto.com/id/1145237257/photo/smiling-brunette-in-white.jpg?s=612x612&w=0&k=20&c=ic7YrQxFSoLz2WlDLz3wX-LKC7LWF30zfAOqB9YehmU=',
  },
  {
    id: 4,
    name: 'Asha',
    showBadge: false,
    badge: 9,
    userImage:
      'https://as2.ftcdn.net/v2/jpg/02/43/85/59/1000_F_243855911_JAI1915km7T4Win4QjBwmBgcpWhIkiVt.jpg',
  },
  {
    id: 5,
    name: 'Arjun',
    showBadge: true,
    badge: 10,
    userImage:
      'https://media.istockphoto.com/id/1440913878/photo/happy-mother-smiling-and-playing-with-her-son-at-home.jpg?b=1&s=170667a&w=0&k=20&c=Y_YjOCrxtkBVST-AmFdAQ8N-Nbo_FdEtYdAfc0XXh-c=',
  },
];

const professional = [
  {
    id: 1,
    name: 'Personal',
    showBadge: true,
    badge: 2,
    userImage:
      'https://photos1.blogger.com/blogger/6684/469/1600/Jake%20Glyllenhaal%20smile.0.jpg',
  },
  {
    id: 2,
    name: 'Professional',
    showBadge: false,
    badge: 4,
    userImage:
      'https://images.unsplash.com/photo-1623184663110-89ba5b565eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c21pbGluZyUyMG1hbnxlbnwwfHwwfHw%3D&w=1000&q=80',
  },
  {
    id: 3,
    name: 'Red Cross',
    showBadge: false,
    badge: 2,
    userImage:
      'https://www.indianredcross.org/ircs/sites/default/files/inline-images/INDIAN%20RED%20CROSS%20SOCIETY%20BL%20LOGO.PNG',
  },
];

//// Kishore- My old Code>>>>>>>>>>>>>>>>>>> can be deleted

// import {
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Pressable,
//   ScrollView,
// } from 'react-native';
// import React, {useState, useEffect} from 'react';
// import LinearGradient from 'react-native-linear-gradient';
// import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
// import {Color} from '../../../themes';
// import AppStatusBar from './AppStatusBar';
// import ProfileSliderList from './ProfileSliderList';

// const BAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBar.currentHeight;

// export default function AppHeader({
//   backgroundColor,
//   userName,
//   title,
//   rightElement,
//   expandView,
//   onPressImage,
//   showProfileBadge,
//   profileBadge,
//   isProfessionalSlider = false,
//   ...props
// }) {
//   const [profileSlider, setProfileSlider] = useState(expandView);

//   useEffect(() => {}, []);

//   return (
//     <>
//       <AppStatusBar
//         // backgroundColor="#279AC6"
//         backgroundColor={Color.BACKGROUND}
//         barStyle="light-content"
//         visibleStatusBar={false}
//         translucent
//       />
//       <LinearGradient
//         // colors={['#2899C6', '#1B88C3', '#157AC0']}
//         colors={['#1A1A1A', '#1b1b1b', '#282828']}
//         style={styles.linearGradient}>
//         {isProfessionalSlider ? (
//           <>
//             {professional.slice(0, 1).map((profile, index) => {
//               return (
//                 <View key={index} style={styles.container}>
//                   <View style={{flexDirection: 'row', alignItems: 'center'}}>
//                     <Pressable
//                       activeOpacity={1}
//                       style={{}}
//                       onPress={onPressImage}>
//                       <Image
//                         source={{uri: profile?.userImage}}
//                         style={styles.userImage}
//                       />
//                     </Pressable>
//                     <Pressable
//                       onPress={() => {
//                         setProfileSlider(!profileSlider);
//                       }}
//                       style={{flexDirection: 'row'}}>
//                       <Text style={styles.title}>
//                         {userName} {title}
//                       </Text>

//                       <View style={{marginLeft: 5, justifyContent: 'flex-end'}}>
//                         <IconFontAwesome
//                           name={profileSlider ? 'angle-up' : 'angle-down'}
//                           size={17}
//                           color={Color.mildBlue}
//                           style={{marginLeft: 5}}
//                         />
//                       </View>
//                     </Pressable>
//                   </View>
//                   <View>{rightElement}</View>
//                 </View>
//               );
//             })}
//             {profileSlider ? (
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   marginTop: 10,
//                 }}>
//                 {professional.map((profile, index) => {
//                   return (
//                     <View
//                       key={index}
//                       // horizontal
//                       // showsHorizontalScrollIndicator={false}
//                       contentContainerStyle={{flexDirection: 'row'}}>
//                       <View
//                         style={{
//                           width: 85,
//                           marginRight: 5,
//                         }}>
//                         <Pressable
//                           style={{alignItems: 'center'}}
//                           onPress={() => {
//                             alert('dummy=> redirect');
//                           }}>
//                           <Image
//                             source={{uri: profile.userImage}}
//                             style={{
//                               height: 30,
//                               width: 30,
//                               borderRadius: 40,
//                             }}
//                           />

//                           <Text
//                             numberOfLines={1}
//                             style={{fontSize: 11, color: Color.WHITE}}>
//                             {profile.name}
//                           </Text>
//                           {profile?.showBadge ? (
//                             <Text
//                               style={{
//                                 position: 'absolute',
//                                 top: 10,
//                                 right: 5,
//                                 fontSize: 11,
//                                 fontWeight: '600',
//                                 color: Color.WHITE,
//                                 backgroundColor: Color.midBlue,
//                                 borderRadius: 50,
//                                 paddingVertical: 2,
//                                 paddingHorizontal: 5,
//                               }}>
//                               {profile?.badge}
//                             </Text>
//                           ) : null}
//                         </Pressable>
//                       </View>
//                     </View>
//                   );
//                 })}
//               </View>
//             ) : null}
//           </>
//         ) : (
//           <>
//             {profile.slice(0, 1).map((profile, index) => {
//               return (
//                 <View key={index} style={styles.container}>
//                   <View style={{flexDirection: 'row', alignItems: 'center'}}>
//                     <Pressable
//                       activeOpacity={1}
//                       style={{}}
//                       onPress={onPressImage}>
//                       <Image
//                         source={{uri: profile?.userImage}}
//                         style={styles.userImage}
//                       />
//                     </Pressable>
//                     <Pressable
//                       onPress={() => {
//                         setProfileSlider(!profileSlider);
//                       }}
//                       style={{flexDirection: 'row'}}>
//                       <Text style={styles.title}>
//                         {userName} {title}
//                       </Text>

//                       <View style={{marginLeft: 5, justifyContent: 'flex-end'}}>
//                         <IconFontAwesome
//                           name={profileSlider ? 'angle-up' : 'angle-down'}
//                           size={17}
//                           color={Color.mildBlue}
//                           style={{marginLeft: 5}}
//                         />
//                       </View>
//                     </Pressable>
//                   </View>
//                   <View>{rightElement}</View>
//                 </View>
//               );
//             })}
//             {profileSlider ? (
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   marginTop: 10,
//                   // position: 'absolute',
//                   // bottom: -30,
//                   // left: 0,
//                   // zIndex: 10000,
//                 }}>
//                 {profile.map((profile, index) => {
//                   return (
//                     <View
//                       key={index}
//                       // horizontal
//                       // showsHorizontalScrollIndicator={false}
//                       contentContainerStyle={{flexDirection: 'row'}}>
//                       <View
//                         style={{
//                           width: 55,
//                           marginRight: 5,
//                         }}>
//                         <Pressable
//                           style={{alignItems: 'center'}}
//                           onPress={() => {
//                             alert('dummy=> redirect');
//                           }}>
//                           <Image
//                             source={{uri: profile.userImage}}
//                             style={{
//                               height: 30,
//                               width: 30,
//                               borderRadius: 40,
//                             }}
//                           />

//                           <Text
//                             numberOfLines={1}
//                             style={{fontSize: 11, color: Color.WHITE}}>
//                             {profile.name}
//                           </Text>
//                           {profile?.showBadge ? (
//                             <Text
//                               style={{
//                                 position: 'absolute',
//                                 top: 10,
//                                 right: -5,
//                                 fontSize: 11,
//                                 fontWeight: '600',
//                                 color: Color.WHITE,
//                                 backgroundColor: Color.midBlue,
//                                 borderRadius: 50,
//                                 paddingVertical: 2,
//                                 paddingHorizontal: 5,
//                               }}>
//                               {profile?.badge}
//                             </Text>
//                           ) : null}
//                         </Pressable>
//                       </View>
//                     </View>
//                   );
//                 })}
//               </View>
//             ) : null}
//           </>
//         )}
//         {/* {profileSlider ? (
//           <ProfileSliderList
//             image={profile?.userImage}
//             badge={profileBadge}
//             showBadge={showProfileBadge}
//           />
//         ) : null} */}

//         {/* {profile.map((profile, index) => {
//           return (
//             <>
//               {profileSlider ? (
//                 <ProfileSliderList
//                   image={profile?.userImage}
//                   badge={profileBadge}
//                   showBadge={showProfileBadge}
//                 />
//               ) : null}
//             </>
//           );
//         })} */}
//       </LinearGradient>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   statusBar: {
//     height: BAR_HEIGHT,
//   },
//   linearGradient: {
//     flexDirection: 'column',
//     alignContent: 'center',
//     justifyContent: 'center',
//     paddingVertical: 8,
//     position: 'relative',
//     //height: 80,
//   },
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 5,
//   },
//   userImage: {height: 35, width: 35, borderRadius: 100},
//   title: {
//     marginLeft: 10,
//     fontSize: 17,
//     fontWeight: '500',
//     color: Color.font,
//   },
// });

// const profile = [
//   {
//     id: 1,
//     name: 'Kishore',
//     showBadge: true,
//     badge: 2,
//     userImage:
//       'https://photos1.blogger.com/blogger/6684/469/1600/Jake%20Glyllenhaal%20smile.0.jpg',
//   },
//   {
//     id: 2,
//     name: 'Mutyalu',
//     showBadge: false,
//     badge: 4,
//     userImage:
//       'https://images.unsplash.com/photo-1623184663110-89ba5b565eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c21pbGluZyUyMG1hbnxlbnwwfHwwfHw%3D&w=1000&q=80',
//   },
//   {
//     id: 3,
//     name: 'Savitri',
//     showBadge: false,
//     badge: 2,
//     userImage:
//       'https://media.istockphoto.com/id/1145237257/photo/smiling-brunette-in-white.jpg?s=612x612&w=0&k=20&c=ic7YrQxFSoLz2WlDLz3wX-LKC7LWF30zfAOqB9YehmU=',
//   },
//   {
//     id: 4,
//     name: 'Asha',
//     showBadge: false,
//     badge: 9,
//     userImage:
//       'https://as2.ftcdn.net/v2/jpg/02/43/85/59/1000_F_243855911_JAI1915km7T4Win4QjBwmBgcpWhIkiVt.jpg',
//   },
//   {
//     id: 5,
//     name: 'Arjun',
//     showBadge: true,
//     badge: 10,
//     userImage:
//       'https://media.istockphoto.com/id/1440913878/photo/happy-mother-smiling-and-playing-with-her-son-at-home.jpg?b=1&s=170667a&w=0&k=20&c=Y_YjOCrxtkBVST-AmFdAQ8N-Nbo_FdEtYdAfc0XXh-c=',
//   },
//   // {
//   //   id: 6,
//   //   name: 'Savitri',
//   //   showBadge: false,
//   //   badge: 2,
//   //   userImage:
//   //     'https://media.istockphoto.com/id/1145237257/photo/smiling-brunette-in-white.jpg?s=612x612&w=0&k=20&c=ic7YrQxFSoLz2WlDLz3wX-LKC7LWF30zfAOqB9YehmU=',
//   // },
//   // {
//   //   id: 7,
//   //   name: 'Asha',
//   //   showBadge: false,
//   //   badge: 9,
//   //   userImage:
//   //     'https://as2.ftcdn.net/v2/jpg/02/43/85/59/1000_F_243855911_JAI1915km7T4Win4QjBwmBgcpWhIkiVt.jpg',
//   // },
//   // {
//   //   id: 8,
//   //   name: 'Arjun',
//   //   showBadge: true,
//   //   badge: 10,
//   //   userImage:
//   //     'https://media.istockphoto.com/id/1440913878/photo/happy-mother-smiling-and-playing-with-her-son-at-home.jpg?b=1&s=170667a&w=0&k=20&c=Y_YjOCrxtkBVST-AmFdAQ8N-Nbo_FdEtYdAfc0XXh-c=',
//   // },
// ];

// const professional = [
//   {
//     id: 1,
//     name: 'Personal',
//     showBadge: true,
//     badge: 2,
//     userImage:
//       'https://photos1.blogger.com/blogger/6684/469/1600/Jake%20Glyllenhaal%20smile.0.jpg',
//   },
//   {
//     id: 2,
//     name: 'Professional',
//     showBadge: false,
//     badge: 4,
//     userImage:
//       'https://images.unsplash.com/photo-1623184663110-89ba5b565eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c21pbGluZyUyMG1hbnxlbnwwfHwwfHw%3D&w=1000&q=80',
//   },
//   {
//     id: 3,
//     name: 'Red Cross',
//     showBadge: false,
//     badge: 2,
//     userImage:
//       'https://www.indianredcross.org/ircs/sites/default/files/inline-images/INDIAN%20RED%20CROSS%20SOCIETY%20BL%20LOGO.PNG',
//   },
// ];
