import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
} from 'react-native';
import {TextInputFields} from '../../_components';
import {Colors} from '../../../themes';
import IconEntypo from 'react-native-vector-icons/Entypo';
import CommentItem from './Comment';
import {saveFeeds} from '../utils/HomeServerRequests';
import getStyles from '../utils/homeStyles';
import {ThemeContext} from '../../../themes/components/ThemeContext';
const FeedComments = () => {
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  const styles = getStyles(Color);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const dummyComments = [
    {
      id: '1',
      username: 'John',
      avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
      text: 'Great post!',
      replies: [
        {
          id: 'r1',
          username: 'Alice',
          avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
          text: 'Nice!',
        },
        {
          id: 'r2',
          username: 'Bob',
          avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
          text: 'Agreed!',
        },
      ],
    },
    {
      id: '2',
      username: 'Jane',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      text: 'Nice work!',
      replies: [
        {
          id: 'r3',
          username: 'Alex',
          avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
          text: 'Thank you!',
          replies: [
            {
              id: 'r4',
              username: 'Michael',
              avatar: 'https://randomuser.me/api/portraits/men/50.jpg',
              text: "You're welcome!",
            },
          ],
        },
      ],
    },
    {
      id: '3',
      username: 'Alex',
      avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
      text: 'Awesome!',
    },
    {
      id: '4',
      username: 'Emily',
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
      text: 'Love it!',
    },
    {
      id: '5',
      username: 'Michael',
      avatar: 'https://randomuser.me/api/portraits/men/50.jpg',
      text: 'Well done!',
    },
    {
      id: '6',
      username: 'Sophia',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      text: 'Impressive!',
    },
    {
      id: '7',
      username: 'Daniel',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      text: 'Fantastic!',
    },
    {
      id: '8',
      username: 'Olivia',
      avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
      text: 'Amazing!',
    },
  ];

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    setComments(dummyComments);
  };
  const addComment = async () => {
    const newCommentObj = {
      tag_id: 4,
      tag_name: 'comment',
      entity_type_id: 1,
      entity_type: selectedCommentId ? 'feed' : 'social',
      eh_entity_id: 1,
      tag_text: newComment,
      Authorization: 'Bearer ' + token,
    };
    // setComments([...comments, newCommentObj]);
    // setNewComment('');
    // // post comment response await
    // const response = await saveFeeds(newCommentObj);
    // console.log('response', response);
  };
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            <Text style={styles.headerText}>Comments</Text>
            <FlatList
              data={comments}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <CommentItem
                  comment={item}
                  setComments={setComments}
                  setSelectedCommentId={setSelectedCommentId}
                />
              )}
              contentContainerStyle={styles.commentsContainer}
            />
          </View>
          <View style={{backgroundColor: Color.WHITE}}>
            {selectedCommentId != null && (
              <View style={styles.commentInputCard}>
                <Text style={styles.addCommentText}>
                  {'Reply to ' +
                    selectedCommentId.username +
                    "'s comment: " +
                    selectedCommentId.text}
                </Text>
                <TouchableOpacity
                  onPress={() => setSelectedCommentId(null)}
                  style={styles.cancelIconContainer}>
                  <IconEntypo name="cross" size={20} color={Color.gray} />
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.uploadTextfield}>
              <View style={styles.uploadWrapper}>
                <View style={styles.textfieldContainer}>
                  <TextInputFields
                    label={selectedCommentId ? 'Reply' : 'Comment'}
                    value={newComment}
                    onChange={text => setNewComment(text)}
                    baseColor={Color.feedBSheet_button}
                  />
                </View>
                <Pressable onPress={addComment} style={styles.uploadcontainer}>
                  <Text style={styles.sendButtonText}>Send</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={{height: 50}} />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
};

export default FeedComments;
