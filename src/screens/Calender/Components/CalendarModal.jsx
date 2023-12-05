import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {Colors, Color} from '../../../themes';
import {ThemeContext} from '../../../themes/components/ThemeContext.js';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ScrollPicker } from '../../_components';

const CalendarModal = ({duration, title,handleDuration,onClickOk}) => {
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const flatListRef = useRef(null);
  const Color = Colors(theme);
  const styles = getStyles(Color);
  const [Item, setCenterItem] = useState(20);
  const [Index,setIndex]=useState(1);
 
  return (
    <View style={styles.ModalContainer}>
      <View style={styles.DurationModal}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingVertical: 20,
              // backgroundColor: '#3085C3',
              ...styles.container,
            }}>
            <Text style={{fontSize: 15, fontWeight: '700', color: 'white'}}>
              {title}
            </Text>
          </View>
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
              // backgroundColor: '#EEEEEE',
              backgroundColor:'#BBBBBB',
            }}>
            <View style={{width: '100%'}}>
             
               <View style={{alignItems:'center'}}>
                <ScrollPicker
                  selectedIndex={1}
                  onValueChange={(data,selectedIndex) => {
                    setCenterItem(data);
                    setIndex(selectedIndex);
                  }}
                  dataSource={duration}
                  wrapperHeight={130}
                  // HighlightColour={'#48CAE4'}
                  HighlightColour={'#2B2B2B'}
                  selectedFontColor='#ECDBBA'
                  // selectedBackgroundColor={'#48CAE4'}
                  fontSize={15}
                  HighlightfontSize={20}
                  wrapperWidth={200 * 0.4}
                  wrapperColor="transparent"
                  itemHeight={40}
                  highlightColor="#d8d8d8"
                  highlightBorderWidth={200}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 2,
              borderBottomColor: 'white',
            }}></View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              ...styles.container,
              // backgroundColor: '#3085C3',
            }}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  onClickOk();
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '700',
                    color: 'white',
                    padding: 20,
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, alignItems: 'center'}}>
              <TouchableOpacity onPress={()=>{
                 onClickOk(); 
                 handleDuration(Item,Index); 
              }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '700',
                    color: 'white',
                    padding: 20,
                  }}>
                  Ok
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CalendarModal;

const getStyles = Color => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: Color.textfieldContainer,
    },
    DurationModal: {
      width: 260,
      height: 260,
      borderRadius: 20,
      overflow: 'hidden',
      backgroundColor: 'grey',
    },
    ModalContainer: {
      flex: 1,
      // flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00000099',
    },
  });
  return styles;
};

// const onFlatListScroll = event => {
//   const offsetY = event.nativeEvent.contentOffset.y;
//   const itemHeight = 70; // Adjust this based on your item width
//   const centerIndex = Math.round(offsetY / itemHeight) + 1;

//   if (centerIndex >= 0 && centerIndex < duration.length) {
//     const centerItemValue = duration[centerIndex];
//     setCenterItem(centerItemValue);
//   }
// };
 {/* <MaterialIcons
                name="arrow-right"
                style={{
                  position: 'absolute',
                  top: 49,
                  color: '#3085C3',
                  left: 40,
                }}
                size={40}
              /> */}
              {/* <FlatList
                data={duration}
                snapToAlignment="center"
                showsVerticalScrollIndicator={false}
                // decelerationRate={'fast'}
                ref={flatListRef}
                onScroll={onFlatListScroll}
                scrollEnabled={true}
                initialScrollIndex={0.9}
                horizontal={false}
                snapToInterval={0}
                renderItem={({item, index}) => {
                  // console.log(item.value);
                  return (
                    <View style={{alignItems: 'center'}}>
                      {index != 0 && index != duration.length - 1 ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 60,
                            height: 50,
                            margin: 10,
                            backgroundColor: '#176B87',
                            borderRadius: 20,
                          }}>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text style={{color: 'white', fontSize: 20}}>
                              {item.value}
                            </Text>
                            <Text
                              style={{
                                color: 'white',
                                fontSize: 10,
                                marginLeft: 5,
                              }}>
                              {item.type}
                            </Text>
                          </View>
                        </View>
                      ) : (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 60,
                            height: 50,
                            margin: 13,
                            // backgroundColor: 'blue',
                            borderRadius: 20,
                          }}></View>
                      )}
                    </View>
                  );
                }}
              /> */}