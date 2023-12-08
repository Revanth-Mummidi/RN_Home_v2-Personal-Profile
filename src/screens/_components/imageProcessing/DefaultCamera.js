import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { selectImageFromCamera } from '../../Home/utils/Permissions';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setImageURI } from '../../../redux/slices/ProfilePicSlice';
import { convertImageToBase64 } from '../../Home/subScreens/home/Preview';
const DefaultCamera = () => {
    const dispatch = useDispatch();
    const context = useSelector(state => state.screen.uri);
    console.log(context , "FROM CAMER")
    const navigation = useNavigation();
    async function Imgdata(){
        const res = await selectImageFromCamera();
        console.log(res,"FROM THE DEFAULT CAMERA OUT OF THE BOX");
         if(res.didCancel == true){
            if(context != 'Address'){
            navigation.goBack();
            }
            return '';
         }else{
            console.log(res,"FROM THE DEFAULT CAMERA");
            if(context == 'Address'||context == 'isProfile'){
                const base64=await convertImageToBase64(res.assets[0].uri)
                dispatch(setImageURI(base64));
                console.log('GOback',res.assets[0].uri) 
            }
         }
    }
    useEffect(()=>{
        // let a=Imgdata();
        // if(a!='')
        // dispatch(setImageURI(a)); 
        Imgdata();
    },[]);

    if(context == 'Address'){
        console.log('GOback')
        navigation.goBack();
    }


    else if(context != 'GlobalDocs'){
        return (
            <View>
              <Text>DefaultCamera</Text>
            </View>
          )
    }else{
        return(
            <View style = {{height:300,width:300,backgroundColor:'red'}}>
            <Text>DefaultCamera</Text>
          </View>
        )
    }
 
}

export default DefaultCamera