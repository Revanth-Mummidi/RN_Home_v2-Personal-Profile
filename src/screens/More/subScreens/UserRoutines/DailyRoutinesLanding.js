import { View, Text, Pressable,PanResponder, Animated } from 'react-native'
import React,{useState} from 'react'
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import Biometrics from 'react-native-biometrics';
import { useNavigation } from '@react-navigation/native';
import { getColor } from '../../../../themes/GetColor';
import { useSelector } from 'react-redux';

const DailyRoutinesLanding = () => {
  const navigation = useNavigation();
  const Color = useSelector(state => state.theme).Colors;


  const [scale, setScale] = useState(new Animated.Value(1));
 // console.log(scale,)
  const [previousScale, setPreviousScale] = useState(1);

  // const panResponder = PanResponder.create({
  //   onStartShouldSetPanResponder: () => true,
  //   onPanResponderMove: (event, gestureState) => {
  //     // Use two fingers to pinch and calculate the new scale
  //     const newScale = Math.max(0.1, previousScale * gestureState.pinch);
  //     setScale(new Animated.Value(newScale));
  //   },
  //   onPanResponderRelease: (event, gestureState) => {
  //     // Save the current scale for the next pinch action
  //     setPreviousScale(previousScale * gestureState.pinch);
  //   },
  // });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      console.log(gestureState);
       if(Math.abs((gestureState.moveX - gestureState.moveY)/100) >= 1){
        setScale(Math.abs((gestureState.moveX - gestureState.moveY)/100));
       }
    },
    onPanResponderRelease: (event, gestureState) => {
      setPreviousScale(previousScale * gestureState.pinch);
    },
  });

  const animatedStyle = {
    transform: [{ scale }],
    useNativeDriver: true,
  };
 
  return (
    <View>
      <Pressable onPress={()=>{ navigation.navigate('AuthStack', {screen: 'Welcome'})}}>
      <Text style={{margin:100,color:Color.color1}}>DailyRoutinesLanding</Text>
      </Pressable>

      <Animated.View {...panResponder.panHandlers} style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center',top:500 }}>
          <Animated.View style={[{ width: 200, height: 200, backgroundColor: 'lightblue' }, animatedStyle]}>
            <Text>Pinch me!</Text>
          </Animated.View>
    </Animated.View>
    </View>
  )
}

export default DailyRoutinesLanding