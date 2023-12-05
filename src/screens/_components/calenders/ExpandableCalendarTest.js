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

const ExpandableCalendarTest = ({heading}) => {
  const [date, setDate] = React.useState(new Date());
  const [time, settime] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState('');
  const [isDateError, setIsDateError] = React.useState(false);
  const [showDate, setShowDate] = React.useState(false);

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
                style={{fontSize: 27, color: Color.blue, fontWeight: 'bold'}}>
                {heading}
              </Text>
            </>
          }
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
                }
              : null
          }
        />
        {showDate && (
          <View style={{flexDirection: 'row'}}>
            <DatePicker
              mode="date"
              date={date}
              onDateChange={setDate}
              textColor={Color.BLACK}
              style={{
                width: Dimensions.get('window').width / 2,
                height: 100,
                backgroundColor: Color.WHITE,
              }}
            />
            <DatePicker
              mode="time"
              date={time}
              textColor={Color.BLACK}
              onDateChange={settime}
              style={{
                width: Dimensions.get('window').width / 2,
                height: 100,
                backgroundColor: Color.WHITE,
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default ExpandableCalendarTest;

const styles = StyleSheet.create({});
