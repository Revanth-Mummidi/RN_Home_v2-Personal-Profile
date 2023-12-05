import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {Color} from '../../../../themes';
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

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

const Social = ({
  item,
  index,
  onPressProfileImage,
  backgroundColor,
  textColor,
}) => {
  const [bookmark, setbookmark] = useState(false);
  const [like, setlike] = useState(false);
  const [verify, setverify] = useState(true);
  const [currentCard, setCurrentcard] = useState(null);
  const expandRef = useRef(null);
  const navigation = useNavigation();
  return (
    <View style={{...styles.Container}}>
      <Pressable
        onPress={() => {
          navigation.navigate('CommentScreen');
        }}>
        {/* <View style={{...styles.feedContainer}}>
        <Image
          source={{uri: item?.feed}}
          style={styles.feeds}
          resizeMode={'cover'}
        />
      </View> */}
        <ImageAutoScale
          source={{uri: item?.feed}}
          width={WIDTH * 0.95}
          style={{borderTopLeftRadius: 10, borderTopRightRadius: 10}}
        />
        <View
          style={{...styles.headerContainer, justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => {
              setbookmark(!bookmark);
            }}>
            <Image
              source={
                bookmark
                  ? require('../../assets/icons/bookmarkActive.png')
                  : require('../../assets/icons/bookmark.png')
              }
              style={{
                ...styles.icon,
                resizeMode: 'contain',
                tintColor: bookmark ? Color.blue : Color.mediumGray,
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              width: WIDTH * 0.4,
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity>
              <Image
                source={require('../../assets/icons/share.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../../assets/icons/message.png')}
                style={styles.icon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setlike(!like);
              }}>
              <Image
                source={
                  like
                    ? require('../../assets/icons/heartActive.png')
                    : require('../../assets/icons/heartInactive.png')
                }
                style={{...styles.icon, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{...styles.headerContainer}}>
          <TouchableOpacity onPress={onPressProfileImage}>
            <View style={styles.avatar}>
              <Image
                source={{uri: item?.profileImage}}
                //source={require('../../assets/images/Temp/Hetero_New_Logo-Colour-Transparent.png')}
                style={{width: '100%', height: '100%', borderRadius: 100}}
                resizeMode="cover"
              />
            </View>
            {verify ? (
              <Image
                source={require('../../assets/icons/verify.png')}
                style={{
                  position: 'absolute',
                  bottom: -5,
                  right: -8,
                  width: 16,
                  height: 16,
                  tintColor: Color.forestgreen,
                }}
              />
            ) : null}
          </TouchableOpacity>
          <View style={{paddingLeft: 10, flex: 1}}>
            <Text style={styles.profileName}>{item.title}</Text>
            <Text style={styles.subTitle}> {item.subTitle}</Text>
          </View>
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
              console.log(currentCard);
            }}
            style={{marginLeft: 10, flexGrow: 1}}>
            <View
              style={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {index !== currentCard && (
                <Text
                  style={{fontSize: 15, fontWeight: '700', color: 'black'}}
                  ellipsizeMode="tail"
                  numberOfLines={2}>
                  {item?.title}{' '}
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '400',
                      color: Color.gray,
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
                    style={{fontSize: 15, fontWeight: '700', color: 'black'}}>
                    {item?.title}{' '}
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: Color.gray,
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

            <View style={{}}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '600',
                  color: Color.lightGray,
                }}>
                view all 100 comments
              </Text>
            </View>
          </TouchableOpacity>
        </Transitioning.View>

        <View style={{marginLeft: 10, marginBottom: 5}}>
          <Text
            style={{fontSize: 12, fontWeight: '500', color: Color.lightGray}}>
            {moment(item?.publishedAt || moment.now()).fromNow()}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Social;

const styles = StyleSheet.create({
  Container: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Color.WHITE,
    marginTop: 20,
    paddingBottom: 10,
    width: WIDTH * 0.95,
    // marginHorizontal: 10,
    borderRadius: 10,
    flexGrow: 1,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  feeds: {
    width: '100%',
    height: '100%',
  },
  avatar: {
    width: 40,
    height: 40,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
    //width: '95%',
  },
  subTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Color.lightGray,
  },

  icon: {
    width: 28,
    height: 28,
  },
  feedContainer: {
    //height: 400,
    width: '100%',
    maxHeight: HEIGHT / 1.4,
  },
});
