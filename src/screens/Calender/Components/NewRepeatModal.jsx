import {View, Text, FlatList, Pressable} from 'react-native';
import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import RepeatEveryModal from './RepeatEveryModel';
import {ScrollPicker} from '../../_components';
import {useState} from 'react';
import { setDay, setHour, setIsWeek, setMonth, setWeeks } from '../slices/SaveSlice';
const NewRepeatModal = (
  {
    // setRepeatInd,
    // setRepeatVal,
    // AddWeek,
    // repeatInd,
    // repeatVal,
  },
) => {
  const hour = [
    '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23',
  ];
  const day = [
    '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23','24', '25', '26', '27', '28', '29', '30', '31',
  ];
  const month = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const DATA = [
    {
      title: 'Month',
      data: month,
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
  const SaveObj=useSelector(state=>state.CalendarReducers.savetask);
  const Color = useSelector(state => state.theme).Colors;
  return (
    <View
      style={{
        flexDirection: 'row',
        borderRadius: 13,
        marginBottom: 20,
        // backgroundColor:  Color.calend_newtask_card_bgColor,
        
        overflow: 'hidden',
      }}>
      
          <ScrollableComponent
     
            data={DATA[0].data}
            title={DATA[0].title}
           
             showInd={SaveObj.month}
           
            activeIndex={0}
          />
          <ScrollableComponent
        
            data={DATA[1].data}
            title={DATA[1].title}
          
             showInd={SaveObj.day}
      
            activeIndex={1}
          />
          <ScrollableComponent
         
            data={DATA[2].data}
            title={DATA[2].title}
             showInd={SaveObj.hour}

            activeIndex={2}
          />
       
    </View>
  );
};

export function ScrollableComponent({
  data,
  title,
  showInd,
  activeIndex,
}) {
  const obj=useSelector(state=>state.CalendarReducers.savetask);
  const hour=useSelector(state=>state.CalendarReducers.savetask).hour;
  const day=useSelector(state=>state.CalendarReducers.savetask).day;
  const month=useSelector(state=>state.CalendarReducers.savetask).month;
  const isWeek=obj.isWeek;
  const [ChoosedIndex,setChoosedIndex]=useState(0);
  const dispatch=useDispatch();
  const Color = useSelector(state => state.theme).Colors;
  useEffect(()=>{
    setChoosedIndex(activeIndex==0?month:activeIndex==1?day:hour);
  },[]);
  const handleChange = (data)=>{
    if(activeIndex==0)
    {
      dispatch(setMonth(data));
    }
    else if(activeIndex==1)
    {
      dispatch(setDay(data));
    }
    else if(activeIndex==2)
    {
      dispatch(setHour(data));
    }
  };
  
  useEffect(()=>{
   
    if(hour==0 && day==0 && month==0)
    {
      if(isWeek==0)
      {
        dispatch(setIsWeek(-1));
      }
    }
    else 
    {
      if(isWeek!=0){
     
      if(isWeek==1)
      {
        dispatch(setWeeks([0,0,0,0,0,0,0]));
      }
       dispatch(setIsWeek(0));
      }
    }
    setChoosedIndex(activeIndex==0?month:activeIndex==1?day:hour);
  },[hour,day,month]);
  useEffect(()=>{
    if(isWeek!=0)
    {
      dispatch(setHour(0));
      dispatch(setMonth(0));
      dispatch(setDay(0));
      setChoosedIndex(activeIndex==0?month:activeIndex==1?day:hour);
     
    }
  },[isWeek]);
  const setInd=()=>{
    if(activeIndex==0)
    {
      return month;
    }
    else if(activeIndex==1)
    {
      return day;
    }
    else 
    {
      return hour;
    }
  }
 
  return (
    <View style={{backgroundColor:!setInd()?Color.calend_newtask_card_bgColor:Color.badge_bg}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 15,
          paddingHorizontal: 20,
          backgroundColor: Color.calen_card_bg,
          overflow:'hidden'
        }}>
        {activeIndex == 0 ? (
          <View
            style={{
              width: 60,
              height: 15,
              backgroundColor: 'brown',
              position: 'absolute',
              top: 10,
              left: -15,
              zIndex: 9,
              justifyContent: 'center',
              alignItems: 'center',
              transform: [{rotate: '-50deg'}],
            }}>
            <Text style={{fontSize:10}}>30 days</Text>
          </View>
        ) : null}
        <Text style={{color:Color.white}}>{title}</Text>
      </View>
      <View
        style={{margin: 10, alignItems: 'center', justifyContent: 'center'}}>
        <ScrollPicker
          selectedIndex={showInd}
          onValueChange={(data, selectedIndex) => {
            handleChange(selectedIndex);
          }}
          dataSource={data}
          wrapperHeight={100}
          HighlightColour={Color.calend_newtask_endComponent_bgColor}
          HighlightfontColor={'white'}
          textColor={showInd?Color.calend_newtask_card_bgColor:null}
          selectedBackgroundColor={'#48CAE4'}
          fontSize={15}
          HighlightfontSize={17}
          wrapperWidth={200 * 0.4}
          wrapperColor="transparent"
          itemHeight={40}
          highlightBorderWidth={0}     
        />
      </View>
    </View>
  );
}

export default NewRepeatModal;
