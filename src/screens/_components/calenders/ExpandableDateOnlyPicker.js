{
  /* ********************** Developer Note *************************
date picker: 
    1. Min date Props
    2. conditional 2 Expandable headers (Ex: start date and end date)
    3. Below date pickers: Date, Datetime, Time.
    4. Converting the days function: wednesday to wed etc.
    3. If user clicks any other component, minimize datepicker component and the update on that day to the backend. 
    
    */
}

import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ExpandComponent from './ExpandComponent';
import DatePicker from 'react-native-date-picker';
import {Color} from '../../../themes';

const ExpandableDateOnlyPicker = ({heading}) => {
  const [date, setDate] = React.useState(new Date());
  const [time, settime] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState('');
  const [isDateError, setIsDateError] = React.useState(false);
  const [showDate, setShowDate] = React.useState(false);
  let textColor = Color.track_appHeader_iconInactive;
  let containerColor = Color.track_appHeader_iconInactive;
  const getDays = () => {
    if (date.toString().split(' ')[0] === 'Mon') {
      return 'Monday';
    } else if (date.toString().split(' ')[0] === 'Tue') {
      return 'Tuesday';
    } else if (date.toString().split(' ')[0] === 'Wed') {
      return 'Wednesday';
    } else if (date.toString().split(' ')[0] === 'Thu') {
      return 'Thursday';
    } else if (date.toString().split(' ')[0] === 'Fri') {
      return 'Friday';
    } else if (date.toString().split(' ')[0] === 'Sat') {
      return 'Saturday';
    } else if (date.toString().split(' ')[0] === 'Sun') {
      return 'Sunday';
    }
  };

  const setStartDateTime = () => {
    const todayDate = new Date();
    const todayCurrentDate = new Date(date);
    if (todayCurrentDate.getTime() > todayDate.getTime()) {
      setSelectedDate(date);
      setIsDateError(false);
    } else {
      setIsDateError(true);
    }
  };

  return (
    <View>
      <View style={{width: '100%'}}>
        <ExpandComponent
          heading={
            <>
              <Text
                style={{
                  fontSize: 27,
                  // color: Color.yellow,
                  fontWeight: 'bold',
                }}>
                {heading}
              </Text>
            </>
          }
          textColor={Color.linear1}
          setShowhowStartDT={setShowDate}
          showStartDT={showDate}
          cases={'Start'}
          selectedDate={date}
          selectedTime={date ? date : ''}
          day={getDays()}
          containerStyle={
            showDate
              ? {
                  margin: 0,
                  marginHorizontal: 10,
                  marginTop: 10,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  backgroundColor: containerColor,
                }
              : {
                  margin: 0,
                  marginHorizontal: 10,
                  marginTop: 10,
                  backgroundColor: containerColor,
                }
          }
        />
        {showDate && (
          <View
            style={{
              // width: '100%',
              backgroundColor: Color.common_white,
              marginHorizontal: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
            }}>
            <DatePicker
              mode="date"
              date={date}
              onDateChange={setDate}
              //textColor={Color.BLACK}
              style={{
                width: Dimensions.get('window').width * 0.9,
                height: 100,
                alignSelf: 'center',
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default ExpandableDateOnlyPicker;

const styles = StyleSheet.create({});
