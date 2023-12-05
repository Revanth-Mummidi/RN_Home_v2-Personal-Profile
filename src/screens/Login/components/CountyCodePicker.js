import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';

import {darkThemeColors} from '../../../themes/Color';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../themes/ResponsiveDimensions';
import {Countries} from '../Countries';
const CountyCodePicker = ({isVisible, onSelect, onClose}) => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState(Countries);
  const filter = txt => {
   // console.log(txt);
    if (txt.length > 0) {
      // let final = countries.filter(item => {
      //   console.log(
      //     item.en.toString().toLowerCase() +
      //       '    ' +
      //       txt.toString().toLowerCase(),
      //   );
      //   return item.en
      //     .toString()
      //     .toLowerCase()
      //     .includes(txt.toString().toLowerCase());
      // });
    let count = Countries;
    let  final =  count.filter(item => item.en.toLowerCase().includes(txt.toLowerCase()))
   console.log(final)
      if (final.length > 0) {
        let tempData = [];
        final.map(item => {
          tempData.push(item);
        });
        setCountries(tempData);
      } else {
        setCountries([]);
      }
    } else {
      setCountries(Countries);
    }
  };
  return (
    <Modal
      onBackButtonPress={() => {
        onClose();
      }}
      onBackdropPress={() => {
        onClose();
      }}
    
      onSwipeComplete={() => {
        onClose();
      }}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={500}
      animationOutTiming={500}
      swipeDirection={'down'}
      isVisible={isVisible}
      style={{margin: 0}}>
      <View style={styles.modalView}>
        <Text style={styles.title}>Country Codes</Text>
        <View style={styles.searchView}>
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={txt => {
              setSearch(txt);
              filter(txt)
            }}
            placeholder="Search Country Name"
            placeholderTextColor={'#9e9e9e'}
          />
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => {
              filter(search);
            }}>
            <Image
              source={require('../../../assets/search.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          data={countries}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                style={styles.countryCodeItem}
                onPress={() => {
                  setSearch('');
                  setCountries(Countries);
                  onSelect(item.dialCode);
                }}>
                <View style={styles.flatBg}>
                  <Text style={styles.flag}>{item.flag}</Text>
                </View>
                <View style={{marginLeft: responsiveWidth(3)}}>
                  <Text style={styles.code}>{item.dialCode}</Text>
                  <Text style={styles.country}>{item.en}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </Modal>
  );
};

export default CountyCodePicker;
const styles = StyleSheet.create({
  modalView: {
    width: '100%',
    height: responsiveHeight(50),
    backgroundColor: darkThemeColors.random_fontActive,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: responsiveWidth(10),
    borderTopRightRadius: responsiveWidth(10),
  },
  title: {
    color: darkThemeColors.white,
    fontSize: responsiveFontSize(3),
    fontWeight: '600',
    marginLeft: responsiveWidth(5),
    marginTop: responsiveHeight(3),
  },
  searchView: {
    width: responsiveWidth(90),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(2),
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  searchInput: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    borderRadius: responsiveWidth(2),
    paddingLeft: responsiveWidth(3),
    fontSize: responsiveFontSize(2),
    fontWeight: '400',
    height: responsiveHeight(6),
  },
  searchBtn: {
    width: '15%',
    height: responsiveHeight(6),
    backgroundColor: 'white',

    borderRadius: responsiveWidth(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: responsiveWidth(8),
    height: responsiveWidth(8),
  },
  countryCodeItem: {
    width: '90%',
    height: responsiveHeight(9),
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
    borderRadius: responsiveWidth(2),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: responsiveWidth(3),
  },
  flatBg: {
    width: responsiveWidth(12),
    height: responsiveWidth(12),
    borderRadius: responsiveWidth(6),
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flag: {
    fontSize: responsiveFontSize(3),
  },
  country: {
    fontSize: responsiveFontSize(2),
    color: '#9e9e9e',
  },
  code: {
    fontSize: responsiveFontSize(2.1),
    color: '#000',
    fontWeight: '500',
  },
});
