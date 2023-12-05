import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color} from '../../../../themes';
import styles from '../../utils/PersonalStyles';
import {useDispatch, useSelector} from 'react-redux';
import getStyles from '../../utils/PersonalStyles';
import { getColor } from '../../../../themes/GetColor';
const QRCode = () => {
  const CurrentProfile=useSelector(state=>state.PersonalReducers.general_states).current_user_profile;
  const styles=getStyles();
  const Color=getColor(useSelector(state=>state.theme.theme));
  return (
    <View style={{...styles.parentWidth}}>
      <Text style={[styles.heading17, styles.headingStyle]}>
        Personal EHID {'\n'}
        <Text style={styles.subHeading13}>How others can connect you</Text>
      </Text>
      <View
        style={{
          height: 300,
          margin: 10,
          backgroundColor: Color.aquaBlue,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>QRCode area </Text>
      </View>
      <Text
        style={{
          ...styles.heading17,
          textAlign: 'center',
        }}>
        EHID {CurrentProfile.eh_user_id}
      </Text>

      <Text style={{...styles.subtitle13, textAlign: 'center'}}>
        Access to public Profile and Basic details
      </Text>
    </View>
  );
};

export default QRCode;
