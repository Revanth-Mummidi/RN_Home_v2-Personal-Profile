{
  /* ******************** Developer Note ******************** 
      Objective: 
        1. 
        2. Screen not build on the basis that developer can directly integrate with backend.. Its more for visual representation
        
      ToDo:
        1. Header to goBack.
        2. 'Color3' brighther backgrounds makes the text hard to readable. 
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
  ImageBackground,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ImageColors from 'react-native-image-colors';
import LinearGradient from 'react-native-linear-gradient';

import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {Color} from '../../../../themes';
// import {WheelPicker} from '../../../_components';
// import ScrollPicker from '../../../_components/userInteractions/scrollPicker/customPicker.tsx';
import Dropdown from '../../../_components/userInteractions/dropdownList/Dropdown.tsx';
import {ScrollPicker} from '../../../_components';
import DatePicker from 'react-native-date-picker';
import {useSelector} from 'react-redux';
import { getColor } from '../../../../themes/GetColor.js';
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

const ApercuEdit = ({imageURL}) => {
  const Color=getColor(useSelector(state=>state.theme.theme));
  const [colors, setColors] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const {styles,slider}=getStyle();
  var color1 = colors.colorSeven.value;
  var color2 = colors.colorSix.value;
  var color3 = colors.colorEight.value;
  const linearColors = [color1, color1, 'rgba(0, 0, 0, 0.8)'];
  const [image, setImage] = useState(
    (imageURL = require('../../assets/images/Svante_Paabo_nobelPrizeMedicine.jpeg')),
  );
  const [trySES, setTrySES] = useState(false);
  // for expant date time >>>>>>>>>>>>>>
  // const [currentTime, setcurrentTime] = useState(new Date());
  // const [count, setcount] = useState(0);
  // const [preciseTime, setpreciseTime] = useState();
  // handleDate = e => {
  //   var arr = preciseTime;
  //   arr[count - 1] = e.toTimeString();
  //   var dateobject = new Date();
  //   dateobject.setHours(e.toTimeString().split(':')[0]);
  //   dateobject.setMinutes(e.toTimeString().split(':')[1]);
  //   setpreciseTime(arr);
  //   setcurrentTime(dateobject);
  // };
  // displayTime = () => {
  //   var string1 = currentTime.toTimeString().split(':');
  //   var hours = string1[0];
  //   var suffix = 'AM';
  //   if (string1[0] > 12) {
  //     hours = `0${string1[0] - 12}`.slice(-2);
  //     suffix = 'PM';
  //   }
  //   return hours + ' : ' + string1[1] + ' ' + suffix;
  // };

  // for Dropdown list>>>>>>>>>>>>>>
  const [selected, setSelected] = useState(undefined);
  const data = [
    {label: 'One', value: '1'},
    {label: 'Two', value: '2'},
    {label: 'Three', value: '3'},
    {label: 'Four', value: '4'},
    {label: 'Five', value: '5'},
  ];
  const wrapperStyle = {
    height: 130,
    width: 300,
    // backgroundColor: 'black',
    overflow: 'hidden',
    // borderRadius: 10,
  };
  const highlightStyle = {
    position: 'absolute',
    backgroundColor: Color.midBlue,
    borderRadius: 10,
    top: (130 - 40) / 2,
    height: 40,
    width: 260,
    left: 20,
  };
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
    <ScrollView nestedScrollEnabled={true} style={styles.main}>
      {profileDetails.slice(0, 1).map((item, index) => {
        return (
          <View key={index} style={{}}>
            <View
              style={{
                width: '100%',
                position: 'absolute',
                paddingTop: 64,
                backgroundColor: color1,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  alignSelf: 'flex-end',
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: color3,
                  marginBottom: 10,
                  marginRight: 10,
                }}>
                <Pressable
                  onPress={() => {
                    alert('follow Pressed');
                  }}
                  style={styles.buttonStyle}>
                  <Text style={{color: color3}}>Public Profile</Text>
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

            <View style={{padding: 10}}>
              <Text numberOfLines={1} style={styles.name}>
                {item.name}
              </Text>
              <Text style={styles.readText}>
                {item.age} {item.gender}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../../assets/icons/location.png')}
                  style={{
                    width: 13,
                    height: 13,
                    marginRight: 4,
                    tintColor: Color.mediumGray,
                  }}
                />
                <Text style={styles.readText}>{item.Locations}</Text>
              </View>

              {/* <Pressable
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
              </Pressable> */}
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <ImageBackground
                source={require('../../assets/icons/bloodgroup.png')}
                style={{
                  width: 50,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                imageStyle={{tintColor: Color.midBlue}}>
                <Text
                  style={{fontSize: 13, fontWeight: '500', color: Color.white}}>
                  B+
                </Text>
              </ImageBackground>
              <ImageBackground
                source={require('../../assets/icons/lovely.png')}
                style={{
                  width: 50,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                imageStyle={{tintColor: Color.midBlue}}></ImageBackground>

              <Pressable style={{position: 'absolute', right: 20}}>
                <IconMaterialCommunityIcons name="pencil" size={20} />
              </Pressable>
            </View>
            {/* <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                paddingVertical: 10,
              }}>
              {slider.map((item, index) => {
                return (
                  <Pressable
                    key={index}
                    onPress={index => {
                      userLinks(index);
                    }}
                    style={{
                      //width: 70,
                      alignItems: 'center',
                      paddingHorizontal: 10,
                      marginHorizontal: 4,
                      justifyContent: 'center',
                      backgroundColor: Color.midBlue,
                      paddingVertical: 10,
                      borderRadius: 40,
                    }}>
                    <Text style={{textAlign: 'center'}}>{item.icon}</Text>
                    <Text style={{color: Color.WHITE}}>{item.subTitle}</Text>
                  </Pressable>
                );
              })}
            </ScrollView> */}

            <View
              style={{
                padding: 17,
                backgroundColor: Color.blanchedalmond,
                flexDirection: 'row',
              }}>
              <Image
                source={require('../../assets/icons/verify.png')}
                style={{
                  width: 22,
                  height: 22,
                  tintColor: Color.darkgreen,
                  marginRight: 10,
                }}
              />
              <Text style={{color: Color.mediumGray, fontWeight: '700'}}>
                Verified Users {'\n'}
                <Text style={{color: Color.mildGray, fontWeight: '500'}}>
                  Access to hyper personalizations for free
                </Text>
              </Text>
            </View>

            {/* <Text>{displayTime()}</Text>

            <DatePicker
              mode="time"
              date={currentTime}
              onDateChange={this.handleDate}
              locale="en-US"
              timeFormat="HH:mm"
              androidVariant="iosClone"
              textColor="gray"
              fadeToColor="white"
              textStyle={{backgroundColor: 'blue'}}
              style={{
                width: Dimensions.get('screen').width / 2,
                fontFamily: 'Circular Std',
                height: 100,
                marginVertical: '5%',
                borderColor: 'gray',
                color: 'white',
                borderRadius: 100,
              }}
              customStyles={{
                dateInput: {
                  backgroundColor: 'blue',
                },
              }}
            />
            <Pressable onPress={() => updateScrollDate()}>
              <Text>Press</Text>
            </Pressable> */}
            <View style={{padding: 10}}>
              <Text style={styles.sideLabels}>
                Blood group <Text style={{color: Color.midBlue}}>B +</Text>
              </Text>
              <View style={{alignItems: 'center'}}>
                <ScrollPicker
                  dataSource={[
                    'A +',
                    'A -',
                    'B +',
                    'B -',
                    'AB +',
                    'AB -',
                    'O +',
                    'O -',
                    'oh +',
                    'oh -',
                  ]}
                  selectedIndex={0}
                  onValueChange={(data, selectedIndex) => {
                    //
                  }}
                  backgroundStyle={wrapperStyle}
                  HighlightStyle={highlightStyle}
                  HighlightColour="#B987F8"
                  wrapperHeight={130}
                  HighlightfontSize={16}
                  wrapperWidth={300}
                  wrapperColor="#FFFFFF"
                  itemHeight={40}
                  highlightBorderWidth={2}
                />
              </View>
              {/* <View style={styles.flexRowWrap}>
                <Pressable style={styles.inactivethemeContainer}>
                  <Text style={{...styles.bigFont, color: Color.midBlue}}>
                    A+
                  </Text>
                </Pressable>
                <Pressable style={styles.themeContainer}>
                  <Text style={styles.bigFont}>A -</Text>
                </Pressable>
                <Pressable style={styles.inactivethemeContainer}>
                  <Text style={{...styles.bigFont, color: Color.midBlue}}>
                    B +
                  </Text>
                </Pressable>
                <Pressable style={styles.inactivethemeContainer}>
                  <Text style={{...styles.bigFont, color: Color.midBlue}}>
                    B -
                  </Text>
                </Pressable>
                <Pressable style={styles.inactivethemeContainer}>
                  <Text style={{...styles.bigFont, color: Color.midBlue}}>
                    O +
                  </Text>
                </Pressable>
                <Pressable style={styles.inactivethemeContainer}>
                  <Text style={{...styles.bigFont, color: Color.midBlue}}>
                    O -
                  </Text>
                </Pressable>
                <Pressable style={styles.inactivethemeContainer}>
                  <Text style={{...styles.bigFont, color: Color.midBlue}}>
                    AB +
                  </Text>
                </Pressable>
                <Pressable style={styles.inactivethemeContainer}>
                  <Text style={{...styles.bigFont, color: Color.midBlue}}>
                    AB -
                  </Text>
                </Pressable>

                <Pressable style={styles.inactivethemeContainer}>
                  <Text style={{...styles.bigFont, color: Color.midBlue}}>
                    Oh +
                  </Text>
                </Pressable>
                <Pressable style={styles.inactivethemeContainer}>
                  <Text style={{...styles.bigFont, color: Color.midBlue}}>
                    Oh -
                  </Text>
                </Pressable>
              </View> */}
            </View>

            <View style={styles.line} />

            <View style={{padding: 10}}>
              <Text style={styles.sideLabels}>
                Marital Status{' '}
                <Text style={{color: Color.midBlue}}>Single</Text>
              </Text>
              <View
                style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
                <Pressable
                  style={{
                    alignItems: 'center',
                    padding: 10,
                    marginHorizontal: 5,
                  }}>
                  <Image
                    source={require('../../assets/icons/heart.png')}
                    style={{width: 40, height: 40, tintColor: Color.midBlue}}
                  />
                  <Text style={{color: Color.midBlue}}>Single</Text>
                </Pressable>
                <Pressable
                  style={{
                    alignItems: 'center',
                    padding: 10,
                    marginHorizontal: 5,
                  }}>
                  <Image
                    source={require('../../assets/icons/lovely.png')}
                    style={{width: 40, height: 40, tintColor: Color.lightGray}}
                  />
                  <Text style={{color: Color.lightGray}}>Married</Text>
                </Pressable>
                <Pressable
                  style={{
                    alignItems: 'center',
                    padding: 10,
                    marginHorizontal: 5,
                  }}>
                  <Image
                    source={require('../../assets/icons/heart-remove.png')}
                    style={{width: 40, height: 40, tintColor: Color.lightGray}}
                  />
                  <Text style={{color: Color.lightGray}}>Separated</Text>
                </Pressable>
                <Pressable
                  style={{
                    alignItems: 'center',
                    padding: 10,
                    marginHorizontal: 5,
                  }}>
                  <Image
                    source={require('../../assets/icons/heart-slash.png')}
                    style={{width: 40, height: 40, tintColor: Color.lightGray}}
                  />
                  <Text style={{color: Color.lightGray}}>Divorced</Text>
                </Pressable>
              </View>
              <Pressable
                style={{
                  alignItems: 'flex-end',
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                  borderRadius: 10,
                  backgroundColor: Color.aquaBlue,
                  alignSelf: 'flex-end',
                  marginTop: 10,
                  marginRight: 10,
                }}>
                <Text style={{color: Color.blue, fontWeight: '500'}}>
                  Advanced
                </Text>
              </Pressable>
            </View>

            <View style={styles.line} />

            <View style={{padding: 10}}>
              <Text style={styles.sideLabels}>
                Socio Economical Scale{'\n'}
                <Text
                  style={{
                    fontSize: 13,
                    color: Color.mildGray,
                    fontWeight: '500',
                  }}>
                  Modified Kuppuswamy Scale
                </Text>
              </Text>
              <View
                style={{
                  width: 130,
                  height: 130,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  alignItems: 'center',
                  padding: 20,
                  borderRadius: 100,
                  backgroundColor: Color.turquoise,
                }}>
                <Text
                  style={{
                    color: Color.blue,
                    fontSize: 22,
                    fontWeight: '600',
                  }}>
                  16.8
                </Text>
                <Text style={{color: Color.midBlue, fontSize: 13}}>
                  Upper Middle
                </Text>
              </View>
              {trySES ? (
                <>
                  <View style={{marginBottom: 10}}>
                    <Text style={{color: Color.blue}}>
                      Occupation of Head of the family
                    </Text>
                    <Dropdown
                      label="Select Item"
                      data={data}
                      onSelect={setSelected}
                    />
                  </View>
                  <View style={{marginBottom: 10}}>
                    <Text style={{color: Color.blue}}>
                      Education of Head of the family
                    </Text>
                    <Dropdown
                      label="Select Item"
                      data={data}
                      onSelect={setSelected}
                    />
                  </View>
                  <View style={{marginBottom: 10}}>
                    <Text style={{color: Color.blue}}>
                      Total Monthly Income of the family
                    </Text>
                    <Dropdown
                      label="Select Item"
                      data={data}
                      onSelect={setSelected}
                    />
                  </View>
                </>
              ) : null}
              <Pressable
                onPress={() => {
                  setTrySES(!trySES);
                }}
                style={{alignItems: 'flex-end', paddingRight: 10}}>
                <Text style={{color: Color.blue}}>Check</Text>
              </Pressable>
            </View>
            <View style={styles.line} />
            <Text> EMERGENCY</Text>
            <Text> IDENTIFICATION</Text>
            <Text> PHone</Text>
            <Text style={{marginBottom: 70}}> Address</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default ApercuEdit;
const getStyle=()=>{
  const Color=getColor(useSelector(state=>state.theme.theme));
const styles = StyleSheet.create({
  main: {flex: 1, backgroundColor: Color.WHITE},
  profileContainer: {
    // position: 'absolute',
    // top: 40,
    paddingTop: 40,
    paddingLeft: 20,
    alignSelf: 'flex-start',
    paddingRight: 37,
  },
  profileImage: {
    width: 100,
    height: 100,
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
    tintColor: Color.mildGray,
  },

  buttonStyle: {
    width: '50%',
    paddingHorizontal: 10,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sideLabels: {
    paddingBottom: 14,
    fontWeight: 'bold',
    fontSize: 17,
    color: Color.BLACK,
  },
  flexRowWrap: {flexDirection: 'row', flexWrap: 'wrap'},
  bigFont: {fontSize: 20, fontWeight: 'bold', color: Color.WHITE},
  inactivethemeContainer: {
    // backgroundColor: Color.midBlue,
    margin: 5,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: Color.midBlue,
  },
  themeContainer: {
    backgroundColor: Color.midBlue,
    margin: 5,
    borderRadius: 10,
    padding: 14,
  },
  line: {height: 2, backgroundColor: Color.white},
  // salutation: {fontSize: 26, fontWeight: '500', color: Color.mediumGray},
  name: {fontSize: 31, fontWeight: 'bold', color: Color.mediumGray},
  readText: {fontSize: 14, color: Color.gray},
});
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
    subTitle: 'Phone',
    icon: (
      <IconMaterialCommunityIcons name={'web'} size={22} color={Color.WHITE} />
    ),
  },
  {
    id: 5,
    icon: <IconEntypo name={'linkedin'} size={22} color={Color.WHITE} />,
    title: '',
    subTitle: 'SES',
  },
  {
    id: 6,
    icon: <IconEntypo name={'twitter'} size={22} color={Color.WHITE} />,
    title: '',
    subTitle: 'Blood',
  },
  {
    id: 7,
    icon: <IconEntypo name={'mail'} size={22} color={Color.WHITE} />,
    title: '',
    subTitle: 'Mail',
  },
  {
    id: 8,
    icon: <IconEntypo name={'mail'} size={22} color={Color.WHITE} />,
    title: '',
    subTitle: 'Address',
  },
  {
    id: 9,
    icon: <IconEntypo name={'mail'} size={22} color={Color.WHITE} />,
    title: '',
    subTitle: 'QR',
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

return {styles,slider};
}
const profileDetails = [
  {
    id: 1,
    // followers: '9000',
    // followed: true,
    blueTick: true,
    salutation: 'Dr',
    name: 'Vishnu Reddy',
    gender: 'Male',
    age: 28,
    phone: '+91 90294 78324',
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


const companyParentChildTypes = [
  {
    label: 'Parent',
    value: 1,
  },
  {
    label: 'Subsidiary',
    value: 2,
  },
  {
    label: 'Partnership',
    value: 3,
  },

  {
    label: 'Branch Office',
    value: 4,
  },

  {
    label: 'Sole Proprietorship',
    value: 5,
  },
];
