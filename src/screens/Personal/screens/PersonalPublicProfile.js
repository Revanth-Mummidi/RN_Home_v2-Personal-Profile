import {ScrollView, Text, View} from 'react-native';
import React from 'react';
import {AppHeader, ButtonHeader} from '../../_components';
import {Color} from '../../../themes';
import PublicApercu from '../subScreens/PublicView/PublicApercu';

const PersonalPublicProfile = () => {
  return (
    <View>
      {/* <ButtonHeader
        title={'Public View'}
        textSyles={{color: Color.yellow, textAlign: 'center'}}
      /> */}
      <ScrollView style={{}}>
        <PublicApercu />
      </ScrollView>
    </View>
  );
};

export default PersonalPublicProfile;
