import React,{useState,useEffect}from 'react';
import {Text, View, Appearance, StyleSheet} from 'react-native';
import {DefaultCamera, DocumentPicker, GalleryPicker, Loader} from '../screens/_components';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {setApiKey, getApiKey} from '../utils/LocalStorage';
import {getUserProfile, accessDependent, getMainProfile, getMembers, getDependentUsers} from '../screens/Personal/utils/PersonalServerRequests';
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
import { setDependantUsers, setDependantUsersEHID, setParentProfile } from '../redux/slices/AddDependantUserSlice.jsx';
import { fetchDependentUsers } from '../screens/Personal/utils/DependentUsersRequest.jsx';
import { setBMIWeight, setCurrentUserProfile } from '../screens/Personal/slices/PersonalProfileStates.jsx';
import { fetchUserProfileData } from '../screens/Home/utils/HomeServerRequests.js';


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
    try{
    const lang=await AsyncStorage.getItem("language");
    if(lang!=undefined){
    i18next.changeLanguage(lang);
    dispatch(setLang(lang));
    }
  }catch(err){console.log("initial",err)}
  }
  const fetchTheme =async ()=>{
    try{
    let obj=await AsyncStorage.getItem('theme');
    dispatch(setTheme(obj));
    console.log("Rendering first",obj);
  }catch(err){console.log("themefetch",err)}
   }
  const handleChange=async({colorSchema})=>{
    try{
    let obj=await AsyncStorage.getItem('theme');
    if(obj!=undefined)
    dispatch((setTheme(obj)));
  }catch(err){console.log("handlechange",err)}
  }
  const initialCheck = async () => {
    try{
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
        await fetchDependentUsers();
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
  }catch(err){console.log("initial",err)}
  };
  const fetchAccessDependent=async(data)=>{
    try{
    let dependantArray= await getDependentUsers(data);
    // dependantArray=[...dependantArray];
    console.log("DEPENDENT USER ARRAY=",...dependantArray);
    let mainProfile=await getMainProfile();
    dispatch(setParentProfile(mainProfile));
    dispatch(setCurrentUserProfile(mainProfile));
    // console.log("MAIN PROFILE=",mainProfile);
    // const profile=await getUserProfile(selectedItem.access_token,selectedItem.Profile_Picture)

    const combinedData=[mainProfile,...dependantArray];
    console.log("COMBINED DATA",combinedData);

    dispatch(setDependantUsers(combinedData));
  }catch(err){console.log("Fetch ACCESS DEP",err)}
   }

   const fetchDependentUsers=async()=>{
    try{
      let arr=await getMembers();
      arr=arr.data.data;
      // let array1=arr.map((data,index)=>{
      //   return data.child_eh_user_id;
      // });
     
      dispatch(setDependantUsersEHID(arr));
      let arr3=[];
      
     arr3= arr.map((data,index)=>{
         return {authToken:data.dependent_access_token};
      });
      fetchAccessDependent(arr3);
    }catch(err){
      console.log("fetchdep",err)
    }
    
     
   }
  React.useEffect(() => {
    initialCheck();
    fetchTheme();
    addLang();
    
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
                  <Stack.Screen name='GalleryPicker' component={GalleryPicker}/>
                  <Stack.Screen name='DocumentPicker' component={DocumentPicker}/>
                  <Stack.Screen name='DefaultCamera' component={DefaultCamera}/>                  
                
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
