// import {
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React from 'react';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {useNavigation} from '@react-navigation/core';
// import Octicons from 'react-native-vector-icons/Octicons';

// const CommentScreen = () => {
//   const navigation = useNavigation();
//   return (
//     <SafeAreaView style={styles.Container}>
//       <ScrollView showsVerticalScrollIndicator={false} vertical>
//         <TouchableOpacity
//           style={styles.back}
//           onPress={() => navigation.goBack()}>
//           <Ionicons name="chevron-back" size={24} color="black" />
//         </TouchableOpacity>
//         <Text style={styles.Nav}>Comments</Text>

//         <View style={styles.card}>
//           <View style={styles.cardHeader}>
//             <Image
//               source={{
//                 uri: 'https://world-celebs.com/public/media/resize/800x-/2019/7/6/marshmello-2.jpg',
//               }}
//               style={styles.profileImage}
//             />
//             <View>
//               <Text
//                 style={{
//                   fontWeight: '700',
//                   fontSize: 16,
//                   color: 'black',
//                   marginLeft: 10,
//                 }}>
//                 Danny
//               </Text>
//               <Text
//                 style={{
//                   fontWeight: '400',
//                   fontSize: 12,
//                   color: 'black',
//                   marginLeft: 10,
//                 }}>
//                 Title
//               </Text>
//             </View>
//           </View>

//           <Text
//             style={{
//               margin: 10,
//               fontWeight: '400',
//               fontSize: 12,
//               color: 'gray',
//               marginLeft: 10,
//             }}>
//             July 05 2022 at 11:45pm
//           </Text>

//           <Text
//             style={{
//               margin: 10,
//               fontWeight: '600',
//               fontSize: 16,
//               color: 'grey',
//               marginLeft: 10,
//             }}>
//             Hello This is Marshmellow I am From MARS, You Can see Meracles Now.
//           </Text>

//           {/* <Octicons name="heart-fill" size={20} color="red" />
//           <Text>0 likes</Text>
//           <View style={styles.reactButton}>
//             <TouchableOpacity
//               style={{
//                 marginLeft: 10,
//                 marginRight: 10,
//               }}>
//               <Octicons name="heart" size={20} color="white" />
//             </TouchableOpacity>
//             <TouchableOpacity>
//               <Text style={{fontSize: 16, fontWeight: '700', color: 'white'}}>
//                 React
//               </Text>
//             </TouchableOpacity>
//           </View> */}

//           <View style={styles.commentProfContainer}>
//             <Image
//               source={{
//                 uri: 'https://world-celebs.com/public/media/resize/800x-/2019/7/6/marshmello-2.jpg',
//               }}
//               style={styles.commentProfImage}
//             />
//             <Text
//               style={{
//                 fontWeight: '600',
//                 fontSize: 16,
//                 color: 'black',
//                 marginLeft: 10,
//               }}>
//               Kishore
//               {'\n'}
//               <Text
//                 style={{
//                   fontWeight: '400',
//                   fontSize: 15,
//                   color: 'black',
//                   marginLeft: 10,
//                 }}>
//                 Very nice UI
//               </Text>
//             </Text>
//           </View>

//           {/* <View style={styles.commentContainer}>
//             <Image
//               source={{
//                 uri: 'https://world-celebs.com/public/media/resize/800x-/2019/7/6/marshmello-2.jpg',
//               }}
//               style={styles.commentImage}
//             />
//             <TextInput placeholder="Add a comment..." />
//           </View> */}
//         </View>
//       </ScrollView>
//       <View style={styles.commentContainer}>
//         <Image
//           source={{
//             uri: 'https://world-celebs.com/public/media/resize/800x-/2019/7/6/marshmello-2.jpg',
//           }}
//           style={styles.commentImage}
//         />
//         <TextInput placeholder="Add a comment..." style={styles.input} />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default CommentScreen;

// const styles = StyleSheet.create({
//   Container: {
//     flex: 1,
//     backgroundColor: '#f2f3fa',
//   },
//   back: {
//     margin: 10,
//     backgroundColor: 'white',
//     marginLeft: 20,
//     marginRight: 10,
//     borderRadius: 20,
//     height: 40,
//     width: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   Nav: {
//     margin: 20,
//     fontWeight: '800',
//     fontSize: 25,
//     color: 'black',
//   },
//   card: {
//     backgroundColor: '#fff',
//     margin: 20,
//     borderRadius: 20,
//     shadowColor: '#9f9f9f',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.19,
//     shadowRadius: 5.62,
//     elevation: 6,
//   },
//   cardHeader: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   profileImage: {
//     width: 70,
//     height: 70,
//     borderTopLeftRadius: 20,
//     borderBottomRightRadius: 10,
//   },
//   commentImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
//   commentContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     position: 'relative',
//     alignItems: 'center',
//     margin: 5,
//   },
//   commentProfImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
//   commentProfContainer: {
//     margin: 10,
//     display: 'flex',
//     flexDirection: 'row',
//   },
//   reactButton: {
//     display: 'flex',
//     flexDirection: 'row',
//     width: '30%',
//     backgroundColor: '#FAC213',
//     padding: 10,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   input: {
//     width: '85%',
//     backgroundColor: 'white',
//     borderRadius: 20,
//     marginLeft: 5,
//     paddingLeft: 5,
//     height: 40,
//   },
// });
