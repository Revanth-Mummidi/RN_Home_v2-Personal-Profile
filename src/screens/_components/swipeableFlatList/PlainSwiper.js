{
  /*
Developer Note >>>>>>>>>>>>>>>>>>>>>>

Usage Method >>>>>>>>>>>>>>>>>>>>>>>>>
<PlainSwiper
  source={[
    {
      id: 2,
      title: 'Home',
      badge: '',
      ref: React.createRef(),
      component: <Qualifications />,
    },
    {
      id: 3,
      title: 'Social',
      badge: '10',
      ref: React.createRef(),
      component: <DrugSocial />,
    },
  ]}
/>; */
}

import React, {useState, useRef} from 'react';
import {
  Dimensions,
  Animated,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {Color} from '../../../themes';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const PlainSwiper = ({source, height = 65}) => {
  const [indexs, setIndexs] = React.useState(0);
  const componentRef = React.useRef(null);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{backgroundColor: Color.WHITE, flex: -1}}>
        <FlatList
          style={{flexGrow: 0}}
          ref={componentRef}
          data={source}
          pagingEnabled
          onMomentumScrollEnd={event => {
            const index = Math.floor(
              Math.floor(event.nativeEvent.contentOffset.x) /
                Math.floor(event.nativeEvent.layoutMeasurement.width),
            );
            setIndexs(index);
          }}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({item}) => {
            return (
              <View
                style={{
                  width: WIDTH,
                  height: HEIGHT - height,
                }}>
                {item.component}
              </View>
            );
          }}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: -1,
    alignItems: 'flex-start',
  },
});

export default PlainSwiper;
