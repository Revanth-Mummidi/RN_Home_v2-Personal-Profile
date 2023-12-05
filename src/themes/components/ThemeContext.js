import React, { createContext, useState } from 'react';
import { FetchTheme } from '../../screens/More/utils/MoreServerRequests';
import { Rect } from 'react-native-svg';
import { Appearance } from 'react-native';
// Create a ThemeContext
const ThemeContext = createContext();

// Create a ThemeProvider component to wrap your app
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const initialCheck = async () => {
    const themes = await FetchTheme();
    if (themes != 'dark' && themes != 'light' && themes != 'women') {
      const colorScheme = Appearance.getColorScheme();
      if (colorScheme === 'dark') {
        setTheme('dark');
      }
      else {
        setTheme('light');
      }
    }
    else {
      setTheme(themes);
    }
  };
  React.useEffect(() => {
    initialCheck();
  }, []);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  // Pass the theme and toggleTheme function to the context provider
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
