import React,{useState,useEffect}from 'react';
import {Text, View, Appearance, StyleSheet} from 'react-native';
import {Loader} from '../screens/_components';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {setApiKey, getApiKey} from '../utils/LocalStorage';
import {FetchProfile, accessDependent, getMainProfile, getMembers} from '../screens/Personal/utils/PersonalServerRequests';
import BottomTab from './bottomTab/BottomTab';
import Recording from '../screens/Home/subScreens/home/Recording';
import BarcodeScanner  from '../screens/Home/subScreens/home/Qrcode';
import ImagePreview from '../screens/Home/subScreens/home/Preview';
import {VideoPreview} from '../screens/Home/subScreens/home/Preview';
import Gallery from '../screens/Home/subScreens/home/Gallery';
import CallRoom from '../screens/VideoCall/CallRoom';
import PdfView from '../screens/Home/subScreens/home/PdfView';
import { GlobalDocuments } from '../screens/More';
import Preview from '../screens/More/subScreens/Documents/Preview';
import HomeStack from '../screens/Home/HomeStack';
import AuthStack from '../screens/Login/AuthStack';
import MoreStack from '../screens/More/MoreStack';
import {FetchTheme} from '../screens/More/utils/MoreServerRequests';
import {ThemeContext} from '../themes/components/ThemeContext';
import {set} from 'react-native-reanimated';
import {Colors} from '../themes';
import { setTheme } from '../redux/slices/ThemeSlice.js';
import VideoConference from '../screens/VideoCall/VideoConference';
import Status from '../screens/Home/subScreens/home/Status';
import TasksStack from '../screens/Calender/Screens/TasksStack.jsx';
import { useDispatch , useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PersonalStack from '../screens/Personal/PersonalStack.js';
import i18next from '../services/language/i18next.js';
import { setLang } from '../redux/slices/LanguageSlice.js';
import Welcome from '../screens/Login/Welcome';
import { setDependantUsers, setDependantUsersEHID } from '../redux/slices/AddDependantUserSlice.jsx';
import { fetchDependentUsers } from '../screens/Personal/utils/DependentUsersRequest.jsx';
import { setBMIWeight, setCurrentUserProfile } from '../screens/Personal/slices/PersonalProfileStates.jsx';


const Stack = createNativeStackNavigator();

const MasterNavigator = () => {
 
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [intialRoute, setIntialRoute] = React.useState('BottomTab');
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  // const {theme, toggleTheme} = React.useContext(ThemeContext);
  // const Color = Colors(theme);
  const Color = useSelector(state=>state.theme).Colors;
  const styles = getStyles(Color);
  
  const dispatch=useDispatch();
  const addLang=async()=>{
    const lang=await AsyncStorage.getItem("language");
    if(lang!=undefined){
    i18next.changeLanguage(lang);
    dispatch(setLang(lang));
    }
  }
  const fetchTheme =async ()=>{

    let obj=await AsyncStorage.getItem('theme');
    dispatch(setTheme(obj));
    console.log("Rendering first",obj);
   }
  const handleChange=async({colorSchema})=>{
    let obj=await AsyncStorage.getItem('theme');
    if(obj!=undefined)
    dispatch((setTheme(obj)));
  }
  const initialCheck = async () => {
    const token = await AsyncStorage.getItem('userToken');
   setIsAuthenticated(token);
   console.log(isAuthenticated)
    console.log("APIKEY ISSSSSSSSSSSSSSSSS",token)
    //setIsUserLoggedIn(true);
    if (token) {
      const data = 'hi'//await FetchProfile();
      if (data != 'error') {
        console.log("DATA NOT ERROR")
        setIsUserLoggedIn(true);
        setIntialRoute('BottomTab');
      } else {
        console.log("DATA ---------------- ERROR")
        setIsUserLoggedIn(false);
        setIntialRoute('BottomTab');
      }
    } else {
      console.log("TOKEN ERROR")
      setIsUserLoggedIn(false);
      setIntialRoute('AuthStack');
    }
    setLoading(false);
  };
  const fetchAccessDependent=async(data)=>{
    
    let dat= await accessDependent(data);
    let mainProfile=await  getMainProfile();
    dispatch(setCurrentUserProfile(mainProfile));
    // console.log("MAIN PROFILE=",mainProfile);
    const combinedData=[mainProfile,...dat];
    // console.log("COMBINED DATA",combinedData);
    dispatch(setDependantUsers(combinedData));
   }
   const fetchDependentUsers=async()=>{
     let arr=await getMembers();
     arr=arr.data.data;
     let array1=arr.map((data,index)=>{
       return data.child_eh_user_id;
     });
    
     dispatch(setDependantUsersEHID(arr));
     let arr3=[];
    arr3= array1.map((data,index)=>{
        return {dependent_user_id:data};
     });
     fetchAccessDependent(arr3);
     
   }
  React.useEffect(() => {
    initialCheck();
    fetchTheme();
    addLang();
    fetchDependentUsers();
    const subscription = Appearance.addChangeListener(handleChange);
    return () => subscription.remove();
  }, [isUserLoggedIn]);
 
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Color.loader_bg,
        }}>
        <Loader />
      </View>
    );
  }

  
    // Check authentication status in AsyncStorage
   

   
  

  return (
    <>
     <NavigationContainer>
       {!isUserLoggedIn ? (
      
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="AuthStack" component={AuthStack} />
            </Stack.Navigator>
    ):(

        
               <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="BottomTab" component={BottomTab} />
                  <Stack.Screen name="PdfView" component={PdfView} />
                  <Stack.Screen name="Preview" component={Preview} />
                  <Stack.Screen name="AuthStack" component={AuthStack} />
                  <Stack.Screen name="GlobalDocuments" component={GlobalDocuments} />
                  <Stack.Screen name="HomeStack" component={HomeStack} />
                  <Stack.Screen name="Recording" component={Recording} />
                  <Stack.Screen name="ImagePreview" component={ImagePreview} />
                  <Stack.Screen name="VideoPreview" component={VideoPreview} />
                  <Stack.Screen name="TasksStack" component={TasksStack} />
                  <Stack.Screen name="Gallery" component={Gallery} />
                  <Stack.Screen name="MoreStack" component={MoreStack} />
                  <Stack.Screen name="Status" component={Status}/>
                  <Stack.Screen name="Welcome" component={Welcome}/>
                  <Stack.Screen name='PersonalStack' component={PersonalStack}/>
            </Stack.Navigator>
         
      )
     
      }
       </NavigationContainer>
      
         {/* {
          !isUserLoggedIn ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="AuthStack" component={AuthStack} />
          </Stack.Navigator>):(

           <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="BottomTab" component={BottomTab} />
                  <Stack.Screen name="PdfView" component={PdfView} />
                  <Stack.Screen name="Preview" component={Preview} />
                  <Stack.Screen name="GlobalDocuments" component={GlobalDocuments} />
                  <Stack.Screen name="HomeStack" component={HomeStack} />
                  <Stack.Screen name="Recording" component={Recording} />
                  <Stack.Screen name="ImagePreview" component={ImagePreview} />
                  <Stack.Screen name="VideoPreview" component={VideoPreview} />
                  <Stack.Screen name="TasksStack" component={TasksStack} />
                  <Stack.Screen name="Gallery" component={Gallery} />
                  <Stack.Screen name="MoreStack" component={MoreStack} />
                  <Stack.Screen name="Status" component={Status}/>
            </Stack.Navigator>
          )
         
         }

      
      </NavigationContainer> */}
    </>
  );
};

export default MasterNavigator;

const getStyles = Color => {
  const style = StyleSheet.create({});
  return style;
};
