import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {darkThemeColors} from '../../../utils/Colors';
import {useDispatch} from 'react-redux';
import {setUserProfession} from '../../../redux/slices/UserOnboardingSlice';
import {useIsFocused} from '@react-navigation/native';
import {GetOccupation} from '../../../apis/ApiRequests';

const ScrollPicker = ({
  wrapperHeight,
  HighlightColour,
  fontSize,
  HighlightfontSize,
  wrapperWidth,
  wrapperColor,
  itemHeight,
  onValueChange,
  highlightColor,
  selectedBackgroundColor,
  selectedIndex,
  dataSource
}) => {
  const dispatch = useDispatch();

  const [selectedItem, setSelectedItem] = useState(selectedIndex);

  const isFocused = useIsFocused();
 
  const onViewableItemsChanged = useRef(({viewableItems}) => {
    const visibleIndexes = viewableItems.map(item => item.index);

    if (visibleIndexes.length == 3) {
      //    setVisibleItems(visibleIndexes);

      console.log(dataSource[visibleIndexes[1]]);
      setSelectedItem(visibleIndexes[1]);

      dispatch(setUserProfession(dataSource[visibleIndexes[1]]));
      onValueChange(dataSource[visibleIndexes[1]]);
    }
  }).current;
  const renderItem = ({item, index}) => {
    const itemTextStyle = [
      styles.itemText,
      {
        fontSize: fontSize,
        color: darkThemeColors.aquaBlue,
        fontWeight: 'normal',
      },
    ];
    const selectedItemTextStyle = [
      styles.itemText,
      {
        fontSize: HighlightfontSize,
        fontWeight: 'bold',
      },
    ];

    return (
      <TouchableOpacity
        style={{
          height: itemHeight,
          backgroundColor: wrapperColor,
          //   borderColor: highlightColor,
          //  borderWidth: highlightBorderWidth,
          backgroundColor: wrapperColor,
          borderRadius: 5,
          width: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          //style={{color: 'white'}}
          style={
            index === selectedItem ? selectedItemTextStyle : itemTextStyle
          }>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  
  return (
    <View
      style={{height: wrapperHeight, width: wrapperWidth, alignSelf: 'center'}}>
      <LinearGradient
        colors={[
          'transparent',
          'transparent',
          selectedBackgroundColor,
          'transparent',
          'transparent',
        ]}
        style={{flex: 1}}>
        <FlatList
          data={dataSource}
          renderItem={renderItem}
          scrollEnabled
          keyExtractor={(_, index) => index.toString()}
          getItemLayout={(_, index) => ({
            length: itemHeight,
            offset: itemHeight * index,
            index,
          })}
          snapToInterval={itemHeight}
          onViewableItemsChanged={onViewableItemsChanged}
          initialScrollIndex={0}
          showsVerticalScrollIndicator={false}
        />
      </LinearGradient>
    </View>
  );
};

export default ScrollPicker;
const styles = StyleSheet.create({
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    textAlign: 'center',
  },
});
