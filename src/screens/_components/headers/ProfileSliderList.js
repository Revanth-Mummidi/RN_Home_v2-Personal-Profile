import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../themes';
import {ThemeContext} from '../../../themes/components/ThemeContext';

export default function ProfileSliderList({
  image,
  showBadge,
  badge,
  user,
  onPressUser,
}) {
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  const styles = getStyles(Color);
  const [selectedUser, setSelectedUser] = useState(false);
  const handleUserClick = () => {
    onPressUser;
  };
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{paddingLeft: 14, paddingTop: 10}}>
      {profile.map((profile, index) => {
        return (
          <View
            key={index}
            style={{
              width: 55,
              marginRight: 5,
            }}>
            <Pressable
              style={{
                alignItems: 'center',
              }}
              onPress={handleUserClick}>
              <View
                style={{
                  height: 37,
                  width: 37,
                  borderRadius: 40,
                  borderWidth: selectedUser ? 4 : 0,
                  borderColor: selectedUser ? Color.profileList_badge_bg : null,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: profile?.userImage}}
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 40,
                  }}
                />
              </View>

              <Text
                numberOfLines={1}
                style={{fontSize: 11, color: Color.profileList_badge_bg}}>
                {profile?.name}
              </Text>
              {profile?.showBadge ? (
                <Text
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 0,
                    fontSize: 11,
                    fontWeight: '600',
                    color: Color.profileList_badge,
                    backgroundColor: Color.profileList_badge_bg,
                    borderRadius: 50,
                    paddingVertical: 2,
                    paddingHorizontal: 5,
                  }}>
                  {profile?.badge}
                </Text>
              ) : null}
            </Pressable>
          </View>
        );
      })}
    </ScrollView>
  );
}

const getStyles = Color => {
  const style = StyleSheet.create({});
  return style;
};

const profile = [
  {
    id: 1,
    name: 'Kishore',
    showBadge: false,
    badge: 9,
    userImage:
      'https://photos1.blogger.com/blogger/6684/469/1600/Jake%20Glyllenhaal%20smile.0.jpg',
  },
  {
    id: 2,
    name: 'Mutyalu',
    showBadge: false,
    badge: 9,
    userImage:
      'https://images.unsplash.com/photo-1623184663110-89ba5b565eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c21pbGluZyUyMG1hbnxlbnwwfHwwfHw%3D&w=1000&q=80',
  },
  {
    id: 3,
    name: 'Savitri',
    showBadge: false,
    badge: 9,
    userImage:
      'https://media.istockphoto.com/id/1145237257/photo/smiling-brunette-in-white.jpg?s=612x612&w=0&k=20&c=ic7YrQxFSoLz2WlDLz3wX-LKC7LWF30zfAOqB9YehmU=',
  },
  {
    id: 4,
    name: 'Asha',
    showBadge: false,
    badge: 9,
    userImage:
      'https://as2.ftcdn.net/v2/jpg/02/43/85/59/1000_F_243855911_JAI1915km7T4Win4QjBwmBgcpWhIkiVt.jpg',
  },
  {
    id: 5,
    name: 'Arjun',
    showBadge: false,
    badge: 9,
    userImage:
      'https://media.istockphoto.com/id/1440913878/photo/happy-mother-smiling-and-playing-with-her-son-at-home.jpg?b=1&s=170667a&w=0&k=20&c=Y_YjOCrxtkBVST-AmFdAQ8N-Nbo_FdEtYdAfc0XXh-c=',
  },
];
