/* eslint-disable no-undef */
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  PermissionsAndroid,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {
  HandleBottomSheet,
  TextInputFields,
  TileCardContainer,
} from '../../../_components';
import {Strings} from '../../../../themes';
import getStyles from '../../utils/PersonalStyles';
import {getColor} from '../../../../themes/GetColor';
import {useDispatch, useSelector} from 'react-redux';
import CountryCode from '../../../Login/components/CountyCodePicker';
import ContactsList from './ContactsList';
import { setUserName } from '../../../../utils/LocalStorage';
import { FetchEmergencyContacts, addEmergencyContacts, getDependentUsers, getMainProfile, getMembers } from '../../utils/PersonalServerRequests';

import LinearGradient from 'react-native-linear-gradient';
import getRandomLGColor from '../../../_components/uiStyles/GetRandomLGColors';
import { setDependantUsers, setDependantUsersEHID, setParentProfile } from '../../../../redux/slices/AddDependantUserSlice';
import { setCurrentUserProfile } from '../../slices/PersonalProfileStates';
//changed
const CallFamily = () => {
  const Color = getColor(useSelector(state => state.theme.theme));
  const styles = getStyles();
  const [userName,setUserName]=useState('');
  const [addContacts, setAddContacts] = React.useState(false);
  // const [phoneNumber, setPhoneNumber] = React.useState('');
  const CurrentProfile=useSelector(state=>state.PersonalReducers.general_states).current_user_profile;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [relation,setRelation]=useState('');
  const [dpn, setDpn] = useState('');
  const [myPhoneNumbers, setMyPhoneNumbers] = useState([]);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const [mod, setMod] = useState(false);
  const [showError,setShowError]=useState([0,0,0]);
  const [temparr,settemparr]=useState([0,0,0]);
  const refCC = useRef(null);
  const [count,setCount]=useState(0);
  const [ContactList,setContactList]=useState([]);
  const {RandomLinearColor1,RandomLinearColor2}=getRandomLGColor();
  const refAddFamily = React.useRef(null);
  // useEffect(()=>{
  //  setCount(1);

  //   if(mod)
  //   refAddFamily.current.close();
  //   else if(count!=0)
  //   {
  //     refAddFamily.current.close();
  //   }
  // },[mod]);
  const fetchContacts=async()=>{
    const arr=await FetchEmergencyContacts(CurrentProfile.dependant_access_token);
    setContactList(arr.data);
    console.log("EMERGENCY CONTACTS=",arr.data);
  }
  useEffect(()=>{
    let arr=[0,0,0],brr=[0,0,0];
    if(userName=='')
    {
      arr[0]=1;
      if(showError[0]==1)
      {
        brr[0]=1;
      }
    }
    else
    {
      arr[0]=0;
      brr[0]=0;
    }
    if(phoneNumber=='')
    {
      arr[1]=1;
      if(showError[1]==1)
      {
        brr[1]=1;
      }
    }
    else
    {
      arr[1]=0;
      brr[1]=0;
    }
    if(relation=='')
    {
      arr[2]=1;
      if(showError[2]==1)
      {
        brr[2]=1;
      }
    }
    else
    {
      arr[2]=0;
      brr[2]=0;
    }
    setShowError(brr);
    settemparr(arr);
  },[phoneNumber,relation,userName]);
  useEffect(()=>{

    fetchContacts();
  },[]);
  function fetchPhoneNumber(enteredNumber) {
    setPhoneNumber(enteredNumber);
  }

  const renderDoctorData = (data, index) => {
    console.log("DATA=",data);
    return (
      <Pressable
      key={index}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 80,
          marginHorizontal: 2,
        }}
      >
        {/* <Image style={styles.image46} source={{uri: data?.source}} /> */}
        <LinearGradient style={{...styles.image46,justifyContent:'center',alignItems:'center'}} colors={[RandomLinearColor1,RandomLinearColor2]}>
          <Text>{data.contact_name[0]}</Text>
          </LinearGradient>
        <Text numberOfLines={1} style={styles.text14}>
          {data.contact_name || 'Family'}
        </Text>
        <Text numberOfLines={1} style={styles.text11}>
          {data.relation || 'Specialist'}
        </Text>
      </Pressable>
    );
  };
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
  function phoneNumberHandler() {
      setMod(true);
  }

 const savePhoneNumber= async(refAddFamily)=> {
    // if (myPhoneNumbers.length <= 2)
    try{
   let c=0, arr=temparr;
  arr.map((data,index)=>{
   if(data==1)
   {
    c=1;
   }
  });
  if(c==0){
    const param={
      name:userName,
      phoneNumber:phoneNumber,
      relation:relation
    };
    setMyPhoneNumbers(phoneList => [...phoneList, param]);
    await addEmergencyContacts(CurrentProfile.dependant_access_token,param);
    await fetchDependentUsers();
    refAddFamily.current.close();
    await fetchContacts();
    setPhoneNumber('');
    setRelation('');
    setUserName('');
    // setDpn('');
  }
  else
  {
    setShowError(arr);
  }}
  catch(err){
    console.log("ERROR IN EMERGENCY CONTACT=",err);
  }
  }
  const [permission,setPermission]=useState('');
  const addContact = (refAddFamily) => {
    // useEffect(()=>{
    //  refAddFamily.current.close();
    //  setMod(true);
    // },[]);
    return (
      <View style={{padding: 10, marginBottom: 10}}>
        <Text style={[styles.heading17, styles.headingStyle]}>
          Call Details of Family and Friends{'\n'}
          <Text style={styles.subHeading13}>Connections | Emergency </Text>
        </Text>
        <Text style={{...styles.heading17, marginBottom: 10}}>
          Add Friends Or Family details
        </Text>

        <TextInputFields label={'Name'} value={userName} onChange={(e)=>{
          setUserName(e);
        }} 
        error={showError[0]?"This field can't be empty":null}
        />
        <View style={styles.textFieldRowBetween}>
      
        
   
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          
            <View
              style={{
                flex: 1,
                backgroundColor: Color.textfieldContainer,
                borderRadius: 10,
                padding: 5,
                marginRight: 5,
              }}>
              <TextInputFields
            label={'Phone Number'}
            value={phoneNumber}
            onChange={(e)=>{
              setPhoneNumber(e);
            }}
            error={showError[1]?"This field can't be empty":null}
          />
              {/* <TextInput
                keyboardType="phone-pad"
                placeholder={
                  !error ? 'Enter mobile number' : 'Max 2 numbers are allowed'
                }
                placeholderTextColor={error ? Color.red : null}
                value={phoneNumber}
                onChangeText={e => {
                  setPhoneNumber(e);
                  setError(false);
                  handlePhoneNumberChange(e);
                }}
              /> */}
            </View>
          </View>
          <Pressable
            onPress={phoneNumberHandler}
            style={{
              borderRadius: 10,
              backgroundColor: Color.aquaBlue,
              width: '15%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={
                // phoneNumber == ''
                  require('../../assets/icons/user-octagon.png')
                  // : require('../../assets/icons/sendBold.png')
              }
              style={{width: 30, height: 30, tintColor: Color.blue}}
            />
          </Pressable>
        </View>
        <TextInputFields label={'Relation'} 
         value={relation}
         onChange={(e)=>{
          setRelation(e);
         }}
         error={showError[2]?"This field can't be empty":null}
        />
        <Pressable onPress={() => {
           savePhoneNumber(refAddFamily);
        }} style={styles.mediumButton}>
          <Text style={styles.buttonText14}>{Strings.buttonSave}</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View>
      <HandleBottomSheet
        containerStyle={{backgroundColor: Color.WHITE}}
        bottomSheetRef={refAddFamily}
        content={addContact(refAddFamily)}
        dragFromTop={true}
        height={500}
        draggableIcon={{backgroundColor: Color.BLACK, width: 100}}
      />
        {mod?(<ContactsList
            mod={mod}
            setMod={setMod}
            refer={refAddFamily}
            setUserName={setUserName}
            setPhoneNumber={setPhoneNumber}
            permission={permission}
          />):null}
      <TileCardContainer
        title={'Emergency Contacts'}
        showIcon={true}
        onPressIcon={() => {
          // const perm = await PermissionsAndroid.request(
          //   PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          // );
          // setPermission(perm);
          // if(perm=='granted'){
            setMod(true);
           refAddFamily.current.close();
          // }
          // else
          // {
          //   setMod(false);
          // }
          // refAddFamily.current.open();          
        }}>
        <FlatList
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          // key={'flat list'}
          data={ContactList || []}
          renderItem={({item, index}) => renderDoctorData(item, index)}
          keyExtractor={item => item.id}
        />
      </TileCardContainer>
    </View>
  );
};

export default CallFamily;

const emergencyFriends = [
  {
    id: 1,
    name: 'Lakshmi',
    relation: 'Mom',
    source:
      'https://media.istockphoto.com/id/629077926/photo/i-couldnt-be-more-happier-with-my-life.jpg?s=612x612&w=0&k=20&c=hvKv0vsGRzJQXNsHExjhTips9LYgWQy8twI4XqfpHhg=',
  },
  {
    id: 2,
    name: 'Dad',
    relation: 'Dad',
    source:
      'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg',
  },
  {
    id: 3,
    name: 'Nagendra',
    relation: 'Grandpa',
    source:
      'https://cdn.pixabay.com/photo/2021/06/08/16/18/india-6321033_1280.jpg',
  },
  {
    id: 4,
    name: 'Ajit',
    relation: 'Friend',
    source: 'https://pixy.org/src2/590/thumbs350/5902577.jpg',
  },
  {
    id: 5,
    name: 'Naresh',
    relation: 'Company-HR',
    source:
      'https://st3.depositphotos.com/3591429/13642/i/1600/depositphotos_136424690-stock-photo-cheerful-indian-man-face.jpg',
  },
  {
    id: 6,
    name: 'Harjit Singh',
    relation: 'Friend',
    source:
      'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg',
  },
  {
    id: 7,
    name: 'Ranjan',
    relation: 'Boss',
    source:
      'https://media.istockphoto.com/id/1072438778/photo/real-indian-young-woman-with-blank-expression.jpg?s=612x612&w=0&k=20&c=u3D9nXVRsrphLWOISYKVkUoSvDDAFjmJOdNRSbivABM=',
  },
];
