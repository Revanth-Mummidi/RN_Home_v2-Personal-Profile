{
  /* 
 ***************** Component Usage *****************
<MaskedText
  style={{}}
  title={'My Medications'}
  linearColors={['#380036', '#0652c5', '#0CBABA']}
/>; 

*/
}

import React from 'react';
import {Text, View} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

const MaskedText = ({
  style,
  title,
  textStyle,
  linearColors = ['#2899C6', '#9B88C3', '#000000'],
  location = [0, 0.3, 0.4],
}) => {
  return (
    <View
      style={{
        // flex: 0.26,
        height: 30,
        paddingLeft: 10,
        ...style,
      }}>
      <MaskedView
        style={{
          height: '100%',
        }}
        maskElement={
          <View
            style={{
              // Transparent background because mask is based off alpha channel.
              backgroundColor: 'transparent',
            }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                ...textStyle,
              }}>
              {title}
            </Text>
          </View>
        }>
        {/* Shows behind the mask, you can put anything here, such as an image */}
        <LinearGradient
          colors={linearColors}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          locations={location}
          // useAngle
          // angle={110}
          style={{
            height: '100%',
            width: '100%',
          }}
        />
      </MaskedView>
    </View>
  );
};

export default MaskedText;
