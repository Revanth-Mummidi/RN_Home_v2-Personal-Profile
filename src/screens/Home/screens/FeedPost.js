import {Pressable, Dimensions, StyleSheet, Text, View ,PermissionsAndroid,ScrollView, TextInput, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import Contacts from 'react-native-contacts';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {
  AppHeader,
  HandleBottomSheet,
  MultiSelectInput,
  ScrollPicker,
  TextInputFields,
} from '../../_components';
import Ionic from 'react-native-vector-icons/Ionicons'
import {Color} from '../../../themes';
import {Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {launchCamera,launchImageLibrary} from 'react-native-image-picker'
import CustomCheckBox from './CustomCheckBox';
import Postpreview from './Postpreview';
import { TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import TagHighlightTextInput from './TagHighlightTextInput';
import TagInput from './TagInput';
import {Axios} from 'axios';
import { SectionList } from 'react-native';
import  {getAllContacts,requestLocationPermission,requestCameraPermission,requestExternalWritePermission,selectFile}  from '../utils/Permissions';
const HEIGHT = Dimensions.get('window').height;


export default function FeedPost() {

  const min = (a,b) =>{
       if( a > b ) return b;
       else return a
  }
  const navigation = useNavigation();
  refAttachments = React.useRef(null);
  const [myContacts,setMyContacts] = useState([])
  const [desc,setDesc] = useState('');
  const [heights,setHeights] = useState(60);
  const [num,setNum] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [publicPrivate, setPublicPrivate] = useState('Public');
  const [addLocation, setAddLocation] = useState(false);
  const [location, setLocation] = useState('');
  const [addContact, setAddContact] = useState(false);
  const [addSensitive, setAddSensitive] = useState(false);
  const [filepath,setFilepath] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [show,setShow] = useState(false);
  const [exts,setExts] = useState('');
  const [contacts, setContacts] = useState([]);
  const [search,setSearch] = useState(" ");
  const [cords,setCords] = useState({coords:{latitude:0,longitude:0}})
  const [post,setPost] = useState(false)
  const [visibleContacts,setVisibleContacts] = useState(false)
  const [visibleLocation,setVisibleLocation] = useState(false)
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const availableMentions = ['user1', 'user2', 'user3', 'user4', 'user5'];
  const availableTags = ['#react', '#javascript', '#redux', '#react-native', '#web-development', '#mobile-apps', '#programming',
   '#Apple', '#Banana', '#Cat', '#Dog', '#Elephant', '#Family', '#Good', '#Happy', '#Important', '#Job', '#Kind', '#Love',
    '#Mother', '#Nice', '#Opportunity', '#People', '#Question', '#Really', '#Simple', '#Time', '#Understand', '#Very', 
    '#Wonderful', '#Xylophone', '#Yellow', '#Zeppelin', '#Air', '#Beautiful', '#Coffee', '#Delicious', '#Earth', '#Flower',
     '#Garden', '#Hope', '#Interesting', '#Joy', '#Knowledge', '#Laughter', '#Music', '#Nature', '#Orange', '#Peace', '#Quiet',
      '#Rainbow', '#Sunshine', '#Tree', '#Unity', '#Vacation', '#Water', '#X-ray', '#Youth', '#Zest', '#Book', '#Chocolate', 
      '#Dream', '#Friendship', '#Grace', '#Health', '#Inspiration', '#Joyful', '#Kindness', '#Laughter', '#Memory', '#Night',
       '#Open', '#Peaceful', '#Quaint', '#Relax', '#Smile', '#Trust', '#Unique', '#Vision', '#Warmth', '#eXcellence',
        '#Youthful', '#Zenith', '#Adventure', '#Balance', '#Cherish', '#Dance', '#Energetic', '#Freedom', '#Growth', 
        '#Happiness', '#Innovate', '#Journey', '#Kindred', '#Liberate', '#Marvel', '#Nurture', '#Optimism', '#Passion',
         '#Quest', '#Radiant', '#Serenity', '#Triumph', '#Uplift', '#Vibrant', '#Wisdom', '#Zeal'];

  useEffect(()=>{
      if(cords){
        if(cords.coords.latitude!=0 && (cords.coords.longitude!=0)){
        GetAreaName();
      }
    }
  },[cords])

  const  openCameras = ()=>{
    navigation.navigate('Recording');
   //navigation.navigate('Contacts');
  }
  const  openCamera = async()=>{

    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();

    if (isCameraPermitted ) {
      let options = {
        mediaType:'photo',
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
        photoQuality: 'high',
        saveToPhotos: true,
      };
      launchCamera(options, (response) => {
        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
        }else{
           setFilepath({ resourcePath: response.assets[0].uri})
           setSelectedImages(response.assets)
        }
      });
    }
  }



  const handleInputChange = (text) => {
    const tagQueryRegex = /[#@](\w+)/g;
    const matches = text.match(tagQueryRegex);
  
    if (matches && matches.length > 0) {
      const query = matches[matches.length - 1];
      const tagType = query[0];
      const tagQuery = query.substring(1).toLowerCase();
  
      if (tagType === '#') {
        const filteredTags = availableTags.filter(tag => tag.includes(tagQuery));
        if (filteredTags[0] != null && filteredTags[0] !== '') {
          setSuggestedTags(filteredTags);
          setShowSuggestions(true);
        }
      } else if (tagType === '@') {
        const filteredMentions = availableMentions.filter(mention => mention.includes(tagQuery));
        if (filteredMentions[0] != null) {
          setSuggestedTags(filteredMentions);
          setShowSuggestions(true);
        }
      }
    } else {
      setSuggestedTags([]);
      setShowSuggestions(false);
    }

    setDesc(text);
  };
  

  const handleTagSelection = (tag) => {
    const tagQueryRegex = /[#@](\w+)/g;
    const matches = desc.match(tagQueryRegex);
  
    if (matches && matches.length > 0) {
      const query = matches[matches.length - 1];
      const tagType = query[0];
      const lastIndex = desc.lastIndexOf(matches[matches.length - 1]);
      
      let updatedText;
      
      if (tagType === '@') {
        updatedText = desc.substring(0, lastIndex) + tag + ' ';
      } else {
        updatedText = desc.substring(0, lastIndex)  + tag + ' ';
      }
  
      setDesc(updatedText);
    } else {
      // Handle if there are no matches
      setDesc(tag + ' ');
    }
  
    setShowSuggestions(false);
    setSuggestedTags([]);
  };
  const initialBottomSheet = () => {
    refAttachments.current.open();
  };
  const getLocation = async () => {
    const result =  requestLocationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setCords(position);
            
          },
          error => {
            console.log(error.code, error.message);
            setCords(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
       
      }
    })
   
  };

  const GetAreaName = (lat,lon) => {
    const baseUrl = 'https://nominatim.openstreetmap.org/reverse?format=json'; 
     let latitude;
     let longitude;
    if(lat || lon){
      latitude = lat
      longitude = lon
    }else{
     latitude = cords.coords.latitude
     longitude = cords.coords.longitude
    }
    
    const apiUrl = `${baseUrl}&lat=${latitude}&lon=${longitude}`;
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.display_name) {
          const address = data.display_name;
          console.log('Address:', address);
          setLocation(address)
        } else {
          console.log('Location not found');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      
}


const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
    GetAreaName(latitude,longitude);
  };

  const addinglocation = () => {
    return (
      <Modal transparent={false} visible={visibleLocation} animationType="fade">
      <View style={styless.container}>
        <Pressable
        onPress={() => setVisibleLocation(false)}
        style={styless.closeButton}
      >
        <IconIonicons name="arrow-back" size={30} color="black" />
      </Pressable>
        <View style={styless.uploadTextfield}>
             
          <View style={styless.textfieldContainer}>
            <TextInputFields
              label={'Location'}
              value={location}
              onChange={text => setLocation(text)}
              multiline={true}
              editable
              style={styless.input}
            />
          </View>
          <MapView
          style={{ width: '100%', height:500,marginBottom:20}}
          region={{
            latitude: cords.coords.latitude,
            longitude: cords.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          onPress={handleMapPress}
        >
          <Marker  coordinate={cords.coords} />
          
          {selectedLocation && (
            <Marker
              coordinate={selectedLocation}
              title="Selected Location"
              description={`Lat: ${selectedLocation.latitude}, Long: ${selectedLocation.longitude}`}
            />
          )}
        </MapView>
          <Pressable
            onPress={() => {
              getLocation();
              console.log(location);
            }}
            style={styless.uploadButton}
          >
            <Image
              source={require('../assets/icons/location.png')}
              style={styless.locationIcon}
            />
            <Text style={{ color: 'white' }}>Get Current Location</Text>
          </Pressable>
        </View>
      </View>
    </Modal>


    );
  };

  const [selectedItems, setSelectedItems] = useState([]);

  const toggleItemSelection = (item) => {
    if (selectedItems.includes(item)) {
      setNum(num.filter((contact) => contact !== item.displayName));
      setSelectedItems(selectedItems.filter((contact) => contact !== item));
    } else {
     setNum((prevNum) => [...prevNum, item.displayName]);
     setSelectedItems([...selectedItems, item]);
    }
  };

  const filteredContacts = contacts
    .map(section => ({
      ...section,
      data: section.data.filter(contact =>
        contact.displayName.toLowerCase().includes(search.toLowerCase())
      ),
    }))
     .filter(section => section.data.length > 0); 


  const renderContact = ({ item }) => (
    
    <View style={stylesss.contactItem}>
              <CustomCheckBox
                label={item.displayName}
                selected={selectedItems.includes(item)}
                onToggle={()=>{toggleItemSelection(item)}}
              />
    </View>
  );

  const renderSectionHeader = ({ section }) => (
    <View style={stylesss.sectionHeader}>
      <Text style={stylesss.sectionHeaderText}>{section.title}</Text>
    </View>
  );
  
  const addContacts = () => {
    return (
      <Modal transparent={false} visible={visibleContacts} animationType='fade'>
  <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
    <View style={{ backgroundColor: 'white', flex: 1, borderRadius: 10, padding: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <TouchableOpacity onPress={()=>{setVisibleContacts(false)}}>
        <IconIonicons
          name="arrow-back"
          size={30}
          color='black'
        />
        </TouchableOpacity>
        <Text style={{ fontSize: 24, marginLeft: 10 }}>Contacts</Text>
      </View>

      <TouchableOpacity onPress={() => {
        getAllContacts();
        setNum([]);
        setSelectedItems([]);
      }}>
        <View style={{ width: '100%', alignItems: 'center', marginBottom: 15 }}>
          <Text style={{ fontSize: 18, color: 'blue' }}>Reset Selected Contacts</Text>
        </View>
      </TouchableOpacity>

      <TextInput
        placeholder='Search For Contact'
        onChangeText={(newText) => { setSearch(newText)}}
        style={{  borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10, marginBottom: 10, fontSize: 16,color:"black"}}
        value={search}
      />
      <SectionList
      sections={filteredContacts}
      renderItem={renderContact}
      renderSectionHeader={renderSectionHeader}
      keyExtractor={(item, index) => index.toString()}
    />
    </View>
  </View>
</Modal>

    );
  };
  
  async function someFunction() {
    try {
      const data = await getAllContacts(); 
      console.log(data)
      setContacts(data); 
    } catch (error) {
      console.error(error);
    }
  }
  async function handleit() {
    let data = await selectFile();
    setSelectedImages(data);
  };
  
  const userAttachements = () => {
    return (
     <View style={{ flexDirection: 'row',flexWrap: 'wrap',justifyContent: 'space-between',margin:80,top:-30}}>
         
  <View style={{ margin: 10,alignItems: 'center'}}>
    <Pressable
      style={{width: 100, height: 100, borderRadius: 40, backgroundColor: 'lightblue', alignItems: 'center', justifyContent: 'center', ...Platform.select({
        ios: {
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 4,
        },
        android: {
          elevation: 5,
        },
      }),}}
      onPress={() => {
        handleit();
        setSelectedImages([]);
      }}>
      <Ionic
                    name="images-outline"
                    size={25}
                    color= {Color.blue}
                />
      <Text style={{textAlign: 'center'}}>Upload Media</Text>
    </Pressable>
  </View>
  
  <View style={styles.circleWrapper}>
    <Pressable
      style={styles.circleButton}
      onPress={() => {
        setAddLocation(!addLocation);
        setVisibleLocation(true);
      }}>
        
        <Ionic
                    name="location-outline"
                    size={25}
                    color= {Color.blue}
                />
      <Text style={styles.label}>Add Location</Text>
    </Pressable>
    {addLocation ? <View>{addinglocation()}</View> : null}
  </View>

  <View style={styles.circleWrapper}>
    <Pressable
      style={styles.circleButton}
      onPress={() => {setPublicPrivate(publicPrivate === 'Public' ? 'Private' : 'Public' )
        console.log(selectedImages)
      }}>
        <Ionic
                    name={publicPrivate==='Public' ? 'eye-outline' : 'eye-off-outline'}
                    size={25}
                    color= {Color.blue}
                />
      <Text style={styles.label}>Post Is {publicPrivate}</Text>
    </Pressable>
  </View>

  <View style={styles.circleWrapper}>
    <Pressable
      style={styles.circleButton}
      onPress={() => {
        setAddContact(!addContact);
        setVisibleContacts(true);
        if(myContacts[0] === undefined ){
          someFunction()
        }
      }}>
        <Ionic
                    name="call-outline"
                    size={25}
                    color= {Color.blue}
                    style={{top:6}}
                />
     <Text style={{ ...styles.label, top: 6 }}>Share with Contacts</Text>
    </Pressable>
    {addContact ? <View style={{height:'100%',width:'100%',alignItems:'center'}}>{addContacts()}</View> : null}
  </View>

 
</View>
 );};


  return (
    <View style={{}}>
      <AppHeader
        title={''}
        user={selectedId}
        isProfessional={true}
        onPressIcon={(id) => {
          setSelectedId(id);
        }}
        rightElement={

          <Pressable
            style={{
              backgroundColor: Color.midBlue,
              paddingHorizontal: 14,
              paddingVertical: 5,
              borderRadius: 10,
              flexDirection: 'row',
              marginRight: 10,
            }}
            onPress={()=>{
              setPost(!post)
              console.log(post)
            }}
            >
            <Text
              style={{
                color: Color.WHITE,
                fontSize: 15,
                fontWeight: '500',
                letterSpacing: 0.7,
              }}>
              Post
            </Text>
            <Image
              source={require('../assets/icons/send.png')}
              style={{width: 20, height: 20, marginLeft: 10}}
            />
          </Pressable>
        }
      />
      <HandleBottomSheet
        containerStyle={{backgroundColor: '#E0E5E6'}}
        bottomSheetRef={refAttachments}
        content={userAttachements()}
        height={400}
        draggableIcon={{backgroundColor: 'grey', width: 100}}
      />
      
      <View
        style={{
          height: HEIGHT - 140,
          backgroundColor: '#F0f0f0',
        }}>
         
          <View style={{height:'92%',borderRadius:5,paddingBottom:3}}>
          
         <View style={{margin:3,borderRadius:5}}>
            <TextInput  placeholder="What Do You Want To ? Talk About "  
             editable multiline value={desc}
             numberOfLines={10}
             onContentSizeChange={(event) =>{
              setHeights(event.nativeEvent.contentSize.height)
             }
            }
            onChangeText={(text) => {
              setDesc(text)
              handleInputChange(text)
            }}
             style={{ height:min(heights,150), textAlignVertical: 'top',fontSize:15,fontWeight:'600',color:'#001000'}}/>
          </View>
          
          {showSuggestions && (
            <View style={{ flex: 1,
              padding: 16,zIndex:1,}}>
        <ScrollView horizontal style={styless.suggestionContainer}>
          {suggestedTags.map((tag, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleTagSelection(tag)}
            >
              <Text style={styless.suggestedTag}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        </View>
      )}
         { ( selectedImages[0]!=null || location || exts   ) ? (

          <Postpreview images={selectedImages} descriptionText={desc} post ={post} location={location}  numbers = {num.filter((item,index) => num.indexOf(item) === index) }/>
          )
          : null
              
          }
          
          </View>


        <View
          style={{
            position:'absolute',
            width: '100%',
            alignSelf: 'baseline',
            paddingHorizontal: 10,
            bottom:-3
          }}> 
          <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
          {/* <Pressable
              style={{
                backgroundColor: Color.aquaBlue,
                borderRadius: 50,
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }} onPress={openCamera}  >
              <Image
                source={require('../assets/icons/camera.png')}
                style={{width: 26, height: 26, tintColor: Color.blue}}
              />
            </Pressable> */}
            <Pressable
              style={{
                backgroundColor: Color.aquaBlue,
                borderRadius: 50,
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={()=>{
                navigation.navigate("Recording",{mode:'isProfile'})
              }}
              >
              <Image
                source={require('../assets/icons/camera.png')}
                style={{width: 26, height: 26, tintColor: Color.blue}}
              />
            </Pressable>
            <Pressable
              style={{
                backgroundColor: Color.aquaBlue,
                borderRadius: 50,
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }} onPress={getLocation}  >
               <Ionic
                    name="location-outline"
                    size={25}
                    color= {Color.blue}
                />
            </Pressable>
            <Pressable
              style={{
                backgroundColor: Color.aquaBlue,
                borderRadius: 50,
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}  onPress={() => {
                initialBottomSheet();
              }}  >
               <Ionic
                    name="ellipsis-horizontal-outline"
                    size={25}
                    color= {Color.blue}
                />
            </Pressable>
            </View>
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: Color.WHITE,
    marginTop: 10,
  },
  label: {fontWeight: '600', color: Color.blue},
  uploadTextfield: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Color.aquaBlue,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
  },
  textfieldContainer: {width: '75%',margin:5},
  uploadcontainer: {
    margin:5,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.lowBlue,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  button: {
    padding: 10,
    width: 70,
    backgroundColor: Color.aquaBlue,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 10,
    margin: 5
 },
 infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5
 },
 primaryText: {
    fontSize: 18
 },
 iconContent: {
    flex: 1,
    paddingVertical: 5,
    fontSize: 24,
    color: 'white',
    marginHorizontal: 10
 },
 icon:{
    borderRadius: 25,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    padding: 1,
    backgroundColor: 'green'
 },
 circleWrapper: {
  margin: 10,
  alignItems: 'center',
},
shineOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '40%',
  backgroundColor: 'rgba(255, 255, 255, 0.3)', 
  transform: [{ rotate: '45deg' }], 
},
circleButton: {
  width: 100,
  height: 100,
  overflow: 'hidden',
  borderRadius: 40,
  backgroundColor: 'lightblue',
  alignItems: 'center',
  justifyContent: 'center',
  ...Platform.select({
    ios: {
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 4,
    },
    android: {
      elevation: 10,
    },
  }),
},
label: {
  textAlign: 'center',
},
pressedCircleButton: {
  backgroundColor: 'darkblue', // Change the background color when pressed
  transform: [{ scale: 0.95 }], // Apply a scaling effect when pressed
},
});

const styless = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top:1,
    left: 1,
    zIndex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  
  },
  uploadTextfield: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '98%',
    height:750,
    top:20
  },
  textfieldContainer: {
    marginBottom: 20,
    width:'100%'
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    fontSize: 40,
    padding: 15,
    height:400,
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationIcon: {
    width: 26,
    height: 26,
    tintColor: 'white',
  },
  suggestionContainer: {
    maxHeight: 37,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  suggestedTag: {
    padding: 8,
    borderRightWidth: 1,
    borderBottomColor: 'gray',
    fontWeight:'800'
  },
});

const stylesss = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    top:20,
    height:100
  },
  contactItem: {
    padding: 16,
   backgroundColor:"black"
  },
  sectionHeader: {
    backgroundColor: '#e0e0e0',
    padding: 8,
  },
  sectionHeaderText: {
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#007AFF',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: 'white',
  },
});
