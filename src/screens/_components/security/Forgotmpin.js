import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from '../../../themes/ResponsiveDimensions';
import OTPBottomSheet from '../../Login/components/OTPBottomSheet';
import { useNavigation } from '@react-navigation/native';
import TextInput from '../userInteractions/TextInput';
import TextInputFields from '../userInteractions/TextInputFields';
import { forgorMpin, generateOTP, getDetails, verifyOTP } from '../../../apis/ApiRequests';
import Loader from '../loader/Loader';

const ForgotMpin = ({ change }) => {
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const Color = useSelector((state) => state.theme).Colors;
  const [h, setH] = useState(true);
  const [open, setOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState('');
  const [verify, setVerify] = useState(false);
  const [newMpin, setNewMpin] = useState({value:'',error:''});
  const [confirmMpin, setConfirmMpin] = useState({value:'',error:''});
  const [email, setEmail] = useState({ value:"", error: '' })
  const [otp, setOtp] = useState('');
  const [fix,setFix] = useState('');
  const [vis,setVis] = useState(false);
  const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const getMail = async () =>{
    var res = await getDetails();
    if(res.data.email_id){
      setFix(res.data.email_id);
    }
  }

  useEffect(()=>{
    getMail();
  },[])
  

  const isMpinValid = (mpin) => {
    return /^\d{4}$/.test(mpin);
  };

  const handleSubmitNewMpin = async () => {
    if (!isMpinValid(newMpin.value)) {
      setNewMpin({...newMpin,error:'Invalid MPIN Please enter a valid 4-digit MPIN'})
      return;
    }

    if (newMpin.value !== confirmMpin.value) {
      setConfirmMpin({...confirmMpin,error:'Mpin DOes not match'})
      return;
    }

  const res =  forgorMpin(newMpin.value)
    console.log(res,"FROM MOIN MPIN")
    console.log('New MPIN:', newMpin);
    console.log('Confirmed MPIN:', confirmMpin);
    change(false);
  };

  const handleContactInfoChange = (text) => {
    setContactInfo(text);
  };

  const handleSubmit = async () => {
    // if (!isEmailValid(email.value)) {
    //   const emailError = 'Enter valid Email'
    //   setEmail({ ...email, error: emailError })
    //   Alert.alert('Invalid Email', 'Please enter a valid email address');
    //   return;
    // }
  

   

    const body = {
      emailormob: fix,
        country_code: '+91',
        action: 'mpin',
    }
    setVis(true);
    const res = await generateOTP(body);
   if(res == 200){
    setOpen(true)
  }
  };

 const  verifyOTPP = async (otps) =>{
  const bodyData = {
    emailormob: fix,
    country_code: '+91',
    otp: otps,
  };
   
   const res = await verifyOTP(bodyData);
    console.log("revanth idea",res);
   if (res == true) {
            setVis(false);
            setVerify(true);
     }else{
           Alert.alert("Entered Wrong Pin");
     }
}

  return (
    <LinearGradient colors={[Color.theme_whiteLinear3, Color.white, Color.theme_whiteLinear1]} style={styles.container}>
      {!verify ? (
        <>
          <Text style={styles.title}>Forgot MPIN?</Text>

          <Text style={styles.subtitle}>Send Otp to  Mail to recover your MPIN</Text>


              <Text style={[styles.subtitle,{fontSize:responsiveFontSize(4),marginBottom:responsiveHeight(30)}]}>{fix}</Text>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Send Otp</Text>
          </TouchableOpacity>
<Loader visible={vis}/>
          <OTPBottomSheet isVisible={open} 
          isTimerRunning={isTimerRunning} 
          setIsTimerRunning={setIsTimerRunning} 
          onClose={() => setOpen(false)} 
          onClick={otp => {
            console.log(otp);
            setOtp(otp);
            verifyOTPP(otp);
          }}
          />
        </>
      ) : (
        <>
          <Text style={styles.title}>Enter New MPIN</Text>

          <Text style={styles.subtitle}>Enter a new 4-digit MPIN</Text>
          
          {/* <TextInput
            label = "New MPIN"
            secureTextEntry
            keyboardType="numeric"
            maxLength={4}
            error={!!newMpin.error}
            errorText={newMpin.error}
            onChangeText={(txt)=>{setNewMpin({...newMpin,value:txt,error:''})}}
            value={newMpin.value}
            style={{width:responsiveWidth(60),height:responsiveHeight(6),marginBottom:responsiveHeight(8)}}
            mode = 'outlined'
          /> */}
          <TextInputFields
             label = "New MPIN"
             secureTextEntry = {true}
             keyboardType="numeric"
             maxLength={4}
             error={newMpin.error}
             onChange={(txt)=>{if(txt.length <= 4){setNewMpin({...newMpin,value:txt,error:''})}}}
             value={newMpin.value}
             containerStyle={{width:responsiveWidth(60),height:responsiveHeight(6),marginBottom:responsiveHeight(8)}}
          />

          <Text style={styles.subtitle}>Confirm your new MPIN</Text>

          {/* <TextInput
            label = "Confirm MPIN"
            secureTextEntry
            keyboardType="numeric"
            maxLength={4}
            error={!!confirmMpin.error}
            errorText={confirmMpin.error}
            onChangeText={(txt)=>setConfirmMpin({...confirmMpin,value:txt,error:''})}
            value={confirmMpin.value}
            style={{width:responsiveWidth(60),height:responsiveHeight(6),marginBottom:responsiveHeight(8)}}
            mode = 'outlined'
          /> */}
          <TextInputFields
           label = "Confirm MPIN"
           secureTextEntry
           keyboardType="numeric"
           maxLength={4}
           error={confirmMpin.error}
          onChange={(txt)=>{
            if(txt.length <= 4){
              setConfirmMpin({...confirmMpin,value:txt,error:''})
            }
            }}
          containerStyle={{width:responsiveWidth(60),height:responsiveHeight(6),marginBottom:responsiveHeight(8)}}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitNewMpin}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </>
      )}
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    paddingBottom: responsiveHeight(2),
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
     margin:responsiveWidth(1)
  },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'black',
    width: responsiveWidth(80),
    height: responsiveHeight(6),
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: responsiveHeight(4),
  },
  submitButton: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: 'green', // Customize the background color
    width: responsiveWidth(40),
    height: responsiveHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Customize the text color
  },
});

export default ForgotMpin;
