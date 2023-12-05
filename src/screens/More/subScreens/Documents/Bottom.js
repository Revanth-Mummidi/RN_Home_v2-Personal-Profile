/**
 * This is the child component of BottomSheet in Preview Component (./Preview)
 * 
 * `Bottom` component displays a modal at the bottom of the screen with an image and a horizontal list of options.
 * 
 * @component
 * @example
 * <Bottom data={{url: 'https://example.com/image.jpg'}} />
 *
 * @param {Object} data - An object containing the URL of the image to be displayed in the modal.
 * @returns {JSX.Element} - A React component representing the bottom modal with an image and options.
 */

import React, { useState, useRef } from 'react';
import { View, Text,Pressable,StyleSheet,Image ,Share,Animated,TouchableOpacity,TextInput} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import {  ScrollView, FlatList } from 'react-native-gesture-handler';

const Bottom = ({ data }) => {
      


  const [isOpen, setIsOpen] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const datas = [
    {
      heading: 'Documents',
      subheadings: ['Subheading 1', 'Subheading 2', 'Subheading 3'],
    },
    {
      heading: 'Another Category',
      subheadings: ['Subheading A', 'Subheading B'],
    },
    {
      heading: 'Documents',
      subheadings: ['Subheading 1', 'Subheading 2', 'Subheading 3'],
    },
    {
      heading: 'Another Category',
      subheadings: ['Subheading A', 'Subheading B'],
    },
   
    
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    Animated.timing(animatedHeight, {
      toValue: isOpen ? 0 : 1,
      duration: 700, // Animation duration in milliseconds
      useNativeDriver: false, // Set to false for layout animations
    }).start();
  };

  const dropdownHeight = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 600], // Adjust the height as needed
  });

  
    // this function deleteit deletes the particular image or file or video it takes fileink as parameter 
const deleteit = async(item)=>{
    try{
  
    const apiURL = 'https://app.evaluatehealth.world/tracker/Tracker/deleteGlobalDocuments'
    const authToken= 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjk2NTExMDc2LCJqdGkiOiI4ZGVjNGExMi1hNTcxLTRjNDEtOTRlZC05NzI3MDg1M2YyYjAiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMDkxMDAwMDAwMDA0NiIsIm5iZiI6MTY5NjUxMTA3Nn0.MYdqBgz6_-Ru8b1Mu1B8286aknzkTZ9DRyq7cVBcchM'   
    
    const link = encodeURIComponent(item.file_link)
    const queryParams = {
      bucket_file_path:item.file_link,
    };
    const fullUrl = `${apiURL}?${new URLSearchParams(queryParams).toString()}`;
    console.log(fullUrl)
    const response = await axios.post(fullUrl,{},{
      headers: {
        Authorization: `Bearer ${authToken}`, // Set the content type for the FormData
      },
    });
  }catch(error){
    console.log(error)
  }
  
    
  
  }
  
  //Downloading any type of content 
  const download = (item) => { 
    let date = new Date();
    let image_URL = item;    
    let ext  = '.jpg' ;
   
    if(item[item.length - 4] == '.' ){
         ext = getExtention(image_URL);
         ext = '.' + ext[0];
    }
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' + 
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', item)
      .then(res => {
        alert('Image Downloaded Successfully.');
      });
    
  };
  
  function socials(){
  
      return(
          <ScrollView horizontal style={{paddingTop:20}}  >
               <Pressable style={{ height: 100, alignContent: 'center', marginLeft: 10 }}>
              <View style={styles.options}>
                <MaterialIcon name={'download'} size={30} color="black" />
                <Text style={styles.optText}>Download</Text>
              </View>
            </Pressable>
            <Pressable style={{ height: 100, alignContent: 'center', marginLeft: 10 }}>
              <View style={styles.options}>
                <MaterialIcon name={'share'} size={30} color="black" />
                <Text style={styles.optText}>Share</Text>
              </View>
            </Pressable>
            <Pressable style={{ height: 100, alignContent: 'center', marginLeft: 10 }}>
              <View style={styles.options}>
                <MaterialIcon name={'delete'} size={30} color="black" />
                <Text style={styles.optText}>Delete</Text>
              </View>
            </Pressable>
            <Pressable style={{ height: 100, alignContent: 'center', marginLeft: 10 }}>
              <View style={styles.options}>
                <MaterialIcon name={'lock'} size={30} color="black" />
                <Text style={styles.optText}>Lock</Text>
              </View>
            </Pressable>
          </ScrollView>
      )
  }
  
  // Social Sharing function (whatsapp,email,etc...)
  const shareit = (item) => {
    function hi(item){
      return(
      <Image source={{uri:item}}/>
      )
    }
    Share.share({
      message:item,
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsJyrA78nD27g1oJHTRb37X-C1f6-DIGEMGw&usqp=CAU',
      title: 'Share Example',
    })
      .then(result => {
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
           
          } else {
          
          }
        } else if (result.action === Share.dismissedAction) {
         
        }
      })
      .catch(error => console.log(error));
  }


    return (
      <View>
        {/* Image section */}
        <View style={{ alignItems: 'center' }}>
          <Image
            source={{ uri: data.url }}
            style={{ height: 500, width: '100%', borderRadius: 10 }}
            resizeMode="stretch"
          />
        </View>
  
        {/* Horizontal list of options */}
        {socials()}

        <View>
      <Pressable onPress={toggleDropdown}>
        {datas.slice(0,1).map((item, index) => (
         <View key={index} style={{backgroundColor:'lightgray',marginTop:5,borderRadius:20}}>
          <View style={{alignContent:'space-around',flexDirection:'row'}}>
         <Text style={{ fontWeight: 'bold',fontSize:32,color:'#0f0f0f',margin:5 }}>{item.heading}</Text>
         <MaterialIcon name={isOpen?'chevron-up':'chevron-down'}  size={42} style={{marginLeft:190,top:5}}/>
         </View>
         <View style={{flexWrap:'wrap',flexDirection:'row',margin:5}}>
         {item.subheadings.map((subheading, subIndex) => (
           <View style={{backgroundColor:"grey",borderRadius:10,justifyContent:"center",alignItems:"center",margin:5}} key={subIndex}>
                  <Text style={{margin:5,color:'green'}}>{subheading}</Text>
           </View>

         ))}
       </View>
       </View>
        ))}
      </Pressable>

      <Animated.View
        style={{
          overflow: 'hidden',
          height: dropdownHeight,
        }}
      >
        {datas.slice(1,datas.length).map((item, index) => (
           <View key={index} style={{backgroundColor:'lightgray',marginTop:5,borderRadius:20}}>
           <Text style={{ fontWeight: 'bold',fontSize:32,color:'#0f0f0f',margin:5 }}>{item.heading}</Text>
           <View style={{flexWrap:'wrap',flexDirection:'row',margin:5}}>
           {item.subheadings.map((subheading, subIndex) => (
             <View style={{backgroundColor:"grey",borderRadius:10,justifyContent:"center",alignItems:"center",margin:5}} key={subIndex}>
                    <Text style={{margin:3}}>{subheading}</Text>
             </View>
           ))}
         </View>
         </View>

        ))}
           <TextInput style={{width:'100%',height:100,backgroundColor:'lightgray',borderRadius:15}}/>
      </Animated.View>
    </View>
      </View>
    );
  };
  
  export default Bottom;
  const styles = StyleSheet.create({
    options:{
      borderRadius:5,
      alignContent:'center',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'gray',
      width:100,
     
    },
    optText:{
      marginTop:3,
      fontSize:12,
      margin:10,
    },
    contentContainer:{
      paddingTop:10,
      height:100,
      alignContent:"center",
    }
  });


  