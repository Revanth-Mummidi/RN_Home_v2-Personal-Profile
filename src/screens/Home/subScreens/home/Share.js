import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../../../../themes';
import getStyles from '../../utils/homeStyles';
import {ThemeContext} from '../../../../themes/components/ThemeContext';
const SharePostItem = ({user}) => {
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  const styles = getStyles(Color);
  const handleSharePress = () => {
    // Handle the share action here

    console.log('Share button pressed for user:', user.username);
  };

  return (
    <View style={styles.innerUserContainer}>
      <Image source={{uri: user.profilePic}} style={styles.userAvatar} />
      <View style={styles.userInfo}>
        <Text style={styles.username}>{user.name}</Text>
        <TouchableOpacity style={styles.shareButton} onPress={handleSharePress}>
          <Text style={styles.shareButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SharePostPage = () => {
  const [users, setUsers] = useState([]);
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  const styles = getStyles(Color);
  fetchFollowers = async () => {
    const dummyuser = [
      {
        id: 1,
        name: 'John',
        profilePic: 'https://randomuser.me/api/portraits/men/33.jpg',
      },
      {
        id: 2,
        name: 'Jane',
        profilePic: 'https://randomuser.me/api/portraits/women/22.jpg',
      },
      {
        id: 3,
        name: 'Bob',
        profilePic: 'https://randomuser.me/api/portraits/men/15.jpg',
      },
      {
        id: 4,
        name: 'Alice',
        profilePic: 'https://randomuser.me/api/portraits/women/12.jpg',
      },
      {
        id: 5,
        name: 'David',
        profilePic: 'https://randomuser.me/api/portraits/men/50.jpg',
      },
      {
        id: 6,
        name: 'Jill',
        profilePic: 'https://randomuser.me/api/portraits/women/1.jpg',
      },
      {
        id: 7,
        name: 'Jack',
        profilePic: 'https://randomuser.me/api/portraits/men/5.jpg',
      },

      {
        id: 8,
        name: 'Madison',
        profilePic: 'https://randomuser.me/api/portraits/men/35.jpg',
      },
      {
        id: 9,
        name: 'Max',
        profilePic: 'https://randomuser.me/api/portraits/men/55.jpg',
      },
      // Add more people to the list as needed
    ];
    setUsers(dummyuser);
  };

  React.useEffect(() => {
    fetchFollowers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Share Post</Text>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({item}) => <SharePostItem user={item} />}
        contentContainerStyle={styles.usersContainer}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      />
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Color.feedBSheet_bg,
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   headerText: {
//     fontSize: 23,
//     fontWeight: 'bold',
//     marginBottom: 12,
//     color: Color.feedTextTitle,
//   },
//   usersContainer: {
//     paddingBottom: 16,
//   },
//   userContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   userAvatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 12,
//   },
//   userInfo: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderBottomWidth: 0.5,
//     borderColor: Color.feedTextSecondary,
//     paddingBottom: 8,
//   },
//   username: {
//     fontSize: 16,
//     color: Color.feedTextTitle,
//   },
//   shareButton: {
//     backgroundColor: Color.feedBSheet_button,
//     borderRadius: 16,
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//   },
//   shareButtonText: {
//     fontSize: 14,
//     color: Color.feedBSheet_buttonText,
//     fontWeight: 'bold',
//   },
// });

export default SharePostPage;
