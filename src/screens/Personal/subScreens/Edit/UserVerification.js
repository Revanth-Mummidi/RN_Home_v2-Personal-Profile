/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  DualButton,
  ShimmerMaskedText,
  HandleBottomSheet,
  MediaWrapper,
  TextInputFields,
} from '../../../_components';
import { convertImageToBase64 } from '../../../Home/subScreens/home/Preview';
import React, {useEffect, useRef, useState} from 'react';
import styles from '../../utils/PersonalStyles';
import {Color} from '../../../../themes';
import Entypo from 'react-native-vector-icons/Entypo';
import getStyles from '../../utils/PersonalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {getColor} from '../../../../themes/GetColor';

import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import MaskedView from '@react-native-masked-view/masked-view';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from '../../../../themes/ResponsiveDimensions';
import {Dimensions} from 'react-native';
import {
  setVerificationStep,
  setVerificationType,
} from '../../slices/VerificationSlice';
import {useNavigation} from '@react-navigation/native';
import {
  setDependantUsers,
  setDependantUsersEHID,
  setParentProfile,
} from '../../../../redux/slices/AddDependantUserSlice';
import {
  UploadProfileVerification,
  getDependentUsers,
  getMainProfile,
  getMembers,
  uploadtoAWS,
  saveDocument,
} from '../../utils/PersonalServerRequests';
import {setCurrentUserProfile} from '../../slices/PersonalProfileStates';
//changed

const UserVerification = refScreens => {
  const styles = getStyles();
  const {width} = Dimensions.get('screen');
  const Color = getColor(useSelector(state => state.theme.theme));
  const CurrentProfile = useSelector(
    state => state.PersonalReducers.general_states,
  ).current_user_profile;
  const [isVerified, setVerified] = useState(false);
  const navigation = useNavigation();
  const [isEmpty, setEmpty] = useState(false);
  const Data = [
    <VerifyThrough activeIndex={ind} />,
    <PinCodeEntry />,
    <ProofUpload />,
  ];
  
  const fetchAccessDependent = async data => {
    try {
      let dependantArray = await getDependentUsers(data);
      // dependantArray=[...dependantArray];
      console.log('DEPENDENT USER ARRAY=', ...dependantArray);
      let mainProfile = await getMainProfile();
      dispatch(setParentProfile(mainProfile));
      dispatch(setCurrentUserProfile(mainProfile));
      // console.log("MAIN PROFILE=",mainProfile);
      // const profile=await getUserProfile(selectedItem.access_token,selectedItem.Profile_Picture)

      const combinedData = [mainProfile, ...dependantArray];
      console.log('COMBINED DATA', combinedData);

      dispatch(setDependantUsers(combinedData));
    } catch (err) {
      console.log('Fetch ACCESS DEP', err);
    }
  };

  const fetchDependentUsers = async () => {
    try {
      let arr = await getMembers();
      arr = arr.data.data;
      // let array1=arr.map((data,index)=>{
      //   return data.child_eh_user_id;
      // });

      dispatch(setDependantUsersEHID(arr));
      let arr3 = [];

      arr3 = arr.map((data, index) => {
        return {authToken: data.dependent_access_token};
      });
      fetchAccessDependent(arr3);
    } catch (err) {
      console.log('fetchdep', err);
    }
  };
  const verificationObject = useSelector(
    state => state.PersonalReducers.verification_states,
  );
  const verified_text = verificationObject.verification_type;
  const flatListRef = useRef(null);
  const dispatch = useDispatch();
  const image = useSelector(state => state.image.uri);
  const [ind, setInd] = useState(0);
  useEffect(() => {
    dispatch(setVerificationType(''));
  }, []);
  useEffect(() => {
    if (verified_text != '') {
      setInd(1);
    } else {
      setInd(0);
    }
  }, [verified_text]);
  const handleVerification = async () => {
    try {
      const base64=image
      var queryParams = {
        document_category: 'personal',
        document_type: 'image',
        file_folder: 'document',
        file_name: 'MyIdentity',
        view_option: 'public',
      };
      const res = await uploadtoAWS(
        CurrentProfile.access_token,
        base64,
        queryParams,
      );
      console.log('AWS res', res);
      if (res) {
        queryParams = {
          eh_file_id: res.eh_file_id,
          document_category: 'identity',
          document_sub_category: verificationObject.verification_type,
        };
        const res1 = await saveDocument(
          CurrentProfile.access_token,
          queryParams,
        );
        console.log('DOC res', res1);

        if (res1) {
          queryParams = {
            eh_file_id: res1.eh_file_id,
            eh_document_id: res1.eh_document_id,
            //Add pin number here
            verification_type: 'identity',
          };
          const res2 = await UploadProfileVerification(
            CurrentProfile.access_token,
            base64,
            queryParams,
          );
          console.log('VERIFY res', res2);
        }
      }
    } catch (err) {
      console.log('ERROR IN VERIFICATION', err);
    }
  };
  const handleNext = () => {
    // Update the index when "Next" is clicked
    if (ind == 2) {
      dispatch(setVerificationType(''));
      handleVerification();
      refScreens.refScreens.current.close();
    }
    setInd(prevInd => (prevInd + 1) % 3);

    // Scroll to the next item with animation
    // flatListRef.current.scrollToIndex({
    //   index: (ind + 1) % 3,
    //   animated: true,
    //   offset: (ind + 1) * responsiveWidth(97),
    // });
  };
  useEffect(() => {
    dispatch(setVerificationStep(ind));
  }, [ind]);
  return (
    <View style={styles.parentWidth}>
      <Text style={[styles.heading17, styles.headingStyle]}>
        Verification{'\n'}
        <Text style={styles.subHeading13}>Premium Services </Text>
      </Text>

      <View
        style={{
          backgroundColor: Color.lavender,
          borderRadius: 20,
          margin: 20,
          // height: 160,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/icons/verify.png')}
          style={{
            width: 65,
            height: 65,
            tintColor: isVerified ? Color.darkgreen : Color.gray,
          }}
        />
        <Text style={styles.heading17}>Verified</Text>
      </View>
      <View>
        <ScrollView>
          {Data.map((item, index) => {
            if (index <= ind) {
              return (
                <View
                  key={index.toString()} // Use a unique key for each rendered item
                  style={{
                    width: responsiveWidth(97),
                    padding: 10,
                    justifyContent: 'center',
                  }}>
                  {item}
                </View>
              );
            } else {
              return null; // Render nothing if the index is greater than ind
            }
          })}
        </ScrollView>
      </View>
      <View
        style={{
          marginVertical: 20,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginRight: 20,
          marginBottom: 40,
        }}>
        {ind != 0 ? (
          <Pressable
            onPress={() => {
              handleNext();
              console.log('JBSD', verified_text);
            }}
            style={{
              backgroundColor: Color.badge_bg,
              padding: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
              marginLeft: 50,
            }}>
            <Text>{ind != 2 ? 'Next' : 'I Submit'}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};
function VerifyThrough() {
  const dispatch = useDispatch();
  const verified_text = useSelector(
    state => state.PersonalReducers.verification_states.verification_type,
  );
  const Color = getColor(useSelector(state => state.theme.theme));
  const [ind, setInd] = useState('');
  useEffect(() => {
    if (verified_text === '') {
      setInd('');
    }
  }, [verified_text]);

  const array = [
    'Aadhar Number',
    'Driving License',
    'Passport Number',
    'Voter ID Number',
    'Ration Card Number',
  ];

  const styles = getStyles();

  return (
    <ScrollView>
      <Text style={{...styles.heading17, marginBottom: 10}}>
        Verify through{' '}
      </Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {array.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => {
              dispatch(setVerificationType(item));
              setInd(item);
            }}>
            <View
              style={{
                padding: 15,
                backgroundColor:
                  item === ind ? Color.badge_bg : Color.textfieldContainer,
                borderRadius: 10,
                margin: 10,
              }}>
              <Text>{item}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
function ChooseVerification() {
  const styles = getStyles();
  const Color = getColor(useSelector(state => state.theme.theme));
  return (
    <View>
      <Text style={{...styles.heading17, marginBottom: 10}}>
        Verify through{' '}
      </Text>
      <View style={styles.uploadTextfield}>
        <View
          style={{
            ...styles.textfieldContainer,
            backgroundColor: Color.textfieldContainer,
            padding: 25,
            borderRadius: 10,
          }}>
          {/* <TextInputFields
          label={'Aadhar Number'}
          value={aadhar}
          onChange={text => {
            setAadhar(text);
          }}
        /> */}
          <Text>Aadhar Number</Text>
        </View>
        <Pressable
          onPress={() => {
            // onPressPrivateImages();
          }}
          style={styles.uploadcontainer}>
          <View>
            <Image
              source={{
                uri: 'https://i.pinimg.com/originals/d8/5c/2f/d85c2fd6cd32a2f5cf5a11f909fd5b98.png',
              }}
              style={{...styles.Icon40, tintColor: Color.WHITE}}
            />
          </View>
        </Pressable>
      </View>
      <View style={styles.uploadTextfield}>
        <View
          style={{
            ...styles.textfieldContainer,
            backgroundColor: Color.textfieldContainer,
            padding: 25,
            borderRadius: 10,
          }}>
          <Text>Driving License Number</Text>
        </View>
        <Pressable
          onPress={() => {
            // onPressPrivateImages();
          }}
          style={styles.uploadcontainer}>
          <View>
            <Image
              source={{
                uri: 'https://onlinedigitalsevakendra.in/Content/MiscImages/Services/Driving%20License/driver-license-card.png',
              }}
              style={{...styles.Icon40, tintColor: Color.WHITE}}
            />
          </View>
        </Pressable>
      </View>
      <View style={styles.uploadTextfield}>
        <View
          style={{
            ...styles.textfieldContainer,
            backgroundColor: Color.textfieldContainer,
            padding: 25,
            borderRadius: 10,
          }}>
          <Text>Passport Number</Text>
        </View>
        <Pressable
          onPress={() => {
            // onPressPrivateImages();
          }}
          style={styles.uploadcontainer}>
          <View>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/3416/3416538.png',
              }}
              style={{...styles.Icon40, tintColor: Color.WHITE}}
            />
          </View>
        </Pressable>
      </View>
      <View style={styles.uploadTextfield}>
        <View
          style={{
            ...styles.textfieldContainer,
            backgroundColor: Color.textfieldContainer,
            padding: 25,
            borderRadius: 10,
          }}>
          <Text>Voter ID Number</Text>
        </View>
        <Pressable
          onPress={() => {
            // onPressPrivateImages();
          }}
          style={styles.uploadcontainer}>
          <View>
            <Image
              source={{
                uri: 'https://cdn.icon-icons.com/icons2/2585/PNG/512/voter_id_proof_icon_154130.png',
              }}
              style={{...styles.Icon40, tintColor: Color.WHITE}}
            />
          </View>
        </Pressable>
      </View>
      <View style={styles.uploadTextfield}>
        <View
          style={{
            ...styles.textfieldContainer,
            backgroundColor: Color.textfieldContainer,
            padding: 25,
            borderRadius: 10,
          }}>
          <Text>Ration Card Number</Text>
        </View>
        <Pressable
          onPress={() => {
            // onPressPrivateImages();
          }}
          style={styles.uploadcontainer}>
          <View>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/4341/4341764.png',
              }}
              style={{...styles.Icon40, tintColor: Color.WHITE}}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
function FullProofUpload() {
  const styles = getStyles();
  const Color = getColor(useSelector(state => state.theme.theme));
  return (
    <View style={{flexDirection: 'column'}}>
      <Text style={{...styles.heading17, marginBottom: 10}}>Upload Proof </Text>
      <View
        style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            height: responsiveHeight(40),
            width: '100%',
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 10,
            borderStyle: 'dotted',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Entypo name="upload" size={100} style={{height: 100, width: 100}} />
          <Text style={{marginTop: 20}}>Upload Image / Document</Text>
        </View>
      </View>
    </View>
  );
}
function ProofUpload() {
  const navigation = useNavigation();
  // const photo = useSelector(state => state.image);
  const styles = getStyles();
  const Color = getColor(useSelector(state => state.theme.theme));
  const shimmerColors = [
    // If shimmer effect is added and you can give 3 gradient colors . By default white gradient is given.
    'transparent',
    'rgba(255,255,255,0.8)',
    'rgba(255,255,255,0.1)',
  ];
  const refAttachments = React.useRef(null);
  const initialBottomSheet = () => {
    refAttachments.current.open();
  };
  const finalBottomSheet = () => {
    refAttachments.current.close();
  };
  return (
    <View style={{flexDirection: 'column'}}>
      {/* <Text style={{...styles.heading17, marginBottom: 10}}>Upload Proof </Text> */}
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            // height: responsiveHeight(40),
            width: '100%',
            // borderWidth: 2,
            // borderColor: 'white',
            borderRadius: 10,
            // borderStyle: 'dotted',
            backgroundColor: Color.textfieldContainer,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}>
          <Pressable
            onPress={() => {
              // navigation.navigate('Recording',{mode:'isProfile'})
              initialBottomSheet();
              // console.log(photo)
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: responsiveWidth(2),
              }}>
              {/* <ShimmerMaskedText
            onTxtColor={Color.badge_bg}
            text="Upload Document"
            fontSize={responsiveFontSize(2.3)}
            // width={responsiveWidth(100)}
            textHeight={responsiveHeight(3)}
            blurRadius={0}
            addShimmer={true}
            duration={4000}
            shimmerColors={shimmerColors}
            /> */}
            <HandleBottomSheet
                containerStyle={{height: responsiveHeight(20)}}
                bottomSheetRef={refAttachments}
                height={400}
                content={
                  <MediaWrapper
                    context={'isProfile'}
                    callback={finalBottomSheet}
                  />
                }
                draggableIcon={{backgroundColor: 'grey', width: 100}}
              />
              
              <ShimmerMaskedText
                onTxtColor={Color.badge_bg}
                textHeight={responsiveHeight(3)}
                blurRadius={0}
                addShimmer={true}
                duration={4000}
                shimmerColors={shimmerColors}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Entypo
                    name="upload"
                    size={20}
                    style={{
                      height: 20,
                      width: 20,
                      marginRight: responsiveWidth(5),
                      color: Color.badge_bg,
                    }}
                  />
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 16,
                    }}>
                    Upload Document
                  </Text>
                </View>
              </ShimmerMaskedText>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
function PinCodeEntry({isEmpty, setEmpty}) {
  const styles = getStyles();
  const Color = getColor(useSelector(state => state.theme.theme));
  const step = useSelector(
    state => state.PersonalReducers.verification_states,
  ).verification_step;
  const verified_text = useSelector(
    state => state.PersonalReducers.verification_states,
  ).verification_type;
  const [text, setText] = useState('');
  useEffect(() => {
    setText('');
  }, [verified_text]);
  return (
    <View style={{flexDirection: 'column', justifyContent: 'center'}}>
      {/* <Text style={{...styles.heading17, marginBottom: 10}}>Enter Pin</Text> */}
      <View>
        <TextInputFields
          label={`Enter ${verified_text} Pin`}
          value={text}
          editable={step == 1 ? true : false}
          secureTextEntry={step == 1 ? false : true}
          keyboardType={'default'}
          onChange={e => {
            setText(e);
          }}
          error={isEmpty ? 'This field must not be empty' : ''}
        />
      </View>
    </View>
  );
}

export default UserVerification;
