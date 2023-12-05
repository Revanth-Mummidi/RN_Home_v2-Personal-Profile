import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {AppHeader, Swiper} from '../../_components';
import PrivateApercu from '../subScreens/PrivateView/PrivateApercu';
import CallFamily from '../subScreens/Edit/CallFamily';
import CallDoctor from '../subScreens/Edit/CallDoctor';
import EmergencyConcents from '../subScreens/Edit/EmergencyConcents';
import CallHospital from '../subScreens/Edit/CallHospital';
import {useNavigation} from '@react-navigation/native';
import { responsiveHeight } from '../../../themes/ResponsiveDimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../../../themes';
import {useDispatch, useSelector} from 'react-redux';
import { getColor } from '../../../themes/GetColor';
import { ClearAddMembeData } from '../slices/AddMemberSlice';
import ProfileAppHeader from '../components/ProfileAppHeader';

const PersonalLanding = () => {
  const [selectedId, setSelectedId] = useState(0);
  const navigation = useNavigation();
  const Color=getColor(useSelector(state=>state.theme.theme));
  const dispatch=useDispatch();
  return (
    <View style={{backgroundColor:Color.linear1}}>
      <ProfileAppHeader
        suffix={'Profile'}
        user={selectedId}
        onPressIcon={id => {
          setSelectedId(id);
        }}
        expandView={true}
        rightElement={
          <Pressable
            onPress={() => {
               dispatch(ClearAddMembeData());
              navigation.navigate('PersonalAddChildMember');
            }}>
            <Image
              source={require('../assets/icons/add-square_bold.png')}
              style={{width: 30, height: 30,marginHorizontal:10}}
            />
          </Pressable>
        }
      />

      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        horizontal={false}
        // style={{marginBottom:responsiveHeight(10)}}
        >
        <PrivateApercu />
        <CallFamily />
        <CallDoctor />
        <CallHospital />
        <EmergencyConcents />
        <View style={{height: responsiveHeight(17)}} />
      </ScrollView>
    </View>
  );
};

export default PersonalLanding;

const styles = StyleSheet.create({});
