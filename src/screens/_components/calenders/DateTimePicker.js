import {Text, StyleSheet, View, Dimensions} from 'react-native';
import React, {Component} from 'react';
import DatePicker from 'react-native-date-picker';

export default class DateTimePicker extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    preciseTime: this.props.preciseTimings,
    currentTime: new Date(),
    count: 0,
  };
  handleDate = e => {
    var arr = this.state.preciseTime;
    arr[this.state.count - 1] = e.toTimeString();
    var dateobject = new Date();
    dateobject.setHours(e.toTimeString().split(':')[0]);
    dateobject.setMinutes(e.toTimeString().split(':')[1]);
    this.setState({preciseTime: arr, currentTime: dateobject});
  };
  displayTime = () => {
    var string1 = this.state.currentTime.toTimeString().split(':');
    var hours = string1[0];
    var suffix = 'AM';
    if (string1[0] > 12) {
      hours = `0${string1[0] - 12}`.slice(-2);
      suffix = 'PM';
    }
    return hours + ' : ' + string1[1] + ' ' + suffix;
  };
  render() {
    return (
      <View>
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'Circular Std',
            color: '#286BBC',
            paddingVertical: '5%',
          }}>
          {this.displayTime()}
        </Text>
        <DatePicker
          mode="time"
          date={this.state.currentTime}
          onDateChange={this.handleDate}
          androidVariant="iosClone"
          textColor="gray"
          fadeToColor="white"
          textStyle={{backgroundColor: 'blue'}}
          style={{
            width: Dimensions.get('screen').width / 2,
            fontFamily: 'Circular Std',
            height: 100,
            marginVertical: '5%',
            borderColor: 'gray',
            color: 'white',
            borderRadius: 100,
          }}
          customStyles={{
            dateInput: {
              backgroundColor: 'blue',
            },
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
