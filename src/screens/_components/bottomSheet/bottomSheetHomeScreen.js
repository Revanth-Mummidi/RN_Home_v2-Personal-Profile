import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
const HEIGHT = Dimensions.get('window').height;

const BottomSheetHomeScreen = props => {
  const h = React.useRef(new Animated.Value(0)).current;
  return (
    <View>
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{width: '100%'}}
        onScroll={event => {
          const scrolling = event.nativeEvent.contentOffset.y;
          // console.log(scrolling);
          if (scrolling > 100) {
            // setHeaderShown(true);
            h.value = HEIGHT;
            // setH(h.value);
            props.setH(h.value);
            // console.log('100');
          } else {
            // setHeaderShown(false);
          }
        }}
        // onScroll will be fired every 16ms
        scrollEventThrottle={16}>
        {props.content}
      </ScrollView>
    </View>
  );
};

export default BottomSheetHomeScreen;

const styles = StyleSheet.create({});
