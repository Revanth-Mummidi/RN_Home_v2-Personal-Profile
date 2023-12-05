/// This can be used to have swiper style with different medules independently.
/// Home(with social), Tracker(with tracker overview),calender(With calendarmain) etc

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {PlainSwiper} from '../../../_components';
import Test1 from '../../_more/temp/Test1';
import Test2 from '../../_more/temp/Test2';

const StartingPage = () => {
  const navigation = useNavigation();
  return (
    <View>
      <PlainSwiper
        source={[
          {
            id: 1,
            title: 'Home',
            badge: '',
            ref: React.createRef(),
            component: <Test1 />,
          },
          {
            id: 2,
            title: 'Social',
            badge: '10',
            ref: React.createRef(),
            component: <Test2 />,
          },
          //   {
          //     id: 3,
          //     title: 'Social',
          //     badge: '10',
          //     ref: React.createRef(),
          //     component: <TrackerOverview />,
          //   },
        ]}
      />
    </View>
  );
};

export default StartingPage;

const styles = StyleSheet.create({});
