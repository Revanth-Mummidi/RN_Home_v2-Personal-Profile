import {FlatList, StyleSheet, Text, TouchableOpacity, View,ActivityIndicator, Pressable, SectionList,Modal} from 'react-native';
import Pdf from 'react-native-pdf';
import Video from 'react-native-video';
import React, { useEffect,useState } from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import PdfView from '../../../Home/subScreens/home/PdfView';
import { Image } from 'react-native';
import axios from 'axios';
import Gallery from '../../../Home/subScreens/home/Gallery';
import { Base_URLs } from '../../../Home/utils/HomeAPI';
import { useNavigation } from '@react-navigation/native';
import Gridview from '../Documents/Gridview';
import { AppHeader } from '../../../_components';
import { useSelector } from 'react-redux';
// import { Color } from '../../../../themes';
import {getData} from './Gdata'
const DailyRoutinesLanding = () => {
 // const navigation = useNavigation();
 const Color=useSelector(state=>state.theme).Colors;
 console.log(Color.color1);
 const [option,setOption] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const[sections,setSections] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [data,setData] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [temp,setTemp] = useState([]);
  const [file,setFile] = useState([]);
  const [video,setVideo] = useState([]);
  const [image,setImage] = useState([]);

  /*
    the toggleDropdown function is to toggle the option model visibility
  */
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

/*
     useEfffect {
         In this useEffect function openImagepicker() is called it fetches data from the backend(aws) initially
     }
*/
  useEffect(()=>{
   
     async function hi(){
    //  const h = await getData();
     setData(await getData());
      //await openImagePicker();
       setIsLoading(false)
   }
   hi();
  },[option]);

  const nav = useNavigation()

  // THIS openImagePicker function fetches the data from aws it is called in useeffect
  const openImagePicker =async () => {
  
    const apiURL = 'https://app.evaluatehealth.world/tracker/Tracker/globalDocuments'
    const authToken= 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjk2NTExMDc2LCJqdGkiOiI4ZGVjNGExMi1hNTcxLTRjNDEtOTRlZC05NzI3MDg1M2YyYjAiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMDkxMDAwMDAwMDA0NiIsIm5iZiI6MTY5NjUxMTA3Nn0.MYdqBgz6_-Ru8b1Mu1B8286aknzkTZ9DRyq7cVBcchM'   
      console.log(`Bearer ${authToken}`);
    const response = await axios.post(apiURL,{} ,{
      headers: {
        Authorization: `Bearer ${authToken}`, // Set the content type for the FormData
      },
    });
    console.log(response.data)
      setData( response.data); 
       setTemp(response.data);
  };



/*
  the function RightElement() returns the right component of header 
  it consist of option and add document icons
*/
  function RightElement(){
    return(
<View style={{flexDirection:"row"}}>

<Pressable style={{ backgroundColor: Color.midBlue,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    marginRight: 10,
  }}
  onPress={toggleDropdown}>
  <Text style={{ color: Color.WHITE, fontSize: 15, fontWeight: '500', letterSpacing: 0.7}}>
    Filter - {option}
  </Text> 
</Pressable>

<Pressable style={{ backgroundColor: Color.midBlue, paddingHorizontal: 14, paddingVertical: 5, borderRadius: 10, flexDirection: 'row', marginRight: 10,}}
       onPress={()=>{ nav.navigate('Recording',{isProfile:false})}}
>
   <MaterialIcon name="add" size={20} color="white"/>
</Pressable>

</View>
    )
  }

// this handleFilterOptionSelect() function is to set the selected option and its calls toggledropdown() function
  const handleFilterOptionSelect = (option) => {
    setOption(option)
    toggleDropdown();
  };

  // this OptionHandling() function returns the component of selecting options
  function OptionHandling() {
    const opt = ['All', 'image', 'file', 'video'];
    return (
      <Modal transparent={true} animationType='fade' visible={isDropdownVisible} onRequestClose={toggleDropdown}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, position: 'absolute', top: 50, right: 50,width:150 }}>
            {opt.map((option, index) => (
              <TouchableOpacity key={index} style={{ margin: 5, width: '100%' }} onPress={() =>{ 
                handleFilterOptionSelect(option)
                }}>
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    );
  }

  // this function returns the loading component 
  function loading(){
    return(
      <View style={{alignItems:'center',justifyContent:"center",alignContent:'center',flex:1}}>
      <ActivityIndicator size={60} color="#0000ff" />
      <Text style={{color:'white',fontSize:32,color:'black',alignItems:"center"}}>Loading...</Text>
    </View>
    )
  }


  const renderItem = ({ item }) => {
    const parsedDate = new Date(item.date);
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months =      [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayOfWeek = daysOfWeek[parsedDate.getUTCDay()];
    const month = months[parsedDate.getUTCMonth()];
    const date = parsedDate.getUTCDate();
    const formattedDate = `${dayOfWeek} ${date} , ${month} `;
    var ITEM = null;
    if (option === 'All') {
     ITEM = item.content;
   } else {
     ITEM = item.content.filter(item => item.file_type === option);
   }
    return (
    <View style={{backgroundColor:'#0f0f0f'}}>
      <Gridview IMAGE_DATA={ITEM}type={option} date = {formattedDate}/>
    </View>
  );
  }


  return (
    
    <View style={{ flex: 1,marginBottom:50,backgroundColor:'black' }}>
     {OptionHandling()}
      <AppHeader
      title={''}
      user={selectedId}
      onPressIcon={(id) => { setSelectedId(id) }}
       rightElement={RightElement()}
      />

  {isLoading ? loading()
   : (
    <FlatList
    data={data}
    keyExtractor={(item, index) => index.toString()}
    renderItem={renderItem}
    ListFooterComponent={<View style={{ height:10 }} />}
  />
  )}
</View>



  );
};

export default DailyRoutinesLanding;

const styles = StyleSheet.create({});


