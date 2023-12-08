import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color, Strings} from '../../../../themes';
import styles from '../../utils/PersonalStyles';
import {useDispatch, useSelector} from 'react-redux';
import getStyles from '../../utils/PersonalStyles';
import { getColor } from '../../../../themes/GetColor';
import { setCurrentUserProfile, setMaritalStatus } from '../../slices/PersonalProfileStates';
import { addBasicDetails, getDependentUsers, getMainProfile, getMembers } from '../../utils/PersonalServerRequests';
import { setDependantUsers, setDependantUsersEHID, setParentProfile } from '../../../../redux/slices/AddDependantUserSlice';

const MaritalStatus = (refScreens) => {
  const styles=getStyles();
  const Color=getColor(useSelector(state=>state.theme.theme));
  const dispatch=useDispatch();
  const CurrentProfile=useSelector(state=>state.PersonalReducers.general_states).current_user_profile;
  const marital1=useSelector(state=>state.PersonalReducers.general_states).maritalStatus;
  const [selected, setSelected] = useState(marital1);
  const active = Color.midBlue;
  const inActive = Color.lightGray;
  const fetchAccessDependent=async(data)=>{
    try{
    let dependantArray= await getDependentUsers(data);
    // dependantArray=[...dependantArray];
    console.log("DEPENDENT USER ARRAY=",...dependantArray);
    let mainProfile=await getMainProfile();
    dispatch(setParentProfile(mainProfile));
    dispatch(setCurrentUserProfile(mainProfile));
    // console.log("MAIN PROFILE=",mainProfile);
    // const profile=await getUserProfile(selectedItem.access_token,selectedItem.Profile_Picture)

    const combinedData=[mainProfile,...dependantArray];
    console.log("COMBINED DATA",combinedData);

    dispatch(setDependantUsers(combinedData));
  }catch(err){console.log("Fetch ACCESS DEP",err)}
   }

   const fetchDependentUsers=async()=>{
    try{
      let arr=await getMembers();
      arr=arr.data.data;
      // let array1=arr.map((data,index)=>{
      //   return data.child_eh_user_id;
      // });
     
      dispatch(setDependantUsersEHID(arr));
      let arr3=[];
      
     arr3= arr.map((data,index)=>{
         return {authToken:data.dependent_access_token};
      });
      fetchAccessDependent(arr3);
    }catch(err){
      console.log("fetchdep",err)
    }
    
     
   }
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
         addBasicDetails(CurrentProfile.access_token,{
          mobileno:'',
          alternate_mobileno:'',
          alternate_email_id:'',
          weight:"",
          height:""
        },{marital_status:selected});
        fetchDependentUsers();
        // console.log("REFERENCE",refScreens.refScreens.current);
        refScreens.refScreens.current?.close();
      }} style={styles.mediumButton}>
        <Text style={styles.buttonText14}>{Strings.buttonSave}</Text>
      </Pressable>
    </View>
  );
};

export default MaritalStatus;
