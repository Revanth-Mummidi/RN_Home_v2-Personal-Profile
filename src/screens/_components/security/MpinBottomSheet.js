import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, StatusBar, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { responsiveWidth,responsiveHeight,responsiveScreenFontSize } from '../../../themes/ResponsiveDimensions';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { useEffect } from 'react';
import ForgotMpin from './Forgotmpin';
import { Biochecks } from './biometric';
import { Modal } from 'react-native';
import { verifyMpin } from '../../../apis/ApiRequests';
import { getColor } from '../../../themes/GetColor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setTheme } from '../../../redux/slices/ThemeSlice';
import i18next from '../../../services/language/i18next';
import {t} from '../../../services/language/Translate';
import { setLang } from '../../../redux/slices/LanguageSlice';
import { logout } from '../../../utils/LocalStorage';

const RenderMpinBottomSheet = ({  onDataChange,op }) => {
  const Color = getColor(useSelector(state => state.theme).theme);
  var lan = useSelector(state => state.lang);
  const dispatch = useDispatch()
    const [mpin, setMpin] = useState('');
    const [forg,setForg] = useState(false);
    const [count,setCount] = useState({value:5,error:''});

    // Redux function Calls
    const fetchTheme =async ()=>{
      let obj=await AsyncStorage.getItem('theme');
      dispatch(setTheme(obj));
     }
     const addLang=async()=>{
      const lang=await AsyncStorage.getItem("language");
      if(lang!=undefined){
      i18next.changeLanguage(lang);
      dispatch(setLang(lang));
      }
    }
    //

    //UseEffects
    useEffect(()=>{
      fetchTheme();
      addLang();
    },[]);
    useEffect(() =>{
      if(mpin.length == 4){
        const newData = 'Modified Data';
        vmpin();
  }
    },[mpin]);

    const vmpin = async() => {
     const res = await verifyMpin(mpin);
     console.log(res,"from TRes")
     console.log(".......",res.data)

     if(res.data.flag == true){
   //  console.log( res.data.status)
      onDataChange('HI');
     }else{
      const val = count.value - 1;
      if(val == 0){
        await logout();
        onDataChange('HI');
      }
      setCount({value:val,error:`${val} Attempts Left`});
      setMpin((prev) => prev.slice(0, -4))
     }
    }

    // Keypad Functions 
    const handleKeyPress = (value) => {
      console.log(mpin);
      if (mpin.length < 4) {
        setMpin((prev) => prev + value);
      }
    };
    const handleChange = (value) =>{
       setForg(value);
    }
    const handleBackspace = () => {
      setMpin((prev) => prev.slice(0, -1));
    };
    //

    async  function Biocheck(){ op('nothing') }
  
   
  return (
    
      <View>
          <LinearGradient colors={[Color.WHITE,Color.white, Color.theme_whiteLinear1]} style={styles.container}>
            
            <StatusBar translucent={true} backgroundColor={Color.theme_whiteLinear3}/>
        
            <Text style={styles.title}>{t("mpin.Enter Mpin")}</Text>

          <View style={styles.mpinContainer}>
            {Array.from({ length: 4 }).map((_, index) => (
              <View key={index} style={styles.mpinDigit}>
                {mpin.length > index && <Icon name="lock" size={30} color="#333" />}
              </View>
            ))}
          </View>

          <Pressable onPress={()=>{setForg(true)}}>
            <Text style={{color:Color.badge}}>
             {t("mpin.Forgot Mpin")}
            </Text>
          </Pressable>

          {
              count.error && 
                <Text style={{color:Color.red}}>
                       {count.error} 
               </Text>        
            }
          <View>
            <View style={{flexDirection:'row'}}>
              {[1,2,3].map((value) => (
              <TouchableOpacity
                key={value}
                style={styles.keypadButton}
                onPress={() => handleKeyPress(value)}
              >
                <Text style={styles.keypadButtonText}>{value}</Text>
              </TouchableOpacity>
            ))
              }
              </View>
              <View style={{flexDirection:'row'}}>
              {[4,5,6].map((value) => (
              <TouchableOpacity
                key={value}
                style={styles.keypadButton}
                onPress={() => handleKeyPress(value)}
              >
                <Text style={styles.keypadButtonText}>{value}</Text>
              </TouchableOpacity>
            ))
              }
              </View>
              <View style={{flexDirection:'row'}}>
              {[7,8,9].map((value) => (
              <TouchableOpacity
                key={value}
                style={styles.keypadButton}
                onPress={() => handleKeyPress(value)}
              >
                <Text style={styles.keypadButtonText}>{value}</Text>
              </TouchableOpacity>
            ))
              }
            
              
              </View>
              <View style={{flexDirection:'row'}}>
              <TouchableOpacity style={{  borderRadius: 10, width: 70, height: 75, justifyContent: 'center', alignItems: 'center', margin: 10,}}/>
              {[0].map((value) => (
              <TouchableOpacity
                key={value}
                style={styles.keypadButton}
                onPress={() => handleKeyPress(value)}
              >
                <Text style={styles.keypadButtonText}>{value}</Text>
              </TouchableOpacity>
            ))
              }
            <TouchableOpacity style={styles.keypadButton} onPress={handleBackspace}>
              <Icon name="backspace" size={30} color="#333" />
            </TouchableOpacity>
              
              </View>
            
          </View>
          <View style={styles.fingerprintContainer}>
                                <Pressable onPress={() => {Biocheck() }}>
                                      <Text style={styles.fingerprintText}>{t("mpin.TryFingerPrint")}</Text>
                                      <Icon name="fingerprint" size={28} color="#fff" style={styles.icon} />
                                </Pressable>
            </View>

            

          </LinearGradient>
          <Modal visible={forg} onRequestClose={()=>{setForg(false)}}>
       <ForgotMpin change = {handleChange}/>
       </Modal>
      </View>
  

    
  )
}
const styles = StyleSheet.create({
    container: {
      width:responsiveWidth(100),
       height: responsiveHeight(110),
      flexDirection:'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      paddingTop:responsiveHeight(10)
    },
    mpinContainer: {
      flexDirection: 'row',
    },
    mpinDigit: {
      borderWidth: 2,
      borderRadius: 20,
      borderColor: 'black',
      width: responsiveWidth(12),
      height: responsiveHeight(6),
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10,
    },
    keypadContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    keypadButton: {
      borderWidth: 2,
      borderRadius: 10,
      borderColor: 'black',
      width: 70,
      height: 75,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
    },
    keypadButtonText: {
      fontSize: 28,
      fontWeight: 'bold',
    },
    fingerprintContainer: { width:responsiveWidth(98), backgroundColor: '#4caf50', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 20, marginTop: 20, alignItems: 'center', justifyContent: 'center', elevation: 5,},
    fingerprintText: {color: '#fff',fontSize: 16,fontWeight: 'bold'},
    icon:{marginLeft:responsiveScreenFontSize(5)},
  });
export default RenderMpinBottomSheet





