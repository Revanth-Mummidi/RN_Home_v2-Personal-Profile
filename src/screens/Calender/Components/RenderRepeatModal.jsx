import {
  View,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import RepeatEveryModal from './RepeatEveryModel';
import {ScrollPicker} from '../../_components';
import {useDispatch, useSelector} from 'react-redux';
import NewRepeatModal from './NewRepeatModal.jsx';
import { setDay, setHour, setIsWeek, setMonth, setWeeks } from '../slices/SaveSlice.jsx';

const RepeatRepeatModal = ({
  // setRepeatInd,
  // setRepeatVal,
  // AddWeek,
  // repeatInd,
  // repeatVal,
}) => {
  const hour = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23,
  ];
  const day = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const DATA = [
    {
      title: 'Hour',
      data: hour,
    },
    {
      title: 'Day',
      data: day,
    },
    {
      title: 'Week',
      data: week,
    },
    {
      title: 'Month',
      data: month,
    },
  ];
  // const {theme, toggleTheme} = React.useContext(ThemeContext);
  // const Color = Colors(theme);
  const isWeek=useSelector(state=>state.CalendarReducers.savetask).isWeek;
  const Color = useSelector(state => state.theme).Colors;
  return (
    <View
      style={[
        {
          alignItems: 'center',
          backgroundColor: Color.textfieldContainer,
          paddingVertical: 10,
        },
        isWeek == -1
          ? {
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }
          : null,
      ]}>
      <NewRepeatModal />
      {/* <CriteriaComponent DATA={DATA} repeatInd={repeatInd} setRepeatInd={setRepeatInd} setRepeatVal={setRepeatVal} repeatVal={repeatVal} AddWeek={AddWeek} /> */}
      <WeekComponent />
    </View>
  );
};
function CriteriaComponent({
  DATA,
  setRepeatInd,
  setRepeatVal,
  AddWeek,
  repeatInd,
  repeatVal,
}) {
  return (
    <FlatList
      data={DATA}
      numColumns={2}
      horizontal={false}
      nestedScrollEnabled={true}
      scrollEnabled={false}
      renderItem={({item, index}) => {
        return (
          <View
            style={{margin: 10, opacity: index == repeatInd ? 1 : 0.8}}
            key={index}>
            <RepeatEveryModal
              duration={item.data}
              title={item.title}
              index={index}
              setRepeatInd={setRepeatInd}
              setRepeatVal={setRepeatVal}
              repeatInd={repeatInd}
              repeatVal={repeatVal}
              AddWeek={AddWeek}
            />
          </View>
        );
      }}
    />
  );
}
function WeekComponent() {
  const dispatch=useDispatch();
  const Color = useSelector(state => state.theme).Colors;
  const weeks = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  // const [selectedWeeks, setSelectedWeeks] = useState([0, 0, 0, 0, 0, 0, 0]);
  const selectedWeeks=useSelector(state=>state.CalendarReducers.savetask).weeks;
  const isWeek=useSelector(state=>state.CalendarReducers.savetask).isWeek;
  const event=useSelector(state=>state.CalendarReducers.savetask);
  const handlePress = index => {
    let arr = selectedWeeks;
    arr = arr.map((data, key) => {
      if (key == index) {
        return !data;
      } else {
        return data;
      }
    });
    dispatch(setWeeks(arr));
  };
  useEffect(()=>{
    let arr=selectedWeeks,c=0;
    arr.map((data,key)=>{
      if(data==1)
      {
        c=1;
        // console.log('Data',data,'Index',key);
      }
    });
    if(c==1)
    {
    // console.log("YES",selectedWeeks,event.hour,event.month,event.day);
      // if(isWeek==1)
      // {
       
      dispatch(setHour(0));
      dispatch(setMonth(0));
      dispatch(setDay(0));
      
      dispatch(setIsWeek(1));
    }
    else
    {
       if(isWeek==1)
       {
        dispatch(setIsWeek(-1));
       }
    }
  },[selectedWeeks]);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{marginRight: 10}}>
        <Text
          style={{
            color: Color.white,
            marginLeft: 10,
            fontWeight: '700',
            fontSize: 15,
          }}>
          Week
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', marginRight: 10}}>
        <FlatList
          data={weeks}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={true}
          style={{flex: 1}}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View
                style={{paddingVertical: 4, marginHorizontal: 3}}
                key={index}>
                <Pressable
                  onPress={() => {
                    handlePress(index);
                  }}
                  style={{
                    //backgroundColor: Color.badge_bg ,
                    backgroundColor:
                      selectedWeeks[index] == 1
                        ? Color.badge_bg
                        : Color.calen_card_bg,

                    borderRadius: 90,
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      //color: Color.badge,
                      color:
                        selectedWeeks[index] == 1
                          ? Color.calen_card_bg
                          : Color.badge_bg,
                      textAlign: 'center',
                      fontWeight: '700',
                      fontSize: 15,
                    }}>
                    {item}
                  </Text>
                </Pressable>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

export default RepeatRepeatModal;
