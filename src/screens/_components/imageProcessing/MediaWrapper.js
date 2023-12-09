import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { responsiveWidth } from '../../../themes/ResponsiveDimensions';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setScreen } from '../../../redux/slices/MediaSlice';

const MediaWrapper = ({context,callback}) => {
const dispatch = useDispatch();
    const handleGalleryPress = () => {
      dispatch(setScreen(context));
        navigation.navigate('GalleryPicker');
        callback();
    };
    const handleCameraPress = () => {
        dispatch(setScreen(context));
        navigation.navigate('DefaultCamera');
        callback();
    }
    const  handleDocumentPress = () => {
      dispatch(setScreen(context));
        navigation.navigate('DocumentPicker');
        callback();
    }
    const handleScanerPress = () =>{
      dispatch(setScreen(context));
        navigation.navigate('BarcodeScanner');
        callback();
    }
    const navigation = useNavigation();
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', backgroundColor: '#3498db', padding: 16, borderRadius: 10, }}>
              {/* Gallery Icon */}
              <TouchableOpacity style={styles.iconContainer} onPress={handleGalleryPress}>
                <Icon name="photo" size={30} color="white" />
                <Text style={{ color: 'white', marginTop: 8 }}>Gallery</Text>
              </TouchableOpacity>
        
              {/* Documents Icon */}
              <TouchableOpacity style={styles.iconContainer} onPress={() => {handleDocumentPress()}}>
                <Icon name="description" size={30} color="white" />
                <Text style={{ color: 'white', marginTop: 8 }}>Docs</Text>
              </TouchableOpacity>
        
              {/* Camera Icon */}
              <TouchableOpacity style={styles.iconContainer} onPress={() => {handleCameraPress()}}>
                <Icon name="camera" size={30} color="white" />
                <Text style={{ color: 'white', marginTop: 8 }}>Camera</Text>
              </TouchableOpacity>
        
              {/* Scanner Icon */}
              <TouchableOpacity style={styles.iconContainer} onPress={() => {handleScanerPress()}}>
                <Icon name="scanner" size={30} color="white" />
                <Text style={{ color: 'white', marginTop: 8 }}>Scanner</Text>
              </TouchableOpacity>
            </View>
          );
}
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      backgroundColor: '#3498db', // Example background color, you can change it
      padding: 16,
      borderRadius: 10,
    },
    iconContainer: {
      alignItems: 'center',
      marginBottom: 16,
    },
    iconText: {
      color: 'white',
      marginTop: 8,
    },
  });

export default MediaWrapper