import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../../themes/ResponsiveDimensions';
import { getColor } from '../../../themes/GetColor';

const ReminderCard = ({item
  // , backgroundColor
}) => {
  const Color=getColor(useSelector(state=>state.theme.theme));
  const temp = {
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
  };
  
  // console.log("ITEM!",item);
  // console.log('time', item.start_time);
  const startDate = new Date(item.confirm_date);
  const today=new Date();
  const Weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const minutes = parseInt(item.duration);
  const endTime=new Date(startDate.getTime()+minutes*60000);

  const month=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
 
  // console.log('Date', startDate.toLocaleTimeString());
  const durationFormat=(startTime)=>{
   return startTime.slice(0,-6)+startTime.slice(-3,startTime.length);
  }
  // if(item.event_name=='Revanth Task -2')
  // console.log(item.colour_code);
  return (
    <View style={{flex: 1, flexDirection: 'row', opacity: 1}}>
      <View
        style={{
          width:responsiveWidth(32),
          flexDirection: 'column',
          // backgroundColor: backgroundColor,
          //  backgroundColor:
          //  today.toLocaleDateString()=== startDate.toLocaleDateString() 
          //  ?
          //  '#B9B4C7'
          //  :
          //  today>startDate
          //  ?
          //  '#7E1717'
          //  : '#213555'
          //   ,
          backgroundColor:
           (item.colour_code!==undefined || item.color_code=='transparent')?
           item.colour_code:
           today.toLocaleDateString()==startDate.toLocaleDateString()?
           '#B9B4C7':
           '#213555'
          ,
          padding: 10,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            paddingBottom: 20,
          }}>
          <View
            style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={customStyle.Datetext}>
              {startDate.getDate()}
              {/* {item.day} */}
              </Text>
          </View>
          <View
            style={{
              flex: 3,
              justifyContent: 'flex-start',
              flexDirection: 'column',
              alignItems: 'flex-start',
              marginLeft: 10,
            }}>
            <View>
              <Text style={customStyle.text}>
                {Weeks[startDate.getDay()]}
                {/* {item.week} */}
              </Text>
            </View>
            <View>
              <Text style={customStyle.text}>
                {month[startDate.getMonth()]}'{startDate.getFullYear().toString().slice(2)}
                {/* {item.month.slice(0, 3)}'{item.year.toString().slice(2)} */}
                {/* {item.month} '{item.year.toString().slice(2)} */}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flex:2,flexDirection: 'row', alignItems: 'flex-end'}}>
          {/* Image & Name */}
          <View style={{flex: 2, alignItems: 'center',marginTop:responsiveHeight(2.5)}}>
            {/* <Image
              source={{uri: item.profileURL}}
              style={{height: 35, width: 35, borderRadius: 100}}
            /> */}
            <View style={{backgroundColor:'grey',borderRadius:100,width:35,height:35,borderWidth:2,
            borderColor:item.priority=='0'?'green':item.priority=='2'?'red':'transparent'}}>

            </View>
          </View>
          <View style={{flex: 3, alignItems: 'flex-start',flexDirection:'column',marginLeft: 10,justifyContent:'center'}}>
            <Text style={customStyle.text}>
              {item.event_by}
              {/* {item.name} */}
              </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 7,
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 8,
          // backgroundColor: item.colour_code=='black'?'white':item.colour_code,
          backgroundColor:Color.theme_card,
          // backfaceVisibility:'white',
        }}>
        <View
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            flex: 1,
          }}>
          <View style={{flex: 5}}>
            <Text
              style={{fontSize: 16, fontWeight: '700', color:Color.white}}
              numberOfLines={3}
              ellipsizeMode="tail">
              {item.event_name  }
               {/* {item.event_name  } {item.event_name  } {item.event_name  } {item.event_name  } */}
              {/* {item.description} */}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
            // ,marginTop:30,backgroundColor:'red'
            // backgroundColor:'red'
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{color: 'dimgrey', fontSize: 13, fontWeight: '700'}}>
              {/* {item.time} */}
              {/* {startTime.slice(0,-6)+startTime.slice(-3,startTime.length)} */}
              {durationFormat(startDate.toLocaleTimeString())+'-'+durationFormat(endTime.toLocaleTimeString())}
            </Text>
          </View>

          {/* {item.showEH ? (
            <View
              style={{
                flex:1,
               alignItems:item.survey?'center':'flex-end',
               justifyContent:'center',
               marginBottom:2,
              }}>
              <Image
                style={{
                  width: 15,
                  height: 15,
                  resizeMode: 'stretch',
                }}
                source={require('../assets/OnlyLogo.png')}
              />
            </View>
          ) : null}
          {item.survey ? (
            <View
              style={{
                backgroundColor: '#322653',
                borderRadius: 10,
                paddingVertical: 4,
                paddingHorizontal: 5,
                justifyContent:'center'
              }}>
              <Text>Survey</Text>
            </View>
          ) : <View></View>} */}
        </View>
      </View>
    </View>
  );
};
const customStyle = StyleSheet.create({
  Datetext: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: responsiveFontSize(3.6),
    fontWeight: '500',
  },
  text: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
});

export default ReminderCard;


