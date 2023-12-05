import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PermissionsAndroid,Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNFS from 'react-native-fs';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
// import { launchImageLibrary } from 'react-native-image-picker';
// import Svg, { Path } from "react-native-svg";
import { Flash,FlashOff,Gallery,Shutter ,Rotate,Record,RecordActive,Scan} from '../../assets/SVG/svgIcons';
// import Icon from "react-native-vector-icons/MaterialIcons";
import Camera from "react-native-vector-icons/Ionicons";
// import Square from "react-native-vector-icons/FontAwesome";
import { BarcodeScanner } from './Qrcode';
// import Scan from "react-native-vector-icons/MaterialCommunityIcons";
// import Gallery from "react-native-vector-icons/MaterialCommunityIcons";
import axios from 'axios';
import {Base_URLs} from '../../utils/HomeAPI';
import { getUserDetails,getApiKey,getUserName} from '../../../../utils/LocalStorage';
import {ImagePreview,PDFViewer} from './Preview'
import { selectFile } from '../../utils/Permissions';
import { useDispatch, useSelector } from 'react-redux';
import { setImageURI } from '../../../../redux/slices/ProfilePicSlice';
const Recording = ({ isSaved,route} ) => {
  const  {mode} = route.params

  // State variables for various functionalities
  const [pickedDocument, setPickedDocument] = useState(null);
  const [isRecording, setIsRecording] = useState(false); // Indicates if video recording is in progress
  const [recordedVideo, setRecordedVideo] = useState(false); // Indicates if video recording is completed
  const [Photo, setPhoto] = useState(isSaved); // Indicates if a photo is captured
  const [timer, setTimer] = useState("00:00"); // Keeps track of the recording time
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back); // Camera type (front/back)
  const [flashMode, setFlashMode] = useState(RNCamera.Constants.FlashMode.off); // Flash mode
  const [isBarcodeScannerActive, setIsBarcodeScannerActive] = useState(false); 
  const pressTimeout = useRef(null);// Ref for accessing the camera component
  const cameraRef = useRef(null);// const [elapsedTime, setElapsedTime] = useState(0);
  const [timerIntervalId, setTimerIntervalId] = useState(null);// Navigation hook for navigation actions
  const nav = useNavigation();

  // Timeout for long-press recording
  let recordingTimeout;

  // Opens the image picker when called
  const openImagePicker =async () => {
    try{
      const apiURL = Base_URLs.View_FileList_URL;
      const authToken= 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjk2NTExMDc2LCJqdGkiOiI4ZGVjNGExMi1hNTcxLTRjNDEtOTRlZC05NzI3MDg1M2YyYjAiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMDkxMDAwMDAwMDA0NiIsIm5iZiI6MTY5NjUxMTA3Nn0.MYdqBgz6_-Ru8b1Mu1B8286aknzkTZ9DRyq7cVBcchM'   
      
      const queryParams = {
        object_name:"0910000000046/personal/personal"
      };
      //console.log(`Bearer ${authToken}`);
      const fullUrl = `${apiURL}?${new URLSearchParams(queryParams).toString()}`;
      
     console.log(fullUrl);
     console.log(`Bearer ${authToken}`);

      const response = await axios.post(fullUrl,{} ,{
        headers: {
          Authorization: `Bearer ${authToken}`, // Set the content type for the FormData
        },
      });
      console.log(response.data.files);
      if (response.status === 200) {
        nav.navigate('Gallery', {
          data:response.data.files,
        });
      } else {
        console.log('Failed to open gallery', response.status);
      }
    } catch (error) {
      console.error("can't open gallery",error);
    }
    
   
  };

  


  const startTimer = () => {
    // Clear any existing timer interval
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
    }

    // Initialize elapsed time to 0
    let elapsedTime = 0;

    // Create an interval that updates the elapsed time every second
    const intervalId = setInterval(() => {
      // Increment the elapsed time by 1 second
      elapsedTime += 1;
      console.log(elapsedTime)
      // Format the elapsed time as MM:SS
      const minutes = Math.floor(elapsedTime / 60);
      const seconds = elapsedTime % 60;
      console.log("seconds: ",seconds)
      const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      // Update the state with the formatted time
      setTimer(formattedTime);
    }, 1480);

    // Set the interval ID in state
    setTimerIntervalId(intervalId);
  };

  // Function to stop the timer
  const stopTimer = () => {
    // Clear the timer interval
    console.log(new Date());
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
    }

    // Reset the timer interval ID in state
    setTimerIntervalId(null);
  };

  // Function to request camera permission
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera to record videos.',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  // Function to toggle between front and back camera
  const toggleCameraType = () => {
    setCameraType((prevType) =>
      prevType === RNCamera.Constants.Type.back
        ? RNCamera.Constants.Type.front
        : RNCamera.Constants.Type.back
    );
  };

  // Function to toggle flash mode
  const toggleFlashMode = () => {
    setFlashMode((prevMode) =>
      prevMode === RNCamera.Constants.FlashMode.off
        ? RNCamera.Constants.FlashMode.torch
        : RNCamera.Constants.FlashMode.off
    );
  };

  // Function to handle setting the 'Photo' state variable
  const handleSetPhoto = (value) => {
    setPhoto(value);
    setTimeout(() => {
      setPhoto(false);
    }, 3000);
  };

  // Function to capture a photo
  const capturePhoto = async () => {
    const hasCameraPermission = await requestCameraPermission();

    if (hasCameraPermission) {
      try {
        if (cameraRef.current) {
          const options = { quality: 0.3, base64: true };
          const data = await cameraRef.current.takePictureAsync(options);
          console.log("Photo captured:", data.uri);
          nav.navigate('ImagePreview', {
            imageUri: data.uri,
            setPhotoCapture: handleSetPhoto,
            mode:mode
          }); // Navigate to the ImagePreviewScreen
        }
      } catch (error) {
        console.error("Photo capture error:", error.message);
      }
    } else {
      console.log("Camera permission denied.");
    }
  };

  // Function to handle setting the 'recordedVideo' state variable
  const handleSetVideo = (value) => {
    setRecordedVideo(value);
    setTimeout(() => {
      setRecordedVideo(false);
    }, 3000);
  };

  // Function to start video recording
  const startRecording = async () => {
    const hasCameraPermission = await requestCameraPermission();
    console.log(hasCameraPermission);
    if (hasCameraPermission) {
      try {
        if (cameraRef.current) {
          setRecordedVideo(false);
          setIsRecording(true);
          // setTimer(0);
          startTimer();
          const options = { maxDuration: 60 };
          const data = await cameraRef.current.recordAsync(options);
          console.log("data:", data);
          const filePath = `${RNFS.ExternalDirectoryPath}/sriram.mp4`;
          console.log("filepath:", filePath);
          // try {
          //   await RNFS.moveFile(data.uri, filePath);
          //   console.log("File moved successfully:");
            setIsRecording(false);
            setTimer("00:00")
            nav.navigate('VideoPreview', {
              VideoUri: data.uri,
              // setVideoCapture: handleSetVideo,
            });
          // } catch (error) {
          //   console.log("Error moving the file: ", error);
          // }
        }
      } catch (error) {
        console.error("Recording error:", error.message);
      }
    } else {
      console.log("Camera permission denied.");
    }
  };

  // Function to stop video recording
  const stopRecording = () => {
    if (isRecording) {
      if (cameraRef.current) {
        cameraRef.current.stopRecording();
        stopTimer();
      }
    }
  };

  const PressIn=()=>{
    pressTimeout.current = setTimeout(() => {
      // setIsRecording(true);
      startRecording();
      console.log("OnPressIn");
    }, 1000);
  }

  const PressOut=()=>{
    clearTimeout(pressTimeout.current);
    // console.log(pressTimeout.current);
    // pressTimeout.current=0;
    // console.log(pressTimeout.current);
    // setTimer(0)
    if (isRecording) {
      setIsRecording(false);
      stopRecording();
      console.log("OnPressOut");
    } 
  }

  const Press=()=>{
    if (!isRecording) {
      console.log("OnPress");
      capturePhoto();
    }
  }

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });


      const contentUri = result[0].uri;
      const fileUri = `file://${RNFS.CachesDirectoryPath}/${result.name}`;

      // Use the file URI for opening or rendering the document
      console.log(`File URI: ${fileUri}`);

      await RNFS.copyFile(contentUri, fileUri);

      // Now, you can use the file URI for rendering or any other purpose
      console.log(`Selected document URI (after conversion): ${fileUri}`);

      console.log(result[0].name);
      setPickedDocument(result);
      const fileExtension = result[0].name.split('.').pop().toLowerCase();
      const fileTypeMap = {
          'jpg': 'image',
          'jpeg': 'image',
          'png': 'image',
          'gif': 'image',
          'pdf': 'file',
          'doc': 'file',
          'docx': 'file',
          'mp4' :'video',
      };


      const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
      const today = new Date().toLocaleDateString('en-US', options);
      const formattedDate = today.replace(/,/g, '');
      const myobj = {
        date:formattedDate,
        images:fileUri
      }
     // console.log("iuygfukgjhgjg",myobj)
        
      nav.navigate('PdfView', {
        src: myobj.images,
        ext:fileTypeMap[fileExtension],
      });
      

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
       
      } else {
        throw err;
      }
    }
  };

  

  // Function to toggle the barcode scanner
  const toggleBarcodeScanner = () => {
    setIsBarcodeScannerActive((prevState) => !prevState);
  };
  const dispatch = useDispatch();
  async function gallery(){
    const data =  await selectFile();
    dispatch(setImageURI(data[0].uri));
    nav.goBack();
  }

  return (
    <>
      {isBarcodeScannerActive ? (
        <BarcodeScanner toggleScanner={toggleBarcodeScanner} />
      ) : (
        <View style={styles.container}>
          <RNCamera
            ref={cameraRef}
            style={styles.camera}
            type={cameraType}
            flashMode={flashMode}
            captureAudio={true}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
            }}
          />    
              {isRecording ? (<View style={styles.topTimer}>
                <View style={styles.timerContainer}>
                <View style={styles.dotContainerRecording}>
    <Text style={styles.timerText}>{`${timer}`}</Text>
  </View>
                </View>
                </View>
              ) : <View style={styles.topRightButtons}>
            <TouchableOpacity style={styles.toggleButton} onPress={toggleCameraType}>
              {/* <Camera style={styles.buttonIcon} name="camera-reverse" /> */}
              <Rotate/>
              {/* <Camera/> */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.toggleButton} onPress={toggleFlashMode}>
              {flashMode === RNCamera.Constants.FlashMode.torch ? (
                <Flash/>
              ) : (<FlashOff/>)}
            </TouchableOpacity>
          </View>}

          
          <View style={styles.topSaved}>
          {recordedVideo ? (
                <Text style={styles.successText}>Video saved to gallery</Text> 
              ) : null}
              {Photo ? (
               
                <Text style={styles.successText}>Photo saved to gallery</Text>
              ) : null}
              </View>  
             
          <View style={styles.buttonContainer}>
            
            <View style={styles.buttonFlex}>
              {!isRecording && !(mode == 'isProfile') ?<TouchableOpacity onPress={toggleBarcodeScanner} style={styles.scanIcon}>
                {/* <Scan style={styles.scanIcon} name="line-scan" /> */}
                <Scan
                  width={35}
                  height={35}
                />
              </TouchableOpacity>:(<View></View>)
              }
              <TouchableOpacity
                onPressIn={PressIn}
                onPressOut={PressOut}
                onPress={Press}
                //style={!isRecording && styles.recordButton}
              >
              {isRecording  ?<RecordActive/>:<Record
                width={70}
                  height={70}
              />}
              </TouchableOpacity>
              {/* {!isRecording?<TouchableOpacity onPress={openImagePicker} style={styles.imagePickerIcon}>
                <Gallery />
              </TouchableOpacity>:(<View></View>)} */}
              {!isRecording && !(mode == 'isProfile') ?<TouchableOpacity onPress={pickDocument} style={styles.scanIcon}>
                {/* <Scan style={styles.scanIcon} name="line-scan" /> */}
                <MaterialIcon name={"file-document-outline"} color={'white'} size={40}/>
              </TouchableOpacity>:(<View></View>)}
              {
                mode == 'isProfile' && 
                <View style={{justifyContent:'space-between',flexDirection:'row',marginRight:25}}>
                <TouchableOpacity onPress={()=>{gallery()}}>
                  <MaterialIcon name={"image"} color={'white'} size={75}/>
                </TouchableOpacity>
                </View>
              }
            </View>
          </View>
        </View>
      )}
    </>
  );
};

// Styles for the Recording component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    position: 'absolute',
    bottom: 55,
  },
  buttonFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 16,
  },
  recordButton: {
    width: 75,
    height: 75,
    borderRadius: 40,
    borderWidth: 5,
    borderColor: 'white',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  recordButtonActive: {
    width: 75,
    height: 75,
    borderRadius: 40,
    // marginLeft: 10,
    borderWidth: 5,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  imagePickerButton: {
    fontSize: 100,
    borderColor: 'white',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  scanIcon: {
    color: 'white',
    fontSize: 55,
    marginLeft:15
  },
  imagePickerIcon: {
    color: 'white',
    fontSize: 45,
    marginRight:15
  },
  toggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginVertical: 8,
    fontSize: 40,
  },
  buttonIcon: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  timerContainer: {
    marginTop: 16,
    marginBottom: 10,
  },
  dotContainer: {
    flexDirection: 'row', // This ensures the dot and timer text are in the same row
    alignItems: 'center', // Vertically center the dot and text
  },
  dotContainerRecording: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red', // Red background color for the dot
    borderRadius: 5, // Adjust this value to control the size of the dot
    paddingHorizontal: 5, // Add some horizontal spacing between the dot and timer text
  },
  timerText: {
    color: 'white',
    fontSize: 20,
    marginLeft: 5,
  },
  successText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'rgba(0, 128, 0, 0.4)',
    borderRadius: 8,
  },
  topRightButtons: {
    position: 'absolute',
    top: 53,
    right: 16,
  },
  topSaved:{
    position: 'absolute',
    top: 300,
  },
  topTimer:{
    position: 'absolute',
    top: 80,
    // backgroundColor:"red",
    // borderRadius:10
  }
});

export default Recording;
