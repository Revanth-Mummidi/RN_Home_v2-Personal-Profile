import {StyleSheet, Pressable, View, Text, Image} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import { getColor } from '../../../themes/GetColor';
// import {Color} from '../../../themes';

const TileCardContainer = ({
  containerStyle,
  titleStyle,
  title,
  showIcon = false,
  onPressIcon,
  iconStyle,
  icon = (
    <Pressable onPress={onPressIcon}>
      <Image
        style={{
          height: 26,
          width: 26,
          // tintColor: Color.lightGray,
          tintColor:'grey',
          ...iconStyle,
        }}
        source={require('../assets/icons/add-square_bold.png')}
      />
    </Pressable>
  ),
  children,
  childrenStyle,
}) => {
  const styles=getStyles();
  const Color=getColor(useSelector(state=>state.theme.theme));
  return (
    <View style={[styles.Container, containerStyle]}>
      <View style={[styles.headingContainer]}>
        <Text style={[styles.headingStyle, titleStyle]}>{title}</Text>
        {showIcon ? <View style={styles.iconContainer}>{icon}</View> : null}
      </View>
      <View style={[childrenStyle]}>{children}</View>
    </View>
  );
};

export default TileCardContainer;
const getStyles=()=>{
  const Color=getColor(useSelector(state=>state.theme.theme));
const styles = StyleSheet.create({
  Container: {
    width: '100%',
    backgroundColor: Color.WHITE,
    minHeight: 70,
    marginTop: 8,
    paddingBottom: 10,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.29,
    // shadowRadius: 4.65,
    // elevation: 7,
  },
  headingContainer: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 4,
    marginTop: 10,
  },
  headingStyle: {
    width: '90%',
    fontSize: 16,
    fontWeight: '600',
    color: Color.blue,
  },
  iconContainer: {
    width: '10%',
    alignItems: 'center',
  },
});
return styles;

}