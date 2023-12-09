import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setEhUserId} from '../slices/SaveSlice';
import {getMembers} from '../../Personal/utils/PersonalServerRequests';
export default function ProfileSliderList({
  image,
  showBadge,
  badge,
  user,
  ActiveColor = 'transparent',
  InActiveOpacity = 1,
  onPressUser,
}) {
  const DependentUsers = useSelector(
    state => state.dependant_users).dependant_users_data;
  const Color = useSelector(state => state.theme).Colors;
  const dispatch = useDispatch();
  const styles = getStyles(Color);
  const [selectedUser, setSelectedUser] = useState([]);
  const handleUserClick = selectedInd => {
    // console.log("IJIASJ",DependentUsers[0]);
    let user = selectedUser;
    user = user.map((data, index) => {
      if (index == selectedInd) {
        return !data;
      } else {
        return data;
      }
    });
    setSelectedUser(user);
  };
  useEffect(() => {
    const len = [...DependentUsers].length;
    // const len=profile.length;
    let i;
    let user = [];
    for (i = 0; i < len; i++) {
      user.push(0);
    }
    setSelectedUser(user);
  }, []);
  useEffect(() => {
    // dispatch(setEhUserId(selectedUser));
    let arr=selectedUser,arr1=[];
    arr.map((data,index)=>{
      if(data)
      {
         arr1.push(DependentUsers[index].eh_user_id);
      }
    })
    console.log("SELECTED PROFILES=",arr1);
    // dispatch(setEhUserId(arr1));
    
    // console.log("HELLO");
  }, [selectedUser]);
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{paddingHorizontal: 7, paddingTop: 10}}>
      {DependentUsers.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              width: 55,
              marginRight: 5,
            }}>
            <Pressable
              style={{
                alignItems: 'center',
              }}
              onPress={() => {
                handleUserClick(index);
              }}>
              <View
                style={{
                  height: 44,
                  width: 44,
                  borderRadius: 40,
                  borderWidth: selectedUser[index] ? 4 : 0,
                  borderColor: selectedUser[index] ? ActiveColor : null,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {/* <Image
                    source={{uri: profile?.userImage}}
                    style={{
                      opacity:selectedUser[index]?1:InActiveOpacity,
                      height:selectedUser[index] ? 40:30,
                      width:selectedUser[index] ? 40:30,
                      borderRadius: 40,
                    }}
                  /> */}
                <View
                  style={{
                    opacity: selectedUser[index] ? 1 : InActiveOpacity,
                    height: selectedUser[index] ? 40 : 30,
                    width: selectedUser[index] ? 40 : 30,
                    borderRadius: 40,
                    backgroundColor:Color.badge_bg,
                  }}></View>
              </View>

              <Text
                numberOfLines={1}
                style={{
                  fontSize: selectedUser[index] ? 15 : 11,
                  color: selectedUser[index]
                    ? ActiveColor != 'transparent'
                      ? ActiveColor
                      : Color.profileList_badge_bg
                    : Color.profileList_badge_bg,
                  opacity: selectedUser[index] ? 1 : InActiveOpacity,
                }}>
                {/* {item?.name} */}
                {item.user_first_name}
              </Text>
              {/* {profile?.showBadge ? (
                  <Text
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 0,
                      fontSize: 11,
                      fontWeight: '600',
                      color: Color.profileList_badge,
                      backgroundColor: Color.profileList_badge_bg,
                      borderRadius: 50,
                      paddingVertical: 2,
                      paddingHorizontal: 5,
                    }}>
                    {profile?.badge}
                  </Text>
                ) : null} */}
            </Pressable>
          </View>
        );
      })}
    </ScrollView>
  );
}

const getStyles = Color => {
  const style = StyleSheet.create({});
  return style;
};

const profile = [
  {
    id: 1,
    name: 'Kishore',
    showBadge: false,
    badge: 9,
    userImage:
      'https://photos1.blogger.com/blogger/6684/469/1600/Jake%20Glyllenhaal%20smile.0.jpg',
  },
  {
    id: 2,
    name: 'Mutyalu',
    showBadge: false,
    badge: 9,
    userImage:
      'https://images.unsplash.com/photo-1623184663110-89ba5b565eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c21pbGluZyUyMG1hbnxlbnwwfHwwfHw%3D&w=1000&q=80',
  },
  {
    id: 3,
    name: 'Savitri',
    showBadge: false,
    badge: 9,
    userImage:
      'https://media.istockphoto.com/id/1145237257/photo/smiling-brunette-in-white.jpg?s=612x612&w=0&k=20&c=ic7YrQxFSoLz2WlDLz3wX-LKC7LWF30zfAOqB9YehmU=',
  },
  {
    id: 4,
    name: 'Asha',
    showBadge: false,
    badge: 9,
    userImage:
      'https://as2.ftcdn.net/v2/jpg/02/43/85/59/1000_F_243855911_JAI1915km7T4Win4QjBwmBgcpWhIkiVt.jpg',
  },
  {
    id: 5,
    name: 'Arjun',
    showBadge: false,
    badge: 9,
    userImage:
      'https://media.istockphoto.com/id/1440913878/photo/happy-mother-smiling-and-playing-with-her-son-at-home.jpg?b=1&s=170667a&w=0&k=20&c=Y_YjOCrxtkBVST-AmFdAQ8N-Nbo_FdEtYdAfc0XXh-c=',
  },
];
