import {
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';

import Pinchable from 'react-native-pinchable'
import {Animated as AnimatedRN} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {Colors} from '../../../../themes';
import Animated, {
  Transition,
  Transitioning,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import ImageAutoScale from '../../../_components/imageProcessing/imageAutoScale';

import Video from 'react-native-video';

import getStyles from '../../utils/homeStyles';
import {ThemeContext} from '../../../../themes/components/ThemeContext';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { responsiveHeight, responsiveWidth } from '../../../../themes/ResponsiveDimensions';
import { Modal } from 'react-native';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

const Feed = ({
  item,
  index,
  onPressProfileImage,
  onPressShare,
  onPressBookmark,
  onPressComment,
  backgroundColor,
  textColor,

}) => {
  const len = item.feed.length;
  const [time,setTime] = useState(0);
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const [visible,setVisible] = useState(false);
  const Color = Colors(theme);
  const styles = getStyles(Color);
  const [bookmark, setbookmark] = useState(item.bookmark);
  const [like, setlike] = useState(item.like);
  const [verify, setverify] = useState(true);
  const [previewImages,setPreviewImages]=useState([]);
  const [currentCard, setCurrentcard] = useState(null);
  const expandRef = useRef(null);
  const navigation = useNavigation();
  const doubleClickRef = useRef(null);
  const ImageRef=useRef(null);
  const scaleAnimation = useRef(new AnimatedRN.Value(1)).current;
  const handlePress = () => {
    if (
      doubleClickRef.current &&
      doubleClickRef.current + 300 > new Date().getTime()
    ) {
      // Double-click logic
      handleLike();
      console.log('Double click event triggered');
    } else {
      // Single-click logic
      doubleClickRef.current = new Date().getTime();
    }
  };
  const scrollToImage=(index)=>{
    if(ImageRef.current)
   { ImageRef.current.scrollToOffset({ animated: true, offset: index*(WIDTH*0.95) });}
     else
    { console.log("NULLsd",ImageRef);}
  }
  const MAX_VISIBLE_DOTS = 5;
  // const PaginationDots = ({ totalDots, currentPage, onPressDot }) => {
  //   const start = Math.max(0, currentPage - Math.floor(MAX_VISIBLE_DOTS / 2));
  //   const end = Math.min(totalDots, start + MAX_VISIBLE_DOTS);
  
  //   const visibleDots = Array.from({ length: end - start }, (_, index) => start + index);
  
  //   return (
  //     <View style={{ flexDirection: 'row',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     marginTop: 10,}}>
  //       {visibleDots.map((index) => (
  //         <TouchableOpacity
  //           key={index}
  //           style={[
  //            { width: 10,
  //             height: 10,
  //             borderRadius: 5,
  //             marginHorizontal: 5,
  //             backgroundColor: 'gray',},
  //             currentPage === index && { backgroundColor: 'blue'},
  //             index === totalDots - 1 && { width: 6, // Adjust the width for the last dot
  //             height: 6, // Adjust the height for the last dot
  //             borderRadius: 3,},
  //           ]}
  //           onPress={() => onPressDot(index)}
  //         />
  //       ))}
  //     </View>
  //   );
  // };

  // const PaginationDots = ({ totalDots, currentPage, onPressDot }) => {
  //   const start = Math.max(0, currentPage - Math.floor(MAX_VISIBLE_DOTS / 2));
  //   const end = Math.min(totalDots, start + MAX_VISIBLE_DOTS);
  
  //   const visibleDots = Array.from({ length: end - start }, (_, index) => start + index);
  
  //   return (
  //     <View style={{  flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
  //     marginTop: 10,}}>
  //       {visibleDots.map((index, arrayIndex) => (
  //         <TouchableOpacity
  //           key={index}
  //           style={[ styles.paginationDot,
  //             currentPage === index && {  backgroundColor: 'blue'},
  //             arrayIndex === 0 && { width: 6, height: 6, borderRadius: 3,},
  //             arrayIndex === visibleDots.length - 1 && { width: 6,height: 6, borderRadius: 3,},
  //           ]}
  //           onPress={() => onPressDot(index)}
  //         />
  //       ))}
  //     </View>
  //   );
  // };
  
  const PaginationDots = ({ totalDots, currentPage, onPressDot }) => {
    const maxVisibleDots = totalDots;
    const isMoreThanMaxDots = totalDots > maxVisibleDots;
    const start = isMoreThanMaxDots
      ? Math.max(0, currentPage - Math.floor(maxVisibleDots / 2))
      : 0;
    const end = isMoreThanMaxDots
      ? Math.min(totalDots, start + maxVisibleDots)
      : totalDots;
  
    const visibleDots = Array.from({ length: end - start  }, (_, index) => start + index);
    const highlightMiddleDot = isMoreThanMaxDots && currentPage >= 2 && currentPage <= totalDots - 3;
  
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}
      >
        {totalDots > 5 ?(end-start == 3 ? (<>
          <TouchableOpacity  style={[{ width: 4, height: 4 ,  backgroundColor: 'gray',}]}>
          </TouchableOpacity>
          <TouchableOpacity  style={[{width: 4, height: 4,   backgroundColor: 'gray',}]}>
          </TouchableOpacity>
          </>):(end-start == 4 && <>
            <TouchableOpacity  style={[{ width: 4, height: 4,   backgroundColor: 'gray',}]}>
          </TouchableOpacity>
          </>)):(<></>)}
        {visibleDots.map((index, arrayIndex) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paginationDot,
              currentPage === index && { backgroundColor: 'blue' },
              (arrayIndex === 0 || arrayIndex === maxVisibleDots - 1) && !highlightMiddleDot
                ? { width: 4, height: 4}
                : { width: 4, height: 4 },
              highlightMiddleDot && arrayIndex === Math.floor(maxVisibleDots / 2)
                ? { width: 4, height: 4 }
                : null,
            ]}
            onPress={() => onPressDot(index)}
          />
        ))}
      </View>
    );
  };
  
  const [duration,setDuration] = useState(0);

  const handleLike = async () => {
    // const newLikeObj = {
    // tag_id: like ? 6 : 5,
    // tag_name: like ? 'dislike' : 'like',
    //   entity_type_id: 1,
    //   entity_type: 'social',
    //   eh_entity_id: 1,
    //   Authorization: 'Bearer ' + token,
    // }
    // const response = await likePost(newLikeObj);
    // if (response.status === 200) {
    setlike(!like);
    // Start the scale animation
    AnimatedRN.sequence([
      AnimatedRN.timing(scaleAnimation, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      AnimatedRN.timing(scaleAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    // setCurrentcard(response.data);
    // }
  };
  const handleBookmark = async () => {
    if(!bookmark){
      onPressBookmark()
    }
    setbookmark(!bookmark);
  
  };
  const [scrolledPastThreshold, setScrolledPastThreshold] = useState(false);
  const handleShare = async () => {
    console.log('share');
  };
  useEffect(()=>{
    const item = [{}];
    item.map((item,index)=>{
      console.log(item)
    })
  },[])

  const scrollViewRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event) => {
    const { contentOffset } = event.nativeEvent;
    const page = contentOffset.x / WIDTH;
    
    setCurrentPage(Math.ceil(page));
  };

  const scrollToPage = (pageIndex) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: pageIndex * WIDTH ,
        animated: true,
      });
    }
  };
  const dotSpacing = item.feed.length > 5 ? 360 / item.feed.length : 60; // Adjust the spacing based on data length

  const [scrollPosition, setScrollPosition] = useState(new Animated.Value(0));
  const [contentWidth, setContentWidth] = useState(0);
  const deviceWidth = Dimensions.get('window').width;

  const handleScroll = event => {
    const { contentOffset, contentSize } = event.nativeEvent;
    setScrollPosition(new Animated.Value(contentOffset.x));
    setContentWidth(contentSize.width);
  };

  // useEffect(() => {
  //   if (videoPlayer && videoPlayer.current) {
  //     videoPlayer.current?.getCurrentTime((time) => {
  //       console.log(time)
  //     });

  //     videoPlayer.current?.getDuration((duration) => {
  //       console.log("JHBIGJGJGJHGJHGJHGJHG",duration)
  //     });
  //   }
  // }, []);

  const calculateProgressBarWidth = () => {
    const progress = scrollPosition.interpolate({
      inputRange: [0,currentPage],
      outputRange: [responsiveWidth(((1)/len)*95), responsiveWidth(((currentPage+1)/len)*95)],
      extrapolate: 'clamp',
    });
    return { width: progress };
  };

  const calculateProgress = () => {
    console.log(responsiveWidth(((time)/(duration+1))*95));
    // const progress = scrollPosition.interpolate({
    //   inputRange: [0,time],
    //   outputRange: [0, responsiveWidth(((time)/(duration+1))*95)],
    //   extrapolate: 'clamp',
    // });
    return { width:  responsiveWidth(((time)/(duration+1))*95)};
  };

  const videoPlayer = useRef(null);

  const calculateProgressBarWidths = () => {
    const progress = scrollPosition.interpolate({
      inputRange: [0,currentPage],
      outputRange: [0, responsiveWidth(((currentPage)/len)*95)],
      extrapolate: 'clamp',
    });
    return { width: progress };
  };



  return (
    <View style={{...styles.feedContainer}}>
      <Pressable onPress={handlePress}>
        {item.mediaType === 'image' ? 
        (<>
          <ScrollView 
          ref={scrollViewRef}
          indicatorStyle='black'
          horizontal
          pagingEnabled
          onScroll={handleScroll}
          showsHorizontalScrollIndicator={true}
          onMomentumScrollEnd={handlePageChange}
          >
            {
          item.feed.map((data,index) =>{
          
         return (
          <View key={index}>
          <Pressable onPress={()=>{
            scrollToImage(index);
            setVisible(true);
            console.log(index,"SHJ");
            key = {index}
          }}>
          <Pinchable>
          <ImageAutoScale
            key={index}
            source={{uri: data}}
            width={WIDTH * 0.95}
            height={responsiveHeight(40)}
      
          />
          </Pinchable>
          </Pressable>
          </View>
          
          )
            
          })
        }
        <Modal visible={visible}  onRequestClose={()=>{setVisible(false)}}
         style={{alignContent:'center',justifyContent:'center',backgroundColor:'black'}}>
          <FlatList
           ref={ImageRef}
           data={item.feed}
           horizontal 
           pagingEnabled
           keyExtractor={(item) => item.id}
           renderItem={(data)=>{
            const srcs=data.item;
            return(
              <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'black'}}>
              <Pinchable>
              <ImageAutoScale
              key={data.index}
              source={{uri:srcs}}
              width={responsiveWidth(100)}
              resizeMode='stretch'
              height={responsiveHeight(50)}
              />
              </Pinchable>
              </View>
            )
           }}
          />
         
          </Modal>
          </ScrollView> 
          {item.feed.length > 1 &&
  //         <PaginationDots
  //   totalDots={item.feed.length}
  //   currentPage={currentPage}
  //   onPressDot={scrollToPage}
  // />
  <View style={styles.progressBarContainer}>
  <Animated.View style={[styles.progressBar, calculateProgressBarWidth(),{backgroundColor:'#0f0f0f'}]} />
  <Animated.View style={[styles.progressBar, calculateProgressBarWidths(),{position:'absolute',backgroundColor:'grey'}]} />
  </View>

          }
          
          {/* <View style={styles.pagination}>
          {item.feed.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.paginationDot,
                currentPage === index && styles.activeDot,
              ]}
              onPress={() => scrollToPage(index)}
            />
          ))}
        </View> */}
        </>
        ): (
          <Pressable onPress={()=>{console.log(navigation.navigate('VideoFeed',{data:item}))}}>
          <>
          <Video
            source={{uri: item?.feed}}
            ref={videoPlayer}
            resizeMode="cover"
            onProgress={(data)=>{setTime(data.currentTime)}}
            onLoadStart={()=>{console.log('Loading startred')}}
            onLoad={(data)=>{setDuration(data.duration)}}
            paused
            style={{
              width: WIDTH * 0.95,
              height: HEIGHT / 2,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            playInBackground = {false}
            thumbnail={{uri: 'https://i.picsum.photos/id/866/1600/900.jpg'}}
          />
          
          <View style={styles.progressBarContainer}>
          <Animated.View style={[styles.progressBar, calculateProgress(),{backgroundColor:'red'}]} />
          {/* <Animated.View style={[styles.progressBar, calculateProgressBarWidths(),{position:'absolute',backgroundColor:'grey'}]} /> */}
        </View>
        </>
        </Pressable>
        )}
      </Pressable>

      <View style={{padding: 10}}>
        <View style={styles.feedIconContainer}>
          <TouchableOpacity onPress={()=>{handleBookmark()
            }}>
            <Image
              source={
                bookmark
                  ? require('../../assets/icons/bookmarkActive.png')
                  : require('../../assets/icons/bookmarkActive.png')
              }
              style={[
                styles.icon28,
                {
                  tintColor: bookmark
                    ? Color.feedIconActive
                    : Color.feedIconInactive,
                },
              ]}
            />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              width: WIDTH * 0.4,
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity onPress={onPressShare}>
              <Image
                source={require('../../assets/icons/shareBold.png')}
                style={styles.icon28}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressComment}>
              <Image
                source={require('../../assets/icons/messageBold.png')}
                style={styles.icon28}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLike}>
              <AnimatedRN.Image
                source={
                  like
                    ? require('../../assets/icons/heartActive.png')
                    : require('../../assets/icons/heartActive.png')
                }
                style={[
                  styles.icon28,
                  {
                    transform: [{scale: scaleAnimation}],
                    tintColor: like
                      ? Color.feedIconlike
                      : Color.feedIconInactive,
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={{
            textAlign: 'right',
            color: Color.feedTextSecondary,
            fontWeight: '600',
          }}>
          {item?.likes} <Text style={{fontWeight: '300'}}>likes</Text>
        </Text>
      </View>

      <View style={styles.userContainer}>
        <TouchableOpacity onPress={onPressProfileImage}>
          <View style={styles.avatar}>
            <Image
              source={{uri: item?.profileImage}}
              style={{width: '100%', height: '100%', borderRadius: 100}}
              resizeMode="cover"
            />
          </View>
          {verify ? (
            <Image
              source={require('../../assets/icons/verify.png')}
              style={styles.verifybadge}
            />
          ) : null}
        </TouchableOpacity>
        <View style={{paddingLeft: 15, flex: 1}}>
          <Text style={styles.feedTitle}>{item.title}</Text>
          <Text style={styles.feedSubtitle}>{item.subTitle}</Text>
        </View>
      </View>


      <View
        style={{
          paddingHorizontal: 10,
          paddingBottom: 5,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {item?.hasTags.map((tag, index) => {
          return (
            <Text
              key={index}
              style={{
                paddingRight: 10,
                fontWeight: '400',
                color: Color.feedHashtag,
              }}>
              {tag}
            </Text>
          );
        })}
      </View>



      <Transitioning.View
        transition={transition}
        ref={expandRef}
        //style={{ flex: 1 }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            expandRef.current.animateNextTransition();
            setCurrentcard(index === currentCard ? null : index);
            console.log("CURRENT CARD",currentCard);
          }}
          style={{paddingHorizontal: 10, flexGrow: 1}}>
          <View
            style={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {index !== currentCard && (
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '700',
                  color: Color.feedTextReadInactive,
                }}
                ellipsizeMode="tail"
                numberOfLines={2}>
                {/* {item?.title}{' '} */}
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    lineHeight: 19,
                  }}
                  ellipsizeMode="tail"
                  numberOfLines={2}>
                  {item?.description}
                </Text>
              </Text>
            )}

            {index === currentCard && (
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '700',
                    color: Color.feedTextTitle,
                  }}>
                  {/* {item?.title}{' '} */}
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '400',
                      lineHeight: 19,
                    }}
                    ellipsizeMode="tail"
                    // numberOfLines={2}
                  >
                    {item?.description}
                  </Text>
                </Text>
              </View>
            )}
          </View>

          <Pressable style={{marginTop: 8}}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '600',
                color: Color.feedComments,
              }}>
              view all 100 comments
            </Text>
          </Pressable>
        </TouchableOpacity>
      </Transitioning.View>

      <View style={{marginLeft: 10, marginBottom: 5}}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '500',
            color: Color.feedTime,
          }}>
          {moment(item?.publishedAt || moment.now()).fromNow()}
        </Text>
      </View>
    </View>
  );
};

export default Feed;
