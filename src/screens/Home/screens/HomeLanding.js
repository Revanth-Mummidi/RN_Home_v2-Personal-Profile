import {StyleSheet, View, Dimensions, Pressable} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../../themes';
import LinearGradient from 'react-native-linear-gradient';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LandingPage from '../subScreens/home/LandingPage';
import StartingPage from '../subScreens/home/StartingPage';
import {ThemeContext} from '../../../themes/components/ThemeContext';
import getStyles from '../utils/homeStyles';

// let Theme = 'dark';
const HEIGHT = Dimensions.get('window').height;
const HomeLanding = () => {
  const navigation = useNavigation();
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  const styles = getStyles(Color);
  // Theme = theme;

  return (
    <>
      <View style={styles.parent}>
        {/* <StartingPage /> */}
        <LandingPage />
        
      </View>
      <LinearGradient
        colors={[Color.buttonLinear1, Color.buttonLinear2, Color.buttonLinear3]}
        style={styles.post}>
        <Pressable
          onPress={() =>
            // navigation.navigate('Scheduler', {screen: 'AddNewTasks'})
            navigation.navigate('FeedPost')
          }>
          <IconMaterialCommunityIcons
            name={'feather'}
            size={23}
            color={Color.buttonlinearIcon}
          />
        </Pressable>
      </LinearGradient>
    </>
  );
};

export default HomeLanding;
