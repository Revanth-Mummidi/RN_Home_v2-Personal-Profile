import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';

const ReminderCard = ({item, backgroundColor}) => {
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
  // console.log(item);
  // console.log('time', item.start_time);
  const startDate = new Date(item.start_date);
  const Weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const startTime=startDate.toLocaleTimeString();
  // console.log('Date', startDate.toLocaleTimeString());

  return (
    <View style={{flex: 1, flexDirection: 'row', opacity: 1}}>
      <View
        style={{
          flex: 3,
          flexDirection: 'column',
          backgroundColor: backgroundColor,
          padding: 10,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 20,
          }}>
          <View
            style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={customStyle.Datetext}>
              {/* {startDate.getDate()} */}
              {item.day}
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
                {/* {Weeks[startDate.getDay()]} */}
                {item.week}
              </Text>
            </View>
            <View>
              <Text style={customStyle.text}>
                {/* {item.month.slice(0, 3)}'{item.year.toString().slice(2)} */}
                {item.month} '{item.year.toString().slice(2)}
              </Text>
            </View>
          </View>
        </View>
        <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
          {/* Image & Name */}
          <View style={{flex: 2, alignItems: 'center'}}>
            <Image
              source={{uri: item.profileURL}}
              style={{height: 35, width: 35, borderRadius: 100}}
            />
          </View>
          <View style={{flex: 3, alignItems: 'flex-start', marginLeft: 10}}>
            <Text style={customStyle.text}>
              {/* {item.event_by} */}
              {item.name}
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
          // backgroundColor: item.colour_code,
          backfaceVisibility:'white',
        }}>
        <View
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            flex: 1,
          }}>
          <View style={{flex: 5}}>
            <Text
              style={{fontSize: 16, fontWeight: '700', color: 'black'}}
              numberOfLines={2}
              ellipsizeMode="tail">
              {/* {item.event_name} */}
              {item.description}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            // backgroundColor:'red'
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{color: 'dimgrey', fontSize: 13, fontWeight: '700'}}>
              {item.time}
              {/* {startTime.slice(0,-6)+startTime.slice(-3,startTime.length)} */}
            </Text>
          </View>

          {item.showEH ? (
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
          ) : <View></View>}
        </View>
      </View>
    </View>
  );
};
const customStyle = StyleSheet.create({
  Datetext: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 28,
    fontWeight: '500',
  },
  text: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
});

export default ReminderCard;


