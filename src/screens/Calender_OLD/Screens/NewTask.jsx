import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
  ScrollView,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
// import {FlatList} from 'react-native-gesture-handler';
import {getApiKey} from '../../../utils/LocalStorage';
import React, {useState, useRef, useEffect} from 'react';
import {Base_URLs} from '../../Home/utils/HomeAPI';
import {Colors, Color} from '../../../themes';
import {ThemeContext} from '../../../themes/components/ThemeContext.js';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {ProfileSliderList, TextInputFields} from '../../_components';
import DatePicker from 'react-native-date-picker';
import CalendarModal from '../Components/CalendarModal';
import RenderDurModal from '../Components/RenderRepeatModal';
import Preferences from '../Components/Preferences';
import EndComponent from '../Components/EndComponent';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import DateTimeScrollablePicker from '../Components/DateTimeScrollablePicker';
import {and} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

const saveData = {
  event_name: 'Medicines',
  start_date: '10/10/2023 10:50:21',
  end_date: '20/10/2023 10:50:21',
  start_time: '10:50:21',
  end_time: '12:50:21',
  stat: 'confirmed',
  duration: '30 min',
  details: 'Task Details',
  priority: 1,
  eh_user_id: '',
  // MultiWeek: true ?
  // WeekArray:[1,0,1,0,1,1,1]
  repetation: '10',
  repetation_criteria: 'day',
  occurance: '10',
  colour_code: '#7DF2FA',
  // survey:true,
  // show_EH:true,
  // scheduler:true,
};

const NewTask = () => {
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  const styles = getStyles(Color);
  const flatListRef = useRef(null);
  const HEIGHT = Dimensions.get('window').height;
  const [TaskDetails, setTaskDetails] = useState('');
  const [open, setOpen] = useState(false);
  const [durModal, setDurModal] = useState(false);
  const [timeModal, setTimeModal] = useState(false);
  const [centerItem, setCenterItem] = useState('30 m');
  const [ActiveWeeks, setActiveWeek] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [centerIndex, setCenterIndex] = useState(1);
  const [newDate, setDate] = useState(new Date());
  const [newTime, setTime] = useState(new Date());
  const [repeatInd, setRepeatInd] = useState(4);
  const [repeatVal, setRepeatVal] = useState(1);
  const [repeat, setRepeat] = useState(false);
  const [isMultiWeek, setMultiWeek] = useState(false);
  const [startingDate, setStartingDate] = useState('');
  const [savedData, setSavedData] = useState(saveData);
  const formattedTime = newTime.toLocaleString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const toMonth = month => {
    if (month == 0) return 'Jan';
    else if (month == 1) return 'Feb';
    else if (month == 2) return 'Mar';
    else if (month == 3) return 'Apr';
    else if (month == 4) return 'May';
    else if (month == 5) return 'Jun';
    else if (month == 6) return 'Jul';
    else if (month == 7) return 'Aug';
    else if (month == 8) return 'Sep';
    else if (month == 9) return 'Oct';
    else if (month == 10) return 'Nov';
    else if (month == 11) return 'Dec';
  };
  useEffect(() => {
    let c = 0;
    ActiveWeeks.map((data, index) => {
      if (data == 1) {
        c++;
      }
    });

    if (c != 0) {
      setMultiWeek(true);
    } else {
      setMultiWeek(false);
    }
  }, [ActiveWeeks]);
  useEffect(() => {
    const str =
      newDate.getDate() +
      ' ' +
      toMonth(newDate.getMonth()) +
      ' ' +
      newDate.getFullYear() +
      ' , ' +
      formattedTime;
    setStartingDate(str);
  }, [newDate, newTime]);
  const AddWeek = index => {
    let arr = ActiveWeeks;
    arr = arr.map((data, key) => {
      if (key == index) {
        return 1;
      } else {
        return data;
      }
    });
    setActiveWeek(arr);
  };
  const RemoveWeek = index => {
    let arr = ActiveWeeks;
    arr = arr.map((data, key) => {
      if (key == index) {
        return 0;
      } else {
        return data;
      }
    });
    setActiveWeek(arr);
  };
  function formatTime(inputDate) {
    const date = new Date(inputDate);

    // Extract time components
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Create the formatted time string
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return formattedTime;
  }

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    // Extract date components
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Create the formatted date string
    const formattedDate = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  }

  const handleSave = async () => {
    const apiURL = Base_URLs.Save_Event_URL;
    const authToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjk3ODk0MTMwLCJqdGkiOiJmYzU1OTBiZi02ZmNiLTQ5YzctYjQwOC0yNWE0MzViYzZjNWMiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMDkxMDAwMDAwMDA0NiIsIm5iZiI6MTY5Nzg5NDEzMH0.Jgg39LYcQAm-j-2aroTxvPCQbsWFB2sK_dCPb-Xfo7Y';
    const payload = {
      tag: ['EH1'],
      note: [
        {
          note: 'ON medicines',
          note_status: 'testing saveEvents',
        },
      ],
    };
    const queryParams = {
      event_name: 'Another Medicines',
      start_date: '10/10/2023 10:50:21',
      end_date: '20/10/2023 10:50:21',
      start_time: '10:50:21',
      end_time: '12:50:21',
      status: 'confirmed',
      details: 'Task Details',
      priority: 1,
      eh_user_id: '0910000000046',
      repetation: '10',
      repetation_criteria: 'day',
      occurance: '10',
      colour_code: '#7DF2FA',
    };
    const fullUrl = `${apiURL}?${new URLSearchParams(queryParams).toString()}`;
    console.log(fullUrl);
    // console.log(auth)
    // setSavedData({...savedData,eventName:TaskDetails,startDate:newDate.toString(),start_time:})
    try {
      const response = await axios.post(fullUrl, payload, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }

    console.log(savedData);
  };
  const duration = [
    '10 m',
    '20 m',
    '30 m',
    '40 m',
    '50 m',
    '1 hr',
    '2 hr',
    '3 hr',
    '4 hr',
    '5 hr',
    '6 hr',
    '7 hr',
    '8 hr',
    '9 hr',
    '10 hr',
    '11 hr',
    '12 hr',
  ];

  useEffect(() => {
    setSavedData({
      ...savedData,
      repetation: repeatVal.toString(),
      repetation_criteria:
        repeatInd == 0
          ? 'hour'
          : repeatInd == 1
          ? 'day'
          : repeatInd == 2
          ? 'week'
          : 'month',
    });
    if (repeatInd != 2) {
      setActiveWeek([0, 0, 0, 0, 0, 0, 0]);
    }
  }, [repeatInd, repeatVal]);

  const handleForDate = event => {
    setTimeModal(true);
    setDate(event);
    setSavedData({...savedData, start_date: formatDate(event.toString())});
  };
  const handleDuration = (data, selectedIndex) => {
    setCenterItem(data);
    setCenterIndex(selectedIndex);
  };
  const onClickOk = () => {
    setDurModal(false);
  };
  const handleForTime = event => {
    newDate.setHours(event.getHours());
    newDate.setMinutes(event.getMinutes());
    newDate.setSeconds(event.getSeconds());
    console.log('IN START DATE=', newDate.toLocaleString());
    setTime(event);
    setTimeModal(false);
    setSavedData({...savedData, start_date: formatDate(newDate.toString())});
    console.log('IN START DATE=', savedData.start_date, newTime.toTimeString());
    setSavedData({...savedData, start_time: formatTime(event.toString())});
  };

  return (
   
      // <ScrollView
      //   horizontal={false}
      //   scrollEnabled={true}
      //   showsVerticalScrollIndicator={false}
      //   nestedScrollEnabled={true}>
        <View style={{flexDirection: 'column', paddingHorizontal: 10,backgroundColor:Color.calen_card_bg,paddingTop:10}}>
          {/* Task For Person  */}
          <TaskFor />
          {/* Task Details Entry Section */}
          <TaskEntry
            TaskDetails={TaskDetails}
            setTaskDetails={setTaskDetails}
            savedData={savedData}
            setSavedData={setSavedData}
          />
          {/* Remind Me on Section  */}
          <RemindDateAndDuration
            open={open}
            setOpen={setOpen}
            setDurModal={setDurModal}
            newDate={newDate}
            formatTime={formatTime}
            centerItem={centerItem}
            centerIndex={centerIndex}
            newTime={newTime}
            handleForDate={handleForDate}
            handleForTime={handleForTime}
          />
          {/* Repeat Every Section  */}
          <RepeatSection
            repeat={repeat}
            repeatInd={repeatInd}
            repeatVal={repeatVal}
            ActiveWeeks={ActiveWeeks}
            startingDate={startingDate}
            RemoveWeek={RemoveWeek}
            setRepeat={setRepeat}
            setRepeatInd={setRepeatInd}
            setRepeatVal={setRepeatVal}
          />
          {/* If repeat is true RenderDurModal and EndComponent is shown  */}
          {repeat ? (
            <View>
              {/* Shows Repeat categories */}
              <RenderDurModal
                setRepeatInd={setRepeatInd}
                setRepeatVal={setRepeatVal}
                AddWeek={AddWeek}
                repeatInd={repeatInd}
                repeatVal={repeatVal}
              />

              {/* Shows End Date and Number of Occurences  */}
              {repeatInd != 4 ? (
                <>
                <View style={{flex:1,height:1,backgroundColor:'grey'}}></View>
                <EndComponent
                  savedData={savedData}
                  setSavedData={setSavedData}
                  ActiveWeeks={ActiveWeeks}
                  isMultiWeek={isMultiWeek}
                  start_date={newDate}
                  start_time={newTime}
                  repeatInd={repeatInd}
                  repeatVal={repeatVal}
                />
                </>
              ) : null}
            </View>
          ) : null}
          {/* Preference Section */}
          <Preferences savedData={savedData} setSavedData={setSavedData} />
          {/* Save Button  */}
          <SaveButton handleSave={handleSave} />
          <Modal
            visible={durModal}
            transparent
            onRequestClose={() => {
              setDurModal(false);
            }}>
            <CalendarModal
              duration={duration}
              title={'Choose Duration'}
              handleDuration={handleDuration}
              onClickOk={onClickOk}
            />
          </Modal>
        </View>
      // </ScrollView>
  
  );
};
function TaskFor() {
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  const styles = getStyles(Color);
  return (
    <View>
      <Text
        style={{
          fontWeight: '600',
          color: Color.calen_card_title,
        }}>
        Task For
      </Text>
      <ProfileSliderList ActiveColor="#99FEFF" InActiveOpacity={0.5}/>
    </View>
  );
}
function TaskEntry({TaskDetails, setTaskDetails, savedData, setSavedData}) {
  return (
    <View style={{paddingVertical: 10}}>
      <TextInputFields
        label={'Task Details'}
        value={TaskDetails}
        autoFocus={true}
        onChange={text => {
          setTaskDetails(text);

          setSavedData({...savedData, details: text});
        }}
      />
    </View>
  );
}
function RemindDateAndDuration({
  open,
  setOpen,
  setDurModal,
  newDate,
  centerItem,
  centerIndex,
  newTime,
  handleForDate,
  handleForTime,
}) {
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  const styles = getStyles(Color);
  const formattedTime = newTime.toLocaleString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const toMonth = month => {
    if (month == 0) return 'Jan';
    else if (month == 1) return 'Feb';
    else if (month == 2) return 'Mar';
    else if (month == 3) return 'Apr';
    else if (month == 4) return 'May';
    else if (month == 5) return 'Jun';
    else if (month == 6) return 'Jul';
    else if (month == 7) return 'Aug';
    else if (month == 8) return 'Sep';
    else if (month == 9) return 'Oct';
    else if (month == 10) return 'Nov';
    else if (month == 11) return 'Dec';
  };
  return (
    <View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            flex: 3,
            flexDirection: 'column',
            borderRadius: 13,
            padding: 10,
            marginRight: 10,
            ...styles.container,
          }}>
          <Text style={{color: Color.textfield_fontInactive}}>Remind me on</Text>
          <View style={{flex: 1, flexDirection: 'row', paddingVertical: 3}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text>
                {newDate.getDate()} {toMonth(newDate.getMonth())}{' '}
                {newDate.getFullYear()} , {formattedTime}
              </Text>
            </View>
            <Pressable
              onPress={() => {
                setOpen(!open);
              }}>
              <View
                style={{
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                }}>
                {
                  <MaterialIcons
                    name={open ? 'arrow-drop-up' : 'arrow-drop-down'}
                    size={25}
                  />
                }
              </View>
            </Pressable>
          </View>
        </View>
        <Pressable
          onPress={() => {
            setDurModal(true);
          }}>
          <View
            style={{
              flex: 1,
              borderRadius: 13,
              padding: 10,
              ...styles.container,
            }}>
            <Text style={{color: Color.white}}>Duration</Text>

            <Text style={{paddingVertical: 9}}>
              {centerItem}
              {centerIndex > 4 ? '' : 'in'}
            </Text>
          </View>
        </Pressable>
      </View>
      {open ? (
        <DateTimeScrollablePicker
          newDate={newDate}
          newTime={newTime}
          handleForDate={handleForDate}
          handleForTime={handleForTime}
          open={open}
        />
      ) : null}
    </View>
  );
}
function RepeatSection({
  repeat,
  repeatInd,
  repeatVal,
  ActiveWeeks,
  startingDate,
  setRepeat,
  RemoveWeek,
  setRepeatInd,
  setRepeatVal,
}) {
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  const styles = getStyles(Color);
  const hour = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23,
  ];
  const day = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const Weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const WeeksInShort=['S','M','T','W','T','F','S'];
  const IsMulti = () => {
    let c = 0;
    ActiveWeeks.map((data, index) => {
      if (data == 1) {
        c++;
      }
    });
    return c != 0;
  };

  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 10,
        }
      ]}>
      <View
        style={[{
          ...styles.RepeatValue,
        },
        repeat?{
          borderBottomLeftRadius:0,
          borderBottomRightRadius:0,
        }:null]}>
        <View
          style={{
            justifyContent: 'flex-start',
          }}>
          <Text style={{color: Color.white}}>
            {repeatInd != 4 ? 'Repeat every' : 'Repeat'}
          </Text>
        </View>

        <Pressable
          onPress={() => {
            setRepeat(!repeat);
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 5,
            }}>
            {repeatInd != 4 ? (
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{justifyContent: 'center'}}>
                  {repeatInd != 2 ? (
                    <Text>
                      {repeatInd == 2
                        ? Weeks[repeatVal]
                        : repeatInd == 0
                        ? hour[repeatVal]
                        : repeatInd == 1
                        ? day[repeatVal]
                        : repeatInd == 3
                        ? month[repeatVal]
                        : ''}
                      {repeatInd == 2
                        ? ''
                        : repeatInd == 0
                        ? ' hr'
                        : repeatInd == 1
                        ? repeatVal == 0
                          ? ' day'
                          : ' days'
                        : repeatInd == 3
                        ? repeatVal == 0
                          ? ' month'
                          : ' months'
                        : ''}
                    </Text>
                  ) : IsMulti() ? (
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <FlatList
                        data={ActiveWeeks}
                        // scrollEnabled={false}
                        horizontal={true}
                        renderItem={({item, index}) => {
                          return item == 1 ? (
                            <View key={index}>
                              <TouchableOpacity
                                onPress={() => {
                                  RemoveWeek(index);
                                }}>
                                <View
                                  style={{
                                    backgroundColor: '#BBBBBB',
                                    borderRadius: 50,
                                    height: 30,
                                    width: 30,
                                    padding: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: 5,
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      fontWeight: '900',
                                      color: Color.textfieldContainer,
                                    }}>
                                    {WeeksInShort[index]}
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          ) : null;
                        }}
                      />
                    </View>
                  ) : (
                    <Text>{Weeks[repeatVal]}</Text>
                  )}
                </View>
                <View style={{justifyContent: 'center', marginLeft: 10}}>
                  <Pressable
                    onPress={() => {
                      setRepeatInd(4);
                      setRepeatVal(0);
                    }}>
                    <MaterialIcons
                      size={20}
                      name="remove-circle"
                      style={{opacity: 0.7}}
                    />
                  </Pressable>
                </View>
              </View>
            ) : (
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{justifyContent: 'center'}}>
                  <Text>Only once on {startingDate}</Text>
                </View>
              </View>
            )}
            <View style={{alignItems: 'center'}}>
              <MaterialIcons
                name={repeat ? 'arrow-drop-up' : 'arrow-drop-down'}
                size={25}
              />
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
function SaveButton({handleSave}) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}>
      <Pressable
        onPress={() => {
          handleSave();
        }}>
        <LinearGradient
          colors={['#D0D4CA', '#45474B']}
          style={{
            height: 45,
            width: 85,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            borderRadius: 14,
            marginTop: 10,
            marginRight: 10,
            marginBottom:70,
          }}>
          <Text style={{color: Color.white, fontWeight: '500'}}>Save</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}
export default NewTask;
const getStyles = Color => {
  const styles = StyleSheet.create({
    textFieldReplica: {
      marginBottom: 10,
      paddingVertical: 20,
      paddingHorizontal: 10,
      backgroundColor: Color.aquaBlue,
      borderRadius: 10,
    },
    container: {
      backgroundColor: Color.textfieldContainer,
    },
    Calcontainer: {
      flex: 1,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      padding: 20,
    },
    datePickerStyle: {
      width: 200,
      marginTop: 20,
    },
    DurationModal: {
      width: 260,
      height: 280,
      borderRadius: 20,
      overflow: 'hidden',
      backgroundColor: 'grey',
    },
    ModalContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00000099',
    },
    RepeatValue: {
      flex: 1,
      flexDirection: 'column',
      borderRadius: 13,
      padding: 10,
      // marginTop: 10,
      // marginBottom: 5,
      backgroundColor: Color.textfieldContainer,
    },
    RepeatNoValue: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 13,
      padding: 10,
      backgroundColor: Color.textfieldContainer,
    },
  });
  return styles;
};
