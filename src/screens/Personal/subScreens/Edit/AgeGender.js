import {Pressable, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {Color, Strings} from '../../../../themes';
import {
  DateOnlyPicker,
  TextInputFields,
  TileCardContainer,
} from '../../../_components';
import ExpandableCalendarTest from '../../../_components/calenders/ExpandableCalendarTest';
import {useSelector} from 'react-redux';
import getStyles from '../../utils/PersonalStyles';
import { getColor } from '../../../../themes/GetColor';

const AgeGender = ({selectedGender}) => {
  const styles=getStyles();
  const Color=getColor(useSelector(state=>state.theme.theme));
  const [gender, setGender] = useState(selectedGender);
  var activeColor = Color.midBlue;
  var inActiveColor = Color.aquaBlue;
  return (
    <View style={styles.parentWidth}>
      <Text style={[styles.heading17, styles.headingStyle]}>
        Basic Info {'\n'}
        <Text style={styles.subHeading13}>Personalize Profile</Text>
      </Text>
      <View style={styles.selectedItem}>
        <Text style={{...styles.heading20, color: Color.WHITE}}>34</Text>
        <Text style={{...styles.heading20, color: Color.WHITE}}>Male</Text>
      </View>

      <View style={styles.textFieldRowBetween}>
        <View style={{width: '49%'}}>
          <TextInputFields label={'First Name'} />
        </View>
        <View style={{width: '49%'}}>
          <TextInputFields label={'Last Name'} />
        </View>
      </View>

      {/* <Text style={{...styles.heading17}}>Date of Birth</Text> */}

      <TileCardContainer
        title={'Date of Birth'}
        containerStyle={styles.tileCardContainer}>
        <View style={{}}>
          <ExpandableCalendarTest />
        </View>
        {/* <DateOnlyPicker /> */}
      </TileCardContainer>
      <TileCardContainer
        title={'Gender'}
        containerStyle={styles.tileCardContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            margin: 10,
          }}>
          <Pressable
            onPress={() => {
              setGender('M');
            }}
            style={{
              ...styles.iconContainer,
              backgroundColor: gender === 'M' ? activeColor : 'transparent',
            }}>
            <Image
              style={{
                ...styles.mediumIcon,
                tintColor: gender === 'M' ? inActiveColor : activeColor,
              }}
              source={require('../../assets/icons/Male_symbol_(fixed_width).svg.png')}
              resizeMode={'contain'}
            />
            <Text
              style={{
                ...styles.subtitle13,
                color: gender === 'M' ? inActiveColor : activeColor,
              }}>
              Male
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setGender('F');
            }}
            style={{
              ...styles.iconContainer,
              backgroundColor: gender === 'F' ? activeColor : 'transparent',
            }}>
            <Image
              source={require('../../assets/icons/Venus_symbol_(fixed_width).svg.png')}
              resizeMode={'contain'}
              style={{
                ...styles.mediumIcon,
                tintColor: gender === 'F' ? inActiveColor : activeColor,
              }}
            />
            <Text
              style={{
                ...styles.subtitle13,
                color: gender === 'F' ? inActiveColor : activeColor,
              }}>
              Female
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setGender('TM');
            }}
            style={{
              ...styles.iconContainer,
              backgroundColor: gender === 'TM' ? activeColor : 'transparent',
            }}>
            <Image
              source={require('../../assets/icons/Male_and_female_sign.svg.png')}
              resizeMode={'contain'}
              style={{
                ...styles.mediumIcon,
                tintColor: gender === 'TM' ? inActiveColor : activeColor,
              }}
            />
            <Text
              style={{
                ...styles.subtitle13,
                color: gender === 'TM' ? inActiveColor : activeColor,
              }}>
              Trans Male
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setGender('TF');
            }}
            style={{
              ...styles.iconContainer,
              backgroundColor: gender === 'TF' ? activeColor : 'transparent',
            }}>
            <Image
              source={require('../../assets/icons/Male_and_female_sign.svg.png')}
              resizeMode={'contain'}
              style={{
                ...styles.mediumIcon,
                tintColor: gender === 'TF' ? inActiveColor : activeColor,
              }}
            />
            <Text
              style={{
                ...styles.subtitle13,
                color: gender === 'TF' ? inActiveColor : activeColor,
              }}>
              Trans Female
            </Text>
          </Pressable>
        </View>
      </TileCardContainer>

      <View style={{paddingVertical: 10}}>
        <TextInputFields label={'Profession'} />
      </View>
      <View style={{paddingVertical: 10}}>
        <TextInputFields label={'Nationality'} />
      </View>

      <View style={styles.textFieldRowBetween}>
        <View style={{width: '49%'}}>
          <TextInputFields label={'Ethnicity'} />
        </View>
        <View style={{width: '49%'}}>
          <TextInputFields label={'Religion'} />
        </View>
      </View>

      <Pressable style={styles.mediumButton}>
        <Text style={styles.buttonText14}>{Strings.buttonConfirm}</Text>
      </Pressable>
    </View>
  );
};

export default AgeGender;
