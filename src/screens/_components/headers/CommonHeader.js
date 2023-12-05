import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {getColor} from '../utils/GetColor';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

const CommonHeader = ({leftIcon, rightBtn,onLeftClick}) => {
  const theme = useSelector(state => state.theme);
  const Color = getColor(theme.theme);
  return (
    <>
      {theme.theme != '' && (
        <LinearGradient
          colors={[Color.linear1, Color.linear2, Color.linear3]}
          style={styles.header}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {leftIcon && (
              <TouchableOpacity
              onPress={()=>{
                onLeftClick()
              }}>
                <Image
                  source={leftIcon}
                  style={[styles.leftIcon, {tintColor: Color.headerTitle}]}
                />
              </TouchableOpacity>
            )}

            <Image
              source={{
                uri: 'https://photos1.blogger.com/blogger/6684/469/1600/Jake%20Glyllenhaal%20smile.0.jpg',
              }}
              style={[styles.profileImage, {marginLeft: leftIcon ? 20 : 5}]}
            />
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                marginLeft: 20,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: Color.headerTitle,
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                Gaurav
              </Text>
              <IconFontAwesome
                name={'angle-down'}
                size={17}
                color={Color.fontReadTheme}
                style={{marginLeft: 5}}
              />
            </TouchableOpacity>
          </View>
          {rightBtn && (
            <Text
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 7,
                paddingBottom: 7,
                backgroundColor: Color.midBlue,
                borderRadius: 20,
                color: Color.WHITE,
              }}>
              Post
            </Text>
          )}
        </LinearGradient>
      )}
    </>
  );
};

export default CommonHeader;
const styles = StyleSheet.create({
  header: {
    width: Dimensions.get('window').width,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop:40
  },
  leftIcon: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 15,
  },
});
