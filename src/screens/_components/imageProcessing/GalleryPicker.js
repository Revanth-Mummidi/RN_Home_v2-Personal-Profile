import { View, Text } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { selectFile } from '../../Home/utils/Permissions'
import { useState } from 'react'
import { responsiveHeight, responsiveWidth } from '../../../themes/ResponsiveDimensions'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const GalleryPicker = ({off}) => {
  const context = useSelector(state => state.screen.uri);
  const navigation = useNavigation();
  const [data,setData] = useState([]);

   async function pick(){
       const res = await selectFile();
       if(res.length == 0){
          navigation.goBack();
          return;
       }
      else{
        console.log(context,"from the gallery")
        if(context == 'Address'){
          console.log('GO from the gallery')
          navigation.goBack();
          return;
        }
        setData(res)
      }
   }

    useEffect(()=>{
      pick();
    },[]);

  return (
    <View style={{height:responsiveHeight(40),width:responsiveWidth(29),backgroundColor:'red',position:'absolute'}}>
        <View style={{height:responsiveHeight(40),width:responsiveWidth(29),backgroundColor:'red'}}>
             <Text>GalleryPicker</Text>
        </View>
    </View>
  )
}

export default GalleryPicker