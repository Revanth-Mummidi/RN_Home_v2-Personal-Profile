{
  /*
 => On Start Date Fixed , Repeat Value is fixed
    1) On change in Occurances , End date and time is Updated Properly for all criterias.
 => On Start Date Fixed , Occurance is Fixed
    1) On change in repeat value , End Date and time is Updated properly for all criterias.
=> On Start Date Fixed , Repeat Value is fixed
    1) On change in End Date Time , Occurance is ---- Updated properly for all criterias.
 => On Start Date Fixed , End Date and time is Fixed
    1) On change in repeat value , Occurance  is ---- Updated properly for all criterias.
 => On EndDate and Repeat
Bugs:-
1) On Occurance,Start Date fixed and On Month Duration Changed EndDate is not Updated
2)

*/
}
import {View, Text, Pressable, StyleSheet, TextInput} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors, Color} from '../../../themes/index.js';
import DatePicker from 'react-native-date-picker';
import {ThemeContext} from '../../../themes/components/ThemeContext.js';
import React, {useEffect, useState} from 'react';
import ExpandableDateOnlyPicker from '../../_components/calenders/ExpandableDateOnlyPicker.js';
import DateTimePicker from '../../_components/calenders/DateTimePicker.js';
import {DateOnlyPicker} from '../../_components/index.js';
import DateTimeScrollablePicker from './DateTimeScrollablePicker';
import {ceil, floor, startClock} from 'react-native-reanimated';

const EndComponent = ({
  savedData,
  setSavedData,
  start_date,
  start_time,
  ActiveWeeks,
  isMultiWeek,
  repeatInd,
  repeatVal,
}) => {
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  const styles = getStyles(Color);
  const [occurences, setOccurences] = useState(1);
  const [repeat, setRepeat] = useState(true);
  const [open, setOpen] = useState(false);
  const [timeModal, setTimeModal] = useState(false);
  const [newDate, setEndDate] = useState(start_date);
  const [newTime, setTime] = useState(start_time);
  const [isOcc, setOcc] = useState(false);

  useEffect(() => {
    setOpen(!isOcc)
    if (!isOcc) {
      const occ = calculateOccurrences(
        start_date,
        newDate,
        convertToType(repeatInd),
        repeatVal + 1,
        start_time,
        newTime,
      );
      setOccurences(occ);
      setSavedData({
        ...savedData,
        occurance: occ.toString(),
      });
    } else {
      setEndDate(
        calculateDatebyOccurence(
          start_date,
          convertToType(repeatInd),
          repeatVal + 1,
          start_time,
          occurences,
        ),
        setSavedData({
          ...savedData,
          end_date: formatDate(newDate.toString()),
          end_time: formatTime(newTime.toString()),
        }),
      );
    }
  }, [
    repeatInd,
    repeatVal,
    start_date,
    start_time,
    isOcc,
    ActiveWeeks,
    isMultiWeek,
    occurences,
  ]);
  const isMulti = () => {
    let c = 0;
    ActiveWeeks.map((data, index) => {
      if (data == 1) {
        c = 1;
      }
    });
    return c != 0;
  };
  const isExist = week => {
    let c = 0;
    ActiveWeeks.map((data, index) => {
      if (data == 1 && index == week) {
        c = 1;
      }
    });
    return c != 0;
  };
  function convertToType(index) {
    if (index == 0) return 'hour';
    else if (index == 1) return 'day';
    else if (index == 2) return 'week';
    else if (index == 3) return 'month';
    else return '';
  }
  function formatTime(inputDate) {
    const date = new Date(inputDate);

    // Extract time components
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Create the formatted time string
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return formattedTime;
  }
  function formatDate(inputDate) {
    const date = new Date(inputDate);

    // Extract date components
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Create the formatted date string
    const formattedDate = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  }
  const calculateOccurrences = (
    startDate,
    endDate,
    repeatCategory,
    repeatValue,
    start_time,
    newTime,
  ) => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    startDateObj.setHours(start_time.getHours());
    startDateObj.setMinutes(start_time.getMinutes());
    startDateObj.setSeconds(start_time.getSeconds());
    endDateObj.setHours(newTime.getHours());
    endDateObj.setMinutes(newTime.getMinutes());
    endDateObj.setSeconds(newTime.getSeconds());

    if (isNaN(startDateObj) || isNaN(endDateObj) || startDateObj > endDateObj) {
      return 'Invalid date format';
    }

    let currentDate = startDateObj;
    let occ = 0;
    switch (repeatCategory) {
      case 'hour':
        {
          const startDay = currentDate.valueOf();
          const endDay = endDateObj.valueOf();
          occ = Math.floor((endDay - startDay) / (3600 * 1000 * repeatValue));
          return occ;
        }
        break;

      case 'day':
        {
          const startDay = currentDate.valueOf();
          const endDay = endDateObj.valueOf();
          occ = Math.floor((endDay - startDay) / (86400 * 1000 * repeatValue));
          return occ;
        }
        break;

      case 'week':
        if (!isMultiWeek) {
          while (currentDate <= endDateObj) {
            // Check if the current date is a Sunday (day of the week 0)
            if (currentDate.getDay() === repeatValue - 1) {
              
              occ++;
            }
            currentDate.setDate(currentDate.getDate() + 1);
          }
        } else {
          while (currentDate <= endDateObj) {
            if (isExist(currentDate.getDay())) {
              occ++;
            }
            currentDate.setDate(currentDate.getDate() + 1);
          }
        }
        break;

      case 'month':
        {
          const startDay = currentDate.valueOf();
          const endDay = endDateObj.valueOf();
          occ = Math.floor(
            (endDay - startDay) / (86400 * 1000 * 30 * (repeatVal + 1)),
          );
          console.log(occ);
          return occ;
        }
        break;

      default: {
        return 'Invalid repeat category';
      }
    }

    return occ;
  };
  const calculateDatebyOccurence = (
    startDate,
    repeatCategory,
    repeatValue,
    start_time,
    occurance,
  ) => {
    let currentDate = new Date(startDate);
    let currentTime = new Date(start_time);
    currentDate.setHours(currentTime.getHours());
    currentDate.setMinutes(currentTime.getMinutes());
    currentDate.setSeconds(currentTime.getSeconds());
    switch (repeatCategory) {
      case 'hour':
        {
          const startDay = currentDate.valueOf();
          const EndDate = new Date(
            startDay + repeatValue * (occurance * 3600) * 1000,
          );
          setTime(EndDate);
          currentDate = EndDate;
        }
        break;

      case 'day':
        {
          const startDay = currentDate.valueOf();
          const EndDate = new Date(
            startDay + repeatValue * (occurance * 86400) * 1000,
          );
          setTime(EndDate);
          currentDate = EndDate;
        }
        break;

      case 'week':
        {
          if (!isMulti()) {
            if (currentDate.getDay() != repeatValue - 1) {
              occurance = occurance - 1;
            }
            while (currentDate.getDay() != repeatValue - 1) {
              currentDate.setDate(currentDate.getDate() + 1);
            }
            const startDay = currentDate.valueOf();
            const EndDate = new Date(startDay + 7 * (occurance * 86400) * 1000);
            setTime(EndDate);
            currentDate = EndDate;
          } else {
            let occ = occurance;
            // currentDate.setDate(currentDate.getDate()+1);

            while (occ > 0) {
              currentDate.setDate(currentDate.getDate() + 1);
              if (isExist(currentDate.getDay())) {
                occ--;

                // console.log('Exist a week')
              }
              //  console.log(currentDate);
            }
            setTime(currentDate);
          }
        }

        break;

      case 'month':
        {
          console.log(occurance);
          currentDate.setMonth(
            currentDate.getMonth() + occurance * repeatValue,
          );
          setTime(currentDate);
        }
        break;

      default: {
        return 'Invalid repeat category';
      }
    }
    return currentDate;
  };
  const handleForTime = event => {
    newDate.setHours(event.getHours());
    newDate.setMinutes(event.getMinutes());
    newDate.setSeconds(event.getSeconds());
    const occ = calculateOccurrences(
      start_date,
      newDate,
      convertToType(repeatInd),
      repeatVal + 1,
      start_time,
      event,
    );
    setOccurences(occ);
    setSavedData({
      ...savedData,
      occurance: occ.toString(),
      end_date: formatDate(newDate.toString()),
      end_time: formatTime(event.toString()),
    });
    setTime(event);
    setTimeModal(false);
    setOcc(false);
  };
  const handleForDate = event => {
    const occ = calculateOccurrences(
      start_date,
      event,
      convertToType(repeatInd),
      repeatVal + 1,
      start_time,
      newTime,
    );
    setOccurences(occ);
    setSavedData({
      ...savedData,
      occurance: occ.toString(),
      end_date: formatDate(event.toString()),
      end_time: formatTime(newTime.toString()),
    });
    setTimeModal(true);
    setEndDate(event);
    setOcc(false);
  };
  const formattedTime = newTime.toLocaleString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const toMonth = month => {
    if (month == 0) return 'Jan';
    else if (month == 1) return 'Feb';
    else if (month == 2) return 'Mar';
    else if (month == 3) return 'Apr';
    else if (month == 4) return 'May';
    else if (month == 5) return 'Jun';
    else if (month == 6) return 'Jul';
    else if (month == 7) return 'Aug';
    else if (month == 8) return 'Sep';
    else if (month == 9) return 'Oct';
    else if (month == 10) return 'Nov';
    else if (month == 11) return 'Dec';
  };
  return (
    <View
      style={{
        backgroundColor: Color.textfieldContainer,
        // backgroundColor:'#BBBBBB',
        padding: 5,
        paddingVertical: 10,
       paddingTop:15,
        // borderWidth:1,
        // borderColor:'grey',
        // borderRadius:10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          borderRadius: 13,
          padding: 10,
          backgroundColor: '#171717',
          // ...styles.container,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 1,
          }}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: Color.white}}>End</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 10,
            }}>
            <Text style={{fontSize: 14, fontWeight: '500', color: Color.white}}>
              {
                // occurences!='Invalid Text Format'? {'Occurence:'+ occurences }: occurences
                !isOcc
                  ? repeatInd == 4
                    ? 'Invalid Repeat Category'
                    : occurences !== 'Invalid date format'
                    ? ` Occurence : ${occurences}`
                    : occurences
                  : `Date and Time : ${newDate.getDate()} ${toMonth(
                      newDate.getMonth(),
                    )} ${newDate.getFullYear()} , ${formattedTime} `
              }
            </Text>
          </View>
          {repeatInd != 4 ? (
            <Pressable
              onPress={() => {
                setRepeat(!repeat);
              }}>
              <View style={{alignItems: 'center'}}>
                <MaterialIcons
                  name={repeat ? 'arrow-drop-up' : 'arrow-drop-down'}
                  size={25}
                />
              </View>
            </Pressable>
          ) : null}
        </View>
      </View>
      <View style={{}}>
      {repeat && repeatInd != 4 ? (
        <>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 10,
            }}>
            <View
              style={{
                flex: 3,
                flexDirection: 'column',
                borderRadius: 13,
                padding: 10,
                opacity: isOcc ? 0.7 : 1,
                // borderColor: isOcc ? 'transparent' : 'white',
                // borderWidth: 1,
                marginRight: 10,
                backgroundColor: '#171717',
                // ...styles.container,
              }}>
              <Pressable
                onPress={() => {
                  setOcc(false);
                }}>
                <Text style={{color: Color.white}}>Custom Date Time</Text>
                <View
                  style={{flex: 1, flexDirection: 'row', paddingVertical: 3}}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Pressable
                      onPress={() => {
                        setOpen(true);
                      }}>
                      <Text>
                        {newDate.getDate()} {toMonth(newDate.getMonth())}{' '}
                        {newDate.getFullYear()} , {formattedTime}
                      </Text>
                    </Pressable>
                  </View>

                  <Pressable
                    onPress={() => {
                      setOpen(!open);
                    }}>
                    <View
                      style={{
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <MaterialIcons
                        name={open ? 'arrow-drop-up' : 'arrow-drop-down'}
                        size={25}
                      />
                    </View>
                  </Pressable>
                </View>
              </Pressable>
            </View>

            <Pressable
              onPress={() => {
                setOcc(true);
              }}>
              <View
                style={{
                  flex: 1,
                  borderRadius: 13,
                  padding: 10,
                  opacity: isOcc ? 1 : 0.7,
                  // borderColor: isOcc ? 'white' : 'transparent',
                  // borderWidth: 1,
                  backgroundColor: '#171717',
                  // ...styles.container,
                }}>
                <Text style={{color: Color.white}}>Occurence</Text>

                <View style={{justifyContent: 'center', paddingVertical: 3}}>
                  <TextInput
                    style={{padding: 0}}
                    inputMode="numeric"
                    value={
                      occurences == 0
                        ? null
                        : occurences === 'Invalid date format'
                        ? null
                        : occurences.toString()
                    }
                    onChangeText={text => {
                      setEndDate(
                        calculateDatebyOccurence(
                          start_date,
                          convertToType(repeatInd),
                          repeatVal + 1,
                          start_time,
                          text == '' ? 0 : parseInt(text),
                        ),
                      );
                      setOccurences(text == '' ? 0 : parseInt(text));
                      setOcc(true);
                    }}
                    // placeholder="Enter number of occurences"
                  />
                </View>
              </View>
            </Pressable>
          </View>
          {open ? (
            <View style={{opacity: isOcc ? 0.7 : 1}}>
              <DateTimeScrollablePicker
                handleForDate={handleForDate}
                handleForTime={handleForTime}
                newDate={newDate}
                open={open}
                newTime={newTime}
                bgColor={'#171717'}
              />
            </View>
          ) : null}
        </>
      ) : null}
      </View>
    </View>
  );
};

const getStyles = Color => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: Color.textfieldContainer,
    },
  });
  return styles;
};

export default EndComponent;
