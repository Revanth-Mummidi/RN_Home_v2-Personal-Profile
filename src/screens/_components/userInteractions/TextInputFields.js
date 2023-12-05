/*
********** READ ME Text *****************

== > USAGE TEMPLATE   

<TextInputFields
  label={"Brand Name | Generic Name"}
  value={medicineName}
  onChange={setMedicineName}
/>
          
*/

import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  OutlinedTextField,
  FilledTextField,
  TextField,
} from 'rn-material-ui-textfield';
import {Colors} from '../../../themes';
import {ThemeContext} from '../../../themes/components/ThemeContext';
import { getColor } from '../../../themes/GetColor';
import { useSelector } from 'react-redux';
const TextInputFields = ({
  label,
  title,
  value,
  onChange,
  prefix,
  suffix,
  multiline,
  containerStyle,
  inputContainerStyle,
  secureTextEntry,
  keyboardType,
  baseColor,
  tintColor,
  textColor,
  error,
  errorColor,
  editable,
  textFieldType = 'Filled',
  config,
}) => {

 // const {theme, toggleTheme} = React.useContext(ThemeContext);
 // const Color = Colors(theme);
  const Color = getColor(useSelector(state => state.theme.theme));
  const styles = getStyles(Color);
  baseColor = Color.textfield_fontBaseColor;
  tintColor = Color.textfield_fontInactive;
  textColor = Color.textfield_fontWrite;
  return (
    <View>
      {textFieldType === 'Filled' ? (
        <View style={[styles.Container, containerStyle]}>
          <View style={styles.inputContainer}>
            <FilledTextField
              label={label}
              baseColor={baseColor}
              tintColor={tintColor}
              textColor={textColor}
              editable={editable}
              title={title}
              multiline={multiline}
              fontSize={14}
              labelFontSize={12}
              lineWidth={0}
              activeLineWidth={0}
              value={value}
              
              keyboardType={keyboardType}
              secureTextEntry={secureTextEntry}
              onChangeText={changeText => onChange(changeText)}
              prefix={prefix}
              suffix={suffix}
              inputContainerStyle={[
                styles.filledTextFieldStyle,
                inputContainerStyle,
              ]}
              error={error}
              errorColor={Color.red || errorColor}
              {...config}
            />
          </View>
        </View>
      ) : null}
      {textFieldType === 'Outlined' ? (
        <View
          style={[
            styles.transContainer,
            {
              justifyContent: 'center',
              borderRadius: 10,
              paddingTop: 4,
            },
            containerStyle,
          ]}>
          <View style={styles.inputContainer}>
            <OutlinedTextField
              label={label}
              editable={editable}
              baseColor={baseColor}
              tintColor={tintColor}
              textColor={textColor}
              secureTextEntry={secureTextEntry}
              title={title}
              multiline={multiline}
              fontSize={14}
              labelFontSize={12}
              keyboardType={keyboardType}
              lineWidth={1}
              activeLineWidth={1}
              value={value}
              onChangeText={changeText => onChange(changeText)}
              prefix={prefix}
              suffix={suffix}
              inputContainerStyle={[
                styles.transTextFieldStyle,
                inputContainerStyle,
              ]}
              error={error}
              errorColor={Color.red || errorColor}
              {...config}
            />
          </View>
        </View>
      ) : null}
      {textFieldType === 'TextField' ? (
        <View
          style={[
            {
              justifyContent: 'center',
              borderRadius: 10,
              paddingTop: 4,
            },
            containerStyle,
          ]}>
          <View style={styles.inputContainer}>
            <TextField
              label={label}
              
              editable={editable}
              baseColor={baseColor}
              tintColor={tintColor}
              textColor={textColor}
              secureTextEntry={secureTextEntry}
              title={title}
              multiline={multiline}
              keyboardType={keyboardType}
            
              fontSize={17}
              labelFontSize={12}
              lineWidth={1}
              activeLineWidth={1}
              value={value}
              onChangeText={changeText => onChange(changeText)}
              prefix={prefix}
              suffix={suffix}
              inputContainerStyle={[, inputContainerStyle]}
              error={error}
              errorColor={Color.yellow || errorColor}
              {...config}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default TextInputFields;

const getStyles = Color => {
  const styles = StyleSheet.create({
    Container: {
      justifyContent: 'center',
      backgroundColor: Color.textfieldContainer,
      borderRadius: 10,
      paddingTop: 4,
      //minHeight: 58,
      //marginHorizontal: 10,
    },
    inputContainer: {
      borderRadius: 8,
      paddingBottom: 4,
    },
    filledTextFieldStyle: {
      backgroundColor: Color.textfieldContainer,
      //backgroundColor: 'transparent',
      borderRadius: 4,
    },
    transContainer: {
      justifyContent: 'center',
      paddingTop: 4,
      height: 82,
    },
    transTextFieldStyle: {
      backgroundColor: 'transparent',
      borderRadius: 4,
    },
  });
  return styles;
};
