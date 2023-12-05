{
  /* ******************** Developer Note ******************** 
      ToDo:
        1. Header to goBack.
        2. 'Color3' brighther backgrounds makes the text hard to read. 
        3. 
    */
}
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ImageColors from 'react-native-image-colors';
import LinearGradient from 'react-native-linear-gradient';

import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
// import {Color} from '../../../../themes';
import {useSelector} from 'react-redux';
import {getColor} from '../../../../themes/GetColor';
// import IconEntypo from 'react-native-vector-icons/Entypo';
//const image = require('../../../assets/images/temp/profile-modi.jpeg');
const initialState = {
  colorOne: {value: '', name: ''},
  colorTwo: {value: '', name: ''},
  colorThree: {value: '', name: ''},
  colorFour: {value: '', name: ''},
  colorFive: {value: '', name: ''},
  colorSix: {value: '', name: ''},
  colorSeven: {value: '', name: ''},
  colorEight: {value: '', name: ''},
  rawResult: '',
};

const PublicApercu = ({data = [], imageURL}) => {
  const Color = getColor(useSelector(state => state.theme.theme));
  const [colors, setColors] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const styles = getStyles();
  const slider=getSlider();
  var color1 = colors.colorSeven.value;
  var color2 = colors.colorSix.value;
  var color3 = colors.colorEight.value;
  const linearColors = [color1, color1, 'rgba(0, 0, 0, 0.8)'];
  const [image, setImage] = useState(
    (imageURL = require('../../assets/images/Svante_Paabo_nobelPrizeMedicine.jpeg')),
  );
  const [fullTalksAbout, setFullTalksAbout] = useState(false);

  useEffect(() => {
    const fetchColors = async () => {
      const result = await ImageColors.getColors(image, {
        fallback: '#000000',
        quality: 'low',
        pixelSpacing: 5,
        cache: true,
        headers: {
          authorization: 'Basic 123',
        },
      });

      switch (result.platform) {
        case 'android':
        case 'web':
          setColors({

            // colorOne: {value: result.lightVibrant, name: 'lightVibrant'},
            // colorTwo: {value: result.dominant, name: 'dominant'},
            // colorThree: {value: result.vibrant, name: 'vibrant'},
            // colorFour: {value: result.darkVibrant, name: 'darkVibrant'},

            colorOne: {value: result.dominant, name: 'dominant'},
            colorTwo: {value: result.average, name: 'average'},
            colorThree: {value: result.vibrant, name: 'vibrant'},
            colorFour: {value: result.darkVibrant, name: 'darkVibrant'},
            colorFive: {value: result.lightVibrant, name: 'lightVibrant'},
            colorSix: {value: result.darkMuted, name: 'darkMuted'},
            colorSeven: {value: result.lightMuted, name: 'lightMuted'},
            colorEight: {value: result.muted, name: 'muted'},
            rawResult: JSON.stringify(result),
          });
          break;
        case 'ios':
          setColors({
            colorOne: {value: result.background, name: 'background'},
            colorTwo: {value: result.detail, name: 'detail'},
            colorThree: {value: result.primary, name: 'primary'},
            colorFour: {value: result.secondary, name: 'secondary'},
            rawResult: JSON.stringify(result),
          });
          break;
        default:
          throw new Error('Unexpected platform');
      }

      setLoading(false);
    };

    fetchColors();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  }

  const userLinks = index => {
    alert('Props to set itemlevel');
  };

  return (
    <LinearGradient
      colors={linearColors}
      start={{x: 0.5, y: 0.5}}
      locations={[0, 0, 0.73]}
      style={styles.linear}>
      {data.slice(0, 1).map((item, index) => {
        return (
          <View key={index} style={{paddingHorizontal: 10}}>
            <View style={{paddingTop: 20}}>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  marginBottom: 10,
                  tintColor: color3,
                }}
                source={require('../../assets/icons/arrow-left.png')}
              />
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../../assets/icons/heartInactive.png')}
                  style={{
                    ...styles.smallIcon,
                    tintColor: color3,
                  }}
                />
                <Text style={{color: color3}}>{item.followers} followers</Text>
              </View>

              <View style={{...styles.dualButton, borderColor: color3}}>
                <Pressable
                  onPress={() => {
                    alert('follow Pressed');
                  }}
                  style={styles.buttonStyle}>
                  <Text style={{color: color3}}>Follow</Text>
                </Pressable>
                <Text style={{color: color3}}>|</Text>
                <Pressable
                  onPress={() => {
                    alert('share Pressed');
                  }}
                  style={styles.buttonStyle}>
                  <Text style={{color: color3}}>Share</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.profileContainer}>
              <Image
                source={image}
                style={styles.profileImage}
                resizeMode={'cover'}
              />
              <Image
                source={require('../../assets/icons/verify.png')}
                style={styles.blueTick}
              />
            </View>

            <View>
              <Text numberOfLines={1} style={styles.salutation}>
                {item.salutation}
              </Text>
              <Text numberOfLines={1} style={styles.name}>
                {item.name}
              </Text>
              <Text style={styles.readText}>{item.speciality}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../../assets/icons/location.png')}
                  style={{width: 13, height: 13, marginRight: 4}}
                />
                <Text style={styles.readText}>{item.Locations}</Text>
              </View>

              <Pressable
                onPress={() => {
                  setFullTalksAbout(!fullTalksAbout);
                }}>
                <Text
                  numberOfLines={fullTalksAbout ? 0 : 2}
                  style={{
                    ...styles.readText,
                    marginTop: 10,
                    lineHeight: 20,
                  }}>
                  <Text style={{fontWeight: '700'}}>Talks about</Text>
                  {item.talks}
                </Text>
              </Pressable>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                paddingVertical: 20,
              }}>
              {slider.map((item, index) => {
                return (
                  <Pressable
                    key={index}
                    onPress={index => {
                      userLinks(index);
                    }}
                    style={{
                      alignItems: 'center',
                      paddingHorizontal: 10,
                      marginHorizontal: 2,
                      justifyContent: 'center',
                    }}>
                    <Text style={{textAlign: 'center'}}>{item.icon}</Text>
                    <Text style={{color: Color.WHITE}}>{item.subTitle}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        );
      })}
    </LinearGradient>
  );
};

export default PublicApercu;
const getStyles = () => {
  const Color = getColor(useSelector(state => state.theme.theme));
  const styles = StyleSheet.create({
    linear: {flex: 1},
    profileContainer: {
      alignSelf: 'flex-end',
      paddingRight: 37,
    },
    profileImage: {
      width: 130,
      height: 130,
      borderRadius: 100,
      borderWidth: 3,
      borderColor: Color.WHITE,
    },
    blueTick: {
      position: 'absolute',
      bottom: 0,
      right: 37,
      width: 22,
      height: 22,
      tintColor: Color.darkgreen,
    },
    // contentContainer: {
    //   // position: 'absolute',
    //   // top: 40,
    //   // paddingHorizontal: 10,
    //   // height: '100%',
    //   // width: '100%',
    // },
    smallIcon: {
      width: 20,
      height: 20,
      marginRight: 5,
      marginBottom: 5,
    },
    dualButton: {
      width: 125,
      alignItems: 'center',
      alignSelf: 'flex-start',
      flexDirection: 'row',
      borderWidth: 1,
      borderRadius: 10,
    },
    buttonStyle: {
      width: '50%',
      paddingHorizontal: 10,
      paddingVertical: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    salutation: {fontSize: 26, fontWeight: '500', color: Color.WHITE},
    name: {fontSize: 31, fontWeight: 'bold', color: Color.WHITE},
    readText: {fontSize: 14, color: Color.white},
  });
  return styles;
};
const profileDetails = [
  {
    id: 1,
    followers: '9000',
    followed: true,
    blueTick: true,
    salutation: 'Dr',
    name: 'Vishnu Reddy',
    speciality: 'ENT ',
    Locations: 'Hyderabad,India',
    talks:
      '#MicroSurgery, #ENT,#MicroSurgery, #ENT,#MicroSurgery, #ENT,#MicroSurgery, #ENT, #ENT,#MicroSurgery, #ENT',
  },
  {
    id: 2,
    followers: '2000',
    followed: true,
    blueTick: true,
    salutation: 'Dr',
    name: 'Andriena Nikoshlav',
    speciality: 'Cardiologist',
    Locations: 'Hyderabad,India',
    talks: '#MicroSurgery, #ENT',
  },
];
const getSlider=()=>{
  
  const Color = getColor(useSelector(state => state.theme.theme));
const slider = [
  // {
  //   id: 1,
  //   icon: require('../../../assets/icons/heartInactive.png'),
  //   title: '',
  //   subTitle: 'Location',
  // },

  // {
  //   id: 3,
  //   icon: '',
  //   title: '10',
  //   subTitle: 'Years',
  // },
  {
    id: 4,
    title: '',
    subTitle: 'Website',
    icon: (
      <IconMaterialCommunityIcons name={'web'} size={22} color={Color.WHITE} />
    ),
  },
  {
    id: 5,
    icon: <IconEntypo name={'linkedin'} size={22} color={Color.WHITE} />,
    title: '',
    subTitle: 'LinkedIn',
  },
  {
    id: 6,
    icon: <IconEntypo name={'twitter'} size={22} color={Color.WHITE} />,
    title: '',
    subTitle: 'Twitter',
  },
  {
    id: 7,
    icon: <IconEntypo name={'mail'} size={22} color={Color.WHITE} />,
    title: '',
    subTitle: 'Mail',
  },
  // {
  //   id: 8,
  //   icon: require('../../../assets/icons/heartInactive.png'),
  //   title: '',
  //   subTitle: 'Message',
  // },
  // {
  //   id: 9,
  //   icon: require('../../../assets/icons/heartInactive.png'),
  //   title: '',
  //   subTitle: 'Call',
  // },
];
return slider;
}
