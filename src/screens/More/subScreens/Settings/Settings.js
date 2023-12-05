import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Appearance,
} from 'react-native';
import {ThemeContext} from '../../../../themes/components/ThemeContext';
import {Color} from '../../../../themes';
import {ChangeTheme} from '../../utils/MoreServerRequests';
import {
  lightThemeColors,
  darkThemeColors,
  womenThemeColors,
} from '../../../../themes/Color';
import {set} from 'react-native-reanimated';
const Settings = () => {
  const [colors, setColors] = useState(lightThemeColors);
  const {theme, toggleTheme} = useContext(ThemeContext);
  const [initialTheme, setInitialTheme] = useState(theme);
  const styles = getstyles(colors);
  const [themeState, setThemeState] = React.useState(theme);
  const handleThemeChange = newTheme => {
    let newtheme_ = newTheme;
    if (newTheme === 'sysdes') {
      const colorScheme = Appearance.getColorScheme();
      if (colorScheme === 'dark') {
        newtheme_ = 'dark';
      } else {
        newtheme_ = 'light';
      }
    }
    toggleTheme(newtheme_);
    setThemeState(newtheme_);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setThemeState(initialTheme);
    toggleTheme(initialTheme);
    setModalVisible(false);
  };
  const save = async () => {
    const data = {
      theme: themeState,
    };
    const response = await ChangeTheme(data);
    if (response === 'success') {
      toggleTheme(themeState);
      setModalVisible(false);
    } else {
      setThemeState(initialTheme);
      toggleTheme(initialTheme);
      setModalVisible(false);
    }
  };
  React.useEffect(() => {
    if (themeState === 'light') {
      setColors(lightThemeColors);
    } else if (themeState === 'dark') {
      setColors(darkThemeColors);
    } else if (themeState === 'women') {
      setColors(womenThemeColors);
    }
  }, [themeState]);

  return (
    <View style={styles.parent}>
      <View
        style={{
          backgroundColor: Color.midBlue,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: 30,
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: Color.white}}>
          Settings
        </Text>
      </View>

      <TouchableOpacity style={styles.settingItem} onPress={openModal}>
        <Text style={styles.settingLabel}>Change Theme</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              {backgroundColor: colors.settingsModal},
            ]}>
            <Text style={styles.modalTitle}>Theme</Text>
            <TouchableOpacity
              style={[
                styles.themeContainer,
                themeState === 'light' && {backgroundColor: '#eee'},
              ]}
              onPress={() => handleThemeChange('light')}>
              <Text style={[styles.label, {color: colors.settingsModalText}]}>
                Light
              </Text>
              <Text style={styles.themeText}>⬜</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.themeContainer,
                themeState === 'dark' && {backgroundColor: '#eee'},
              ]}
              onPress={() => handleThemeChange('dark')}>
              <Text style={[styles.label, {color: colors.settingsModalText}]}>
                Dark
              </Text>
              <Text style={styles.themeText}>⬛</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.themeContainer,
                themeState === 'women' && {backgroundColor: '#eee'},
              ]}
              onPress={() => handleThemeChange('women')}>
              <Text style={[styles.label, {color: colors.settingsModalText}]}>
                Women
              </Text>
              <Text style={styles.themeText}>🟥</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.themeContainer,
                themeState === 'sysdes' && {backgroundColor: '#eee'},
              ]}
              onPress={() => {
                handleThemeChange('sysdes');
              }}>
              <Text style={[styles.label, {color: colors.settingsModalText}]}>
                System Default
              </Text>
              <Text style={styles.themeText}></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={save}>
              <Text style={styles.closeButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const getstyles = colors => {
  const styles = StyleSheet.create({
    themeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    label: {
      fontSize: 18,
      marginRight: 10,
    },
    themeText: {
      fontSize: 18,
      fontWeight: 'bold',
      textTransform: 'capitalize',
      color: '#333',
    },

    settingItem: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    settingLabel: {
      fontSize: 18,
      color: '#333',
    },

    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      padding: 20,
      borderRadius: 5,
      width: '80%',
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
    },
    closeButton: {
      backgroundColor: '#2196F3',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignSelf: 'flex-end',
    },
    closeButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

  return styles;
};

export default Settings;
