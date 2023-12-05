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
import React, {useState, useEffect, useRef} from 'react';
import LottieView from 'lottie-react-native';
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
  const OpenBottomSheet = () => {
    //  console.log("Clicked Edit");
    refCreateTask.current.open();
  };
  return (
    <>
      <View
        style={{marginHorizontal: 15, marginVertical: 10, marginBottom: 40}}>
        <DateAndTime />
        <UserOptions
          isDone={isDone}
          setDone={setDone}
          OpenBottomSheet={OpenBottomSheet}
        />
        {showDone ? <ShowDone /> : null}
        <Title />
        <Location />
        <Description />
        <Assessment />
        <Notes />
        <DeleteReminder setDone={setDone} setShowDone={setShowDone} />
        {item.HighPriority ? <HighPriority /> : null}
      </View>
      <Modal transparent visible={isDone}>
        <DoneComponent
          isDone={isDone}
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
          {item.date}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: 'white',
            fontWeight: 'bold',
            marginLeft: 10,
          }}>
          {item.year}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'baseline',
        }}>
        <Text style={{color: 'skyblue'}}>{item.week}</Text>
        <Text style={{marginLeft: 10}}>{item.Time}</Text>
      </View>
    </View>
  );
}
function Title() {
  return (
    <View
      style={{
        padding: 15,
        backgroundColor: '#45474B',
        marginTop: 5,
        borderRadius: 13,
      }}>
      <Text style={{fontSize: 15, fontWeight: '700', color: 'white'}}>
        {item.title}
      </Text>
    </View>
  );
}
function UserOptions({isDone, setDone, OpenBottomSheet}) {
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

      message: item.title,
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

          <Text>{item.username}</Text>
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
              handleNotification();
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
              if (isDone == false) setDone(true);
            }}>
            <MaterialIcons
              name="check"
              size={20}
              style={{
                padding: 10,
                borderRadius: 40,
                backgroundColor: '#286BBC',
              }}
            />
          </Pressable>
          <Text style={{alignItems: 'center'}}>Done</Text>
        </View>
      </View>
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
          justifyContent: 'flex-start',
        }}>
        <TextInput
          multiline={true}
          placeholder="Write here..."
          inputMode="text"
          style={{lineHeight: 5, padding: 0}}
        />
      </View>
    </View>
  );
}
function DeleteReminder({setDone, setShowDone}) {
  return (
    <Pressable
      onPress={() => {
        setShowDone(false);
        setDone(false);
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
        <Text style={{color: 'white'}}>Delete Reminder</Text>
      </View>
    </Pressable>
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
            setDone(false);
            setShowDone(true);
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
