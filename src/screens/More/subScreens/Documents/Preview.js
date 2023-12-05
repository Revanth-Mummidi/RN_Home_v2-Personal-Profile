
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, PanResponder, Image, useMemo, useCallback, StyleSheet, Pressable, TouchableOpacity, Modal } from 'react-native';
import Video from 'react-native-video';
import Pdf from 'react-native-pdf';
import BottomSheet from '@gorhom/bottom-sheet';
import Bottom from './Bottom';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
/**
 * It Comes from the Gridview Component 
 * 
 * Define the `Preview` component, which displays a preview of a selected item.
 *
 * @param {Object} route - React Navigation route containing the selected item data.
 */
const Preview = ({ route }) => {
  // State variables
  const [sheetPosition, setSheetPosition] = useState(0);
  const snapPoints = ['1%', '50%', '75%', '95%'];
  const sheetRef = useRef(null);

  // Render the preview of the selected item based on its type.(image|file|video)
  const review = (item) => {
    if (item.file_type === "video") {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }} {...panResponder.panHandlers}>
          <Video source={{ uri: item.url }} resizeMode='stretch' style={{ width: 300, height: 300, borderRadius: 10 }} {...panResponder.panHandlers} />
        </View>
      );
    } else if (item.file_type === "file") {
      return (
        <View style={{ width: '100%', height: 600 }}>
          <Pdf
            trustAllCerts={false}
            source={{ uri: item.url }}
            async
            style={{ width: '100%', height: 600, backgroundColor: '#f0f0f0' }}
            {...panResponder.panHandlers}
            horizontal
          />
        </View>
      );
    } else {
      return (
        <Image blurRadius={sheetPosition >= 1 ? 100 : 0} source={{ uri: item.url }} style={{ width: "100%", height: 600, resizeMode: 'stretch', borderRadius: 0 }} {...panResponder.panHandlers} />
      );
    }
  };

  // Extract the 'data' parameter from the route.
  const { data } = route.params;

  // Handle pan gestures for the sheet (drag-up/down).
  const handlePanResponderMove = (_, gestureState) => {
    if (gestureState.dy < -50) {
      sheetRef.current?.snapToIndex(1);
    } else if (gestureState.dy > 150) {
      sheetRef.current?.close();
    }
  };

  // Create a PanResponder to handle touch gestures.
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: handlePanResponderMove,
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
      {/* Render the selected item based on its type */}
      {review(data)}

      {/* BottomSheet for additional content */}
      <BottomSheet ref={sheetRef} snapPoints={snapPoints} 
        index={0} onChange={(index) => setSheetPosition(index)}
        backgroundStyle={{backgroundColor:'rgba(0,0,0,0)'}} 
        handleIndicatorStyle={{height:10,width:100,backgroundColor:'rgba(0,0,0,0.7)'}}
      >
      <LinearGradient
        colors={['black','lightgray','gray']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1 }}
      >
        <ScrollView>
        <Bottom data={data}/>
        </ScrollView>
        </LinearGradient>
      </BottomSheet>
    </View>
  );
};



export default Preview

