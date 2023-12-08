{
  /* 
Packages which may not be required or Optional
1. react-navigation/bottom-tabs--> [to confirm] - currently using--to be removed if relevent bottom tab is replaced 
2. "@react-navigation/material-bottom-tabs": "^6.2.15", --> remove if unused.
3. Deleted: "react-native-custom-picker": "^0.4.0", ----> Used for SelectInput component but not working now... show RNColor has to downgrade and gradle impact + errors.
4. "react-native-image-colors": "^1.5.2", ---> Currently in use: Personal Profile, Professional profile---> If plan changes then think.
5. "react-native-wheel-scrollview-picker": "^2.0.1", ----> Currently in use- Trackers.... Use until its replacable.
6. Deleted: "@react-native-community/segmented-control": "^2.2.2",: ---> Not required... added to check the react native blur component.
7. Deleted: "@react-native-community/blur": "^4.3.0",---->> Created a component but not using.. so much laggy to the app. can be removed.


REVIEW WITH TEAM BEFORE INSTALL OR REMOVE
Kishore:
    "react-native-toast-message": "^2.1.6", // Not used by previous developer, not used widely.. just as reference 
     "react-native-auto-height-image": "^3.2.4", // trying for home for auto height
Satish:
    "react-native-circular-slider": "^1.0.1",
    "react-native-collapse-view": "^1.0.0",
    "react-native-image-resizer": "^1.4.5",
     "react-native-ios-picker": "^1.0.0",
     "react-native-picker-select": "^8.0.4",
    "react-native-redash": "^18.1.0",
    "react-native-swipe-tabs": "^1.1.1",
     "react-native-swiper": "^1.6.0",
     "react-native-tab-view": "^3.5.1",
     "react-native-wheel-pick": "^1.2.0",
     "react-native-wheel-scrollview-picker": "^2.0.1",
     "react-navigation": "^4.4.4",
Urvish:
    "react-native-flash-message": "^0.4.1",   // havn't used
    "react-native-geolocation-service": "^5.3.1",    /// fetches only latitude and longitude
    "@react-native-picker/picker": "^2.4.10",
     "react-native-permissions": "^3.8.1",
      "react-native-phone-input": "^1.3.6",
      "react-native-video-player": "^0.14.0",
*/
}

//import TouchID from 'react-native-touch-id';
import {SafeAreaView,View,Text, Pressable,StyleSheet,StatusBar,TouchableOpacity,Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import MasterNavigator from './src/navigations/MasterNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/screens/_components/toast/toastConfig';
import {ThemeProvider} from './src/themes/components/ThemeContext';
import {Provider} from 'react-redux';
import MyStore from './src/redux/MyStore';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Color } from './src/themes';
import { responsiveScreenFontSize, responsiveWidth,responsiveHeight,responsiveFontSize } from './src/themes/ResponsiveDimensions';
import { Biochecks } from './src/screens/_components/security/biometric';
import { getApiKey } from './src/utils/LocalStorage';
import Forgotmpin from './src/screens/_components/security/Forgotmpin';
import RenderMpinBottomSheet from './src/screens/_components/security/MpinBottomSheet';
import { getDetails } from './src/apis/ApiRequests';
import { checkInternetConnection } from './src/screens/More/utils/MoreServerRequests';

export default function App() {
  const [auth,setAuth] = useState(true);
  const [mpin,setMpin] = useState(false);
  
    const handleDataChange = (newData) => { setAuth(true)}
  useEffect(()=>{
       
    if(!auth && !mpin){
      checkTokenAndAuthenticate();
    }
  },[auth,mpin])

 async  function Biocheck(src){
   setMpin(false);
   const res = await Biochecks();
   console.log(res,"For Checking result from biometric");
   if(res === true) {setAuth(true)}
   else if (res === false ){setMpin(true)}
   else if(res == "logouts"){setMpin(false),setAuth(true)}  
   else if(res == "No internet"){
    return;}
  //  }
  //     let pin = await getDetails()
  //    if(pin.data.mpin) {setMpin(false)}
   
  }

  const checkTokenAndAuthenticate = async () => { 
    await getApiKey() === null ? setAuth(true) : Biocheck('nothinh')
   if(await checkInternetConnection()){
     let pin = await getDetails()
     if(pin.data.mpin) {setMpin(false)}
   }
} 
  return (
    <> 
     <Provider store={MyStore}>
    {auth?(
 
      <ThemeProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <SafeAreaView style={{flex: 1}}>
            <MasterNavigator />
          </SafeAreaView>
        </GestureHandlerRootView>
        <Toast config={toastConfig} topOffset={30} bottomOffset={30} />
      </ThemeProvider>
    
    ):mpin?(<>
     
              <View style={{alignItems:'center',backgroundColor:"white"}}>
                <View>
                  <RenderMpinBottomSheet op={Biocheck}  onDataChange={handleDataChange}/>        
                  </View>
              </View>
        
         </>):(<View style={{justifyContent:"center",alignItems:'center',backgroundColor:'black',height:responsiveHeight(100)}}>
                 <Image source={require('./src/assets/whiteFullLogo.png')} style={{height:responsiveHeight(20),width:responsiveWidth(80),resizeMode:'contain',top:responsiveHeight(-25)}} />
              </View>)
} 
</Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {width:responsiveWidth(100),height: responsiveHeight(88),flexDirection:'column',justifyContent: 'space-evenly',alignItems: 'center'},
});