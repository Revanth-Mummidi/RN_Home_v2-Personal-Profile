import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  Text,
  View,
  Pressable,
  Image,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Color} from '../../../../themes';
import {useNavigation} from '@react-navigation/native';
import VideoPlayer from '../../../_components/video/videoPlayer';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const CARD_HEIGHT = (WIDTH * 880) / 407;
const Test2 = () => {
  const navigation = useNavigation();
  return (
    <View>
      {tracker.map((item, index) => {
        return (
          <Pressable
            key={index}
            onPress={() => {
              navigation.navigate(item.navigateStack, {
                screen: item.navigateScreen,
              });
            }}>
            <View style={{height: HEIGHT, width: WIDTH}}>
              <ImageBackground
                source={{uri: item?.url}}
                // imageStyle={{
                //   resizeMode: 'cover',
                // }}
                // style={{
                //   width: '100%',
                //   height: '100%',
                // }}
                style={{flex: 1}}>
                <View style={styles.iconContainer}>
                  <LinearGradient
                    colors={[
                      'rgba(0,0,0,0.5)',
                      'rgba(0,0,0,0.3)',
                      'transparent',
                    ]}
                    start={{x: 0, y: 0.5}}
                    end={{x: 0, y: 1}}
                    locations={[0, 0.6, 1]}
                    style={{
                      flex: 1,
                      //flexDirection: 'row',
                      padding: 10,
                    }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 20,
                        fontWeight: '700',
                        color: Color.WHITE,
                      }}>
                      {item?.section}{' '}
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '400',
                          color: Color.WHITE,
                        }}>
                        {item?.keywords}
                      </Text>
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        padding: 10,
                      }}>
                      <Image
                        source={{uri: item?.logo}}
                        resizeMode={'cover'}
                        style={styles.icon}
                      />
                      <View style={{marginLeft: 8}}>
                        <Text style={styles.iconTitle}>{item?.company}</Text>
                        <Text style={styles.iconSubtitle}>{item?.segment}</Text>
                      </View>
                    </View>
                  </LinearGradient>
                </View>
              </ImageBackground>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default Test2;

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    flexDirection: 'row',
  },
  icon: {width: 35, height: 35, borderRadius: 50, backgroundColor: Color.WHITE},
  iconTitle: {fontSize: 14, fontWeight: '600', color: Color.white},
  iconSubtitle: {fontSize: 11, fontWeight: '500', color: Color.white},
});

const tracker = [
  {
    id: 1,
    url: 'https://i.ytimg.com/vi/pEu-516JpAw/maxresdefault.jpg',
    logo: 'https://image3.mouthshut.com/images/imagesp/925020869s.jpg',
    company: 'Care Hospital',
    segment: 'Hospital',
    section: 'Tracker',
    keywords: '#Nausea #Sleeplessness',
    navigateStack: 'CompanyStack',
    navigateScreen: 'CompanyLanding',
  },
];
