import React, { useState, useEffect, useRef } from 'react';
import {View,Text,ScrollView,Image,TouchableOpacity,Modal,StyleSheet,Animated,Easing,Platform,} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';

const ContactsComponent = ({ numbers }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>You Are Sharing To</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.numberContainer}>
          {numbers.map((i, index) => (
            <Text key={index} style={styles.numberText}>
              {i}
            </Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const LocationComponent = ({ location }) => {
  return (
    <View style={{ marginTop: 20, alignItems: 'center', marginBottom: 10 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Location</Text>
      </View>
      <View style={{ width: '100%',height: 60, borderRadius: 5,flexDirection: 'row',}}>
        <View style={{ flexWrap: 'wrap', flexDirection: 'column', width: '15%', justifyContent: 'center', alignItems: 'center', paddingLeft: 7,}}>
          <TouchableOpacity>
            <Ionic name='location' size={35} color={'orange'} />
          </TouchableOpacity>
        </View>
        <View style={{ height: 65, display: 'flex', width: '85%' }}>
          <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
            <Text style={{  flexWrap: 'wrap', color: 'black',fontSize: 18, fontWeight: '900',}}>
              {location}
            </Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const ImagesComponent = ({ image }) => {
  const [press, setPress] = useState(true);
  const [images, setImages] = useState(image);
  const [sets, setSets] = useState(true);

  useEffect(() => {
    setImages(image);
    setPress(!press);
  }, [sets, image]);

  const handleImageLongPress = (imgIndex) => {
    setPress(!press);
    setTimeout(() => {
      image.splice(imgIndex, 1);
      setSets(!sets);
      // console.log(images)
    }, 1000);
  };
  if (!image || image.length === 0) {
    return null;
  }
  return (
    <View style={styles.imageP}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Selected Photos</Text>
      </View>
      <ScrollView horizontal>
        <View style={styles.imageContainer}>
          {images.map((imageData, imgIndex) => (
            <TouchableOpacity key={imgIndex} onLongPress={() => handleImageLongPress(imgIndex)}  style={press ? styles.selectedImage : null} >
              <Image source={{ uri: imageData.uri }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const Postpreview = ({images,location, numbers, post, descriptionText}) => {
  
  return (
    
    <View style={styles.parentC}>
      <ScrollView showsVerticalScrollIndicator>
       {location && <LocationComponent location={location} />}
       {images[0] && <ImagesComponent image={images} />}
       {numbers[0] && <ContactsComponent numbers={numbers} />}
       </ScrollView>
    </View>
  
  );
};

export default Postpreview;

const styles = StyleSheet.create({
  parentC:{
    height:'62%',
    borderRadius: 10,
    alignItems: 'center',
    margin: 5,
    position: 'absolute',
    top: 215,
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  imageContainer: {
    width: '100%',
    borderColor: '#f9f9f9',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 50,
    height: 100,
    marginTop: 15,
  },
  selectedImage: {
    backgroundColor: 'red',
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  container: {
    height: 172,
    width: '100%',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 0,
    top: 10,
  },
  header: {
    height: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  headerText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  numberContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  numberText: {
    color: '#666',
    marginLeft: 10,
    fontSize: 16,
    backgroundColor: '#F0F0F0',
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  imageP:{
    height: 160,
        marginBottom: 0,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 20,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
  }
});

