import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../../../themes';
import LinearGradient from 'react-native-linear-gradient';

const DualButton = props => {
  const [clicked, setClicked] = useState('right');
  const [leftLinear, setLeftLinear] = useState([
    '#E5EDF7',
    '#B8C6DB',
    '#B8C6DB',
  ]);
  const [rightLinear, setRigthLinear] = useState([
    '#2899C6',
    '#1B88C3',
    '#157AC0',
  ]);
  const onPressLeftButton = () => {
    setClicked('left');
    props.onPressLeft();
  };
  const onPressRightButton = () => {
    setClicked('right');
    props.onPressRight();
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={onPressLeftButton} style={styles.buttonWidth}>
        <LinearGradient
          colors={clicked === 'left' ? rightLinear : leftLinear}
          style={styles.leftButton}>
          <Text
            style={{
              ...styles.text,
              color: clicked === 'left' ? Color.WHITE : Color.mediumGray,
            }}>
            {props.titleLeft}
          </Text>
        </LinearGradient>
      </Pressable>
      <Pressable onPress={onPressRightButton} style={styles.buttonWidth}>
        <LinearGradient
          colors={clicked === 'right' ? rightLinear : leftLinear}
          style={styles.rightButton}>
          <Text
            style={{
              ...styles.text,
              color: clicked === 'right' ? Color.WHITE : Color.mediumGray,
            }}>
            {props.titleRight}
          </Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

export default DualButton;

const styles = StyleSheet.create({
  container: {flexDirection: 'row', width: '100%', paddingVertical: 5},
  buttonWidth: {width: '50%'},
  leftButton: {
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: Color.aquaBlue,
    alignItems: 'center',
  },
  rightButton: {
    padding: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: Color.blue,
    alignItems: 'center',
  },
  text: {fontWeight: '700', color: Color.WHITE},
});

// import {Pressable, StyleSheet, Text, View} from 'react-native';
// import React, {useState} from 'react';
// import {Color} from '../../../themes';
// import LinearGradient from 'react-native-linear-gradient';

// const DualButton = ({
//   titleLeft = 'Cancel',
//   titleRight = 'Save',
//   linearLeft = ['#E5EDF7', '#B8C6DB', '#B8C6DB'],
//   linearRigth = ['#2899C6', '#1B88C3', '#157AC0'],
//   onPressLeftButton,
//   onPressRightButton,
//   clickedButton = 'right',
// }) => {
//   const [clicked, setClicked] = useState(clickedButton);
//   const [leftLinear, setLeftLinear] = useState(linearLeft);
//   const [rightLinear, setRigthLinear] = useState(linearRigth);
//   // const [leftonPress, setLeftonPress] = useState(setClicked('left'));
//   function leftButtonPressed(){
//     onPressLeftButton;
//   }
//   return (
//     <View style={styles.container}>
//       <Pressable onPress={leftButtonPressed} style={styles.buttonWidth}>
//         <LinearGradient
//           colors={clicked === 'left' ? rightLinear : leftLinear}
//           style={styles.leftButton}>
//           <Text
//             style={{
//               ...styles.text,
//               color: clicked === 'left' ? Color.WHITE : Color.mediumGray,
//             }}>
//             {titleLeft}
//           </Text>
//         </LinearGradient>
//       </Pressable>
//       <Pressable onPress={onPressRightButton} style={styles.buttonWidth}>
//         <LinearGradient
//           colors={clicked === 'right' ? rightLinear : leftLinear}
//           style={styles.rightButton}>
//           <Text
//             style={{
//               ...styles.text,
//               color: clicked === 'right' ? Color.WHITE : Color.mediumGray,
//             }}>
//             {titleRight}
//           </Text>
//         </LinearGradient>
//       </Pressable>
//     </View>
//   );
// };

// export default DualButton;

// const styles = StyleSheet.create({
//   container: {flexDirection: 'row', width: '100%', paddingVertical: 5},
//   buttonWidth: {width: '50%'},
//   leftButton: {
//     padding: 10,
//     borderTopLeftRadius: 10,
//     borderBottomLeftRadius: 10,
//     backgroundColor: Color.aquaBlue,
//     alignItems: 'center',
//   },
//   rightButton: {
//     padding: 10,
//     borderTopRightRadius: 10,
//     borderBottomRightRadius: 10,
//     backgroundColor: Color.blue,
//     alignItems: 'center',
//   },
//   text: {fontWeight: '700', color: Color.WHITE},
// });
