import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// import Comment from './comment';
// import Input from './input';
import PropTypes from 'prop-types';
import {Color} from '../../../../themes';

export default class CommentList extends Component {
  // static propTypes = {
  //     // User object shape
  //     // user: PropTypes.shape({
  //     //     _id: PropTypes.string.isRequired,
  //     // }).isRequired,
  // };

  state = {
    comments: [], // array for comments fetched from the API backend
    refreshing: true, // whether comments list is being refreshed or not
  };

  // Fetch comments when component is about to mount
  // componentWillMount = () => this.fetchComments();

  // Re-fetch comments when user pulls the list down
  // onRefresh = () => this.fetchComments();

  // Call API to fetch comments
  fetchComments = async () => {
    // this.setState({ refreshing: true });
    // try {
    //     // Make API call
    //     const response = await get('comments');
    //     // Convert response to JSON
    //     const json = await response.json();
    //     this.setState({
    //         refreshing: false,
    //         comments: json.comments
    //     });
    // }
    // catch (error) {
    //     alert(error);
    // }
  };

  // Call API to submit a new comment
  submitComment = async comment => {
    // const { user } = this.props;
    // this._scrollView.scrollTo({ y: 0 });
    // try {
    //     // Make API call
    //     const response = await put('comments', {
    //         user_id: user._id,
    //         content: comment,
    //     });
    //     // Convert response to JSON
    //     const json = await response.json();
    //     this.setState({
    //         // Push new comment to state before existing ones
    //         comments: [json.comment, ...this.state.comments]
    //     });
    // }
    // catch (error) {
    //     alert(error);
    // }
  };

  render() {
    // Pull comments out of state
    const {comments} = this.state;
    return (
      <View style={styles.container}>
        {/* Scrollable list */}
        <ScrollView
        // ref={(scrollView) => { this._scrollView = scrollView; }}
        // refreshControl={
        //     <RefreshControl
        //         refreshing={this.state.refreshing}
        //         onRefresh={this.onRefresh}
        //     />
        // }
        >
          {/* Render each comment with Comment component */}
          {/*{comments.map((comment, index) => <Comment comment={comment} key={index} />)}*/}
        </ScrollView>
        {/* Comment input box */}
        <KeyboardAvoidingView behavior="position">
          <View style={styles.container}>
            {/* Comment input field */}
            <TextInput
              placeholder="Add a comment..."
              keyboardType="twitter" // keyboard with no return button
              autoFocus={true} // focus and show the keyboard
              style={styles.input}
              value={this.state.text}
              onChangeText={text => this.setState({text})} // handle input changes
              onSubmitEditing={this.onSubmitEditing} // handle submit event
            />
            {/* Post button */}
            <TouchableOpacity style={styles.button} onPress={this.submit}>
              <Text
                style={[styles.text, !this.state.text ? styles.inactive : []]}>
                Post
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    paddingTop: 20,
  },
});
