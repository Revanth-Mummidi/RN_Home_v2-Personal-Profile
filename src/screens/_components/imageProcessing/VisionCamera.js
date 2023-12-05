// Ref: https://www.youtube.com/watch?v=SYRBEjmMBKA

import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Pressable,
    Image,
    ScrollView,
  } from 'react-native';
  import React, {useEffect, useRef, useState} from 'react';
  import {Camera, useCameraDevices} from 'react-native-vision-camera';
  import {ThemeContext} from '../../../themes/components/ThemeContext';
  import {Colors} from '../../../themes';
  import CameraGallaryRoll from './CameraGallaryRoll';
  import {useNavigation} from '@react-navigation/native';
  
  export default function VisionCamera ({imageClick = false, onPressCamera}) {
    const {theme, toggleTheme} = React.useContext(ThemeContext);
    const Color = Colors(theme);
    const styles = getStyles(Color);
    const navigation = useNavigation();
    const devices = useCameraDevices();
    const device = devices.back;
    const camera = useRef(null);
    const [imageData, setImageData] = useState('');
    const [imageClicked, setImageClicked] = useState(false);
    useEffect(() => {
      checkPermission();
    }, []);
    //to prompt the user to give your app permission to use the Camera or Microphone.
    const checkPermission = async () => {
      const newCameraPermission = await Camera.requestCameraPermission();
      const newMicrophonePermission = await Camera.requestMicrophonePermission();
  
      console.log(newCameraPermission);
    };
    //to find out if a user has granted or denied permission before
    const requestingPermission = async () => {
      const cameraPermission = await Camera.getCameraPermissionStatus();
      const microphonePermission = await Camera.getMicrophonePermissionStatus();
      console.log(cameraPermission);
    };
  
    if (device == null) return <ActivityIndicator />;
  
    const takePicture = async () => {
      if (camera != null) {
        const photo = await camera.current.takePhoto({
          //flash ON or OFF
          flash: 'on',
        });
        setImageData(photo.path);
        setImageClicked(true);
        console.log(photo.path);
      }
    };
    return (
      <View style={{flex: 1}}>
        {imageClicked && (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {imageData !== '' && (
              <Image
                source={{uri: 'file://' + imageData}}
                style={{width: '90%', height: 500}}
              />
            )}
            <Pressable
              onPress={() => {
                setImageClicked(true);
                //tempory nativation
                navigation.navigate('TrackerStack', {
                  screen: 'MediaCategorization',
                });
              }}>
              <Text style={{color: 'black'}}>Click Photo</Text>
            </Pressable>
          </View>
        )}
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
          orientation="portrait"
          enableZoomGesture
        />
  
        <View
          style={{
            flex: 1,
            width: '100%',
            position: 'absolute',
            bottom: 70,
          }}>
          <CameraGallaryRoll />
          <View
            style={{
              flex: 1,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignSelf: 'center',
            }}>
            <Pressable style={{alignItems: 'center', justifyContent: 'center'}}>
              {/* <Image
                source={require('../assets/icons/video.png')}
                style={{width: 30, height: 30}}
              /> */}
            </Pressable>
            <Pressable
              onPress={() => {
                takePicture();
              }}
              style={{}}>
              <View style={styles.circleOuter}>
                {imageClicked && <View style={styles.circleInner} />}
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.navigate('');
              }}
              style={{alignItems: 'center', justifyContent: 'center'}}>
              {/* <Image
                source={require('../assets/icons/scanner.png')}
                style={{width: 30, height: 30}}
              /> */}
            </Pressable>
          </View>
        </View>
      </View>
    );
  };
  

  
  const getStyles = Color => {
    const style = StyleSheet.create({
      circleOuter: {
        width: 60,
        height: 60,
        borderWidth: 5,
        borderColor: Color._baseColor,
        borderRadius: 50,
  
        justifyContent: 'center',
        alignItems: 'center',
      },
      circleInner: {
        width: 44,
        height: 44,
        borderRadius: 50,
        backgroundColor: Color._baseColor,
      },
    });
    return style;
  };