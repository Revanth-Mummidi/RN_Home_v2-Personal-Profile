import {View, Text, ScrollView, Pressable, Image, FlatList} from 'react-native';
import getStyles from '../../utils/MoreStyles';
import {useSelector, useDispatch} from 'react-redux';
import {t} from   '../../../../services/language/Translate';
import React, {useState} from 'react';
import LanguagesList from '../../../../services/language/LanguagesList.json';
import i18next, {LangResources} from '../../../../services/language/i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Languages = () => {
  
  const themeObj = useSelector(state => state.theme);
  const lan = useSelector(state => state.lang);
  const Color = themeObj.Colors;
  const styles = getStyles(Color);
  var activeColor = Color.more_button;
  var inactiveColor = Color.more_buttonActive;
  const [selectedLang, setselectedLang] = useState(lan.lang);
  const LanguageChange = async item => {
    setselectedLang(item);
    i18next.changeLanguage(item);
    await AsyncStorage.setItem('language', item);
  };
  return (
    <View style={styles.card}>
      <Text style={{...styles.titleText,color:Color.account_heading}}>{t('Accounts.Choose Language')}</Text>

      <FlatList
        nestedScrollEnabled={true}
        horizontal={true}
        data={Object.keys(LangResources)}
        renderItem={({item, index}) => {
          console.log(item);
          return (
            <Pressable
              //   onPress={() => handleThemeChange('hin')}
              onPress={() => {
                LanguageChange(item);
              }}
              style={[
                styles.scrollbutton,
                {
                  backgroundColor:
                    selectedLang === item ? activeColor : inactiveColor,
                },
              ]}>
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: selectedLang === item ? inactiveColor : activeColor,
                  },
                ]}>
                {LanguagesList[item].nativeName}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default Languages;