import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../../themes';
import {useNavigation} from '@react-navigation/native';
import getStyles from '../utils/MoreStyles';
import {ThemeContext} from '../../../themes/components/ThemeContext';

const IconRowCard = () => {
  const navigation = useNavigation();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.linearGradient}>
      {Profiles.map((item, index) => {
        return (
          <Pressable
            key={index}
            onPress={() => {
              navigation.navigate(item.stackNav, {screen: item.screen});
            }}>
            <LinearGradient
              // colors={['#2899C6', '#1B88C3', '#157AC0']}
              colors={['#ffffff', '#ffffff', '#ffffff']}
              style={{...styles.card}}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.imageContainer}>
                  <View style={styles.iconBackground}>
                    <Image
                      style={[styles.imageStyle, {tintColor: item.iconColor}]}
                      resizeMode="contain"
                      source={item.image}
                    />
                  </View>
                </View>
                <View
                  style={{
                    ...styles.titleContainer,
                  }}>
                  <Text
                    style={[styles.standardTextHighlight, {color: item.color}]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.standardText, {color: item.color}]}>
                    {item.itemHint}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </Pressable>
        );
      })}
      <View style={{height: 105}} />
    </ScrollView>
  );
};
const ImageLinear = () => {
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  const styles = getStyles(Color);
  const navigation = useNavigation();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{flex: 1, paddingTop: 40}}>
      {Profiles.map((item, index) => {
        return (
          <Pressable
            key={index}
            onPress={() => {
              navigation.navigate(item.stackNav, {screen: item.screen});
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
                height: 100,
                alignItems: 'center',
                // backgroundColor: '#479BCE',
                // marginHorizontal: 0,
                borderRadius: 10,
              }}>
              <ImageBackground
                imageStyle={{borderRadius: 10}}
                style={{flex: 1}}
                resizeMode={'cover'}
                source={{uri: item?.photo}}>
                <LinearGradient
                  colors={[
                    Color.track_miniDash_linear1,
                    Color.track_miniDash_linear2,
                    Color.track_miniDash_linear3,
                  ]}
                  start={{x: 0.13, y: 0.1}}
                  end={{x: 0.9, y: 0.27}}
                  style={{flex: 1, borderRadius: 10, justifyContent: 'center'}}>
                  <View style={{flexDirection: 'row'}}>
                    {/* <View style={styles.imageContainer}>
                      <View style={styles.iconBackground}>
                        <Image
                          style={[
                            styles.imageStyle,
                            {tintColor: item.iconColor},
                          ]}
                          resizeMode="contain"
                          source={item.image}
                        />
                      </View>
                    </View> */}
                    <View
                      style={{
                        width: '60%',
                        alignSelf: 'flex-start',
                        paddingLeft: 10,
                      }}>
                      <Text
                        style={[
                          styles.standardTextHighlight,
                          {
                            // color: item.color,
                            color: Color.more_title,
                            fontSize: 15,
                            fontWeight: '600',
                          },
                        ]}>
                        {item.title}
                      </Text>
                      <Text
                        style={[
                          styles.standardText,
                          {
                            // color: item.color,
                            color: Color.more_subtitle,
                            fontSize: 13,
                            fontWeight: '400',
                          },
                        ]}>
                        {item.itemHint}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </View>
          </Pressable>
        );
      })}
      <View style={{height: 105}} />
    </ScrollView>
  );
};
export default function MoreLanding() {
  const navigation = useNavigation();
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  const styles = getStyles(Color);
  return (
    <View style={styles.parent}>
      {/* <IconRowCard /> */}
      <ImageLinear />
    </View>
  );
}

const Profiles = [
  {
    id: '1',
    title: 'Personal Profile',
    itemHint: 'Manage family health',
    photo:
      'https://loanleaders.com/wp-content/uploads/2019/03/Family_and_House_Cropped.jpg',
    image: require('../assets/icons/frame.png'),
    // color: Color.midBlue,
    // iconColor: Color.midBlue,
    stackNav: 'PersonalStack',
    screen: 'PersonalLanding',
  },
  {
    id: '2',
    title: 'Professional Profile',
    itemHint: 'Your expertise matters',
    // itemHint: 'for All those who can impact Sciense  ',
    photo:
      'https://media.istockphoto.com/id/998313080/photo/smiling-medical-team-standing-together-outside-a-hospital.jpg?s=612x612&w=0&k=20&c=fXzbjAoStQ_8jTM4TQxbHBEjhETI3vq5_7d_JL19eCA=',
    image: require('../assets/icons/teacher.png'),
    // color: Color.midBlue,
    // iconColor: Color.midBlue,
    stackNav: 'ProfessionalStack',
    screen: 'ProfessionalLanding',
  },
  {
    id: '3',
    title: 'Company Profile',
    itemHint: 'Launch, Engage & Scale Business',
    photo: 'https://images7.alphacoders.com/576/576536.jpg',
    image: require('../assets/icons/buildings.png'),
    // color: Color.midBlue,
    // iconColor: Color.midBlue,
    stackNav: 'CompanyStack',
    screen: 'CompanyLanding',
  },
  // {
  //   id: '4',
  //   title: 'Calendar',
  //   itemHint: 'Smart reminders for healthy family',
  //   photo: 'https://picsum.photos/id/237/200/300',
  //   image: require('../assets/icons/pregnant.png'),
  //   stackNav: ' ',
  //   screen: ' ',
  //   color: '#f5cb9a',
  // },

  {
    id: '6',
    title: 'Global Documents',
    itemHint: 'One place for Multimedia',
    color: '#5BC06F',
    photo:
      'https://media.istockphoto.com/id/175410223/photo/various-alphabetized-medical-records.jpg?s=612x612&w=0&k=20&c=aCeB2NBNEvWdjoFfNPlZYQUX5epxno2KKK3iMAEhwXY=',
    image: require('../assets/icons/layer.png'),
    stackNav: 'MoreStack',
    screen: 'GlobalDocuments',
    // color: Color.highBlue,
    // iconColor: Color.highBlue,
  },
  {
    id: '7',
    title: 'Daily Routines',
    itemHint: 'Standardize health preferences',
    photo:
      'https://img.freepik.com/free-vector/man-routine-daily-life-schedule-habits-flat-set_107791-14493.jpg',
    image: require('../assets/icons/routing-2.png'),
    stackNav: 'MoreStack',
    screen: 'DailyRoutinesLanding',
    // color: Color.highBlue,
    // iconColor: Color.highBlue,
  },
  {
    id: '5',
    title: 'Devices',
    itemHint: 'Centralize health data',
    photo:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-Tgnp-B2jMwcZiGqfQTd0diHxVnVgMXvNeOBeSyFGz2ZHd0IRh3dryqNd3HxkAa1kVhM&usqp=CAU',
    image: require('../assets/icons/menu-board.png'),
    stackNav: 'CompanyStack',
    screen: 'ConfirmAuthorization',
    // color: Color.highBlue,
    // iconColor: Color.highBlue,
  },
  {
    id: '8',
    title: 'Bookmarks',
    itemHint: 'All your favorites',
    photo:
      'https://media.istockphoto.com/id/849636584/photo/close-up-white-book-marked-by-sticky-note.jpg?s=612x612&w=0&k=20&c=hi2A0M5__VIQn5tbor1qMvvYBjqmgIbvb48h2xV80IY=',
    image: require('../assets/icons/archive.png'),
    stackNav: '',
    screen: '',
    // color: Color.blue,
    // iconColor: Color.blue,
  },
  // {
  //   id: '9',
  //   title: 'Settings',
  //   itemHint: 'Customize your profile',
  //   color: '#B39CDD',
  //   photo: 'https://randomuser.me/api/portraits/men/43.jpg',
  //   image: require('../assets/icons/blur.png'),
  //   stackNav: '',
  //   screen: '',
  //   color: Color.blue,
  //   iconColor: Color.blue,
  //   stackNav: 'MoreStack',
  //   screen: 'Settings',
  // },
  {
    id: '10',
    title: 'Accounts',
    itemHint: 'Admin and Profile preferences.',
    photo:
      'https://i.pinimg.com/originals/a9/28/16/a928169ee7588d98d52d7830278491e2.jpg',
    image: require('../assets/icons/Lock.png'),
    stackNav: 'MoreStack',
    screen: 'Accounts',
    // color: Color.blue,
    // iconColor: Color.blue,
  },
];
