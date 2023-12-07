import React, { useEffect } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeLanding from './screens/HomeLanding';
import FeedPost from './screens/FeedPost';
import CommentScreen from './subScreens/comment/CommentScreen';
import NotificationPage from './screens/NotificationPage';
import BookmarkPage from './subScreens/home/Bookmark';
import VideoFeed from './subScreens/home/VideoFeed'
import FolderDetails from './subScreens/home/FolderDetails';
// import Recording from './subScreens/home/Recording';
const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeLanding"
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <Stack.Screen name="HomeLanding" component={HomeLanding} />
      <Stack.Screen name="FeedPost" component={FeedPost} />
      {/* <Stack.Screen name="CameraScreen" component={Recording} /> */}
      <Stack.Screen name="CommentScreen" component={CommentScreen} />
      <Stack.Screen name="NotificationPage" component={NotificationPage} />
      <Stack.Screen name="BookmarkPage" component={BookmarkPage} />
    <Stack.Screen name = "VideoFeed" component={VideoFeed}/>
    <Stack.Screen name = "FolderDetails" component={FolderDetails}/>
    </Stack.Navigator>
  );
}
