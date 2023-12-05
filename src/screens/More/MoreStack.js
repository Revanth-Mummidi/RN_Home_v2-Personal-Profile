import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MoreLanding from './screens/MoreLanding';
import Scheduler from './subScreens/Scheduler';
import Accounts from './subScreens/Accounts/Accounts';
import DailyRoutinesLanding from './subScreens/UserRoutines/DailyRoutinesLanding';
import GlobalDocuments from './subScreens/Documents/GlobalDocuments';
import Settings from './subScreens/Settings/Settings';
import PersonalStack from '../Personal/PersonalStack';
const Stack = createNativeStackNavigator();

{
  /*
  ////  Referce code for calling child navigators

const AccountStack = createNativeStackNavigator();

function AccountsSection() {
  return (
    <AccountStack.Navigator
      initialRouteName="Accounts"
      screenOptions={{
        headerShown: false,
      }}>
      <AccountStack.Screen name="Accounts" component={Accounts} />
    </AccountStack.Navigator>
  );
}
 */
}
export default function MoreStack() {
  return (
    <>
      <Stack.Navigator
        initialRouteName="MoreLanding"
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}>
        <Stack.Screen name="MoreLanding" component={MoreLanding} />
        <Stack.Screen name="Scheduler" component={Scheduler} />
        <Stack.Screen name='PersonalStack' component={PersonalStack}/>
        {/* //Daily Routines  >>>>>>>>>>>>>>>>>>>>>> */}
        <Stack.Screen
          name="DailyRoutinesLanding"
          component={DailyRoutinesLanding}
        />

        {/* //Accounts  >>>>>>>>>>>>>>>>>>>>>> */}
        <Stack.Screen name="Accounts" component={Accounts} />
        <Stack.Screen name="GlobalDocuments" component={GlobalDocuments} />
        {/* //Settings  >>>>>>>>>>>>>>>>>>>>>> */}
        <Stack.Screen name="Settings" component={Settings} />
        {/* <Stack.Screen name="Accounts" component={AccountsSection} /> // Referce code for calling child navigators */}
      </Stack.Navigator>
    </>
  );
}
