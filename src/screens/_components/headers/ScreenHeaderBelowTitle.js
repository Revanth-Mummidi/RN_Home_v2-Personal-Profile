/// Total height of the component will be around 70,

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import AppStatusBar from './AppStatusBar';
import {useNavigation} from '@react-navigation/native';
import {Color} from '../../../themes';
import {Image} from 'react-native';

const ScreenHeaderBelowTitle = ({
  name,
  rightIcon,
  AppStatusBarColor = '#279AC6',
  linearColor = ['#279AC6', '#279AC6', '#1B88C3'],
}) => {
  const navigation = useNavigation();
  return (
    <>
      <AppStatusBar
        backgroundColor={AppStatusBarColor}
        barStyle="light-content"
        visibleStatusBar={false}
        translucent
      />
      <LinearGradient colors={linearColor} style={styles.linearGradient}>
        <View style={{height: 8}} />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            style={{marginHorizontal: 20, flex: 0.2}}
            onPress={() => navigation.goBack()}>
            <Image
              style={{
                width: 31,
                height: 31,
                tintColor: Color.WHITE,
              }}
              source={require('../assets/icons/arrow-left.png')}
            />
          </TouchableOpacity>

          <View style={{marginHorizontal: 20, flex: 0.1, alignItems: 'center'}}>
            {rightIcon}
          </View>
        </View>
        <View style={{flex: 1, alignItems: 'center', marginTop: 5}}>
          <Text
            numberOfLines={1}
            style={{fontSize: 17, fontWeight: '600', color: Color.WHITE}}>
            {name}
          </Text>
        </View>
        <View style={{height: 13}} />
      </LinearGradient>
    </>
  );
};

export default ScreenHeaderBelowTitle;

const styles = StyleSheet.create({
  linearGradient: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    minHeight: 70,
  },
});
