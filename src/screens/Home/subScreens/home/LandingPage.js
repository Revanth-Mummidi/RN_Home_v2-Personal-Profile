import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  Pressable,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  RefreshControl,
  Modal,
} from 'react-native';
import React, {useRef, useState, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import Feed from './Feed';
import HorizontalPages from './HorizontalPages';
import {feedData} from './feedData';
import {Colors} from '../../../../themes';
import {AppHeader} from '../../../_components';
import {NotificationPage} from '../../screens/NotificationPage';
import HandleBottomSheet from '../../../_components/bottomSheet/HandleBottomSheet';
import SharePostPage from './Share';
import FeedLikes from '../../screens/FeedLikes';
import FeedComments from '../../screens/FeedComments';
import getStyles from '../../utils/homeStyles';
import {ThemeContext} from '../../../../themes/components/ThemeContext';
import Saved from './Saved';

const ITEM_HEIGHT = Dimensions.get('window').height;
const LandingPage = () => {
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = Colors(theme);
  const styles = getStyles(Color);
  const [bottomSheetContent, setBottomSheetContent] = useState('');
  const [selectedId, setSelectedId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh
  const navigation = useNavigation();
  const refAttachments = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const initialBottomSheet = () => {
    refAttachments.current.open();
  };

  const renderBottomSheetContent = () => {
    // if bottomSheetContent is 'share' then render SharePostPage
    if (bottomSheetContent === 'share') {
      return (
        <SharePostPage
          selectedId={selectedId}
          refAttachments={refAttachments}
          setBottomSheetContent={setBottomSheetContent}
        />
      );
    }
    if (bottomSheetContent === 'likes') {
      return <FeedLikes />;
    }
    if (bottomSheetContent === 'comments') {
      return <FeedComments />;
    }
    if (bottomSheetContent == 'Bookmarks') {
      return <Saved />;
    }
  };

  const CustomAlert = ({visible, onClose, imageSource}) => {
    return (
      <Modal transparent visible={visible} animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              height: 450,
              width: '100%',
            }}>
            <Image
              source={{uri: imageSource}}
              style={{
                width: 400,
                height: 400,
                resizeMode: 'contain',
                borderRadius: 20,
              }}
            />
            <TouchableOpacity
              onPress={onClose}
              style={{alignItems: 'center', top: 30}}>
              <IconIonicons
                name="arrow-back-circle"
                size={50}
                color="#DFDFDF"
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const [isAlertVisible, setAlertVisible] = useState(false);
  const [iurl, setIurl] = useState('');
  const showAlert = () => {
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  const renderItem = ({item, index}) => {
    return (
      <Feed
        item={item}
        onPress={() => setSelectedId(item.id)}
        onPressProfileImage={() => {
          const urlss = item.profileImage;
          const names = item.title;
          navigation.navigate('Status', {
            urlss,
            names,
          });
        }}
        onPressShare={() => {
          setSelectedId(item.id);
          setBottomSheetContent('share');
          initialBottomSheet();
        }}
        onPressComment={() => {
          setSelectedId(item.id);
          setBottomSheetContent('comments');
          initialBottomSheet();
        }}
        onPressBookmark={() => {
          setSelectedId(item.id);
          setBottomSheetContent('Bookmarks');
          initialBottomSheet();
        }}
      />
    );
  };

  const keyExtractor = useCallback((item, index) => item.id, []);

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: true},
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate data fetching delay
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

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
    <View>
      <AppHeader
        title={'L'}
        user={selectedId}
        onPressIcon={id => {
          setSelectedId(id);
        }}
        onPressImage={() => {
          navigation.navigate('PersonalStack', {screen: 'PersonalLanding'});
        }}
        rightElement={
          <Pressable
            onPress={() => {
              navigation.navigate('NotificationPage');
            }}>
            <View style={{marginRight: 10}}>
              <IconIonicons
                name="notifications"
                size={25}
                color={Color.notificationIcon}
              />
            </View>
            <View
              style={{
                width: 7,
                height: 7,
                backgroundColor: Color.notification,
                borderRadius: 10,
                position: 'absolute',
                top: 4,
                right: 13,
              }}
            />
          </Pressable>
        }
      />
      <Animated.FlatList
        nestedScrollEnabled
        ListHeaderComponent={<HorizontalPages />}
        data={feedData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListFooterComponent={footerComponent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{backgroundColor: Color.themebackground}}
      />
      <HandleBottomSheet
        containerStyle={{backgroundColor: Color.feedBSheet_bgHeader}}
        bottomSheetRef={refAttachments}
        content={renderBottomSheetContent()}
        height={400}
        draggableIcon={{
          backgroundColor: Color.feedBSheet_bgHeaderdrgIcon,
          width: 100,
        }}
        dragFromTop={false}
      />
      <CustomAlert
        visible={isAlertVisible}
        onClose={hideAlert}
        imageSource={iurl}
      />
    </View>
  );
};

export default LandingPage;
