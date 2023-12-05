import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScreenHeader, Swiper} from '../../../_components';
import Likes from './Likes';
import FeedComments from '../../screens/FeedComments';
import FeedLikes from '../../screens/FeedLikes';
import SharePostPage from '../home/Share';
const CommentScreen = () => {
  return (
    <View>
      <ScreenHeader name={'Comment Screen'} />
      <Swiper
        source={[
          {
            id: 2,
            title: 'Comments',
            badge: '',
            ref: React.createRef(),
            component: <FeedComments />,
          },
          {
            id: 3,
            title: 'Likes',
            badge: '10',
            ref: React.createRef(),
            component: <FeedLikes />,
          },
          {
            id: 4,
            title: 'Share',
            badge: '',
            ref: React.createRef(),
            component: <SharePostPage />,
          },
        ]}
      />
      <Text>CommentScreen</Text>
    </View>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({});
