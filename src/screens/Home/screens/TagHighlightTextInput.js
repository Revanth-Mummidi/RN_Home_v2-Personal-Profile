import React, { useState, useEffect } from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';

const TagHighlightTextInput = ({ value, onChangeText }) => {
  const [highlightedText, setHighlightedText] = useState('');

  useEffect(() => {
    highlightTags(value);
  }, [value]);

  const highlightTags = (text) => {
    const tagRegex = /#(\w+)/g;
    const parts = text.split(tagRegex);

    const highlightedParts = parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <Text key={index} style={styles.highlightedTag}>
            {`#${part}`}
          </Text>
        );
      }
      return part;
    });

    setHighlightedText(highlightedParts);
  };

  return (
    <View style={styles.container}>
      <View style={styles.highlightedContainer}>
        <View> <Text> {highlightedText}</Text> </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
  },
  highlightedContainer: {
    flexDirection: 'column',
  },
  highlightedTag: {
    color: 'blue', 
  },
});

export default TagHighlightTextInput;
