import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const CallRoom = () => {
    const navigation=useNavigation()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Call Room</Text>
      <View style={styles.button}>
      <Button
        title="Make Call"
        onPress={() => navigation.navigate('CreateRoom')}
      />
        </View>
      <Button
        title="Join Call"
        onPress={() => navigation.navigate('JoinRoom')}
      />
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color:"black",
    marginBottom: 20,
  },
  button: {
    marginBottom:10,
  },
});

export default CallRoom;
