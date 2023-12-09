import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors, Color} from '../../../themes';
import {ThemeContext} from '../../../themes/components/ThemeContext.js';
import DatePicker from 'react-native-date-picker';
import {useSelector} from 'react-redux';
import {AddTimeToDate} from '../utils/Formats.js';
import { responsiveWidth } from '../../../themes/ResponsiveDimensions';

const DateTimeScrollablePicker = ({
  open = true,
  dobpicker = true,
  // dateandtime = true,
  onlytimepicker = true,
  newDate,
  newTime,
  minimumDate,
  maximumDate,
  handleForTime,
  bgColor = 'transparent',
  handleForDate,
  width=responsiveWidth(150),
  activeColor=Color.badge_bg,
  txtColor = Color.calend_txt_color1,
}) => {
  const Color = useSelector(state => state.theme).Colors;
  const styles = getStyles(Color);
  return (
    <View
      style={{
        borderRadius: 13,
        marginTop: 10,
        backgroundColor: bgColor == '' ? Color.textfieldContainer : bgColor,
        
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'center',overflow:'hidden'}}>
        {/* <View
          style={{
            // backgroundColor: Color.badge_bg,
            position: 'absolute',
            zIndex: -11,
            width: 325,
            height: 53,
            borderWidth:3,
            borderRadius:5,
            opacity:0.8,
            borderColor:'#5a524d',
            alignSelf: 'center',
          }}
        /> */}
        <View
          style={{
            // backgroundColor: '#5a524d',
            backgroundColor: activeColor,
            height: 3,
            width:width,
            zIndex: 9,
            position: 'absolute',
            top: 39,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}
        />
        <View
          style={{
            backgroundColor: activeColor,
            position: 'absolute',
            zIndex: -99,
            width:width,
            height: 47,
            // borderRadius:5,
            opacity: 1,
            alignSelf: 'center',
          }}
        />
        <View
          style={{
            // backgroundColor: '#5a524d',
            backgroundColor: activeColor,
            height: 3,
            width:width,
            zIndex: 9,
            position: 'absolute',
            bottom: 39,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
          }}
        />
        {/* </View> */}
        {
         (dobpicker)?(<View>
            <DatePicker
              mode="date"
              open={open}
              date={newDate}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              // style={{height: 100, maxWidth: 220}}
              androidVariant="nativeAndroid"
              textColor={txtColor}
              fadeToColor={Color.white}
              style={[
                {
                  maxWidth: responsiveWidth(57),
                  fontFamily: 'Circular Std',
                  height: 130,
                  //   marginVertical: '5%',

                  borderColor: 'gray',
                  color: 'white',
                  borderRadius: 100,
                },
              ]}
              onDateChange={handleForDate}
            />
          </View>):null
        }
        { onlytimepicker?(<View>
          <DatePicker
            // modal
            mode="time"
            open={open}
            date={newTime}
            // minimumDate={AddTimeToDate(newDate,newTime)}
            // style={{height: 100, maxWidth: 100}}
            // onConfirm={handleForDate}
            onDateChange={handleForTime}
            androidVariant="nativeAndroid"
            textColor={txtColor}
            fadeToColor="red"
            textStyle={{backgroundColor: 'blue'}}
            style={{
              maxWidth: responsiveWidth(40),
              fontFamily: 'Circular Std',
              height: 130,
              // marginVertical: '5%',
            }}
            customStyles={{
              dateInput: {
                backgroundColor: 'blue',
              },
            }}
            // onCancel={() => {
            //   setOpen(false);
            //   setTimeModal(false);
            // }}
          />
        </View>):null}
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
export default DateTimeScrollablePicker;
