import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React from 'react';
import {TileCardContainer} from '../../../_components';
// import {Color} from '../../../../themes';
import {useSelector} from 'react-redux';
import { getColor } from '../../../../themes/GetColor';
import IconIonicons from 'react-native-vector-icons/Ionicons';

const EmergencyConcents = () => {
  const Color=getColor(useSelector(state=>state.theme.theme));
  const styles = StyleSheet.create({
    masterContainer: {flexDirection: 'row', marginBottom: 20},
    sectionContainer: {
      marginStart: 10,
      backgroundColor: Color.blue,
      borderRadius: 17,
      padding: 10,
      width: 190,
      paddingBottom: 17,
    },
    buttonStyle: {
      paddingVertical: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    mainTitle: {
      color: Color.lightblue,
      fontWeight: '600',
      marginBottom: 14,
      marginTop: 5,
    },
    title: {width: '87%', color: Color.WHITE, fontWeight: '600'},
    readtext: {width: '87%', color: Color.WHITE},
    iconContainer: {width: '12%', alignItems: 'center'},
  });
  
  const identification = [
    {
      id: 1,
      title: 'Snake tatoo on lfeft side of arm',
      image: require('../../assets/images/temp/Snake-Tattoo-Meaning-Banner-1080x450.jpg'),
    },
    {
      id: 2,
      title: 'Gold teeth - 3 molar',
      image: require('../../assets/images/Svante_Paabo_nobelPrizeMedicine.jpeg'),
    },
    {
      id: 3,
      title: 'Black mole on right hand',
      image: require('../../assets/images/temp/index.webp'),
    },
    {
      id: 4,
      title: 'Snake tatoo on lfeft side of arm',
      image: require('../../assets/images/Svante_Paabo_nobelPrizeMedicine.jpeg'),
    },
  ];
  return (
    <View>
      <TileCardContainer
        title={'Emergency Protocol'}
        showIcon={true}
        icon={
          <Pressable onPress={() => {}}>
            <Image
              style={{height: 22, width: 22, tintColor: Color.lightGray}}
              source={require('../../assets/icons/Lock.png')}
            />
          </Pressable>
        }>
        <ScrollView
          style={styles.masterContainer}
          horizontal
          showsHorizontalScrollIndicator={false}>
          <View style={styles.sectionContainer}>
            <Text style={styles.mainTitle}>Consents</Text>
            <Pressable style={styles.buttonStyle}>
              <Text style={styles.title}>Emergency protocol</Text>
              <View style={styles.iconContainer}>
                <IconIonicons
                  name="checkmark-circle"
                  size={20}
                  color={Color.greenyellow}
                />
              </View>
            </Pressable>

            <Pressable style={styles.buttonStyle}>
              <Text style={styles.title}>Location Tracking</Text>
              <View style={styles.iconContainer}>
                <IconIonicons
                  name="checkmark-circle"
                  size={20}
                  color={Color.greenyellow}
                />
              </View>
            </Pressable>

            <Pressable style={styles.buttonStyle}>
              <Text style={styles.title}>Organ Donation</Text>
              <View style={styles.iconContainer}>
                <IconIonicons
                  name="close-circle"
                  size={20}
                  color={Color.midBlue}
                />
              </View>
            </Pressable>
          </View>
          <View style={[styles.sectionContainer, {marginEnd: 10}]}>
            <Text style={styles.mainTitle}>Identification</Text>
            {identification.slice(0, 3).map((item, index) => {
              return (
                <Pressable key={index} style={styles.buttonStyle}>
                  <Text style={styles.readtext} numberOfLines={1}>
                    {item?.title}
                  </Text>
                  <View style={styles.iconContainer}>
                    <Image
                      source={item?.image}
                      style={{width: 20, height: 20, borderRadius: 20}}
                    />
                  </View>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </TileCardContainer>
    </View>
  );
};

export default EmergencyConcents;


