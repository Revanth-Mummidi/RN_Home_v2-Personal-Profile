import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import Lottie from 'lottie-react-native';
import {responsiveHeight, responsiveWidth} from '../../../themes/ResponsiveDimensions';
import {darkThemeColors} from '../utils/Colors';
const Loader = ({visible}) => {
  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0.5}
      style={{justifyContent: 'center', alignItems: 'center'}}>
      <Lottie
        source={require('../../../assets/json/multiColorDots.json')}
        autoPlay
        loop
        style={styles.loader}
      />
    </Modal>
  );
};

export default Loader;
const styles = StyleSheet.create({
  loader: {
    width: '100%',
    height: '100%',
  },
});
