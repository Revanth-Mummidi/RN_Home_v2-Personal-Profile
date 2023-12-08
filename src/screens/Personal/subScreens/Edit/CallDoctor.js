/* eslint-disable no-undef */
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
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
import CountyCodePicker from '../../../Login/components/CountyCodePicker';
import ContactsList from './ContactsList';
import { setUserName } from '../../../../utils/LocalStorage';

const CallDoctor = () => {
  const Color = getColor(useSelector(state => state.theme.theme));
  const styles = getStyles();
  const [userName,setUserName]=useState('');
  const [addContacts, setAddContacts] = React.useState(false);
  // const [phoneNumber, setPhoneNumber] = React.useState('');
 
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
  const refAddFamily = React.useRef(null);
 
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
  function fetchPhoneNumber(enteredNumber) {
    setPhoneNumber(enteredNumber);
  }

  const renderDoctorData = (data, index) => {
    return (
      <Pressable
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 80,
          marginHorizontal: 2,
        }}
        key={index}>
        <Image style={styles.image46} source={{uri: data?.source}} />
        <Text numberOfLines={1} style={styles.text14}>
          {data?.name || 'Family'}
        </Text>
        <Text numberOfLines={1} style={styles.text11}>
          {data?.relation || 'Specialist'}
        </Text>
      </Pressable>
    );
  };
  function phoneNumberHandler() {
      setMod(true);
  }

  function savePhoneNumber() {
    // if (myPhoneNumbers.length <= 2)
   let c=0, arr=temparr;
  arr.map((data,index)=>{
   if(data==1)
   {
    c=1;
   }
  });
  if(c==0){
     setMyPhoneNumbers(phoneList => [...phoneList, {
      name:userName,
      phoneNumber:phoneNumber,
      relation:relation
    }]);
    // console.log("MY PHONE NUMBERS",myPhoneNumbers);
    setPhoneNumber('');
    setRelation('');
    setUserName('');
    // setDpn('');
  }
  else
  {
    setShowError(arr);
  }
  }

  const addContact = (data, index) => {
    // useEffect(()=>{
    //  refAddFamily.current.close();
    //  setMod(true);
    // },[]);
    return (
      <View style={{padding: 10, marginBottom: 10}}>
        <Text style={[styles.heading17, styles.headingStyle]}>
          Call Details of Doctors{'\n'}
          <Text style={styles.subHeading13}>Connections | Emergency </Text>
        </Text>
        <Text style={{...styles.heading17, marginBottom: 10}}>
          Add Doctor Details
        </Text>

        <TextInputFields label={'Doctor Name'} value={userName} onChange={(e)=>{
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
            label={'Contact number'}
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
        <TextInputFields label={'Specialist'} 
         value={relation}
         onChange={(e)=>{
          setRelation(e);
         }}
         error={showError[2]?"This field can't be empty":null}
        />
        <Pressable onPress={() => {
           savePhoneNumber();
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
        content={addContact()}
        dragFromTop={true}
        height={500}
        draggableIcon={{backgroundColor: Color.BLACK, width: 100}}
      />
        <ContactsList
            mod={mod}
            refer={refAddFamily}
            setMod={setMod}
            setUserName={setUserName}
            setPhoneNumber={setPhoneNumber}
          />
      <TileCardContainer
        title={'Emergency Doctors'}
        showIcon={true}
        onPressIcon={() => {
          setMod(true);
          // refAddFamily.current.open();          
        }}>
        <FlatList
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          key={'flat list'}
          data={emergencyFriends || []}
          renderItem={({item, index}) => renderDoctorData(item, index)}
          keyExtractor={item => item.id}
        />
      </TileCardContainer>
    </View>
  );
};

export default CallDoctor;


const emergencyFriends = [
  {
    id: 1,
    name: 'Naresh',
    specialization: 'General',
    source:
      'https://media.istockphoto.com/id/1212177444/photo/happy-male-doctor-of-indian-ethnicity.jpg?s=612x612&w=0&k=20&c=q5Hv1bcmMOiocprvNxpQgtqcbNcPltBnhZILdUE8BjQ=',
  },
  {
    id: 2,
    name: 'Preeti',
    specialization: 'General',
    source:
      'https://thumbs.dreamstime.com/b/indian-female-doctor-wear-headset-face-headshot-telemedicine-india-make-online-video-call-consulting-patient-center-gp-looking-191236625.jpg',
  },
  {
    id: 3,
    name: 'Amritesh',
    specialization: 'Cardiology',
    source:
      'https://media.istockphoto.com/id/912920442/photo/indian-man-doctor-against-white-background.jpg?s=612x612&w=0&k=20&c=i9lz9-z7oTOei7cEOk7cFwX0aGp8hsg2BcBm7yis2yI=',
  },
  {
    id: 4,
    name: 'Suresh',
    specialization: 'Pediatric',
    source:
      'https://assets.lybrate.com/img/documents/doctor/dp/cf7a14f901380d07e61a713eeac02ee1/Ayurveda-AbhishekSingh-Beawar-806c01.jpg',
  },
  {
    id: 5,
    name: 'Suchitra',
    specialization: 'Nephrology',
    source:
      'https://thumbs.dreamstime.com/b/indian-female-doctor-doing-video-call-laptop-hardworking-216932211.jpg',
  },
  {
    id: 6,
    name: 'Asit',
    specialization: 'General',
    source:
      'https://api.magnusmedi.com/uploads/74332ca13d134a00a740fd595e81afc3.jpg',
  },
];
