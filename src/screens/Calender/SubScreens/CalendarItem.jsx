// import {View, Text, Pressable, Image, StyleSheet} from 'react-native';
// import React from 'react';
// import {Colors, Color} from '../../../../themes';
// import {ThemeContext} from '../../../../themes/components/ThemeContext';
// const CalendarItem = ({item, index}) => {
//   const {theme, toggleTheme} = React.useContext(ThemeContext);
//   const Color = Colors(theme);
//   const styles = getStyles(Color);
//   return (
//     <View style={{marginHorizontal: 10}}>
//       <Pressable key={index} style={{paddingTop: 10}}>
//         <View
//           style={{
//             flexDirection: 'row',
//             minHeight: 112,
//           }}>
//           <View
//             style={{
//               backgroundColor: item?.backgroundColor,
//               flex: 0.3,
//               borderTopLeftRadius: 10,
//               borderBottomLeftRadius: 10,
//               justifyContent: 'space-evenly',
//             }}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'space-evenly',
//               }}>
//               <Text
//                 style={{
//                   fontSize: 36,
//                   color: item?.textColor,
//                 }}>
//                 {item.date}
//                 {/* {moment(items.event_date).format('DD')} */}
//               </Text>

//               <View>
//                 <Text style={{fontSize: 11, color: item?.textColor}}>
//                   {item.weekday}
//                   {/* {moment(items.event_date).format('ddd')} */}
//                 </Text>
//                 <Text style={{fontSize: 11, color: item?.textColor}}>
//                   {item.month}, {item.year}
//                   {/* {moment(items.event_date).format('MMM')}{' '}
//                       {moment(items.event_date).format('YY')} */}
//                 </Text>
//               </View>
//             </View>

//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-evenly',
//                 alignItems: 'center',
//               }}>
//               <Image
//                 resizeMode="cover"
//                 style={{width: 30, height: 30, borderRadius: 20}}
//                 source={{
//                   uri: item?.image,
//                 }}
//               />
//               <Text style={{fontSize: 11, color: item?.textColor}}>
//                 {item.name}
//               </Text>
//             </View>
//           </View>
//           <View
//             style={{
//               backgroundColor: Color.calen_card_bg,
//               flex: 0.7,
//               borderTopRightRadius: 10,
//               borderBottomRightRadius: 10,
//               padding: 10,
//             }}>
//             <View style={{flexDirection: 'column', flex: 1}}>
//               <Text
//                 numberOfLines={2}
//                 style={{
//                   fontFamily: 'CircularStd-Medium',
//                   fontSize: 18,
//                   color: Color.calen_card_title,
//                 }}>
//                 {item.task}
//               </Text>
//             </View>

//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//               }}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                 }}>
//                 <Text>
//                   <Text
//                     style={{
//                       fontFamily: 'CircularStd-Book',
//                       fontSize: 14,
//                       color: Color.calen_card_subtitle,
//                     }}>
//                     {item.startTime} -{' '}
//                     {/* {' '}
//                           {items.start_time.split(' ').pop().slice(0, 5)} */}
//                   </Text>
//                 </Text>
//                 <Text>
//                   <Text
//                     style={{
//                       fontFamily: 'CircularStd-Book',
//                       fontSize: 14,
//                       color: Color.calen_card_subtitle,
//                     }}>
//                     {item.endTime}
//                     {/* {' '}
//                           to {items.end_time.split(' ').pop().slice(0, 5)} */}
//                   </Text>
//                 </Text>
//               </View>
//               {item.showEH ? (
//                 <View
//                   style={{
//                     marginLeft: 10,
//                   }}>
//                   <Image
//                     style={{
//                       width: 14,
//                       height: 12,
//                       resizeMode: 'contain',
//                     }}
//                     source={require('../../assets/icons/OnlyLogo.png')}
//                   />
//                 </View>
//               ) : null}
//               {item.showSurvey ? (
//                 <View
//                   style={{
//                     backgroundColor: Color.calen_card_button,
//                     paddingHorizontal: 9,
//                     paddingVertical: 2,
//                     borderRadius: 8,
//                   }}>
//                   <Text
//                     style={{
//                       color: Color.calen_card_buttonText,
//                       fontSize: 14,
//                     }}>
//                     Survey
//                   </Text>
//                 </View>
//               ) : null}
//             </View>
//           </View>
//         </View>
//       </Pressable>
//     </View>
//   );
// };

// export default CalendarItem;

// const getStyles = Color => {
//   const style = StyleSheet.create({});
//   return style;
// };
