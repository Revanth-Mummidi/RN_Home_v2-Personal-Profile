import {View, Text, FlatList, SectionList, ScrollView, Pressable, TouchableOpacity,Dimensions } from 'react-native';
import React,{useState} from 'react';
import {Colors, Color} from '../../../themes';
import {ThemeContext} from '../../../themes/components/ThemeContext.js';
import RepeatEveryModal from './RepeatEveryModel';
import { ScrollPicker } from '../../_components';

const RenderDurModal = ({setRepeatInd, setRepeatVal,AddWeek,repeatInd,repeatVal}) => {
  const hour = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,13,14,15,16,17,18,19,20,21,22,23];
  const day = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  const week=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  const month= [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
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
        title:'Week',
        data:week,
    },
    {
        title:'Month',
        data:month,
    }
  ];
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  return (
    <View style={[{alignItems:'center',backgroundColor:Color.textfieldContainer,paddingBottom:10},
     repeatInd==4?(
      {
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10
      }
     ):null
    ]}> 
      
      <FlatList
      data={DATA}
      numColumns={2}
      horizontal={false}
      nestedScrollEnabled={true}
      scrollEnabled={false}
      renderItem={({item,index})=>{
        return(
             <View style={{margin:10,opacity:index==repeatInd?1:0.8}} key={index}>
          
              <RepeatEveryModal duration={item.data}  title={item.title}  index={index}
                setRepeatInd={setRepeatInd} setRepeatVal={setRepeatVal} repeatInd={repeatInd} repeatVal={repeatVal}
                AddWeek={AddWeek}
              />
             
              </View>
        );
      }}
      />
    
    </View>
  );
};

export default RenderDurModal;
