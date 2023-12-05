{/* 



*/}
import React,{ usevalue } from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import RNListSlider from 'react-native-list-slider';

import Icon from 'react-native-vector-icons/Octicons';
import {Color} from '../../../themes';
import { getColor } from '../../../themes/GetColor';
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');

export default function ListSlider({units,value,setvalue,maxHeight=500}) {

  // value = {
  //   value: 30,
  // };
  
  // onValueChanged = value => this.setvalue({value});
 
  // render() {
    // const [value,setvalue]=usevalue(2);
    const onValueChanged = (x)=>{
        setvalue(x);
        // setValue(x)
        console.log(x);
    }
    const styles=getStyles();
    const Color=getColor(useSelector(value=>value.theme.theme));
    return (
      <View style={styles.OuterBoxContainer}>
        <View style={styles.sliderContainer}>
          <Icon
            name="triangle-down"
            size={28}
            color={Color.textColor}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft:1.5
            }}
          />
          <RNListSlider
            value={value}
            onValueChange={onValueChanged}
            // initialPositionValue={50}
            maximumValue={maxHeight}
            
            multiplicity="1"
            //decimalPlaces="100"
            thumbStyle={styles.thumbStyle}
            itemStyle={styles.itemStyle}
            mainContainerStyle={styles.mainContainerStyle}
            tenthItemStyle={styles.tenthItemStyle}
          
          />

          <View style={styles.belowTextcontainer}>
            <View style={{width: '50%'}}>
              <Text style={styles.textLeftStyle}>{value - 10}</Text>
            </View>
            <View style={{width: '50%'}}>
              <Text style={styles.textRightStyle}>{value + 10}</Text>
            </View>
          </View>
          <View style={styles.textMainStyle}>
            <Text style={styles.textMainValueStyle}>{value}</Text>
            <Text style={styles.textMainUnitStyle}>{units}</Text>
          </View>
        </View>
      </View>
    );
  // }
}

const getStyles=()=>{
  const Color=getColor(useSelector(value=>value.theme.theme));
  const styles = StyleSheet.create({
    OuterBoxContainer: {
      flex: 1,
      paddingTop: 20,
      justifyContent: 'center',
    },
    sliderContainer: {
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    mainContainerStyle: {
      borderColor: Color.gray,
      backgroundColor: Color.eh_cardEdit,
      // backgroundColor:Color.textfieldContainer,
    },
    thumbStyle: {
      borderColor: Color.badge_bg,
      // borderWidth: 1,
      alignItems:'center',
      justifyContent:"center",
      width:10,
      height: 90,
    },
    itemStyle: {
      borderColor: Color.ProfileEditButton,
      height: 40,
    },
    tenthItemStyle: {
      borderColor: Color.ProfileEditButton,
      height: 64,
    },
  
    textMainStyle: {
      fontSize: 17,
      fontWeight: '700',
      color: Color.brown,
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      height: 40,
      justifyContent: 'center',
      //backgroundColor: Color.yellow,
    },
    belowTextcontainer: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      height: 20,
      marginLeft: 50,
      marginRight: 50,
    },
    textLeftStyle: {
      right: 1,
      top: 1,
      alignSelf: 'center',
    },
    textRightStyle: {
      alignSelf: 'center',
      right: -3,
      top: 1,
    },
    textMainValueStyle: {
      fontSize: 28,
      color: Color.badge_bg,
      fontWeight: '700',
      paddingLeft: 10,
      // right: 0,
      // top: 1,
      alignSelf:'center',
      //backgroundColor: Color.aqua,
    },
    textMainUnitStyle: {
      fontSize: 18,
      color: Color.badge_bg,
      fontWeight: '600',
      paddingLeft: 3,
      // backgroundColor: Color.red,
      alignSelf: 'center',
    },
  });
  return styles;
}