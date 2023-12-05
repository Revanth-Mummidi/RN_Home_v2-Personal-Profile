import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView,Image,Dimensions, StatusBar, Pressable,Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { getColor } from '../../themes/GetColor';
import { useDispatch, useSelector, } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize, responsiveHeight, responsiveWidth,} from '../../themes/ResponsiveDimensions';
import CustomTextInput from '../_components/userInteractions/CustomTextInput';
import { setUserFirstName,setUserLastName,setUserGender,setUserDob,setDobDate } from '../../redux/slices/UserOnboardingSlice';
import LottieView from 'lottie-react-native';
import {requestCameraPermission, requestLocationPermission, requestMediaPermission, requestMicrophonePermission} from '../Home/utils/Permissions'
import TextInput from '../_components/userInteractions/TextInput';
import { TextInputFields } from '../_components';
import { useNavigation } from '@react-navigation/native';
import { SaveWelcomeData } from '../../apis/ApiRequests';
const Welcome = () => {
  const navigation = useNavigation();
   const [gerror,setGerror] = useState('');
   const [date, setDate] = useState(new Date());
  const [dt,setDt] = useState(null);
  const [selectedGender, setSelectedGender] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const theme = useSelector(state => state.theme);
  const pic = useSelector(state => state.image)
  console.log(pic)
  const Color = getColor(theme.theme);
  const genderOptions = ['Male', 'Female', 'Trans Male', 'Trans Female'];
  const [fname,setFname] = useState({name:'',error:''});
  const [lname,setLname] = useState({name:'',error:''});
  const [cpin,setCpin]=useState('');
  const [go,setGo] = useState(false);
  const [mpin,setMpin] = useState('');
  const [cd,setCd] = useState('');
  const h = useSelector(state => state.userOnboarding.firstName)
  const sex = useSelector(state => state.userOnboarding.gender)
  const DOB = useSelector(state => state.userOnboarding.dob)
  const dispatch = useDispatch();
  const handleGenderSelection = (gender) => {
    setGerror('');
    dispatch(setUserGender(gender))
    setSelectedGender(gender);
  };

  const handleMpin =(txt)=> { if(txt.length<=4) setMpin(txt)}
  const handlecpin = (txt)=>{if(txt.length<=4)setCpin(txt)}

  const handleFirstNameChange = (txt) => {
    dispatch(setUserFirstName(txt));
    if(fname.error.length > 0){ 
      setFname({name:txt,error:''});
    }else{setFname({...fname,name:txt})}
  };

  const handleLastNameChange = (txt) => {
    if(lname.error.length > 0){ 
      setLname({name:txt,error:''});
    }else{setLname({...lname,name:txt})}
    dispatch(setUserLastName(txt));
  };

  const renderTextInput = (title, value, onChangeText) => {
    return (
      <TextInputFields
      label={title}
       onChange={onChangeText}
       error={value.error}
       value={value.name}
       containerStyle={{width:responsiveWidth(45),marginRight:responsiveWidth(5),backgroundColor:'rgba(0,0,0,0)'}}
      
      />
      // <CustomTextInput
      //   w={'47%'}
      //   onChangeText={onChangeText}
      //   h={responsiveHeight(7)}
      //   onSubmitEditing={() => onChangeText(value.name)}
      //   onBlur={() => onChangeText(value.name)}
      //   title={title}
      //   value={value.name}
      //   color={'white'}
      //   error={value.error}
      // />
    );
  };

  function calculateAge(birthDate) {
    const today = new Date();
    const dob = new Date(birthDate);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
  
    return age;
  }

  const renderGenderOptions = () => {
    return genderOptions.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.genderCard,
          selectedGender === option ? styles.selectedGenderCard : null,
        ]}
        onPress={() => handleGenderSelection(option)}
      >
        <Text style={selectedGender === option ? styles.secgenderText : styles.genderText}>
          {option}
        </Text>
      </TouchableOpacity>
    ));
  };

  const renderDatePicker = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <View style={styles.datePickerContainer}>
          <View style={{position:'absolute',height:responsiveHeight(5),backgroundColor:'white',width:responsiveWidth(52),top:responsiveHeight(7),borderRadius:10}}></View>
          <DatePicker
            date={new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate())}
            theme="dark"
            mode="date"
            onDateChange={(newDate) => {
              const formattedDate = newDate.toISOString().split('T')[0];
              setDate(newDate);
              setDt(!null);
              dispatch(setUserDob(newDate.toDateString()));  
               setCd(formattedDate);
            }}
            androidVariant="nativeAndroid"
            style={styles.datePicker}
            maximumDate={new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate())}
            textColor={Color.blue}
          />
        </View>
      </View>
    );
  };

  const validateDetails = () => {
    const missingFields = [];
    const hasNumber = /\d/; // Regular expression to check for a number
    if (!fname.name) { setFname({ ...fname,error:'Should not be empty' }),missingFields.push('Gender')}
    else if(fname.name.length < 3){ setFname({ ...fname,error:' At least 3 characters'}),missingFields.push('Gender')}
    else if(hasNumber.test(fname.name)) {  setFname({ ...fname,error:'Should not contain numbers'}),missingFields.push('Gender')}

    if (!lname.name) {setLname({ ...lname,error:'Should not be empty'}),missingFields.push('Gender')}
    else if(lname.name.length < 3){ setLname({ ...lname,error:'At least 3 characters'}),missingFields.push('Gender')}
    else if(hasNumber.test(lname.name)) {setLname({ ...lname,error:'Should not contain numbers'}),missingFields.push('Gender')}
 
    if(lname.error || fname.error ) {return false}
    
    if (!selectedGender) {missingFields.push('Please Select Gender'),setGerror('Please Select Gender')}
    if (!dt) {missingFields.push('Date of Birth')}
  
    if (missingFields.length > 0 ) {
      if(missingFields[0] != 'Gender'){
      alert(`Please provide the following detail(s):\n${missingFields.join('\n')}`);}
      return false; 
    }
  
    return true;
  };

  async function letsgo(){
    console.log(h,sex,DOB)
    const isValid = validateDetails();
       
    if (isValid) {
      var ages =  calculateAge(DOB);
     // console.log(h, sex, DOB,ages);
      await requestMicrophonePermission();
      await requestCameraPermission();
      await requestLocationPermission();
      await requestMediaPermission();

          const bodyData = {
      user_first_name: fname.name,
      user_last_name: lname.name,
      gender:selectedGender,
      date_of_birth: cd,
      role:'independent'
    };
       const res = await SaveWelcomeData(bodyData);
       //const res = 400;
    //setLoaderVisible(false);
    if (res == 200) {
      setGo(true);
     
      navigation.navigate('BottomTab');
    } else {
      Alert.alert("SOMETHING WENT WRONG");
    }
    console.log(bodyData)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Color.theme_whiteLinear3} />
      <LinearGradient colors={[Color.theme_whiteLinear3, Color.linearFS2, Color.blue]} style={styles.container}>
        

        <TouchableOpacity onPress={()=>{navigation.navigate('Recording',{mode:'isProfile'})}}>

          <View style={{height:responsiveHeight(15),width:responsiveWidth(30),backgroundColor:Color.WHITE,borderRadius:responsiveHeight(30),marginTop:responsiveHeight(6)}}>

                <Image source={{uri:pic.uri}} style={{width:'100%',height:'100%',borderRadius:responsiveHeight(30)}}/>

          </View>

        </TouchableOpacity>
         
      {/* <LottieView
              autoPlay
              source={require('../../assets/json/hello.json')}
              loop
              style={[StyleSheet.absoluteFillObject,{height:responsiveHeight(200)}]}
            />
             <LottieView
              autoPlay
              source={require('../../assets/json/hello.json')}
              loop
              style={[StyleSheet.absoluteFillObject,{transform: [{ rotate: '20deg' }],width:responsiveWidth(80),height:responsiveHeight(50),marginLeft:responsiveWidth(-23)}]}
            /> */}
        {/* Header content */}
        <ScrollView>
          {/* Form components */}
          <Text style={styles.title}>Please Provide the following Details</Text>
          <View style={styles.inputContainer}>
            {renderTextInput('*First Name', fname, handleFirstNameChange)}
            {renderTextInput('*Last Name', lname, handleLastNameChange)}
          </View>
            <View style={{flexDirection:'row'}}>
          <Text style={[styles.label,{color:'white'}]}>*Select Gender</Text> 
          <Text style={[styles.label,{color:gerror?"red":'white',fontWeight:'400',fontSize:15}]}>{gerror.length > 0 ?gerror:''}</Text>
          </View>
          <View style={styles.genderContainer}>{renderGenderOptions()}</View>

          <Text style={[styles.label, { marginTop: responsiveHeight(0.1) }]}>*Pick Date of birth:  {DOB && calculateAge(DOB)}</Text>
        
          {renderDatePicker()}
        </ScrollView>

        {/* 'Let's Go' button */}
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: 'white' }]}
          onPress={() => {letsgo()}}
        >
          <Text style={{ fontSize: responsiveFontSize(2.5), color: 'black', fontWeight: 'bold' }}>Lets Go</Text>
        </TouchableOpacity>
          
         
      </LinearGradient>
          
    </View>
  );
};


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
export default Welcome;

