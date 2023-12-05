import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Color from '../../../../themes/Color';
import _ from 'lodash';
import TileCardContainer from '../../../_components/userInteractions/TileCardContainer';

const Personal = props => {
  const {personalData} = props || {},
    [profileData, setProfileData] = useState({});

  useEffect(() => {
    if (!_.isEmpty(personalData)) {
      setProfileData(personalData?.data);
    }
  }, [personalData]);

  console.log(personalData);

  const renderEmergencyData = (data, index) => {
    return (
      <View style={styles.detailContained} key={index}>
        <Image
          style={styles.listImageStyle}
          source={require('../assets/images/Svante_Paabo_nobelPrizeMedicine.jpeg')}
        />
        <Text style={styles.listText}>{data.contact_name}</Text>
      </View>
    );
  };

  const renderDoctorData = (data, index) => {
    return (
      <View style={styles.detailContained} key={index}>
        <Image
          style={styles.listImageStyle}
          source={require('../assets/images/dummy_User.png')}
        />
        <Text style={styles.listText}>{data?.name || 'doctor'}</Text>
        <Text style={styles.listSubText}>
          {data?.specialization || 'Specialist'}
        </Text>
      </View>
    );
  };

  const renderHospitalData = (data, index) => {
    return (
      <View style={styles.detailContained} key={index}>
        <Image
          style={styles.listImageStyle}
          source={require('../assets/images/dummy_User.png')}
        />
        <Text style={styles.listText}>{data?.hospital_name || 'hospital'}</Text>
        <Text style={styles.listSubText}>
          {data?.speciality || 'Specialist'}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={200}
      directionalLockEnabled={true}>
      <View style={styles.linearGradient}>
        <View style={styles.editButtonContainer}>
          <TouchableOpacity style={styles.editButton}>
            <Image
              style={styles.iconImageStyle}
              source={require('../assets/icons/heart.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.topContainer}>
          <View style={styles.profileBackgroundContainer}>
            <Image
              style={styles.profileBackImageStyle}
              source={require('../assets/images/Svante_Paabo_nobelPrizeMedicine.jpeg')}
            />
          </View>
          {profileData?.image_url ? (
            <Image
              style={styles.profileImageStyle}
              source={{uri: profileData?.image_url}}
            />
          ) : (
            <Image
              style={styles.profileImageStyle}
              source={require('../assets/images/Svante_Paabo_nobelPrizeMedicine.jpeg')}
            />
          )}
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTextStyle}>
            {profileData?.user_first_name || 'User Full Name'}{' '}
            {profileData?.user_last_name} ,
          </Text>
          <Text style={styles.valueText}>
            {' '}
            {profileData?.age?.replace(/y/g, '') || ''}{' '}
            {profileData?.gender?.charAt(0).toUpperCase() +
              profileData?.gender?.slice(1) || ''}
          </Text>
        </View>
        <View style={styles.basicContainer}>
          <View style={styles.iconContainer}>
            <Image
              style={styles.basicIconImageStyle}
              source={require('../assets/icons/phone-call.png')}
            />
            <Text style={styles.subTextStyle}>
              {' '}
              {profileData?.mobileno || 'User Mobile No'}
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <Image
              style={styles.basicIconImageStyle}
              source={require('../assets/icons/location.png')}
            />
            <Text style={styles.subTextStyle}>
              {' '}
              {profileData?.primary_address?.length
                ? profileData?.primary_address[0]?.city
                : ''}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editIconContainer}>
          <Image
            style={styles.basicEditIconImageStyle}
            source={require('../assets/icons/phone-call.png')}
          />
        </TouchableOpacity>
        <View style={styles.divider} />
        <View style={styles.bottomContainer}>
          <View style={{alignItems: 'center'}}>
            <Image
              style={styles.basicEditIconImageStyle}
              source={require('../assets/icons/heartPulseIcon.png')}
            />
            <Text style={styles.valueText}>{profileData?.height?.value}</Text>
            <Text style={styles.headingText}>SES</Text>
          </View>
          <View style={styles.borderStyle} />
          <View style={{alignItems: 'center'}}>
            <Image
              style={styles.basicEditIconImageStyle}
              source={require('../assets/icons/bmi.png')}
            />
            <Text style={styles.valueText}>{profileData?.bmi}</Text>
            <Text style={styles.headingText}>BMI</Text>
          </View>
          <View style={styles.borderStyle} />
          <View style={{alignItems: 'center'}}>
            <Image
              style={styles.basicEditIconImageStyle}
              source={require('../assets/icons/drop.png')}
            />
            <Text style={styles.valueText}>
              {profileData?.blood_group || ''}
            </Text>
            <Text style={styles.headingText}>Blood</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.buttonIconContainer,
              {backgroundColor: Color.iconBackColor},
            ]}>
            <Image
              style={styles.bottomIconImageStyle}
              source={require('../assets/icons/drop.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonIconContainer,
              {backgroundColor: Color.iconRedBackColor},
            ]}>
            <Image
              style={styles.bottomIconImageStyle}
              source={require('../assets/icons/drop.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonIconContainer,
              {backgroundColor: Color.iconBackColor},
            ]}>
            <Image
              style={styles.bottomIconImageStyle}
              source={require('../assets/icons/drop.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonIconContainer,
              {backgroundColor: Color.iconBackColor},
            ]}>
            <Image
              style={styles.bottomIconImageStyle}
              source={require('../assets/icons/drop.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonIconContainer,
              {backgroundColor: Color.iconBackColor},
            ]}>
            <Image
              style={styles.bottomIconImageStyle}
              source={require('../assets/icons/drop.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TileCardContainer heading={'Emergency Contacts'} addShow={true}>
        <View style={styles.listContainer}>
          <FlatList
            style={{marginLeft: 10, display: 'flex', flexDirection: 'row'}}
            showsHorizontalScrollIndicator={true}
            horizontal={true}
            key={'flat list'}
            data={profileData?.emergency_contact || []}
            renderItem={({item, index}) => renderEmergencyData(item, index)}
            keyExtractor={item => item.id}
          />
        </View>
      </TileCardContainer>
      <TileCardContainer heading={'My Doctors'} addShow={true}>
        <View style={styles.listContainer}>
          <FlatList
            style={{marginLeft: 10, display: 'flex', flexDirection: 'row'}}
            showsHorizontalScrollIndicator={true}
            horizontal={true}
            key={'flat list'}
            data={profileData?.doctor_preference || []}
            renderItem={({item, index}) => renderDoctorData(item, index)}
            keyExtractor={item => item.id}
          />
        </View>
      </TileCardContainer>
      <TileCardContainer heading={'Preferred Hospitals'} addShow={true}>
        <View style={styles.listContainer}>
          <FlatList
            style={{marginLeft: 10, display: 'flex', flexDirection: 'row'}}
            showsHorizontalScrollIndicator={true}
            horizontal={true}
            key={'flat list'}
            data={profileData?.hospital_preference || []}
            renderItem={({item, index}) => renderHospitalData(item, index)}
            keyExtractor={item => item.id}
          />
        </View>
      </TileCardContainer>
      <TileCardContainer heading={'Daily  Exposure'} addShow={true}>
        <View style={styles.listContainer}>
          <Text style={styles.exposureText}>4</Text>
          <Text style={styles.exposureSubText}>Exposure</Text>
        </View>
      </TileCardContainer>
      <TileCardContainer heading={'Emergency Details'}>
        <View style={styles.listContainer}>
          <View style={styles.emergencyCardContainer}>
            <Text style={styles.headerStyle}>Consents</Text>
            {profileData?.consent?.length &&
              profileData?.consent.map((item, index) => {
                return (
                  <>
                    {item?.emergency_protocol === 'yes' && (
                      <View style={styles.contestContainer}>
                        <Text style={styles.contestText}>
                          Emergency protocol
                        </Text>
                      </View>
                    )}
                    {item?.hospitalization === 'yes' && (
                      <View style={styles.contestContainer}>
                        <Text style={styles.contestText}>Hospitalization</Text>
                      </View>
                    )}
                    {item?.location_tracking === 'yes' && (
                      <View style={styles.contestContainer}>
                        <Text style={styles.contestText}>
                          Location tracking
                        </Text>
                      </View>
                    )}
                    {item?.organ_donation === 'yes' && (
                      <View style={styles.contestContainer}>
                        <Text style={styles.contestText}>Organ donation</Text>
                      </View>
                    )}
                  </>
                );
              })}
          </View>
          <View style={styles.emergencyCardContainer}>
            <Text style={styles.headerStyle}>Personal Information</Text>
          </View>
        </View>
      </TileCardContainer>
      <View style={styles.screenBottomContainer} />
    </ScrollView>
  );
};

export default Personal;

const styles = StyleSheet.create({
  linearGradient: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Color.errorText,
  },
  iconImageStyle: {
    height: 13,
    width: 15,
  },
  profileBackgroundContainer: {
    borderRadius: 15,
    height: 110,
  },
  profileBackImageStyle: {
    height: 110,
    borderRadius: 15,
  },
  editButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 15,
    zIndex: 99999999,
  },
  editButton: {
    width: 34,
    height: 34,
    backgroundColor: Color.errorText,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editText: {
    color: Color.colorPrimary,
    fontSize: 12,
    fontWeight: '500',
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  basicIconImageStyle: {
    height: 15,
    width: 15,
  },
  basicEditIconImageStyle: {
    height: 25,
    width: 25,
  },
  profileImageStyle: {
    marginTop: -40,
    marginLeft: 15,
    height: 93,
    width: 93,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: Color.errorText,
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
  },
  basicContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  nameTextStyle: {
    fontWeight: '500',
    fontSize: 22,
    color: Color.tileHeading,
  },
  subTextStyle: {
    fontWeight: '500',
    fontSize: 14,
    color: Color.subHeading,
  },
  editIconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 15,
  },
  divider: {
    height: 1,
    width: '95%',
    backgroundColor: Color.subHeading,
    alignSelf: 'center',
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 15,
    marginTop: 15,
  },
  borderStyle: {
    backgroundColor: Color.subHeading,
    height: 35,
    width: 1,
  },
  valueText: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.tileHeading,
    textAlign: 'center',
    marginTop: 5,
  },
  headingText: {
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
    color: Color.subHeading,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  buttonIconContainer: {
    height: 41,
    width: 41,
    borderRadius: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomIconImageStyle: {},
  locationButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1,
    borderRadius: 10,
    height: 45,
    width: 132,
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Color.errorText,
    fontSize: 15,
    fontWeight: '500',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  detailContained: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 20,
  },
  listImageStyle: {
    backgroundColor: Color.transparent,
    height: 58,
    width: 58,
    borderRadius: 100,
  },
  listText: {
    fontSize: 14,
    fontWeight: '500',
    color: Color.tileHeading,
  },
  listSubText: {
    color: Color.subHeading,
    fontWeight: '500',
    fontSize: 11,
    textAlign: 'center',
  },
  contentContainer: {
    backgroundColor: Color.transparent,
    minHeight: 160,
    marginTop: 15,
    marginBottom: 10,
  },
  headingContentText: {
    color: Color.tileHeading,
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 15,
  },
  contentLinearGradient: {
    minHeight: 120,
    marginTop: 10,
    borderRadius: 16,
    marginLeft: 20,
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  addStyle: {
    position: 'absolute',
    top: 10,
    right: 25,
  },
  headingStyle: {
    marginLeft: 20,
    marginTop: 10,
    fontWeight: '500',
    fontSize: 17,
    color: Color.errorText,
  },
  itemContainer: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 6,
  },
  itemText: {
    color: Color.errorText,
    fontSize: 14,
    fontWeight: '450',
  },
  exposureText: {
    color: Color.exposureText,
    fontWeight: '500',
    fontSize: 60,
    marginLeft: 30,
  },
  exposureSubText: {
    color: Color.subHeading,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 20,
    marginTop: 40,
  },
  emergencyCardContainer: {
    height: 204,
    backgroundColor: Color.colorPrimary,
    width: 174,
    borderRadius: 16,
    borderColor: 'rgba(217, 217, 217, 0.8)',
    borderWidth: 1,
    marginLeft: 15,
    marginBottom: 25,
  },
  headerStyle: {
    color: Color.errorText,
    fontWeight: '500',
    fontSize: 17,
    marginLeft: 10,
    marginTop: 10,
  },
  contestContainer: {
    backgroundColor: Color.colorPrimary,
    height: 22,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 6,
    justifyContent: 'flex-start',
    marginLeft: 25,
  },
  contestText: {
    color: Color.errorText,
    fontSize: 11,
    fontWeight: '500',
  },
  screenBottomContainer: {height: 100, marginBottom: 200},
});
