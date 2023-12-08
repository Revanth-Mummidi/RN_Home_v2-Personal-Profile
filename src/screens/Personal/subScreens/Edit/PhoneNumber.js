/* eslint-disable no-alert */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
// // To do:
// 1. Add phone numbers as user enters the phone number.
// 2. If user makes one the existing numbers as primary number + if number is not yet verified.. then verify by OTP.
// 3. If Verification passes, then change the primary number to new number else keep the old number as primary which was verified previously.

import {Text, View, Image, Pressable, TextInput, Modal,Alert} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {HandleBottomSheet, TextInputFields} from '../../../_components';
import {Color} from '../../../../themes';
import styles from '../../utils/PersonalStyles';
import {useDispatch, useSelector} from 'react-redux';
import getStyles from '../../utils/PersonalStyles';
import {getColor} from '../../../../themes/GetColor';
import CountryCode from '../../../Login/components/CountyCodePicker';
import {Countries} from '../../../Login/Countries'
import { setCurrentUserProfile, setPrimaryContactsList, setPrimaryIndex } from '../../slices/PersonalProfileStates';
import ContactsList from './ContactsList';
import OTPBottomSheet from '../../../Login/components/OTPBottomSheet';
import { generateOTP, verifyOTP } from '../../../../apis/ApiRequests';
import { addBasicDetails, getDependentUsers, getMainProfile, getMembers } from '../../utils/PersonalServerRequests';
import VerificationSlice from '../../slices/VerificationSlice';
import { setDependantUsers, setDependantUsersEHID, setParentProfile } from '../../../../redux/slices/AddDependantUserSlice';
const PhoneNumber = ({refScreens}) => {
  const [otpBottomVisible, setOtpBottomVisible] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [otp, setOtp] = useState('');
  const [body,setBody] = useState({});
  const styles = getStyles();
  var help = {};
 
  const nameInputRef = useRef(null);
  const Color = getColor(useSelector(state => state.theme.theme));
  const CurrentProfile=useSelector(state=>state.PersonalReducers.general_states).current_user_profile;
  const phno=useSelector(state=>state.PersonalReducers.general_states).primary_contacts;
  const primaryInd=useSelector(state=>state.PersonalReducers.general_states).primary_index;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dpn, setDpn] = useState('');
  const [verifyInd,setVerifyInd]=useState(primaryInd);
  const [myPhoneNumbers, setMyPhoneNumbers] = useState([CurrentProfile.mobileno,...CurrentProfile.alternate_mobileno]);
  const [countryCode, setCountryCode] = useState('+91');
  const [error, setError] = useState(false);
  const dispatch=useDispatch();
  const [mod,setMod] = useState(false); 
  const refCC = useRef(null);
  function fetchPhoneNumber(enteredNumber) {
    setPhoneNumber(enteredNumber);
  }
  function phoneNumberHandler() {
    if (phoneNumber == '') {
     // openContacts();
      setMod(true);
    } else {
      savePhoneNumber(phoneNumber);
    }
  }
 
  
  function savePhoneNumber(phoneNumber) {
    console.log(phoneNumber,"fromkdjbcfhdauchgauiaydfvuyf")
    const ob={
      country_code:countryCode,
      number:phoneNumber,
    };
    if (myPhoneNumbers.length <= 2)
    setMyPhoneNumbers(phoneList => [...phoneList, ob]);
  else
  setError(true);
    setPhoneNumber('');

    setDpn('');
  }
  useEffect(()=>{
   if([...myPhoneNumbers].length<=3)
   {
    setError(false);
   }
   else
   {
    setError(true);
   }
  },[myPhoneNumbers]);
  const renderCCBottomSheet = () => {
    return (
      <CountryCode
      
        onChange={value => {
          setCountryCode(value);
          refCC.current.close();
        }}
      />
    );
  };
  
  function cancel(){
    console.log('okok')
  }
  async function accept(data){
    // console.log(myPhoneNumbers[primary],"FROM PRIMARY");
    help = data;
    const bodyData = {
      emailormob: data.number,
      country_code: data.country_code,
      action:'mpin'
    };
    // setVerifyData(data);
    // console.log(bodyData,"KJBKJKGHJVUTDFBNYTRTYBU");
    
   // var res = 1;
    const res = await generateOTP(bodyData);
      if(res == 200){
        setOtpBottomVisible(true)
      }else{
        console.log('NOt working');
      }
  }

  async function verifyOnetimepassword(otp){

    const bodyData = {
      emailormob: myPhoneNumbers[verifyInd].number,
      country_code: myPhoneNumbers[verifyInd].country_code,
      otp: otp,
    };
    const res = await verifyOTP(bodyData);
    console.log(res,"RESULT=");
    if(res == true){
      console.log("SUCCESS OTP");
      setPrimary(verifyInd);
      Alert.alert("Successs");

    }else{
      Alert.alert("Failure");
    }
}

  const showAlert = (data) => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to proceed?',
      [
        {
          text: 'Cancel',
          style: 'cancel', 
          onPress:cancel
        },
        {
          text: 'Accept',
          onPress: ()=>{accept(data)},
        },
      ],
      { cancelable: false } // Prevents dismissing the alert by tapping outside of it
    );
  };

  const savephnumber=(e)=>{
      setPhoneNumber(e)
      setDpn(e);
  }
  const handlePhoneNumberChange = text => {
    // Verification Code for phone number

    // var extractedNumbers;
    // if (text != '') {
    //   const stringWithoutSpaces = text.replace(/\s/g, '');
    //   const numbers = stringWithoutSpaces.match(/\d+/g);
    //   if (numbers != null) extractedNumbers = numbers.join('');
    //   //  setPhoneNumber(extractedNumbers);
    //   console.log(phoneNumber);
    // }
    // let country = Countries.find(country => country.dialCode === countryCode);
    // const formattedPhoneNumber = text.replace(/\D/g, '');
    // let mask = country.mask;
    // let formatted = '';
    // let phoneNumberIndex = 0;
    // for (let i = 0; i < mask.length; i++) {
    //   if (phoneNumberIndex >= formattedPhoneNumber.length) break;
    //   if (mask[i] === '9') {
    //     formatted += formattedPhoneNumber[phoneNumberIndex];
    //     phoneNumberIndex++;
    //   } else {
    //     formatted += mask[i];
    //   }
    // }
    // setDpn(formatted);
    // const numbersArray = formatted.match(/\d+|\s+/g);
    // if (numbersArray != null) {
    //   const concatenatedNumbers = numbersArray
    //     .filter(item => /\d+/.test(item))
    //     .join('');
    //   setPhoneNumber(`${concatenatedNumbers}`);
    // } else setPhoneNumber(extractedNumbers);

    setDpn(text);
    setPhoneNumber(text);
  };


  const deleteMyPhoneNumber = (index) => {
    let arr = myPhoneNumbers;
    if(primary>index){
      setPrimary(primary-1);
    }
    arr = arr.filter((data, key) => {
      if (key != index) {
        return data;
      }
    });
    setMyPhoneNumbers(arr);
  };
  const [primary, setPrimary] = useState(primaryInd);
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
    console.log("UPDATED PHONE NUMBER DATA",combinedData);

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
  useEffect(()=>{
   dispatch(setPrimaryContactsList(myPhoneNumbers));
   dispatch(setPrimaryIndex(primary));
   const mobileNumber=myPhoneNumbers[primary];
   const arr=myPhoneNumbers.filter((data,index)=> index!=primary);
   console.log("MOBILE NUMBER=",arr);
   console.log("Primary NUMBER=",mobileNumber);
   addBasicDetails(CurrentProfile.access_token,{
    mobileno:mobileNumber==undefined?'':mobileNumber,
    alternate_mobileno:[...arr].length==0?'':arr,
    alternate_email_id:'',
    weight:'',
    height:''
  },{});
  fetchDependentUsers();
  console.log("ADDED DETAILS=",CurrentProfile);
  },[primary,myPhoneNumbers])
  return (
    <View style={{...styles.parentWidth, marginBottom: 20}}>
      <Text style={[styles.heading17, styles.headingStyle]}>
        Calling Details{'\n'}
        <Text style={styles.subHeading13}>Connections | Emergency </Text>
      </Text>
      <Text style={styles.heading17}>Add Phone Number</Text>
      <OTPBottomSheet
        isVisible={otpBottomVisible}
        isTimerRunning={isTimerRunning}
        setIsTimerRunning={setIsTimerRunning}
        onClose={() => {
          setOtpBottomVisible(false);
        }}
        resendOtp={() => {
          // GenerateOTPP();
          generateOTP();
        }}
        onClick={otp => {
          setOtpBottomVisible(false);
          setOtp(otp);
          verifyOnetimepassword(otp);
        }}
      />
      <View style={styles.textFieldRowBetween}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Color.textfieldContainer,
            borderRadius: 10,
          }}>
          <Pressable
            onPress={() => {
              refCC.current.open();
            }}>
            <View style={{padding: 10}}>
              <Text>{countryCode}</Text>
            </View>
          </Pressable>
        </View>
        {/* <Modal visible={mod} onRequestClose={()=>{setMod(false)}} > */}
                <ContactsList refer={refScreens} create={false} mod={mod} setMod={setMod} setPhoneNumber={savephnumber}/>
        {/* </Modal> */}
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          {/* <CountryCode onChange={()=>{}}/> */}
          <View
            style={{
              flex: 1,
              backgroundColor: Color.textfieldContainer,
              borderRadius: 10,
              padding: 15,
              marginHorizontal: 5,
            }}>
            <TextInput
              ref={nameInputRef}
              keyboardType="phone-pad"
              placeholder={!error ? 'Enter mobile number' : 'Max 3 numbers are allowed'}
              placeholderTextColor={error ? Color.red : null}
              value={dpn}
              onChangeText={e => {
                handlePhoneNumberChange(e);
              }}
             
            />
          </View>
        </View>
        <Pressable
          onPress={phoneNumberHandler}
          style={{
            borderRadius: 10,
            backgroundColor: Color.textfieldContainer,
            width: '15%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={
              phoneNumber == ''
                ? require('../../assets/icons/user-octagon.png')
                : require('../../assets/icons/sendBold.png')
            }
            style={{width: 30, height: 30, tintColor: Color.calend_card_color1}}
          />
        </Pressable>
      </View>

      <Text style={{...styles.heading17, marginTop: 10}}>
        My Phone Numbers{' '}
      </Text>
      {myPhoneNumbers.map((phoneNumber, ind) => (
        <View style={styles.inputContainerRow} key={ind}>
          <Text style={styles.cardTitle}>{phoneNumber.number}</Text>
          <View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
          {/* {ind != primary ? ( */}
          <View>
            <Pressable
              onPress={() => {
                // setTest(!test);
                if(ind!=primary)
                deleteMyPhoneNumber(ind);
              }}
              style={{
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../assets/icons/trash.png')}
                style={{
                  ...styles.smallIcon,
                  opacity:ind!=primary?1:0,
                  // display:ind==primary?'none':null,
                  marginHorizontal: 20,
                }}
              />
            </Pressable>
            </View>
          {/* ) : null} */}
          <Pressable
           onPress={()=>{
            // setPrimary(ind);
            setVerifyInd(ind);
            showAlert(myPhoneNumbers[ind]);
            console.log(myPhoneNumbers[ind])
           }}
          >
            <Image
              source={require('../../assets/icons/verify.png')}
              style={{
                ...styles.smallIcon,
                tintColor: primary==ind?'#e0ff17':Color.greenyellow,
                marginHorizontal: 20,
              }}
            />
          </Pressable>
          </View>
        </View>
      ))}

      <HandleBottomSheet
        containerStyle={{backgroundColor: Color.li_bottomsheet_bg}}
        bottomSheetRef={refCC} // Update the reference to refOTP
        content={renderCCBottomSheet()}
        nestedScrollEnabled={true}
        height={320}
      />
    </View>
  );
};

export default PhoneNumber;
