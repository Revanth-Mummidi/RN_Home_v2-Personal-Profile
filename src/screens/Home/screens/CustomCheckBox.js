import React, { useState } from 'react';
import { useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';


const CustomCheckBox = ({ label, selected, onToggle }) => {
  // useEffect(()=>{
  //   console.log("sele:",selected)
  // },[])
    const handleToggle = () => {
      onToggle(!selected);
    };
  
    return (
      <TouchableOpacity onPress={handleToggle}>
        <View style={styles.container}>
          <View
            style={[
              styles.checkbox,
              { backgroundColor: selected ? '#007AFF' : 'transparent' },
            ]}
          >
            {selected && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#007AFF',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: 'white',
  },
});

export default CustomCheckBox;
