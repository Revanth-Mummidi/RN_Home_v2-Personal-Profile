import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserVerification from './UserVerification';
import ForgotPassword from './ForgotPassword';
import Welcome from './Welcome';
import BottomTab from '../../navigations/bottomTab/BottomTab';
import Recording from '../Home/subScreens/home/Recording';
import ImagePreview from '../Home/subScreens/home/Preview';
const Stack = createNativeStackNavigator();

export default function AuthStack() {
  
  return (
    <Stack.Navigator
      initialRouteName="UserVerification"
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
       <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="UserVerification" component={UserVerification} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Recording" component={Recording}/>
      <Stack.Screen name="ImagePreview"component={ImagePreview}/>
      {/* <Stack.Screen name="BottomTab" component={BottomTab} /> */}
      
    </Stack.Navigator>
  );
}
