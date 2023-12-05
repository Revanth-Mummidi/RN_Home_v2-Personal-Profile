import React, {useState} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {styles} from './styles.js';
// import { TouchableOpacity } from "react-native-gesture-handler";
// import { NeomorphBlur } from "react-native-neomorph-shadows";
import {Color} from '../../../../themes';
// import { BASE_URL } from "../axios/API";
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

function ToolBar(props) {
  const [profileSlider, setProfileSlider] = useState();
  return (
    <View
      style={{
        height: 50,
        width: '100%',
      }}>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        {props.icon ? (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.toggle}
            onPress={props.onPress}>
            <Image
              source={{uri: props.icon}}
              style={{height: 40, width: 40, borderRadius: 100}}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.toggle}
            onPress={props.onPress}>
            <Image
              source={require('../../assets/images/dummy_User.png')}
              style={{height: 40, width: 40, borderRadius: 100}}
            />
          </TouchableOpacity>
        )}
        <View>
          <Text style={{fontSize: 19, color: Color.WHITE, fontWeight: '500'}}>
            {props.title}
          </Text>
          <View style={{marginLeft: 5, justifyContent: 'flex-end'}}>
            <IconFontAwesome
              name={profileSlider ? 'angle-up' : 'angle-down'}
              size={19}
              color={Color.mildBlue}
              style={{marginRight: 10}}
            />
          </View>
        </View>

        <View
          style={
            {
              //   flex: 1,
              // alignSelf:'flex-end',
              // flexDirection: "row",
              // justifyContent: "flex-end",
              // alignItems: "center",
              // paddingRight: 10,
            }
          }>
          {props.children}
        </View>
      </View>
    </View>
  );
}

ToolBar.propTypes = {};

export default ToolBar;

//  **************** Cleaning the code for Global Header ********************
// import React from 'react';
// import {Image, Text, View} from 'react-native';
// import {styles} from './styles/styles.js';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import {NeomorphBlur} from 'react-native-neomorph-shadows';
// import Color from '../theme/Color';
// import {BASE_URL} from '../axios/API';

// function ToolBar(props) {
//     return (
//         <View style={styles.toolBar}>
//             <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
//                 {props.icon
//                     ?
//                     (<TouchableOpacity
//                         activeOpacity={1}
//                         style={styles.toggle}
//                         onPress={props.onPress}>
//                         <NeomorphBlur
//                             style={{
//                                 backgroundColor: Color.primaryNeo,
//                                 width: 46,
//                                 height: 46,
//                                 shadowRadius: 2,
//                                 shadowOffset: {width: 2, height: 2},
//                                 borderRadius: 100,
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                             }}>
//                             <NeomorphBlur
//                                 inner
//                                 style={{
//                                     backgroundColor: Color.primaryNeo,
//                                     width: 43,
//                                     height: 43,
//                                     shadowRadius: 2,
//                                     shadowOffset: {width: -2, height: -2},
//                                     borderRadius: 100,
//                                     justifyContent: 'center',
//                                     alignItems: 'center',
//                                 }}>
//                                 <Image
//                                     source={{uri: props.icon}}
//                                     style={{height: 40, width: 40, borderRadius: 100}}
//                                 />
//                             </NeomorphBlur>
//                         </NeomorphBlur>
//                     </TouchableOpacity>)
//                     :
//                     (<TouchableOpacity
//                         activeOpacity={1}
//                         style={styles.toggle}
//                         onPress={props.onPress}>
//                         <NeomorphBlur
//                             style={{
//                                 backgroundColor: Color.primaryNeo,
//                                 width: 46,
//                                 height: 46,
//                                 shadowRadius: 2,
//                                 shadowOffset: {width: 2, height: 2},
//                                 borderRadius: 100,
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                             }}>
//                             <NeomorphBlur
//                                 inner
//                                 style={{
//                                     backgroundColor: Color.primaryNeo,
//                                     width: 43,
//                                     height: 43,
//                                     shadowRadius: 2,
//                                     shadowOffset: {width: -2, height: -2},
//                                     borderRadius: 100,
//                                     justifyContent: 'center',
//                                     alignItems: 'center',
//                                 }}>
//                                 <Image
//                                     source={require('../assets/images/dummy_User.png')}
//                                     style={{height: 40, width: 40, borderRadius: 100}}
//                                 />
//                             </NeomorphBlur>
//                         </NeomorphBlur>
//                     </TouchableOpacity>)
//                 }
//                 <Text style={styles.toolbarTitle}>{props.title}</Text>
//             </View>
//             <View
//                 style={{
//                     flex: 1,
//                     flexDirection: 'row',
//                     justifyContent: 'flex-end',
//                     alignItems: 'center',
//                     paddingRight: 10,
//                 }}>
//                 {props.children}
//             </View>
//         </View>
//     );
// }

// ToolBar.propTypes = {};

// export default ToolBar;

// import React from 'react';
// import {Image, Text, View} from 'react-native';
// import {styles} from './styles/styles.js';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import {BASE_URL} from '../axios/API';
//
// function ToolBar(props) {
//     return (
//         <View style={styles.toolBar}>
//             <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
//                 {props.icon ? (
//                     <TouchableOpacity
//                         activeOpacity={1}
//                         style={styles.toggle}
//                         onPress={props.onPress}>
//                         <Image source={{uri: BASE_URL + props.icon}}
//                                style={{height: 40, width: 40, borderRadius: 100}}/>
//                     </TouchableOpacity>
//                 ) : null}
//                 <Text style={styles.toolbarTitle}>{props.title}</Text>
//             </View>
//             <View style={{
//                 flex: 1,
//                 flexDirection: 'row',
//                 justifyContent: 'flex-end',
//                 alignItems: 'center',
//                 paddingRight: 10,
//             }}>
//                 {props.children}
//             </View>
//         </View>
//     );
// }
//
// ToolBar.propTypes = {};
//
// export default ToolBar;
