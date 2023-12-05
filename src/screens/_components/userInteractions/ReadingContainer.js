import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../themes';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {ThemeContext} from '../../../themes/components/ThemeContext';

export default function ReadingContainer({
  onPress,
  label,
  childrenoObject,
  children,
  numberOfLines,
  showAllContent,
  containerStyle,
  labelStyle,
  childrenStyle,
  iconColor,
  containerColor,
  badgeColor,
  showBadges,
  badgeNumber = '',
}) {
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  const styles = getStyles(Color);
  const [containerClicked, setContainerClicked] = useState(false);
  const [showAll, setShowAll] = useState(showAllContent);
  const [showBadge, setShowBadge] = useState(showBadges);
  var iconColor = iconColor || Color.readingContainer_icon;
  var containerColor = containerColor || Color.readingContainer_bg;
  var badgeColor = badgeColor || Color.readingContainer_badge;

  return (
    <Pressable
      onPress={() => {
        setContainerClicked(!containerClicked);

        if (containerClicked) {
          setShowAll(true);
        } else {
          setShowAll(false);
        }
        onPress;
      }}>
      <View
        style={[
          styles.baseContainer,
          {backgroundColor: containerColor, ...containerStyle},
        ]}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={[
              styles.sideLabel,
              {color: Color.readingContainer_title, ...labelStyle},
            ]}>
            {label}
          </Text>
          <View style={{flexDirection: 'row'}}>
            {showBadge ? (
              <View>
                <Text
                  style={{
                    ...styles.badge,
                    backgroundColor: badgeColor,
                    color: Color.common_BLACK,
                  }}>
                  {badgeNumber}
                </Text>
              </View>
            ) : null}
            <IconEntypo
              name={showAll ? 'chevron-small-up' : 'chevron-small-down'}
              size={22}
              color={iconColor}
            />
          </View>
        </View>

        <View style={[styles.flexRowWrap]}>{childrenoObject}</View>

        <Text
          style={[
            styles.text,
            styles.paragraph,
            {color: Color.readingContainer_text, ...childrenStyle},
          ]}
          numberOfLines={showAll ? 0 : numberOfLines}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
}
const getStyles = Color => {
  const style = StyleSheet.create({
    baseContainer: {
      padding: 10,
      paddingTop: 20,
      // borderLeftWidth: 10,
      // borderLeftColor: Color.red,
      // marginHorizontal: 10,
      //marginTop: 14,
      //borderRadius: 14,
    },
    sideLabel: {
      fontSize: 17,
      fontWeight: '500',
      marginBottom: 10,
      //paddingLeft: 5,
    },
    flexRowWrap: {flexWrap: 'wrap', flexDirection: 'row'},
    text: {paddingLeft: 5, paddingRight: 10},
    paragraph: {
      color: Color.mediumGray,
      letterSpacing: 0.3,
      lineHeight: 20,
      textAlign: 'justify',
    },
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 8,
      backgroundColor: Color.rebeccapurple,
      color: Color.WHITE,
      fontWeight: '600',
      marginRight: 5,
    },
  });
  return style;
};
