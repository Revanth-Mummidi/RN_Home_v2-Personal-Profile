import { View, Text, Pressable } from 'react-native'
import Pdf from 'react-native-pdf'
import React from 'react'
import { Base_URLs } from '../../utils/HomeAPI'
import RNFS from 'react-native-fs';
import axios from 'axios';
const PdfView = ({ route, navigation }) => {
    
    const {src,ext} = route.params;
    console.log("extkjasdddddddddddddddddddd",ext);
    const convertImageToBase64 = async (imageUri) => {
        try {
          // Read the image file using react-native-fs
           const base64String = await RNFS.readFile(imageUri, 'base64');
          // Convert the image content to a base64 string using base64-js
           console.log(base64String)
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
          
          var currentdate = new Date(); 
          const queryParams = {
            document_category: 'personal',
            document_type: `${ext}`,
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
        //  console.log("response",response)
      
          if (response.status === 200) {
            console.log('Image uploaded successfully.');
           // setSelectedImage(null);
          } else {
            console.log('Failed to upload Image:', response.status);
          }
        } catch (error) {
          console.error('Error uploading Image:', error);
        }
      };

      
  return (
    <View style={{flex:1}}>
       <Pdf
                     trustAllCerts={false}
                  source={{uri:src}}
                  onLoadComplete={(numberOfPages,filePath) => {
                      console.log(`Number of pages: ${numberOfPages}`);
                  }}
                  onPageChanged={(page,numberOfPages) => {
                      console.log(`Current page: ${page}`);
                  }}
                  onError={(error) => {
                      console.log(error);
                  }}
                  onPressLink={(uri) => {
                      console.log(`Link pressed: ${uri}`);
                  }}
                  style={{width:'100%',height:'90%',backgroundColor:"#f0f0f0",alignContent:"center",margin:2,borderRadius:10,paddingTop:50}}/>
                
         <View style={{flexDirection:'row',justifyContent:'space-around',paddingTop:10}}>
                   <Pressable onPress={()=>{
                    console.log(src)
                    uploadPhotoToS3(src)
                  }}>
                    <Text>Save</Text>
                   </Pressable>

                   <Pressable>
                    <Text>Dont Save</Text>
                   </Pressable>
         </View>

  </View>
  )
}

export default PdfView