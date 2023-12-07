import React, {useState, useRef, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Image, Dimensions, Vibration, Pressable} from 'react-native';
import {RNCamera} from 'react-native-camera';
import RNFS from 'react-native-fs';
// import Scan from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import { Flash,FlashOff,Gallery,Record,Rotate,Scanner ,Scan,RotateAlt} from '../../Home/assets/SVG/svgIcons';
// import Camera from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {Base_URLs} from '../../utils/HomeAPI';
import Svg, { G,Path } from "react-native-svg";
import Globe from 'react-native-vector-icons/Entypo';
// import Scanner from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
/**
 * BarcodeScanner component for scanning QR codes and displaying the results.
 * @param {function} toggleScanner - Function to toggle the scanner on/off.
 */

const Scanner=(props)=> {
  return (
      <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={330}
      height={330}
      viewBox="0 0 21 24"
      fill="none"
      stroke="#ffffff"
      strokeWidth={0.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M3 7V5a2 2 0 012-2h2" />
      <Path d="M17 3h2a2 2 0 012 2v2" />
      <Path d="M21 17v2a2 2 0 01-2 2h-2" />
      <Path d="M7 21H5a2 2 0 01-2-2v-2" />
    </Svg>
  )
}

export const BarcodeScanner = ({toggleScanner}) => {
  const [barcode, setBarcode] = useState(null);
  const [flashMode, setFlashMode] = useState(RNCamera.Constants.FlashMode.off);
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);
  const [pickedDocument, setPickedDocument] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  /**
   * Decode the image data from the selected image.
   * @param {string} imageUri - The URI of the selected image.
   */

  const decodeImage = async imageUri => {
    try {
    //  console.log('Decoded Image:', imageUri);
    } catch (error) {
      console.error('Error decoding image:', error);
    }
  };

  /**
   * Open the image picker to select an image.
   */

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        decodeImage(imageUri);
      }
    });
  };

  /**
   * Toggle the flashlight mode of the camera.
   */

  const toggleFlashMode = () => {
    setFlashMode(prevMode =>
      prevMode === RNCamera.Constants.FlashMode.off
        ? RNCamera.Constants.FlashMode.torch
        : RNCamera.Constants.FlashMode.off,
    );
  };

  /**
   * Toggle the camera type between front and back.
   */
  const toggleCameraType = () => {
    setCameraType(prevType =>
      prevType === RNCamera.Constants.Type.back
        ? RNCamera.Constants.Type.front
        : RNCamera.Constants.Type.back,
    );
  };
  /**
   * Handle the barcode read event and display the result.
   * @param {object} event - Barcode read event data.
   */

  const handleBarCode = event => {
    if (event) {
      console.log(event);
      // Vibration.vibrate([100, 200, 100]); // Vibrate for 100ms, pause for 200ms, vibrate for 100ms
      setBarcode(event);
      setTimeout(()=>{
        setBarcode(null);
      },4000)
    }
  };

  // Document-Picker
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      console.log(result );

      setPickedDocument(result);


      const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
      const today = new Date().toLocaleDateString('en-US', options);
      const formattedDate = today.replace(/,/g, '');
      const myobj = {
        date:formattedDate,
        images:result[0].uri,
      }
      console.log(myobj)

        

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the document picker
      } else {
        throw err;
      }
    }
  };

  /**
   * Render the QR code bounds and overlay.
   */



  const renderQRBounds = () => {
    if (barcode) {
      const bounds = barcode.bounds;
      console.log(barcode.data);
      console.log(
        parseFloat(bounds.origin[0]?.x || 0) / bounds.width,
        parseFloat(bounds.origin[1]?.y || 0) / bounds.height,
      );
      const qrBoundsStyle = {
        position: 'absolute',
        left: 50 ,
        //* (parseFloat(bounds.origin[0]?.x || 0) / bounds.width),
        top: 200,
        // * (parseFloat(bounds.origin[1]?.y || 0) / bounds.height),
        width: 260,
        height: 300,
      };

      const overlayStyle = {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
      };

      const linkTextStyle = {
        color: '#4285F4',
        backgroundColor: 'white',
        fontSize: 19,
        borderRadius: 7,
        marginBottom:3,
        // width: 250,
        // textDecorationLine: 'underline',
        paddingVertical: 4, // Add padding to top and bottom
        paddingHorizontal: 8, // Add padding to left and right
      };

      const handleLinkPress = () => {
        console.log(barcode.data);
        if (barcode.data.startsWith('http')) {
          Linking.openURL(barcode.data); // Open the URL in a browser
        }
      };

      // const handlePress = () => {
      //   console.log('Button Pressed');
      // };

      return (
        <View style={qrBoundsStyle}>
          <View style={overlayStyle}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 7,
                height:47,
                width: 250,
              }}>
              <Globe
                name="globe"
                size={16}
                color="#4285F4"
                style={{marginLeft: 8}}
              />
              <TouchableOpacity onPress={handleLinkPress}>
                <Text style={linkTextStyle}>
                {barcode.data.length > 31 ? `${barcode.data.substring(8, 31)}...` : `${barcode.data.substring(8, 31)}`}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }

    return null;
  };

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
      var currentdate = new Date(); 
      const apiURL = Base_URLs.Upload_File_URL;
      const authToken= 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjk2NTExMDc2LCJqdGkiOiI4ZGVjNGExMi1hNTcxLTRjNDEtOTRlZC05NzI3MDg1M2YyYjAiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMDkxMDAwMDAwMDA0NiIsIm5iZiI6MTY5NjUxMTA3Nn0.MYdqBgz6_-Ru8b1Mu1B8286aknzkTZ9DRyq7cVBcchM'
      const base64Image = await convertImageToBase64(imageUri);
      const queryParams = {
        document_category: 'personal',
        document_type: 'image',
        file_folder: 'sriram',
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
      //console.log("response",response)
  
      if (response.status === 200) {
        console.log('Image uploaded successfully.');
        setSelectedImage(null);
      } else {
        console.log('Failed to upload Image:', response.status);
      }
    } catch (error) {
      console.error('Error uploading Image:', error);
    }
  };

  return (
    <>
      {selectedImage ? (
        <View style={{flex: 1}}>
          <Image
            source={{uri: selectedImage}}
            style={{flex: 1}}
            resizeMode="contain"
          />
          <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <Pressable onPress={()=>{
                  uploadPhotoToS3(selectedImage)
                  }}>
                          <Text>
                            Save
                          </Text>
                </Pressable>

                <Pressable>
                          <Text>
                          Dont Save
                          </Text>
                </Pressable>

          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <RNCamera
            style={styles.camera}
            onBarCodeRead={handleBarCode}
            type={cameraType}
            flashMode={flashMode}
            captureAudio={false}>
            <View style={styles.scannerOutline}>
              <View style={styles.scannerOutlineTop} />
              <View style={styles.scannerOutlineMiddle}>
                <View style={styles.scannerOutlineLeft} />
                <View style={styles.scannerOutlineCenter}>
                  {/* <Scanner
                    name="scan-outline"
                    style={{
                      marginLeft: 18,
                      fontSize: 350,
                      position: 'absolute',
                    }}
                  /> */}
                  <Scanner/>
                </View>
                <View style={styles.scannerOutlineRight} />
              </View>
              <View style={styles.scannerOutlineBottom} />
            </View>
          
          </RNCamera>
          {renderQRBounds()}
          <View style={styles.topRightButtons}>
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={toggleCameraType}>
              {cameraType === RNCamera.Constants.Type.back ? (
                <></>
                // <Rotate/>
              ) : (
                <></>
                // <RotateAlt/>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={toggleFlashMode}>
              {flashMode === RNCamera.Constants.FlashMode.torch ? (
                <></>
                // <Flash/>
              ) : (
                <></>
                // <FlashOff/>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonFlex}>

            <TouchableOpacity
                onPress={() => setBarcode(null)}
                style={styles.scanButton}>
                {/* <Scan width={65} height={65}/> */}
              </TouchableOpacity>



              <TouchableOpacity 
                onPress={toggleScanner}
                style={styles.recordButton}
                >
                {/* <Record
                  width={45}
                  height={45}
                /> */}
                </TouchableOpacity>

             

              {/* <TouchableOpacity
                style={styles.imagePickerIcon}
                onPress={openImagePicker}>
                <Gallery
                  // style={styles.imagePickerIcon}
                  // name="image-filter-none"
                />
              </TouchableOpacity> */}

              {/* <TouchableOpacity
                onPress={() =>{pickDocument()}}
                style={styles.scanButton}>
               <MaterialIcon name={"file-document-outline"} color={'white'} size={40}/>
              </TouchableOpacity> */}
              
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
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
    bottom: 57,
  },

  buttonFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    // position: 'absolute',
    paddingHorizontal: 16,
  },

  recordButton: {
    // width: 50,
    // height: 50,
    // borderRadius: 25,
    // borderWidth: 5,
    // borderColor: 'white',
    // backgroundColor: 'grey',
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginHorizontal: 8,
    marginLeft:15
  },

  scanButton: {
    borderColor: 'white',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
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
    fontSize: 75,
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

  topRightButtons: {
    position: 'absolute',
    top: 53,
    right: 16,
  },
  buttonIcon: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },

  scannerOutline: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scannerOutlineTop: {
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  scannerOutlineMiddle: {
    flexDirection: 'row',
  },
  scannerOutlineLeft: {
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  scannerOutlineCenter: {
    width: 400, // Adjust the width of the center area as needed
    height: 400, // Adjust the height of the center area as needed
    // borderWidth: 4, // Adjust the border width as needed
    // borderColor: 'white',
    // borderRadius: 20, // Adjust the border radius to make the corners round
    // borderStyle: 'dashed', // Remove the dashed border style
  },
  scannerOutlineRight: {
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  scannerOutlineBottom: {
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});

export default BarcodeScanner;
