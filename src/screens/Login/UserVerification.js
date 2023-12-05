import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert, Dimensions,} from 'react-native';
import React, { useState} from 'react';
import { Color, commonColors, darkThemeColors, lightThemeColors,} from '../../themes/Color';
import { responsiveFontSize, responsiveHeight, responsiveWidth,} from '../../themes/ResponsiveDimensions';
import { generateOTP, login, signup, verifyOTP, verifyUser,} from '../../apis/ApiRequests';
import CountyCodePicker from './components/CountyCodePicker';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import CustomToast from '../_components/toast/CustomToast';
import OTPBottomSheet from './components/OTPBottomSheet';
import {validatePassword} from '../../utils/Validator/Validator';
import Loader from '../_components/loader/Loader';
import {getColor} from '../../themes/GetColor';
import {setUserToken} from '../../redux/slices/UserOnboardingSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Countries } from './Countries';
import { TextInputFields } from '../_components';
const UserVerification = () => {

  
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');
  const [laoderVisible, setLoaderVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dpn,setDpn] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [currentAction, setCurrentAction] = useState('Get Started');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [openCodePicker, setOpenCodePicker] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [otpBottomVisible, setOtpBottomVisible] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [otp, setOtp] = useState('');
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('');
  const [autoOtp, setAutoOtp] = useState('');
  var theme = useSelector(state => state.theme)
  const Color=getColor(theme.theme)

  const verify = async () => {
    
    if (phoneNumber.length < 10) {
      Alert.alert('Please Enter Valid Mobile Number');
    } else {
      setLoaderVisible(true);
      const bodyData = {
        emailormoborehid: phoneNumber,
        country_code: countryCode,
      };
      const response = await verifyUser(bodyData);
      setLoaderVisible(false);
      console.log("VERIFY RESPONE",response);
      if (response == 200) {
        setCurrentAction('Login');
      } else if (response == 400) {
        setCurrentAction('Create Account');
      }
    }
  };

  const GenerateOTPP = async () => {
    if (phoneNumber.length < 10) {
      setMsg('Please enter valid phone number');
      setMsgType('warning');
      setToastVisible(true);
      return;
    } else if ( currentAction == 'Create Account' && validatePassword(password) == false) {
      setMsg('Please enter valid password');
      setMsgType('warning');
      setToastVisible(true);
      return;
    } else {
      setLoaderVisible(true);
      const bodyData = {
        emailormob: phoneNumber,
        country_code: countryCode,
        action:
          currentAction == 'Create Account'
            ? 'signup'
            : currentAction == 'Login'
            ? 'login'
            : 'forgotPassword',
      };
      const response = await generateOTP(bodyData);
      setLoaderVisible(false);
      console.log("FROM RES USEER",response);
      if (response == 200) {
        // setTimer(timer_value); // Reset the timer to the initial value
        setIsTimerRunning(true); // Start the timer
        setOtpBottomVisible(true);
        // console.log()
        // if (currentAction == 'Login') {
        //   Login();
        // }
      } else {
        //errorToast('Error', 'Something went wrong');
        setMsg('Something went wrong');
        setMsgType('error');
        setToastVisible(true);
      }
    }
  };
  const CreateAccount = async otp => {
    setLoaderVisible(true);

    const bodyData = {
      emailormob: phoneNumber,
      country_code: countryCode,
      otp: otp,
      password: password,
    };
    // console.log(bodyData);
    const response = await signup(bodyData);
    setLoaderVisible(false);
    if (response == 200) {
      navigation.navigate('Welcome');
      setMsg('User details saved successfully');
      setMsgType('success');
      setToastVisible(true);
    } else {
      setMsg('This mobile number is already registered');
      setMsgType('info');
      setToastVisible(true);
    }
  };
  const Login = async () => {
    setLoaderVisible(true);
    const bodyData = {
      emailormob: phoneNumber,
      password: password,
    };
    console.log(bodyData)
    const response = await login(bodyData);


    setLoaderVisible(false);
    if (response && response.login == true) {
      const user = response;
      try {
        await AsyncStorage.setItem('userToken', user.access_token[0]);
        console.log("I WANT TO KBNWOOWOWOOWOWO",user.access_token[0]);
        console.log('User token saved successfully!');
      } catch (error) {
        console.error('Error saving user token:', error);
      }
    
     
     
      if (
        user.user_first_name == null ||
        user.user_first_name == '' ||
        user.user_first_name == undefined ||
        user.user_last_name == 'null' ||
        user.user_last_name == '' ||
        user.user_last_name == undefined ||
        user.age == 'null' ||
        user.age == '' ||
        user.age == undefined ||
        user.gender == 'null' ||
        user.gender == '' ||
        user.gender == undefined
      ) {
        console.log("BOOKOOOKOKOKOKKOKOOKOK")
        dispatch(setUserToken(user.access_token[0]));
        setMsg('Login Successful');
        setMsgType('success');
        setToastVisible(true);
        navigation.navigate('Welcome');
      } else {
        //  dispatch(setUserDetails(user));
        //navigation.navigate('BottomTab');
        console.log('not handked')
        dispatch(setUserToken(user.access_token[0]));
        setMsg('Login Successful');
        setMsgType('success');
        setToastVisible(true);
        navigation.replace('BottomTab');
        
      }
    } else {
      setMsg('Invalid credentials');
      setMsgType('error');
      setToastVisible(true);
    }
  };

  const otpVerify = async otp => {
    setLoaderVisible(true);
    const bodyData = {
      emailormob: phoneNumber,
      country_code: countryCode,
      otp: otp,
    };
    const response = await verifyOTP(bodyData);
    setLoaderVisible(false);
    console.log("OTP VERIFY RESPONSE",response);
    if (response == true) {
      setMsg(response.message);
      setMsgType('success');
      setToastVisible(true);
      CreateAccount(otp);
    } else {
      //errorToast('Error', 'Something went wrong');
      setMsg('Something went wrong');
      setMsgType('error');
      setToastVisible(true);
    }
  };
  const LoginWithOtp = async otp => {
    setLoaderVisible(true);
    const bodyData = {
      emailormob: phoneNumber,
      otp: otp,
    };
    const response = await login(bodyData);
     const user = response ;

     try {
      await AsyncStorage.setItem('userToken', user.access_token[0]);
      console.log("I WANT TO KBNWOOWOWOOWOWO",user.access_token[0]);
      console.log('User token saved successfully!');
    } catch (error) {
      console.error('Error saving user token:', error);
    }

    setLoaderVisible(false);
    if (response && response.login == true) {
     //  await initialCheck();
      if (
        user.user_first_name == null ||
        user.user_first_name == '' ||
        user.user_first_name == undefined ||
        user.user_last_name == 'null' ||
        user.user_last_name == '' ||
        user.user_last_name == undefined ||
        user.age == 'null' ||
        user.age == '' ||
        user.age == undefined ||
        user.gender == 'null' ||
        user.gender == '' ||
        user.gender == undefined
      ) {
        navigation.navigate('Welcome');
        setMsg('Login Successful');
        setMsgType('success');
        setToastVisible(true);
      } else {
      navigation.replace('BottomTab')
      setMsg('Login Successful');
      setMsgType('success');
      setToastVisible(true);
       }
    } else {
      setMsg('Invalid OTP');
      setMsgType('error');
      setToastVisible(true);
    }
  };
  const onSubmit = () => {
    currentAction === 'Get Started' ? verify() : currentAction === 'Create Account' ? GenerateOTPP() : currentAction === 'Login' && Login();
  };
  const handlePhoneNumberChange = (text) => {
    const stringWithoutSpaces = text.replace(/\s/g, '');
    const extractedNumbers = stringWithoutSpaces.match(/\d+/g)?.join('') || '';
  
    let country = Countries.find((country) => country.dialCode === selectedCountryCode);
    const formattedPhoneNumber = text.replace(/\D/g, '');
    let mask = country.mask || '';
    let formatted = '';
    let phoneNumberIndex = 0;
  
    for (let i = 0; i < mask.length && phoneNumberIndex < formattedPhoneNumber.length; i++) {
      formatted += mask[i] === '9' ? formattedPhoneNumber[phoneNumberIndex++] : mask[i];
    }
  
    setDpn(formatted);
  
    const numbersArray = formatted.match(/\d+|\s+/g);
    const concatenatedNumbers = numbersArray?.filter((item) => /\d+/.test(item))?.join('') || '';
  
    setPhoneNumber(concatenatedNumbers || extractedNumbers);
  };
  

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : ''}>
      <ScrollView style={styles.container}>
        <LinearGradient
          colors={[Color.linearFS1, Color.linearFS2, Color.linearFS3]}
          style={styles.container}>
          <Image
            source={require('../../assets/whiteFullLogo.png')}
            style={[
              styles.logo,
              {
                tintColor: Color.fontReadTheme,
              },
            ]}
          />
          <Text
            style={[
              styles.welcome,
              {
                color: Color.fontReadTheme,
              },
            ]}>
            {currentAction == 'Login' && otpBottomVisible
              ? 'Login with OTP'
              : currentAction == 'Login' && !otpBottomVisible
              ? 'Welcomes You Back'
              : 'Welcomes You'}
          </Text>
          <View style={styles.mobileView}>
            <TouchableOpacity
              style={[
                styles.countryCodeBtn,
                {
                  backgroundColor: Color.linearInactive,
                },
              ]}
              onPress={() => {
                setOpenCodePicker(true);
              }}>
              <Text
                style={[
                  styles.countryCode,
                  {
                    color: Color.fontReadTheme,
                  },
                ]}>
                {selectedCountryCode}
              </Text>
            </TouchableOpacity>
            {/* <CustomTextInput
              onChangeText={(txt)=>{
                handlePhoneNumberChange(txt)
              }}
              value={dpn}  
              title={'Mobile Number'}
              onSubmitEditing={() => {}}
              onBlur={() => {}}
              keyboardType={'number-pad'}
              w={responsiveWidth(65)}
              bg= {'rgba(0,0,0,0)'}
              color={Color.white}
            /> */}
            <TextInputFields 
            label={'Mobile Number'}
            onChange={(txt)=>{ handlePhoneNumberChange(txt)}}
            value={dpn}
            keyboardType={'number-pad'}
            containerStyle={{width:responsiveWidth(70),marginLeft:responsiveWidth(10),backgroundColor:'rgba(1,1,1,0.7)'}}
            />
          </View>
          {currentAction != 'Get Started' && (
            <View style={[styles.mobileView, {marginTop: responsiveHeight(3)}]}>
              <TouchableOpacity
                style={[
                  styles.countryCodeBtn,
                  {backgroundColor: Color.linearInactive},
                ]}
                onPress={() => {
                  setShowPassword(!showPassword);
                }}>
                <Image
                  source={
                    showPassword
                      ? require('../../assets/eye.png')
                      : require('../../assets/hidden.png')
                  }
                  style={[styles.eye, {tintColor: Color.fontReadTheme}]}
                />
              </TouchableOpacity>
              {/* <CustomTextInput
                onSubmitEditing={() => {console.log('HI')}}
                onBlur={() => {}}
                onChangeText={txt => setPassword(txt)}
                title={'Password'}
                secureEntry={showPassword}
                keyboardType={'default'}
                w={responsiveWidth(65)}
                bg={''}
                color={Color.white}
                cursorColor = {Color.color1}
              /> */}
              <TextInputFields
                label={'Password'}
                containerStyle={{width:responsiveWidth(70),marginLeft:responsiveWidth(10)}}
                onChange={txt => setPassword(txt)}
                keyboardType={'default'}
                secureTextEntry={showPassword}
              />
            </View>
          )}
          {currentAction == 'Create Account' && (
            <Text
              style={[
                styles.passwordNote,
                {
                  color: Color.textfield_fontInactive,
                },
              ]}>
              Minimum 6 characters with Aa-Zz, 0-9, and special
            </Text>
          )}
          {currentAction == 'Login' && (
            <Text
              style={{
                color: Color.fontReadTheme,
                alignSelf: 'flex-end',
                marginRight: responsiveWidth(5),
                marginTop: responsiveHeight(2),
                fontSize: responsiveFontSize(2.2),
                fontWeight: '500',
              }}
              onPress={() => {
                GenerateOTPP();
              }}>
              Login with OTP
            </Text>
          )}
          <TouchableOpacity
            style={[styles.btn, {backgroundColor: Color.linearInactive}]}
            onPress={() => {
              onSubmit();
            }}>
            <Text
              style={[
                styles.countryCode,
                {
                  fontSize: responsiveFontSize(2.5),
                  color: Color.white
                },
              ]}>
              {currentAction}
            </Text>
            <Image
              source={require('../../assets/ArrowRight.png')}
              style={[styles.arrow, {tintColor: 'white'}]}
            />
          </TouchableOpacity>
          {currentAction == 'Login' && (
            <Text
              style={{
                color: Color.fontReadTheme,
                alignSelf: 'flex-end',
                width: '70%',
                fontSize: responsiveFontSize(2.2),
                marginTop: responsiveHeight(2),
                fontWeight: '500',
              }}
              onPress={() => {
                navigation.navigate('ForgotPassword', {
                  phoneNumber: phoneNumber,
                });
              }}>
              Forgot Password ?
            </Text>
          )}
        </LinearGradient>
        <CountyCodePicker
          isVisible={openCodePicker}
          onClose={() => {
            setOpenCodePicker(false);
          }}
          onSelect={x => {
            setSelectedCountryCode(x);
            setOpenCodePicker(false);
            console.log(x)
          }}
        />
      </ScrollView>
      {toastVisible && (
        <CustomToast
          visible={toastVisible}
          onClose={() => {
            setToastVisible(false);
          }}
          bg={
            msgType == 'error'
              ? 'red'
              : msgType == 'success'
              ? 'green'
              : msgType == 'warning'
              ? 'orange'
              : 'white'
          }
          title={msg}
          icon={'globe'}
          iconColor={'white'}
          msgColor={
            msgType == 'error'
              ? 'white'
              : msgType == 'success'
              ? 'white'
              : msgType == 'warning'
              ? 'orange'
              : 'black'
          }
        />
      )}
      <OTPBottomSheet
        isVisible={otpBottomVisible}
        // autoOtp={autoOtp}
        isTimerRunning={isTimerRunning}
        setIsTimerRunning={setIsTimerRunning}
        onClose={() => {
          setOtpBottomVisible(false);
        }}
        resendOtp={() => {
          GenerateOTPP();
        }}
        onClick={otp => {
          setOtpBottomVisible(false);
          setOtp(otp);
          if (currentAction == 'Create Account') {
            // CreateAccount();
            otpVerify(otp);
          } else {
            LoginWithOtp(otp);
          }
        }}
      />
      <Loader visible={laoderVisible} />
    </KeyboardAvoidingView>
  );
};

export default UserVerification;
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    // backgroundColor: darkThemeColors._backgroundModerate,
  },
  logo: {
    width: responsiveWidth(70),
    height: responsiveHeight(20),
    resizeMode: 'contain',
    marginLeft: responsiveWidth(10),
    marginTop: responsiveHeight(10),
  },
  welcome: {
    fontSize: 28,
    fontWeight: '500',
    marginLeft: responsiveWidth(15),
  },
  mobileView: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: responsiveHeight(10),
  },
  countryCodeBtn: {
    width: responsiveWidth(20),
    height: responsiveHeight(5),
    borderRadius: responsiveWidth(3),

    justifyContent: 'center',
    alignItems: 'center',
  },
  countryCode: {
    fontWeight: '600',
  },
  eye: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
  },
  btn: {
    width: '75%',
    height: responsiveHeight(6.7),

    alignSelf: 'center',

    marginTop: responsiveHeight(5),
    borderRadius: responsiveWidth(3),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: responsiveWidth(3),
    paddingRight: responsiveWidth(4),
    justifyContent: 'center',
  },
  arrow: {
    width: responsiveWidth(15),
    height: responsiveHeight(3),
    marginLeft: responsiveWidth(4),
  },
  passwordNote: {
    alignSelf: 'flex-end',
    fontSize: responsiveFontSize(1.5),
    width: '70%',
    marginRight: responsiveWidth(3),
    marginTop: responsiveHeight(0.5),
  },
});

// {"access_token": ["eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjk1OTc1NTUxLCJqdGkiOiI5MzYxNDMzMy02Mjk0LTRjYTAtODAzMy04NjhiMTEzYTE2YTAiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMDkxMDAwMDAwMDA0OSIsIm5iZiI6MTY5NTk3NTU1MX0.7_XyCU1NBhyNANGUlWBxbVlWU5dLgldfC6OnjfbrJBU"], "basic_percentage": 58.333333333333336, "country_code": "+91", "eh_user_id": "0910000000049", "eh_user_role_id": "EHURO120", "emergency_percentage": 0, "flag": true, "is_primary": true, "medical_percentage": 0, "mobileno": "8383006681", "organogram_level": "independent", "password": "3332a523408b635ed194e2abc53c554fc4284f4d67bd28a62d1f27902cbed2e7b1b4e0ff0bd7a8bb32e526bab2b46c0bf9513d8845609c1263562c76644e3182", "qr_code_url": "UserData/0910000000049/QRCode/QR_eh_user_id0910000000049.png", "role": "independent", "total_percentage": 19.444444444444446}
