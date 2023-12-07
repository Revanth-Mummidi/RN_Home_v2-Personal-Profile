import { View, Text } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import { useNavigation } from '@react-navigation/native';
const DocumentPickers = () => {
   const navigation = useNavigation();

    const pickDocument = async () => {
        try {
          const result = await DocumentPicker.pick({
            type: [DocumentPicker.types.doc,DocumentPicker.types.docx,DocumentPicker.types.pdf],
          });
    
    
          const contentUri = result[0].uri;
          const fileUri = `file://${RNFS.CachesDirectoryPath}/${result.name}`;
    
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
          const myobj = {
            date:formattedDate,
            images:fileUri
          }
         console.log("iuygfukgjhgjg",myobj)
            
          // navigation.navigate('PdfView', {
          //   src: myobj.images,
          //   ext:fileTypeMap[fileExtension],
          // });
          
    
        } catch (err) {
          console.log("cancelled");
          navigation.goBack();
        }
       
      };

    useEffect(()=>{
        pickDocument();
    },[]);
  return (
    <View>
      <Text>DocumentPicker</Text>
    </View>
  )
}

export default DocumentPickers