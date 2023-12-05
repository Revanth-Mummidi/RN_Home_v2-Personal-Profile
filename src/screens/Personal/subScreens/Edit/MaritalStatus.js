import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color, Strings} from '../../../../themes';
import styles from '../../utils/PersonalStyles';
import {useDispatch, useSelector} from 'react-redux';
import getStyles from '../../utils/PersonalStyles';
import { getColor } from '../../../../themes/GetColor';
import { setMaritalStatus } from '../../slices/PersonalProfileStates';
import { addBasicDetails } from '../../utils/PersonalServerRequests';

const MaritalStatus = ({marital}) => {
  const styles=getStyles();
  const Color=getColor(useSelector(state=>state.theme.theme));
  const dispatch=useDispatch();
  const CurrentProfile=useSelector(state=>state.PersonalReducers.general_states).current_user_profile;
  const marital1=useSelector(state=>state.PersonalReducers.general_states).maritalStatus;
  const [selected, setSelected] = useState(marital1);
  const active = Color.midBlue;
  const inActive = Color.lightGray;
  return (
    <View style={{padding: 10}}>
      <Text style={[styles.heading17, styles.headingStyle]}>
        Marital Status{'\n'}
        <Text style={styles.subHeading13}>Wellbeing | Hereditary </Text>
      </Text>

      <View style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
        <Pressable
          onPress={() => {
            setSelected('single');
          }}
          style={styles.iconContainer}>
          <Image
            source={require('../../assets/icons/heart.png')}
            style={{
              ...styles.Icon40,
              tintColor: selected === 'single' ? active : inActive,
            }}
          />
          <Text style={{color: selected === 'single' ? active : inActive}}>
            Single
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setSelected('married');
          }}
          style={styles.iconContainer}>
          <Image
            source={require('../../assets/icons/lovely.png')}
            style={{
              ...styles.Icon40,
              tintColor: selected === 'married' ? active : inActive,
            }}
          />
          <Text style={{color: selected === 'married' ? active : inActive}}>
            Married
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setSelected('separate');
          }}
          style={styles.iconContainer}>
          <Image
            source={require('../../assets/icons/heart-remove.png')}
            style={{
              ...styles.Icon40,
              tintColor: selected === 'separate' ? active : inActive,
            }}
          />
          <Text style={{color: selected === 'separate' ? active : inActive}}>
            Separated
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setSelected('divorce');
          }}
          style={styles.iconContainer}>
          <Image
            source={require('../../assets/icons/heart-slash.png')}
            style={{
              ...styles.Icon40,
              tintColor: selected === 'divorce' ? active : inActive,
            }}
          />
          <Text style={{color: selected === 'divorce' ? active : inActive}}>
            Divorced
          </Text>
        </Pressable>
      </View>
      <Pressable
      
      onPress={() => {
         dispatch(setMaritalStatus(selected));
         addBasicDetails(CurrentProfile.dependent_access_token,{
          mobileno:'',
          alternate_mobileno:'',
          alternate_email_id:'',
          weight:"",
          height:""
        },{marital_status:selected});
      }} style={styles.mediumButton}>
        <Text style={styles.buttonText14}>{Strings.buttonSave}</Text>
      </Pressable>
    </View>
  );
};

export default MaritalStatus;
