import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'

export default function TextInput({ errorText, style,description, ...props  }) {
  return (
    <View style={style}>
      <Input
        style={styles.input}
          returnKeyType='done'
          activeOutlineColor='green'
          
        {...props}
      
        textBreakStrategy='highQuality'
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: 'rgba(0,0,0,0)',
    
  },
  description: {
    fontSize: 13,
    color: 'green',
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: 'red',
    paddingTop: 8,
  },
})