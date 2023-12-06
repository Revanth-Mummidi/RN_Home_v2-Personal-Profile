import React, { useState,useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet ,Dimensions} from 'react-native';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import Video from 'react-native-video';
import axios from 'axios';
import {Base_URLs} from '../../utils/HomeAPI';
import { getUserDetails,getApiKey,getUserName} from '../../../../utils/LocalStorage';
import RNFS from 'react-native-fs';
import { useDispatch, useSelector } from 'react-redux';
import {  setBackendUri, setImageURI } from '../../../../redux/slices/ProfilePicSlice';
import { Save,Cross } from '../../assets/SVG/svgIcons';
// import ImageResizer from 'react-native-image-resizer';
// import ImageBase64 from 'react-native-image-base64';

export  function VideoPreview({ route, navigation }) {
  const { VideoUri,
    // setVideoCapture 
  } = route.params;
const [isPaused,setPause]=useState(true)
  useEffect( ()=>{
    console.log("navigated to videopreview, videoUri: ",VideoUri)
  },[])

  const convertVideoToBase64 = async (videoUri) => {
    try {
      // Read the image file using react-native-fs
       const base64String = await RNFS.readFile(videoUri, 'base64');
       console.log(base64String)
      return base64String;
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return null;
    }
  };

const togglePause=()=>{
  setPause((prev)=>!prev)
}
  const uploadVideoToS3 = async (videoUri) => {
    try{
    const apiURL = Base_URLs.Upload_File_URL;
      const authToken=await getApiKey();
      const base64Video = await convertVideoToBase64(videoUri);
      const queryParams = {
        document_category: 'personal',
        document_type: 'video',
        file_folder: 'sriram',
        file_name: 'newVideo',
        description: 'newVideo',
        eh_user_role_id: 'EHURO117',
      };

      const payload = {
        base64_code: base64Video,
      };
      
      console.log(payload);
      console.log(`Bearer ${authToken}`);
      

      // Combine the URL and query parameters
      const fullUrl = `${apiURL}?${new URLSearchParams(queryParams).toString()}`;
      
      console.log(fullUrl);
      const response = await axios.post(fullUrl, payload, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Set the content type for the FormData
        },
      });
  
      if (response.status === 200) {
        console.log('Video uploaded successfully.');
        // setVideoCapture(true);
        navigation.goBack();
      } else {
        console.log('Failed to upload video:', response.status);
      }
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };


  const saveVideoToCameraRoll = async () => {
    try {
      // await CameraRoll.save(VideoUri, 'video' );
      // console.log('Video saved to the camera roll.');
      console.log("saving to s3......");
      await uploadVideoToS3(VideoUri);
      // setVideoCapture(true);
      // navigation.goBack()
      
    } catch (error) {
      console.log('Error saving Video to camera roll:', error);
    }
  };

  const discardVideo = () => {
    // setVideoCapture(false);
    navigation.goBack() // Navigate back to the recording screen without saving
  };

  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={togglePause} style={styles.videoContainer}>
    <Video
      source={{ uri: VideoUri }}
      style={styles.video}
      controls={false} // Disable default controls
      paused={isPaused} // Use the isPaused state to control playback
      resizeMode="contain"
    />
    {isPaused && ( // Show play button when not paused
      <TouchableOpacity onPress={togglePause} style={styles.playButton}>
        <Text style={styles.playButtonText}>Play</Text>
      </TouchableOpacity>
    )}
  </TouchableOpacity>

  <View style={styles.buttonContainer}>
    <TouchableOpacity onPress={saveVideoToCameraRoll} style={styles.saveButton}>
      <Save />
    </TouchableOpacity>
    <TouchableOpacity onPress={discardVideo} style={styles.discardButton}>
      <Cross />
    </TouchableOpacity>
  </View>
    </View>
  );
}

const ImagePreview = ({ route, navigation }) => {
  const { imageUri,setPhotoCapture,mode } = route.params;
   const dispatch = useDispatch();
  const convertImageToBase64 = async (imageUri) => {
    try {
      // Read the image file using react-native-fs
       const base64String = await RNFS.readFile(imageUri, 'base64');
      // Convert the image content to a base64 string using base64-js
      // console.log(base64String)
      // const base64String = Base64.encode(imageContent);
  
      return base64String;
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return null;
    }
  };


  const uploadPhotoToS3 = async (imageUri) => {
    try {
      const apiURL = Base_URLs.Upload_File_URL;
      const authToken= 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjk2NTExMDc2LCJqdGkiOiI4ZGVjNGExMi1hNTcxLTRjNDEtOTRlZC05NzI3MDg1M2YyYjAiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMDkxMDAwMDAwMDA0NiIsIm5iZiI6MTY5NjUxMTA3Nn0.MYdqBgz6_-Ru8b1Mu1B8286aknzkTZ9DRyq7cVBcchM'
      const base64Image = await convertImageToBase64(imageUri);
      // const queryParams = {
      //   document_category: 'personal',
      //   document_type:'file',
      //   file_folder: 'sriram',
      //   file_name: 'oldimage',
      //   description: 'newimage',
      //   eh_user_role_id: 'EHURO117',
      // };
      var currentdate = new Date(); 
      const queryParams = {
        document_category: 'personal',
        document_type: 'image',
        file_folder: 'Images',
        file_name: `${currentdate.getHours()+":"+ currentdate.getMinutes()+":"  + currentdate.getSeconds()}`,
        description: 'newimage',
        eh_user_role_id: 'EHURO117',
      };
       
      const payload = {
        base64_code: base64Image,
      };
      
     // console.log(payload);
      console.log(`Bearer ${authToken}`);
      

      // Combine the URL and query parameters
      const fullUrl = `${apiURL}?${new URLSearchParams(queryParams).toString()}`;
                                                                   
      console.log("FuLL URL",fullUrl);
      const response = await axios.post(fullUrl, payload, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Set the content type for the FormData
        },
      });
      console.log("response",response)
  
      if (response.status === 200) {
        console.log('Image uploaded successfully.');
        let path = response.data.fields.key;
      //  dispatch(setBackendUri(path))
        console.log(response.data.fields.key)
       // setSelectedImage(null);
      } else {
        console.log('Failed to upload Image:', response.status);
      }
    } catch (error) {
      console.error('Error uploading Image:', error);
    }
  };


  const add = async () =>{
   // const opt = await selectFile();
    const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
    const today = new Date().toLocaleDateString('en-US', options);
    const formattedDate = today.replace(/,/g, '');
    const myobj = {
      date:formattedDate,
      images:imageUri,
    }
    console.log(myobj);
}

  const saveImageToCameraRoll = async () => {
    try {
      if(mode == 'isProfile'){
        dispatch(setImageURI(imageUri));
        const base64Image = await convertImageToBase64(imageUri);
        console.log(base64Image);
        navigation.pop();
        navigation.pop();
        return;
      }
      // await CameraRoll.save(imageUri, { type: 'photo' });
      await uploadPhotoToS3(imageUri)
      // console.log('Image saved to the camera roll.');
      // setPhotoCapture(true);
      // navigation.goBack()
      add();
    } catch (error) {
      // console.log('Error saving image to camera roll:', error);
      console.log('Error saving image to AWS S3', error);

    }
  };

  const discardImage = () => {
    setPhotoCapture(false);
    navigation.goBack() // Navigate back to the recording screen without saving
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={saveImageToCameraRoll} style={styles.saveButton}>
          <Text style={styles.playButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={discardImage} style={styles.discardButton}>
          <Text style={styles.playButtonText}>Don't Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const { width, height } = Dimensions.get('window'); // Get screen dimensions
const styles = StyleSheet.create({
  image:{
    width:width,
    height:height
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Align content at the bottom of the screen
    alignItems: 'center',
    backgroundColor: 'black',
  },
  videoContainer: {
    flex: 9, // 80% of the screen height
    width: '100%',
  },
  video: {
    flex: 1,
    width: '100%',
  },
  playButton: {
    position: 'absolute',
    alignSelf: 'center',
    top:350,
    zIndex: 1, // Ensure the button is above the video
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 50,
  },
  playButtonText: {
    color: 'red',
    fontSize: 24,
  },
  buttonContainer: {
    flex: 2, // 20% of the screen height
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  discardButton:{
    backgroundColor:'blue',
    height:50,
    width:100,
    bottom:20,
    alignItems:'center',
    justifyContent:'center',
    margin:5
  },
  saveButton:{
    backgroundColor:'blue',
    height:50,
    width:100,
    bottom:20,
    alignItems:'center',
    justifyContent:'center'
  }
});

export default ImagePreview;