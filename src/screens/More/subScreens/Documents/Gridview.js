import React, { useState,useEffect, useRef } from 'react';
import { View, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions ,Text,Modal, Pressable,Platform,ScrollView,Share,ImageBackground, ActivityIndicator, PanResponder} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Color } from '../../../../themes';
import Video from 'react-native-video';
import Pdf from 'react-native-pdf';
import Preview from './Preview';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';
const Gridview = ({IMAGE_DATA,type,date}) => {
  const { width, height } = Dimensions.get('window');
  var FD = IMAGE_DATA ;
  const nav = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [sections,setSections] = useState([]);
  const [item,setItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [mark,setMark] = useState(false);
  const [entermode,setEntermode] = useState(false);
  /*
  when ever type changes if type is not All then it setsections empty and calls second useeffect
  if type is other than all then it splices to 0 instead of setsections to empty bcouz of re-rendering of page makes all screen blank
  */
 
  useEffect(()=>{
    if(type!='All'){
     setSections([]);
    split()
    console.log("NOT ALL")
    }
    else{
      FD = IMAGE_DATA;
      sections.splice(0,sections.length)
      split();
    }
  },[type]);

  useEffect(() => {
    if(type!='All'){
     FD = IMAGE_DATA;
    if(sections.length === 0 && FD.length >= 0){
      split();
  }  
}
  },[IMAGE_DATA,sections]);
 



  
// Trigger to open bottomsheet
  function Previewperess (imageData){ 
  nav.navigate("Preview",{
    data:imageData
  })
  }

  //renderImage() function returns the one pic in layout according to their size(file or vide or image) 
    function renderImage(imageData,H,W)  {
    if (imageData.file_type == "video") {
      return (
        <View style={{ height: H, width: W }}>
           <Video source={{uri:imageData.url}} style={{height:H,width:W}} muted resizeMode='cover' repeat/>
          <MaterialIcon
            name={'play-circle'}
            size={15}
            style={{ position: 'absolute', bottom:5, left: 5, color: 'blue' }}
          />
        </View>
      );
    }
    else if(imageData.file_type === "file"){
      return(
        <View  style={{ width: W, height: H }}>
          <Pdf
        trustAllCerts={false}
       source={{uri:imageData.url}}
     onLoadComplete={(numberOfPages,filePath) => {
         console.log(`Number of pages: ${numberOfPages}`);
     }}
     style={{ width:W, height: H }}
    />

<MaterialIcon
            name={'file-document'}
            size={15}
            style={{ position: 'absolute', bottom:5, left: 5, color: 'blue' }}
          />

{mark && <View style={{ height: H, width: W,position:'absolute',alignContent:'center',alignItems:'center',justifyContent:'center' ,backgroundColor:'rgba(1,1,1,0.7)'}} >
            <IconIonicons name='checkmark-sharp' size={32} color={'white'} style={{}}/>
            </View>}

        </View>
      );
    }
    else if(imageData.file_type === "image"){
      return (
        <View style={mark?{backgroundColor:'rgba(1,1,1,0.3)'}:{}}>
        <Image
          source={{ uri: imageData.url }}
          style={{ width: W, height: H, resizeMode: 'cover' }}
        />
         {mark && <View style={{ height: H, width: W,position:'absolute',alignContent:'center',alignItems:'center',justifyContent:'center' ,backgroundColor:'rgba(1,1,1,0.7)'}} >
            <IconIonicons name='checkmark-sharp' size={32} color={'white'} style={{}}/>
            </View>}
        </View>
      );
    }
  }

  // rendering Each section
//from the flatlist render item
  const renderItem = ({ item }) => {
   // console.log("UNDYFED",sections)
    if (item.length === 3) {
      return (
          <View style={{ flexDirection: 'row', justifyContent:'space-between',margin:1}}>
            <View style={{ flexDirection: 'column', width: '24.5%', justifyContent: 'space-between' }}>
            {item.slice(0, 2).map((imageData, imgIndex) => (
              <TouchableOpacity
                onLongPress={()=>{setEntermode(true)}}
               onPress={()=>Previewperess(imageData)}  key={imgIndex} style={{  width: '100%' ,  borderColor:'grey' }}>
                {renderImage(imageData,99,"100%")}
              </TouchableOpacity>
            ))}
          </View> 
      
            {item.slice(2).map((imageData, imgIndex) => (
              <TouchableOpacity
              onLongPress={()=>{setEntermode(true)}}
               onPress={()=>Previewperess(imageData)}  style={{  width: '74.9%'  }}>
                {renderImage(imageData,200,"100%")}
               </TouchableOpacity>
            ))}  
        </View>
      );
    } else if (item.length === 5) {
      return ( 
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>


            <View  style={{ flexDirection:'row', width: '49.5%', justifyContent:'space-between' }}>
          <View
            style={{ flexDirection:'column', width: '49.5%', justifyContent:'space-around' }}>
            {item.slice(0, 2).map((imageData, imgIndex) => (
              <TouchableOpacity
              onLongPress={()=>{setEntermode(true)}}
              onPress={()=>Previewperess(imageData)}  key={imgIndex} style={{  width: '100%',  borderColor:'grey', }}>
               {renderImage(imageData,98,"100%")}
              </TouchableOpacity>
            ))}
          </View>
  
          <View
            style={{ flexDirection: 'column', width: '49.5%', justifyContent:'space-around' }}>
            {item.slice(2,4).map((imageData, imgIndex) => (
              <TouchableOpacity 
              onLongPress={()=>{setEntermode(true)}}
              onPress={()=>Previewperess(imageData)}  key={imgIndex} style={{  width: '100%',  borderColor:'grey',borderRadius:3 }}>
              {renderImage(imageData,98,"100%")}
              </TouchableOpacity>
            ))}
          </View>
          </View>
          
          {item.slice(4).map((imageData, imgIndex) => (
               <TouchableOpacity 
               onLongPress={()=>{setEntermode(true)}}
               onPress={()=>Previewperess(imageData)}  style={{  width: '49.5%' ,  borderColor:'grey',borderRadius:3 }}>
              {renderImage(imageData,200,"100%")}
               </TouchableOpacity>
            ))}
          
        </View>
        
      );
    } else if (item.length === 2){
      return (
        <View
          style={{ flexDirection: 'row', flexWrap: 'wrap',justifyContent:'space-around', width: '100%', marginTop:1}}>
          {item.slice(0, 1).map((imageData, imgIndex)  => (
            <TouchableOpacity 
            onLongPress={()=>{setEntermode(true)}}
            onPress={()=>Previewperess(imageData)}  key={imgIndex} style={{ paddingBottom: 2, width: '49.5%' ,  borderColor:'grey',borderRadius:3}} >
               {renderImage(imageData,100,"100%")}
            </TouchableOpacity>
          ))}
          {item.slice(1).map((imageData, imgIndex)  => (
            <TouchableOpacity
            onLongPress={()=>{setEntermode(true)}}
            onPress={()=>Previewperess(imageData)}  key={imgIndex} style={{ paddingBottom: 2, width: '49.5%',  borderColor:'grey',borderRadius:3}} >
                {renderImage(imageData,100,"100%")}
            </TouchableOpacity>
          ))}
        </View>
      );
    }else if (item.length === 1){
      return (
        <View style = {{justifyContent:'space-around'}}>
          {item.slice(0, 1).map((imageData, imgIndex)  => (
            <TouchableOpacity 
            onLongPress={()=>{setEntermode(true)}}
            onPress={()=>Previewperess(imageData)}  key={imgIndex} style={{ width: '99%' }} >
               {renderImage(imageData,150,"100%")}
            </TouchableOpacity>
          ))}
        </View>
      );
    }else if (item.length === 4){
      return (
        <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}>
          {item.slice(0,4).map((imageData, imgIndex)  => (
            <TouchableOpacity 
            onLongPress={()=>{setEntermode(true)}}
            onPress={()=>Previewperess(imageData)} 
  key={imgIndex} style={{ paddingBottom: 2, width: '24.6%',  borderColor:'grey' }} >
              { renderImage(imageData,100,"100%") }
            </TouchableOpacity>
          ))}
        </View>
      );
    }else if(item.length === 7){
      return(
      <View style = {{flexDirection:'row',justifyContent:'space-around'}}>
  
     
        <View style={{width:'24.5%',flexDirection:'column',justifyContent:'space-around'}}>
        {item.slice(0,3).map((imageData, imgIndex)  => (
            <TouchableOpacity 
            onLongPress={()=>{setEntermode(true)}}
            onPress={()=>Previewperess(imageData)}  key={imgIndex} style={{ paddingBottom: 2, width: '99%' , borderColor:'grey'}} >
               {renderImage(imageData,100,"100%")}
            </TouchableOpacity>
          ))}
        </View>

        <View style={{width:'49.5%',flexDirection:'column',justifyContent:'space-around'}}>
        {item.slice(3,4).map((imageData, imgIndex)  => (
            <TouchableOpacity 
            onLongPress={()=>{setEntermode(true)}}
            onPress={()=>Previewperess(imageData)}  key={imgIndex} style={{  width: '100%' , borderColor:'grey',height:305}} >
               {renderImage(imageData,303.5,"100%")}
            </TouchableOpacity>
          ))}
        </View>
  
        <View style={{width:'24.5%',flexDirection:'column',justifyContent:'space-around'}}>
        {item.slice(4,7).map((imageData, imgIndex)  => (
            <TouchableOpacity 
            onLongPress={()=>{setEntermode(true)}}
            onPress={()=>Previewperess(imageData)}  key={imgIndex} style={{ paddingBottom: 2, width: '99%' , borderColor:'grey'}} >
               {renderImage(imageData,100,"100%")}
            </TouchableOpacity>
          ))}
        </View>
  
        
  
      </View>
  
      
      )
    }else if(item.length === 9){
     return(
      <View style = {{flexDirection:'row',justifyContent:'space-around'}}>
  

  <View style={{width:'49.5%',flexDirection:'column',justifyContent:'space-around'}}>
        {item.slice(4,5).map((imageData, imgIndex)  => (
            <TouchableOpacity onPress={()=>Previewperess(imageData)}  key={imgIndex} style={{  width: '100%' , borderColor:'grey',height:408}} >
                {renderImage(imageData,405,"100%")}
            </TouchableOpacity>
          ))}
        </View>
        
     
        <View style={{width:'24.5%',flexDirection:'column',justifyContent:'space-around'}}>
        {item.slice(0,4).map((imageData, imgIndex)  => (
            <TouchableOpacity onPress={()=>Previewperess(imageData)}  key={imgIndex} style={{ paddingBottom: 2, width: '100%' , borderColor:'grey'}} >
               {renderImage(imageData,100,"100%")}
            </TouchableOpacity>
          ))}
        </View>

       
  
        <View style={{width:'24.5%',flexDirection:'column',justifyContent:'space-around'}}>
        {item.slice(5,9).map((imageData, imgIndex)  => (
            <TouchableOpacity onPress={()=>Previewperess(imageData)}  key={imgIndex} style={{ paddingBottom: 2, width: '100%' , borderColor:'grey'}} >
              {renderImage(imageData,100,"100%")}
            </TouchableOpacity>
          ))}
        </View>
  
        
  
      </View>
  
      
      )
    }else if(item.length === 8){
      return (
        <View style = {{flexDirection:"column"}}>
        <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}>
          {item.slice(0, 4).map((imageData, imgIndex)  => (
            <TouchableOpacity onPress={()=>Previewperess(imageData)}  key={imgIndex} style={{ paddingBottom: 2, width: '24.5%',  borderColor:'grey',borderRadius:3 }} >
               {renderImage(imageData,100,"100%")}
            </TouchableOpacity>
          ))}
        </View>
        <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}>
          {item.slice(4,8).map((imageData, imgIndex)  => (
            <TouchableOpacity onPress={()=>Previewperess(imageData)}  key={imgIndex} style={{ paddingBottom: 2, width: '24.5%',  borderColor:'grey',borderRadius:3 }} >
               {renderImage(imageData,100,"100%")}
            </TouchableOpacity>
          ))}
        </View>
        </View>
      );
    }else if(item.length === 6){
    
      return ( 
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

       <View style={{ flexDirection: 'column', justifyContent: 'space-around',width:'49.5%' }}>
        {item.slice(4).map((imageData, imgIndex) => (
             <TouchableOpacity onPress={()=>Previewperess(imageData)}  style={{  width: '100%' ,  borderColor:'grey',borderRadius:3,height:100 }}>
              {renderImage(imageData,98,"100%")}
             </TouchableOpacity>
          ))}
          </View>

          <View  style={{ flexDirection:'row', width: '49.5%', justifyContent:'space-between' }}>
        <View
          style={{ flexDirection:'column', width: '49.5%', justifyContent:'space-around' }}>
          {item.slice(0, 2).map((imageData, imgIndex) => (
            <TouchableOpacity onPress={()=>Previewperess(imageData)}  key={imgIndex} style={{  width: '100%',  borderColor:'grey', height:100 }}>
             {renderImage(imageData,98,"100%")}
            </TouchableOpacity>
          ))}
        </View>

        <View
          style={{ flexDirection: 'column', width: '49.5%', justifyContent:'space-around' }}>
          {item.slice(2,4).map((imageData, imgIndex) => (
            <TouchableOpacity onPress={()=>Previewperess(imageData)}  key={imgIndex} style={{  width: '100%',  borderColor:'grey',borderRadius:3 }}>
              {renderImage(imageData,98,"100%")}
            </TouchableOpacity>
          ))}
        </View>
        </View>
        
        
        
      </View>
      
    );
    }else{
             console.log(item.length);
    }
  };


// Displaying on Press in Bottomsheet
  const Preview = (item) => {
    if(item.file_type === "video"){
              return(
                <Video source={{uri:item.url}} resizeMode='stretch' style={{width:300,height:300, borderRadius: 10,}}/>
              )
    }else if(item.file_type === "file"){
             return(
              <View style={{}}>
               
              <Pdf
                 trustAllCerts={false}
                 source={{uri:item.url}}
                 onPageChanged={(page,numberOfPages) => {
                     console.log(`Current page: ${page}`);
                        }}
                 
                 style={{ width:500, height: 500,backgroundColor:'#f0f0f0' }}
              />
       
        </View>
             )
    }else{
          return(
            <ImageZoomer imageUrl={item.url}/>
            // <Image source={{uri:item.url}} style={{width:300,height:300,resizeMode:'stretch', borderRadius: 0,}}/>
          )
    }
  }

  /*
   the getextension() function is used to extension of image while downloading image
  */
  const getExtention = filename => {
    return /[.]/.exec(filename) ?
             /[^.]+$/.exec(filename) : undefined;
  };

//this split() function splits the image_data into array of arrays of images 
function split(){

  if(sections.length == 0){
        
          var patternIndex = 0
            let pattern = [4,7,4,9];
            while (FD.length > 0 ) {
            const size = pattern[patternIndex % pattern.length];
            if (FD.length >= size ) { sections.push(FD.splice(0, size));} 
            else { sections.push(FD.splice(0, FD.length)); patternIndex = 0; }
            patternIndex++;
        
         } 
         setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
       
      <View style={{flexDirection:'column'}}>
      {sections.length != 0 && 
        <View style={{width:width}}>
         <Text style={{ fontSize: 18, fontWeight: 'bold',color:'white',margin:15 }}>{date}</Text>
         </View>
      }
       <FlatList 
      data={sections}
      keyExtractor={(item, index) => {
       return item[0].eh_file_id.toString()}}
      renderItem={renderItem}
    />
    </View>

     
        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'black',
    justifyContent:'center',
    alignContent:'center',
    alignItems:"center",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  selectedButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    backgroundColor: 'blue',
    color: 'white',
  },
  imageContainer: {
    flex: 1,
    margin: 5,
  },
  options:{
    borderRadius:10,
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
    marginLeft:10,
    width:100
  },
  optText:{
    marginTop:3,
    fontSize:12,
    margin:10
  }
});

export default Gridview

