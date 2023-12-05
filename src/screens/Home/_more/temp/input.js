import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import {Color} from '../../../../themes';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '', // user's input
    };
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  // Update state when input changes
  onChangeText = text => {
    console.log(text);
  };

  // Handle return press on the keyboard
  // NOTE: You don't really need it for this example, because
  // we're using a keyboard without return button, but I left it here
  // in case you'd want to switch to a different keyboard
  onSubmitEditing = ({nativeEvent: {text}}) =>
    this.setState({text}, this.submit);

  // Call this.props.onSubmit handler and pass the comment
  submit = () => {
    const {text} = this.state;
    if (text) {
      this.setState({text: undefined}, () => this.props.onSubmit(text));
    } else {
      alert('Please enter your comment first');
    }
  };

  render() {
    return (
      // This moves children view with input field and submit button
      // up above the keyboard when it's active
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#EEE',
    alignItems: 'center',
    paddingLeft: 15,
    marginTop: 50,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 15,
  },
  button: {
    height: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactive: {
    color: '#a8a5a5',
  },
  text: {
    color: '#3F51B5',
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    textAlign: 'center',
    fontSize: 15,
  },
});
