import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image,} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Modal from 'react-native-modal';
import {darkThemeColors} from '../../../themes/Color';
import {  responsiveFontSize,  responsiveHeight,  responsiveWidth,} from '../../../themes/ResponsiveDimensions';
import {useSelector} from 'react-redux';
// import  { removeListener, startOtpListener} from 'react-native-otp-verify';
import {getColor} from '../../../themes/GetColor';
const OTPBottomSheet = ({ isVisible, onSelect, onClose, resendOtp, isTimerRunning, setIsTimerRunning, onClick}) => {
  const [input1, setInpu1] = useState('');
  const [input2, setInpu2] = useState('');
  const [input3, setInpu3] = useState('');
  const [input4, setInpu4] = useState('');
  const [input5, setInpu5] = useState('');
  const [input6, setInpu6] = useState('');
  const timer_value = 30; // Initial timer value in seconds
  const [timer, setTimer] = useState(timer_value);
  const theme = useSelector(state => state.theme);
  const Color = getColor(theme.theme);
  useEffect(() => {
    setTimer(timer_value);
    setIsTimerRunning(true);
  }, [isVisible]);
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef();

  useEffect(() => {
    if (Platform.OS === 'android') {
      // OTPVerify.getHash().then(hash => {
      // console.log(hash);
      // try {
      //   startOtpListener(message => {
      //     console.log(message);
      //     if (message != null || message != 'Timeout Error.') {
      //       // extract the otp using regex e.g. the below regex extracts 4 digit otp from message
      //       if (message.search('Xc0wY/rGn/o') != -1) {
      //         const otp = /(\d{6})/g.exec(message)[1];
      //         console.log("KLKJJLKKLLKLKLK",otp);
      //         let mOTP = otp.split('');
      //         setInpu1(mOTP[0]);
      //         setInpu2(mOTP[1]);
      //         setInpu3(mOTP[2]);
      //         setInpu4(mOTP[3]);
      //         setInpu5(mOTP[4]);
      //         setInpu6(mOTP[5]);

      //         setTimer(timer_value);
      //         setIsTimerRunning(false);
            
            
  
      //         onClick(otp);
      //       } else {
      //         console.log('false');
      //       }
      //     } else {
      //       console.log('sdsds');
      //     }
      //     //  setAutoOtp(otp);
      //   });
      // } catch (e) {
      //   console.log(e);
      // }

      // });
    }
    // return () => {
    //   // Clean up OTPVerify listener
    //   removeListener();
    // };
  }, [isVisible]);
  useEffect(() => {
    // Update the timer every second
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    // Clear the interval when the timer reaches 0
    if (timer === 0) {
      setIsTimerRunning(false); // Stop the timer
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer]);
  // Format the remaining time in MM:SS format
  const formattedTime = `${Math.floor(timer / 60)
    .toString()
    .padStart(2, '0')}:${(timer % 60).toString().padStart(2, '0')}`;
  return (
    <Modal
      onBackButtonPress={() => { onClose(); }}
      onBackdropPress={() => { onClose();}}
      onSwipeComplete={() => {  onClose(); }}
      backdropOpacity={0.3}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={500}
      animationOutTiming={500}
      swipeDirection={'down'}
      isVisible={isVisible}
      style={{margin: 0}}>
      <View
        style={[styles.modalView, {backgroundColor: Color.li_bottomsheet_bg}]}>
        <View style={[styles.line]}></View>
        <Text style={styles.title}>Enter OTP</Text>
        <View style={styles.otpView}>
          <TextInput
            ref={ref1}
            value={input1}
            onChangeText={txt => {
              setInpu1(txt);
              if (txt.length == 1) {
                ref2.current.focus();
              }
            }}
            secureTextEntry={true}
            style={[styles.otpInput, {color: Color.common_WHITE,borderColor:  '#fff'}]}
            keyboardType="number-pad"
            maxLength={1}
          />
          <TextInput
            ref={ref2}
            value={input2}
            secureTextEntry={true}
            onChangeText={txt => {
              setInpu2(txt);
              if (txt.length == 1) {
                ref3.current.focus();
              } else {
                ref1.current.focus();
              }
            }}
            style={[styles.otpInput, {color: Color.common_WHITE,borderColor:'#fff'}]}
            keyboardType="number-pad"
            maxLength={1}
          />
          <TextInput
            value={input3}
            secureTextEntry={true}
            onChangeText={txt => {
              setInpu3(txt);
              if (txt.length == 1) {
                ref4.current.focus();
              } else {
                ref2.current.focus();
              }
            }}
            ref={ref3}
            style={[styles.otpInput, {color: Color.common_WHITE,borderColor:  '#fff'}]}
            keyboardType="number-pad"
            maxLength={1}
          />
          <TextInput
            value={input4}
            secureTextEntry={true}
            onChangeText={txt => {
              setInpu4(txt);
              if (txt.length == 1) {
                ref5.current.focus();
              } else {
                ref3.current.focus();
              }
            }}
            ref={ref4}
            style={[styles.otpInput, {color: Color.common_WHITE,borderColor:  '#fff'}]}
            keyboardType="number-pad"
            maxLength={1}
          />
          <TextInput
            value={input5}
            secureTextEntry={true}
            onChangeText={txt => {
              setInpu5(txt);
              if (txt.length == 1) {
                ref6.current.focus();
              } else {
                ref4.current.focus();
              }
            }}
            ref={ref5}
            style={[styles.otpInput, {color: Color.common_WHITE,borderColor:  '#fff'}]}
            keyboardType="number-pad"
            maxLength={1}
          />
          <TextInput
            value={input6}
            secureTextEntry={true}
            onChangeText={txt => {
              setInpu6(txt);
              if (txt.length < 1) {
                ref5.current.focus();
              }
            }}
            ref={ref6}
            style={[styles.otpInput, {color: Color.common_WHITE,borderColor:  '#fff'}]}
            keyboardType="number-pad"
            maxLength={1}
          />
        </View>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.createAccountBtn, {backgroundColor: Color.linearFS1}]}
          onPress={() => {
            setTimer(timer_value);
            setIsTimerRunning(false);
            let otp = input1 + input2 + input3 + input4 + input5 + input6;
            setInpu1('');
            setInpu2('');
            setInpu3('');
            setInpu4('');
            setInpu5('');
            setInpu6('');

            onClick(otp);
          }}>
          <Text style={[styles.btnText, {color: Color.otpTimer}]}>Submit</Text>
        </TouchableOpacity>
        <View style={styles.timerView}>
          <Text style={[styles.otpTitle, {color: Color.common_WHITE}]}>
            OTP{'   '}
            <Text
              style={{
                color: Color.otpTimer,
                fontWeight: '700',
                marginLeft: responsiveWidth(2),
              }}>
              {formattedTime}
            </Text>
          </Text>
          {!isTimerRunning && (
            <Text
              style={[styles.resendText, {color: Color.common_WHITE}]}
              onPress={() => {
                setTimer(timer_value);
                setIsTimerRunning(!isTimerRunning);
                resendOtp();
              }}>
              Resend OTP
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default OTPBottomSheet;
const styles = StyleSheet.create({
  modalView: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: responsiveWidth(8),
    borderTopRightRadius: responsiveWidth(8),
    paddingBottom: responsiveHeight(4),
  },
  title: {
    color: darkThemeColors.white,
    fontSize: responsiveFontSize(2.6),
    fontWeight: '400',

    alignSelf: 'center',
    marginTop: responsiveHeight(5),
  },

  icon: {
    width: responsiveWidth(8),
    height: responsiveWidth(8),
  },
  line: {
    width: responsiveWidth(12),
    height: responsiveHeight(0.6),
    backgroundColor: darkThemeColors.white,
    borderRadius: responsiveWidth(5),
    alignSelf: 'center',
    marginTop: responsiveHeight(3),
  },
  otpView: {
    width: '94%',
    height: responsiveHeight(10),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: responsiveHeight(3),
    alignSelf: 'center',
  },
  otpInput: {
    width: responsiveWidth(11),
    height: responsiveWidth(14),
    borderWidth: 1,

    borderRadius: responsiveWidth(2),
    textAlign: 'center',
    fontSize: responsiveFontSize(3),
  },
  timerView: {
    width: '94%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(3),
    flexDirection: 'row',
  },
  otpTitle: {
    fontSize: responsiveFontSize(2),
    marginLeft: responsiveWidth(2),

    fontWeight: '500',
  },
  resendText: {
    marginRight: responsiveWidth(2),
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
  },
  createAccountBtn: {
    width: '80%',
    height: responsiveHeight(6.3),
    marginTop: responsiveHeight(5),
    alignSelf: 'center',

    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: '500',
    fontSize: responsiveFontSize(2.3),
  },
});
