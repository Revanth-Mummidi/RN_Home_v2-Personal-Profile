import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {Colors, Color} from '../../../themes';
import {ThemeContext} from '../../../themes/components/ThemeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ScrollPicker} from '../../_components';
import { useSelector } from 'react-redux';

const DurationModal = ({
  duration,
  title,
  index,
  setRepeatInd,
  setRepeatVal,
  repeatInd,
  repeatVal,
  AddWeek,
}) => {
  // const {theme, toggleTheme} = React.useContext(ThemeContext);
  // const flatListRef = useRef(null);
  // const Color = Colors(theme);
  const Color=useSelector(state=>state.theme).Colors;
  const styles = getStyles(Color);
  const setData = (data, selectedIndex) => {
    setRepeatVal(selectedIndex);
    setRepeatInd(index);
  };

  return (
    <View style={styles.ModalContainer}>
      <View style={[{...styles.DurationModal},(index==repeatInd)?{borderColor:Color.calend_newtask_endComponent_bgColor,borderWidth:0.4}:null]}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Pressable
           >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                paddingVertical: 10,
                // backgroundColor: '#171717',
                backgroundColor:Color.calend_newtask_endComponent_bgColor,
                // ...styles.container,
                overflow:'hidden'
              }}>
              <View style={{flexDirection: 'row'}}>
                {index == 3 ? (
                  <View
                    style={{
                      width: 70,
                      height: 20,
                      backgroundColor: 'brown',
                      position: 'absolute',
                      top: 0,
                      left: -70,
                      zIndex: 999,
                      justifyContent: 'center',
                      alignItems: 'center',
                      transform: [{rotate: '-50deg'}],
                    }}>
                    <Text style={{fontSize: 10, marginLeft: 5}}>30 days</Text>
                  </View>
                ) : null}
                <Text style={{fontSize: 15, fontWeight: '700', color: 'white'}}>
                  {title}
                </Text>
              </View>

              {repeatInd == index ? (
                <View style={{position: 'absolute', right: 11, top: 11}}>
                  <MaterialIcons
                    name="check-circle"
                    size={20}
                    color={Color.textfield_fontInactive}
                  />
                </View>
              ) : null}
            </View>
          </Pressable>
          <View
            style={{
              borderBottomWidth: 2,
              borderBottomColor: 'white',
            }}></View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',

              backgroundColor: Color.calend_newtask_card_bgColor,
            }}>
            <View style={{width: '100%'}}>
              <View style={{alignItems: 'center'}}>
                {index == 2 ? (
                  <View style={{position: 'absolute', right: 15, bottom: 40}}>
                    <Pressable
                      onPress={() => {
                        AddWeek(repeatVal);
                      }}>
                      <MaterialIcons
                        size={20}
                        name="add-circle"
                        color={Color.calend_newtask_endComponent_bgColor}
                      />
                    </Pressable>
                  </View>
                ) : null}

                <ScrollPicker
                  selectedIndex={repeatInd == index ? repeatVal : 1}
                  onValueChange={(data, selectedIndex) => {
                    setData(data, selectedIndex);
                  }}
                  dataSource={duration}
                  wrapperHeight={100}
                  HighlightColour={Color.calend_newtask_endComponent_bgColor}
                  selectedFontColor={'white'}
                  selectedBackgroundColor={'#48CAE4'}
                  fontSize={15}
                  HighlightfontSize={17}
                  wrapperWidth={200 * 0.4}
                  wrapperColor="transparent"
                  itemHeight={40}
                  highlightColor="#d8d8d8"
                  
                  highlightBorderWidth={0}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DurationModal;

const getStyles = Color => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: Color.textfieldContainer,
    },
    DurationModal: {
      width: 150,
      height: 150,
      borderRadius: 20,
      overflow: 'hidden',
      backgroundColor: 'grey',
    },
    ModalContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  return styles;
};

