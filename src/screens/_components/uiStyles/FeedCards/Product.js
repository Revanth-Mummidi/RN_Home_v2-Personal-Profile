import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {Colors} from '../../../../themes';
import {useNavigation} from '@react-navigation/native';
import Animated, {Transition, Transitioning} from 'react-native-reanimated';
import ImageAutoScale from '../../imageProcessing/imageAutoScale';
import {ThemeContext} from '../../../../themes/components/ThemeContext';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

const Product = ({item, index}) => {
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  const styles = getStyles(Color);
  const [currentCard, setCurrentcard] = useState(null);
  const expandRef = useRef(null);
  const navigation = useNavigation();
  const [bookmark, setbookmark] = useState(false);
  const [like, setlike] = useState(false);
  const [cart, setCart] = useState(false);
  const [verify, setverify] = useState(true);
  var feedBackground = Color.feedBackground;
  var feedIconInactive = Color.feedIconInactive;
  var feedIconActive = Color.feedIconActive;
  var feedTextLike = Color.feedTextLike;
  var feedIconlike = Color.feedIconlike;
  var feedTextTitle = Color.feedTextTitle;
  var feedTextSecondary = Color.feedTextSecondary;
  var feedHashtag = Color.feedHashtag;
  var feedButton = Color.feedButton;
  var feedButtonIcon = Color.feedButtonIcon;
  var feedButtonText = Color.feedButtonText;

  // var feedTextRead = '#78858F';
  // var feedTextReadInactive = '#536470';
  // var feedComments = '#78858F';
  // var feedTime = '#a3b3bf';
  return (
    <Pressable
      key={index}
      onPress={() => {
        navigation.navigate(item.stackNav, {screen: item.screen});
      }}
      style={{
        alignItems: 'center',
        padding: 10,
      }}>
      <View style={{}}>
        <ImageAutoScale
          source={{uri: item?.feed}}
          width={WIDTH * 0.95}
          style={{borderTopLeftRadius: 10, borderTopRightRadius: 10}}
        />
        <View
          style={{
            ...styles.headerContainer,
            justifyContent: 'space-between',
            backgroundColor: feedBackground,
          }}>
          <TouchableOpacity
            onPress={() => {
              setbookmark(!bookmark);
            }}
            style={{...styles.iconContainer, marginRight: 14}}>
            <Image
              source={require('../../assets/icons/bookmarkActive.png')}
              style={{
                ...styles.icon,
                resizeMode: 'contain',
                tintColor: bookmark ? feedIconActive : feedIconInactive,
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TouchableOpacity style={styles.iconContainer}>
              <Image
                source={require('../../assets/icons/shareBold.png')}
                style={{...styles.icon, tintColor: Color.feedIconInactive}}
              />
            </TouchableOpacity>
            {item?.showComment ? (
              <TouchableOpacity style={styles.iconContainer}>
                <Image
                  source={require('../../assets/icons/messageBold.png')}
                  style={{...styles.icon, tintColor: Color.feedIconInactive}}
                />
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              onPress={() => {
                setlike(!like);
              }}
              style={{
                // marginLeft: 10,
                borderRadius: 20,
                paddingHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/icons/heartActive.png')}
                style={{
                  ...styles.icon,
                  resizeMode: 'contain',
                  marginRight: 5,
                  tintColor: like ? feedIconlike : feedIconInactive,
                }}
              />
              <Text style={{color: feedTextLike}}>{item?.likes}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            backgroundColor: feedBackground,
            padding: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <TouchableOpacity>
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
            <View style={{paddingLeft: 14, flex: 1}}>
              <Text style={{...styles.profileName, color: feedTextTitle}}>
                {item.product}
              </Text>
              <Text style={{...styles.subTitle, color: feedTextSecondary}}>
                {item.subTitle}
              </Text>
            </View>
          </View>
          <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
            {item.keywords.map(keyword => (
              <Text
                style={{
                  borderRadius: 5,
                  paddingRight: 10,
                  paddingVertical: 2,
                  color: feedHashtag,
                  alignItems: 'center',
                  fontWeight: '700',
                }}>
                {keyword}
              </Text>
            ))}
          </View>

          <Transitioning.View transition={transition} ref={expandRef}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                expandRef.current.animateNextTransition();
                setCurrentcard(index === currentCard ? null : index);
                console.log(currentCard);
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {index !== currentCard && (
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '700',
                      color: feedTextSecondary,
                    }}
                    ellipsizeMode="tail"
                    numberOfLines={2}>
                    {item?.genericName}{' '}
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: feedTextSecondary,
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
                      {item?.genericName}{' '}
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '400',
                          color: Color.mediumGray,
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
            </TouchableOpacity>
          </Transitioning.View>

          {item?.showCart ? (
            <TouchableOpacity
              onPress={() => {
                setCart(!cart);
              }}
              style={{
                height: 40,
                backgroundColor: feedButton,
                borderRadius: 10,
                paddingHorizontal: 15,
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-end',
                marginVertical: 10,
                marginRight: 10,
              }}>
              <Image
                source={
                  cart
                    ? require('../../assets/icons/bag-2.png')
                    : require('../../assets/icons/bag-2Inactive.png')
                }
                style={{
                  ...styles.icon,
                  tintColor: feedButtonIcon,
                  resizeMode: 'contain',
                  marginRight: 5,
                }}
              />
              <Text style={{color: feedButtonText}}>Cart</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
};

export default Product;
const getStyles = Color => {
  const style = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 50,
      // backgroundColor: Color.aquaBlue,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      width: 23,
      height: 23,
      tintColor: Color.blue,
    },
    avatar: {
      width: 40,
      height: 40,
    },
    profileName: {
      color: Color.blue,
      fontWeight: '800',
      fontSize: 15,
      letterSpacing: 0.8,
    },
    subTitle: {
      fontSize: 13,
      fontWeight: '700',
      color: Color.lightGray,
    },
  });
  return style;
};
