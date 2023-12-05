import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../themes/ResponsiveDimensions';
import IconOcticons from 'react-native-vector-icons/Octicons';

const CustomToast = ({
  visible,
  onClose,
  title,
  bg,
  icon,
  iconColor,
  msgColor,
}) => {
  console.log(title)
  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, 2000);
  }, [visible]);

  return (
    <View style={[styles.container, {backgroundColor: bg}]}>
      <IconOcticons
        name={icon}
        size={16}
        style={[
          {
            color: iconColor,
          },
        
        ]}
      />
      <Text style={[styles.message, {color: msgColor}]}>{title}</Text>
    </View>
  );
};

export default CustomToast;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: responsiveHeight(7),
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '500',
    marginLeft: responsiveWidth(2),
    color: 'white',
  },
  iconStyle: {
   
  },
});
