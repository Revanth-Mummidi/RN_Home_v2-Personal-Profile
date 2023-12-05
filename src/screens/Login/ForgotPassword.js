import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {Color, darkThemeColors, lightThemeColors} from '../../utils/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../themes/ResponsiveDimensions';
import CustomTextInput from '../_components/userInteractions/CustomTextInput';
import {
  forgotPassword,
  generateOTP,
  login,
  signup,
  verifyOTP,
  verifyUser,
} from '../../apis/ApiRequests';
import CountyCodePicker from './components/CountyCodePicker';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomToast from '../_components/toast/CustomToast';
import OTPBottomSheet from './components/OTPBottomSheet';
import {validatePassword} from '../../utils/Validator/Validator';
import Loader from '../_components/loader/Loader';
import { getColor } from '../../themes/GetColor';
import { TextInputFields } from '../_components';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const route = useRoute();
  console.log(route.params);
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState(route.params.phoneNumber);
  const [countryCode, setCountryCode] = useState('+91');
  const [currentAction, setCurrentAction] = useState('Reset');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [openCodePicker, setOpenCodePicker] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [otpBottomVisible, setOtpBottomVisible] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [otp, setOtp] = useState('');
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('');
  const theme = useSelector(state => state.theme);
  const Color=getColor(theme.theme)

  const GenerateOTPP = async () => {
    if (phoneNumber.length < 10) {
      setMsg('Please enter valid phone number');
      setMsgType('warning');
      setToastVisible(true);
      return;
    } else if (validatePassword(password) == false) {
      setMsg('Please enter valid password');
      setMsgType('warning');
      setToastVisible(true);
      return;
    } else {
      setLoaderVisible(true);
      const bodyData = {
        emailormob: phoneNumber,
        country_code: countryCode,
        action: 'forgotPassword',
      };
      const response = await generateOTP(bodyData);
      setLoaderVisible(false);
      console.log(response);
      if (response == 200) {
        // setTimer(timer_value); // Reset the timer to the initial value
        setIsTimerRunning(true); // Start the timer
        setOtpBottomVisible(true);
      } else {
        //errorToast('Error', 'Something went wrong');
        setMsg('Something went wrong');
        setMsgType('error');
        setToastVisible(true);
      }
    }
  };

  const resetPassword = async otp => {
    if (phoneNumber.length < 10) {
      setMsg('Please enter valid mobile number');
      setMsgType('warning');
      setToastVisible(true);
    } else {
      const bodyData = {
        emailormob: phoneNumber,
        country_code: countryCode,
        newPassword: password,
        otp: otp,
      };
      setLoaderVisible(true);
      const response = await forgotPassword(bodyData);
      setLoaderVisible(false);
      console.log(response);

      if (response == 200) {
        setMsg('Password Changed successfully ');
        setMsgType('success');
        setToastVisible(true);
        setTimeout(() => {
          navigation.goBack();
        }, 1000);
      } else if (response == 400) {
        setMsg('Invalid OTP');
        setMsgType('error');
        setToastVisible(true);
      } else if (response == 404) {
        setMsg('User Not Found');
        setMsgType('error');
        setToastVisible(true);
      }
    }
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
            style={[styles.logo,{tintColor:Color.fontReadTheme}]}
          />
          <Text style={[styles.welcome,{color:Color.fontReadTheme}]}>{'Reset Password'}</Text>
          <View style={styles.mobileView}>
            <TouchableOpacity
              style={[styles.countryCodeBtn,{
                backgroundColor:Color.linearInactive
              }]}
              onPress={() => {
                setOpenCodePicker(true);
              }}>
              <Text style={styles.countryCode}>{selectedCountryCode}</Text>
            </TouchableOpacity>

            <TextInputFields
              label={'Mobile'}
              onChange={()=>{}}
              keyboardType={'number-pad'}
              containerStyle={{width:responsiveWidth(65)}}
              value={phoneNumber}
            />

            {/* <CustomTextInput
              onChangeText={()=>{}}
              title={'Mobile Number'}
              keyboardType={'number-pad'}
              value={phoneNumber}
              w={responsiveWidth(65)}
              onSubmitEditing={() => {}}
              onBlur={() => {}}
              bg={Color._backgroundModerate }
            /> */}
          </View>

          <View style={[styles.mobileView, {marginTop: responsiveHeight(3)}]}>
            <TouchableOpacity
              style={[styles.countryCodeBtn,{backgroundColor:Color.linearInactive}]}
              onPress={() => {
                setShowPassword(!showPassword);
              }}>
              <Image
                source={
                  showPassword
                    ? require('../../assets/eye.png')
                    : require('../../assets/hidden.png')
                }
                style={[styles.eye,{tintColor:Color.fontReadTheme}]}
              />
            </TouchableOpacity>
            {/* <CustomTextInput
              onChangeText={txt => setPassword(txt)}
              title={'New Password'}
              secureEntry={showPassword}
              onSubmitEditing={() => {}}
              onBlur={() => {}}
              keyboardType={'default'}
              w={responsiveWidth(65)}
              bg={Color._backgroundModerate}
            /> */}

            <TextInputFields
              secureTextEntry={showPassword}
              label={'New Password'}
              containerStyle={{width:responsiveWidth(65)}}
              onChange={txt => setPassword(txt)}
              keyboardType={'default'}
            />
          </View>

          <Text style={[styles.passwordNote,{
            color:Color.textfield_fontWrite
          }]}>
            Minimum 6 characters with Aa-Zz, 0-9, and special
          </Text>

          <TouchableOpacity
            style={[styles.btn,{backgroundColor:Color.linearInactive}]}
            onPress={() => {
              GenerateOTPP();
            }}>
            <Text
              style={[
                styles.countryCode,
                {fontSize: responsiveFontSize(2.5), color:Color.common_WHITE},
              ]}>
              {currentAction}
            </Text>
            <Image
              source={require('../../assets/ArrowRight.png')}
              style={[styles.arrow,{tintColor:Color.common_WHITE}]}
            />
          </TouchableOpacity>
        </LinearGradient>
        <CountyCodePicker
          isVisible={openCodePicker}
          onClose={() => {
            setOpenCodePicker(false);
          }}
          onSelect={x => {
            setSelectedCountryCode(x);
            setOpenCodePicker(false);
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
              ? 'white'
              : 'black'
          }
        />
      )}
      <OTPBottomSheet
        isVisible={otpBottomVisible}
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
          resetPassword(otp);
        }}
      />
      <Loader visible={loaderVisible} />
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
const styles = StyleSheet.create({
  container: {
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height
   // backgroundColor: darkThemeColors._backgroundModerate,
  },
  logo: {
    width: responsiveWidth(70),
    height: responsiveHeight(20),
    resizeMode: 'contain',
    marginLeft: responsiveWidth(10),
    marginTop: responsiveHeight(5),
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
    width: responsiveWidth(13),
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
