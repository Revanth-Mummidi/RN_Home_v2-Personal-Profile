import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TextInput,
  ScrollView,
  Button,
  TouchableOpacity,
  Pressable,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import React, {useRef, useState, useEffect, useMemo} from 'react';
import axios from 'axios';
import ReminderCard from '../Components/ReminderCard';
import DatePicker from 'react-native-date-picker';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import NewTask from './NewTask';
import data from '../BackEnd/ReminderData';
import {AppHeader, HandleBottomSheet} from '../../_components';
import Bottomsheet from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../../../../src/themes/components/ThemeContext';
import {Colors} from '../../../themes';
import CardSheet from './CardSheet';
import LinearGradient from 'react-native-linear-gradient';
import { color } from 'react-native-reanimated';

const HEIGHT = Dimensions.get('window').height;

const TasksStack = () => {
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  const navigation = useNavigation();
  const [newDate, setDate] = useState(new Date());
  const [INDEX, setIndex] = useState(0);
  const [dataFetched, setData] = useState(null);
  const [dataLength, setDataLength] = useState(0);
  const [currIndex, setCurrentIndex] = useState(0);
  const [currStep, setCurrentStep] = useState(0);
  const [searchDate, setSearchDate] = useState(false);
  const [cardHeight, setHeight] = useState(112.33333587646484);
  const refCreateTask = React.useRef(null);
  const refViewTask = React.useRef(null);
  const ref = useRef(null);
  const snapPoints = useMemo(() => ["1%","50%", "95%"], []);
  const cardData = [
    {
      alarm_status: '',
      colour_code: '',
      confirm_date: '',
      confirm_end_time: '',
      confirm_start_time: '',
      details: 'running helps in losing weight quickly',
      eh_grp_id: '',
      eh_sch_evnt_id: '',
      eh_user_id: '00911000000003',
      end_date: '',
      end_time: 'nan:nan:nan',
      event_by: 'user',
      event_date: '2022-11-28T00:00:00',
      event_grp_id: '',
      event_id: 544,
      event_name: 'run for 45 mins',
      event_note_data: [[Object]],
      event_occurance_data: [],
      event_occurance_id: '',
      is_never: 0,
      month: 'November',
      occurance: '',
      priority: '2',
      sch_cat_id: '',
      sch_event_id: '',
      start_date: '2022-11-28T11:45:34',
      start_time: '11:45:34',
      status: 'confirmed',
      year: 2022,
    },
    {
      alarm_status: '',
      colour_code: '#90F5AD',
      confirm_date: '',
      confirm_end_time: '',
      confirm_start_time: '',
      details: 'exercise helps in decreasing weight',
      eh_grp_id: '',
      eh_sch_evnt_id: '',
      eh_user_id: '00911000000003',
      end_date: '',
      end_time: 'nan:nan:nan',
      event_by: 'user',
      event_date: '2022-12-23T00:00:00',
      event_grp_id: '',
      event_id: 596,
      event_name: 'visit an orthopedic doctor',
      event_note_data: [],
      event_occurance_data: [],
      event_occurance_id: '',
      is_never: 0,
      month: 'December',
      occurance: '',
      priority: '2',
      sch_cat_id: '',
      sch_event_id: '',
      start_date: '2022-12-23T07:50:00',
      start_time: '07:50:00',
      status: 'confirmed',
      year: 2022,
    },
    {
      alarm_status: '',
      colour_code: '#D5A1EE',
      confirm_date: '',
      confirm_end_time: '',
      confirm_start_time: '',
      details: 'sdssdfdfff',
      eh_grp_id: '',
      eh_sch_evnt_id: '',
      eh_user_id: '00911000000003',
      end_date: '',
      end_time: 'nan:nan:nan',
      event_by: 'user',
      event_date: '2023-01-31T00:00:00',
      event_grp_id: '',
      event_id: 597,
      event_name: 'Run in the afternoon',
      event_note_data: [],
      event_occurance_data: [],
      event_occurance_id: '',
      is_never: 0,
      month: 'January',
      occurance: '3',
      priority: '1',
      sch_cat_id: '',
      sch_event_id: '',
      start_date: '2023-01-31T14:30:30',
      start_time: '09:30:30',
      status: 'confirmed',
      year: 2023,
    },
    {
      alarm_status: '',
      colour_code: '#B2B0FF',
      confirm_date: '',
      confirm_end_time: '',
      confirm_start_time: '',
      details: 'walking helps in good blood circulation',
      eh_grp_id: '',
      eh_sch_evnt_id: '',
      eh_user_id: '00911000000006',
      end_date: '',
      end_time: '0.0:0.0:0.0',
      event_by: 'user',
      event_date: '2023-02-21T00:00:00',
      event_grp_id: '',
      event_id: 606,
      event_name: 'walk for 150 mins',
      event_note_data: [[Object]],
      event_occurance_data: [],
      event_occurance_id: '',
      is_never: 0,
      month: 'February',
      occurance: '',
      priority: '1',
      sch_cat_id: '',
      sch_event_id: '',
      start_date: '2023-02-21T07:45:45',
      start_time: '07:45:45',
      status: 'confirmed',
      year: 2023,
    },
    {
      alarm_status: '',
      colour_code: '#7DF2FA',
      confirm_date: '2023-10-30T10:50:21',
      confirm_end_time: '0 days 12:50:21',
      confirm_start_time: '0 days 10:50:21',
      details: 'Task Details',
      eh_grp_id: '',
      eh_sch_evnt_id: '',
      eh_user_id: '0910000000046',
      end_date: '2023-10-20T10:50:21',
      end_time: '12.0:50.0:21.0',
      event_by: 'user',
      event_date: '2023-10-30T00:00:00',
      event_grp_id: '',
      event_id: 619,
      event_name: 'medicines',
      event_note_data: [[Object]],
      event_occurance_data: [],
      event_occurance_id: 149,
      is_never: 0,
      month: 'October',
      occurance: '10',
      priority: '1',
      sch_cat_id: '',
      sch_event_id: '',
      start_date: '2023-10-10T10:50:21',
      start_time: '10:50:21',
      status: 'confirmed',
      year: 2023,
    },
  ];
  const FetchEvents = async () => {
    try {
      const AuthToken =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjk2NTExMDc2LCJqdGkiOiI4ZGVjNGExMi1hNTcxLTRjNDEtOTRlZC05NzI3MDg1M2YyYjAiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMDkxMDAwMDAwMDA0NiIsIm5iZiI6MTY5NjUxMTA3Nn0.MYdqBgz6_-Ru8b1Mu1B8286aknzkTZ9DRyq7cVBcchM';

      const data = await axios.post(
        'https://app.evaluatehealth.world/calendar/calender/fetchEvents?period=previous',
        {},
        {
          headers: {
            Authorization: `Bearer ${AuthToken}`,
          },
        },
      );

      const allEvents = [];

      const keys = Object.keys(data.data.event_data);

      for (let i = 0; i < keys.length; i++) {
        const eventData = data.data.event_data[keys[i]];

        if (eventData) {
          let data = Object.keys(eventData)[0];

          allEvents.push(...eventData[data]);
        }
      }

      allEvents.sort((a, b) => {
        const dateA = new Date(a.start_date);
        const dateB = new Date(b.start_date);
        return dateA - dateB;
      });

      setData(allEvents);
      setDataLength(allEvents.length);
      console.log('allEvents',allEvents);
    } catch (error) {
      console.log('error while fetching data: ', error);
    }
  };
  const createNewTask = () => {
    // console.log('In bottom ');
    return <NewTask />;
  };
  const viewCard = () => {
    // console.log('In bottom ');
    return (
      <CardSheet refCreateTask={refCreateTask} refViewTask={refViewTask} />
    );
  };
  const addTasks = () => {
    // refCreateTask.current?.snapToIndex(1);
    refCreateTask.current?.open();
  };
  const viewSheet = () => {
    refViewTask.current.open();
  };
  const handleOnConfirm = event => {
    setSearchDate(false);
    setIndex(findIndex(event));
    setDate(event);
  };
  // Binary search Logic for finding Index
  const findIndex = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let countSteps = 0;
    let lowerBound = 0;
    let upperBound = reminders.length - 1;
    let newIndex = 0;
    let up = 0;
    while (lowerBound <= upperBound) {
      const mid = Math.floor((lowerBound + upperBound) / 2);
      const feed = reminders[mid];
      if (feed.year < year) {
        newIndex = mid + 1;
        lowerBound = mid + 1;
      } else if (feed.year === year) {
        if (feed.monthNo < month) {
          newIndex = mid + 1;
          lowerBound = mid + 1;
        } else if (feed.monthNo === month) {
          if (feed.day < day) {
            newIndex = mid + 1;
            lowerBound = mid + 1;
          } else if (feed.day === day) {
            upperBound = mid - 1;
            newIndex = mid;
            up = up + 1;
          } else {
            upperBound = mid - 1;
          }
        } else {
          upperBound = mid - 1;
        }
      } else {
        upperBound = mid - 1;
      }
      countSteps++;
    }
    lowerBound = 0;
    upperBound = reminders.length - 1;
    while (lowerBound <= upperBound) {
      const mid = Math.floor((lowerBound + upperBound) / 2);
      const feed = reminders[mid];
      if (feed.year < year) {
        lowerBound = mid + 1;
      } else if (feed.year === year) {
        if (feed.monthNo < month) {
          lowerBound = mid + 1;
        } else if (feed.monthNo === month) {
          if (feed.day < day) {
            lowerBound = mid + 1;
          } else if (feed.day === day) {
            lowerBound = mid + 1;
            up = mid;
          } else {
            upperBound = mid - 1;
          }
        } else {
          upperBound = mid - 1;
        }
      } else {
        upperBound = mid - 1;
      }
      countSteps++;
    }
    console.log(
      'In BinarySearch CountSteps=',
      countSteps,
      'Data Length=',
      reminders.length,
    );
    if (newIndex >= reminders.length) {
      alert('Enter a proper date');
      return INDEX;
    }

    if (newIndex >= 0 && newIndex < reminders.length) {
      const today = new Date();
      up = lowerBound - newIndex;
      console.log('newIND', newIndex, 'up', up, 'lb', lowerBound);
      if (
        today.getDate() === day &&
        today.getMonth() === month - 1 &&
        today.getFullYear() === year
      ) {
        setCurrentStep(lowerBound - newIndex);
      }
    }

    return newIndex;
  };
  const YourListItem = React.memo(({item, index}) => {
    return (
      <Pressable
        onPress={() => {
          viewSheet();
        }}>
        <View
          onLayout={e => {
            const {height} = e.nativeEvent.layout;
            if (height != cardHeight) setHeight(height);
          }}
          style={{
            backgroundColor: '#F6F4EB',
            // backgroundColor:item.colour_code,
            borderRadius: 15,
            overflow: 'hidden',
            // margin: 5,
            marginTop: index == 0 ? 8 : 0,
            marginBottom: 8,
          }}>
          <ReminderCard
            item={item}
            key={index}
            backgroundColor={
              index < currIndex
                ? '#7E1717'
                : index >= currIndex && index < currIndex + currStep
                ? '#B9B4C7'
                : '#213555'
            }
          />
        </View>
      </Pressable>
    );
  });

  const reminders = [...data].sort((a, b) => {
    if (a.year > b.year) {
      return 1;
    } else if (a.year == b.year) {
      if (a.monthNo > b.monthNo) {
        return 1;
      } else if (a.monthNo == b.monthNo) {
        return a.day > b.day ? 1 : -1;
      } else {
        return -1;
      }
    } else {
      return -1;
    }
  });

  useEffect(() => {
    FetchEvents();
    setCurrentIndex(findIndex(new Date()));
    setIndex(findIndex(new Date()));
  }, []);

  useEffect(() => {
    if (cardHeight != 0)
      ref.current.scrollToOffset({
        animated: true,
        offset: INDEX * cardHeight + 8 * INDEX,
      });
  }, [INDEX, cardHeight]);

  return (
    <>
      {/* App Header */}
      <Header />
      <View
        style={{flex: 1, flexDirection: 'column', backgroundColor: '#272829'}}>
        <View style={{height: HEIGHT - 110}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              paddingHorizontal: 10,
            }}>
            {/* Render Reminder Cards  */}
            <FlatList
              data={reminders}
              ref={ref}
              showsVerticalScrollIndicator={false}
              initialNumToRender={reminders.length} // Adjust as needed
              maxToRenderPerBatch={100}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return <YourListItem item={item} index={index} />;
              }}
            />
          </View>
          <View>
            {/* Search Date */}
            <SearchDate setSearchDate={setSearchDate} />
            {/* Add Button  */}
            <CreateNewTask addTasks={addTasks} />
          </View>
        </View>

        <DatePicker
          modal
          mode="date"
          open={searchDate}
          date={newDate}
          onConfirm={handleOnConfirm}
          onCancel={() => {
            setSearchDate(false);
          }}
        />
       
        <HandleBottomSheet
          dragFromTop={true}
          containerStyle={{backgroundColor: Color.calen_card_bg}}
          bottomSheetRef={refCreateTask}
          content={createNewTask()}
          height={HEIGHT}
          draggableIcon={{backgroundColor: Color.WHITE, width: 100}}
        />
        <HandleBottomSheet
          dragFromTop={true}
          containerStyle={{backgroundColor: Color.calen_card_bg}}
          bottomSheetRef={refViewTask}
          content={viewCard()}
          height={HEIGHT}
          draggableIcon={{backgroundColor: Color.WHITE, width: 100}}
        />
      </View>
      {/* <Bottomsheet
          ref={refCreateTask}
          contentContainerStyle={{backgroundColor: Color.calen_card_bg}}
          // containerHeight={HEIGHT}
          handleStyle={{backgroundColor: Color.calen_card_bg,margin:0}}
          handleIndicatorStyle={{backgroundColor:'black'}}
         
          backgroundStyle={{color:'black'}}
          snapPoints={snapPoints}
          index={2}
          onChange={() => {}}>
           
          <ScrollView
           horizontal={false}
             scrollEnabled={true}
             showsVerticalScrollIndicator={false}
             nestedScrollEnabled={true}
          >
          <NewTask />
          </ScrollView>
        
        </Bottomsheet> */}
    </>
  );
};

function Header() {
  const [selectedId, setSelectedId] = useState(0);
  const months = [3, 6, 8, 9];
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  return (
    <AppHeader
      suffix={'Actions'}
      user={selectedId}
      onPressIcon={id => {
        setSelectedId(id);
      }}
      rightElement={
        <ScrollView
          vertical
          showsVerticalScrollIndicator={false}
          pagingEnabled
          decelerationRate={0.3}
          contentContainerStyle={{alignItems: 'center', marginRight: 10}}
          style={{
            height: 35,
            overflow: 'hidden',
          }}>
          {months.map((month, index) => (
            <Pressable key={index}>
              <View
                style={{
                  backgroundColor: Color.header_iconActive,
                  borderRadius: 20,
                  height: 35,
                  width: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: Color.badge,
                    fontSize: 17,
                    fontWeight: '600',
                    fontFamily: 'CircularStd-Book',
                  }}>
                  {month}{' '}
                  <Text
                    style={{
                      color: Color.badge,
                      fontSize: 11,
                      fontFamily: 'CircularStd-Book',
                    }}>
                    M
                  </Text>
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      }
      showProfileBadge={true}
      profileBadge={'2'}
    />
  );
}
function CreateNewTask({addTasks}) {
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  const styles = getStyles(Color);
  return (
    <LinearGradient
      colors={[Color.buttonLinear1, Color.buttonLinear2, Color.buttonLinear3]}
      style={styles.add}>
      <TouchableOpacity onPress={() => addTasks()}>
        <IconEntypo name={'plus'} size={28} color={Color.buttonlinearIcon} />
      </TouchableOpacity>
    </LinearGradient>
  );
}
function SearchDate({setSearchDate}) {
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  return (
    <View
      style={{
        // width: '100%',
        backgroundColor: '#80B3FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 5,
      }}>
      <Pressable
        onPress={() => {
          setSearchDate(true);
        }}>
        <Text style={{fontSize: 20, color: Color.white}}>Search Date</Text>
      </Pressable>
    </View>
  );
}

export default TasksStack;
const getStyles = Color => {
  const styles = StyleSheet.create({
    add: {
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
      shadowColor: Color.buttonLinear1,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.8,
      shadowRadius: 8.62,
      elevation: 10,
      position: 'absolute',
      bottom: 50,
      right: 15,
      zIndex: 999,
      // backgroundColor: "#279AC6",
    },
  });
  return styles;
};
// Find Index Logic in Linear Search

// const findIndex = date => {
//   const year = date.getFullYear();
//   const month = date.getMonth() + 1;
//   const day = date.getDate();
//   let countSteps=0;
//   let upperBound = 0;
//   let newIndex = 0;
//   {
//     reminders.map((feed, index) => {
//       if (feed.year < year) {
//         newIndex = newIndex + 1;
//       } else if (feed.year == year) {
//         if (feed.monthNo < month) {
//           newIndex = newIndex + 1;
//         } else if (feed.monthNo == month) {
//           if (feed.day < day) {
//             newIndex = newIndex + 1;
//           } else if (feed.day == day) {
//             upperBound = upperBound + 1;
//           }
//         }
//       }
//       countSteps++;
//     });
//   }
//   if (
//     today.getDate() == date.getDate() &&
//     today.getMonth() == date.getMonth() &&
//     today.getFullYear() == date.getFullYear()
//   ) {
//     console.log('in today',data.length);
//     setCurrentStep(upperBound);
//   }
//   if (newIndex >= reminders.length) {
//     alert('Enter proper date');
//     return 0;
//   }
//   return newIndex;
// };
