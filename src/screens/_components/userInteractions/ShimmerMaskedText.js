// USAGE

// <ShimmerMaskedText
// onTxtColor={Color.badge_bg}
// textHeight={responsiveHeight(3)}
// blurRadius={0}
// addShimmer={true}
// duration={4000}
// shimmerColors={shimmerColors}>
// <View
//   style={{justifyContent: 'space-between', flexDirection: 'row'}}>
//   <Entypo
//     name="upload"
//     size={20}
//     style={{
//       height: 20,
//       width: 20,
//       marginRight:responsiveWidth(5),
//       color: Color.badge_bg,
//     }}
//   />
//   <Text
//     style={{
//       color: 'black',
//       fontSize: 16,
//     }}>
//     Upload Document
//   </Text>
// </View>
// </ShimmerMaskedText>


import React from 'react';
import { View, Text } from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const CustomMaskedView = ({
  onTxtColor,
  children,
  textHeight,
  blurRadius,
  addShimmer,
  duration,
  shimmerColors,
}) => {
  return (
    <MaskedView
      style={{
        backgroundColor: onTxtColor,
        alignItems: 'center',
      }}
      maskElement={
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {children}
        </View>
      }>
      <ShimmerPlaceholder
        style={{
          height: textHeight,
          borderRadius: 100,
          blurRadius: blurRadius,
        }}
        stopAutoRun={!addShimmer}
        duration={duration}
        shimmerColors={shimmerColors}
      />
    </MaskedView>
  );
};

export default CustomMaskedView;
