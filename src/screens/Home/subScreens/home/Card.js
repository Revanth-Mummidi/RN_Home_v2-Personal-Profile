import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from 'react-native';
import React,{useState} from 'react';
import {Color} from '../../../../themes';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import { responsiveHeight, responsiveWidth } from '../../../../themes/ResponsiveDimensions';
import SwipeableBarIOS from '../../../_components/userInteractions/SwipeableBar';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TouchableOpacity } from 'react-native-gesture-handler';
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const CARD_HEIGHT = HEIGHT / 1.2;

const Card = ({
  product: { color1, stackNav, navScreen, icon, company, segment, picture, section, keywords, type},know
}) => {
  const navigation = useNavigation();
  console.log("key is ",know)
  const [isMuted, setIsMuted] = useState(false);
  const [pause,setPause] = useState(true);
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  const paused = () =>{setPause(!pause) }
  return (
    <Pressable
      onPressIn={()=>{setPause(true)}}
      onPressOut={()=>{setPause(false)}}
      onPress={() => {
      console.log("ihihi")
        // navigation.navigate(stackNav, {screen: navScreen})
      }}
      style={styles.container}>
      <View style={{ height: HEIGHT, width: WIDTH,}}>
        {
        type == 'photo'?
        (  
        <ImageBackground
          source={{uri: picture}}
          resizeMode="cover"
          style={{flex: 1}}
          imageStyle={{
            flex: 1,
            // height: CARD_HEIGHT - 50, //Card style
            // borderRadius: 20, //Card style
          }}>
          <View style={styles.iconContainer}>
            <LinearGradient
              colors={[
                'rgba(164, 164, 164, 0.4)',
                'rgba(192, 192, 192, 0.2)',
                ' rgba(192, 192, 192, 0.1)',
                'transparent',
              ]}
              start={{x: 0, y: 0.5}}
              end={{x: 0, y: 1}}
              locations={[0, 0.6, 0.8, 1]}
              style={{
                flex: 1,
                padding: 10,
                // borderRadius: 20, //Card style
              }}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 17,
                  fontWeight: '700',
                  color: Color.common_WHITE,
                }}>
                {section}{' '}
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: Color.common_WHITE,
                  }}>
                  {keywords}
                </Text>
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  padding: 10,
                }}>
                <Image
                  source={{uri: icon}}
                  resizeMode={'cover'}
                  style={styles.icon}
                />
                <View style={{marginLeft: 8, paddingBottom: 10}}>
                  <Text style={styles.iconTitle}>{company}</Text>
                  <Text style={styles.iconSubtitle}>{segment}</Text>
                </View>
              </View>
              {
          <View style={{position:'absolute',bottom:responsiveHeight(15)}}>
            
            {
          know == 0 && (  <SwipeableBarIOS customStyle={{height:responsiveHeight(50),width:responsiveWidth(100)}}/>)
            }
          </View>
        }
            </LinearGradient>
          </View>
        </ImageBackground>
        ):
        (
        <>
        <View>
         
         <Video 
         resizeMode='stretch'
         source={{uri:picture}}
         style = {{height:responsiveHeight(100),width:responsiveWidth(100)}}
         paused = {pause}
         repeat
         playInBackground = {false}
         muted={isMuted}
         />
          <View style={{position:'absolute',top:responsiveHeight(1),width:responsiveWidth(100)}}>
          <Text
                numberOfLines={1}
                style={{
                  fontSize: 17,
                  fontWeight: '700',
                  color: Color.common_WHITE,
                }}>
                {section}{' '}
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: Color.common_WHITE,
                  }}>
                  {keywords}
                </Text>
          </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  padding: 10,
                  width:responsiveWidth(100),
                  justifyContent:'space-between'
                }}>
                  <View style={{ flexDirection: 'row',}}>
                <Image
                  source={{uri: icon}}
                  resizeMode={'cover'}
                  style={styles.icon}
                />
                <View style={{marginLeft: 8, paddingBottom: 10}}>
                  <Text style={styles.iconTitle}>{company}</Text>
                  <Text style={styles.iconSubtitle}>{segment}</Text>
                </View>
                </View>
                <TouchableOpacity style={{}} onPress={toggleMute}>
                      <Icon name={isMuted ? 'volume-mute' : 'volume-up'} size={30} color="white" />
              </TouchableOpacity>
              </View>
             
          </View>
         
         {
          <View style={{position:'absolute',bottom:responsiveHeight(20)}}>
            {know == 0 && (  <SwipeableBarIOS customStyle={{height:responsiveHeight(50),width:responsiveWidth(100)}}/>) }
          </View>
        }

                 

         </View>
        </>
        )
        }
        
      </View>
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    //height: CARD_HEIGHT / 1.5,
    height: CARD_HEIGHT,
  },
  iconContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    flexDirection: 'row',
  },
  icon: {width: 35, height: 35, borderRadius: 50},
  iconTitle: {fontSize: 14, fontWeight: '600', color: Color.white},
  iconSubtitle: {fontSize: 11, fontWeight: '500', color: Color.white},
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: Color.WHITE,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: Color.WHITE,
  },
});
