import { View, Text } from 'react-native'
import React from 'react'
import { responsiveFontSize,responsiveHeight,responsiveWidth } from '../../../themes/ResponsiveDimensions'
import LinearGradient from 'react-native-linear-gradient'
import { getColor } from '../../../themes/GetColor'
import { useSelector } from 'react-redux'
import TextInputFields from '../userInteractions/TextInputFields'
import { CreateMpin } from '../../../apis/ApiRequests'

const ResetMpin = () => {
    const Color = getColor(useSelector(state => state.theme).theme);

  return (
    <View>
      
        <LinearGradient colors={[Color.theme_whiteLinear3, Color.linearFS2, Color.blue]} style={{height:responsiveHeight(100),width:responsiveWidth(100),left:-21}}>

        </LinearGradient>
    </View>
  )
}

export default ResetMpin