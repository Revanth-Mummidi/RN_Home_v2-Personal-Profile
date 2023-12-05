import { View, Text, StatusBar,FlatList } from 'react-native'
import React,{useState} from 'react'
import { responsiveHeight, responsiveScreenWidth } from '../../../../themes/ResponsiveDimensions'
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import SingleVideo from './SingleVideo';
import { useEffect } from 'react';
const VideoFeed = ({route,navigaion}) => {
  var {data} = route.params; 
 // console.log(data)
  const [combine,setCombine] = useState([]);
 // console.log(data)
  const feed_data = [
    {
      id: '58sdfsdfawer-76hesw-rted72',
      profileImage:
        'https://www.ucsfhealth.org/-/media/project/ucsf/ucsf-health/doctor/card/dr-bruce-miller-md-48940-320x320-2x.jpg?h=640&w=640&hash=7373F00C3617F039C569836201C032E8',
      title: 'Dr.Bruce Miller',
      subTitle: 'UCSF Health',
      feed: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      description:
        'Lorem ipsum dolor sit amet,nt mollit anim id est laborum.',
      hasTags: ['Pregnancy', 'Nutrition', 'WhatToEat', 'WhatNotToEat', 'Veg'],
      likes: 4566,
      like: false,
      mediaType: 'video',
      bookmark: false,
    },
    {
      id: '58sdfsdfawer-76hesw-rted72',
      profileImage:
        'https://www.ucsfhealth.org/-/media/project/ucsf/ucsf-health/doctor/card/dr-bruce-miller-md-48940-320x320-2x.jpg?h=640&w=640&hash=7373F00C3617F039C569836201C032E8',
      title: 'Dr.Bruce Miller',
      subTitle: 'UCSF Health',
      feed: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      description:
      'Lorem ipsum dolor sit amet,nt mollit anim id est laborum.',      hasTags: ['Pregnancy', 'Nutrition', 'WhatToEat', 'WhatNotToEat', 'Veg'],
      likes: 4566,
      like: false,
      mediaType: 'video',
      bookmark: false,
    },
    {
      id: '58sdfsdfawer-76hesw-rted72',
      profileImage:
        'https://www.ucsfhealth.org/-/media/project/ucsf/ucsf-health/doctor/card/dr-bruce-miller-md-48940-320x320-2x.jpg?h=640&w=640&hash=7373F00C3617F039C569836201C032E8',
      title: 'Dr.Bruce Miller',
      subTitle: 'UCSF Health',
      feed: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      description:
      'Lorem ipsum dolor sit amet,nt mollit anim id est laborum.',
            hasTags: ['Pregnancy', 'Nutrition', 'WhatToEat', 'WhatNotToEat', 'Veg'],
      likes: 4566,
      like: false,
      mediaType: 'video',
      bookmark: false,
    },
    {
      id: '58sdfsdfawer-76hesw-rted72',
      profileImage:
        'https://www.ucsfhealth.org/-/media/project/ucsf/ucsf-health/doctor/card/dr-bruce-miller-md-48940-320x320-2x.jpg?h=640&w=640&hash=7373F00C3617F039C569836201C032E8',
      title: 'Dr.Bruce Miller',
      subTitle: 'UCSF Health',
      feed: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      description:
      'Lorem ipsum dolor sit amet,nt mollit anim id est laborum.',
            hasTags: ['Pregnancy', 'Nutrition', 'WhatToEat', 'WhatNotToEat', 'Veg'],
      likes: 4566,
      like: false,
      mediaType: 'video',
      bookmark: false,
    },
  ]


  useEffect(()=>{
    setCombine(data,feed_data);
  },[])
  const renderFooter = () =>{
    <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ddd', margin: 80 }}>
    <Text>Footer Component</Text>
        </View>
  }
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChangeIndexValue = ({index}) => {
    setCurrentIndex(index);
  };
  console.log(combine)
  return (
   <>
   <View style={{height:responsiveHeight(100),width:responsiveScreenWidth(100)}}>
      <StatusBar backgroundColor={'rgba(0,0,0,0)'}/>
      <FlatList
      onChangeIndex={handleChangeIndexValue}
      data={combine}
      pagingEnabled
      renderItem={({item, index}) => (
        <SingleVideo item={item} index={index} currentIndex={currentIndex} />
      )}
      keyExtractor={(item, index) => index}
      //ListFooterComponent={renderFooter}
    />
    </View>
    </>
  )
}

export default VideoFeed