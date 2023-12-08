import {Pressable, Text, View, Image, ScrollView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Color, Strings} from '../../../../themes';
import {
  DateOnlyPicker,
  TextInputFields,
  TileCardContainer,
} from '../../../_components';
import ExpandableCalendarTest from '../../../_components/calenders/ExpandableCalendarTest';
// import styles from '../../utils/PersonalStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {getColor} from '../../../../themes/GetColor';
import DateTimeScrollablePicker from '../../../Calender/Components/DateTimeScrollablePicker';
import getStyles from '../../utils/PersonalStyles';
import {
  accessDependent,
  addBasicDetails,
  addDependent,
  getDependentUsers,
  getMainProfile,
  getMembers,
} from '../../utils/PersonalServerRequests';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  ClearAddMembeData,
  set_AddMember_BloodGroup,
  set_AddMember_DateOfBirth,
  set_AddMember_EditObject,
  set_AddMember_Ethnicity,
  set_AddMember_FirstName,
  set_AddMember_Gender,
  set_AddMember_LastName,
  set_AddMember_Nationality,
  set_AddMember_Profession,
  set_AddMember_Relation,
  set_AddMember_Religion,
} from '../../slices/AddMemberSlice';
import {
  responsiveHeight,
  responsiveWidth,
} from '../../../../themes/ResponsiveDimensions';
import {t} from '../../../../services/language/Translate';
import {getApiKey} from '../../../../utils/LocalStorage';
import HomeAPI, {Base_URLs} from '../../../More/utils/MoreAPI';
import {Axios} from 'axios';
import {useNavigation} from '@react-navigation/native';
import {
  RefetchDependentUsers,
  fetchDependentUsers,
} from '../../utils/DependentUsersRequest';
import {
  setDependantUsers,
  setDependantUsersEHID,
} from '../../../../redux/slices/AddDependantUserSlice';
import {setCurrentUserProfile} from '../../slices/PersonalProfileStates';
//Personal add child member
export default function PersonalEditChildMember() {
  // console.log("ROUTE=",route.params);
  // const {EditObject} = route.params;
  const Edit=useSelector(state=>state.PersonalReducers.add_member);
  // const [EditObject,setEditObject]=useState(Edit.EditObject);
  const EditObject=Edit.EditObject;
  console.log("EDIT OBJECT",EditObject);
  const Color = getColor(useSelector(state => state.theme.theme));
  const styles = getStyles();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const mainProfile = useSelector(
    state => state.dependant_users,
  ).parent_profile;
  // const CurrentProfile = useSelector(
  //   state => state.PersonalReducers.general_states,
  // ).current_user_profile;
  const obj = useSelector(state => state.PersonalReducers.add_member);
  const [gender, setGender] = useState(EditObject.gender);
  const [selected, setSelected] = useState(EditObject.blood_group);
  const [dob, setDob] = useState(new Date(EditObject.date_of_birth));
  const [relationShip, setRelationShip] = useState(EditObject.relation);
  const [Profession,setProfession]=useState(EditObject.profession);
  const [Nationality,setNationality]=useState(EditObject.nationality);
  const [Ethncicity,setEthnicity]=useState(EditObject.ethnicity);
  const [Religion,setReligion]=useState(EditObject.religion);
  const [FirstName,setFirstName]=useState(EditObject.user_first_name);
  // const firstName = CurrentProfile.user_first_name;
  const [LastName,setLastName]=useState(EditObject.user_last_name);
  // const lastName = CurrentProfile.user_last_name;
  
  const username = mainProfile.user_first_name;
  
  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  const BloodGrp = [
    'A+',
    'A-',
    'B+',
    'B-',
    'O+',
    'O-',
    'AB+',
    'AB-',
    'Oh+',
    'Oh-',
  ];
 
  var activeColor = Color.personal_profile.icons.activeColor;
  var inActiveColor = Color.personal_profile.icons.inactiveColor;
  // useEffect(() => {
  //   if (obj.IsEdit) {
  //     const arr = [
  //       FirstName != '' ? 1 : 0,
  //       LastName != '' ? 1 : 0,
  //       dob.toDateString() != new Date().toDateString() ? 1 : 0,
  //       gender != '' ? 1 : 0,
  //       relationShip != '' ? 1 : 0,
  //     ];
  //     const arr1 = [
  //       !(FirstName != '') ? 1 : 0,
  //       LastName != '' ? 0 : 1,
  //       dob.toDateString() != new Date().toDateString() ? 0 : 1,
  //       gender != '' ? 0 : 1,
  //       relationShip != '' ? 0 : 1,
  //     ];
  //     setErrorArray(arr);
  //     setShowError(arr1);
  //     console.log('ERROR ARRAY=', arr);
  //     console.log('SHOW ARRAY=', arr1);
  //   }
  //   console.log('EDITED CONTENT', obj.IsEdit);
  // }, [obj]);
  // useEffect(() => {
  //   dispatch(set_AddMember_Gender(gender));
  //   if (gender == '') {
  //     if (errorArray[3]) setArrActive(0, 3);
  //   } else {
  //     if (!errorArray[3]) setArrActive(1, 3);
  //   }
  // }, [gender]);
  // useEffect(() => {
  //   dispatch(set_AddMember_BloodGroup(selected));
  // }, [selected]);
  const [errorArray, setErrorArray] = useState([1, 1, 1, 1, 1]);
  const [showError, setShowError] = useState([0, 0, 0, 0, 0]);
  useEffect(() => {
    let arr = errorArray;
    let n = [...arr].length;
    let c = 0;
    let arr1 = [0, 0, 0, 0, 0];
    for (let i = n - 1; i >= 0; i--) {
      if (arr[i] == 0) {
        if (c == 1) {
          arr1[i] = 1;
        } else {
          arr1[i] = 0;
        }
      } else {
        if (c == 0) {
          c = 1;
        }
        arr1[i] = 0;
      }
    }
    // console.log("ARRAY@=",arr1);
    setShowError(arr1);
  }, [errorArray]);

  const setArrActive = (value, index) => {
    let arr = errorArray.map((data, key) => {
      if (index == key) {
        return value;
      } else {
        return data;
      }
    });

    console.log('ARRAY=', arr, 'val', value, 'ind', index);
    setErrorArray(arr);
  };
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
  const handleEdit = async() => {
    try {
      const queryParams = {
        user_first_name:FirstName,
        user_last_name: LastName,
        gender: gender,
        date_of_birth: formatDateToYYYYMMDD(dob),
        blood_group:selected,
        nationality: Nationality,
        ethnicity:Ethncicity,
        religion:Religion,
        role:Profession,
        relation:relationShip,
      };
      const response = await addBasicDetails(EditObject.dependent_access_token,{
        mobileno:'',
        alternate_mobileno:'',
        alternate_email_id:'',
        weight:"",
        height:""
      },queryParams);
      // await fetchDependentUsers();

      console.log("SUCCESSFULLY EDITED",response);
    } catch (err) {
      console.log("ERROR WHILE EDITING",err);
    }
  };
 
  const RenderItem = () => {
    return (
      <View>
        <Text
          style={[styles.heading17, styles.headingStyle, {paddingBottom: 5}]}
          i18nIsDynamicList={true}>
          {'Edit dependent user'}{' '}
          {'\n'}
          <Text i18nIsDynamicList={true} style={{...styles.subHeading13}}>
            {t("Personal Profile.Add Member.Manage Family's Health")}
          </Text>
        </Text>

        <CameraComponent i18nIsDynamicList={true} />

        <View style={styles.textFieldRowBetween} i18nIsDynamicList={true}>
          <View style={{width: '49%'}} i18nIsDynamicList={true}>
            <TextInputFields
              i18nIsDynamicList={true}
              value={FirstName}
              label={t('Personal Profile.Add Member.First Name *')}
              onChange={e => {
                console.log(e);
                // dispatch(set_AddMember_EditObject({...EditObject,user_first_name:e}));
                // dispatch(set_AddMember_FirstName(e));
                setFirstName(e);
                if (e != '') {
                  if (errorArray[0] == 0) {
                    setArrActive(1, 0);
                    //  setShowArrActive(1,0)
                  }
                } else {
                  if (errorArray[0] == 1) {
                    setArrActive(0, 0);
                    // setShowArrActive(0,0);
                  }
                }
                setFirstName(e);
              }}
              error={showError[0] ? 'It should not be empty !' : ''}
            />
          </View>
          <View style={{width: '49%'}} i18nIsDynamicList={true}>
            <TextInputFields
              i18nIsDynamicList={true}
              value={LastName}
              label={t('Personal Profile.Add Member.Last Name *')}
              onChange={e => {
                setLastName(e);
                if (e != '') {
                  if (errorArray[1] == 0) setArrActive(1, 1);
                } else {
                  if (errorArray[1] == 1) setArrActive(0, 1);
                }
                // dispatch(set_AddMember_LastName(e));
              }}
              error={showError[1] ? 'It should not be empty !' : ''}
            />
          </View>
        </View>

        <TileCardContainer
          title={t('Personal Profile.Add Member.Date of Birth *')}
          titleStyle={[
            showError[2] ? {color: Color.red} : null,
            {paddingBottom: 5},
          ]}
          containerStyle={{...styles.tileCardContainer}}>
          <View style={{overflow: 'hidden'}} i18nIsDynamicList={true}>
            <DateTimeScrollablePicker
              newDate={dob}
              width={responsiveWidth(70)}
              activeColor={Color.badge_bg}
              onlytimepicker={false}
              maximumDate={new Date()}
              txtColor={Color.textfield_fontWrite}
              handleForDate={e => {
                const date = new Date(e);
                const today = new Date();
                if (today.toDateString() !== date.toDateString()) {
                  if (errorArray[2] == 0) setArrActive(1, 2);
                } else {
                  if (errorArray[2] == 1) setArrActive(0, 2);
                }
                setDob(date);
                // console.log(date.toLocaleDateString())
                // dispatch(set_AddMember_DateOfBirth(new Date(e)));
              }}
            />
          </View>
        </TileCardContainer>

        <TileCardContainer
          i18nIsDynamicList={true}
          title={t('Personal Profile.Add Member.Gender *')}
          titleStyle={showError[3] ? {color: Color.red} : null}
          containerStyle={styles.tileCardContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              margin: 10,
            }}>
            <Pressable
              onPress={() => {
                setGender('Male');
                // dispatch(set_AddMember_Gender('Male'));
                  if (gender == '') {
                    if (errorArray[3]) setArrActive(0, 3);
                  } else {
                    if (!errorArray[3]) setArrActive(1, 3);
                  }
              }}
              style={{
                ...styles.iconContainer,
                backgroundColor: gender === 'Male' ? activeColor : Color.WHITE,
              }}>
              <Image
                style={{
                  ...styles.mediumIcon,
                  tintColor: gender === 'Male' ? inActiveColor : activeColor,
                }}
                source={require('../../assets/icons/Male_symbol_(fixed_width).svg.png')}
                resizeMode={'contain'}
              />
              <Text
                style={{
                  ...styles.subtitle13,
                  color: gender === 'Male' ? inActiveColor : activeColor,
                }}>
                {t('Personal Profile.Add Member.GenderTypes.Male')}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setGender('Female');
                // dispatch(set_AddMember_Gender('Female'));
                  if (gender == '') {
                    if (errorArray[3]) setArrActive(0, 3);
                  } else {
                    if (!errorArray[3]) setArrActive(1, 3);
                  }
              }}
              style={{
                ...styles.iconContainer,
                backgroundColor: gender === 'Female' ? activeColor : Color.WHITE,
              }}>
              <Image
                source={require('../../assets/icons/Venus_symbol_(fixed_width).svg.png')}
                resizeMode={'contain'}
                style={{
                  ...styles.mediumIcon,
                  tintColor: gender === 'Female' ? inActiveColor : activeColor,
                }}
              />
              <Text
                style={{
                  ...styles.subtitle13,
                  color: gender === 'Female' ? inActiveColor : activeColor,
                }}>
                {t('Personal Profile.Add Member.GenderTypes.Female')}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setGender('Trans Male');
                // dispatch(set_AddMember_Gender('Trans Male'));
                  if (gender == '') {
                    if (errorArray[3]) setArrActive(0, 3);
                  } else {
                    if (!errorArray[3]) setArrActive(1, 3);
                  }
              }}
              style={{
                ...styles.iconContainer,
                backgroundColor: gender === 'Trans Male' ? activeColor : Color.WHITE,
              }}>
              <Image
                source={require('../../assets/icons/Male_and_female_sign.svg.png')}
                resizeMode={'contain'}
                style={{
                  ...styles.mediumIcon,
                  tintColor: gender === 'Trans Male' ? inActiveColor : activeColor,
                }}
              />
              <Text
                style={{
                  ...styles.subtitle13,
                  color: gender === 'Trans Male' ? inActiveColor : activeColor,
                }}>
                {t('Personal Profile.Add Member.GenderTypes.Trans Male')}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setGender('Trans Female');
                // dispatch(set_AddMember_Gender('Trans Female'));
                  if (gender == '') {
                    if (errorArray[3]) setArrActive(0, 3);
                  } else {
                    if (!errorArray[3]) setArrActive(1, 3);
                  }
              }}
              style={{
                ...styles.iconContainer,
                backgroundColor: gender === 'Trans Female' ? activeColor : Color.WHITE,
              }}>
              <Image
                source={require('../../assets/icons/Male_and_female_sign.svg.png')}
                resizeMode={'contain'}
                style={{
                  ...styles.mediumIcon,
                  tintColor: gender === 'Trans Female' ? inActiveColor : activeColor,
                }}
              />
              <Text
                style={{
                  ...styles.subtitle13,
                  color: gender === 'Trans Female' ? inActiveColor : activeColor,
                }}>
                {t('Personal Profile.Add Member.GenderTypes.Trans Female')}
              </Text>
            </Pressable>
          </View>
        </TileCardContainer>

        <TileCardContainer
          i18nIsDynamicList={true}
          title={t('Personal Profile.Add Member.Blood Group')}
          containerStyle={styles.tileCardContainer}>
          <View style={{alignItems: 'center', paddingVertical: 5}}>
            <View
              style={{
                justifyContent: 'flex-end',
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{flex: 1}}>
                <FlatList
                  scrollEnabled={false}
                  horizontal={false}
                  numColumns={4}
                  data={BloodGrp}
                  // keyExtractor={item => item.id}
                  renderItem={(item, index) => {
                    // console.log("VAL",item);
                    return (
                      <Pressable
                       key={index}
                        onPress={() => {
                          if (selected != item.item) setSelected(item.item);
                          else setSelected('');
                        }}>
                        <Text
                          style={[
                            selected == item.item
                              ? styles.active
                              : styles.inActive,
                            {textAlign: 'center'},
                          ]}>
                          {item.item}
                        </Text>
                      </Pressable>
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </TileCardContainer>

        <View style={{paddingVertical: 10}}>
          <TextInputFields
            label={t('Personal Profile.Add Member.Relation with', {
              username: username,
            })}
            value={relationShip}
            onChange={e => {
              if (e != '') {
                if (errorArray[4] == 0) setArrActive(1, 4);
              } else {
                if (errorArray[4] == 1) setArrActive(0, 4);
              }
              // dispatch(set_AddMember_Relation(e));
              setRelationShip(e);
            }}
            error={showError[4] ? 'It should not be empty !' : ''}
          />
        </View>

        <View style={{paddingVertical: 10}}>
          <TextInputFields
            value={Profession}
            label={t('Personal Profile.Add Member.Profession')}
            onChange={e => {
              setProfession(e);
              // dispatch(set_AddMember_Profession(e));
            }}
          />
        </View>

        <View style={{paddingVertical: 10}}>
          <TextInputFields
            label={t('Personal Profile.Add Member.Nationality')}
            value={Nationality}
            onChange={e => {
              setNationality(e);
              // dispatch(set_AddMember_Nationality(e));
            }}
          />
        </View>

        <View style={styles.textFieldRowBetween}>
          <View style={{width: '49%'}}>
            <TextInputFields
              value={Ethncicity}
              label={t('Personal Profile.Add Member.Ethnicity')}
              onChange={e => {
                setEthnicity(e);
                // dispatch(set_AddMember_Ethnicity(e));
              }}
            />
          </View>
          <View style={{width: '49%'}}>
            <TextInputFields
              label={t('Personal Profile.Add Member.Religion')}
              value={Religion}
               onChange={e => {
                setReligion(e);
                // dispatch(set_AddMember_Religion(e));
              }}
            />
          </View>
        </View>
        <View
          style={{
            marginBottom: responsiveHeight(13),
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <Pressable
              onPress={() => {
                // setArrActive(1,5);
                let c = 0,
                  arr = errorArray,
                  arr2;
                arr2 = arr.map((data, index) => {
                  if (data == 0) {
                    c = 1;
                    return 1;
                  } else {
                    return 0;
                  }
                });
                let arr1 = showError;
                arr1.map((data, index) => {
                  if (data == 1) {
                    c = 1;
                  }
                });
                setShowError(arr2);
                if (c == 0) {
                  handleEdit();
                  console.log('CREATE CLICKED');
                  dispatch(ClearAddMembeData());
                  navigation.goBack();
                }
              }}
              style={{
                ...styles.mediumButton,
                backgroundColor: Color.personal_profile.icons.activeColor,
              }}>
              <Text style={{...styles.buttonText14, padding: 2}}>
                {'Edit'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView i18nIsDynamicList={true}>
      <ScrollView
        i18nIsDynamicList={true}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        style={{
          ...styles.parentWidth,
          backgroundColor: Color.WHITE,
        }}>
        <RenderItem />
      </ScrollView>
    </SafeAreaView>
  );
}

function CameraComponent() {
  const styles = getStyles();
  const navigation = useNavigation();
  const Color = getColor(useSelector(state => state.theme.theme));
  const photo = useSelector(state => state.image);
  // console.log(photo);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
      }}>
      <Pressable
        onPress={() => {
          navigation.navigate('Recording', {mode: 'isProfile'});
        }}>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <View
            style={{
              padding: 50,
              backgroundColor: Color.textfieldContainer,
              borderRadius: 100,
              height: 60,
              width: 60,
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            {!photo.uri ? (
              <MaterialIcons
                name="camera-alt"
                style={{height: 60, width: 60}}
                size={60}
              />
            ) : (
              <Image
                source={{uri: photo.uri}}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                  resizeMode: 'contain',
                }}
              />
            )}
          </View>
          <View style={{marginTop: 15}}>
            <Text style={styles.subHeading13}>
              {t('Personal Profile.Add Member.Add a Profile Photo')}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
