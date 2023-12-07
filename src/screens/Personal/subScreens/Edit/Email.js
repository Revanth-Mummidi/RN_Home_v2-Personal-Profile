/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Image, Pressable, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInputFields} from '../../../_components';
// import {Color} from '../../../../themes';
// import styles from '../../utils/PersonalStyles';
import {useDispatch, useSelector} from 'react-redux';
import getStyles from '../../utils/PersonalStyles';
import { getColor } from '../../../../themes/GetColor';
import { setPrimaryEmails, setPrimaryMailIndex } from '../../slices/PersonalProfileStates';
import { generateOTP, verifyOTP } from '../../../../apis/ApiRequests';
import OTPBottomSheet from '../../../Login/components/OTPBottomSheet';
import { addBasicDetails } from '../../utils/PersonalServerRequests';
const Email = () => {
  const styles=getStyles();
  const Color=getColor(useSelector(state=>state.theme.theme));
  const mailInd=useSelector(state=>state.PersonalReducers.general_states).primary_mail_index;
  const mails=useSelector(state=>state.PersonalReducers.general_states).personal_email;
  const CurrentProfile=useSelector(state=>state.PersonalReducers.general_states).current_user_profile;
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [otpBottomVisible,setOtpBottomVisible]=useState(false);
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [emailList, setEmailList] = useState(mails);
  const [invalidEmail,setInvalidEmail]=useState(0);
  const [primary,setPrimary]=useState(mailInd);
  const [verifyInd,setVerifyInd]=useState(primary);
  
  
  function enteredMail(enteredmail) {
    setInvalidEmail(0);
    setEmail(enteredmail);
    console.log(email);
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

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  function saveEmails() {
    if(validateEmail(email)){
    if([...emailList].length<=1){
    showAlert(email)
    
    }
    else
    setInvalidEmail(2);
    }
    else
    {
      setInvalidEmail(1);
    }
    setEmail('');
    console.log(emailList);
  }
  const deleteMyEmailID=(index)=>{
     let arr = emailList;
    if(primary>index){
      setPrimary(primary-1);
      setVerifyInd(primary-1);
    }
    arr = arr.filter((data, key) => {
      if (key != index) {
        return data;
      }
    });
    setEmailList(arr);
  }

  function cancel(){
    console.log('okok')
  }
  async function accept(data){
    // console.log(myPhoneNumbers[primary],"FROM PRIMARY");
    help = data;
    const bodyData = {
      emailormob: data,
      country_code:'',
      action:'login'
    };
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
      emailormob:emailList[verifyInd],
      country_code:'',
      otp: otp,
    };
    const res = await verifyOTP(bodyData);
    console.log(res,"RESULT=");
    if(res == true){
      console.log("SUCCESS OTP");
      setEmailList(currentMail => [...currentMail, email]);
      setPrimary(verifyInd);

      Alert.alert("Successs");

    }else{
      Alert.alert("Failure");
    }
}


  
  const dispatch=useDispatch();
  useEffect(()=>{
   dispatch(setPrimaryEmails(emailList));
   dispatch(setPrimaryMailIndex(primary));
   addBasicDetails(CurrentProfile?.access_token,{
    mobileno:'',
    alternate_mobileno:'',
    alternate_email_id:[emailList[!primary]],
    weight:'',
    height:''
  },{email_id:emailList[primary]});
  },[emailList,primary]);
  return (
    <View style={{flex: 1, width: '100%', padding: 10}}>
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
          // setOtp(otp);
          verifyOnetimepassword(otp);
        }}
      />
      <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>

      <Text style={[styles.heading17, styles.headingStyle,{marginBottom:10,marginTop:0}]}>
        Mailing Details
      </Text>
        <Text style={{...styles.subHeading13,marginBottom:20}}>Notifications</Text>
        </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{width: '83%'}}>
          <TextInputFields
            label={'Email'}
            value={email}
            keyboardType={'email-address'}
            error={invalidEmail==1?'Enter valid email id':invalidEmail==2?'Max two emails can be entered':''}
            errorColor={Color.red}
            onChange={enteredMail}
          />
        </View>

        <Pressable
          onPress={saveEmails}
          style={{
            borderRadius: 10,
            backgroundColor: Color.textfieldContainer,
            width: '15%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/icons/sendBold.png')}
            style={{width: 30, height: 30, tintColor: Color.calend_card_color1}}
          />
        </Pressable>
      </View>
      <Text style={{...styles.heading17, marginTop: 20}}>My E-mails</Text>
      {emailList.map((mail,ind) => (
        <View style={styles.inputContainerRow} key={ind}>
          <Text style={styles.cardTitle}>{mail}</Text>
          <View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
          {/* {ind != primary ? ( */}
          <View>
            <Pressable
              onPress={() => {
                // setTest(!test);
                if(ind!=primary)
                deleteMyEmailID(ind);
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

      {/* <View style={styles.inputContainerRow}>
        <Text style={styles.cardTitle}>abc.xyz</Text>
        <Pressable
          onPress={() => {
            setTest(!test);
          }}
          style={{
            justifyContent: 'center',
          }}>
          <Image
            source={require('../../assets/icons/trash.png')}
            style={{
              ...styles.smallIcon,
              marginHorizontal: 20,
            }}
          />
        </Pressable>
        <Pressable
          style={{
            justifyContent: 'center',
          }}>
          <Image
            source={require('../../assets/icons/verify.png')}
            style={{
              ...styles.smallIcon,
              tintColor: Color.greenyellow,
              marginHorizontal: 20,
            }}
          />
        </Pressable>
      </View> */}
    </View>
  );
};

export default Email;
