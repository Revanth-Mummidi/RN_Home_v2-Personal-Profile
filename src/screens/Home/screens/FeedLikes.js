import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {ThemeContext} from '../../../themes/components/ThemeContext';
const LikeItem = ({like}) => {
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  const styles = getStyles(Color);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowPress = () => {
    setIsFollowing(prevFollowing => !prevFollowing);
  };

  return (
    <View style={styles.likeContainer}>
      <Image source={{uri: like.avatar}} style={styles.likeAvatar} />
      <View style={styles.likeInfo}>
        <Text style={styles.likeText}>{like.username}</Text>
        <TouchableOpacity
          style={[
            styles.followButton,
            {backgroundColor: isFollowing ? '#E6F5FF' : '#3BB9FF'},
          ]}
          onPress={handleFollowPress}>
          <Text style={styles.followButtonText}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const FeedLikes = () => {
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  const styles = getStyles(Color);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    fetchLikes();
  }, []);

  const fetchLikes = async () => {
    try {
      // Fetch random user data from an API
      const response = await fetch('https://randomuser.me/api/?results=10');
      const data = await response.json();

      const likesData = data.results.map((user, index) => ({
        id: `${index}`,
        username: `${user.name.first} ${user.name.last}`,
        avatar: user.picture.large,
      }));

      setLikes(likesData);
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Liked by</Text>
      <FlatList
        data={likes}
        keyExtractor={item => item.id}
        renderItem={({item}) => <LikeItem like={item} />}
        contentContainerStyle={styles.likesContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
//Todo: Trasfers styles to utils>homeStyles.js
const getStyles = Color => {
  const style = StyleSheet.create({
    likeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    likeAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 12,
    },
    likeInfo: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: '#E8E8E8',
      paddingBottom: 8,
    },
    likeText: {
      fontSize: 16,
      color: '#333333',
    },
    followButton: {
      borderRadius: 16,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    followButtonText: {
      fontSize: 14,
      color: '#FFFFFF',
      fontWeight: 'bold',
    },

    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 12,
      color: '#333333',
    },
    likesContainer: {
      paddingBottom: 16,
    },
    likeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    likeAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 12,
    },
    likeText: {
      fontSize: 16,
      color: '#333333',
    },
  });
  return style;
};
export default FeedLikes;
