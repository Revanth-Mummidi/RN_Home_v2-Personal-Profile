// import {View, Text, ScrollView, Pressable,Image} from 'react-native';
// import getStyles from '../../utils/MoreStyles';
// import {useSelector, useDispatch} from 'react-redux';
// import React, { useState } from 'react';
// import { setTheme } from '../../../../redux/slices/ThemeSlice';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ThemePreferences = () => {
//   const themeObj = useSelector(state => state.theme).theme;
//   const dispatch = useDispatch();
//   const theme = themeObj;
//   const Color = themeObj;
//   console.log(themeObj);
//   const styles = getStyles(Color);
//   const [themeState, setThemeState] =useState(theme);
//   var activeColor = Color.more_button;
//   var inactiveColor = Color.more_buttonActive;
//   const handleThemeChange = newTheme => {
//     let newtheme_ = newTheme;
//     dispatch(setTheme(newtheme_));
//     setThemeState(newtheme_);
//   };
//   React.useEffect(() => {
//    storeinasync();
//   }, [themeState]);
//   const storeinasync = async () => {
//     await AsyncStorage.setItem('theme', themeState);
//   };
//   return (
//     <View style={styles.card}>
//       <Text style={styles.titleText}>Theme Preferences </Text>
//       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//         <Pressable
//           onPress={() => handleThemeChange('dark')}
//           style={[
//             styles.scrollbutton,
//             {
//               backgroundColor:
//                 themeState === 'dark' ? activeColor : inactiveColor,
//             },
//           ]}>
//           <Image
//             source={require('../../assets/icons/moon.png')}
//             style={{
//               ...styles.icon30,
//               tintColor: themeState === 'dark' ? inactiveColor : activeColor,
//             }}
//           />
//           <Text
//             style={[
//               styles.buttonText,
//               {
//                 color: themeState === 'dark' ? inactiveColor : activeColor,
//               },
//             ]}>
//             Dark
//           </Text>
//         </Pressable>
//         <Pressable
//           onPress={() => handleThemeChange('light')}
//           style={[
//             styles.scrollbutton,
//             {
//               backgroundColor:
//                 themeState === 'light' ? activeColor : inactiveColor,
//             },
//           ]}>
//           <Image
//             source={require('../../assets/icons/sun.png')}
//             style={{
//               ...styles.icon30,
//               tintColor: themeState === 'light' ? inactiveColor : activeColor,
//             }}
//           />
//           <Text
//             style={[
//               styles.buttonText,
//               {
//                 color: themeState === 'light' ? inactiveColor : activeColor,
//               },
//             ]}>
//             Light
//           </Text>
//         </Pressable>
//         <Pressable
//           onPress={() => handleThemeChange('women')}
//           style={[
//             styles.scrollbutton,
//             {
//               backgroundColor:
//                 themeState === 'women' ? activeColor : inactiveColor,
//             },
//           ]}>
//           <Image
//             source={require('../../assets/icons/pregnant1.png')}
//             style={{
//               ...styles.icon30,
//               tintColor: themeState === 'women' ? inactiveColor : activeColor,
//             }}
//           />
//           <Text
//             style={[
//               styles.buttonText,
//               {
//                 color: themeState === 'women' ? inactiveColor : activeColor,
//               },
//             ]}>
//             Women
//           </Text>
//         </Pressable>
//         <Pressable
//           onPress={() => {
//             handleThemeChange('sysdes');
//           }}
//           style={[
//             styles.scrollbutton,
//             {
//               backgroundColor:
//                 themeState === 'sysdes' ? activeColor : inactiveColor,
//             },
//           ]}>
//           <Image
//             source={require('../../assets/icons/mobile.png')}
//             style={{
//               ...styles.icon30,
//               tintColor: themeState === 'sysdes' ? inactiveColor : activeColor,
//             }}
//           />
//           <Text
//             style={[
//               styles.buttonText,
//               {
//                 color: themeState === 'sysdes' ? inactiveColor : activeColor,
//               },
//             ]}>
//             System
//           </Text>
//         </Pressable>
//       </ScrollView>
//     </View>
//   );
// };

// export default ThemePreferences;
import {View, Text, ScrollView, Pressable,Image} from 'react-native';
import getStyles from '../../utils/MoreStyles';
import {useSelector, useDispatch} from 'react-redux';
import React, { useState } from 'react';
import { setTheme } from '../../../../redux/slices/ThemeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemePreferences = () => {
  const themeObj = useSelector(state => state.theme);
  const dispatch = useDispatch();
  const theme = themeObj.theme;
  const Color = themeObj.Colors;
  const styles = getStyles(Color);
  const [themeState, setThemeState] =useState(theme);
    var activeColor = Color.more_button;
  var inactiveColor = Color.more_buttonActive;
  const handleThemeChange = newTheme => {
    let newtheme_ = newTheme;
    dispatch(setTheme(newtheme_));
    setThemeState(newtheme_);
  };
  React.useEffect(() => {
   storeinasync();
  }, [themeState]);
  const storeinasync = async () => {
    try{
    await AsyncStorage.setItem('theme', themeState);
    }catch(e){
      console.log(e);
    }
  };
  return (
    <View style={styles.card}>
      <Text style={styles.titleText}>Theme Preferences </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Pressable
          onPress={() => handleThemeChange('dark')}
          style={[
            styles.scrollbutton,
            {
              backgroundColor:
                themeState === 'dark' ? activeColor : inactiveColor,
            },
          ]}>
          <Image
            source={require('../../assets/icons/moon.png')}
            style={{
              ...styles.icon30,
              tintColor: themeState === 'dark' ? inactiveColor : activeColor,
            }}
          />
          <Text
            style={[
              styles.buttonText,
              {
                color: themeState === 'dark' ? inactiveColor : activeColor,
              },
            ]}>
            Dark
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleThemeChange('light')}
          style={[
            styles.scrollbutton,
            {
              backgroundColor:
                themeState === 'light' ? activeColor : inactiveColor,
            },
          ]}>
          <Image
            source={require('../../assets/icons/sun.png')}
            style={{
              ...styles.icon30,
              tintColor: themeState === 'light' ? inactiveColor : activeColor,
            }}
          />
          <Text
            style={[
              styles.buttonText,
              {
                color: themeState === 'light' ? inactiveColor : activeColor,
              },
            ]}>
            Light
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleThemeChange('women')}
          style={[
            styles.scrollbutton,
            {
              backgroundColor:
                themeState === 'women' ? activeColor : inactiveColor,
            },
          ]}>
          <Image
            source={require('../../assets/icons/pregnant1.png')}
            style={{
              ...styles.icon30,
              tintColor: themeState === 'women' ? inactiveColor : activeColor,
            }}
          />
          <Text
            style={[
              styles.buttonText,
              {
                color: themeState === 'women' ? inactiveColor : activeColor,
              },
            ]}>
            Women
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            handleThemeChange('sysdes');
          }}
          style={[
            styles.scrollbutton,
            {
              backgroundColor:
                themeState === 'sysdes' ? activeColor : inactiveColor,
            },
          ]}>
          <Image
            source={require('../../assets/icons/mobile.png')}
            style={{
              ...styles.icon30,
              tintColor: themeState === 'sysdes' ? inactiveColor : activeColor,
            }}
          />
          <Text
            style={[
              styles.buttonText,
              {
                color: themeState === 'sysdes' ? inactiveColor : activeColor,
              },
            ]}>
            System
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default ThemePreferences;