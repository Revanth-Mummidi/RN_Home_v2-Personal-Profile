import {View, Text, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';

import {darkThemeColors, lightThemeColors} from '../utils/Colors';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  responsiveFontSize,
  responsiveHeight,
} from '../../../themes/ResponsiveDimensions';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import { getColor } from '../../../themes/GetColor';
const AnimatedText = Animated.createAnimatedComponent(Text);
const CustomTextInput = ({
  w,
  bg,
  title,
  keyboardType,
  focused,
  onFocus,
  onChangeText,
  secureEntry,
  value,
  onSubmitEditing,
  onBlur,
  color,
  error
}) => {
  const [text, setText] = React.useState(value ? value : '');
  const animation = useSharedValue(13);
  
  const [isFocused, setIsFocused] = useState(false);
  const theme = useSelector(state => state.theme);
  const Color=getColor(theme.theme)
  const Focused = useIsFocused();
  useEffect(() => {
    if (value && !isFocused) { animation.value = withTiming(-5, {duration: 100})}
    setText(value);
  }, [Focused,value]);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: animation.value}],
    };
  });
  return (
    <View
      style={{width: w,backgroundColor: 'rgba(0,0,0,0)',justifyContent: 'flex-end',height: responsiveHeight(7)}}>
        <AnimatedText
        style={[{position: 'absolute', color:color?color: Color.textfield_fontInactive, top: 0,fontWeight:'bold'}, animatedStyle]}
        onPress={() => {
          animation.value = withTiming(-5, {duration: 100});
          setIsFocused(true);
        }}>
        {title} 
      </AnimatedText>
      <TextInput
        autoFocus={isFocused}
        secureTextEntry={secureEntry ? secureEntry : false}
        onFocus={() => {
          animation.value = withTiming(-5, {duration: 100});
          setIsFocused(true);
        }}
        cursorColor={'white'}
        onSubmitEditing={() => {
          setIsFocused(false);
          console.log("text ===== ",text,text.length);
          if (text.length < 1) {
            animation.value = withTiming(13, {duration: 100});
          } else {
            animation.value = withTiming(-5, {duration: 100});
          }
          onSubmitEditing();
        }}
        
        onBlur={() => {
          setIsFocused(false);
          if (text.length < 1) {
            animation.value = withTiming(13, {duration: 100});
          } else {
            animation.value = withTiming(-5, {duration: 100});
          }
          onBlur();
        }}
        value={value}
        onChangeText={txt => {
          if (txt.length < 1) {
            animation.value = withTiming(-5, {duration: 100});
          }
          onChangeText(txt);
          setText(txt);
        }}
        placeholderTextColor={
        color?color:  Color.textfield_fontInactive
        }
        keyboardType={keyboardType}
        style={{
          backgroundColor: 'rgba(0,0,0,0)',
          color:color?color:Color.textfield_fontWrite,
          borderBottomWidth: 1,
          borderBottomColor:
           error?'red':color?color:Color.textfield_fontInactive,
          fontSize: responsiveFontSize(2),
          paddingLeft: 0,
          fontWeight: '500',
        }}
      />

      

      {error && <><Text style={{position:'absolute',top:responsiveHeight(7.3),fontWeight:'400',color:'red'}}>{error}</Text></>}


    </View>
  );
};

export default CustomTextInput;
