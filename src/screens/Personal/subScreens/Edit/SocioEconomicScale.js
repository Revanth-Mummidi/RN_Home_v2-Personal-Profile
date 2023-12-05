import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Color, Strings} from '../../../../themes';
import Modal from 'react-native-modal';
import {ScrollView} from 'react-native';
import styles from '../../utils/PersonalStyles';
import {useSelector} from 'react-redux';
import getStyles from '../../utils/PersonalStyles';
import { getColor } from '../../../../themes/GetColor';

const SocioEconomicScale = () => {
  const Color=getColor(useSelector(state=>state.theme.theme));
  const styles=getStyles();
  const [trySES, setTrySES] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [dropDown, setDropDown] = useState('');

  return (
    <View style={styles.parentWidth}>
      <Text style={{...styles.heading20, ...styles.headingStyle}}>
        Socio Economical Scale{'\n'}
        <Text style={styles.subHeading13}>Modified Kuppuswamy Scale</Text>
      </Text>

      <View style={styles.cardCircleMedium}>
        <Text
          style={{
            ...styles.title22,
            color: Color.WHITE,
          }}>
          16.8
        </Text>
        <Text style={{...styles.subHeading13, color: Color.WHITE}}>
          Upper Middle
        </Text>
      </View>
      <View style={{marginTop: 20}}>
        <Pressable
          onPress={() => {
            setShowModal(true);
            setDropDown('occupation');
          }}
          style={styles.textFieldReplica}>
          <Text style={{color: Color.blue}}>
            Occupation of Head of the family
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setShowModal(true);
            setDropDown('education');
          }}
          style={styles.textFieldReplica}>
          <Text style={{color: Color.blue}}>Education</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setShowModal(true);
            setDropDown('income');
          }}
          style={styles.textFieldReplica}>
          <Text style={{color: Color.blue}}>Family Income</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={() => {
          setTrySES(!trySES);
        }}
        style={styles.mediumButton}>
        <Text style={styles.buttonText14}>{Strings.buttonCheck}</Text>
      </Pressable>

      <Modal
        isVisible={showModal}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onBackdropPress={() => setShowModal(false)}>
        <ScrollView
          contentContainerStyle={{
            padding: 20,
          }}
          style={{
            width: '90%',
            maxHeight: '70%',
            backgroundColor: Color.white,
            borderRadius: 4,
          }}>
          {dropDown === 'occupation' ? (
            <View style={{}}>
              <Text style={{...styles.heading17, ...styles.headingTextStyle}}>
                Occupation of Head of the family
              </Text>
              {occupation.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      backgroundColor: Color.aquaBlue,
                      marginBottom: 10,
                      padding: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: '600', color: Color.blue}}>
                      {item?.title}
                    </Text>
                  </View>
                );
              })}
            </View>
          ) : dropDown === 'education' ? (
            <View>
              <Text style={{...styles.heading17, ...styles.headingTextStyle}}>
                Education of Head of the family
              </Text>
              {education.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      backgroundColor: Color.aquaBlue,
                      marginBottom: 10,
                      padding: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: '600', color: Color.blue}}>
                      {item?.title}
                    </Text>
                  </View>
                );
              })}
            </View>
          ) : (
            <View>
              <Text style={{...styles.heading17, ...styles.headingTextStyle}}>
                Family income per Month
              </Text>
              {income.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      backgroundColor: Color.aquaBlue,
                      marginBottom: 10,
                      padding: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: '600', color: Color.blue}}>
                      {item?.title}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
      </Modal>
    </View>
  );
};

export default SocioEconomicScale;

const occupation = [
  {id: 1, title: 'Professional'},
  {id: 2, title: 'Semi-professional'},
  {id: 3, title: 'Clerical/shop/farmer'},
  {id: 4, title: 'Skilled worker'},
  {id: 5, title: 'Semi-skilled worker'},
  {id: 6, title: 'Unskilled worker'},
  {id: 7, title: 'Unemployed'},
];

const education = [
  {id: 1, title: 'Professional degree'},
  {id: 2, title: 'Graduate'},
  {id: 3, title: 'Intermediate/diploma'},
  {id: 4, title: 'High school'},
  {id: 5, title: 'Middle school'},
  {id: 6, title: 'Primary school'},
  {id: 7, title: 'Illiterate'},
];
const income = [
  {id: 1, title: '≥ ₹185,895'},
  {id: 2, title: '₹92,951 - ₹185,894'},
  {id: 3, title: '₹69,535 - ₹92,950'},
  {id: 4, title: '₹46,475 - ₹69,534'},
  {id: 5, title: '₹27,883 - ₹46,474'},
  {id: 6, title: '₹9,308 - ₹27,882'},
  {id: 7, title: '≤ ₹9307'},
];
