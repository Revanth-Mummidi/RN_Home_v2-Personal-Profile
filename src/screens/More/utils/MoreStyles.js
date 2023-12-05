/* eslint-disable no-unused-vars */
/* eslint-disable quotes */

import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Color} from '../../../themes';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const Colors = Color;
const styles = Colors => {
  const style = StyleSheet.create({
    parent: {flex: 1, backgroundColor: Color.more_bg, padding: 10},
    icon30: {
      width: 30,
      height: 30,
      borderRadius: 40,
      tintColor: Color.common_blue,
    },
    //rechange
    leftactionText: {
      color: Color.WHITE,
      paddingHorizontal: 20,
      fontWeight: '600',
      fontSize: 15,
    },
    card: {
      marginTop: 20,
      borderRadius: 10,
      padding: 10,
      backgroundColor: Color.more_card,
    },
    titleText: {fontSize: 15, fontWeight: '600', color: Color.more_title},
    button: {
      marginHorizontal: 20,
      marginVertical: 10,
      padding: 10,
      backgroundColor: Color.aquaBlue,
      borderRadius: 8,
      alignItems: 'center',
    },
    scrollbutton: {
      marginHorizontal: 10,
      marginVertical: 10,
      padding: 10,
      backgroundColor: Color.aquaBlue,
      borderRadius: 8,
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 15,
      fontWeight: '600',
      color: Color.blue,
      paddingHorizontal: 10,
    },
    chipButton: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      //   backgroundColor: Color.aquaBlue,
      borderRadius: 28,
      marginRight: 10,
      marginTop: 10,
    },
    submitButton: {borderRadius: 40, paddingHorizontal: 20, paddingVertical: 6},
  });
  return style;
};
export default styles;
