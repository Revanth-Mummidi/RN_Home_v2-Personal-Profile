import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {Color, Fonts} from '../../../themes';

const width = Dimensions.get('screen').width;

const DateOnlyPicker = props => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  return (
    <View
      style={{
        height: 130,
        backgroundColor: Color.aquaBlue,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginHorizontal: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        ...props.containerStyle,
      }}>
      <View
        style={{
          width: '95%',
          overflow: 'hidden',
          alignItems: 'center',
          zIndex: 999,
        }}>
        <DatePicker
          mode="date"
          date={date || props.date}
          onDateChange={props.onDateChange}
          minimumDate={props.minimumDate}
          androidVariant="iosClone"
          style={{
            width: width,
            fontFamily: Fonts.primarySemiBold,
            height: 100,
            backgroundColor: Color.WHITE,
            borderColor: Color.aliceblue,
            ...props.pickerstyle,
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 14,
          color: Color.red,
          fontWeight: '500',
          backgroundColor: 'red',
        }}>
        {props.isError ? 'Please enter valid time' : ''}
      </Text>
    </View>
  );
};

export default DateOnlyPicker;

const styles = StyleSheet.create({});
