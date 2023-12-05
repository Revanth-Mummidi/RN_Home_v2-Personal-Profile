import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import { logout } from '../../../utils/LocalStorage';
import { Alert } from 'react-native';
import { getDetails } from '../../../apis/ApiRequests';
import { checkInternetConnection } from '../../More/utils/MoreServerRequests';

const rnBiometrics = new ReactNativeBiometrics();
async function logouts (){
  await  logout();
  return "logouts";
}
export async function Biochecks(){
    
  const net = await checkInternetConnection();
  if(net.isConnected == false){
    console.log("JIJJIJIJIIJJ")

    await   rnBiometrics.simplePrompt({promptMessage: 'CONFIRM FINGERPRINT',cancelButtonText:'Please Connect to Internet'})
    .then((resultObject) => {
   const { success } = resultObject
   if (success) {
     console.log('successful biometrics provided')
     ret = true;
     return true;
   } else {
        Alert.alert('No Internet');
        ret = "No internet"
  }
 })
 .catch(async () => {
            
 })
  
 return ret;
  }else{

  
    var ret = undefined;
    var Mpinqury =   await  getDetails();
    var cm = '';
    if(Mpinqury.data.mpin) {console.log("CORRECT METHOD"),cm = "Try Mpin"}
    else {cm = "Try Password"}
    
    //console.log(Mpinqury.data.email_id,"                       ",Mpinqury.data.mpin);
     await   rnBiometrics.simplePrompt({promptMessage: 'CONFIRM FINGERPRINT',cancelButtonText:cm})
    .then((resultObject) => {
   const { success } = resultObject
   if (success) {
     console.log('successful biometrics provided')
     ret = true;
     
   } else {


    if(Mpinqury.data.mpin){
     console.log('user cancelled biometric prompt')
     ret= false;
    }else{ 
    //  ret =logouts()'
      throw new Error;
      Biochecks()
   }
  }
 })
 .catch(async () => {
   console.log('biometrics failed')
   await  logout();
   Alert.alert('User Logged Out','Reload App to Continue');
   ret= "logouts";
 })
 
 return ret;
}
   }