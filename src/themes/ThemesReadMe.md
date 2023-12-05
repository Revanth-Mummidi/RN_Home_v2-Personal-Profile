Certainly! Here's the documentation formatted in Markdown:

# Theme Documentation

## Getting Theme and Colors

To get the current theme and its corresponding colors, you can use the following steps:

### Import Statements:

```javascript
import { useSelector } from 'react-redux';
import {getColor} from 'path-to-GetColor.js';
```

### Usage:

```javascript
const Color = getColor(useSelector(state => state.theme).theme);
```

Here, `theme` will contain the current theme ('dark', 'light', etc.), and `colors` will be an object containing the color palette for the current theme.

## Setting Theme

To set a new theme, you can use the following steps:

### Import Statements:

```javascript
import { useDispatch } from 'react-redux';
import { setTheme } from './themeSlice.js';
```

### Usage:

```javascript
const dispatch = useDispatch();
dispatch(setTheme(newTheme));
```

Here, `newTheme` is the theme you want to set (e.g., 'dark', 'light', 'newtheme').

## Adding a New Theme

To add a new theme, you need to modify the `Color.js` file and export the new color object. Follow these steps:

### In Color.js File:

```javascript
// Add the new theme color object
export const newThemeColors = {
  ...commonColors,
  theme_textSubtitle: '#a1a2c3',
  arrowicon: '#86879E',
  theme_bgSecondary: '#363636',
  theme_card: '#202124',
  color1: '#7ce5e1', 
  color2: '#2ecc7d',
  color3: '#8fb7f3',
  color4: '#AF8FE9',
  color5: '#e9e07a',
};
```

### In GetColor.js File:

```javascript
import { Appearance } from 'react-native';
import { darkThemeColors, lightThemeColors, newThemeColors } from './Color';

export const getColor = theme => {
  let colors = null;
  if (theme === 'dark') {
    colors = darkThemeColors;
  } else if (theme === 'light') {
    colors = lightThemeColors;
  } 

  // Add new theme like this
  else if (theme === 'newtheme') {
    colors = newThemeColors; 
    // import newThemeColors from Color.js and return here
  } 
   
  else {
    const colorScheme = Appearance.getColorScheme();
    if (colorScheme === 'dark') {
      theme = 'dark';
      colors = darkThemeColors;
    } else {
      colors = lightThemeColors;
    }
  }
  return colors;
};
```

Ensure that after adding the new theme in `Color.js`, you export it and incorporate it into the `GetColor.js` file.

This documentation should help you understand how to get, set, and add new themes to your application.