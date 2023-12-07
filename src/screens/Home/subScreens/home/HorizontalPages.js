import {Animated, Dimensions, Text, View} from 'react-native';
import React, {useRef} from 'react';
import {products} from './products';
import Card from './Card';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const CARD_HEIGHT = (WIDTH * 880) / 407;

const HorizontalPages = ({}) => {
  const translateX = useRef(new Animated.Value(0)).current;

  let color1 = products.map(color => color.color2);

  const backgroundColor = translateX.interpolate({
    inputRange: products.map((color, i) => WIDTH * i),
    outputRange: [...color1],
  });

  const scrollDots = () => {
    const dotPosition = Animated.divide(translateX, WIDTH);
    return (
      <View
        style={{
          marginTop: 24,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {products.map((item, index) => {
          console.log(item)
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
            outputRange: ['#4FA8D1', '#2899C6', '#4FA8D1'],
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
    <Animated.View style={{backgroundColor: backgroundColor}}>
      <View style={{height: CARD_HEIGHT / 1.2}}>
        <Animated.ScrollView
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
          scrollEventThrottle={16}
          snapToInterval={WIDTH}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {products.map((product, index) => (
            <Card product={product}  know = {index} key={index}/>
          ))}
        </Animated.ScrollView>
        <Text style={{position: 'absolute', bottom: 28, alignSelf: 'center'}}>
          {scrollDots()}
        </Text>
      </View>
    </Animated.View>
  );
};

export default HorizontalPages;
