/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {DraxProvider, DraxView, DraxList} from 'react-native-drax';
import {Icon} from 'react-native-elements';

const gestureRootViewStyle = {flex: 1};

export default function Dragger({firstReceivingItemList, draggableItemList}) {
  const [receivingItemList, setReceivedItemList] = React.useState(
    firstReceivingItemList,
  );
  const [dragItemMiddleList, setDragItemListMiddle] =
    React.useState(draggableItemList);
  React.useEffect(() => {
    handlePropsChange();
  }, [draggableItemList]);
  const handlePropsChange = () => {
    setDragItemListMiddle(draggableItemList);
  };
  const handleDeleteImage = () => {
    //todo
    console.log('image deleted');
  };
  const DragUIComponent = ({item, index}) => {
    return (
      <DraxView
        style={[
          styles.centeredContent,
          styles.draggableBox,
          {backgroundColor: 'white', position: 'relative'},
        ]}
        draggingStyle={styles.dragging}
        dragReleasedStyle={styles.dragging}
        hoverDraggingStyle={styles.hoverDragging}
        dragPayload={index}
        longPressDelay={150}
        key={index}>
        <View style={styles.container1}>
          <Image source={{uri: item.uri}} style={styles.image} />
          <Icon
            name="close"
            type="Ionicons"
            color="white"
            size={15}
            onPress={() => handleDeleteImage()}
            containerStyle={styles.icon}
          />
        </View>
      </DraxView>
    );
  };

  const ReceivingZoneUIComponent = ({item, index}) => {
    return (
      <DraxView
        style={[styles.centeredContent, styles.receivingZone]}
        receivingStyle={styles.receiving}
        renderContent={({viewState}) => {
          const receivingDrag = viewState && viewState.receivingDrag;
          const payload = receivingDrag && receivingDrag.payload;
          return (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  height: Dimensions.get('window').width / 4 - 12,
                  width: Dimensions.get('window').width / 4 - 12,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderStyle: 'dashed',
                  borderWidth: 1,
                  marginTop: 30,
                  backgroundColor: 'white',
                }}>
                {item.uri && (
                  <View style={styles.container1}>
                    <Image
                      source={{uri: item.uri}}
                      style={[
                        styles.image,
                        {
                          height: Dimensions.get('window').width / 4 - 12,
                          width: Dimensions.get('window').width / 4 - 12,
                        },
                      ]}
                    />
                    <Icon
                      name="close"
                      type="Ionicons"
                      color="white"
                      size={15}
                      onPress={() => handleDeleteImage()}
                      containerStyle={styles.icon}
                    />
                  </View>
                )}
                {!item.uri && <Text style={{fontSize: 10}}>Drag and drop</Text>}
              </View>
              <Text
                style={{
                  fontSize: 10,
                  color: 'black',
                  marginBottom: 10,
                  marginTop: 10,
                }}>
                {console.log(dragItemMiddleList)}
                {item.label}
              </Text>
            </View>
          );
        }}
        key={index}
        onReceiveDragDrop={event => {
          let selected_item = dragItemMiddleList[event.dragged.payload];
          console.log('onReceiveDragDrop::index', selected_item, index);
          console.log('onReceiveDragDrop :: payload', event.dragged.payload);
          console.log(receivingItemList);
          let newReceivingItemList = [...receivingItemList];
          console.log(
            'onReceiveDragDrop :: newReceivingItemList',
            newReceivingItemList,
          );
          newReceivingItemList[index].uri = selected_item.uri;
          setReceivedItemList(newReceivingItemList);
        }}
      />
    );
  };

  const FlatListItemSeparator = () => {
    return <View style={styles.itemSeparator} />;
  };

  return (
    <GestureHandlerRootView style={gestureRootViewStyle}>
      <DraxProvider>
        <View style={styles.container}>
          <View style={styles.receivingContainer}>
            <View style={{backgroundColor: 'white', width: '100%'}}>
              <Text
                style={{
                  fontSize: 14,
                  marginLeft: 10,
                  fontWeight: 'bold',
                  color: '#279AC6',
                  marginTop: '0%',
                }}>
                Reference Holder
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  marginLeft: 10,
                  marginBottom: '3%',
                  zIndex: 10000,
                }}>
                Add media to the holder for easy navigation
              </Text>
            </View>

            {console.log(firstReceivingItemList)}
            {console.log(receivingItemList)}
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              {receivingItemList.map((item, index) =>
                ReceivingZoneUIComponent({item, index}),
              )}
            </View>
          </View>
          <View style={styles.draxListContainer}>
            <DraxList
              ListHeaderComponent={
                <Text
                  style={{
                    fontSize: 14,
                    marginLeft: 5,
                    paddingBottom: 5,
                    fontWeight: 'bold',
                    color: '#279AC6',
                  }}>
                  All images
                </Text>
              }
              data={dragItemMiddleList}
              renderItemContent={DragUIComponent}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3}
              key={4}
              ItemSeparatorComponent={FlatListItemSeparator}
              scrollEnabled={true}
              nestedScrollEnabled={true}
            />
            <View style={{height: 200}} />
          </View>
        </View>
      </DraxProvider>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container1: {
    position: 'relative',
  },
  image: {
    height: Dimensions.get('window').width / 3 - 14,
    width: Dimensions.get('window').width / 3 - 14,
    borderRadius: 10,
    zIndex: 1,
  },
  icon: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 2,
    backgroundColor: 'black',
    borderRadius: 100,
  },
  container: {
    flex: 1,
    padding: 12,
    paddingTop: 10,
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
  },
  centeredContent: {
    borderRadius: 10,
  },
  receivingZone: {
    height: Dimensions.get('window').width / 4 - 12,
    borderRadius: 10,
    width: Dimensions.get('window').width / 4 - 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    backgroundColor: 'white',
  },
  receiving: {
    borderColor: 'red',
  },
  draggableBox: {
    width: Dimensions.get('window').width / 3 - 16,
    height: Dimensions.get('window').width / 3 - 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  dragging: {
    opacity: 0.2,
  },
  hoverDragging: {
    borderColor: 'magenta',
    borderWidth: 2,
  },
  receivingContainer: {
    padding: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 100000,
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    elevation: 100,
  },
  itemSeparator: {
    height: 15,
  },
  draxListContainer: {
    padding: 5,
  },
  receivingZoneContainer: {
    padding: 5,
    height: 100,
  },
  textStyle: {
    fontSize: 18,
  },
  headerStyle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
  },
});

// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-unused-vars */
// /* eslint-disable react-native/no-inline-styles */
// import * as React from 'react';
// import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
// import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
// import {DraxProvider, DraxView, DraxList} from 'react-native-drax';
// import {Icon} from 'react-native-elements';

// const gestureRootViewStyle = {flex: 1};

// export default function Dragger({firstReceivingItemList, draggableItemList}) {
//   const [receivingItemList, setReceivedItemList] = React.useState(
//     firstReceivingItemList,
//   );
//   const [dragItemMiddleList, setDragItemListMiddle] =
//     React.useState(draggableItemList);
//   React.useEffect(() => {
//     handlePropsChange();
//   }, [draggableItemList]);
//   const handlePropsChange = () => {
//     setDragItemListMiddle(draggableItemList);
//   };
//   const handleDeleteImage = () => {
//     //todo
//     console.log('image deleted');
//   };
//   const DragUIComponent = ({item, index}) => {
//     return (
//       <DraxView
//         style={[
//           styles.centeredContent,
//           styles.draggableBox,
//           {backgroundColor: 'white', position: 'relative'},
//         ]}
//         draggingStyle={styles.dragging}
//         dragReleasedStyle={styles.dragging}
//         hoverDraggingStyle={styles.hoverDragging}
//         dragPayload={index}
//         longPressDelay={150}
//         key={index}>
//         <View style={styles.container1}>
//           <Image source={{uri: item.uri}} style={styles.image} />
//           <Icon
//             name="close"
//             type="Ionicons"
//             color="white"
//             size={15}
//             onPress={() => handleDeleteImage()}
//             containerStyle={styles.icon}
//           />
//         </View>
//       </DraxView>
//     );
//   };

//   const ReceivingZoneUIComponent = ({item, index}) => {
//     return (
//       <DraxView
//         style={[styles.centeredContent, styles.receivingZone]}
//         receivingStyle={styles.receiving}
//         renderContent={({viewState}) => {
//           const receivingDrag = viewState && viewState.receivingDrag;
//           const payload = receivingDrag && receivingDrag.payload;
//           return (
//             <View
//               style={{
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}>
//               <View
//                 style={{
//                   height: Dimensions.get('window').width / 4 - 12,
//                   width: Dimensions.get('window').width / 4 - 12,
//                   borderRadius: 10,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   borderStyle: 'dashed',
//                   borderWidth: 1,
//                   marginTop: 30,
//                   backgroundColor: 'white',
//                 }}>
//                 {item.uri && (
//                   <View style={styles.container1}>
//                     <Image
//                       source={{uri: item.uri}}
//                       style={[
//                         styles.image,
//                         {
//                           height: Dimensions.get('window').width / 4 - 12,
//                           width: Dimensions.get('window').width / 4 - 12,
//                         },
//                       ]}
//                     />
//                     <Icon
//                       name="close"
//                       type="Ionicons"
//                       color="white"
//                       size={15}
//                       onPress={() => handleDeleteImage()}
//                       containerStyle={styles.icon}
//                     />
//                   </View>
//                 )}
//                 {!item.uri && <Text style={{fontSize: 10}}>Drag and drop</Text>}
//               </View>
//               <Text
//                 style={{
//                   fontSize: 10,
//                   color: 'black',
//                   marginBottom: 10,
//                   marginTop: 10,
//                 }}>
//                 {console.log(dragItemMiddleList)}
//                 {item.label}
//               </Text>
//             </View>
//           );
//         }}
//         key={index}
//         onReceiveDragDrop={event => {
//           let selected_item = dragItemMiddleList[event.dragged.payload];
//           console.log('onReceiveDragDrop::index', selected_item, index);
//           console.log('onReceiveDragDrop :: payload', event.dragged.payload);
//           console.log(receivingItemList);
//           let newReceivingItemList = [...receivingItemList];
//           console.log(
//             'onReceiveDragDrop :: newReceivingItemList',
//             newReceivingItemList,
//           );
//           newReceivingItemList[index].uri = selected_item.uri;
//           setReceivedItemList(newReceivingItemList);
//         }}
//       />
//     );
//   };

//   const FlatListItemSeparator = () => {
//     return <View style={styles.itemSeparator} />;
//   };

//   return (
//     <GestureHandlerRootView style={gestureRootViewStyle}>
//       <DraxProvider>
//         <View style={styles.container}>
//           <View style={styles.receivingContainer}>
//             <View style={{backgroundColor: 'white', width: '100%'}}>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   marginLeft: 10,
//                   fontWeight: 'bold',
//                   color: '#279AC6',
//                   marginTop: '0%',
//                 }}>
//                 Reference Holder
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 10,
//                   marginLeft: 10,
//                   marginBottom: '3%',
//                   zIndex: 10000,
//                 }}>
//                 Add media to the holder for easy navigation
//               </Text>
//             </View>

//             {console.log(firstReceivingItemList)}
//             {console.log(receivingItemList)}
//             <View
//               style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
//               {receivingItemList.map((item, index) =>
//                 ReceivingZoneUIComponent({item, index}),
//               )}
//             </View>
//           </View>
//           <View style={styles.draxListContainer}>
//             <Text
//               style={{
//                 fontSize: 14,
//                 marginLeft: 5,
//                 paddingBottom: 5,
//                 fontWeight: 'bold',
//                 color: '#279AC6',
//               }}>
//               All images
//             </Text>
//             <ScrollView nestedScrollEnabled={true}>
//               <DraxList
//                 data={dragItemMiddleList}
//                 renderItemContent={DragUIComponent}
//                 keyExtractor={(item, index) => index.toString()}
//                 numColumns={3}
//                 key={4}
//                 ItemSeparatorComponent={FlatListItemSeparator}
//                 scrollEnabled={true}
//                 nestedScrollEnabled={true}
//               />
//               <View style={{height: 200}} />
//             </ScrollView>
//           </View>
//         </View>
//       </DraxProvider>
//     </GestureHandlerRootView>
//   );
// }
// const styles = StyleSheet.create({
//   container1: {
//     position: 'relative',
//   },
//   image: {
//     height: Dimensions.get('window').width / 3 - 14,
//     width: Dimensions.get('window').width / 3 - 14,
//     borderRadius: 10,
//     zIndex: 1,
//   },
//   icon: {
//     position: 'absolute',
//     top: 5,
//     right: 5,
//     zIndex: 2,
//     backgroundColor: 'black',
//     borderRadius: 100,
//   },
//   container: {
//     flex: 1,
//     padding: 12,
//     paddingTop: 10,
//     justifyContent: 'space-evenly',
//     backgroundColor: 'white',
//   },
//   centeredContent: {
//     borderRadius: 10,
//   },
//   receivingZone: {
//     height: Dimensions.get('window').width / 4 - 12,
//     borderRadius: 10,
//     width: Dimensions.get('window').width / 4 - 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 5,
//     backgroundColor: 'white',
//   },
//   receiving: {
//     borderColor: 'red',
//   },
//   draggableBox: {
//     width: Dimensions.get('window').width / 3 - 16,
//     height: Dimensions.get('window').width / 3 - 16,
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
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     zIndex: 100000,
//     width: Dimensions.get('window').width,
//     backgroundColor: 'white',
//     elevation: 100,
//   },
//   itemSeparator: {
//     height: 15,
//   },
//   draxListContainer: {
//     padding: 5,
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
