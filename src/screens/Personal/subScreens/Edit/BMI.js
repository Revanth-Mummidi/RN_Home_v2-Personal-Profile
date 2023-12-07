import {Pressable, ScrollView, Text, View} from 'react-native';
import React,{useEffect, useState} from 'react';
import {Color, Strings} from '../../../../themes';
// import {ListSlider} from '../../../_components';
import { ListSlider } from '../../../_components';
import {useDispatch, useSelector} from 'react-redux';
import getStyles from '../../utils/PersonalStyles';
import {getColor} from '../../../../themes/GetColor';
import { BMIconverter } from '../../utils/Conversions';
import { setBMI, setBMIHeight, setBMIWeight } from '../../slices/PersonalProfileStates';
import { addBasicDetails, addWeightandHeight } from '../../utils/PersonalServerRequests';

const BMI = (refScreens) => {
  const Color = getColor(useSelector(state => state.theme.theme));
  const CurrentProfile=useSelector(state=>state.PersonalReducers.general_states).current_user_profile;
  const BMIheight=useSelector(state=>state.PersonalReducers.general_states).height;
  const BMIweight=useSelector(state=>state.PersonalReducers.general_states).weight;
  // const BMIheight=CurrentProfile.height;
  // const BMIweight=CurrentProfile.weight;
  
  const [weight,setWeight]=useState(BMIweight==''?30:parseInt(BMIweight));
  const [height,setHeight]=useState(BMIheight==''?100:parseInt(BMIheight));
  const BMI=useSelector(state=>state.PersonalReducers.general_states.bmi);
  const [bmi,setBmi]=useState(BMI);
  const dispatch=useDispatch();
  useEffect(()=>{
    setBmi(BMIconverter(weight,height));
  },[weight,height]);
  
  const styles = getStyles();
  return (
    <View style={{...styles.parent, ...styles.padding10}}>
      <View style={{...styles.selectedItem, backgroundColor: Color.BLACK,marginBottom:0}}>
        <Text style={{...styles.bigTitle26, color: Color.white}}>{height!=0?bmi.toFixed(1):'Invalid Height'}</Text>
      </View>
      <Text style={[styles.heading17, styles.headingStyle,{marginTop:0}]}>
        BMI {'\n'}
        <Text style={styles.subHeading13}>Body Mass Index</Text>
      </Text>
      <View
        style={{
          ...styles.container,
          backgroundColor: Color.textfieldContainer,
          margin: 10,
        }}>
        <Text style={styles.heading17}>Weight</Text>
        <ScrollView nestedScrollEnabled={true}>
          <ListSlider setvalue={setWeight} value={weight} units={'kg'} />
        </ScrollView>
        {/* <Text style={{...styles.subtitle13, alignSelf: 'flex-end'}}>
          29 May 2023
        </Text> */}
       
      </View>
      <View
        style={{
          ...styles.container,
          backgroundColor: Color.textfieldContainer,
          margin: 10,
        }}>
        <Text style={styles.heading17}>Height</Text>
        <ScrollView nestedScrollEnabled={true}>
          <ListSlider setvalue={setHeight} value={height} units={'cm'} maxHeight={300} />
        </ScrollView>
      </View>
        <View style={{...styles.flexRowEvenly, marginVertical: 20}}>
      
          <Pressable onPress={() => {
            dispatch(setBMI(bmi));
            dispatch(setBMIWeight(weight));
            dispatch(setBMIHeight(height));
            addBasicDetails(CurrentProfile.access_token,{
              mobileno:'',
              alternate_mobileno:'',
              alternate_email_id:'',
              weight:{
                value:weight.toString(),
                unit:'kg'
              },
              height:{
                value:height.toString(),
                unit:'cm'
              }
            },{});
            refScreens.refScreens.current.close();
          }} style={{...styles.mediumButton,backgroundColor:Color.badge_bg}}>
            <Text style={{...styles.buttonText14, paddingHorizontal: 10}}>
              {Strings.buttonSave}
            </Text>
          </Pressable>
        </View>
    </View>
  );
};

export default BMI;
