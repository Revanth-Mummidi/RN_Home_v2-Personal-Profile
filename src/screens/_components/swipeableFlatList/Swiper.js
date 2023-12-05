{
  /*
Developer Note >>>>>>>>>>>>>>>>>>>>>>

Usage Method >>>>>>>>>>>>>>>>>>>>>>>>>
<Swiper
  source={[
    {
      id: 2,
      title: 'Home',
      badge: '',
      ref: React.createRef(),
      component: <Qualifications />,
    },
    {
      id: 3,
      title: 'Social',
      badge: '10',
      ref: React.createRef(),
      component: <DrugSocial />,
    },
  ]}
/>; */
}

import React, {useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../../themes';
import {ThemeContext} from '../../../themes/components/ThemeContext';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Swiper = ({
  source,
  rightElementShow,
  rightElement,
  rightElementContainer,
  middleElement,
  height = 150,
  imageTitle,
  containerStyles,
  backgroundColor,
  activeColor,
  inactiveColor,
  badgeColor,

  scrollerStyle,
}) => {
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  const styles = getStyles(Color);
  const ref = React.useRef(null);
  const [indexs, setIndexs] = React.useState(0);
  const componentRef = React.useRef(null);
  const [sourceN, setSourceN] = React.useState(source);
  const [rightIcon, setRightIcon] = useState(rightElementShow);
  const [scrollerStyles, setscrollerStyles] = useState(scrollerStyle);
  (backgroundColor = Color.swiper_bg),
    (activeColor = Color.swiper_activeColor),
    (inactiveColor = Color.swiper_inactiveColor),
    (badgeColor = Color.swiper_badgeColor),
    React.useEffect(() => {
      ref.current?.scrollToIndex({
        index: indexs,
        animated: true,
        // if 0 : left, 1: right, 0.5 : middle
        viewPosition: 0.5,
      }),
        [indexs];
    });

  return (
    <View style={styles.container}>
      {rightIcon ? (
        <View style={[styles.rightContainer, rightElementContainer]}>
          {rightElement}
        </View>
      ) : null}
      <Animated.FlatList
        ref={ref}
        initialScrollIndex={indexs}
        data={sourceN}
        pagingEnabled
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingLeft: 10}}
        style={{
          backgroundColor: backgroundColor,
          width: WIDTH,
          ...containerStyles,
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setIndexs(index);
                componentRef.current?.scrollToIndex({
                  index: index,
                  animated: true,
                });
              }}>
              {scrollerStyles ? (
                <Animated.View
                  style={{
                    marginRight: 10, // if viewPosition is set to "0.5" & '1'
                    //marginLeft: 10, // if viewPosition is set to "0"
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    flexDirection: 'row',
                    borderRadius: 10,
                    marginVertical: 7,
                    backgroundColor:
                      index === indexs ? activeColor : inactiveColor,
                  }}>
                  <View>{imageTitle}</View>
                  <Text
                    style={{
                      fontWeight: '700',
                      color:
                        index === indexs ? backgroundColor : backgroundColor,
                    }}>
                    {item.title}{' '}
                    <Text>
                      <Text
                        style={{
                          color:
                            index === indexs ? badgeColor : backgroundColor,
                        }}>
                        {item.badge}
                      </Text>
                    </Text>
                  </Text>
                </Animated.View>
              ) : (
                <Animated.View
                  style={{
                    marginRight: 10, // if viewPosition is set to "0.5" & '1'
                    //marginLeft: 10, // if viewPosition is set to "0"
                    padding: 10,
                    flexDirection: 'row',
                    borderBottomWidth: 3,
                    borderColor: index === indexs ? activeColor : 'transparent',
                  }}>
                  <View>{imageTitle}</View>
                  <Text
                    style={{
                      fontWeight: '700',
                      color: index === indexs ? activeColor : inactiveColor,
                    }}>
                    {item.title}{' '}
                    <Text>
                      <Text
                        style={{
                          color: index === indexs ? badgeColor : inactiveColor,
                        }}>
                        {item.badge}
                      </Text>
                    </Text>
                  </Text>
                </Animated.View>
              )}
            </TouchableOpacity>
          );
        }}
      />
      <View style={{width: WIDTH}}>{middleElement}</View>
      <SafeAreaView style={{backgroundColor: Color.WHITE, flex: -1}}>
        <FlatList
          style={{flexGrow: 0}}
          ref={componentRef}
          data={source}
          pagingEnabled
          onMomentumScrollEnd={event => {
            const index = Math.floor(
              Math.floor(event.nativeEvent.contentOffset.x) /
                Math.floor(event.nativeEvent.layoutMeasurement.width),
            );
            setIndexs(index);
          }}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({item}) => {
            return (
              <View
                style={{
                  width: WIDTH,
                  height: HEIGHT - height,
                }}>
                {item.component}
              </View>
            );
          }}
        />
      </SafeAreaView>
    </View>
  );
};
const getStyles = Color => {
  const style = StyleSheet.create({
    container: {
      flex: -1,
      alignItems: 'flex-start',
      // justifyContent: "space-between",
    },
    rightContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'flex-end',
      position: 'absolute',
      top: 10,
      right: 0,
      width: '20%',
      paddingRight: 10,
      zIndex: 1,
    },
  });
  return style;
};
export default Swiper;
// *********************** trying to make resuable and dynamic styling **************

// {
//   /*
// Developer Note >>>>>>>>>>>>>>>>>>>>>>

// Usage Method >>>>>>>>>>>>>>>>>>>>>>>>>
// <Swiper
//   source={[
//     {
//       id: 2,
//       title: 'Home',
//       badge: '',
//       ref: React.createRef(),
//       component: <Qualifications />,
//     },
//     {
//       id: 3,
//       title: 'Social',
//       badge: '10',
//       ref: React.createRef(),
//       component: <DrugSocial />,
//     },
//   ]}
// />; */
// }

// import React, {useState} from 'react';
// import {
//   Animated,
//   Dimensions,
//   FlatList,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Image,
// } from 'react-native';

// import IconAntDesign from 'react-native-vector-icons/AntDesign';
// import {Color} from '../../../themes';
// const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;

// const Swiper = ({
//   source,
//   rightElementShow,
//   rightElement,
//   rightElementContainer,
//   middleElement,
//   height = 150,
//   imageTitle,
//   containerStyles,
//   activeColor = Color.WHITE,
//   inactiveColor = Color.mildBlue,
//   badgeColor = Color.purple,
// }) => {
//   const ref = React.useRef(null);
//   const [indexs, setIndexs] = React.useState(0);
//   const componentRef = React.useRef(null);
//   const [sourceN, setSourceN] = React.useState(source);
//   const [rightIcon, setRightIcon] = useState(rightElementShow);

//   React.useEffect(() => {
//     ref.current?.scrollToIndex({
//       index: indexs,
//       animated: true,
//       // if 0 : left, 1: right, 0.5 : middle
//       viewPosition: 1,
//     }),
//       [indexs];
//   });

//   return (
//     <View style={styles.container}>
//       {rightIcon ? (
//         <View style={[styles.rightContainer, rightElementContainer]}>
//           {rightElement}
//         </View>
//       ) : null}
//       <Animated.FlatList
//         ref={ref}
//         initialScrollIndex={indexs}
//         data={sourceN}
//         pagingEnabled
//         keyExtractor={item => item.id}
//         contentContainerStyle={{paddingLeft: 10}}
//         style={{
//           backgroundColor: Color.midBlue,
//           width: WIDTH,
//           ...containerStyles,
//         }}
//         showsHorizontalScrollIndicator={false}
//         horizontal
//         renderItem={({item, index}) => {
//           return (
//             <TouchableOpacity
//               onPress={() => {
//                 setIndexs(index);
//                 componentRef.current?.scrollToIndex({
//                   index: index,
//                   animated: true,
//                 });
//               }}>
//               <Animated.View
//                 style={{
//                   marginRight: 10, // if viewPosition is set to "0.5" & '1'
//                   //marginLeft: 10, // if viewPosition is set to "0"
//                   padding: 10,
//                   borderBottomWidth: 3,
//                   flexDirection: 'row',
//                   borderColor: index === indexs ? activeColor : 'transparent',
//                 }}>
//                 <View>{imageTitle}</View>
//                 <Text
//                   style={{
//                     fontWeight: '700',
//                     color: index === indexs ? activeColor : inactiveColor,
//                   }}>
//                   {item.title}{' '}
//                   <Text>
//                     <Text
//                       style={{
//                         color: index === indexs ? badgeColor : inactiveColor,
//                       }}>
//                       {item.badge}
//                     </Text>
//                   </Text>
//                 </Text>
//               </Animated.View>
//             </TouchableOpacity>
//           );
//         }}
//       />
//       <View style={{width: WIDTH}}>{middleElement}</View>
//       <SafeAreaView style={{backgroundColor: Color.WHITE, flex: -1}}>
//         <FlatList
//           style={{flexGrow: 0}}
//           ref={componentRef}
//           data={source}
//           pagingEnabled
//           onMomentumScrollEnd={event => {
//             const index = Math.floor(
//               Math.floor(event.nativeEvent.contentOffset.x) /
//                 Math.floor(event.nativeEvent.layoutMeasurement.width),
//             );
//             setIndexs(index);
//           }}
//           keyExtractor={item => item.id}
//           showsHorizontalScrollIndicator={false}
//           horizontal
//           renderItem={({item}) => {
//             return (
//               <View
//                 style={{
//                   width: WIDTH,
//                   height: HEIGHT - height,
//                 }}>
//                 {item.component}
//               </View>
//             );
//           }}
//         />
//       </SafeAreaView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: -1,
//     alignItems: 'flex-start',
//     // justifyContent: "space-between",
//   },
//   rightContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     alignContent: 'center',
//     justifyContent: 'flex-end',
//     position: 'absolute',
//     top: 10,
//     right: 0,
//     width: '20%',
//     paddingRight: 10,
//     zIndex: 1,
//   },
// });

// export default Swiper;

// {
//   /*
// Developer Note >>>>>>>>>>>>>>>>>>>>>>

// Usage Method >>>>>>>>>>>>>>>>>>>>>>>>>
// <Swiper
//   sourceNew={[
//     {
//       id: 2,
//       title: 'Home',
//       badge: '',
//       ref: React.createRef(),
//       component: <Qualifications />,
//     },
//     {
//       id: 3,
//       title: 'Social',
//       badge: '10',
//       ref: React.createRef(),
//       component: <DrugSocial />,
//     },
//   ]}
// />; */
// }

// import React, {useState} from 'react';
// import {
//   Animated,
//   Dimensions,
//   FlatList,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// import IconAntDesign from 'react-native-vector-icons/AntDesign';
// import {Color} from '../../../themes';
// const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;

// const Swiper = ({
//   source,
//   rightElementShow,
//   rightElement,
//   rightElementContainer,
// }) => {
//   const ref = React.useRef(null);
//   const [indexs, setIndexs] = React.useState(0);
//   const componentRef = React.useRef(null);
//   const [sourceN, setSourceN] = React.useState(source);
//   const [rightIcon, setRightIcon] = useState(rightElementShow);

//   React.useEffect(() => {
//     ref.current?.scrollToIndex({
//       index: indexs,
//       animated: true,
//       // if 0 : left, 1: right, 0.5 : middle
//       viewPosition: 1,
//     }),
//       [indexs];
//   });

//   return (
//     <View style={styles.container}>
//       {rightIcon ? (
//         <View style={[styles.rightContainer, rightElementContainer]}>
//           {rightElement}
//         </View>
//       ) : null}
//       <Animated.FlatList
//         ref={ref}
//         initialScrollIndex={indexs}
//         data={sourceN}
//         pagingEnabled
//         keyExtractor={item => item.id}
//         contentContainerStyle={{paddingLeft: 10}}
//         //style={{backgroundColor: Color.blue}}
//         showsHorizontalScrollIndicator={false}
//         horizontal
//         renderItem={({item, index}) => {
//           return (
//             <TouchableOpacity
//               onPress={() => {
//                 setIndexs(index);
//                 componentRef.current?.scrollToIndex({
//                   index: index,
//                   animated: true,
//                 });
//               }}>
//               <Animated.View
//                 style={{
//                   marginRight: 10, // if viewPosition is set to "0.5" & '1'
//                   //marginLeft: 10, // if viewPosition is set to "0"
//                   padding: 10,
//                   borderBottomWidth: 3,
//                   borderColor: index === indexs ? Color.WHITE : 'transparent',
//                 }}>
//                 <Text
//                   style={{
//                     fontWeight: '700',
//                     color: index === indexs ? Color.WHITE : Color.mildBlue,
//                   }}>
//                   {item.title}
//                 </Text>
//               </Animated.View>
//             </TouchableOpacity>
//           );
//         }}
//       />
//       <SafeAreaView style={{backgroundColor: Color.WHITE, flex: -1}}>
//         <FlatList
//           style={{flexGrow: 0}}
//           ref={componentRef}
//           data={sourceN}
//           pagingEnabled
//           onMomentumScrollEnd={event => {
//             const index = Math.floor(
//               Math.floor(event.nativeEvent.contentOffset.x) /
//                 Math.floor(event.nativeEvent.layoutMeasurement.width),
//             );
//             setIndexs(index);
//           }}
//           keyExtractor={item => item.id}
//           // contentContainerStyle={{paddingLeft: 10}}
//           showsHorizontalScrollIndicator={false}
//           horizontal
//           renderItem={({item}) => {
//             return (
//               <View
//                 // contentContainerStyle={{width: WIDTH}}
//                 style={{
//                   width: WIDTH,
//                   //height: HEIGHT,
//                   //flex: 1,
//                 }}>
//                 {item.component}
//               </View>
//             );
//           }}
//         />
//       </SafeAreaView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   // container: {
//   //   flex: 1,
//   //   backgroundColor: Color.white,
//   //   alignItems: 'center',
//   //   justifyContent: 'center',
//   // },
//   container: {
//     flex: -1,
//     backgroundColor: Color.midHighBlue,
//     alignItems: 'flex-start',
//     // justifyContent: "space-between",
//   },
//   rightContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     alignContent: 'center',
//     justifyContent: 'flex-end',
//     position: 'absolute',
//     top: 10,
//     right: 0,
//     width: '20%',
//     paddingRight: 10,
//     zIndex: 1,
//   },
// });

// export default Swiper;
