import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  Animated,
  Easing,
  Modal,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PushNotification from 'react-native-push-notification';
import React, {useState, useEffect, useRef, useSyncExternalStore} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import {WeeksArr, durationFormat, getWeekNumber} from '../utils/Formats';
import {setEditingObject, setIsEdit} from '../slices/ViewCardSlice';
import {responsiveHeight} from '../../../themes/ResponsiveDimensions';
import {ScrollPicker} from '../../_components';
import NewRepeatModal, { ScrollableComponent } from '../Components/NewRepeatModal';
import { getColor } from '../../../themes/GetColor';
import MultiScrollPicker from '../Components/MultiScrollPicker';
import { DeleteCompleteEvent, DeleteSingleEvent, DeleteSingleOccurance } from '../utils/CalendarServerRequests';
import { getApiKey } from '../../../utils/LocalStorage';
const HEIGHT = Dimensions.get('screen').height;
const item = {
  date: '1 Jan',
  year: '2022',
  week: 'Tue',
  Time: '10:30 - 12:00 am',
  profile:
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
  username: 'user',
  title: 'Take Calcium tablets after 30 min of workout',
  location: '29 Beckhard street, illionas , USA -13308',
  description:
    'Take Calcium tablets after 30 min of workoutTake Calcium tablets after 30 min of workoutTake Calcium tablets after 30 min of workout',
  assessmentTxt: 'Short Description / 25 Questions will take around 10 min',
  HighPriority: true,
  done: false,
};

const CardSheet = ({refCreateTask, refViewTask}) => {
  const [isDone, setDone] = useState(item.done);
  const [showDone, setShowDone] = useState(item.done);
  const dispatch = useDispatch();
  const OpenBottomSheet = () => {
    //  console.log("Clicked Edit");
    dispatch(setIsEdit(true));
    
    refCreateTask.current.open();
  };
  const ItemObj = useSelector(state => state.CalendarReducers.view_card_states);
  return (
    <>
      <View
        style={{marginHorizontal: 15, marginVertical: 10, marginBottom: 40}}>
        <DateAndTime />
        <UserOptions
          isDone={isDone}
          setDone={setDone}
          setShowDone={setShowDone}
          OpenBottomSheet={OpenBottomSheet}
        />
        {isDone ? <ShowDone /> : null}
        <Title />
        {/* <Location />
        <Description />
        <Assessment /> */}
        <Notes />
        <DeleteReminder refViewTask={refViewTask} />
        {ItemObj.priority == '2' ? <HighPriority /> : null}
      </View>
      <Modal transparent visible={showDone}>
        <DoneComponent
          isDone={showDone}
          setDone={setDone}
          setShowDone={setShowDone}
          title={item.title}
        />
      </Modal>
    </>
  );
};

export default CardSheet;

function DateAndTime() {
  const ItemObj = useSelector(state => state.CalendarReducers.view_card_states);
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
  const date = new Date(ItemObj.confirm_date);
  const startDate = new Date(date);
  const minutes = parseInt(ItemObj.duration);
  const endTime = new Date(startDate.getTime() + minutes * 60000);
  return (
    <View style={{flexDirection: 'column', marginBottom: 20}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'baseline',
        }}>
        <Text
          style={{
            fontSize: 25,
            color: 'white',
            fontWeight: 'bold',
            padding: 0,
            margin: 0,
          }}>
          {date.getDate()} {months[date.getMonth()]}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: 'white',
            fontWeight: 'bold',
            marginLeft: 10,
          }}>
          {date.getFullYear()}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'baseline',
        }}>
        <Text style={{color: 'skyblue'}}>{WeeksArr[date.getDay()]}</Text>
        <Text style={{marginLeft: 10}}>
          {durationFormat(startDate.toLocaleTimeString()) +
            '-' +
            durationFormat(endTime.toLocaleTimeString())}
        </Text>
      </View>
    </View>
  );
}
function Title() {
  const ItemObj = useSelector(state => state.CalendarReducers.view_card_states);
  return (
    <View
      style={{
        padding: 15,
        backgroundColor: '#45474B',
        marginTop: 5,
        borderRadius: 13,
      }}>
      <Text style={{fontSize: 15, fontWeight: '700', color: 'white'}}>
        {ItemObj.event_name}
      </Text>
    </View>
  );
}
function UserOptions({isDone, setDone, setShowDone, OpenBottomSheet}) {
  const ItemObj = useSelector(state => state.CalendarReducers.view_card_states);
  const [isShow, setShow] = useState(false);
  const Color = getColor(useSelector(state => state.theme.theme));
  useEffect(() => {
    setDone(isShow);
    if (isShow) {
      setShowDone(true);
    }
  }, [isShow]);
  useEffect(() => {
    createChannels();
  }, []);

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
      channelDescription: 'A channel to categorise your notifications',
    });
  };

  const handleNotification = () => {
    PushNotification.cancelAllLocalNotifications();

    PushNotification.localNotificationSchedule({
      channelId: 'test-channel',
      title: 'Reminder',

      message: ItemObj.event_name,
      actions: ['Snooze', 'Done'],
      date: new Date(Date.now()),
      allowWhileIdle: true,
      invokeApp: false,

      //repeatTime: 2,
    });

    PushNotification.configure({
      onAction: function (notification) {
        if (notification.action === 'Snooze') {
          setTimeout(() => {
            handleNotification();
          }, 5000);
          console.log('Alarm Snoozed');
        } else if (notification.action === 'Done') {
          setDone(true);
          console.log('Alarm Stoped');
          //PushNotification.cancelAllLocalNotifications();
        } else {
          console.log('Notification opened');
        }
      },
      actions: ['Snooze', 'Done'],
    });
  };
  const [isDefer, setDefer] = useState(false);
  const hour = [
    '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23',
  ];
  const day = [
    '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23','24', '25', '26', '27', '28', '29', '30', '31',
  ];
  const week = ['00', '01', '02', '03', '04', '05', '06', '07'];
  const DATA = [
    {
      title: 'Week',
      data: week,
    },
    {
      title: 'Day',
      data: day,
    },
    {
      title: 'Hour',
      data: hour,
    },
  ];
  const [hr,setHr]=useState(0);
  const [wk,setWk]=useState(0);
  const [dy,setDy]=useState(0);
  const [ind,setInd]=useState(0);
  useEffect(()=>{
   console.log("ht,day,week=",hr,wk,dy);
  },[dy,wk,hr]);
  return (
    <View
      style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
      <View
        style={{
          flex: 2,
        }}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 70,
          }}>
          <Image
            source={{
              uri: item.profile,
            }}
            style={{height: 40, width: 40, borderRadius: 40}}
          />

          <Text>{ItemObj.event_by} </Text>
        </View>
      </View>

      <View
        style={{flex: 3, flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <View
          style={{
            flexDirection: 'column',
            // marginRight: 35,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Pressable onPress={OpenBottomSheet}>
            <MaterialIcons
              name="edit"
              size={20}
              style={{
                padding: 10,
                borderRadius: 40,
                backgroundColor: '#286BBC',
                alignItems: 'center',
              }}
            />
          </Pressable>
          <Text style={{alignItems: 'center'}}>Edit</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginHorizontal: 20,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <View
            style={{
              backgroundColor: 'grey',
              height: 30,
              width: 1,
              marginTop: 15,
            }}></View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            // marginRight: 35,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Pressable
            onPress={() => {
              console.log('Alarm');
              setDefer(true);
              // handleNotification();
            }}>
            <MaterialIcons
              name="alarm"
              size={20}
              style={{
                padding: 10,
                borderRadius: 40,
                backgroundColor: '#286BBC',
              }}
            />
          </Pressable>
          <Text style={{alignItems: 'center'}}>Defer</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginHorizontal: 20,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <View
            style={{
              backgroundColor: 'grey',
              height: 30,
              width: 1,
              marginTop: 15,
            }}></View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginRight: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Pressable
            onPress={() => {
              // if (isDone == false)
              // setDone(isDone);
              setShow(!isShow);
            }}>
            <MaterialIcons
              name={isShow ? 'close' : 'check'}
              size={20}
              style={{
                padding: 10,
                borderRadius: 40,
                backgroundColor: isShow ? 'brown' : '#286BBC',
              }}
            />
          </Pressable>
          <Text style={{alignItems: 'center'}}>
            {isShow ? 'Undone' : 'Done'}
          </Text>
        </View>
      </View>
      <Modal
        visible={isDefer}
        animationType="slide"
        transparent
        onRequestClose={() => {
          setDefer(false);
        }}
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.8)'}}>
       <MultiScrollPicker DATA={DATA} setHr={setHr} setWk={setWk} setDy={setDy}/>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Pressable onPress={()=>{
            setHr(0);
            setWk(0);
            setDy(0);
            setDefer(false);
          }}>
            <View style={{backgroundColor:Color.more_cancel,borderRadius:10,padding:10,marginRight:50}}>
              <Text style={{color:Color.textfieldContainer}}>Cancel</Text>
            </View>
          </Pressable>
            <Pressable onPress={()=>{
              setDefer(false);
            }}>
            <View style={{backgroundColor:Color.more_save,borderRadius:10,padding:10}}>
              <Text style={{color:Color.textfieldContainer}}>Save</Text>
            </View>
            </Pressable>
        </View>
        </View>
      </Modal>
    </View>
  );
}
function Location() {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#45474B',
        marginVertical: 5,
        borderRadius: 13,
      }}>
      <MaterialIcons
        name="location-on"
        size={20}
        style={{color: 'skyblue', marginRight: 5}}
      />
      <Text style={{fontSize: 15}}>{item.location}</Text>
    </View>
  );
}
function Description() {
  const [isExpandable, setExpandable] = useState(false);
  return (
    <View
      style={{
        flexDirection: 'column',
        padding: 15,
        backgroundColor: '#45474B',
        borderRadius: 13,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{fontWeight: '800', color: 'white', fontSize: 17}}>
          Description
        </Text>
        <View style={{alignItems: 'flex-end', flex: 1}}>
          <Pressable
            onPress={() => {
              setExpandable(!isExpandable);
            }}>
            <MaterialIcons
              name={isExpandable ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={25}
            />
          </Pressable>
        </View>
      </View>
      {isExpandable ? (
        <View>
          <Text>{item.description}</Text>
        </View>
      ) : null}
    </View>
  );
}
function Assessment() {
  return (
    <View
      style={{
        flexDirection: 'column',
        padding: 15,
        marginTop: 5,
        backgroundColor: '#45474B',
        borderRadius: 13,
      }}>
      <Text style={{fontWeight: '800', color: 'white', fontSize: 17}}>
        Child Assessment
      </Text>
      <Text>{item.assessmentTxt}</Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 10,
        }}>
        <View
          style={{
            height: 40,
            width: 70,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#286BBC',
            borderRadius: 14,
          }}>
          <Text style={{color: 'white'}}>Start</Text>
        </View>
      </View>
    </View>
  );
}
function Notes() {
  const ItemObj = useSelector(state => state.CalendarReducers.view_card_states);
  return (
    <View
      style={{
        backgroundColor: '#45474B',
        padding: 10,
        marginTop: 5,
        borderRadius: 13,
      }}>
      <Text style={{fontWeight: '800', color: 'white', fontSize: 17}}>
        Notes
      </Text>
      <View
        style={{
          backgroundColor: '#45474B',
          paddingLeft: 10,
          marginTop: 5,
          height: 90,
          borderRadius: 13,
          borderWidth: 1,
          borderColor: 'grey',
          display: 'flex',
          flexDirection: 'column',
          padding: 10,
          justifyContent: 'flex-start',
        }}>
        <TextInput
          multiline={true}
          inputMode="text"
          editable={false}
          value={ItemObj.details}
          style={{lineHeight: 5, padding: 0, color: 'white'}}
        />
      </View>
    </View>
  );
}
function DeleteReminder({refViewTask}) {
  const ItemObj = useSelector(state => state.CalendarReducers.view_card_states);
  // console.log("ITEM OBJECT",ItemObj,refViewTask);
  const handleDeleteAll=async()=>{
    try{
         const authToken =
'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzAxNDk2MTgxLCJqdGkiOiIzNGU0N2I0ZS01ZGQwLTRkMjktYjIxMS1hYmQyMDZmYjQ4NTQiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMDkxMDAwMDAwMDA0NiIsIm5iZiI6MTcwMTQ5NjE4MX0.GkB7RokJpLvFikmOoSmn1zBwn3j_HADTWSVN2C10QQQ';
       const queryParams={
        event_id:ItemObj.event_id,
       }
      const res= await DeleteCompleteEvent(authToken,queryParams);
      consolelog("RES=",res);
    }
    catch(err){
      console.log("ERROR WHILE DELETING EVENT",err);
      throw err;
    }
  }
  const handleDelete=async()=>{
    try{
      //  const authToken='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzAxNDk2MTgxLCJqdGkiOiIzNGU0N2I0ZS01ZGQwLTRkMjktYjIxMS1hYmQyMDZmYjQ4NTQiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMDkxMDAwMDAwMDA0NiIsIm5iZiI6MTcwMTQ5NjE4MX0.GkB7RokJpLvFikmOoSmn1zBwn3j_HADTWSVN2C10QQQ';
      const authToken=await getApiKey();
       const queryParams={
        event_occurance_id:ItemObj.event_occurance_id
       }
       const res=await DeleteSingleOccurance(authToken,queryParams);
       console.log(res);
    }
    catch(err){
      console.log("ERROR IN DELETE SINGLE EVENT",err);
      throw err;
    }
  }
  return (
    <View>
    <Pressable onPress={()=>{
      handleDelete();
      refViewTask.current.close();
    }}>
      <View
        style={{
          backgroundColor: 'brown',
          borderRadius: 13,
          padding: 15,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 15,
        }}>
        <Text style={{color: 'white'}}>Delete this event</Text>
      </View>
    </Pressable>
    <Pressable onPress={()=>{
      handleDeleteAll();
      refViewTask.current.close();
    }}>
      <View
        style={{
          backgroundColor: 'brown',
          borderRadius: 13,
          padding: 15,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 15,
        }}>
        <Text style={{color: 'white'}}>Delete all upcoming events</Text>
      </View>
    </Pressable>
    </View>
  );
}
function HighPriority() {
  return (
    <View
      style={{
        width: 150,
        height: 20,
        backgroundColor: 'brown',
        position: 'absolute',
        top: 20,
        left: -50,
        zIndex: 999,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{rotate: '-45deg'}],
      }}>
      <Text style={{color: 'white'}}>High Priority</Text>
    </View>
  );
}
function DoneComponent({isDone, setDone, title, setShowDone}) {
  const popUpAnimation = useRef(new Animated.Value(0)).current;
  const [isHover, setHover] = useState(false);
  useEffect(() => {
    startPopUpAnimation();
  }, []);

  const startPopUpAnimation = () => {
    Animated.timing(popUpAnimation, {
      toValue: 1,
      duration: 500, // Adjust the duration as needed
      easing: Easing.back(1), // You can experiment with different easing functions
      useNativeDriver: true, // Improve performance by using the native driver
    }).start();
  };

  const popUpTranslateY = popUpAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [HEIGHT, 0], // Adjust the values as needed
  });

  return (
    <Animated.View
      style={{
        backgroundColor: '#87CE65',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        transform: [{translateY: popUpTranslateY}],
      }}>
      <View
        style={{
          flex: 10,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          // padding: 20,
          marginBottom: 200,
        }}>
        <LottieView
          source={require('../assets/Done.json')}
          style={{height: 700, width: 700}}
          autoPlay
          onAnimationFinish={() => {
            setDone(true);
            setShowDone(false);
          }}
          loop={false}
        />
        <View style={{marginTop: -80}}>
          <Text style={{color: '#EDEDED', fontSize: 30, fontWeight: '800'}}>
            Task Completed
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}
function ShowDone() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        padding: 30,
        backgroundColor: '#87CE65',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 13,
        marginTop: 10,
      }}>
      <View style={{flexDirection: 'row'}}>
        <MaterialIcons
          name="check-circle"
          style={{marginRight: 10}}
          size={30}
          color={'white'}
        />
        <Text style={{color: 'white', fontSize: 20, fontWeight: '800'}}>
          Task Completed
        </Text>
      </View>
    </View>
  );
}
