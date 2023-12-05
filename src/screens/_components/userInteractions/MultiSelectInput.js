/*// *************** READ ME Document *****************
// props to pass data is "Data"
 
==> USAGE TEMPLATE: Refere usage in "AddMedicine" from Tracker>components>Medicines

          <MultiSelectInput
            title={"Indication"}
            data={IndicationData}
            value={indication}
            onChangeText={(indication) => {
              setIndication(indication);
              setindicationError(false);
              setindicationErrorMessage("");
            }}
            onPressTextInputContainer={addIndication}
            multiSelectError={indicationError}
            multiSelectErrorMessage={indicationErrorMessage}
          />         
*/

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import IconEntypo from 'react-native-vector-icons/Entypo';
import Chip from './Chip';
import {Color} from '../../../themes';
const MultiSelectInput = props => {
  const [hasFocus, sethasFocus] = useState(false);
  const [title, setTitle] = useState(props.title);

  const onFocus = () => {
    sethasFocus(true);
  };
  const inputElementRef = useRef(null);
  const onBlur = () => {
    sethasFocus(false);
  };

  useEffect(() => {
    inputElementRef.current.setNativeProps({});
  });

  return (
    <View style={[styles.container, props?.containerStyle]}>
      <Text style={[styles.titleStyle, props?.titleStyle]}>{title}</Text>

      <View style={styles.contentContainer}>
        {props?.children}
        {/* {props.data &&
          props.data.length > 0 &&
          props.data.map((item, index) => {
            return (
              <Chip
                key={index}
                children={item.title}
                backgroundColor={item.backgroundColor}
                activeColor={item.activeColor}
              />
            );
          })} */}
      </View>
      {props.multiSelectError && (
        <Text style={styles.errorMessage}>{props.multiSelectErrorMessage}</Text>
      )}

      <View style={styles.inputContainer}>
        <View style={{width: '72%'}}>
          <TextInput
            style={styles.textInput}
            onChangeText={props.onChangeText}
            value={props.value}
            placeholder={props.placeholder}
            secureTextEntry={props.secureTextEntry}
            autoCorrect={props.autoCorrect}
            autoCapitalize={props.autoCapitalize}
            returnKeyType={props.returnKeyType}
            placeholderTextColor={props.placeholderTextColor}
            keyboardType={props.keyboardType}
            maxLength={props.maxLength}
            editable={props.editable}
            onBlur={onBlur}
            onFocus={onFocus}
            ref={inputElementRef}
          />
        </View>
        <View style={{flexGrow: 1}} />
        {props?.showAttachment ? (
          <Pressable
            onPress={props.onPressAttachments}
            style={{
              width: '14%',
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 4,
            }}>
            <IconEntypo name="attachment" size={20} color={Color.lightGray} />
            {/* <Image
            style={styles.buttonIcon}
            source={require('../assets/icons/arrow-left.png')}
          /> */}
          </Pressable>
        ) : null}
        <Pressable onPress={props.onPressSend} style={styles.button}>
          <Image
            style={styles.buttonIcon}
            source={require('../assets/icons/send.png')}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default MultiSelectInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.aquaBlue,
    borderRadius: 10,
    padding: 5,
    paddingVertical: 10,
  },
  titleStyle: {
    fontSize: 14,
    color: Color.BLACK,
    paddingLeft: 5,
    fontWeight: '800',
  },
  contentContainer: {
    paddingTop: 5,
    paddingBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  inputContainer: {
    backgroundColor: Color.WHITE,
    borderRadius: 10,
    flexDirection: 'row',
    width: '100%',
    paddingRight: 5,
  },
  textInput: {
    fontSize: 16,
    color: Color.textColor,
    paddingLeft: 15,
    justifyContent: 'center',
  },
  button: {
    width: '14%',
    backgroundColor: Color.lightblue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 1,
    marginVertical: 4,
    borderRadius: 8,
  },
  buttonIcon: {tintColor: Color.blue, width: 22, height: 22},
  errorMessage: {
    color: Color.red,
    fontWeight: '600',
    fontSize: 12,
    marginLeft: 5,
    marginBottom: 5,
  },
});
