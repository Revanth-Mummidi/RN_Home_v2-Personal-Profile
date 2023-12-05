{
  /*

********************** SwipeableBarIOS ************************

SwipeableBarIOS component provides swipeable component with shimmer effect and size is adjustable according to width

**********************  PROPS ******************************
Props for this components are:
image-For icon to display in the swipeable bar
text- Which is displayed on the component
offText-The content which is displayed after swiping to right
execute - It is function which is executed after swiping operation is performed
addShimmer - It takes boolean Value. If it is true it adds shimmer effect and if false it doesn't add the shimmer effect
customStyle - It is used to add customeStyles to the component 
CustomStyle contains default values. If any style is not mentioned it takes default values similar to Type 1.

**********************  Component Usage ******************************

Type 1:- This example will provide two layers and shimmer effect is not added used in logout
 
  Regular design
  Default Styling is applied.

    const logout = {
    image: require('../../assets/icons/lock-circle.png'),
    text: 'Swipe to Logout',
    offText: 'Log Out',
    };
  <SwipeableBar image={logout.image} text={logout.text} execute={initiateLogout}  offText={logout.offText} />


Type 2:- This example is to make swipeable component similar to IOS power off button in which shimmer effect is added and only single outer layer is present

 IOS Power OFF styling 
                const powerOff = {
                image: require('../../assets/icons/on-off-button.png'),
                text: 'Silde to Power Off',
                  };
   <SwipeableBar addShimmer={true} image={powerOff.image} text={powerOff.text} execute={initiateLogout} 
              customStyle={{
              
                onTxtColor:inactiveColor,
                bgInColor: 'transparent',
                iconBgColor:'white',
                iconHeight:20,
                iconWidth:20,
                iconBgHeight:50,
                iconBgWidth:50,
                paddingHorizontal:5,
                paddingVertical:5,
                bgOutColor:'rgba(255,255,255,0.5)',
                blurRadius:0,
                
              }}
    />

Type 3:- This example when component is used on an image.

  Background Image
        const swipe = {
          image: require('../../assets/icons/moon.png'),
          text: 'Swipe right',
          offText: 'Good Night',
        };
       <SwipeableBar addShimmer={true} image={swipe.image} text={swipe.text} execute={initiateLogout}  offText={swipe.offText}
              customStyle={{
                onTxtColor:'black',
                offTxtColor:'white',
                bgInColor:'rgba(255,255,255,0.2)',
                iconBgColor:'rgba(255,255,255,0.5)',
                iconHeight:40,
                duration:4000,
                iconWidth:40,
                iconBgHeight:50,
                iconBgWidth:50,
                paddingHorizontal:5,
                paddingVertical:5,
                blurRadius:100,
                bgOutColor:'rgba(255,255,255,0.5)',
                textHeight:24,
              }}
       />

********************** SUGGESTIONS ******************************
1) Issue:- Text Alignment issue is faced for smaller width / large text. 
   Solution:- If is not adjusted through default values. Give textHeight in customStyles.
              Example:- <SwipeableBarIOS customStyles={{ textHeight:24 }}/> 
              Incase default fontSize is too large or small . Give required fontSize in customStyles.
              Example:- <SwipeableBarIOS customStyles={{ fontSize:17 }}/>

2) Issue:- Width is not given Percentages. So by default it takes complete width from Dimensions of the screen.
   Solution:- Incase if you want to change the width through CustomStyles. Give width through Dimensions.
              Example:
              Import Dimensions from react native
              const WIDTH = Dimensions.get('window').width;
              <SwipeableBarIOS customStyles={{ width : WIDTH-60 }}/> Incase you want width equal to overall width of the screen leaving 60px
  

*/
}
import React, {useState, useContext, useRef} from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {Colors} from '../../../themes';
import getStyles from '../../More/utils/MoreStyles.js';
import {Swipeable} from 'react-native-gesture-handler';
import {ThemeContext} from '../../../themes/components/ThemeContext';

import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import MaskedView from '@react-native-masked-view/masked-view';

const WIDTH = Dimensions.get('window').width;
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

// SwipeableBarIOS component provides a swipeable component with shimmer effect and adjustable size according to width.

const SwipeableBarIOS = ({
  image,
  text,
  execute,
  offText,
  customStyle,
  addShimmer,
}) => {
  // Initialize the offset for swipe animation
  const [offset] = useState(new Animated.Value(0));

  // Get the theme and styles using useContext
  const {theme, toggleTheme} = useContext(ThemeContext);
  const Color = Colors(theme);
  const styles = getStyles(Color);

  // Destructure customStyle props with default values
  const {
    offTxtColor = '#202124', //Color of the text which is behind the swipeable bar
    onTxtColor = '#86879E', // Color of the text which is on the swipeable bar
    bgInColor = '#86879E', // Background color of the inside block
    bgOutColor = '#202124', // Background color of the displayed block
    iconBgColor = '#86879E', //Background Color of the icon
    iconHeight = 40, // Height of the icon
    iconWidth = 40, // Width of the icon
    iconBgHeight = 40, // Height of the Icon Background
    iconBgWidth = 40, // Width of the Icon Background
    paddingHorizontal = 10, //Animated View Padding horizontal
    paddingVertical = 10, //Animated View Padding vertical
    width = WIDTH - 40, // Width of the swipeable bar component
    fontSize = width > WIDTH - 70 ? 17 : width * 0.08, // Size of the text that is displayed
    textHeight = width <= 200 ? width * 0.23 : 25, // Text Height is to adjust the alignment of the text. Incase default textHeight doesn't align properly user can mention the height to override it.
    blurRadius = 0, // Blur radius for GlassShadow effect give BlurRadius 10
    duration = 4000, // Speed of the Shimmer Effect
    shimmerColors = [
      // If shimmer effect is added and you can give 3 gradient colors . By default white gradient is given.
      'transparent',
      'rgba(255,255,255,0.8)',
      'rgba(255,255,255,0.1)',
    ],
  } = customStyle || {};

  // Create a ref for Swipeable component
  const swipeableRef = useRef(null);
  //For error handling
  image = image || '';
  text = text || '';
  execute = execute || '';
  offText = offText || '';

  // Function to render left actions during swipe
  const swipeTo = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, width - 88],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    const opacity = dragX.interpolate({
      inputRange: [0, width - 88],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        style={[
          commonStyles.leftActionContainer,
          {width: width - 60},
          {transform: [{scale}]},
        ]}>
        <Animated.Text
          style={[
            styles.leftactionText,
            {
              color: offTxtColor,
              fontSize: fontSize,
              paddingRight: 1,
            },
            {opacity},
          ]}>
          {offText}
        </Animated.Text>
      </Animated.View>
    );
  };

  // Function to be executed when swipe is about to open
  const onSwipeableWillOpen = () => {
    Animated.timing(offset, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Function to reset the swipeable component
  const resetSwipeable = () => {
    if (swipeableRef.current) {
      swipeableRef.current.close();
      Animated.timing(offset, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  // Function to be executed when swipeable component is fully opened
  const onSwipeableOpen = () => {
    if (execute != '') execute();
    resetSwipeable();
  };

  return (
    <View
      style={[
        commonStyles.container,
        {backgroundColor: bgInColor, blurRadius: blurRadius, width: width},
      ]}>
      <Swipeable
        renderLeftActions={swipeTo}
        overshootRight={false}
        onSwipeableOpen={onSwipeableOpen}
        containerStyle={commonStyles.swipeableContainer}
        ref={swipeableRef}
        onSwipeableWillOpen={onSwipeableWillOpen}
        onSwipeableEvent={e => {
          const {translationX} = e.nativeEvent;
          offset.setValue(translationX);
        }}>
        <Animated.View
          style={[
            commonStyles.swipeableContent,
            {backgroundColor: bgOutColor, blurRadius: blurRadius},
            {transform: [{translateX: offset}]},
            {
              paddingHorizontal: paddingHorizontal,
              paddingVertical: paddingVertical,
            },
          ]}>
          <View
            style={{
              ...commonStyles.imageContainer,

              backgroundColor: iconBgColor,
              height: iconBgHeight,
              width: iconBgWidth,
            }}>
            <Image
              source={image}
              style={{
                ...commonStyles.image,
                height: iconHeight,
                width: iconWidth,
              }}
            />
          </View>

          <MaskedView
            style={{
              backgroundColor: onTxtColor,
              alignItems: 'center',
            }}
            maskElement={
              <Text
                style={[
                  styles.leftactionText,
                  {
                    color: onTxtColor,
                    fontSize: fontSize,
                    paddingRight: 60,
                    width: width,
                  },
                ]}>
                {text}
              </Text>
            }>
            <ShimmerPlaceholder
              style={{
                width: '100%',
                height: textHeight,
                borderRadius: 100,
                blurRadius: blurRadius,
              }}
              stopAutoRun={!addShimmer}
              duration={duration}
              shimmerColors={shimmerColors}
            />
          </MaskedView>
        </Animated.View>
      </Swipeable>
    </View>
  );
};

const commonStyles = StyleSheet.create({
  container: {
    borderRadius: 40,
    blurRadius: 0,
    marginTop: 10,
  },

  leftActionContainer: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 40,
  },
  leftActionText: {
    fontWeight: '900',
    color: 'black',
  },
  swipeableContainer: {
    borderRadius: 40,
  },
  swipeableContent: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    borderRadius: 40,
    blurRadius: 0,
    backgroundColor: 'grey',
    paddingVertical: 5,
    alignItems: 'center',
  },
  imageContainer: {
    borderRadius: 100,
    backgroundColor: '#86879E',
    justifyContent: 'center',
    height: 50,
    width: 50,
    alignItems: 'center',
  },
  image: {
    height: 20,
    width: 20,
  },
  text: {
    paddingHorizontal: 20,
    fontWeight: '600',
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default SwipeableBarIOS;
