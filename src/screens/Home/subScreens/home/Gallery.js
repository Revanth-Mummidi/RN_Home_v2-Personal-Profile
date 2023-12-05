import React,{useState} from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import Video from 'react-native-video';
import Gridview from '../../../More/subScreens/Documents/Gridview';

const Gallery = ({ route, navigation }) => {
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(true);

  const { data } = route.params;
  const handleGoBack = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }) => {

    const fileExtension = item.filename.split('.').pop().toLowerCase();
    const handleTap = () => {
      setControlsVisible(!controlsVisible);
    };
    const togglePlayPause = () => {
      setIsPaused(!isPaused);
    };
    if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png') {
      return <Image source={{ uri: item.url }} style={styles.image} />;
    } else if (fileExtension === 'mp4') {
      return (
        <View style={styles.videoContainer}>
  <Video
    source={{ uri: item.url }}
    style={styles.video}
    controls={false} // Disable default controls
    paused={!controlsVisible} // Use the controlsVisible state to control playback
    resizeMode="contain"
    onTap={handleTap} // Toggle controls visibility on tap
    hideControlsTimeout={2000} // Hide controls after 3 seconds of inactivity
  />
  {controlsVisible && ( // Show controls only when controlsVisible is true
    <View style={styles.controls}>
      {/* Add your play/pause buttons here */}
      {/* Example: */}
      <TouchableOpacity onPress={togglePlayPause}>
        <Text style={styles.playPauseButton}>Play/Pause</Text>
      </TouchableOpacity>
    </View>
  )}
</View>

      );
    } else {
      return <Text style={styles.unsupportedText}>Unsupported Format</Text>;
    }
  };

  return (
    <View style={{backgroundColor:'red',flex:1}}>
      {/* <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.contentContainer}
      />
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity> */}
      <Gridview IMAGE_DATA={data} type='All'/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    top:50,
    padding: 10,
  },
  image: {
    width: Dimensions.get('window').width / 3 - 12,
    height: Dimensions.get('window').width / 3 - 12,
    margin: 4,
    borderRadius: 8,
  },
  videoContainer: {
    width: Dimensions.get('window').width / 3 - 12,
    height: Dimensions.get('window').width / 3 - 12,
    margin: 4,
    borderRadius: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  video: {
    flex: 1,
  },
  unsupportedText: {
    width: Dimensions.get('window').width / 3 - 12,
    height: Dimensions.get('window').width / 3 - 12,
    margin: 4,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'gray',
    color: 'white',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 8,
    margin: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  controls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  playPauseButton: {
    color: 'white',
    fontSize: 24,
  },
});

export default Gallery;
