

// import React, { useState } from 'react';
// import { View, TextInput, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';

// const TagInput = () => {
//   const [inputText, setInputText] = useState('');
//   const [suggestedTags, setSuggestedTags] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);

//   const availableTags = ['react', 'javascript', 'redux', 'react-native', 'web-development', 'mobile-apps', 'programming'];

//   const handleInputChange = (text) => {
//     setInputText(text);
//     if (text.endsWith('#')) {
//       setShowSuggestions(true);
//     } else {
//       setShowSuggestions(false);
//     }
//   };

//   const handleTagSelection = (tag) => {
//     setInputText(inputText + tag + ' ');
//     setShowSuggestions(false);
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         value={inputText}
//         onChangeText={handleInputChange}
//         placeholder="Write your post here..."
//       />
//       {showSuggestions && (
//         <ScrollView style={styles.suggestionContainer}>
//           {availableTags.map((tag, index) => (
//             <TouchableOpacity
//               key={index}
//               onPress={() => handleTagSelection(tag)}
//             >
//               <Text style={styles.suggestedTag}>{tag}</Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   input: {
//     borderColor: 'gray',
//     borderWidth: 1,
//     padding: 8,
//     marginBottom: 16,
//   },
//   suggestionContainer: {
//     maxHeight: 100,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 5,
//   },
//   suggestedTag: {
//     padding: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: 'gray',
//   },
// });

// export default TagInput;

import React, { useState } from 'react';
import { View, TextInput, ScrollView, Text, StyleSheet,TouchableOpacity } from 'react-native';

const TagInput = () => {
  const [inputText, setInputText] = useState('');
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const availableTags = ['react', 'javascript', 'redux', 'react-native', 'web-development', 'mobile-apps', 'programming'];

  const handleInputChange = (text) => {
    setInputText(text);
    const tagQueryRegex = /#(\w+)/g;
    const matches = text.match(tagQueryRegex);

    if (matches && matches.length > 0) {
      const query = matches[matches.length - 1];
      const filteredTags = availableTags.filter(tag => tag.includes(query.substring(1).toLowerCase()));
      setSuggestedTags(filteredTags);
      setShowSuggestions(true);
    } else {
      setSuggestedTags([]);
      setShowSuggestions(false);
    }
  };

  const handleTagSelection = (tag) => {
    const tagQueryRegex = /#(\w+)/g;
    const matches = inputText.match(tagQueryRegex);

    if (matches && matches.length > 0) {
      const lastIndex = inputText.lastIndexOf(matches[matches.length - 1]);
      const updatedText = inputText.substring(0, lastIndex) + tag + ' ';
      setInputText(updatedText);
    } else {
      setInputText(tag + ' ');
    }

    setShowSuggestions(false);
    setSuggestedTags([]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={handleInputChange}
        placeholder="Write your post here..."
      />
      {showSuggestions && (
        <ScrollView style={styles.suggestionContainer}>
          {suggestedTags.map((tag, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleTagSelection(tag)}
            >
              <Text style={styles.suggestedTag}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
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
  suggestionContainer: {
    maxHeight: 100,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  suggestedTag: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default TagInput;
