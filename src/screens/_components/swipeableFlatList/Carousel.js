/**
 * Developers Note >>>>>>>>>>>>>>>>
 *
 * Dummy - Carousel component (not working)
 *
 */

import {
  Animated,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {Color} from '../../../themes';
import LinearGradient from 'react-native-linear-gradient';

const WIDTH = Dimensions.get('window').width;

const Carousel = () => {
  const translateX = useRef(new Animated.Value(0)).current;
  const [bookmark, setBookmark] = useState(false);
  const [likes, setLikes] = useState(false);
  const scrollDots = () => {
    const dotPosition = Animated.divide(translateX, WIDTH);
    return (
      <View
        style={{
          marginVertical: 5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {banners.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          const dotWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [6, 6, 6],
            extrapolate: 'clamp',
          });

          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: ['#dedede', '#ffffff', '#dedede'],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              opacity={opacity}
              style={{
                borderRadius: 15,
                marginHorizontal: 3,
                width: dotWidth,
                height: 6,
                backgroundColor: dotColor,
              }}
            />
          );
        })}
      </View>
    );
  };
  const Card = ({banners: {image, company, logo}}) => {
    var [bookmark, setBookmark] = useState(false);
    var [likes, setLikes] = useState(false);
    return (
      <View style={{marginBottom: 0}}>
        <View style={styles.media}>
          <Image source={image} style={styles.image} />
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            paddingHorizontal: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Pressable
            onPress={() => {}}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={logo}
              style={{width: 35, height: 35, borderRadius: 50}}
            />
            <Text
              style={{
                fontWeight: '600',
                marginLeft: 5,
                fontSize: 16,
                color: Color.WHITE,
              }}>
              {company}
            </Text>
          </Pressable>
          <View style={styles.sharableContainer}>
            <Pressable
              onPress={() => {
                setBookmark(!bookmark);
              }}>
              <Image
                source={
                  bookmark
                    ? require('../assets/icons/bookmarkActive.png')
                    : require('../assets/icons/bookmark.png')
                }
                style={styles.icons}
              />
            </Pressable>
            <Image
              source={require('../assets/icons/share.png')}
              style={styles.icons}
            />
            <Pressable
              onPress={() => {
                setLikes(!likes);
              }}>
              <Image
                source={
                  likes
                    ? require('../assets/icons/heartActive.png')
                    : require('../assets/icons/heartInactive.png')
                }
                style={styles.icons}
              />
            </Pressable>
          </View>
          {scrollDots()}
        </View>
      </View>
    );
  };
  return (
    <View style={{backgroundColor: 'rgba(0,0,0,0.7)'}}>
      <Animated.ScrollView
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: translateX,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={WIDTH}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {banners.map((banners, index) => (
          <View>
            <Card banners={banners} key={index} />
            {/* <View
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                paddingHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Pressable
                onPress={() => {}}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={banners?.logo}
                  style={{width: 35, height: 35, borderRadius: 50}}
                />
                <Text
                  style={{
                    fontWeight: '600',
                    marginLeft: 5,
                    fontSize: 16,
                    color: Color.WHITE,
                  }}>
                  {banners?.company}
                </Text>
              </Pressable>
              <View style={styles.sharableContainer}>
                <Pressable
                  onPress={() => {
                    setBookmark(!bookmark);
                  }}>
                  <Image
                    source={
                      bookmark
                        ? require('../assets/icons/bookmarkActive.png')
                        : require('../assets/icons/bookmark.png')
                    }
                    style={styles.icons}
                  />
                </Pressable>
                <Image
                  source={require('../assets/icons/share.png')}
                  style={styles.icons}
                />
                <Pressable
                  onPress={() => {
                    setLikes(!likes);
                  }}>
                  <Image
                    source={
                      likes
                        ? require('../assets/icons/heartActive.png')
                        : require('../assets/icons/heartInactive.png')
                    }
                    style={styles.icons}
                  />
                </Pressable>
              </View>
            </View> */}
          </View>
        ))}
      </Animated.ScrollView>
      {/* {scrollDots()} */}
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  media: {width: WIDTH, height: 280},
  image: {width: '100%', height: '100%'},

  sharableContainer: {
    flexDirection: 'row',
    width: '30%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
  },
  icons: {width: 22, height: 22, tintColor: Color.white},
});

const banners = [
  {
    id: 1,
    image: require('../assets/images/temp/how-avastin-works-970.genecoreimg.480.jpg'),
    company: 'Astrazeneca',
    logo: require('../assets/images/temp/AZ_RGB_H_COL_600x315.jpg'),
  },
  {
    id: 2,
    image: require('../assets/images/temp/hertab.png'),
    company: 'Hetero Pharma',
    logo: require('../assets/images/temp/Hetero_New_Logo-Colour-Transparent.png'),
  },
  {
    id: 3,
    image: require('../assets/images/temp/mdi-spacer_f.jpg'),
    company: 'Novo Nordisk',
    logo: require('../assets/images/temp/Novo-Nordisk-Logo.png'),
  },

  {
    id: 4,
    image: require('../assets/images/temp/Prostate-Cancer-060922-TV-Graphics-v4-760x400.jpg'),
    company: 'Boulder Community',
    logo: require('../assets/images/temp/how-avastin-works-970.genecoreimg.480.jpg'),
  },
];

// /**
//  * Developers Note >>>>>>>>>>>>>>>>
//  *
//  * Dummy - Carousel component (not working)
//  *
//  */

// import {
//   Animated,
//   StyleSheet,
//   Text,
//   View,
//   Pressable,
//   Image,
//   Dimensions,
//   ImageBackground,
// } from 'react-native';
// import React, {useRef, useState, useEffect} from 'react';
// import {Color} from '../../../themes';
// import LinearGradient from 'react-native-linear-gradient';

// const WIDTH = Dimensions.get('window').width;

// const Carousel = () => {
//   const translateX = useRef(new Animated.Value(0)).current;

//   const scrollDots = () => {
//     const dotPosition = Animated.divide(translateX, WIDTH);
//     return (
//       <View
//         style={{
//           marginVertical: 5,
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}>
//         {banners.map((item, index) => {
//           const opacity = dotPosition.interpolate({
//             inputRange: [index - 1, index, index + 1],
//             outputRange: [0.3, 1, 0.3],
//             extrapolate: 'clamp',
//           });

//           const dotWidth = dotPosition.interpolate({
//             inputRange: [index - 1, index, index + 1],
//             outputRange: [6, 6, 6],
//             extrapolate: 'clamp',
//           });

//           const dotColor = dotPosition.interpolate({
//             inputRange: [index - 1, index, index + 1],
//             outputRange: ['#dedede', '#ffffff', '#dedede'],
//             extrapolate: 'clamp',
//           });

//           return (
//             <Animated.View
//               key={index}
//               opacity={opacity}
//               style={{
//                 borderRadius: 15,
//                 marginHorizontal: 3,
//                 width: dotWidth,
//                 height: 6,
//                 backgroundColor: dotColor,
//               }}
//             />
//           );
//         })}
//       </View>
//     );
//   };
//   const Card = ({banners: {image, company, logo}}) => {
//     var [bookmark, setBookmark] = useState(false);
//     var [likes, setLikes] = useState(false);
//     return (
//       <Pressable>
//         <ImageBackground source={image} style={styles.media}>
//           <LinearGradient
//             colors={[
//               'transparent',
//               'transparent',
//               'rgba(0,0,0,0.6)',
//               'rgba(0,0,0,0.7)',
//             ]}
//             start={{x: 0, y: 0.5}}
//             end={{x: 0, y: 1}}
//             locations={[0, 0.7, 0.91, 1]}
//             style={{flex: 1}}>
//             <View
//               style={{
//                 position: 'absolute',
//                 bottom: 0,
//                 width: '100%',
//                 paddingHorizontal: 10,
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//               }}>
//               <Pressable
//                 onPress={() => {}}
//                 style={{flexDirection: 'row', alignItems: 'center'}}>
//                 <Image
//                   source={logo}
//                   style={{width: 35, height: 35, borderRadius: 50}}
//                 />
//                 <Text
//                   style={{
//                     fontWeight: '600',
//                     marginLeft: 5,
//                     fontSize: 16,
//                     color: Color.WHITE,
//                   }}>
//                   {company}
//                 </Text>
//               </Pressable>
//               <View style={styles.sharableContainer}>
//                 <Pressable
//                   onPress={() => {
//                     setBookmark(!bookmark);
//                   }}>
//                   <Image
//                     source={
//                       bookmark
//                         ? require('../assets/icons/bookmarkActive.png')
//                         : require('../assets/icons/bookmark.png')
//                     }
//                     style={styles.icons}
//                   />
//                 </Pressable>
//                 <Image
//                   source={require('../assets/icons/share.png')}
//                   style={styles.icons}
//                 />
//                 <Pressable
//                   onPress={() => {
//                     setLikes(!likes);
//                   }}>
//                   <Image
//                     source={
//                       likes
//                         ? require('../assets/icons/heartActive.png')
//                         : require('../assets/icons/heartInactive.png')
//                     }
//                     style={styles.icons}
//                   />
//                 </Pressable>
//               </View>
//             </View>
//           </LinearGradient>
//         </ImageBackground>
//       </Pressable>
//     );
//   };
//   return (
//     <View style={{backgroundColor: 'rgba(0,0,0,0.7)'}}>
//       <Animated.ScrollView
//         onScroll={Animated.event(
//           [
//             {
//               nativeEvent: {
//                 contentOffset: {
//                   x: translateX,
//                 },
//               },
//             },
//           ],
//           {useNativeDriver: false},
//         )}
//         scrollEventThrottle={16}
//         decelerationRate="fast"
//         snapToInterval={WIDTH}
//         horizontal
//         showsHorizontalScrollIndicator={false}>
//         {banners.map((banners, index) => (
//           <Card banners={banners} key={index} />
//         ))}
//       </Animated.ScrollView>
//       {scrollDots()}
//     </View>
//   );
// };

// export default Carousel;

// const styles = StyleSheet.create({
//   media: {width: WIDTH, height: 280},
//   image: {width: '100%', height: '100%'},

//   sharableContainer: {
//     flexDirection: 'row',
//     width: '30%',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingRight: 10,
//   },
//   icons: {width: 22, height: 22, tintColor: Color.white},
// });

// const banners = [
//   {
//     id: 1,
//     image: require('../assets/images/temp/how-avastin-works-970.genecoreimg.480.jpg'),
//     company: 'Astrazeneca',
//     logo: require('../assets/images/temp/AZ_RGB_H_COL_600x315.jpg'),
//   },
//   {
//     id: 2,
//     image: require('../assets/images/temp/hertab.png'),
//     company: 'Hetero Pharma',
//     logo: require('../assets/images/temp/Hetero_New_Logo-Colour-Transparent.png'),
//   },
//   {
//     id: 3,
//     image: require('../assets/images/temp/mdi-spacer_f.jpg'),
//     company: 'Novo Nordisk',
//     logo: require('../assets/images/temp/Novo-Nordisk-Logo.png'),
//   },

//   {
//     id: 4,
//     image: require('../assets/images/temp/Prostate-Cancer-060922-TV-Graphics-v4-760x400.jpg'),
//     company: 'Boulder Community',
//     logo: require('../assets/images/temp/how-avastin-works-970.genecoreimg.480.jpg'),
//   },
// ];
