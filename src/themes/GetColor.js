import {darkThemeColors,lightThemeColors,womenThemeColors} from './Color';
import { Appearance } from 'react-native';
export const getColor = theme => {
  let colors = null;
  if (theme == 'dark') {
    colors = darkThemeColors;
  } else if (theme == 'light') {
    colors = lightThemeColors;
  } else if (theme == 'women') {
    colors = womenThemeColors;
  } else {
   
    const colorScheme = Appearance.getColorScheme();
    if (colorScheme === 'dark') {
      theme= 'dark';
      colors=darkThemeColors;
    } else {
      colors = lightThemeColors;
   }
}
  
  return colors;
};