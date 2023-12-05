import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {Colors, Color} from '../../../themes/index.js';
import {ThemeContext} from '../../../themes/components/ThemeContext.js';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FlatList} from 'react-native-gesture-handler';
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
const Preferences = ({savedData, setSavedData}) => {
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  const styles = getStyles(Color);

  const [priority, setPriority] = useState('Medium');
  const [INDEX, setINDEX] = useState(0);
  const colorRef = React.createRef();

  useEffect(() => {
    if (INDEX >= 4)
      colorRef.current.scrollToOffset({animated: true, offset: 200});
    else if (INDEX < 4)
      colorRef.current.scrollToOffset({animated: true, offset: 0});
    setSavedData({
      ...savedData,
      priority: priority == 'Medium' ? 1 : priority == 'Low' ? 0 : 2,
      colour_code: INDEX == 0 ? 'transparent' : colors[INDEX - 1],
    });
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
        <Text style={{fontSize: 15, color: Color.white, fontWeight: '700'}}>
          Preferences
        </Text>
      </View>
      {/* Priority */}
      <Priority priority={priority} setPriority={setPriority}/>
      {/* Color Component  */}
      <ColorComponent INDEX={INDEX} setINDEX={setINDEX} colorRef={colorRef} />
       {/* Notes Component  */}
       <NotesComponent />
    </View>
  );
};
function Priority({priority,setPriority}){
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  const styles = getStyles(Color);
  return(
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
            <Text style={{color: Color.white}}>Priority</Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text>{priority}</Text>
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
              <View
                style={{
                  justifyContent: 'center',
                  backgroundColor: '#66E5B0',
                  opacity: priority == 'Low' ? 1 : 0.5,
                  padding: priority == 'Low' ? 8 : 10,
                  borderRadius: 13,
                  borderWidth: priority == 'Low' ? 2 : 0,
                  borderColor: Color.white,
                }}>
                <Text>Low</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                priority == 'High'
                  ? setPriority('Medium')
                  : setPriority('High');
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  backgroundColor: '#931515',
                  opacity: priority == 'High' ? 1 : 0.5,
                  padding: priority == 'High' ? 8 : 10,
                  borderRadius: 13,
                  borderWidth: priority == 'High' ? 2 : 0,
                  borderColor: Color.white,
                }}>
                <Text>High</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
  )
}
function ColorComponent({INDEX,setINDEX,colorRef}){
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  const styles = getStyles(Color);
  return(
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
                color: INDEX == 0 ? Color.white : textColors[INDEX - 1],
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
                style={{opacity: INDEX > 1 ? 0.5 : 0}}
              />
            </Pressable>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', padding: 10}}
          >
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

                          opacity: INDEX == index + 1 ? 1 : 0.5,
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
                style={{opacity: INDEX < colors.length ? 0.5 : 0}}
                size={20}
              />
            </Pressable>
          </View>
        </View>
      </View>
  )
}
function NotesComponent(){
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  const styles = getStyles(Color);
   return(
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
            style={{fontSize: 15, maxHeight: 100, lineHeight: 5}}
          />
        </View>
      </View>
   )
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
