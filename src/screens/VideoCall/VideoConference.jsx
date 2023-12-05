// import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CallRoom from './CallRoom';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';

const Stack = createNativeStackNavigator();

function VideoConference() {
  return (
    
      <Stack.Navigator
      screenOptions={{headerShown: false}}>
        <Stack.Screen name="CallRoom" component={CallRoom} />
        <Stack.Screen name="CreateRoom" component={CreateRoom} />
        <Stack.Screen name="JoinRoom" component={JoinRoom} />
      </Stack.Navigator>
   
  );
}

export default VideoConference;
