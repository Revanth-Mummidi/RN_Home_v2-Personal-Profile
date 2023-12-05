import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Swipeable} from 'react-native-gesture-handler';
import HorizontalPages from '../../subScreens/home/HorizontalPages';

const LeftSwiper = () => {
  const LeftSwipeActions = () => {
    return (
      <View
        style={{flex: 1, backgroundColor: '#ccffbd', justifyContent: 'center'}}>
        <Text
          style={{
            color: '#40394a',
            paddingHorizontal: 10,
            fontWeight: '600',
            paddingHorizontal: 30,
            paddingVertical: 20,
          }}>
          Bookmark
        </Text>
      </View>
    );
  };

  return (
    <View>
      <Swipeable renderLeftActions={LeftSwipeActions}>
        <HorizontalPages />
      </Swipeable>
    </View>
  );
};

export default LeftSwiper;

const styles = StyleSheet.create({});

// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   View,
//   Text,
//   StatusBar,
//   FlatList,
// } from 'react-native';
// import Swipeable from 'react-native-gesture-handler/Swipeable';
// import HorizontalPages from './HorizontalPages';
// const todoList = [
//   {id: '1', text: 'Learn JavaScript'},
//   {id: '2', text: 'Learn React'},
//   {id: '3', text: 'Learn TypeScript'},
// ];

// const LeftSwipeActions = () => {
//   return (
//     <View
//       style={{flex: 1, backgroundColor: '#ccffbd', justifyContent: 'center'}}>
//       <Text
//         style={{
//           color: '#40394a',
//           paddingHorizontal: 10,
//           fontWeight: '600',
//           paddingHorizontal: 30,
//           paddingVertical: 20,
//         }}>
//         Bookmark
//       </Text>
//     </View>
//   );
// };

// const swipeFromLeftOpen = () => {
//   alert('Swipe from left');
// };
// const swipeFromRightOpen = () => {
//   alert('Swipe from right');
// };

// const LeftSWiper = () => {
//   return (
//     <Swipeable
//       renderLeftActions={LeftSwipeActions}
//       // //   renderRightActions={rightSwipeActions}
//       // onSwipeableRightOpen={swipeFromRightOpen}
//       onSwipeableLeftOpen={swipeFromLeftOpen}>
//       <HorizontalPages />
//     </Swipeable>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   itemSeparator: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#444',
//   },
// });
// export default LeftSWiper;
