import { View, Text } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import { useNavigation } from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import { setImageURI } from '../../../redux/slices/ProfilePicSlice'
import { convertImageToBase64 } from '../../Home/subScreens/home/Preview';
const DocumentPickers = () => {
   const navigation = useNavigation();
   const dispatch=useDispatch()
   const context = useSelector(state => state.screen.uri);
   console.log("documentPicker",context)
    const pickDocument = async () => {
        try {
          const result = await DocumentPicker.pick({
            type: [DocumentPicker.types.doc,DocumentPicker.types.docx,DocumentPicker.types.pdf],
          });
          const contentUri = result[0].uri;
          const fileUri = `file://${RNFS.CachesDirectoryPath}/${result[0].name}`;
          console.log(`File URI: ${fileUri}`);
          await RNFS.copyFile(contentUri, fileUri);
          console.log(`Selected document URI (after conversion): ${fileUri}`);
          console.log(result[0].name);
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
          if(context == 'Address'||context == 'isProfile'){
            console.log('GO from the gallery')
            console.log("FROM GALLERY,",fileUri);
            const base64=await convertImageToBase64(fileUri)
            console.log(base64)
            dispatch(setImageURI(base64));
            console.log("converted to base64")
            navigation.goBack();
            return;
          }
        } catch (err) {
          console.log("cancelled",err);
          navigation.goBack();
        }
       
      };

    useEffect(()=>{
        pickDocument();
    },[]);
}

export default DocumentPickers