import {ActivityIndicator, Dimensions, FlatList, View} from 'react-native';
import React, {useState, useCallback} from 'react';
import {Color} from '../../../../themes';
import Social from './Social';
import Product from './Product';
import Services from './Product';

const ITEM_HEIGHT = Dimensions.get('window').height;

const FeedFlatlist = ({data}) => {
  const [selectedId, setSelectedId] = useState();
  const [loading, setLoading] = useState(false);

  const renderItem = ({item, index}) => {
    return (
      <Product
      key={index}
      
        // key={index}
        item={item}
        onPress={() => setSelectedId(item.id)}
        onPressProfileImage={() => {
          alert(item.profileURL);
        }}
      />
    );
  };
  const keyExtractor = useCallback((item, index) => item.id, []);
  const getItemLayout = useCallback(
    (data, index) => ({
      length: ITEM_HEIGHT / 1.33,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );
  const footerComponent = () => {
    return loading ? (
      <ActivityIndicator
        size="large"
        color={Color.blue}
        style={{marginBottom: 70}}
      />
    ) : (
      <View style={{padding: 70}}></View>
    );
  };

  return (
    <>
      <FlatList
        ListHeaderComponent={<View />}
        data={products}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        extraData={selectedId}
        removeClippedSubviews={true}
        vertical
        showsVerticalScrollIndicator={false}
        // scrollEventThrottle={16}
        // decelerationRate="fast"
        // getItemLayout={getItemLayout}
        ListFooterComponent={footerComponent}
        style={{backgroundColor: Color.aquaBlue}}
      />
    </>
  );
};

export default FeedFlatlist;

const feedData = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3sdf345hb28ba',
    profileImage:
      'https://upload.wikimedia.org/wikipedia/commons/c/c3/Hetero_New_Logo-Colour-Transparent.png',
    title: 'Hetero Drugs',
    subTitle: 'Pharmaceuticals',
    feed: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrdlNoGZKGSwgOco-R-oKD_gkfo0MGdOOxHg&usqp=CAU',
    description:
      'We are constantly striving to create a world where treatment leads to a cure. #BridgingTheGap',
  },
  {
    id: 'btyuksea-c1b1-46c2-aed5-3ad53abb28ba',
    profileImage:
      'https://w7.pngwing.com/pngs/1001/774/png-transparent-novartis-logo.png',
    title: 'Novartis',
    subTitle: 'Pharmaceuticals',
    feed: 'https://www.swissinfo.ch/resource/image/44996702/landscape_ratio16x9/1920/1080/2225e1f4ecb1e610f60a90098fcfa70/5B449FDB8B39BD2EC03E82921D42D78E/zolgensma.jpg',
    description:
      'At the core of everything, its our Employees that make it all happen! #Inspire #Believe #TheNewHetero #HealthierWorld',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    profileImage:
      'https://franchiseindia.s3.ap-south-1.amazonaws.com/uploads/news/wi/gsk-b50fccdf78.jpg',
    title: 'GSK',
    subTitle: 'Pharmaceuticals',
    feed: 'https://india-pharma.gsk.com/media/7343/ms-dhoni.jpg',
    description:
      'At the core of everything, its our Employees that make it all happen! #Inspire #Believe #TheNewHetero #HealthierWorld',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    profileImage: 'https://ainuindia.org/img/Logo2.jpg',
    title: 'Asian Institute of Nephrology and Urology ',
    subTitle: 'Psychologist',
    feed: 'https://ainuindia.org/visakhapatnam/img/thumb_nail_new1.jpeg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    profileImage:
      'https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Apollo_Hospitals_Logo.svg/800px-Apollo_Hospitals_Logo.svg.png',
    title: 'Apollo 24*7',
    subTitle: 'Pharmacist',
    feed: 'https://dog55574plkkx.cloudfront.net/images/apollo-pharmacy-offers.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: '58694a0f-3da1-471f-bd96-1455werwerted72',
    profileImage:
      'https://upload.wikimedia.org/wikipedia/commons/3/3b/Flag_Logo-page-001.jpg',
    title: 'Dr. Agarwal Eye Hospital',
    subTitle: 'Hospital',
    feed: 'https://images.newindianexpress.com/uploads/user/imagelibrary/2019/12/19/w900X450/funding.jpg?w=400&dpr=2.6',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: '58sdfsdfawer-3sdst-471f-bd96-1455werwerted72',
    profileImage:
      'https://yt3.googleusercontent.com/ytc/AGIKgqN5ShQWoTUTW5ZShAJIIop8DBnNhRoGJE2J_fo4pA=s900-c-k-c0x00ffffff-no-rj',
    title: 'CDC',
    subTitle: 'Center for Disease Control and Prevention',
    feed: 'https://wecandothis.hhs.gov/sites/default/files/2021-06/CDC-Essential-Worker-Poster%5BStandalone%5D.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: '58sdfsdfawer-3da1-471f-bd96-1455werwerted72',
    profileImage:
      'https://upload.wikimedia.org/wikipedia/en/e/ed/Nobel_Prize.png',
    title: 'Nobel Prize',
    subTitle: 'Royal Swedish Academy of Sciences',
    feed: 'https://pbs.twimg.com/media/FeI19U1XkAE6Jl9.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: '58sdfsdfawer-76hesw-471f-bd96-1455werwerted72',
    profileImage:
      'https://www.ucsfhealth.org/-/media/project/ucsf/ucsf-health/doctor/card/dr-bruce-miller-md-48940-320x320-2x.jpg?h=640&w=640&hash=7373F00C3617F039C569836201C032E8',
    title: 'Dr.Bruce Miller',
    subTitle: 'UCSF Health',
    feed: 'https://previews.123rf.com/images/sudok1/sudok11311/sudok1131100016/23444421-typical-view-of-a-surgical-operation.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: '58sd67gastawer-76hesw-471f-bd96-1455werwerted72',
    profileImage:
      'https://bcmtestblog.files.wordpress.com/2013/12/shepherd-ross-william.jpg',
    title: 'Dr.Ross',
    subTitle: 'Alamy Orthopedic Hospital',
    feed: 'https://c8.alamy.com/compfr/dnpeeh/operation-au-genou-theatre-de-l-hopital-et-le-personnel-au-travail-instruments-pour-l-utilisation-l-equipement-hospitalier-dnpeeh.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];

const products = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    profileImage:
      'https://dist.neo4j.com/wp-content/uploads/20170613132755/Logo_Novartis.png',
    profileURL: 'Navigate to 1 User',
    product: 'Accufine',
    subTitle: 'Novartis',
    genericName: 'Isotretinoion',
    dosage: 'Capsule',
    strength: '40mg',
    description:
      'Nanotechnology really worked on the basis on printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting',
    feed: 'https://5.imimg.com/data5/SELLER/Default/2022/5/VG/XK/AX/27328922/isotretinoin-500x500.jpeg',
    likes: 93054,
    showCart: true,
    keywords: [
      'Delayed Release',
      'Film coated',
      'Patented',
      'Innovative',
      '100mg',
      'Tablet',
    ],
  },
  {
    id: 'bd7acbea-c1b1-46c2-4324-3ad53abb28ba',
    profileImage:
      'https://img.etimg.com/thumb/width-1200,height-900,imgsize-55371,resizemode-75,msid-86890331/industry/healthcare/biotech/pharmaceuticals/it-department-detects-rs-550-crore-in-hidden-income-after-raids-on-hetero-pharma-group.jpg',
    profileURL: 'Navigate to 1 User',
    product: 'ACWIS-5',
    subTitle: 'Hetero Drugs',
    genericName: 'Isotretinoion',
    dosage: 'Capsule',
    strength: '5mg',
    description:
      'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
    feed: 'https://5.imimg.com/data5/SELLER/Default/2022/2/ZV/KP/BZ/21466830/isotretinoin-5mg-acwis-5-500x500.jpeg',
    likes: 954,
    showCart: true,
    keywords: ['Delayed Release', 'Film coated'],
  },
  {
    id: 'bd7acbea-c1b1-s8fdh-4324-3ad53abb28ba',
    profileImage:
      'https://img.etimg.com/thumb/width-1200,height-900,imgsize-55371,resizemode-75,msid-86890331/industry/healthcare/biotech/pharmaceuticals/it-department-detects-rs-550-crore-in-hidden-income-after-raids-on-hetero-pharma-group.jpg',
    profileURL: 'Navigate to 1 User',
    product: 'Acnecrush-ISO',
    subTitle: 'Hacks & Slacks',
    genericName: 'Clindamycin Phosphate & Isotretinion',
    dosage: 'Gel',
    strength: '5mg',
    description:
      'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
    feed: 'https://5.imimg.com/data5/SELLER/Default/2023/2/JI/QT/VQ/7810472/clindamycin-phosphate-isotretinoin-gel-500x500.jpg',
    likes: 1304,
    showCart: false,
    keywords: ['Grease free', 'Gel'],
  },
  {
    id: 'vd7acbea-c1b1-s8fdh-4324-3ad53abb28ba',
    profileImage:
      'https://dist.neo4j.com/wp-content/uploads/20170613132755/Logo_Novartis.png',
    profileURL: 'Navigate to 1 User',
    product: 'Zolgensma',
    subTitle: 'Novartis',
    genericName: 'Onasemnogene',
    dosage: 'Injection',
    strength: '',
    description:
      'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
    feed: 'https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fcom.ft.imagepublish.upp-prod-eu.s3.amazonaws.com%2F0612c202-7e55-11e9-8b5c-33d0560f039c?fit=scale-down&source=next&width=700',
    likes: 50254,
    showCart: true,
    keywords: ['One dose Therapy', ''],
  },
];
