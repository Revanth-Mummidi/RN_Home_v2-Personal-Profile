import {
  Dimensions,
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import PublicApercu from './PublicApercu';
// import {Color} from '../../../../themes';
import {useSelector} from 'react-redux';
import { getColor } from '../../../../themes/GetColor';
import {Swiper} from '../../../_components';
import ProfessionalPublicView from '../../../Professional/screens/ProfessionalPublicView';

const WIDTH = Dimensions.get('window').width;
const PersonalPublicProfile = () => {
  const Color=getColor(useSelector(state=>state.theme.theme));
  const [selectedId, setSelectedId] = useState();
  const {feedData,profileDetails,styles}=getArr();
  const keyExtractor = useCallback((item, index) => item.id, []);
  const renderItem = ({item, index}) => {
    return (
      <Pressable
        onPress={() => {
          alert(item.title);
        }}
        key={index}>
        <View style={{...styles.card}}>
          <Image
            source={{uri: item.image}}
            resizeMode={'cover'}
            style={styles.image}
          />
        </View>
      </Pressable>
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        ListHeaderComponent={
          <>
            <PublicApercu data={profileDetails} />
          </>
        }
        data={feedData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        extraData={selectedId}
        numColumns={3}
        vertical
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: Color.WHITE,
        }}
      />
    </View>
  );
};

export default PersonalPublicProfile;
const getArr=()=>{
const Color= useSelector(state=>state.theme.theme);
const styles = StyleSheet.create({
  mainTitle: {
    paddingTop: 17,
    paddingBottom: 10,
    fontWeight: 'bold',
    fontSize: 20,
    color: Color.BLACK,
    paddingLeft: 10,
  },
  card: {
    width: WIDTH / 3,
  },
  image: {
    width: WIDTH / 3,
    height: WIDTH / 3,
    borderRadius: 2,
  },
});

const profileDetails = [
  {
    id: 1,
    followers: '7300',
    followed: true,
    blueTick: true,
    salutation: 'Dr',
    name: 'Vishnu Reddy',
    speciality: 'ENT ',
    Locations: 'Hyderabad,India',
    talks:
      '#MicroSurgery, #ENT,#MicroSurgery, #ENT,#MicroSurgery, #ENT,#MicroSurgery, #ENT, #ENT,#MicroSurgery, #ENT',
  },
  {
    id: 2,
    followers: '2000',
    followed: true,
    blueTick: true,
    salutation: 'Dr',
    name: 'Andriena Nikoshlav',
    speciality: 'Cardiologist',
    Locations: 'Hyderabad,India',
    talks: '#MicroSurgery, #ENT',
  },
];

const feedData = [
  {
    id: '1',
    image:
      'https://media.istockphoto.com/id/1470505351/photo/portrait-of-a-smiling-doctor-holding-glasses-and-a-mobile-phone-at-the-office.webp?b=1&s=170667a&w=0&k=20&c=8CebFLF4PFnt9JYJznGhYoOQxcyHLVpTGVfkvEsZd2Q=',
    title: 'Accutane',
    companyName: 'GSK Pharmaceuticals',
    strength: '10mg',
    dosage: 'Tablet',
    currency: '₹',
    price: '100',
    unitPrice: '30/Tab',
  },
  {
    id: '2',
    image:
      'https://www.naturemade.com/cdn/shop/articles/melatonin-food-to-help-you-sleep.jpg?v=1628277028',
    title: 'Clarus',
    companyName: 'Intus Pharma',
    strength: '50mg',
    dosage: 'Capsule',
    currency: '₹',
    price: '70',
    unitPrice: '20/Tab',
  },
  {
    id: '3',
    image:
      'https://images.ctfassets.net/4f3rgqwzdznj/6T6wAKotJf5a90EdhkgZAD/8b9993c6ff22ee912b03b3f555610be5/weighted-blankets.jpg',
    title: 'Absorica',
    companyName: 'GSK Pharmaceuticals',
    strength: '20mg',
    dosage: 'Ointment',
    currency: '₹',
    price: '100',
    unitPrice: '50/unit',
  },
  {
    id: '4',
    image: 'https://etimg.etb2bimg.com/photo/94003088.cms',
    title: 'Clarus',
    companyName: 'Intus Pharma',
    strength: '250mg',
    dosage: 'Lotion',
    currency: '₹',
    price: '250',
    unitPrice: '',
  },
  {
    id: '5',
    image:
      'https://www.nosleeplessnights.com/wp-content/uploads/2021/11/sleep-tracker-with-sleep-stages-graph.jpg',
    title: 'Absorica',
    companyName: 'GSK Pharmaceuticals',
    strength: '20mg',
    dosage: 'Ointment',
    currency: '₹',
    price: '100',
    unitPrice: '50/unit',
  },
  {
    id: '6',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrdlNoGZKGSwgOco-R-oKD_gkfo0MGdOOxHg&usqp=CAU',
    title: 'Clarus',
    companyName: 'Intus Pharma',
    strength: '250mg',
    dosage: 'Lotion',
    currency: '₹',
    price: '250',
    unitPrice: '',
  },
  {
    id: '7',
    image:
      'https://www.swissinfo.ch/resource/image/44996702/landscape_ratio16x9/1920/1080/2225e1f4ecb1e610f60a90098fcfa70/5B449FDB8B39BD2EC03E82921D42D78E/zolgensma.jpg',
    title: 'Clarus',
    companyName: 'Intus Pharma',
    strength: '250mg',
    dosage: 'Lotion',
    currency: '₹',
    price: '250',
    unitPrice: '',
  },
];
return {styles,profileDetails,feedData};
}