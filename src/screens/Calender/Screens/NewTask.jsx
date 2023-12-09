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
import {getApiKey} from '../../../utils/LocalStorage';
import React, {useState, useRef, useEffect} from 'react';
import {Base_URLs} from '../../Home/utils/HomeAPI';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {TextInputFields} from '../../_components';
import ProfileSlider from '../Components/ProfileSlider.jsx';
import DatePicker from 'react-native-date-picker';
import CalendarModal from '../Components/CalendarModal';
import RepeatRepeatModal from '../Components/RenderRepeatModal';
import Preferences from '../Components/Preferences';
import EndComponent from '../Components/EndComponent';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import DateTimeScrollablePicker from '../Components/DateTimeScrollablePicker';
import {and} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {
  ClearSaveTask,
  setDay,
  setDetails,
  setDuration,
  setEventName,
  setHour,
  setIsWeek,
  setMonth,
  setStartDate,
  setStartTime,
  setWeeks,
} from '../slices/SaveSlice.jsx';
import {
  AddTimeToDate,
  ConvertDateTimeToCompleteString,
  DateTimeCompleteString,
  FormatDateAndTime,
  TimeWithAmAndPM,
} from '../utils/Formats.js';
import { getColor } from '../../../themes/GetColor.js';
import { setCurrentDate } from '../slices/CalendarStates.jsx';
import { EditEvent, EditEventOccurances, SaveCalendarEvent } from '../utils/CalendarServerRequests.js';
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
const ConvertRepetationToFormat=(month,day,hour)=>{
   return `${month}:${day}:${hour}`;
}

function getSelectedDays(weeksArray) {
  const selectedDays = [];
  weeksArray.forEach((value, index) => {
    if (value === 1) {
      selectedDays.push(index);
    }
  });
  const ans= selectedDays.join('');
  return ans;
}



const NewTask = ({refCreateTask}) => {
  
  // const Color={...useSelector(state => state.theme).Colors};
  const Color=getColor(useSelector(state => state.theme.theme));
  // const colorObj=await JSON.parse(Color);
  // console.log("Colors=",Color);
  const styles = getStyles(Color);
  const SaveObj = useSelector(state => state.CalendarReducers.savetask);
  console.log("Selected ",SaveObj.group_eh_user_id)
  const EditObject = useSelector(state => state.CalendarReducers.view_card_states);
  const [repeat, setRepeat] = useState(false);
  const dispatch=useDispatch();
  const CurrentProfile=useSelector(state=>state.CalendarReducers.calend_dependent_users).selected_main_dependant_users;
   console.log("CURRENT PROFILE=",CurrentProfile.user_first_name);
  const isWeek = SaveObj.isWeek;
  useEffect(()=>{
    if(EditObject.isEdit){
      // console.log(EditObject.EditObj.event_name,"EDIT OBJECT");
      dispatch(setEventName(EditObject.EditObj.event_name));
      dispatch(setDetails(EditObject.EditObj.details));
    }
  },[]);
  const handleSave = async () => {

      refCreateTask.current.close();
   
    dispatch(setCurrentDate(new Date()));
    // const apiURL = Base_URLs.Save_Event_URL;
    const authToken =CurrentProfile.access_token;
    const payload = {
      tag: ['EH1'],
      note: [
        {
          note: 'ON medicines',
          note_status: 'testing saveEvents',
        },
      ],
      eh_user_ids:SaveObj.group_eh_user_id
    };
   const queryParams={
    event_name:SaveObj.event_name,
    details:SaveObj.details,
    start_date:SaveObj.start_date,
    end_date:SaveObj.end_date,
    start_time:SaveObj.start_time,
    end_time:SaveObj.end_time,
    priority:SaveObj.priority,
    repetation_criteria:ConvertRepetationToFormat(SaveObj.month,SaveObj.day,SaveObj.hour),
    repetation_by_weeks:getSelectedDays(SaveObj.weeks),
    occurance:SaveObj.occurance,
    duration:SaveObj.duration,
    status:'confirmed',
    eh_user_id:CurrentProfile.eh_user_id,
    colour_code:SaveObj.colour_code,  
   }
   console.log("SAVED EVENT=",queryParams);
  
   
    try {
      const res=await SaveCalendarEvent(authToken,queryParams,payload);
      console.log("Successfully Saved");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    
  };
  return (
    <View
      style={{
        flexDirection: 'column',
        paddingHorizontal: 10,
        backgroundColor: Color.calen_card_bg,
        paddingTop: 10,
      }}>
      {/* Task For Person  */}
      <TaskFor />
      {/* Task Details Entry Section */}
      <TaskEntry />
      {/* Remind Me on Section  */}
      <RemindDateAndDuration />
      {/* Repeat Every Section  */}
      <RepeatSection repeat={repeat} setRepeat={setRepeat} />
      {/* If repeat is true RepeatRepeatModal and EndComponent is shown  */}
      {repeat ? (
        <View>

          {/* Shows Repeat categories */}
          <RepeatRepeatModal />

          {/* Shows End Date and Number of Occurences  */}
          {isWeek != -1 ? (
            <EndComponent/>
          ) : null}

        </View>
      ) : null}
      {/* Preference Section */}
      <Preferences/>
      {/* Save Button  */}
      {
      !(EditObject.isEdit)
      ?
      (<SaveButton handleSave={handleSave} />)
      :
      (<EditButton refCreateTask={refCreateTask}/>)
      }
      {/* Edit Button  */}
    </View>
  );
};

function TaskFor() {
  const Color = useSelector(state => state.theme).Colors;
  const styles = getStyles(Color);
  return (
    <View>
      <Text
        style={{
          fontWeight: '600',
          color: Color.textfield_fontBaseColor,
        }}>
        Task For
      </Text>
      <ProfileSlider ActiveColor="#99FEFF" InActiveOpacity={0.5} isSave={true} />
    </View>
  );
}
function TaskEntry() {
  const Color = useSelector(state => state.theme).Colors;
  // const [TaskDetails, setTaskDetails] = useState('');
  const TaskObj=useSelector( state => state.CalendarReducers.view_card_states);
  const [txt,setTxt]=useState(TaskObj.isEdit?TaskObj.event_name:'');
  const dispatch = useDispatch();
  return (
    <View style={{paddingVertical: 10}}>
      <TextInputFields
        label={'Task Details'}
        value={txt}
        autoFocus={true}
        
        onChange={text => {
          // setTaskDetails(text);
          setTxt(text);
          dispatch(setEventName(text));
          // setSavedData({...savedData, details: text});
        }}
      />
    </View>
  );
}
function RemindDateAndDuration() {
  const dispatch = useDispatch();
  const Color = useSelector(state => state.theme).Colors;
  const ViewObj=useSelector(state=>state.CalendarReducers.view_card_states);
  const [newDate, setDate] = useState(ViewObj.isEdit?new Date(ViewObj.confirm_date):new Date());
  const [newTime, setTime] = useState(new Date());
  const [open, setOpen] = useState(false);
  const styles = getStyles(Color);
  const [duration, setDur] = useState({time: '15', unit: 'M'});
  const [selectedInd, setSelectedInd] = useState(2);
  const CurrentProfile=useSelector(state=>state.CalendarReducers.calend_dependent_users).selected_main_dependant_users;
  // console.log("MAIN PROFILE=",CurrentProfile);
  const DurData = [
    {time: '5', unit: 'M'},
    {time: '10', unit: 'M'},
    {time: '15', unit: 'M'},
    {time: '20', unit: 'M'},
    {time: '30', unit: 'M'},
    {time: '40', unit: 'M'},
    {time: '50', unit: 'M'},
    {time: '1', unit: 'H'},
    {time: '2', unit: 'H'},
    {time: '3', unit: 'H'},
    {time: '4', unit: 'H'},
    {time: '5', unit: 'H'},
    {time: '6', unit: 'H'},
  ];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const handleForDate = event => {
    setDate(event);
  };
  const handleForTime = event => {
    setTime(event);
  };
  useEffect(() => {
    let t1 = AddTimeToDate(newDate, newTime);
    const {date, time} = FormatDateAndTime(t1);
    dispatch(setStartDate(date));
    dispatch(setStartTime(time));
  }, [newDate, newTime]);
  useEffect(() => {
    const {time, unit} = duration;
    let t1 = parseInt(time);
    if (unit == 'H') {
      t1 = t1 * 60;
    }
    dispatch(setDuration(t1.toString()));
  }, [duration]);
  return (
    <View>
      <Pressable
        onPress={() => {
          setOpen(!open);
        }}
        style={{
          backgroundColor: Color.textfieldContainer,
          borderRadius: 13,
          padding: 10,
        }}>
        <Text style={{color: Color.textfield_fontBaseColor}}>Remind me on</Text>

        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{ConvertDateTimeToCompleteString(newDate, newTime)}</Text>
            <Text
              style={{
                backgroundColor: Color.badge_bg,
                color: Color.badge,
                marginHorizontal: 10,
                borderRadius: 5,
                paddingHorizontal: 10,
                paddingVertical: 2,
              }}>
              {duration.time} {duration.unit == 'M' ? 'min' : 'hr'}
            </Text>
          </View>
          <MaterialIcons
            name={open ? 'arrow-drop-up' : 'arrow-drop-down'}
            size={25}
          />
        </View>

        {open ? (
          <>
            <DateTimeScrollablePicker
             activeColor={Color.badge_bg}
              newDate={newDate}
              newTime={newTime}
              handleForDate={handleForDate}
              handleForTime={handleForTime}
              open={open}
              txtColor={Color.calend_txt_color1}
            />
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: Color.white, marginTop: 10}}>Duration</Text>
            </View>

            <View style={{flex: 1, justifyContent: 'center', padding: 10}}>
              <FlatList
                data={DurData}
                horizontal={true}
                scrollEnabled={true}
                style={{flex: 1}}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{paddingVertical: 6, marginHorizontal: 6}}
                      key={index}>
                      <Pressable
                        onPress={() => {
                          setSelectedInd(index);
                          setDur(item);
                        }}
                        style={{
                          //backgroundColor: Color.badge_bg ,
                          backgroundColor:
                            selectedInd == index
                              ? Color.badge_bg
                              : Color.calen_card_bg,
                          borderRadius: 90,
                          width: 45,
                          height: 45,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            //color: Color.badge,
                            color:
                              selectedInd == index
                                ? Color.calen_card_bg
                                : Color.badge_bg,
                            textAlign: 'center',
                            fontWeight: '700',
                            fontSize: 15,
                          }}>
                          {item.time}
                          {'\n'}
                          <Text
                            style={{
                              fontSize: 11,
                            }}>
                            {item.unit}
                          </Text>
                        </Text>
                      </Pressable>
                    </View>
                  );
                }}
              />
            </View>
          </>
        ) : null}
      </Pressable>
    </View>
  );
}
function RepeatSection({repeat, setRepeat}) {
  const Color = useSelector(state => state.theme).Colors;
  const Event = useSelector(state => state.CalendarReducers.savetask);
  const styles = getStyles(Color);
  const selectedWeeks = Event.weeks;
  const isWeek = Event.isWeek;
  const dispatch = useDispatch();
  let startingDate = Event.start_date;
  startingDate = DateTimeCompleteString(startingDate);
  let ActiveWeeks = Event.weeks;
  const hour = Event.hour;
  const month = Event.month;
  const day = Event.day;
  const WeeksInShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  const RemoveWeek = index => {
    let arr = ActiveWeeks;
    arr = arr.map((data, key) => {
      if (key == index) {
        return 0;
      } else {
        return data;
      }
    });
    dispatch(setWeeks(arr));
  };
  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 10,
        },
      ]}>
      <View
        style={[
          {
            ...styles.RepeatValue,
          },
          repeat
            ? {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }
            : null,
        ]}>
        <View
          style={{
            justifyContent: 'flex-start',
          }}>
          <Text style={{color: Color.textfield_fontInactive}}>
            {isWeek != -1 ? 'Repeat every' : 'Repeat'}
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
            {isWeek == 0 ? (
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{justifyContent: 'center'}}>
                  {isWeek != 1 ? (
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      {month ? (
                        <View
                          style={{
                            backgroundColor: Color.badge_bg,
                            padding: 5,
                            borderRadius: 5,
                            marginRight: 10,
                          }}>
                          <Text style={{color: Color.calen_card_bg}}>
                          {month>1?`${month} months`:`${month} month`}
                          </Text>
                        </View>
                      ) : null}
                      {day ? (
                        <View
                          style={{
                            backgroundColor: Color.badge_bg,
                            padding: 5,
                            borderRadius: 5,
                            marginRight: 10,
                          }}>
                          <Text style={{color: Color.calen_card_bg}}>
                          {day>1?`${day} days`:`${day} day`}
                          </Text>
                        </View>
                      ) : null}
                      {hour ? (
                        <View
                          style={{
                            backgroundColor: Color.badge_bg,
                            padding: 5,
                            borderRadius: 5,
                          }}>
                          <Text style={{color: Color.calen_card_bg}}>
                            {hour>1?`${hour} hours`:`${hour} hour`}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  ) : (
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <FlatList
                        data={ActiveWeeks}
                        horizontal={true}
                        renderItem={({item, index}) => {
                          return (
                            <View key={index}>
                              {item == 1 ? (
                                <View>
                                  <TouchableOpacity
                                    onPress={() => {
                                      RemoveWeek(index);
                                    }}>
                                    <View
                                      style={{
                                        backgroundColor:
                                          Color.textfield_fontInactive,
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
                              ) : null}
                            </View>
                          );
                        }}
                      />
                    </View>
                  )}
                </View>
                <View style={{justifyContent: 'center', marginLeft: 10}}>
                  <Pressable
                    onPress={() => {
                      dispatch(setIsWeek(-1));
                      dispatch(setHour(0));
                      dispatch(setDay(0));
                      dispatch(setMonth(0));
                      dispatch(setWeeks([0, 0, 0, 0, 0, 0, 0]));
                      setRepeat(false);
                    }}>
                    <MaterialIcons
                      size={20}
                      name="remove-circle"
                      color={Color.textfield_fontInactive}
                      style={{opacity: 0.7}}
                    />
                  </Pressable>
                </View>
              </View>
            ) : isWeek == 1 ? (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <ScrollView horizontal={true} scrollEnabled={true} style={{flex:1,flexDirection:'row'}}>
                {selectedWeeks.map((data, index) => {
                  if (data) {
                    return (
                      // <ScrollView scrollEnabled={true} horizontal={true} key={}>
                      <View
                        key={index}
                        style={{
                          padding: 4,
                          backgroundColor: Color.calend_newtask_card_bgColor,
                          borderRadius: 200,
                          margin: 5,
                          height: 30,
                          width: 30,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: Color.calend_newtask_endComponent_bgColor,
                            fontWeight: '700',
                          }}>
                          {WeeksInShort[index]}
                        </Text>
                      </View>
                      // </ScrollView>
                    );
                  }
                })}
                <View style={{justifyContent: 'center'}}>
                  <Pressable
                    onPress={() => {
                      dispatch(setIsWeek(-1));
                      dispatch(setWeeks([0, 0, 0, 0, 0, 0, 0]));
                    }}>
                    <MaterialIcons
                      size={20}
                      name="remove-circle"
                      color={Color.textfield_fontInactive}
                      style={{opacity: 0.7}}
                    />
                  </Pressable>
                </View>
                </ScrollView>
              </View>
            ) : (
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{justifyContent: 'center'}}>
                  <Text style={{color: Color.textfield_fontWrite}}>
                    Only once on {startingDate}
                  </Text>
                </View>
              </View>
            )}
            <View style={{alignItems: 'center'}}>
              <MaterialIcons
                name={repeat ? 'arrow-drop-up' : 'arrow-drop-down'}
                size={25}
                color={Color.textfield_fontInactive}
              />
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
function SaveButton({handleSave}) {
  
  const SaveObj=useSelector(state=>state.CalendarReducers.savetask);
  const Color = useSelector(state => state.theme).Colors;
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
          // console.log("SAVE DETAILS=",SaveObj);
        }}>
        <LinearGradient
          colors={[
            Color.buttonLinear1,
            Color.buttonLinear2,
            Color.buttonLinear3,
          ]}
          style={{
            height: 45,
            width: 85,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            borderRadius: 14,
            marginTop: 10,
            marginRight: 10,
            marginBottom: 70,
          }}>
          <Text style={{color: Color.WHITE, fontWeight: '500'}}>Save</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}
function EditButton({refCreateTask}){
  
    const Color = useSelector(state => state.theme).Colors;
    const SaveObj = useSelector(state => state.CalendarReducers.savetask);
    const EditObject = useSelector(state => state.CalendarReducers.view_card_states);
    const handleEdit=async()=>{
       try{
           const authToken='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzAxNDk2MTgxLCJqdGkiOiIzNGU0N2I0ZS01ZGQwLTRkMjktYjIxMS1hYmQyMDZmYjQ4NTQiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMDkxMDAwMDAwMDA0NiIsIm5iZiI6MTcwMTQ5NjE4MX0.GkB7RokJpLvFikmOoSmn1zBwn3j_HADTWSVN2C10QQQ';
           const queryParams={
            event_id:EditObject.EditObj.event_id,
            event_name:SaveObj.event_name,
            status:SaveObj.status,
            details:SaveObj.details,
            priority:SaveObj.priority,
            duration:SaveObj.duration,
            colour_code:SaveObj.colour_code,
            note:SaveObj.details,
           }
           console.log("QUERY PARAMS=",queryParams);
           const res=await EditEvent(authToken,queryParams);
           console.log("SUCCESSFULLY EDITED ",res);
       }
       catch(err){
        console.log("ERROR IN EDIT BASIC EVENT",err);
        throw err;
       }
    }
    const handleEditOccurances=async()=>{
      try{
        const authToken='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzAxNDk2MTgxLCJqdGkiOiIzNGU0N2I0ZS01ZGQwLTRkMjktYjIxMS1hYmQyMDZmYjQ4NTQiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMDkxMDAwMDAwMDA0NiIsIm5iZiI6MTcwMTQ5NjE4MX0.GkB7RokJpLvFikmOoSmn1zBwn3j_HADTWSVN2C10QQQ';
        const queryParams={
         event_id:EditObject.EditObj.event_id,
         event_occurance_id:EditObj.EditObj.event_occurance_id,
         start_date:SaveObj.start_date,
         end_date:SaveObj.end_date,
         start_time:SaveObj.start_time,
         end_time:SaveObj.end_time,
         repetation_criteria:ConvertRepetationToFormat(SaveObj.month,SaveObj.day,SaveObj.hour),
         repetation_by_weeks:getSelectedDays(SaveObj.weeks),
         occurance:SaveObj.occurance,
        }
        const res=await EditEventOccurances(authToken,queryParams);
        console.log("SUCCESSFULLY EDITED ",res);
    }
    catch(err){
     console.log("ERROR IN EDIT OCCURANCE EVENT",err);
     throw err;
    }
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          // justifyContent: 'flex-end',
        }}>
       
        <Pressable
          onPress={async() => {
            await handleEdit();
            await handleEditOccurances();
            // console.log("SAVE DETAILS=",SaveObj);
          }}>
          <LinearGradient
            colors={[
              Color.buttonLinear1,
              Color.buttonLinear2,
              Color.buttonLinear3,
            ]}
            style={{
              height: 45,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
              borderRadius: 14,
              marginTop: 10,
              marginRight: 10,
              marginBottom: 70,
            }}>
            <Text style={{color: Color.WHITE, fontWeight: '500'}}>Modify All Upcoming Events</Text>
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

const OldNewTask = () => {
  const Color = useSelector(state => state.theme).Colors;
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
    // const authToken=await getApiKey();
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
    <View
      style={{
        flexDirection: 'column',
        paddingHorizontal: 10,
        backgroundColor: Color.calen_card_bg,
        paddingTop: 10,
      }}>
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
      {/* If repeat is true RepeatRepeatModal and EndComponent is shown  */}
      {repeat ? (
        <View>
          {/* Shows Repeat categories */}
          <RepeatRepeatModal
            setRepeatInd={setRepeatInd}
            setRepeatVal={setRepeatVal}
            AddWeek={AddWeek}
            repeatInd={repeatInd}
            repeatVal={repeatVal}
          />

          {/* Shows End Date and Number of Occurences  */}
          {repeatInd != 4 ? (
            <>
              {/* <View style={{flex: 1, height: 1, backgroundColor:Color.calen_card_bg}}/> */}
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

function OldRemindDateAndDuration({
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
  // const {theme, toggleTheme} = React.useContext(ThemeContext);
  // const Color = Colors(theme);
  const Color = useSelector(state => state.theme).Colors;
  const styles = getStyles(Color);
  const formattedTime = newTime.toLocaleString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
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
          <Text style={{color: Color.textfield_fontInactive}}>
            Remind me on
          </Text>
          <View style={{flex: 1, flexDirection: 'row', paddingVertical: 3}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={{color: Color.textfield_fontWrite}}>
                {newDate.getDate()} {months[newDate.getMonth()]}{' '}
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
                    color={Color.calend_icon_color1}
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
            <Text style={{color: Color.textfield_fontInactive}}>Duration</Text>

            <Text
              style={{paddingVertical: 9, color: Color.textfield_fontWrite}}>
              {centerItem}
              {centerIndex > 4 ? '' : 'in'}
            </Text>
          </View>
        </Pressable>
      </View>
      {open ? (
        <DateTimeScrollablePicker
        activeColor={Color.badge_bg}
          newDate={newDate}
          newTime={newTime}
          handleForDate={handleForDate}
          handleForTime={handleForTime}
          bgColor={Color.textfieldContainer}
          txtColor={Color.calend_txt_color1}
          open={open}
        />
      ) : null}
    </View>
  );
}
