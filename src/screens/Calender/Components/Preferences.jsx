import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import { setColorCode, setDetails, setPriority } from '../slices/SaveSlice.jsx';
const colors = [
  '#7DF2FA',
  '#90F5AD',
  '#B2B0FF',
  '#D5A1EE',
  '#F5FE88',
  '#F6BCFF',
  '#FFB481',
];
const textColors = [
  '#7D7C7C',
  '#7D7C7C',
  '#F1EFEF',
  '#EEEDED',
  '#352F44',
  '#7D7C7C',
  '#F5F5DC',
];
const Preferences = () => {
  const Color = useSelector(state => state.theme).Colors;
  const styles = getStyles(Color);
  const ViewObj=useSelector(state=>state.CalendarReducers.view_card_states);
  const priorityarr=['Low','Medium','High'];
  // console.log("PRIORITY=",ViewObj.priority);
  const [priority, setEventPriority] = useState(
    ViewObj.isEdit?priorityarr[parseInt(ViewObj.priority)]:
    'Medium');
  let ind=0;
  const findColor=(color)=>{
    console.log(color);
    let ind=0;
     colors.map((data,index)=>{
           if(color==data)
           {
            console.log("MATCHED",index);
             ind=index;
           }
     })
     return ind+1;
  }
  const [INDEX, setINDEX] = useState(
    ViewObj.isEdit?findColor(ViewObj.colour_code): 0);
  const colorRef = React.createRef();
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(setPriority(priority=='Medium'?1:priority=='Low'?0:2))
    dispatch(setColorCode(INDEX == 0 ? 'transparent' : colors[INDEX - 1]));
    if (INDEX >= 4)
      colorRef.current.scrollToOffset({animated: true, offset: 200});
    else if (INDEX < 4)
      colorRef.current.scrollToOffset({animated: true, offset: 0});
    
  }, [priority, INDEX]);
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      {/* Preferences Title  */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          marginVertical: 10,
          marginLeft: 5,
        }}>
        <Text
          style={{
            fontSize: 15,
            color: Color.textfield_fontBaseColor,
            fontWeight: '700',
          }}>
          Preferences
        </Text>
      </View>
      {/* Priority */}
      <Priority priority={priority} setPriority={setEventPriority} />
      {/* Color Component  */}
      <ColorComponent INDEX={INDEX} setINDEX={setINDEX} colorRef={colorRef} />
      {/* Notes Component  */}
      <NotesComponent />
    </View>
  );
};
function Priority({priority, setPriority}) {
  const Color = useSelector(state => state.theme).Colors;
  const styles = getStyles(Color);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          ...styles.container,
          padding: 10,
          marginBottom: 10,
          borderRadius: 13,
        }}>
        <View style={{marginRight: 10, justifyContent: 'center'}}>
          <Text style={{color: Color.textfield_fontInactive}}>Priority</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{color: Color.textfield_fontWrite}}>{priority}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Pressable
            onPress={() => {
              priority == 'Low' ? setPriority('Medium') : setPriority('Low');
            }}>
            {priority != 'Low' ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems:'center',
                  backgroundColor: '#66E5B0',
                  // opacity: priority == 'Low' ? 1 : 0.5,
                  padding: priority == 'Low' ? 8 : 10,
                  borderRadius: 100,
                  height: 50,
                  width: 50,
                  borderWidth: priority == 'Low' ? 2 : 0,
                  borderColor: Color.white,
                }}>
                <Text style={{color: Color.textfield_fontWrite}}>Low</Text>
              </View>
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  backgroundColor: '#66E5B0',
                  // opacity: priority == 'Low' ? 1 : 0.5,
                  padding: priority == 'Low' ? 8 : 10,
                  borderRadius: 100,
                  height: 50,
                  width: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  // borderWidth: priority == 'Low' ? 2 : 0,
                  // borderColor: Color.white,
                }}>
                <Image
                  style={{
                    width: 45,
                    height: 45,
                    borderRadius: 100,
                    resizeMode: 'contain',
                  }}
                  source={{
                    uri: 'https://photos1.blogger.com/blogger/6684/469/1600/Jake%20Glyllenhaal%20smile.0.jpg',
                  }}
                />
              </View>
            )}
          </Pressable>
          <Pressable
            onPress={() => {
              priority == 'High' ? setPriority('Medium') : setPriority('High');
            }}>
            {priority != 'High' ? (
              <View
                style={{
                  justifyContent: 'center',
                  backgroundColor: '#931515',
                  alignItems:'center',
                  // opacity: priority == 'High' ? 1 : 0.5,
                  padding: priority == 'High' ? 8 : 10,
                  borderRadius: 100,
                  height: 50,
                  width: 50,
                  borderWidth: priority == 'High' ? 2 : 0,
                  borderColor: Color.white,
                }}>
                <Text>High</Text>
              </View>
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  backgroundColor: '#931515',
                  // opacity: priority == 'Low' ? 1 : 0.5,
                  padding: priority == 'Low' ? 8 : 10,
                  borderRadius: 100,
                  height: 50,
                  width: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                
                }}>
                <Image
                  style={{
                    width: 45,
                    height: 45,
                    borderRadius: 100,
                    resizeMode: 'contain',
                  }}
                  source={{
                    uri: 'https://photos1.blogger.com/blogger/6684/469/1600/Jake%20Glyllenhaal%20smile.0.jpg',
                  }}
                />
              </View>
              
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}
function ColorComponent({INDEX, setINDEX, colorRef}) {
  const Color = useSelector(state => state.theme).Colors;
  const styles = getStyles(Color);
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          ...styles.container,
          borderRadius: 13,
          marginBottom: 10,
        }}>
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: colors[INDEX - 1],
            borderBottomStartRadius: 13,
            borderTopLeftRadius: 13,
          }}>
          <Text
            style={{
              color:
                INDEX == 0
                  ? Color.textfield_fontInactive
                  : textColors[INDEX - 1],
              marginRight: 50,
              marginLeft: 10,
            }}>
            Color
          </Text>
        </View>

        <View style={{justifyContent: 'center', marginLeft: 10}}>
          <Pressable
            onPress={() => {
              if (INDEX > 1) {
                setINDEX(INDEX - 1);
              }
            }}>
            <MaterialIcons
              name="chevron-left"
              size={20}
              color={Color.textfield_fontBaseColor}
              style={{opacity: INDEX > 1 ? 0.5 : 0}}
            />
          </Pressable>
        </View>
        <View style={{flex: 1, justifyContent: 'center', padding: 10}}>
          <FlatList
            data={colors}
            horizontal={true}
            scrollEnabled={true}
            style={{flex: 1}}
            ref={colorRef}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{paddingVertical: 6, marginHorizontal: 6}}
                  key={INDEX}>
                  <Pressable
                    onPress={() => {
                      if (INDEX != index + 1) {
                        setINDEX(index + 1);
                      } else {
                        setINDEX(0);
                      }
                    }}>
                    <View
                      style={{
                        backgroundColor: item,
                        height: 30,
                        width: 30,
                        borderRadius: 25,

                        // opacity: INDEX == index + 1 ? 1 : 0.5,
                        borderWidth: 2,
                        borderColor:
                          INDEX == index + 1 ? Color.white : 'transparent',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}></View>
                  </Pressable>
                </View>
              );
            }}
          />
        </View>
        <View style={{justifyContent: 'center', marginRight: 10}}>
          <Pressable
            onPress={() => {
              if (INDEX < colors.length) {
                setINDEX(INDEX + 1);
              }
            }}>
            <MaterialIcons
              name="chevron-right"
              color={Color.textfield_fontBaseColor}
              style={{opacity: INDEX < colors.length ? 0.5 : 0}}
              size={20}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
function NotesComponent() {
  const Color = useSelector(state => state.theme).Colors;
  const styles = getStyles(Color);
  const ViewObj=useSelector(state=>state.CalendarReducers.view_card_states);
  const [txt,setTxt]=useState(ViewObj.isEdit?ViewObj.details:'');
  const dispatch=useDispatch();
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          padding: 10,
          height: 100,
          borderRadius: 13,
          ...styles.container,
        }}>
        <TextInput
          multiline={true}
          placeholder="Notes..."
          value={txt}
          onChangeText={(e)=>{
             dispatch(setDetails(e));
             setTxt(e);
          }}
          placeholderTextColor={Color.textfield_fontInactive}
          style={{
            fontSize: 15,
            maxHeight: 100,
            lineHeight: 5,
            color: Color.textfield_fontWrite,
          }}></TextInput>
      </View>
    </View>
  );
}
const getStyles = Color => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: Color.textfieldContainer,
    },
  });
  return styles;
};

export default Preferences;
