import {FlatList, StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React, { useSyncExternalStore } from 'react';

import {Color, Strings} from '../../../../themes';
import {
  HandleBottomSheet,
  TextInputFields,
  TileCardContainer,
} from '../../../_components';
import getStyles from '../../utils/PersonalStyles';
const CallHospital = () => {
  refAddHospital = React.useRef(null);
  const styles=getStyles();
  
  const [phoneNumber, setPhoneNumber] = React.useState('');

  const renderDoctorData = (data, index) => {
    return (
      <Pressable
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 100,
          marginHorizontal: 2,
        }}
        key={index}>
        <Image style={styles.image46} source={{uri: data?.source}} />
        <Text numberOfLines={1} style={styles.text14}>
          {data?.name || 'doctor'}
        </Text>
        <Text numberOfLines={1} style={styles.text11}>
          {data?.specialization || 'Specialist'}
        </Text>
      </Pressable>
    );
  };

  const addHospital = (data, index) => {
    return (
      <View style={{padding: 10}}>
        <View style={styles.textFieldRowBetween}>
          <View style={{width: '83%'}}>
            <TextInputFields
              label={'Speciality'}
              value={phoneNumber}
              onChange={fetchPhoneNumber}
            />
          </View>

          <Pressable
            onPress={phoneNumberHandler}
            style={{
              borderRadius: 10,
              backgroundColor: Color.aquaBlue,
              width: '15%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={
                phoneNumber == ''
                  ? require('../../assets/icons/search-Bold.png')
                  : require('../../assets/icons/sendBold.png')
              }
              style={{width: 30, height: 30, tintColor: Color.blue}}
            />
          </Pressable>
        </View>
        <TextInputFields label={'Hospital show in list may be'} />
        <Pressable onPress={() => {}} style={styles.mediumButton}>
          <Text style={styles.buttonText14}>{Strings.buttonSave}</Text>
        </Pressable>
      </View>
    );
  };
  function fetchPhoneNumber(enteredNumber) {
    setPhoneNumber(enteredNumber);
  }
  function phoneNumberHandler() {
    if (phoneNumber == '') {
      openContacts();
    } else {
      savePhoneNumber(phoneNumber);
    }
  }
  function openContacts() {
    alert('oopening contact');
  }
  function savePhoneNumber(phoneNumber) {}

  return (
    <View>
      <HandleBottomSheet
        containerStyle={{backgroundColor: Color.WHITE}}
        bottomSheetRef={refAddHospital}
        content={addHospital()}
        dragFromTop={true}
        height={300}
        draggableIcon={{backgroundColor: Color.BLACK, width: 100}}
      />
      <TileCardContainer
        title={'Preferred Hospitals'}
        showIcon={true}
        onPressIcon={() => {
          refAddHospital.current.open();
        }}>
        <View>
          <FlatList
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            key={'flat list'}
            data={emergencyFriends || []}
            renderItem={({item, index}) => renderDoctorData(item, index)}
            keyExtractor={item => item.id}
          />
        </View>
      </TileCardContainer>
    </View>
  );
};

export default CallHospital;

// const styles = StyleSheet.create({
//   listContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//   },
//   listImageStyle: {
//     backgroundColor: Color.transparent,
//     height: 46,
//     width: 46,
//     borderRadius: 100,
//   },
//   detailContained: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 100,
//     marginHorizontal: 2,
//   },
//   listText: {color: Color.mediumGray, fontWeight: '500'},
//   listSubText: {color: Color.lightGray, fontSize: 11},
// });

const emergencyFriends = [
  {
    id: 1,
    name: 'Akshaya Apollo',
    specialization: 'Emergency',
    source:
      'https://www.tourmyindia.com/medical-tourism/blog/wp-content/uploads/2016/10/1469518547.jpg',
  },
  {
    id: 2,
    name: 'Indo American',
    specialization: 'Oncology',
    source: 'https://indoamericanhospital.in/uploads/bigphotogallery/1.jpg',
  },
  {
    id: 3,
    name: 'Apollo',
    specialization: 'General',
    source:
      'https://newassets.apollo247.com/cms/2022-04/Compressed%20Kolkata.jpeg',
  },
  {
    id: 4,
    name: 'Smile Dental',
    specialization: 'Dental',
    source:
      'https://images1-fabric.practo.com/smiles-dental-clinic-visakhapatnam-1469106369-5790c8c141a86.JPG',
  },
  {
    id: 5,
    name: 'AIIMS',
    specialization: 'Emergency',
    source:
      'https://medicaldialogues.in/h-upload/2022/02/21/170895-126075-aiims-delhi.jpg',
  },
  {
    id: 6,
    name: 'Dr.Batra',
    specialization: 'Hairloss',
    source:
      'https://images1-fabric.practo.com/practices/1260950/dr-batra-s-positive-health-clinic-pvt-ltd-hyderabad-5de78c8e3bb31.jpg',
  },
];
