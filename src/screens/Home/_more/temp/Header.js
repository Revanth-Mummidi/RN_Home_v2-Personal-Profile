// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React from 'react';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import LinearGradient from 'react-native-linear-gradient';
// import {Color} from '../../../theme';
// import AppStatusBar from '../../../components/AppStatusBar';
// import {useNavigation} from '@react-navigation/native';

// const Header = ({name}) => {
//   const navigation = useNavigation();
//   return (
//     <>
//       <AppStatusBar
//         backgroundColor="#279AC6"
//         barStyle="light-content"
//         visibleStatusBar={false}
//         translucent
//       />
//       <LinearGradient
//         colors={['#279AC6', '#0059B990']}
//         style={styles.linearGradient}>
//         <View
//           style={{
//             flexDirection: 'row',
//             flex: 1,
//             alignItems: 'center',
//           }}>
//           <TouchableOpacity
//             style={{marginHorizontal: 20, flex: 0.4}}
//             onPress={() => navigation.goBack()}>
//             <AntDesign name="arrowleft" size={23} color="white" />
//           </TouchableOpacity>
//           <View>
//             <Text style={{fontSize: 22, fontWeight: '700', color: Color.WHITE}}>
//               {name}
//             </Text>
//           </View>
//         </View>
//         <View style={{height: 25}} />
//       </LinearGradient>
//     </>
//   );
// };

// export default Header;

// const styles = StyleSheet.create({
//   linearGradient: {
//     flexDirection: 'column',
//     alignContent: 'center',
//     justifyContent: 'center',
//     height: 80,
//   },
// });
