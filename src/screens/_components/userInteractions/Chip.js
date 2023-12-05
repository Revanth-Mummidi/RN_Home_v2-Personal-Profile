/*
// ************* Usage NOTE ******************
 const [selecteDocumentType, setSelecteDocumentType] = useState('');

                               <Chip
                                key={index}
                                children={item}
                                backgroundColor={Color.theme_bgSecondary}
                                activeColor={Color.color2}
                                leftImageShow={true}
                                onPressChip={() => {
                                  setSelecteDocumentType(item);
                                }}
                                chipClick={selecteDocumentType}
                                onPressLeftImage={() => {
                                  alert(item);
                                }}
                                rightContainerShow={true}
                                onPressRightImage={() => {
                                  alert(item);
                                }}
                              />

*/

import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import {Color} from '../../../themes';

const Chip = ({
  onPressChip,
  clickedChip,
  containerStyle,
  children,
  childrenStyle,
  activeColor = Color.blue,
  backgroundColor = Color.mildAquaBlue,
  leftImageShow,
  leftImageSource,
  onPressLeftImage,
  rightContainerShow,
  rightIconOrImage,
  onPressRightImage,
}) => {
  // console.log(chipClick);
  const onPressChipClicked = () => {
    onPressChip();
  };
  const onPressLeftImageClicked = () => {
    onPressLeftImage();
  };
  const onPressRightImageClicked = () => {
    onPressRightImage();
  };
  return (
    <Pressable onPress={onPressChipClicked}>
      <View
        style={[
          styles.container,
          {
            backgroundColor:
              clickedChip === children ? activeColor : backgroundColor,
          },
          containerStyle,
        ]}>
        {leftImageShow ? (
          <Pressable onPress={onPressLeftImageClicked}>
            <Image
              style={{...styles.imageStyle}}
              resizeMode={'cover'}
              source={{uri: leftImageSource}}
            />
          </Pressable>
        ) : null}

        <Text
          style={[
            styles.title,
            childrenStyle,
            {
              color: clickedChip === children ? backgroundColor : activeColor,
            },
          ]}>
          {children}
        </Text>

        <Pressable onPress={onPressRightImageClicked}>
          {rightContainerShow ? <>{rightIconOrImage}</> : null}
        </Pressable>
      </View>
    </Pressable>
  );
};

Chip.defaultProps = {
  children: 'Title',
  leftImageSource: 'https://i.imgur.com/68jyjZT.jpg',
  rightIconOrImage: (
    <Image
      style={{
        width: 20,
        height: 20,
        borderRadius: 100,
        marginLeft: 10,
        tintColor: Color.lightblue,
      }}
      resizeMode={'cover'}
      source={require('../assets/icons/close-circle.png')}
    />
  ),
};
export default Chip;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    margin: 2,
  },
  imageStyle: {width: 25, height: 25, borderRadius: 100, marginRight: 10},
  title: {
    fontSize: 13,
    fontWeight: '500',
    color: Color.blue,
  },
});
