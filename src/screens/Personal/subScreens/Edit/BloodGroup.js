import {Pressable, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Color, Strings} from '../../../../themes';
import styles from '../../utils/PersonalStyles';
import getStyles from '../../utils/PersonalStyles';
import {useSelector} from 'react-redux';
import { getColor } from '../../../../themes/GetColor';

const BloodGroup = ({bloodGroup}) => {
  const Color=getColor(useSelector(state=>state.theme.theme));
  const styles=getStyles();
  const [selected, setSelected] = useState(bloodGroup);
  return (
    <View>
      <Text style={[styles.heading17, styles.headingStyle]}>
        Blood Group {'\n'}
        <Text style={styles.subHeading13}>Preventive & Emergency</Text>
      </Text>
      <View style={styles.selectedItem}>
        <Text style={{...styles.bigTitle26, color: Color.WHITE}}>
          {selected}
        </Text>
      </View>
      <View style={{alignItems: 'center', paddingVertical: 5}}>
        <View style={styles.flexRowWrap}>
          <Pressable
            onPress={() => {
              setSelected('A +');
            }}>
            <Text style={selected == 'A +' ? styles.active : styles.inActive}>
              A+
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setSelected('A -');
            }}>
            <Text style={selected == 'A -' ? styles.active : styles.inActive}>
              A-
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setSelected('B +');
            }}>
            <Text style={selected == 'B +' ? styles.active : styles.inActive}>
              B+
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setSelected('B -');
            }}>
            <Text style={selected == 'B -' ? styles.active : styles.inActive}>
              B-
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              setSelected('O +');
            }}>
            <Text style={selected == 'O +' ? styles.active : styles.inActive}>
              O+
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setSelected('O -');
            }}>
            <Text style={selected == 'O -' ? styles.active : styles.inActive}>
              O-
            </Text>
          </Pressable>
        </View>
        <View style={styles.flexRowWrap}>
          <Pressable
            onPress={() => {
              setSelected('AB +');
            }}>
            <Text style={selected == 'AB +' ? styles.active : styles.inActive}>
              AB+
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setSelected('AB -');
            }}>
            <Text style={selected == 'AB -' ? styles.active : styles.inActive}>
              AB-
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              setSelected('Oh +');
            }}>
            <Text style={selected == 'Oh +' ? styles.active : styles.inActive}>
              Oh+
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setSelected('Oh -');
            }}>
            <Text style={selected == 'Oh -' ? styles.active : styles.inActive}>
              Oh-
            </Text>
          </Pressable>
        </View>
      </View>

      <Pressable onPress={() => {}} style={styles.mediumButton}>
        <Text style={styles.buttonText14}>{Strings.buttonConfirm}</Text>
      </Pressable>
    </View>
  );
};

export default BloodGroup;
