import React, {useState, useEffect,useRef} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  Animated,
  Alert
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { Pressable } from 'react-native';

const Status = ({route, navigation}) => {
  const {urlss} = route.params;
  const {names} = route.params
  const [isAnimationPaused, setIsAnimationPaused] = useState(false);
  const timerRef = useRef(null);
  const animationValue = useRef(new Animated.Value(0));
  useEffect(() => {
    let animation = null;

    if (!isAnimationPaused) {
      animationValue.current.setValue(0);
      
      const remainingDuration = (5 - animationValue.current._value) * 1000;

      animation = Animated.timing(animationValue.current, {
        toValue: 5,
        duration: remainingDuration,
        useNativeDriver: false,
      });

      animation.start(({ finished }) => {
        if (finished) {
          navigation.goBack();
        }
      });

      timerRef.current = setTimeout(() => {
        navigation.goBack();
      }, remainingDuration);
    } else {
      if (animation) {
        animation.stop();
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }

    return () => {
      if (animation) {
        animation.stop();
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isAnimationPaused, navigation]);

  const progressAnimation = animationValue.current.interpolate({
    inputRange: [0, 5],
    outputRange: ['0%', '100%'],
  });
  
  return (
 <Pressable 
  onLongPress={() => {
    setIsAnimationPaused(!isAnimationPaused);
  }}
  onPressOut={() => {
    setIsAnimationPaused(!isAnimationPaused);
  }}
 >
    <View
      style={{
        backgroundColor: 'black',
        height: '100%',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:40
      }}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View
        style={{
          height: 3,
          width: '95%',
          borderWidth: 1,
          backgroundColor: 'gray',
          position: 'absolute',
          top: 18,
        }}>
            
        <Animated.View
          style={{
            height: '100%',
            backgroundColor: 'white',
            width: progressAnimation,
          }}></Animated.View>

      </View>
      <View
        style={{
          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          top: 12,
          left: 0,
          width: '90%',
        }}>
        <View
          style={{
            borderRadius: 100,
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection:'row'
          }}>
          <Image
            source={{uri:urlss}}
            style={{
              borderRadius: 100,
              backgroundColor: 'orange',
              resizeMode: 'cover',
              width: '92%',
              height: '92%',
              marginLeft:6,
            }}
          />
        </View>
        
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%',
            marginLeft:14
          }}>
            
          <Text style={{color: 'white', fontSize: 15, paddingLeft: 10}}>
            {names}
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionic
              name="close"
              style={{fontSize: 20, color: 'white', opacity: 0.6}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Image
        source={{uri:urlss}}
        style={{position: 'absolute', width: '100%', height: '100%',zIndex:-1,resizeMode:'contain'}}
      />
    </View>
    </Pressable>
  );
};

export default Status;

