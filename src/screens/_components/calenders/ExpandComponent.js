import {
  Animated,
  Dimensions,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useRef} from 'react';
import {toggleAnimation} from './toggleAnimation';
import IconFontIsTo from 'react-native-vector-icons/Fontisto';
import moment from 'moment';
import {Color} from '../../../themes';

const {width} = Dimensions.get('window').width;

const ExpandComponent = ({
  heading,
  cases,
  selectedDate,
  selectedTime,
  occurences,
  day,
  HDMW,
  selectHDMW,
  repetition,
  repetitionCriteria,
  setShowhowStartDT,
  showStartDT,
  setIsEndTimeClicked,
  isEndTimeClicked,
  setIsRepeatSectionClicked,
  isRepeatSectionClicked,
  containerStyle,
  textColor = Color.blue,
}) => {
  const animationController = useRef(new Animated.Value(0)).current;
  const fontColor = textColor;
  const expandTrans = () => {
    switch (cases) {
      case 'Start':
        setShowhowStartDT(!showStartDT);
        const satrtConfig = {
          duration: 300,
          toValue: showStartDT ? 0 : 1,
          useNativeDriver: true,
        };
        Animated.timing(animationController, satrtConfig).start();
        LayoutAnimation.configureNext(toggleAnimation);
        break;
      case 'End':
        setIsEndTimeClicked(!isEndTimeClicked);
        const endConfig = {
          duration: 300,
          toValue: isEndTimeClicked ? 0 : 1,
          useNativeDriver: true,
        };
        Animated.timing(animationController, endConfig).start();
        LayoutAnimation.configureNext(toggleAnimation);
        break;
      case 'Repeat':
        setIsRepeatSectionClicked(!isRepeatSectionClicked);
        const repeatConfig = {
          duration: 300,
          toValue: isRepeatSectionClicked ? 0 : 1,
          useNativeDriver: true,
        };
        Animated.timing(animationController, repeatConfig).start();
        LayoutAnimation.configureNext(toggleAnimation);
    }
  };

  const arrowTransform = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={expandTrans}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 4,
        paddingHorizontal: 10,
        alignItems: 'center',
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#E5EDF7',
        ...containerStyle,
      }}>
      <Text
        style={{
          fontFamily: 'CircularStd-Book',
          color: 'black',
          fontSize: 18,
          width: '91%',
        }}>
        {heading}
        <Text
          style={{
            fontFamily: 'CircularStd-Book',
            color: fontColor,
            fontSize: 16,
          }}>
          {' '}
          {selectHDMW && selectHDMW + ' '}
          {HDMW && HDMW}
          {selectedDate && moment(selectedDate).format('DD-MM-YYYY')}{' '}
          {day && cases === 'Start' ? day + ' ' : ''}
          {selectedTime && moment(selectedTime).format('hh:mm a')}
        </Text>
        <Text
          style={{
            fontFamily: 'CircularStd-Book',
            color: fontColor,
          }}>
          <Text
            style={{
              fontFamily: 'CircularStd-Book',
              color: fontColor,
            }}>
            {repetition} {repetitionCriteria}
          </Text>
        </Text>
      </Text>

      <TouchableOpacity
        onPress={expandTrans}
        style={{padding: 15, position: 'relative', right: 0, bottom: 0}}>
        <Animated.View
          style={{
            transform: [{rotateZ: arrowTransform}],
          }}>
          <IconFontIsTo name="angle-up" size={14} color={fontColor} />
        </Animated.View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ExpandComponent;

const styles = StyleSheet.create({});
