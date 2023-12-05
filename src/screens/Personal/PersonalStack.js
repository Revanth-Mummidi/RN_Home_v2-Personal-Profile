import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PersonalLanding from './screens/PersonalLanding';
import PersonalPublicProfile from './screens/PersonalPublicProfile';
import PersonalAddChildMember from './subScreens/PrivateView/PersonalAddChildMember';

const Stack = createNativeStackNavigator();

export default function PersonalStack() {
  return (
    <Stack.Navigator
      initialRouteName="PersonalLanding"
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <Stack.Screen name="PersonalLanding" component={PersonalLanding} />
      <Stack.Screen
        name="PersonalPublicProfile"
        component={PersonalPublicProfile}
      />
      <Stack.Screen
        name="PersonalAddChildMember"
        component={PersonalAddChildMember}
      />
      
    </Stack.Navigator>
  );
}
