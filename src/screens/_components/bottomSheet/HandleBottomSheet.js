/**
 * Usage of Bottom Sheet
 * 
 * 1. declaration
 * refCreateProfile = React.useRef(null);
 * 
 * 2. calling bottom sheet component
 * <HandleBottomSheet
    containerStyle={{backgroundColor: Color.BLACK}}
    bottomSheetRef={refCreateProfile}
    content={create_professional_profile()}
    height={400}
    draggableIcon={{backgroundColor: Color.WHITE, width: 100}}
  />
 * 3. Adding content to the bottom sheet
    const create_professional_profile = () => {
    return (
      <View>
      </View>
    );
    };
  *
  * 4. Initiating or closing bottomSheeting
  *    refCreateProfile.current.open();
  *    refCreateProfile.current.close();
  * 
 */

/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {Button, Dimensions, View} from 'react-native';
import BottomSheetProvider from './BottomSheetProvider';
import BottomSheetHomeScreen from './bottomSheetHomeScreen';
import {Colors} from '../../../themes';
import { ThemeContext } from '../../../themes/components/ThemeContext';
const HEIGHT = Dimensions.get('window').height;

export default function HandleBottomSheet({
  bottomSheetRef,
  content,
  height,
  // h,
  // setH,
  containerStyle,
  draggableIcon,
  dragFromTop = false,
  closeOnDrag = true,
}) {
  const ref1RBSheet = bottomSheetRef;
  // CASE 3 HEIGHT CHANGE
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const Color = Colors(theme);
  const [h, setH] = React.useState(height);
  const setData = () => {
    setH(height);
  };
  React.useEffect(() => {
    setData();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
      }}>
      <BottomSheetProvider
        ref={ref1RBSheet}
        closeOnDragDown={closeOnDrag}
        // closeOnPressMask={false}
        dragFromTopOnly={dragFromTop}
        // height={h}
        setH={setH}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#ffffff',
            ...draggableIcon,
          },
          container: {
            backgroundColor: Color.white,
            width: '100%',
            // height: HEIGHT / 2,
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            ...containerStyle,
          },
          draggableContainer: {
            width: '100%',
            alignItems: 'center',
            backgroundColor: 'transparent',
            borderRadius: 20,
          },
        }}>
        {/* {content} */}
        <BottomSheetHomeScreen setH={setH} content={content} />
      </BottomSheetProvider>
    </View>
  );
}
