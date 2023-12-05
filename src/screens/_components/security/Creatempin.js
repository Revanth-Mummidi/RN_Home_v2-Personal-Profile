import { View, Text,TouchableOpacity,StyleSheet, Alert } from 'react-native'
import React,{useEffect, useState} from 'react'
import CustomTextInput from '../userInteractions/CustomTextInput'
import { responsiveFontSize,responsiveHeight,responsiveWidth } from '../../../themes/ResponsiveDimensions'
import LinearGradient from 'react-native-linear-gradient'
import { getColor } from '../../../themes/GetColor'
import { useSelector } from 'react-redux'
import TextInputFields from '../userInteractions/TextInputFields'
import { CreateMpin, generateOTP, getDetails, resetmpin, verifyOTP } from '../../../apis/ApiRequests'
import OTPBottomSheet from '../../Login/components/OTPBottomSheet'
import Loader from '../loader/Loader'

const Creatempin = ({mode,complete}) => {
  const [laoderVisible, setLoaderVisible] = useState(false);
  const [email, setEmail] = useState({ value:"", error: '' })
  const [edit,setEdit] = useState(false);
  const [otp,setOtp] = useState('')
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [otpv,setOtpv] = useState(false);
  const [has,setHas] = useState(false);
  async function check(){
    let res = await getDetails();
    if(res.data.email_id){
             console.log(res.data.email_id);
           setEmail({value:res.data.email_id,error:''});
           setHas(true);
    }else{setEdit(true)}
  }
  useEffect(()=>{
    if(mode == "create"){
      check();
    }
  },[]);
    const header = mode === 'create' ? "Lets Create  Your Mpin" : "Reset Your Mpin";
    const Color = getColor(useSelector(state => state.theme).theme);
    const [mpin,setMpin] = useState({name:'',error:''});
    const [mod,setMod] = useState(false);
    const [cpin,setCpin]=useState({name:'',error:''});  
   async function  Verify(otpss){
   if(!has){
    const bodyData = {
      emailormob: email.value,
      country_code: '+91',
      otp: otpss,
    };
    console.log(bodyData);
    const response = await verifyOTP(bodyData);
    console.log(response);
    if(response){ 
      setOtpv(false)
      const res = await CreateMpin(mpin.name);
      if(res == "mpin already created to this user"){
       console.log("WORKING")
      }else{
       if(res.status == "200"){
         Alert.alert("Mpin Succesfully created")
         complete('HI');
       }
      }
    }
  } else{
    const res = await CreateMpin(mpin.name);
    if(res == "mpin already created to this user"){
     console.log("WORKING")
     Alert.alert("Mpin Already created")
     complete('HI');
    }else{
     if(res.status == "200"){
       Alert.alert("Mpin Succesfully created")
       complete('HI');
     }
    }
  }
  }
    const handleFirstNameChange = (txt) => {
        if(mpin.error.length > 0){ 
          setMpin({name:txt,error:''});
        }else if(txt.length <= 4 ){setMpin({...mpin,name:txt})}
      };
    
      const handleLastNameChange = (txt) => {
        if(cpin.error.length > 0){ 
          setCpin({name:txt,error:''});
        }else if(txt.length <= 4 ){setCpin({...cpin,name:txt})}
      };

    function  validate(){
      if(mode == 'create'){
        console.log(email.value)
        let res = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        res = res.test(email.value);
        console.log(res)
        if(res === false){setEmail({...email,error:'Enter Valid Email'})
        return;
      }
    
        if(mpin.name.length!=4){setMpin({...mpin,error:'Mpin should contain 4 digits'})
         return false}
        else if(mpin.name != cpin.name){setCpin({...cpin,error:'Not Matching'})
        return false
      }
    }else{
      if(mpin.name.length!=4){setMpin({...mpin,error:'Mpin should contain 4 digits'})
      return false}
     else if(mpin.name == cpin.name){setCpin({...cpin,error:'New Mpin and Old Mpin shold be different'})
     return false
   }
    }
        return true
    }

   async function handleSubmit(){
 if(mode == "create"){
  const bodyData = {
    emailormob: email.value,
    country_code: '+91',
    action:'mpin'
   }
   if(!has){
     setLoaderVisible(true);
     const response = await generateOTP(bodyData);
     if(response == 200){
      setLoaderVisible(false)
           setOtpv(true);
     }
    }else{
      Verify()
    }
     
     


    }else{
      const data = {opin:mpin.name,npin:cpin.name}
      const res = await resetmpin(data);
      console.log(res)
       console.log(res.status)
      if(res.status == "200"){
        Alert.alert("Mpin Succesfully changed")
        complete('HI');
      }else{
        if(res.data.message == "entered oldMpin, mismatched with previous one"){
          Alert.alert("Enterd Old Mpin and Actual Pin Does not match","Try Again")
          complete('HI')
        }
        if(res.data.message == "You have used same previous pin, use another one"){
          Alert.alert("You have used same previous pin, use another one")
          complete('HI')
        }
      }
            
    }

   }

    const handleMpin =(txt)=> { if(txt.length<=4) setMpin(txt)}
    const handlecpin = (txt)=>{if(txt.length<=4)setCpin(txt)}
  return (
    <LinearGradient  colors={[Color.theme_whiteLinear3, Color.linearFS2, Color.blue]} style={{height:responsiveHeight(100),width:responsiveWidth(100),left:-21}}>


    <View style={{justifyContent:'space-around',height:responsiveHeight(100),alignItems:'center'}}>
                   
                   <Text style={{color:Color.white,fontSize:responsiveHeight(3)}}>{header}</Text>
                   <View style={[{flexDirection:'column',height:responsiveHeight(30),justifyContent:'space-between',width:responsiveWidth(90)}]}>
                 

                  {
                    email.value.length >= 1 ? (<Text style={{color:Color.calen_card_title,fontWeight:'700',marginLeft:responsiveWidth(25)}}>{email.value}</Text>) 
                     : mode === 'create' ? (<> 
                          <TextInputFields
                            label={"Email"}
                            onChange={(text) => {setEmail({ value: text, error: '' })}}
                            value={email.value}
                            error={email.error}
                            autoCompleteType="email"
                            keyboardType="email-address"
                          />
                     </>) : (<>
                     
                     </>)
                  }

                  <OTPBottomSheet
                    isVisible={otpv}
                    isTimerRunning={isTimerRunning}
                    setIsTimerRunning={setIsTimerRunning}
                    onClose={() => {
                      setOtpv(false);
                    }}
                    onClick={otp => {
                     
                      setOtp(otp);
                       Verify(otp);
                    }}
                  />

               <Loader visible={laoderVisible} />
                 <TextInputFields 
                 label={mode == 'create' ?'Mpin':'Old Mpin'}
                 title={'4 Digits'}
                 secureTextEntry
                 value = {mpin.name}
                 onChange = {handleFirstNameChange}
                 error={mpin.error}
                 keyboardType={'number-pad'}
                 />


                  <TextInputFields 
                 label={mode  === 'create'?'Confirm Mpin':' new Mpin'}
                 secureTextEntry
                 value = {cpin.name}
                 onChange = {handleLastNameChange}
                 error={cpin.error}
                 keyboardType={'number-pad'}
                 />
                   
                   </View>
                   
                   <TouchableOpacity style={[styles.btn,{ backgroundColor: 'white',position:'absolute',bottom:responsiveHeight(0)}]} onPress={() => {
                    if(validate()){
                      handleSubmit();
            
                    }
                   }} >
                   <Text style={{ fontSize: responsiveFontSize(2.5), color: 'black', fontWeight: 'bold' }}>{mode === 'create' ? "Create Mpin" : "Reset Mpin"}</Text>
                   </TouchableOpacity>
                   
                   
                   </View>

                   
    
    </LinearGradient>
  )
}
const styles = StyleSheet.create({
    container: {
      width: responsiveWidth(100),
      height:'100%',
      alignContent:'center',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"black"
    },
    title: {
      fontSize: responsiveFontSize(2),
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color:'white',
      margin:responsiveHeight(1)
    },btn: {
      width: responsiveWidth(98),
      height: responsiveHeight(6.7),
      alignSelf: 'center',
      marginTop: responsiveHeight(5),
      borderRadius: responsiveWidth(3),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      margin:responsiveHeight(1)
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: responsiveWidth(5),
      margin:responsiveHeight(1),
      marginTop:responsiveHeight(2),
      alignItems:'center'
    },
    textInput: {
      width: '48%',
      borderLeftColor:'red'
    },
    datePickerButton: {
      backgroundColor:'white',
      padding: responsiveHeight(2),
      borderRadius: 5,
      marginBottom: responsiveWidth(1),
      width:responsiveWidth(98),
    },
    datePickerButtonText: {
      color: '#0f0f0f',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 14,
    },
    datePickerContainer: {
      alignItems:'center',
      backgroundColor:'rgba(0,0,0,0)',
      width:responsiveWidth(70),
      borderRadius:10
    },
    
    datePicker: {
      width: responsiveWidth(98),
      margin:responsiveHeight(0.5),
      height:responsiveHeight(18)
     
    },
    label: {
      marginTop:responsiveHeight(3),
      margin:responsiveHeight(1),
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
      color:'white'
    },
    genderContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: responsiveHeight(2.5),
      margin:5
    },
    genderCard: {
      borderWidth: 1,
      borderColor: 'white',
      padding:responsiveHeight(1.2),
      borderRadius: 8,
      margin: 5,
      alignItems: 'center',
    },
    selectedGenderCard: {
      backgroundColor: 'white',
    },
    genderText: {
      fontSize: responsiveFontSize(1.7),
      color:'white',
      fontWeight:'600'
    },
    secgenderText:{
      fontSize: responsiveFontSize(1.7),
      color:'black',
      fontWeight:'600'
    },
    selectedText: {
      fontSize: 12,
      fontWeight: 'bold',
      marginTop: 10,
      color:'black'
    },
    logo: {
      width: responsiveWidth(70),
      height: responsiveHeight(20),
      resizeMode: 'contain',
      marginLeft: responsiveWidth(10),
      marginTop: responsiveHeight(10),
    },
  });

export default Creatempin