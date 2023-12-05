// /* eslint-disable no-unused-vars */
// /* eslint-disable quotes */

// import {View, Text, StyleSheet, Dimensions} from 'react-native';
// import { getColor } from '../../../themes/GetColor';
// import {useSelector} from 'react-redux'
// import { responsiveWidth } from '../../../themes/ResponsiveDimensions';


// const getStyles = () => {
// const Color=getColor(useSelector(state=>state.theme.theme));
// const styles = StyleSheet.create({
//   parent: {flex: 1, backgroundColor: Color.WHITE},
//   parentWidth: {width: '100%', padding: 10},
//   // widthFull: {width: '100%'},
//   // padding10: {padding: 10},
//   // padding20: {padding: 20},
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 20,
//     maxWidth: Dimensions.get('window').width * 10,
//   },
//   flexRowEvenly: {flexDirection: 'row', justifyContent: 'space-evenly'},
//   flexRowWrap: {flexDirection: 'row', flexWrap: 'wrap'},
//   flexRowBetween: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   textFieldReplica: {
//     marginBottom: 10,
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//     backgroundColor: Color.aquaBlue,
//     borderRadius: 10,
//   },
//   textFieldRowBetween: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 10,
//   },
//   ////// >>>>>>>>>>> Fonts >>>>>>>>>>>>>
//   bigTitle26: {fontSize: 26, fontWeight: '800'},
//   title22: {fontSize: 22, fontWeight: 'bold', color: Color.mediumGray},
//   title17: {fontSize: 17, fontWeight: '600', color: Color.midBlue},
//   heading17: {fontSize: 17, fontWeight: '600', color: Color.BLACK},
//   heading20: {fontSize: 20, fontWeight: 'bold', color: Color.BLACK},
//   text14: {fontSize: 14, fontWeight: '500', color: Color.mediumGray},
//   text11: {color: Color.lightGray, fontSize: 11},
//   subHeading13: {fontSize: 13, color: Color.mildGray, fontWeight: '500'},
//   subtitle13: {fontSize: 13, fontWeight: '500', color: Color.mediumGray},
//   headingStyle: {
//     marginBottom: 20,
//     marginTop: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     textAlign: 'center',
//   },
//   headingTextStyle: {
//     marginBottom: 20,
//     marginTop: 10,
//     textAlign: 'center',
//   },
//   tileCardContainer: {
//     backgroundColor: Color.textfieldContainer,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   ////// >>>>>>>>>>> Buttons >>>>>>>>>>>>>
//   borderButton: {
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     paddingVertical: 2,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   mediumButton: {
//     // minWidth: '22%',
//     paddingHorizontal: 22,
//     paddingVertical: 8,
//     backgroundColor: Color.badge_bg,
//     borderRadius: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'flex-end',
//     marginRight: 10,
//     marginVertical: 10,
//   },
//   buttonText: {color: Color.WHITE, fontWeight: '700', fontSize: 17},
//   buttonText14: {color: Color.WHITE, fontWeight: '500', fontSize: 14},
//   iconButton: {
//     backgroundColor: Color.badge_bg,
//     borderRadius: 14,
//     justifyContent: 'center',
//     alignItems: 'flex-end',
//     padding: 14,
//     flexDirection: 'row',
//   },
//   buttonContainer: {
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: Color.white,
//     borderRadius: 10,
//     margin: 2,
//   },
//   ////// >>>>>>>>>>> Cards >>>>>>>>>>>>>

//   container: {
//     borderRadius: 10,
//     backgroundColor: Color.aquaBlue,
//     marginTop: 10,
//     padding: 10,
//     flex:1,
//   },
//   containerRow: {
//     borderRadius: 10,
//     backgroundColor: Color.aquaBlue,
//     marginTop: 10,
//     padding: 10,
//     flexDirection: 'row',
//   },
//   inputContainerRow: {
//     borderRadius: 10,
//     backgroundColor: Color.midBlue,
//     marginTop: 10,
//     padding: 5,
//     flexDirection: 'row',
//   },
//   cardTitle: {fontWeight: '600', width: '70%', color: Color.WHITE, padding: 10},
//   cardCircleMedium: {
//     width: 130,
//     height: 130,
//     justifyContent: 'center',
//     alignSelf: 'center',
//     alignItems: 'center',
//     padding: 20,
//     borderRadius: 100,
//     backgroundColor: Color.BLACK,
//   },
//   ////// >>>>>>>>>>> Icons >>>>>>>>>>>>>

//   smallIcon: {width: 20, height: 20, tintColor: Color.WHITE},
//   mediumIcon: {width: 30, height: 30},
//   Icon40: {width: 40, height: 40},
//   iconContainer: {
//     alignItems: 'center',
//     borderRadius: 5,
//     padding: 5,
//     paddingVertical:7,
//     minWidth: '20%',
//     marginHorizontal: 6,
//   },
//   ////// >>>>>>>>>>> Images >>>>>>>>>>>>>
//   image46: {height: 46, width: 46, borderRadius: 100},
//   profileImageBig: {
//     width: 100,
//     height: 100,
//     borderRadius: 100,
//     borderWidth: 3,
//     borderColor: Color.WHITE,
//   },
//   Image200: {
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//     borderWidth: 3,
//     borderColor: Color.WHITE,
//   },
//   badgeVerify: {
//     position: 'absolute',
//     bottom: 0,
//     right: 26,
//     width: 22,
//     height: 22,
//     tintColor: Color.mildGray,
//   },
//   ///////////// Apercu >>>>>>>>>>>>>>>>>
//   profileContainer: {
//     // paddingTop: 40,
//     paddingLeft: 20,
//     alignSelf: 'flex-start',
//     paddingRight: 27,
//   },
//   tabContainer: {
//     width: 50,
//     height: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   ///////////// Blood Group >>>>>>>>>>>>>>>>>
//   inActive: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     backgroundColor: Color.WHITE,
//     color: Color.personal_profile.icons.activeColor,
//     margin: 5,
//     borderRadius: 10,
//     width:responsiveWidth(20),
//     padding: 14,
//   },
//   active: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     backgroundColor: Color.personal_profile.icons.activeColor,
//     color: Color.personal_profile.icons.inactiveColor,
//     margin: 5,
//     borderRadius: 10,
//     width:responsiveWidth(20),
//     padding: 14,
//   },
//   selectedItem: {
//     backgroundColor: Color.BLACK,
//     padding: 20,
//     // width: 100,
//     // height: 100,
//     justifyContent: 'center',
//     borderRadius: 50,
//     alignSelf: 'center',
//     alignItems: 'center',
//   },

//   //////////// Verification  >>>>>>>>>>>>>>>>>
//   uploadTextfield: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: Color.aquaBlue,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   textfieldContainer: {width: '75%'},
//   uploadcontainer: {
//     width: '20%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: Color.lowBlue,
//     borderTopRightRadius: 10,
//     borderBottomRightRadius: 10,
//   },
// });
// return styles;
// }
// export default getStyles;

/* eslint-disable no-unused-vars */
/* eslint-disable quotes */

import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { getColor } from '../../../themes/GetColor';
import {useSelector} from 'react-redux'
import { responsiveWidth } from '../../../themes/ResponsiveDimensions';


const getStyles = () => {
const Color=getColor(useSelector(state=>state.theme.theme));
const styles = StyleSheet.create({
  parent: {flex: 1, backgroundColor: Color.WHITE},
  parentWidth: {width: '100%', padding: 10},
  // widthFull: {width: '100%'},
  // padding10: {padding: 10},
  // padding20: {padding: 20},
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    maxWidth: Dimensions.get('window').width * 10,
  },
  flexRowEvenly: {flexDirection: 'row', justifyContent: 'space-evenly'},
  flexRowWrap: {flexDirection: 'row', flexWrap: 'wrap'},
  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textFieldReplica: {
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: Color.aquaBlue,
    borderRadius: 10,
  },
  textFieldRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  ////// >>>>>>>>>>> Fonts >>>>>>>>>>>>>
  bigTitle26: {fontSize: 26, fontWeight: '800'},
  title22: {fontSize: 22, fontWeight: 'bold', color: Color.mediumGray},
  title17: {fontSize: 17, fontWeight: '600', color: Color.midBlue},
  heading17: {fontSize: 17, fontWeight: '600', color: Color.BLACK},
  heading20: {fontSize: 20, fontWeight: 'bold', color: Color.BLACK},
  text14: {fontSize: 14, fontWeight: '500', color: Color.mediumGray},
  text11: {color: Color.lightGray, fontSize: 11},
  subHeading13: {fontSize: 13, color: Color.mildGray, fontWeight: '500'},
  subtitle13: {fontSize: 13, fontWeight: '500', color: Color.mediumGray},
  headingStyle: {
    marginBottom: 20,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  headingTextStyle: {
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  tileCardContainer: {
    backgroundColor: Color.textfieldContainer,
    borderRadius: 10,
    marginBottom: 10,
  },
  ////// >>>>>>>>>>> Buttons >>>>>>>>>>>>>
  borderButton: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediumButton: {
    // minWidth: '22%',
    paddingHorizontal: 22,
    paddingVertical: 8,
    backgroundColor: Color.badge_bg,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 10,
    marginVertical: 10,
  },
  buttonText: {color: Color.WHITE, fontWeight: '700', fontSize: 17},
  buttonText14: {color: Color.WHITE, fontWeight: '500', fontSize: 14},
  iconButton: {
    backgroundColor: Color.badge_bg,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 14,
    flexDirection: 'row',
  },
  buttonContainer: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: Color.white,
    borderRadius: 10,
    margin: 2,
  },
  ////// >>>>>>>>>>> Cards >>>>>>>>>>>>>

  container: {
    borderRadius: 10,
    backgroundColor: Color.aquaBlue,
    marginTop: 10,
    padding: 10,
    flex:1,
  },
  containerRow: {
    borderRadius: 10,
    backgroundColor: Color.aquaBlue,
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
  },
  inputContainerRow: {
    borderRadius: 10,
    backgroundColor: Color.midBlue,
    marginTop: 10,
    padding: 5,
    flexDirection: 'row',
  },
  cardTitle: {fontWeight: '600', width: '70%', color: Color.WHITE, padding: 10},
  cardCircleMedium: {
    width: 130,
    height: 130,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 100,
    backgroundColor: Color.BLACK,
  },
  ////// >>>>>>>>>>> Icons >>>>>>>>>>>>>

  smallIcon: {width: 20, height: 20, tintColor: Color.WHITE},
  mediumIcon: {width: 30, height: 30},
  Icon40: {width: 40, height: 40},
  iconContainer: {
    alignItems: 'center',
    borderRadius: 5,
    padding: 5,
    paddingVertical:7,
    minWidth: '20%',
    marginHorizontal: 6,
  },
  ////// >>>>>>>>>>> Images >>>>>>>>>>>>>
  image46: {height: 46, width: 46, borderRadius: 100},
  profileImageBig: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: Color.WHITE,
  },
  Image200: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: Color.WHITE,
  },
  badgeVerify: {
    position: 'absolute',
    bottom: 0,
    right: 26,
    width: 22,
    height: 22,
    tintColor: Color.mildGray,
  },
  ///////////// Apercu >>>>>>>>>>>>>>>>>
  profileContainer: {
    // paddingTop: 40,
    paddingLeft: 20,
    alignSelf: 'flex-start',
    paddingRight: 27,
  },
  tabContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ///////////// Blood Group >>>>>>>>>>>>>>>>>
  inActive: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: Color.WHITE,
    color: Color.personal_profile.icons.activeColor,
    margin: 5,
    borderRadius: 10,
    width:responsiveWidth(20),
    padding: 14,
  },
  active: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: Color.personal_profile.icons.activeColor,
    color: Color.personal_profile.icons.inactiveColor,
    margin: 5,
    borderRadius: 10,
    width:responsiveWidth(20),
    padding: 14,
  },
  selectedItem: {
    backgroundColor: Color.BLACK,
    padding: 20,
    // width: 100,
    // height: 100,
    justifyContent: 'center',
    borderRadius: 50,
    alignSelf: 'center',
    alignItems: 'center',
  },

  //////////// Verification  >>>>>>>>>>>>>>>>>
  uploadTextfield: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Color.aquaBlue,
    borderRadius: 10,
    marginBottom: 10,
  },
  textfieldContainer: {width: '75%'},
  uploadcontainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.lowBlue,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});
return styles;
}
export default getStyles;