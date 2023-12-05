import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../../../../themes';
import {useNavigation} from '@react-navigation/native';
import ImageAutoScale from '../../imageProcessing/imageAutoScale';

const WIDTH = Dimensions.get('window').width;
const Services = ({item, index}) => {
  const navigation = useNavigation();
  const [bookmark, setbookmark] = useState(false);
  const [like, setlike] = useState(false);
  const [cart, setCart] = useState(false);
  return (
    <Pressable
      onPress={() => {
        // setSelectedId(item.id);
      }}
      style={{alignItems: 'center'}}>
      <View
        style={{
          padding: 10,
        }}>
        <ImageAutoScale
          source={{uri: item?.feed}}
          width={WIDTH * 0.95}
          style={{borderTopLeftRadius: 10, borderTopRightRadius: 10}}
        />
        <View
          style={{
            ...styles.headerContainer,
            justifyContent: 'space-between',
            backgroundColor: Color.WHITE,
          }}>
          <TouchableOpacity
            onPress={() => {
              setbookmark(!bookmark);
            }}
            style={{...styles.iconContainer, marginRight: 14}}>
            <Image
              source={
                bookmark
                  ? require('../../assets/icons/bookmarkActive.png')
                  : require('../../assets/icons/bookmark.png')
              }
              style={{
                ...styles.icon,
                resizeMode: 'contain',
                tintColor: bookmark ? Color.blue : Color.mediumGray,
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TouchableOpacity style={styles.iconContainer}>
              <Image
                source={require('../../assets/icons/share.png')}
                style={styles.icon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setlike(!like);
              }}
              style={{
                // backgroundColor: Color.aquaBlue,
                borderRadius: 20,
                paddingHorizontal: 15,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={
                  like
                    ? require('../../assets/icons/heartActive.png')
                    : require('../../assets/icons/heartInactive.png')
                }
                style={{
                  ...styles.icon,
                  resizeMode: 'contain',
                  marginRight: 5,
                }}
              />
              <Text style={{color: Color.blue}}>{item?.likes}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            backgroundColor: Color.WHITE,
            padding: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}>
          <Text
            style={{
              color: Color.blue,
              fontWeight: '800',
              marginBottom: 10,
              fontSize: 15,
              letterSpacing: 0.8,
            }}>
            {item?.product}
          </Text>
          <Text style={{color: Color.blue}} numberOfLines={4}>
            {item?.description}
          </Text>
          {item?.showCart ? (
            <TouchableOpacity
              onPress={() => {
                setCart(!cart);
              }}
              style={{
                height: 40,
                backgroundColor: Color.blue,
                borderRadius: 10,
                paddingHorizontal: 15,
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-end',
                marginVertical: 10,
              }}>
              <Image
                source={
                  cart
                    ? require('../../assets/icons/bag-2.png')
                    : require('../../assets/icons/bag-2Inactive.png')
                }
                style={{
                  ...styles.icon,
                  tintColor: Color.WHITE,
                  resizeMode: 'contain',
                  marginRight: 5,
                }}
              />
              <Text style={{color: Color.WHITE}}>Cart</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
};

export default Services;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 50,
    // backgroundColor: Color.aquaBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 23,
    height: 23,
    tintColor: Color.blue,
  },
});
