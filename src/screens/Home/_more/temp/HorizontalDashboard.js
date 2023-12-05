{
  /*
Developer Note >>>>>>>>>>>>>>>>>>>>>>

Usage Method >>>>>>>>>>>>>>>>>>>>>>>>>
<Swiper
  source={[
    {
      id: 2,
      title: 'Home',
      badge: '',
      ref: React.createRef(),
      component: <Qualifications />,
    },
    {
      id: 3,
      title: 'Social',
      badge: '10',
      ref: React.createRef(),
      component: <DrugSocial />,
    },
  ]}
/>; */
}

import React, {useState, useRef} from 'react';
import {
  Dimensions,
  Animated,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {Color} from '../../../../themes';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const HorizontalDashboard = ({source, height = 140}) => {
  const ref = React.useRef(null);
  const [indexs, setIndexs] = React.useState(0);
  const componentRef = React.useRef(null);
  const translateX = useRef(new Animated.Value(0)).current;

  const scrollDots = () => {
    const dotPosition = Animated.divide(translateX, WIDTH);
    return (
      <View
        style={{
          marginVertical: 5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {source.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          const dotWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [6, 6, 6],
            extrapolate: 'clamp',
          });

          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: ['#f2f2f2', '#ffffff', '#f2f2f2'],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              opacity={opacity}
              style={{
                borderRadius: 15,
                marginHorizontal: 3,
                width: dotWidth,
                height: 6,
                backgroundColor: dotColor,
              }}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{backgroundColor: Color.WHITE, flex: -1}}>
        <FlatList
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: translateX,
                  },
                },
              },
            ],
            {useNativeDriver: false},
          )}
          style={{flexGrow: 0}}
          ref={componentRef}
          data={source}
          pagingEnabled
          onMomentumScrollEnd={event => {
            const index = Math.floor(
              Math.floor(event.nativeEvent.contentOffset.x) /
                Math.floor(event.nativeEvent.layoutMeasurement.width),
            );
            setIndexs(index);
          }}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({item}) => {
            return (
              <View
                style={{
                  width: WIDTH,
                  height: HEIGHT - height,
                }}>
                {item.component}
              </View>
            );
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            zIndex: 1,
            alignSelf: 'center',
          }}>
          {scrollDots()}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: -1,
    alignItems: 'flex-start',
  },
});

export default HorizontalDashboard;
