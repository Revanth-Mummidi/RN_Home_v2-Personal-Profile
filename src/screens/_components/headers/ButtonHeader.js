/// Total height of the component will be around 70 and can be extendable as per below component,

import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AppStatusBar from './AppStatusBar';
import {useNavigation} from '@react-navigation/native';

import {Image} from 'react-native';
import {Colors} from '../../../themes';
import {ThemeContext} from '../../../themes/components/ThemeContext';
const ButtonHeader = props => {
  const navigation = useNavigation();
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  const styles = getStyles(Color);
  return (
    <>
      <AppStatusBar
        backgroundColor={Color.linear1}
        barStyle="light-content"
        visibleStatusBar={false}
        translucent
      />
      <LinearGradient
        colors={[Color.linear1, Color.linear2, Color.linear3]}
        style={styles.linearGradient}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginTop: 8,
            marginBottom: 13,
            // backgroundColor: 'black',
          }}>
          <Pressable
            activeOpacity={1}
            onPress={() => navigation.goBack()}
            style={{
              width: '15%',
              alignItems: 'center',
              // backgroundColor: 'red',
            }}>
            <Image
              style={{
                width: 31,
                height: 31,
                tintColor: Color.header_iconInactive,
              }}
              source={require('../assets/icons/arrow-left.png')}
            />
          </Pressable>
          <View
            style={{
              width: '62%',
              alignItems: 'center',
              justifyContent: 'flex-start',
              //backgroundColor: 'yellow',
            }}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 17,
                fontWeight: '600',
                color: Color.headerTitle,
                width: '100%',
                //backgroundColor: 'yellow',
                textAlign: 'center',
              }}>
              {props?.title}
            </Text>
          </View>
          <View
            style={{
              width: '28%',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexDirection: 'row',
              //backgroundColor: 'red',
              paddingRight: 10,
            }}>
            {props?.rightElement}
          </View>
        </View>

        <View style={{position: 'relative'}}>{props?.children}</View>
      </LinearGradient>
    </>
  );
};

export default ButtonHeader;
const getStyles = Color => {
  const style = StyleSheet.create({
    linearGradient: {
      flexDirection: 'column',
      alignContent: 'center',
      justifyContent: 'center',
      // height: 50,
    },
  });
  return style;
};
