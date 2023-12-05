/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  PanResponder,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
const {Value, event, block, set} = Animated;
const SUPPORTED_ORIENTATIONS = [
  'portrait',
  'portrait-upside-down',
  'landscape',
  'landscape-left',
  'landscape-right',
];

const HEIGHT = Dimensions.get('window').height;

class BottomSheetProvider extends Component {
  constructor(props) {
    super(props);
    this.translateY = new Value(0);
    this.state = {
      modalVisible: false,
      animatedHeight: new Animated.Value(0),
      pan: new Animated.ValueXY(),
    };

    this.createPanResponder(props);
  }handleGesture = event([
    {
      nativeEvent: ({ translationY }) => block([
        cond(
          eq(this.gestureState, State.ACTIVE),
          set(this.translateY, add(this.translateY, translationY))
        ),
      ]),
    },
  ], { useNativeDriver: true });


  setModalVisible(visible, props) {
    const {
      height,
      minClosingHeight,
      openDuration,
      closeDuration,
      onClose,
      onOpen,
      setH,
    } = this.props;
    const {animatedHeight, pan} = this.state;
    if (visible) {
      this.setState({modalVisible: visible});
      if (typeof onOpen === 'function') {
        onOpen(props);
      }
      Animated.timing(animatedHeight, {
        useNativeDriver: false,
        toValue: height,
        duration: openDuration,
      }).start();
    } else {
      Animated.timing(animatedHeight, {
        useNativeDriver: false,
        toValue: minClosingHeight,
        duration: closeDuration,
      }).start(() => {
        pan.setValue({x: 0, y: 0});
        this.setState({
          modalVisible: visible,
          animatedHeight: new Animated.Value(0),
        });

        if (typeof onClose === 'function') {
          onClose(props);
        }
      });
    }
  }

  componentDidUpdate() {
    const {height, openDuration, setH} = this.props;
    const {animatedHeight, pan} = this.state;

    Animated.timing(animatedHeight, {
      useNativeDriver: false,
      toValue: height,
      duration: openDuration,
    }).start();
  }

  componentWillUnmount() {
    const {height, minClosingHeight, openDuration} = this.props;
    const {animatedHeight, pan} = this.state;

    Animated.timing(animatedHeight, {
      useNativeDriver: false,
      toValue: 0,
      duration: openDuration,
    }).start();
  }

  createPanResponder(props) {
    const {closeOnDragDown, height, setH} = props;
    const {pan} = this.state;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => closeOnDragDown,

      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0) {
          Animated.event([null, {dy: pan.y}], {useNativeDriver: false})(
            e,
            gestureState,
          );
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (height / 4 - gestureState.dy < 0) {
          this.setModalVisible(false);
          this.props.setH(HEIGHT / 2);
        } else {
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: false,
          }).start();
        }
      },
    });
  }

  open(props) {
    this.setModalVisible(true, props);
  }

  close(props) {
    this.setModalVisible(false, props);
    this.props.setH(this.props.height);
  }

  render() {
    const {
      animationType,
      closeOnDragDown,
      dragFromTopOnly,
      closeOnPressMask,
      closeOnPressBack,
      children,
      customStyles,
      keyboardAvoidingViewEnabled,
    } = this.props;
    const {animatedHeight, pan, modalVisible} = this.state;
    const panStyle = {
      transform: pan.getTranslateTransform(),
    };

    return (
      <Modal
        transparent
        animationType={animationType}
        visible={modalVisible}
        supportedOrientations={SUPPORTED_ORIENTATIONS}
        onRequestClose={() => {
          if (closeOnPressBack) {
            this.setModalVisible(false);
            this.props.setH(this.props.height);
          }
        }}>
        <KeyboardAvoidingView
          enabled={keyboardAvoidingViewEnabled}
          behavior="padding"
          style={[styles.wrapper, customStyles.wrapper]}>
          <TouchableOpacity
            style={styles.mask}
            activeOpacity={1}
            onPress={() => (closeOnPressMask ? this.close() : null)}
          />
          <Animated.View
            {...(!dragFromTopOnly && this.panResponder.panHandlers)}
            pointerEvents="box-none"
            style={[
              {borderRadius: 18, height: this.props.height},
              panStyle,
              styles.container,
              {height: animatedHeight},
              customStyles.container,
            ]}>
            {closeOnDragDown && (
              <View
                {...(dragFromTopOnly && this.panResponder.panHandlers)}
                style={styles.draggableContainer}>
                <View
                  style={[styles.draggableIcon, customStyles.draggableIcon]}
                />
              </View>
            )}
            {children}
          </Animated.View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

BottomSheetProvider.propTypes = {
  animationType: PropTypes.oneOf(['none', 'slide', 'fade']),
  height: PropTypes.number,
  minClosingHeight: PropTypes.number,
  openDuration: PropTypes.number,
  closeDuration: PropTypes.number,
  closeOnDragDown: PropTypes.bool,
  closeOnPressMask: PropTypes.bool,
  dragFromTopOnly: PropTypes.bool,
  closeOnPressBack: PropTypes.bool,
  keyboardAvoidingViewEnabled: PropTypes.bool,
  customStyles: PropTypes.objectOf(PropTypes.object),
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  children: PropTypes.node,
};

BottomSheetProvider.defaultProps = {
  animationType: 'none',
  height: 560,
  minClosingHeight: 0,
  openDuration: 300,
  closeDuration: 200,
  closeOnDragDown: false,
  dragFromTopOnly: false,
  closeOnPressMask: true,
  closeOnPressBack: true,
  keyboardAvoidingViewEnabled: Platform.OS === 'ios',
  customStyles: {},
  onClose: null,
  onOpen: null,
  children: <View />,
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#00000077',
  },
  mask: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: 0,
    overflow: 'hidden',
  },
  draggableContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  draggableIcon: {
    width: 35,
    height: 5,
    borderRadius: 5,
    margin: 10,
    backgroundColor: '#ccc',
  },
});

export default BottomSheetProvider;
