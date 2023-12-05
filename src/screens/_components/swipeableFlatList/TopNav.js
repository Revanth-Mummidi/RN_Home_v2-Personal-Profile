import React, {useCallback, useMemo, useRef} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Color} from '../../theme';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const HEIGHT = Dimensions.get('window').height;

const SpecialPackTopNav = () => {
  const navigation = useNavigation();

  return (
    <>
      <View tabLabel="Calendar" style={styles.mainContainer}>
        {/* <CalenderFunctional /> */}

        {/* <View style={styles.add}>
          <TouchableOpacity onPress={() => navigation.navigate('Scheduler')}>
            <View style={styles.neoOuterAdd}>
              <View inner style={styles.neoInnerAdd}>
                <IconFontAwesome name={'plus'} size={23} color={Color.WHITE} />
              </View>
            </View>
          </TouchableOpacity>
        </View> */}
      </View>

      <View style={styles.add}>
        <TouchableOpacity onPress={() => navigation.navigate('CustomReminder')}>
          <IconFontAwesome name={'plus'} size={23} color={Color.WHITE} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SpecialPackTopNav;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Color.cloudBlue,
    flexDirection: 'column',
  },
  neoOuterAdd: {
    backgroundColor: Color.blue,
    width: 46,
    height: 46,
    shadowRadius: 2,
    shadowOffset: {width: 2, height: 2},
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  neoInnerAdd: {
    backgroundColor: Color.blue,
    width: 43,
    height: 43,
    shadowRadius: 2,
    shadowOffset: {width: -2, height: -2},
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  add: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    shadowColor: Color.blue,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 8.62,
    elevation: 10,
    position: 'absolute',
    top: HEIGHT / 1.22,
    right: 15,
    zIndex: 999,
    backgroundColor: '#279AC6',
  },
});
