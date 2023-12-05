// Material bottom nav backup : https://stackoverflow.com/questions/75013007/how-to-remove-this-white-ovale-behind-the-focused-in-the-material-bottom-tabs-na
// Developer note
// Need translucent blur effect bottom tab:
// ref: https://medium.com/litslink/reactnative-translucent-tabbar-d938387aa19c

// Show and hide the label -Vertical view
// <Tab.Screen
//   name="ExploreStack"
//   component={ExploreStack}
//   options={{
//     tabBarLabel: ({focused, color}) => (
//       <Text
//         style={{
//           ...styles.labelstyle,
//           color: color,
//         }}>
//         {focused ? 'Explore' : null}
//       </Text>
//     ),
//     tabBarIcon: ({focused, color, size}) => (
//       <Image
//         source={require('./assets/icons/discover.png')}
//         style={{
//           ...styles.imageStyle,
//           tintColor: focused ? color : Color.gray,
//         }}
//       />
//     ),
//   }}
// />;

import React from 'react';
import {Image, Text, StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from '../../screens/Home/HomeStack';
// import {ExploreStack} from '../../screens/Explore';
import {Colors} from '../../themes';
// import {TrackerStack} from '../../screens/Tracker';
// import {CalendarStack} from '../../screens/Calendar';
import {MoreStack} from '../../screens/More';
import IconOcticons from 'react-native-vector-icons/Octicons';
import {ThemeContext} from '../../themes/components/ThemeContext';
import CreateRoom from '../../screens/VideoCall/CreateRoom';
import TasksStack from '../../screens/Calender/Screens/TasksStack';
const Tab = createBottomTabNavigator();

function BottomTab() {
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  const styles = getStyles(Color);
  const inactiveColor = Color.iconButtonInactive;
  return (
    <Tab.Navigator
      initialRouteName={HomeStack}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Color.iconButtonActive,
        //tabBarInactiveTintColor: Color.red,

        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: Color.bottomNav_bg,
          height: 64,
          position: 'absolute',
          paddingTop: 22,
          paddingBottom: 5,
          paddingHorizontal: 10,
          // borderTopLeftRadius: 20,
          // borderTopRightRadius: 20,
          // borderTopColor: 'transparent',
          // borderTopColor: Color.white,
        },
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: ({focused}) => <Text>{focused ? null : null}</Text>,
          tabBarIcon: ({focused, color, size}) => (
            <View
              style={{
                ...styles.container,
                borderBottomColor: focused ? color : 'transparent',
              }}>
              <Image
                source={require('./assets/icons/homeActive.png')}
                style={{
                  ...styles.imageStyle,
                  tintColor: focused ? color : inactiveColor,
                }}
              />
              {focused ? (
                <>
                  {/* // To match the height of the label */}
                  <Text />
                  <IconOcticons
                    name="dash"
                    size={40}
                    style={{...styles.iconStyle, color: color}}
                  />
                </>
              ) : (
                <Text
                  style={{
                    ...styles.labelstyle,
                    color: focused ? color : inactiveColor,
                  }}>
                  Home
                </Text>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="TrackerStack"
        component={CreateRoom}
        options={{
          tabBarLabel: ({focused}) => <Text>{focused ? null : null}</Text>,
          tabBarIcon: ({focused, color, size}) => (
            <View
              style={{
                ...styles.container,
                borderBottomColor: focused ? color : 'transparent',
              }}>
              <Image
                source={require('./assets/icons/trackerActive.png')}
                style={{
                  ...styles.imageStyle,
                  tintColor: focused ? color : inactiveColor,
                }}
              />
              {focused ? (
                <>
                  <Text />
                  <IconOcticons
                    name="dash"
                    size={40}
                    style={{...styles.iconStyle, color: color}}
                  />
                </>
              ) : (
                <Text
                  style={{
                    ...styles.labelstyle,
                    color: focused ? color : inactiveColor,
                  }}>
                  Tracker
                </Text>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="CalendarStack"
        component={TasksStack}
        options={{
          tabBarLabel: ({focused}) => <Text>{focused ? null : null}</Text>,
          tabBarIcon: ({focused, color, size}) => (
            <View
              style={{
                ...styles.container,
                borderBottomColor: focused ? color : 'transparent',
              }}>
              <Image
                source={require('./assets/icons/calendarActive.png')}
                style={{
                  ...styles.imageStyle,
                  tintColor: focused ? color : inactiveColor,
                }}
              />
              {focused ? (
                <>
                  <Text />
                  <IconOcticons
                    name="dash"
                    size={40}
                    style={{...styles.iconStyle, color: color}}
                  />
                </>
              ) : (
                <Text
                  style={{
                    ...styles.labelstyle,
                    color: focused ? color : inactiveColor,
                  }}>
                  Calendar
                </Text>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ExploreStack"
        component={HomeStack}
        options={{
          tabBarLabel: ({focused}) => <Text>{focused ? null : null}</Text>,
          tabBarIcon: ({focused, color, size}) => (
            <View
              style={{
                ...styles.container,
                // borderBottomColor: focused ? color : 'transparent',
              }}>
              <Image
                source={require('./assets/icons/discover.png')}
                style={{
                  ...styles.imageStyle,
                  tintColor: focused ? color : inactiveColor,
                }}
              />
              {focused ? (
                <>
                  <Text />
                  <IconOcticons
                    name="dash"
                    size={40}
                    style={{...styles.iconStyle, color: color}}
                  />
                </>
              ) : (
                <Text
                  style={{
                    ...styles.labelstyle,
                    color: focused ? color : inactiveColor,
                  }}>
                  More
                </Text>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MoreStack"
        component={MoreStack}
        options={{
          tabBarLabel: ({focused}) => <Text>{focused ? null : null}</Text>,
          tabBarIcon: ({focused, color, size}) => (
            <View
              style={{
                ...styles.container,
                // borderBottomColor: focused ? color : 'transparent',
              }}>
              <Image
                source={require('./assets/icons/menu.png')}
                style={{
                  ...styles.imageStyle,
                  tintColor: focused ? color : inactiveColor,
                }}
              />
              {focused ? (
                <>
                  <Text />
                  <IconOcticons
                    name="dash"
                    size={40}
                    style={{...styles.iconStyle, color: color}}
                  />
                </>
              ) : (
                <Text
                  style={{
                    ...styles.labelstyle,
                    color: focused ? color : inactiveColor,
                  }}>
                  More
                </Text>
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomTab;
const getStyles = Color => {
  const style = StyleSheet.create({
    container: {
      alignItems: 'center',
      // borderBottomColor: Color.red,
      // borderBottomWidth: 4,
      // paddingBottom: 20,
    },
    labelstyle: {
      fontSize: 12,
      fontWeight: '500',
      letterSpacing: 0.5,
      paddingLeft: 2,
    },
    imageStyle: {resizeMode: 'contain', width: 30, height: 25},
    iconStyle: {
      color: Color.iconButtonInactive,
      position: 'absolute',
      bottom: -10,
      height: 22,
      marginBottom: 14,
    },
  });
  return style;
};
// // Material bottom nav backup : https://stackoverflow.com/questions/75013007/how-to-remove-this-white-ovale-behind-the-focused-in-the-material-bottom-tabs-na
// // Developer note
// // Need translucent blur effect bottom tab:
// // ref: https://medium.com/litslink/reactnative-translucent-tabbar-d938387aa19c

// import React from 'react';
// import {Image} from 'react-native';
// import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import HomeStack from '../../screens/Home/HomeStack';
// import {ExploreStack} from '../../screens/Explore';
// import {Color} from '../../themes';
// import {TrackerStack} from '../../screens/Tracker';
// import {CalendarStack} from '../../screens/Calendar';
// import {MoreStack} from '../../screens/More';
// import Welcome from '../../screens/Login/screens/onBoarding/Welcome';
// import UserVerification from '../../screens/Login/screens/Login/UserVerification';
// import {Text} from 'react-native';

// const Tab = createBottomTabNavigator();

// function BottomTab() {
//   return (
//     <Tab.Navigator
//       initialRouteName={HomeStack}
//       screenOptions={{
//         headerShown: false,
//         // tabBarActiveTintColor: Color.WHITE,
//         // tabBarInactiveTintColor: Color.lowBlue,
//         tabBarActiveTintColor: Color.highBlue,
//         tabBarInactiveTintColor: Color.midBlue,
//         // tabBarShowLabel: true,
//         tabBarLabelStyle: {
//           fontSize: 11,
//           fontWeight: '500',
//           letterSpacing: 0.7,
//           paddingBottom: 5,
//           //color: Color.lowBlue,
//           color: Color.midBlue,
//         },
//         tabBarStyle: {
//           // backgroundColor: '#1B88C3',
//           backgroundColor: Color.WHITE,
//           height: 65,
//           position: 'absolute',
//           paddingTop: 5,
//           paddingBottom: 2,
//           // borderTopLeftRadius: 10,
//           // borderTopRightRadius: 10,
//         },
//       }}>
//       <Tab.Screen
//         name="HomeStack"
//         component={HomeStack}
//         options={{
//           tabBarLabel: ({focused, color}) => (
//             <Text
//               style={{
//                 color: color,
//                 fontSize: 12,
//                 fontWeight: '500',
//                 letterSpacing: 0.5,
//                 paddingBottom: 5,
//               }}>
//               {focused ? 'Home' : null}
//             </Text>
//           ),
//           tabBarIcon: ({focused, color, size}) => (
//             <Image
//               source={require('./assets/icons/homeActive.png')}
//               style={{
//                 resizeMode: 'contain',
//                 width: 30,
//                 height: 25,
//                 tintColor: focused ? color : Color.gray,
//               }}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="TrackerStack"
//         component={TrackerStack}
//         options={{
//           tabBarLabel: 'Trackers',
//           tabBarIcon: ({focused, color, size}) => (
//             <Image
//               source={
//                 focused
//                   ? require('./assets/icons/trackerActive.png')
//                   : require('./assets/icons/trackerInactive.png')
//               }
//               style={{
//                 resizeMode: 'contain',
//                 width: 30,
//                 height: 25,
//                 tintColor: color,
//               }}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="CalendarStack"
//         component={CalendarStack}
//         options={{
//           tabBarLabel: 'Calendar',
//           tabBarIcon: ({focused, color, size}) => (
//             <Image
//               source={
//                 focused
//                   ? require('./assets/icons/calendarActive.png')
//                   : require('./assets/icons/calendarInactive.png')
//               }
//               style={{
//                 resizeMode: 'contain',
//                 width: 30,
//                 height: 25,
//                 tintColor: color,
//               }}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="ExploreStack"
//         component={ExploreStack}
//         options={{
//           tabBarLabel: 'Explore',
//           tabBarIcon: ({focused, color, size}) => (
//             <Image
//               source={
//                 focused
//                   ? require('./assets/icons/discover.png')
//                   : require('./assets/icons/discoverInactive.png')
//               }
//               style={{
//                 resizeMode: 'contain',
//                 width: 30,
//                 height: 25,
//                 tintColor: color,
//               }}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="MoreStack"
//         component={MoreStack}
//         options={{
//           tabBarLabel: 'More',
//           tabBarIcon: ({focused, color, size}) => (
//             <Image
//               source={
//                 focused
//                   ? require('./assets/icons/menu.png')
//                   : require('./assets/icons/menuInactive.png')
//               }
//               style={{
//                 resizeMode: 'contain',
//                 width: 30,
//                 height: 25,
//                 tintColor: color,
//               }}
//             />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }
// export default BottomTab;
