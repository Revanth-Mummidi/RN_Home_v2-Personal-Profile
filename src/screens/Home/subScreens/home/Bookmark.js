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
} from 'react-native';
import React, { useRef, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import Feed from './Feed';
import { bookmarkData } from './bookmarkData';
import { Color } from '../../../../themes';
import { AppHeader } from '../../../_components';
import { NotificationPage } from '../../screens/NotificationPage'
import HandleBottomSheet from '../../../_components/bottomSheet/HandleBottomSheet';
import { ScrollView } from 'react-native-gesture-handler';
import SharePostPage from './Share';
import FeedLikes from '../../screens/FeedLikes';
import FeedComments from '../../screens/FeedComments';
import { set } from 'react-native-reanimated';
const ITEM_HEIGHT = Dimensions.get('window').height;

const BookmarkPage = () => {
  const [bottomSheetContent, setBottomSheetContent] = useState('');
  const [selectedId, setSelectedId] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  refAttachments = React.useRef(null);
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
      return (
        <FeedLikes />
      );
    }
    if (bottomSheetContent === 'comments') {
      return (
        <FeedComments />
      );
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <Feed
        // key={index}
        item={item}
        onPress={() => setSelectedId(item.id)}
        onPressProfileImage={() => {
          alert(item.profileURL);
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
        style={{ marginBottom: 70 }}
      />
    ) : (
      <View style={{ padding: 70 }}></View>
    );
  };

  return (
    <View>
      <AppHeader
        title={'Hi'}
        user={selectedId}
        onPressImage={() => {
          navigation.navigate('PersonalStack', { screen: 'PersonalLanding' });
        }}
        onPressIcon={(id) => {
          setSelectedId(id);
        }}
        rightElement={
          <Pressable
            onPress={() => {
              navigation.navigate('NotificationPage');
            }}>
            <View style={{ marginRight: 10 }}>
              <IconIonicons
                name="notifications"
                size={25}
                color={Color.WHITE}
              />
            </View>
            <View
              style={{
                width: 7,
                height: 7,
                backgroundColor: Color.purple,
                borderRadius: 10,
                position: 'absolute',
                top: 4,
                right: 13,
              }}
            />
          </Pressable>
        }
      />

      <View style={{ backgroundColor: Color.mildBlue, height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: Color.white }}>Bookmarked Posts</Text>
      </View>

      <FlatList
        data={bookmarkData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        extraData={selectedId}
        removeClippedSubviews={true}
        vertical
        showsVerticalScrollIndicator={true}
        // scrollEventThrottle={16}
        // decelerationRate="fast"
        // getItemLayout={getItemLayout}
        // ListFooterComponent={footerComponent}
        ListFooterComponent={<View style={{ padding: 80 }} />}
        style={{ backgroundColor: Color.aquaBlue }}
      />
      <HandleBottomSheet
        containerStyle={{ backgroundColor: Color.white }}
        bottomSheetRef={refAttachments}
        content={renderBottomSheetContent()}
        height={400}
        draggableIcon={{ backgroundColor: Color.BLACK, width: 100 }}
        dragFromTop={false}
      />
    </View>
  );
};

export default BookmarkPage;
const styles = StyleSheet.create({
  bottomSheetContent: {
    backgroundColor: Color.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: Color.BLACK,
  },
  personContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  personInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  personName: {
    fontSize: 16,
    color: Color.BLACK,
    marginRight: 12,
  },
  sendButton: {
    backgroundColor: Color.midBlue,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  sendButtonText: {
    fontSize: 14,
    color: Color.white,
    fontWeight: 'bold',
  },
  line: {
    borderBottomColor: Color.lightGray,
    borderBottomWidth: 1,
    marginLeft: 16,
  },
});
