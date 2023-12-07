import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color} from '../../../../themes';
import styles from '../../utils/PersonalStyles';
import {useDispatch, useSelector} from 'react-redux';
import getStyles from '../../utils/PersonalStyles';
import {getColor} from '../../../../themes/GetColor';
import {getQRCode} from '../../utils/PersonalServerRequests';
import { responsiveHeight } from '../../../../themes/ResponsiveDimensions';
const QRCode = () => {
  const CurrentProfile = useSelector(
    state => state.PersonalReducers.general_states,
  ).current_user_profile;
  const styles = getStyles();
  const Color = getColor(useSelector(state => state.theme.theme));
  return (
    <View style={{...styles.parentWidth}}>
      <Text style={[styles.heading17, styles.headingStyle]}>
        Personal EHID {'\n'}
        <Text style={styles.subHeading13}>How others can connect you</Text>
      </Text>
      {/* <View
        style={{
          height: 300,
          margin: 10,
          backgroundColor: Color.aquaBlue,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>QRCode area </Text>
      </View> */}
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {CurrentProfile.qr_code_url!='' ? (
          <Image
            source={{
              uri: CurrentProfile.qr_code_url,
            }}
            style={{
              height: responsiveHeight(40),
              // margin: 10,
              width: responsiveHeight(40),
              borderRadius: 10,
              margin: 10,
           
            }}
          />
        ):(
          <View
          style={{
            height: responsiveHeight(40),
            width:responsiveHeight(40),
            margin: 10,
            // backgroundColor: Color.aquaBlue,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Loading ...</Text>
        </View> 
        )}
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
