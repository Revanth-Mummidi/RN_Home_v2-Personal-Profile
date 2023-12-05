import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {Color} from '../../../themes';

const RandomDaysPicker = () => {
  const [random, setRandom] = useState([]);
  const WIDTH = Dimensions.get('screen').width;
  const numbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  const keyExtractor = useCallback((item, index) => index.toString(), []);
  return (
    <View>
      <FlatList
        data={numbers}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        numColumns={Math.ceil(WIDTH / 100) + Math.ceil(WIDTH / 100) - 3}
        style={{marginHorizontal: 10}}
        renderItem={({item, index}) => (
          <View>
            <TouchableOpacity
              style={{
                margin: 8,
              }}
              onPress={() => {
                if (random?.includes(item)) {
                  setRandom(random.filter(it => it != item));
                } else {
                  setRandom([...random, item]);
                }
              }}>
              <View
                style={{
                  backgroundColor: random?.includes(item)
                    ? '#48CAE4'
                    : Color.WHITE,
                  borderWidth: 1,
                  borderColor: 'lightgray',
                  width: 35,
                  height: 45,
                  shadowRadius: 2,
                  shadowOffset: {width: -2, height: -2},
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: random?.includes(item) ? Color.WHITE : '#000',
                    fontSize: 14,
                    fontFamily: 'CircularStd-Medium',
                  }}>
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 10,
          marginTop: 10,
        }}>
        <View
          style={{
            width: 23,
            height: 23,
            borderRadius: 6,
            borderWidth: 2,
            borderColor: Color.midBlue,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 14,
              height: 14,
              borderRadius: 4,
              backgroundColor: Color.midBlue,
            }}
          />
        </View>
        <Text style={{marginLeft: 10, fontWeight: '500', color: Color.BLACK}}>
          Repeat this format
        </Text>
      </View>
    </View>
  );
};

export default RandomDaysPicker;

const styles = StyleSheet.create({});
