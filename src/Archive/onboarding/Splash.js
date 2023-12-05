import React, {useEffect} from 'react';
import Lottie from 'lottie-react-native';
import {StatusBar, StyleSheet, Text, View, useColorScheme} from 'react-native';
import {darkThemeColors, lightThemeColors} from '../../utils/Colors';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../themes/ResponsiveDimensions';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setTheme} from '../../redux/slices/ThemeSlice';
import LinearGradient from 'react-native-linear-gradient';
import {getColor} from '../..//themes/GetColor';
const Splash = () => {
  const navigation = useNavigation();
  const appTheme = useColorScheme();
  const theme = useSelector(state => state.theme);
  const userData = useSelector(state => state.userOnboarding);
  const Color = getColor(theme.theme);

  const dispatch = useDispatch();
  useEffect(() => {
    if (theme.theme == '') {
      dispatch(setTheme(appTheme));
    }
    setTimeout(() => {
      if (userData.isDataSubmitted) {
        navigation.navigate('BottomNavigator');
      } else {
        navigation.navigate('UserVerification');
      }
    }, 2000);
  }, []);
  return (
    <View style={[styles.container, {backgroundColor: Color.loader_bg}]}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={theme.theme == 'dark' ? 'light-content' : 'dark-content'}
      />
      <Lottie
        source={require('../../assets/json/multiColorDots.json')}
        autoPlay
        loop
        style={styles.loader}
      />
    </View>
  );
};
export default Splash;
const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    width: responsiveWidth(80),
    height: responsiveHeight(40),
  },
});

//  colors={[Color.linearFS1, Color.linearFS2, Color.linearFS3]}
