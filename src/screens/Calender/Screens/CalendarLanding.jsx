// import {
//     StyleSheet,
//     View,
//     Dimensions,
//     TouchableOpacity,
//     ScrollView,
//     Text,
//     Pressable,
//   } from 'react-native';
//   import React, {useState, useEffect} from 'react';
//   import {AppHeader, HandleBottomSheet} from '../../_components';
//   import {Colors} from '../../../themes';
//   import RenderCalender from '../subScreens/View/RenderCalender';
//   import {useNavigation} from '@react-navigation/native';
//   import LinearGradient from 'react-native-linear-gradient';
//   import IconEntypo from 'react-native-vector-icons/Entypo';
//   import {ThemeContext} from '../../../themes/components/ThemeContext';
//   import NewTask from '../subScreens/View/NewTask';
// import CardSheet from './CardSheet';
  
//   const HEIGHT = Dimensions.get('window').height;
//   const CalendarLanding = () => {
//     const {theme, toggleTheme} = React.useContext(ThemeContext);
//     const Color = Colors(theme);
//     const styles = getStyles(Color);
//     const navigation = useNavigation();
//     const months = [3, 6, 8, 9];
//     const [selectedId, setSelectedId] = useState(0);
//     const refCreateTask = React.useRef(null);
    
//     const createNewTask = () => {
//       return <NewTask />;
//     };
    
    
//     const addTasks = () => {
//       refCreateTask.current.open();
//     };
  
//     return (
//       <>
//         <View style={{backgroundColor: Color.calen_bg, flex: 1}}>
//           <AppHeader
//             suffix={'Actions'}
//             user={selectedId}
//             onPressIcon={id => {
//               setSelectedId(id);
//             }}
//             rightElement={
//               <ScrollView
//                 vertical
//                 showsVerticalScrollIndicator={false}
//                 pagingEnabled
//                 decelerationRate={0.3}
//                 contentContainerStyle={{alignItems: 'center', marginRight: 10}}
//                 style={{
//                   height: 35,
//                   overflow: 'hidden',
//                   // marginLeft: 10,
//                 }}>
//                 {months.map((month, index) => (
//                   <TouchableOpacity
//                     key={index}
//                     // style={{marginVertical: 8}}
//                     // onPress={() => navigation.navigate('CustomReminder')}
//                     // onPress={() => fetchBadge(month)}
//                   >
//                     <View
//                       style={{
//                         backgroundColor: Color.header_iconActive,
//                         borderRadius: 20,
//                         height: 35,
//                         width: 35,
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                       }}>
//                       <Text
//                         style={{
//                           color: Color.badge,
//                           fontSize: 17,
//                           fontWeight: '600',
//                           fontFamily: 'CircularStd-Book',
//                         }}>
//                         {month}{' '}
//                         <Text
//                           style={{
//                             color: Color.badge,
//                             fontSize: 11,
//                             fontFamily: 'CircularStd-Book',
//                           }}>
//                           M
//                         </Text>
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                 ))}
//               </ScrollView>
//             }
//             showProfileBadge={true}
//             profileBadge={'2'}
//           />
//           <View>
//             <HandleBottomSheet
//               containerStyle={{backgroundColor: Color.calen_card_bg}}
//               bottomSheetRef={refCreateTask}
//               content={createNewTask()}
//               height={400}
              
//               draggableIcon={{backgroundColor: Color.WHITE, width: 100}}
//             />
//           </View>
          
//           <RenderCalender />
  
//           <LinearGradient
//             colors={[
//               Color.buttonLinear1,
//               Color.buttonLinear2,
//               Color.buttonLinear3,
//             ]}
//             style={styles.add}>
//             <TouchableOpacity
//               onPress={() =>
//                 // navigation.navigate('Scheduler', {screen: 'AddNewTasks'})
//                 //navigation.navigate('')
//                 addTasks()
//               }>
//               <IconEntypo
//                 name={'plus'}
//                 size={28}
//                 color={Color.buttonlinearIcon}
//               />
//             </TouchableOpacity>
//           </LinearGradient>
//         </View>
//       </>
//     );
//   };
  
//   export default CalendarLanding;
//   const getStyles = Color => {
//     const style = StyleSheet.create({
//       add: {
//         margin: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         shadowColor: Color.buttonLinear1,
//         shadowOffset: {
//           width: 0,
//           height: 4,
//         },
//         shadowOpacity: 0.8,
//         shadowRadius: 8.62,
//         elevation: 10,
//         position: 'absolute',
//         top: HEIGHT / 1.2,
//         right: 15,
//         zIndex: 999,
//         // backgroundColor: "#279AC6",
//       },
//     });
//     return style;
//   };
  