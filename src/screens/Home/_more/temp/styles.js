import {StyleSheet} from 'react-native';
import {Color, Dimensions, Fonts} from '../../../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolbarTitle: {
    fontSize: 20,
    color: Color.WHITE,
    fontWeight: '700',
  },
  androidButtonText: {
    color: 'blue',
    fontSize: Dimensions.headerText,
  },
  toolBar: {
    width: '100%',
    display: 'flex',
    //backgroundColor: Colors.white,
    fontSize: Dimensions.headerText,
    height: Dimensions.headerheight,
    flexDirection: 'row',
    color: Color.textColor,
    alignItems: 'center',
    fontFamily: Fonts.primarySemiBold,
  },
  title: {
    color: Color.white,
    fontSize: Dimensions.title,
    fontWeight: '700',
    marginBottom: 16,
  },
  toggle: {
    padding: 10,
  },
});
