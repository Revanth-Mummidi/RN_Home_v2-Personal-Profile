/// Total height of the component will be around 70,

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import AppStatusBar from './AppStatusBar';
import {useNavigation} from '@react-navigation/native';

import {Image} from 'react-native';
import {Color} from '../../../themes';

const ScreenHeader = ({name}) => {
  const navigation = useNavigation();
  return (
    <>
      <AppStatusBar
        backgroundColor="#279AC6"
        barStyle="light-content"
        visibleStatusBar={false}
        translucent
      />
      <LinearGradient
        colors={['#279AC6', '#279AC6']}
        style={styles.linearGradient}>
        <View style={{height: 8}} />
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            //backgroundColor: 'yellow',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              position: 'absolute',
              left: 20,
              // marginRight: 40,
              //backgroundColor: 'yellow',
            }}
            onPress={() => navigation.goBack()}>
            <Image
              style={{
                width: 31,
                height: 31,
                tintColor: Color.WHITE,
              }}
              source={require('../assets/icons/arrow-left.png')}
            />
            {/* <Ionicons name="arrow-back-circle-sharp" size={30} color="white" /> */}
          </TouchableOpacity>
          <View
            style={{
              width: '75%',
              alignItems: 'center',
            }}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 17,
                fontWeight: '600',
                color: Color.WHITE,
                width: '70%',
                textAlign: 'center',
                marginLeft: 20,
              }}>
              {name}
            </Text>
          </View>
        </View>
        <View style={{height: 13}} />
      </LinearGradient>
    </>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  linearGradient: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    height: 50,
  },
});

// >>>>>>>>>>>>>> Name is not centered >>>>>>>>>>>>>>>>>>>>
// /// Total height of the component will be around 70,

// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import LinearGradient from 'react-native-linear-gradient';
// import AppStatusBar from './AppStatusBar';
// import {useNavigation} from '@react-navigation/native';

// import {Image} from 'react-native';
// import {Color} from '../../../themes';

// const ScreenHeader = ({name}) => {
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
//         colors={['#279AC6', '#279AC6']}
//         style={styles.linearGradient}>
//         <View style={{height: 8}} />
//         <View
//           style={{
//             flexDirection: 'row',
//             flex: 1,
//             alignItems: 'center',
//             //backgroundColor: 'yellow',
//           }}>
//           <TouchableOpacity
//             activeOpacity={1}
//             style={{marginHorizontal: 20, flex: 0.4}}
//             onPress={() => navigation.goBack()}>
//             <Image
//               style={{
//                 width: 31,
//                 height: 31,
//                 tintColor: Color.WHITE,
//               }}
//               source={require('../assets/icons/arrow-left.png')}
//             />
//             {/* <Ionicons name="arrow-back-circle-sharp" size={30} color="white" /> */}
//           </TouchableOpacity>
//           <View style={{}}>
//             <Text style={{fontSize: 17, fontWeight: '600', color: Color.WHITE}}>
//               {name}
//             </Text>
//           </View>
//         </View>
//         <View style={{height: 13}} />
//       </LinearGradient>
//     </>
//   );
// };

// export default ScreenHeader;

// const styles = StyleSheet.create({
//   linearGradient: {
//     flexDirection: 'column',
//     alignContent: 'center',
//     justifyContent: 'center',
//     height: 50,
//   },
// });
