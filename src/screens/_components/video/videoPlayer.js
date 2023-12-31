{
  /* 
//// Usage of the component

<VideoPlayer
  source={{
    uri: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1',
  }}
  controls={false}
/>; */
}

import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Video from 'react-native-video';
const WIDTH = Dimensions.get('window').width;
const VideoPlayer = ({source, style, controls = false}) => {
  return (
    <View>
      <Video
        source={source}
        ref={ref => {
          player = ref;
        }}
        style={{width: WIDTH, height: 400, ...style}}
        controls={controls}
      />
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({});

// // React Native Video Library to Play Video in Android and IOS
// // https://aboutreact.com/react-native-video/

// // import React in our code
// import React, {useState, useRef} from 'react';

// // import all the components we are going to use
// import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

// //Import React Native Video to play video
// import Video from 'react-native-video';

// //Media Controls to control Play/Pause/Seek and full screen
// import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';

// const VideoPlayer = () => {
//   const videoPlayer = useRef(null);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [paused, setPaused] = useState(false);
//   const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
//   const [screenType, setScreenType] = useState('content');

//   const onSeek = seek => {
//     //Handler for change in seekbar
//     videoPlayer.current.seek(seek);
//   };

//   const onPaused = playerState => {
//     //Handler for Video Pause
//     setPaused(!paused);
//     setPlayerState(playerState);
//   };

//   const onReplay = () => {
//     //Handler for Replay
//     setPlayerState(PLAYER_STATES.PLAYING);
//     videoPlayer.current.seek(0);
//   };

//   const onProgress = data => {
//     // Video Player will progress continue even if it ends
//     if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
//       setCurrentTime(data.currentTime);
//     }
//   };

//   const onLoad = data => {
//     setDuration(data.duration);
//     setIsLoading(false);
//   };

//   const onLoadStart = data => setIsLoading(true);

//   const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

//   const onError = () => alert('Oh! ', error);

//   const exitFullScreen = () => {
//     alert('Exit full screen');
//   };

//   const enterFullScreen = () => {};

//   const onFullScreen = () => {
//     setIsFullScreen(isFullScreen);
//     if (screenType == 'content') setScreenType('cover');
//     else setScreenType('content');
//   };

//   const renderToolbar = () => (
//     <View>
//       <Text style={styles.toolbar}> toolbar </Text>
//     </View>
//   );

//   const onSeeking = currentTime => setCurrentTime(currentTime);

//   return (
//     <View style={{flex: 1}}>
//       <Video
//         onEnd={onEnd}
//         onLoad={onLoad}
//         onLoadStart={onLoadStart}
//         onProgress={onProgress}
//         paused={paused}
//         ref={videoPlayer}
//         resizeMode={screenType}
//         onFullScreen={isFullScreen}
//         source={{
//           uri: 'https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4',
//         }}
//         style={styles.mediaPlayer}
//         volume={10}
//       />
//       <MediaControls
//         duration={duration}
//         isLoading={isLoading}
//         mainColor="#333"
//         onFullScreen={onFullScreen}
//         onPaused={onPaused}
//         onReplay={onReplay}
//         onSeek={onSeek}
//         onSeeking={onSeeking}
//         playerState={playerState}
//         progress={currentTime}
//         toolbar={renderToolbar()}
//       />
//     </View>
//   );
// };

// export default VideoPlayer;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   toolbar: {
//     marginTop: 30,
//     backgroundColor: 'white',
//     padding: 10,
//     borderRadius: 5,
//   },
//   mediaPlayer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//     backgroundColor: 'black',
//     justifyContent: 'center',
//   },
// });
