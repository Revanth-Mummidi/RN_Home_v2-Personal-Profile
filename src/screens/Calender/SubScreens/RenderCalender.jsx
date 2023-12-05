// import {
//     Text,
//     TouchableOpacity,
//     FlatList,
//     View,
//     Image,
//     StyleSheet,
//   } from 'react-native';
//   import React, {useCallback, useState} from 'react';
//   import {Colors, Color} from '../../../../themes';
//   import {ThemeContext} from '../../../../themes/components/ThemeContext';
//   import CalendarItem from './CalendarItem';
  
//   const RenderCalender = () => {
//     const {theme, toggleTheme} = React.useContext(ThemeContext);
//     const Color = Colors(theme);
//     const styles = getStyles(Color);
  
//     const keyExtractor = useCallback((item, index) => item.id, []);
//     const [selectedId, setSelectedId] = useState(0);
//     const renderItem = ({item, index}) => {
//       return <CalendarItem item={item} onPress={() => setSelectedId(item.id)} />;
//     };
//     return (
//       <View style={{}}>
//         <FlatList
//           data={tasks}
//           renderItem={renderItem}
//           keyExtractor={keyExtractor}
//           style={{backgroundColor: Color.themebackground}}
//           showsVerticalScrollIndicator={false}
//         />
//       </View>
//     );
//   };
  
//   export default RenderCalender;
//   const getStyles = Color => {
//     const style = StyleSheet.create({});
//     return style;
//   };
  
//   const tasks = [
//     {
//       id: 1,
//       date: 28,
//       weekday: 'Mon',
//       month: 'Jan',
//       year: 23,
//       profile: '',
//       backgroundColor: Color.calend_card_color1,
//       textColor: Color.calend_card_textColor1,
//       name: 'Pooja',
//       image:
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6dsHJlWjC0pJooa13Xm1FMBipVNgiMkBQ3qSkWr-R&s',
//       task: 'Medicine Reminder',
//       startTime: '10:00 am',
//       endTime: '11:00 am',
//       showEH: false,
//       showSurvey: true,
//     },
//     {
//       id: 2,
//       date: 28,
//       weekday: 'Mon',
//       month: 'Jan',
//       year: 23,
//       profile: '',
//       backgroundColor: Color.calend_card_color1,
//       textColor: Color.calend_card_textColor1,
//       name: 'Rohit',
//       image:
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6dsHJlWjC0pJooa13Xm1FMBipVNgiMkBQ3qSkWr-R&s',
//       task: 'Appointment with Doctor',
//       startTime: '11:00 am',
//       endTime: '11:30 am',
//       showEH: true,
//       showSurvey: false,
//     },
//     {
//       id: 3,
//       date: 1,
//       weekday: 'Tue',
//       month: 'Jan',
//       year: 23,
//       profile: '',
//       backgroundColor: Color.calend_card_color2,
//       textColor: Color.calend_card_textColor1,
//       name: 'Mutyalu',
//       image:
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6dsHJlWjC0pJooa13Xm1FMBipVNgiMkBQ3qSkWr-R&s',
//       task: 'Visiting physiotherpist',
//       startTime: '6:00 pm',
//       endTime: '7:30 pm',
//       showEH: false,
//       showSurvey: false,
//     },
//   ];
  