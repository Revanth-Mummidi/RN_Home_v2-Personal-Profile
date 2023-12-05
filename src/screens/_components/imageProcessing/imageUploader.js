/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {Icon} from 'react-native-elements';
import * as ImagePicker from 'react-native-image-picker';
import Dragger from './dragger';
import ButtonHeader from '../headers/ButtonHeader';
import {Color} from '../../../themes';
const HEIGHT = Dimensions.get('window').height;
const ImageUploader = () => {
  const receivingItemList = [
    {
      id: 13,
      uri: '',
      label: 'front-view',
    },
    {
      id: 14,
      uri: '',
      label: 'side-view',
    },
    {
      id: 15,
      uri: '',
      label: 'top-view',
    },
    {
      id: 16,
      uri: '',
      label: 'bottom-view',
    },
  ];
  const containerWidth = Dimensions.get('window').width - 20; // Use window width as the width of the container
  const maxImagesPerRow = 3; // Maximum number of images in a row
  const marginSize = 10; // Margin size between images and container
  const totalMarginSize = (maxImagesPerRow - 1) * marginSize; // Total margin size in a row
  const imageWidth = (containerWidth - totalMarginSize) / maxImagesPerRow; // Calculate image width based on container width and margin size
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingLeft: marginSize,
      paddingRight: marginSize,
    },
    image: {
      width: imageWidth,
      height: 1.4 * imageWidth,
      marginBottom: marginSize,
      marginRight: marginSize,
    },
    imageHolder: {
      width: 120,
      height: 120,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'black',
      position: 'absolute',
      top: 50,
      left: '50%',
      marginLeft: -60,
    },
    draggedImage: {
      position: 'absolute',
      width: 100,
      height: 100,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 10,
      zIndex: 999,
    },
  });
  const handleSave = () => {
    const newImageItem = {
      id: images.length,
      uri: image,
    };
    setImages([...images, newImageItem]);
    setImage(null);
  };
  const handleImageUpload = () => {
    ImagePicker.launchImageLibrary({}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImage(response.assets[0].uri);
      }
    });
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
        return true;
      }
      console.log('Camera permission denied');
      return false;
    } catch (error) {
      console.warn(error);
    }
  };
  const renderImage = ({item}) => (
    <TouchableOpacity>
      <Image source={{uri: item}} style={styles.image} />
    </TouchableOpacity>
  );
  const handleCamera = async () => {
    const hasCameraPermission = await requestCameraPermission();
    if (!hasCameraPermission) {
      console.log('Camera permission not granted');
      return;
    }
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 500,
        maxWidth: 500,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled the camera');
        } else if (response.error) {
          console.log('Error:', response.error);
        } else {
          console.log('Image URI:', response.assets[0].uri);
          setImage(response.assets[0].uri);
        }
      },
    );
  };
  const handleDragger = () => {
    return (
      <Dragger
        draggableItemList={images}
        firstReceivingItemList={receivingItemList}
      />
    );
  };
  const handlePreview = () => {
    if (image) {
      return (
        <>
          <Image
            source={{uri: image}}
            style={{
              width: '90%',
              height: 200,
              marginLeft: '5%',
              borderRadius: 5,
              marginTop: 10,
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <View style={{flexGrow: 1}} />
            <TouchableOpacity
              style={{
                backgroundColor: '#279AC6',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '5%',
                marginTop: '3%',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  paddingLeft: '8%',
                  paddingRight: '8%',
                  paddingTop: '2%',
                  paddingBottom: '2%',
                  color: 'white',
                  fontSize: 12,
                  fontFamily: 'Circular Std',
                }}
                onPress={handleSave}>
                Save{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      );
    } else {
      return <></>;
    }
  };
  //   const getReceivingContainer = () => {
  //     return (
  //         <ReceivingContainer draggableItemList={images} firstReceivingItemList={receivingItemList} />
  //     );
  // };
  useEffect(() => {
    handleDragger();
    console.log(images);
  }, [images]);
  return (
    <>
      <ButtonHeader
        title={'Image Preference'}
        rightElement={
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Pressable onPress={handleImageUpload}>
              <View style={{marginRight: 20}}>
                <Image
                  source={require('../assets/icons/galleryactive.png')}
                  style={{height: 28, width: 28, borderRadius: 5}}
                  resizeMode={'contain'}
                />
              </View>
            </Pressable>
            <Pressable onPress={handleCamera}>
              <View style={{marginRight: 10}}>
                <Image
                  source={require('../assets/icons/cameraactive.png')}
                  style={{height: 28, width: 28, borderRadius: 5}}
                  resizeMode={'contain'}
                />
              </View>
            </Pressable>
          </View>
        }
      />
      <View style={{backgroundColor: Color.WHITE, height: HEIGHT / 1.2}}>
        <View style={{flex: 1}}>
          <View
            style={{backgroundColor: 'white', paddingLeft: 20, paddingTop: 20}}>
            <Text style={{color: '#286BBC', fontSize: 18, fontWeight: 'bold'}}>
              Identity Images
            </Text>
            <Text style={{fontSize: 10}}>Images,Videos,documents or audio</Text>
          </View>
          {/* <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
            <View style={{flexGrow: 1}} />
            <View style={{marginRight: 30}}>
              <Icon
                name="camera-alt"
                type="MaterialIcons"
                color="#286BBC"
                size={20}
                style={{paddingTop: 10, paddingRight: 10}}
                onPress={handleCamera}
              />
            </View>
            <View style={{marginRight: 30}}>
              <Icon
                name="image"
                type="Ionicons"
                color="#286BBC"
                size={20}
                style={{paddingTop: 10, paddingRight: 10}}
                onPress={handleImageUpload}
              />
            </View>
          </View> */}
          {handlePreview()}
        </View>
        {handleDragger()}
      </View>
    </>
  );
};

export default ImageUploader;

// import * as React from 'react';
// import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { DraxProvider, DraxView, DraxList } from 'react-native-drax';

// const gestureRootViewStyle = { flex: 1 };

// export default function Dragger() {
//   const draggableItemList = [
//     {
//       'id': 1,
//       'uri': 'https://picsum.photos/id/237/200/300',
//     },
//     {
//       'id': 2,
//       'uri': 'https://picsum.photos/id/238/200/300',

//     },
//     {
//       'id': 3,
//       'uri': 'https://picsum.photos/id/239/200/300',
//     },
//     {
//       'id': 4,
//       'uri': 'https://picsum.photos/id/240/200/300',
//     },
//     {
//       'id': 5,
//       'uri': 'https://picsum.photos/id/241/200/300',
//     },
//     {
//       'id': 6,
//       'uri': 'https://picsum.photos/id/242/200/300',
//     },
//     {
//       'id': 7,
//       'uri': 'https://picsum.photos/id/243/200/300',

//     },
//     {
//       'id': 8,
//       'uri': 'https://picsum.photos/id/244/200/300',

//     },
//     {
//       'id': 9,
//       'uri': 'https://picsum.photos/id/1/200/300',

//     },
//     {
//       'id': 10,
//       'uri': 'https://picsum.photos/id/246/200/300',

//     },
//     {
//       'id': 11,
//       'uri': 'https://picsum.photos/id/247/200/300',

//     },
//     {
//       'id': 12,
//       'uri': 'https://picsum.photos/id/248/200/300',

//     },

//   ];
//   const FirstReceivingItemList = [
//     {
//       'id': 13,
//       'uri': '',

//     },
//     {
//       'id': 14,
//       'uri': '',

//     },
//     {
//       'id': 15,
//       'uri': '',

//     },
//     {
//       'id': 16,
//       'uri': '',
//     },
//   ];

//   const [receivingItemList, setReceivedItemList] = React.useState(FirstReceivingItemList);
//   const [dragItemMiddleList, setDragItemListMiddle] = React.useState(draggableItemList);

//   const DragUIComponent = ({ item, index }) => {
//     return (
//       <DraxView
//         style={[styles.centeredContent, styles.draggableBox, { backgroundColor: 'white' }]}
//         draggingStyle={styles.dragging}
//         dragReleasedStyle={styles.dragging}
//         hoverDraggingStyle={styles.hoverDragging}
//         dragPayload={index}
//         longPressDelay={150}
//         key={index}
//       >
//         <Image source={{uri : item.uri}} style={{height: (Dimensions.get('window').width / 3) - 14,width:(Dimensions.get('window').width / 3) - 14,borderRadius:10}}/>
// </DraxView>
//     );
//   };

//   const ReceivingZoneUIComponent = ({ item, index }) => {
//     return (
//       <DraxView
//         style={[styles.centeredContent, styles.receivingZone, { backgroundColor: 'white' }]}
//         receivingStyle={styles.receiving}
//         renderContent={({ viewState }) => {
//           const receivingDrag = viewState && viewState.receivingDrag;
//           const payload = receivingDrag && receivingDrag.payload;
//           return (
//             <View>
//                 {item.uri &&
//                     <Image source={{uri : item.uri}} style={{height: (Dimensions.get('window').width / 4) - 12,width:(Dimensions.get('window').width / 4) - 12,borderRadius:10}}/>
//                 }
//                 {!item.uri &&
//                     <View style={{height: (Dimensions.get('window').width / 4) - 12,width:(Dimensions.get('window').width / 4) - 12,borderRadius:10, alignItems: 'center',justifyContent: 'center', borderStyle: 'dashed', borderWidth: 1}} >
//                         <Text style={{fontSize: 10}}>Drop here</Text>
//                     </View>
//                 }
//             </View>
//           );
//         }}
//         key={index}
//         onReceiveDragDrop={(event) => {
//           let selected_item = dragItemMiddleList[event.dragged.payload];
//           console.log('onReceiveDragDrop::index', selected_item, index);
//           console.log('onReceiveDragDrop :: payload', event.dragged.payload);
//           let newReceivingItemList = [...receivingItemList];
//           console.log('onReceiveDragDrop :: newReceivingItemList', newReceivingItemList);
//           newReceivingItemList[index] = selected_item;
//           setReceivedItemList(newReceivingItemList);
//         }}
//       />
//     );
//   };

//   const FlatListItemSeparator = () => {
//     return (<View style={styles.itemSeparator} />);
//   };

//   return (
//     <GestureHandlerRootView
//       style={gestureRootViewStyle}>
//       <View>
//         <Text style={styles.headerStyle}>{'Drag drop and swap between lists'}</Text>
//       </View>
//       <DraxProvider>
//         <View style={styles.container}>
//           <View style={styles.receivingContainer}>
//             {receivingItemList.map((item, index) => ReceivingZoneUIComponent({ item, index }))}
//           </View>
//           <View style={styles.draxListContainer}>
//             <DraxList
//               data={dragItemMiddleList}
//               renderItemContent={DragUIComponent}
//               keyExtractor={(item, index) => index.toString()}
//               numColumns={3}
//               key={4}
//               ItemSeparatorComponent={FlatListItemSeparator}
//               scrollEnabled={true}
//             />
//           </View>
//         </View>
//       </DraxProvider>
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 12,
//     paddingTop: 40,
//     justifyContent: 'space-evenly',
//   },
//   centeredContent: {
//     borderRadius: 10,
//   },
//   receivingZone: {
//     height: (Dimensions.get('window').width / 4) - 12,
//     borderRadius: 10,
//     width: (Dimensions.get('window').width / 4) - 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 5,
//   },
//   receiving: {
//     borderColor: 'red',
//     borderWidth: 2,
//   },
//   draggableBox: {
//     width: (Dimensions.get('window').width / 3) - 14,
//     height: (Dimensions.get('window').width / 3) - 14,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 5,
//   },
//   dragging: {
//     opacity: 0.2,
//   },
//   hoverDragging: {
//     borderColor: 'magenta',
//     borderWidth: 2,
//   },
//   receivingContainer: {
//     padding: 5,
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//   },
//   itemSeparator: {
//     height: 15,
//   },
//   draxListContainer: {
//     padding: 5,
//     height: 400,
//   },
//   receivingZoneContainer: {
//     padding: 5,
//     height: 100,
//   },
//   textStyle: {
//     fontSize: 18,
//   },
//   headerStyle: {
//     marginTop: 20,
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginLeft: 20,
//   },
// });
