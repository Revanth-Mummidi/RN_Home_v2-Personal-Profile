import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../../../themes';
import getStyles from '../utils/homeStyles';
import {ThemeContext} from '../../../themes/components/ThemeContext';
const CommentItem = props => {
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  const styles = getStyles(Color);
  const [showReplies, setShowReplies] = useState(false);
  const renderReplies = replies => {
    return (
      <View>
        {replies.map(reply => (
          <View key={reply.id}>
            <View style={styles.replyContainer}>
              <Image source={{uri: reply.avatar}} style={styles.replyAvatar} />
              <View style={styles.replyContent}>
                <Text style={styles.replyUsername}>{reply.username}</Text>
                <Text style={styles.replyText}>{reply.text}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  props.setSelectedCommentId(reply);
                }}>
                <Text style={styles.replyButton}>Reply</Text>
              </TouchableOpacity>
            </View>

            {reply.replies &&
              reply.replies.length > 0 &&
              renderReplies(reply.replies)}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View>
      <View style={styles.commentContainer}>
        <Image
          source={{uri: props.comment.avatar}}
          style={styles.commentAvatar}
        />
        <View style={styles.commentContent}>
          <Text style={styles.commentUsername}>{props.comment.username}</Text>
          <Text style={styles.commentText}>{props.comment.text}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            props.setSelectedCommentId(props.comment);
          }}>
          <Text style={styles.replyButton}>Reply</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.replySectionContainer}>
        <View style={styles.replySectionContent}>
          {props.comment.replies && props.comment.replies.length > 0 && (
            <>
              <View style={styles.viewRepliesContainer}>
                <TouchableOpacity onPress={() => setShowReplies(!showReplies)}>
                  <Text style={styles.viewRepliesText}>
                    {showReplies ? 'Hide Replies' : `View Replies`}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.repliesContainer}>
                {showReplies &&
                  props.comment.replies &&
                  props.comment.replies.length > 0 &&
                  renderReplies(props.comment.replies)}
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
};
export default CommentItem;
