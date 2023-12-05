// Ref: https://www.youtube.com/watch?v=JQdEtVwqH34

import {
    View,
    Text,
    Platform,
    PermissionsAndroid,
    Pressable,
    FlatList,
    Dimensions,
    Image,
    StyleSheet, useWindowDimensions,

  } from 'react-native';

  import React, {useState, useEffect} from 'react';
  import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
  
  export default function CameraGallaryRoll () {
    const navigation = useNavigation()
    const [photos, setPhotos] = useState([]);
    useEffect(() => {
      hasPermission();
      getAllPhotos();
    }, []);
    

    const hasPermission = async () => {
      const getCheckPermissionPromise = () => {
        if (Platform.Version >= 33) {
          return Promise.all([
            PermissionsAndroid.check(
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            ),
            PermissionsAndroid.check(
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
            ),
          ]).then(
            ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
              hasReadMediaImagesPermission && hasReadMediaVideoPermission,
          );
        } else {
          return PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          );
        }
      };
  
      const hasPermission = await getCheckPermissionPromise();
      if (hasPermission) {
        return true;
      }
      const getRequestPermissionPromise = () => {
        if (Platform.Version >= 33) {
          return PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ]).then(
            statuses =>
              statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
                PermissionsAndroid.RESULTS.GRANTED &&
              statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
                PermissionsAndroid.RESULTS.GRANTED,
          );
        } else {
          return PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
        }
      };
      return await getRequestPermissionPromise();
    };
  
    
    const getAllPhotos = () => {
      CameraRoll.getPhotos({
        first: 100,
        assetType: 'Photos',
      })
        .then(r => {
          console.log( JSON.stringify(r.edges));
          setPhotos(r.edges);
        })     
        .catch(err => {
            console.log(err);
        });

    };

    
    const data = [
        { key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }, { key: '5' }, { key: '6' }, { key: '7' }, { key: '8' }, { key: '9' }
      ];
      
      const minCols = 2;
      
      const calcNumColumns = (width) => {
        const cols = width / styles.item.width;
        const colsFloor = Math.floor(cols) > minCols ? Math.floor(cols) : minCols;
        const colsMinusMargin = cols - (2 * colsFloor * styles.item.margin);
        if (colsMinusMargin < colsFloor && colsFloor > minCols) {
          return colsFloor - 1;
        } else return colsFloor;
      };
      
      const formatData = (data, numColumns) => {
        const amountFullRows = Math.floor(data.length / numColumns);
        let amountItemsLastRow = data.length - amountFullRows * numColumns;
      
        while (amountItemsLastRow !== numColumns && amountItemsLastRow !== 0) {
          data.push({key: `empty-${amountItemsLastRow}`, empty: true});
          amountItemsLastRow++;
        }
        return data;
      };
      
      const renderItem = ({ item, index }) => {
          if (item.empty) {
            return <View style={[styles.item, styles.itemTransparent]} />;
          }
          return (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.key}</Text>
            </View>
          );
        };



    const renderPhotos = ({item, index}) => {
      return (
        <View
          style={{
            width: 90,
            height: 80,
            alignContent:'center',
            alignItems:'center',
            justifyContent:'center',
          }}>
          <Image source={{uri: item.node.image.uri}} style={{width: '100%', height: '100%'}}/>
        </View>
      );
    };



    const {width} = useWindowDimensions();
    const [numColumns, setNumColumns] = useState(calcNumColumns(width));

    useEffect(() => { 
      setNumColumns(calcNumColumns(width));
      }, [width]);
    return (

      <View style={{alignContent:'center',alignItems:'center',justifyContent:'center'}}>

       
        <FlatList
          data={photos}
          renderItem={renderPhotos}
          horizontal={false}
          numColumns={numColumns}
        />
                                                  
 
      </View>
    );
  };
  
  
  const styles = StyleSheet.create({
    item: {
      backgroundColor: '#A1A1A1',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      margin: 1,
      height: 120,
      width: 90
    },
    itemTransparent: {
      backgroundColor: 'transparent',
    },
    itemText: {
      color: '#fff',
    },
  });