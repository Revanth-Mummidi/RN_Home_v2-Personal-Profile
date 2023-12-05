import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  ScrollView,
  TextInput,
  Modal,
  Pressable,
  TouchableOpacity,
  SectionList,
  VirtualizedList,
} from 'react-native';
import Contacts from 'react-native-contacts';
import React, {useEffect, useState} from 'react';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import Ionic from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {getColor} from '../../../../themes/GetColor';
import { Toast } from '../../../_components';
import { errorToast } from '../../../_components/toast/toast';
const ContactsList = ({mod, setMod,setPhoneNumber,setUserName=()=>{}}) => {
  const Color = getColor(useSelector(state => state.theme.theme));
  const [selectedItems, setSelectedItems] = useState(null);
  const [num, setNum] = useState([]);
  const [addContact, setAddContact] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
 const [selectedObject,setSelectedObject]=useState(null);
 const[isSelected,setIsSelected]=useState(false);
  const [visibleContacts, setVisibleContacts] = useState(true);

  const toggleItemSelection = item => {
    if (selectedItems.includes(item)) {
      setNum(num.filter(contact => contact !== item.displayName));
      setSelectedItems(selectedItems.filter(contact => contact !== item));
    } else {
      setNum(prevNum => [...prevNum, item.displayName]);
      setSelectedItems([...selectedItems, item]);
    }
  };
  async function someFunction() {
    try {
      const data = await getAllContacts();
      // console.log(data);
      setContacts(data);
    } catch (error) {
      console.error(error);
    }
  }
  const filteredContacts = contacts
    .map(section => ({
      ...section,
      data: section.data.filter(contact =>
        contact.displayName.toLowerCase().includes(search.toLowerCase()),
      ),
    }))
    .filter(section => section.data.length > 0);

  const renderContact = ({item,index}) => {
    // console.log("ITEMS++",item);
    return(
    // <View style={stylesss.contactItem}>
    //   <CustomCheckBox
    //     label={item.displayName}
    //     selected={selectedItems.includes(item)}
    //     onToggle={() => {
    //       toggleItemSelection(item);
    //     }}
    //   />
    // </View>

      <View style={{marginTop:index==0?5:0,marginBottom:5,marginHorizontal:3}}>
        <TouchableOpacity onPress={()=>{
          console.log("ERROR",item);
          setSelectedObject(item);         
          //  toggleItemSelection(item);
          //Comment this
          //  if(!isSelected){
          //  setSelectedObject(item);
          // //  setSearch(item.displayName);
          //  setIsSelected(true);
          //  }
          //  else{
          //    getAllContacts();
          //     setIsSelected(false);
          //     setSelectedObject({});
          //     setSelectedItems([]);
          //     setNum([]);
          //   //  setSelectedObject(null);
          //   }
          // comment
          setIsSelected(false);
          setSearch('');
          setSelectedItems({});
          // getAllContacts();
          setNum([]);
          if(item.phoneNumbers[0])
          {setPhoneNumber(item.phoneNumbers[0].number);}
          else
          {
            errorToast("invalid number");
          }
          setUserName(item.displayName);
          setMod(false);
        }}>
        <View style={[{borderRadius:13,padding:20},isSelected && selectedObject==item?{backgroundColor:Color.badge_bg}:{backgroundColor:Color.textfieldContainer}]}>
        <Text>{item.displayName}</Text>
        </View>
        </TouchableOpacity>
      </View>
  )};

  const CustomCheckBox = ({label, selected, onToggle}) => {
    // useEffect(()=>{
    //   console.log("sele:",selected)
    // },[])
    const handleToggle = () => {
      if(selected)
      {
        setSearch(label);
      }
      onToggle(!selected);
    };

    return (
      <TouchableOpacity onPress={handleToggle}>
        <View style={[{...styles.container},selected?{backgroundColor:'blue'}:null]}>
          <Text>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = ({section}) => (
    <View style={stylesss.sectionHeader}>
      <Text style={stylesss.sectionHeaderText}>{section.title}</Text>
    </View>
  );

  async function getAllContacts() {
    try {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      );
      if (permission === 'granted') {
        const allContacts = await Contacts.getAll();
        const contactDict = {};
        const contactSections = [];

        allContacts.forEach(contact => {
          if (contact.displayName != null) {
            const firstLetter = contact.displayName.charAt(0).toUpperCase();

            if (!contactDict[firstLetter]) {
              contactDict[firstLetter] = [];
            }

            contactDict[firstLetter].push(contact);
          }
        });

        Object.keys(contactDict).forEach(letter => {
          contactSections.push({
            title: letter,
            data: contactDict[letter],
          });
        });

        contactSections.sort((a, b) => a.title.localeCompare(b.title));

        return contactSections;
      } else {
        // console.log('PERMISSIONOT GRANEFFENSOJFNKJFN');
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  useEffect(() => {
    const fun = async () => {
      await someFunction();
    };
    fun();
    // setAddContact(!addContact);
  }, []);

  return (
    <Modal
      transparent={true}
      visible={mod}
      
      animationType="slide"
      onRequestClose={()=>{
        setMod(false);
      }}
      onTouchCancel={()=>{setMod(false)}}
      style={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
      <View style={{flex: 1, backgroundColor: 'rgba(35, 29, 29, 1)',borderTopLeftRadius: 20, borderTopRightRadius: 20,marginTop:'50%'}}>
        <View
          style={{
            // backgroundColor: Color.textfieldContainer,
            flex: 1, 
            paddingTop: 10,
          }}>
          <View
            style={{
              // flex:1,
              backgroundColor:'rgba(35, 29, 29, 1)',
              flexDirection: 'row',
              // padding:10 ,
            }}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setVisibleContacts(false);
                  setMod(false);
                }}>
                <IconIonicons
                  name="arrow-back"
                  size={30}
                  color="white"
                  style={{margin: 10}}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex:1,
                flexDirection: 'row',
                alignItems:'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Text style={{fontSize: 24, textAlign: 'center',color:'white'}}>Contacts</Text>
            </View>
            <Pressable onPress={()=>{
              // console.log("Final",selectedObject.displayName,selectedObject.phoneNumbers[0]);
              // setIsSelected(false);
              // setSearch('');
              // setSelectedItems({});
              // getAllContacts();
              // setNum([]);
              // setPhoneNumber(selectedObject.phoneNumbers[0].number);
              // setUserName(selectedObject.displayName);
              // setMod(false);
              setPhoneNumber('');
              setUserName('');
              setMod(false);
            }}>

            <View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'center',backgroundColor:Color.badge_bg,
            borderRadius:13,
            padding:10,margin:10,opacity:!isSelected?1:0}}>
          
              <Text>Create</Text>
   
            </View>
              </Pressable>
          </View>

          {/* <TouchableOpacity
            onPress={() => {
              getAllContacts();
              setNum([]);
              // console.log(selectedItems[0].phoneNumbers[0].number);
              setSelectedItems([]);
            }}>
            <View
              style={{width: '100%', alignItems: 'center', marginBottom: 15}}>
              <Text style={{fontSize: 18, color: 'blue'}}>
                Reset Selected Contacts
              </Text>
            </View>
          </TouchableOpacity> */}
          <View style={{flexDirection:'row',justifyContent:'flex-start',
              borderWidth: 1,
              borderColor: Color.textfield_fontWrite,
              borderRadius: 5,
              marginHorizontal:8,
              marginVertical:10,
              padding: 5,}}>
          <TextInput
            placeholder="Search For Contact"
            onChangeText={newText => {
              setSearch(newText);
            }}
            style={{
              fontSize: 16,
              color:Color.textfield_fontWrite,
              justifyContent:'flex-start'
            }}
            value={search}
          />
          {(isSelected && search!='') ?(<View style={{flex:1,justifyContent:'flex-end',flexDirection:'row',alignItems:'center'}}>
            <Pressable onPress={()=>{
              setIsSelected(false);
              setSearch('');
              setSelectedItems({});
              getAllContacts();
              setNum([]);
            
            }}>

          <IconIonicons name='close' size={30} style={{height:30,width:30,color:'red'}}/>
            </Pressable>
          </View>):null}
          </View>
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
    top: 20,
    height: 100,
  },
  contactItem: {
    padding: 16,
    backgroundColor: 'rgba(1,1,1,0.9)',
  },
  sectionHeader: {
    backgroundColor: '#a60909',
    padding: 8,
  },
  sectionHeaderText: {
    fontWeight: 'bold',
    color: 'white',
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

const styless = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 1,
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
    height: 750,
    top: 20,
  },
  textfieldContainer: {
    marginBottom: 20,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    fontSize: 40,
    padding: 15,
    height: 400,
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
    fontWeight: '800',
  },
});

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: 'white',
    marginTop: 10,
  },
  label: {fontWeight: '600', color: 'blue'},
  uploadTextfield: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'blue',
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
  },
  textfieldContainer: {width: '75%', margin: 5},
  uploadcontainer: {
    margin: 5,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  button: {
    padding: 10,
    width: 70,
    backgroundColor: 'blue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 10,
    margin: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  primaryText: {
    fontSize: 18,
    color: 'red',
  },
  iconContent: {
    flex: 1,
    paddingVertical: 5,
    fontSize: 24,
    color: 'white',
    marginHorizontal: 10,
  },
  icon: {
    borderRadius: 25,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    padding: 1,
    backgroundColor: 'green',
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
    transform: [{rotate: '45deg'}],
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
        shadowOffset: {width: 0, height: 2},
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
    transform: [{scale: 0.95}], // Apply a scaling effect when pressed
  },
});

export default ContactsList;
