/* eslint-disable no-unused-vars */
/* eslint-disable quotes */

import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Color} from '../../../themes';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const styles = Color => {
  const style = StyleSheet.create({
    parent: {flex: 1},

    icon28: {
      width: 28,
      height: 28,
      resizeMode: 'contain',
      tintColor: Color.feedIconInactive,
    },

    font18h: {
      fontSize: 18,
      fontWeight: '700',
      color: Color.feedTextTitle,
    },

    font14h: {
      fontSize: 14,
      fontWeight: '600',
      color: Color.feedTextTitle,
    },

    feedTitle: {
      fontSize: 15,
      fontWeight: '600',
      color: Color.feedTextTitle,
      letterSpacing: 0.5,
    },
    feedSubtitle: {
      fontSize: 13,
      fontWeight: '400',
      color: Color.feedTextSecondary,
      letterSpacing: 0.5,
    },
    /// Landing >>>>>>>>>>
    post: {
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
      shadowColor: Color.blue,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.8,
      shadowRadius: 8.62,
      elevation: 10,
      position: 'absolute',
      top: HEIGHT / 1.2,
      right: 15,
      zIndex: 999,
      // backgroundColor: "#279AC6",
    },
    // Feed >>>>>>>>>>>>>>
    feedContainer: {
      alignSelf: 'center',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: Color.feedBackground,
      marginTop: 20,
      paddingBottom: 10,
      width: WIDTH * 0.95,
      marginHorizontal: 10,
      borderRadius: 10,
      flexGrow: 1,
    },
    pagination: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
    },
    activeDot: {
      backgroundColor: 'blue',
    },
    paginationDot: {
      width: 4,
      height: 4,
      backgroundColor: 'gray',
    },
    feedIconContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    userContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: 10,
      paddingBottom: 10,
    },
    avatar: {
      width: 40,
      height: 40,
    },
    verifybadge: {
      position: 'absolute',
      bottom: -5,
      right: -8,
      width: 16,
      height: 16,
      tintColor: Color.forestgreen,
    },
    //bottomsheet_Share,like,Comments >>>>>>>>>>>>>>>
    //share
    container: {
      flex: 1,
      backgroundColor: Color.feedBSheet_bg,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    headerText: {
      fontSize: 23,
      fontWeight: 'bold',
      marginBottom: 12,
      color: Color.feedTextTitle,
    },
    usersContainer: {
      paddingBottom: 16,
    },
    innerUserContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    progressBarContainer: {
      height: 4,
      width: '100%',
      backgroundColor: '#E0E0E0',
      // Add any other styles you need for the progress bar container
    },
    progressBar: {
      height: '100%',
      backgroundColor: 'blue',
      // Customize the progress bar color or other styles as needed
    },
  
    userAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 12,
    },
    userInfo: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderColor: Color.feedTextSecondary,
      paddingBottom: 8,
    },
    username: {
      fontSize: 16,
      color: Color.feedTextTitle,
    },
    shareButton: {
      backgroundColor: Color.feedBSheet_button,
      borderRadius: 16,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    shareButtonText: {
      fontSize: 14,
      color: Color.feedBSheet_buttonText,
      fontWeight: 'bold',
    },
    // comment screen
    uploadTextfield: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: Color.feedBSheet_bg,
      paddingHorizontal: 10,
      paddingVertical: 10,
      width: '100%',
    },
    uploadWrapper: {
      width: '100%',
      flexDirection: 'row',
      backgroundColor: Color.feedBSheet_bg,
      justifyContent: 'space-between',
      borderRadius: 10,
    },
    textfieldContainer: {width: '75%'},
    uploadcontainer: {
      width: '20%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Color.feedBSheet_button,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
    },
    sendButton: {
      backgroundColor: '#007AFF',
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    sendButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },

    addCommentText: {
      color: Color.feedTextTitle,
      fontSize: 16,
      fontWeight: '500',
    },

    commentInputCard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: Color.feedIconInactive,
      //borderRadius: 8,
      padding: 8,
    },
    commentInput: {
      flex: 1,
      minHeight: 40,
      fontSize: 16,
      marginRight: 8,
    },
    cancelIconContainer: {
      padding: 6,
    },
    cancelIcon: {
      width: 16,
      height: 16,
      tintColor: '#999999',
    },
    // comment item
    commentsContainer: {
      paddingBottom: 16,
    },
    commentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    commentAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 12,
    },
    commentContent: {
      flex: 1,
      paddingBottom: 8,
    },

    replySectionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    replySectionContent: {
      flex: 1,
      borderBottomWidth: 1,
      borderColor: '#E8E8E8',
      paddingBottom: 8,
    },
    commentUsername: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Color.feedTextTitle,
    },
    commentText: {
      fontSize: 14,
      color: Color.feedComment_commentText,
    },
    viewRepliesText: {
      fontSize: 14,
      color: Color.feedComment_replylabel,
      marginTop: 8,
    },
    viewRepliesRepliesContainer: {
      marginLeft: 32,
      marginTop: -11,
      paddingLeft: 8,
    },

    repliesContainer: {
      marginLeft: 52,
      marginTop: 8,
      paddingLeft: 8,
    },
    replyContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    viewRepliesContainer: {
      marginLeft: 44,
      marginTop: -23,
      paddingLeft: 8,
    },

    replyAvatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      marginRight: 8,
    },
    replyContent: {
      flex: 1,
      paddingBottom: 4,
    },
    replyUsername: {
      fontSize: 14,
      fontWeight: 'bold',
      color: Color.feedTextTitle,
    },
    replyText: {
      fontSize: 12,
      color: Color.feedComment_commentText,
    },
    replyButton: {
      backgroundColor: Color.feedBSheet_button,
      borderRadius: 8,
      paddingVertical: 4,
      paddingHorizontal: 8,
      color: Color.feedBSheet_buttonText,
    },
  });
  return style;
};
export default styles;
