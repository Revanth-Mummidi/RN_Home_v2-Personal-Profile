import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TextInput,
  ScrollView,
  Button,
  TouchableOpacity,
  Pressable,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
  Modal,
  RefreshControl,
} from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import React, {useRef, useState, useEffect, useMemo} from 'react';
import {translate} from '../../../services/MultiLanguage.js';
import axios from 'axios';
import ReminderCard from '../Components/ReminderCard';
import {useTranslation} from 'react-i18next';
import DatePicker from 'react-native-date-picker';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import NewTask from './NewTask';
import moment from 'moment';
import data from '../BackEnd/ReminderData';
import AppHeader from '../Components/CalendarHeader.js';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons.js';
import DateTimeScrollablePicker from '../Components/DateTimeScrollablePicker.jsx';
import {
  HandleBottomSheet,
  ProfileSliderList,
  TextInputFields,
  Toast,
} from '../../_components';
import Bottomsheet from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {ThemeContext} from '../../../../src/themes/components/ThemeContext';
import {Color, Colors} from '../../../themes';
import CardSheet from './CardSheet';
import LinearGradient from 'react-native-linear-gradient';
import ProfileSlider from '../Components/ProfileSlider.jsx';
import {color, cond} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import {errorToast} from '../../_components/toast/toast.js';
import {resetSaveTask} from '../slices/SaveSlice.jsx';
import {
  Clear_Cal_States,
  setCurrentDate,
  setIsPreviousCards,
  setIsSearch,
  setProfileSliderView,
  setSearchText,
} from '../slices/CalendarStates.jsx';
import {AddTimeToDate} from '../utils/Formats.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setOnline} from '../../../slices/NetWorkSlice.jsx';
import {
  filterObjectsFromDate,
  filterObjectsFromDatePrev,
  sortByConfirmDate,
} from '../utils/Sorting.js';
import {setEditingObject, setIsEdit, setViewData} from '../slices/ViewCardSlice.jsx';

const HEIGHT = Dimensions.get('window').height;
const TasksStack = () => {
  const Color = useSelector(state => state.theme).Colors;
  const todayDate = new Date();
  const [newDate, setDate] = useState(new Date());
  const [dataFetched, setData] = useState([]);
  const [dataLength, setDataLength] = useState(10);
  const [nextPage, setNextPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [isFilterModal, setFilterModal] = useState(false);
  const dispatch = useDispatch();
  const refCreateTask = React.useRef(null);
  const refViewTask = React.useRef(null);
  const ref = useRef(null);
  const Prev = useSelector(
    state => state.CalendarReducers.cal_states,
  ).IsPreviousCards;
  const currentDate = useSelector(
    state => state.CalendarReducers.cal_states,
  ).CurrentDate;
  const [topReached, setTopReached] = useState(false);
  const isConnected = useSelector(state => state.network).isOnline;
  const SearchText = useSelector(
    state => state.CalendarReducers.cal_states,
  ).searchText;
  const isSearch = useSelector(
    state => state.CalendarReducers.cal_states,
  ).IsSearch;
  const SetAsyncData = async (key, value) => {
    await AsyncStorage.setItem(key, value);
  };
  const getAsyncData = async key => {
    let dataOffline = await AsyncStorage.getItem(key);
    return dataOffline;
  };
  const setPreviousOfflineData = async date => {
    let completeData = await AsyncStorage.getItem('ReminderCompleteData');
    completeData = await JSON.parse(completeData);
    completeData = sortByConfirmDate(completeData, false);
    let futureData = filterObjectsFromDatePrev(completeData, date);
    futureData = sortByConfirmDate(futureData, false);
    setData(futureData);
  };
  const setFutureOfflineData = async date => {
    let completeData = await AsyncStorage.getItem('ReminderCompleteData');
    completeData = await JSON.parse(completeData);
    const futureData = filterObjectsFromDate(completeData, date);
    setData(futureData);
  };
  const handleOnline = async () => {
    let futureData = await fetchOnlineData(new Date(), 20, 1, false);
    let previousData = await fetchOnlineData(new Date(), 20, 1, true);
    previousData = sortByConfirmDate(previousData, true);
    let onlineData = [...previousData, ...futureData];
    if ([...futureData].length != 0)
      SetAsyncData('ReminderFutureData', JSON.stringify(futureData));
    if ([...onlineData].length != 0)
      SetAsyncData('ReminderCompleteData', JSON.stringify(onlineData));
  };
  const handleOffline = async () => {
    errorToast("You're Offline");
    let dataOffline = await getAsyncData('ReminderFutureData');
    setData(await JSON.parse(dataOffline));
  };

  const fetchOnlineData = async (date, itemsPerPage, pageNumber, isPrev) => {
    console.log(moment(date, 'DD-MM-YYYY').format('DD/MM/YYYY'), 'DTA');
    try {
      const AuthToken =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNzAxNDk2MTgxLCJqdGkiOiIzNGU0N2I0ZS01ZGQwLTRkMjktYjIxMS1hYmQyMDZmYjQ4NTQiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMDkxMDAwMDAwMDA0NiIsIm5iZiI6MTcwMTQ5NjE4MX0.GkB7RokJpLvFikmOoSmn1zBwn3j_HADTWSVN2C10QQQ';

      const data = await axios.post(
        `https://app.evaluatehealth.world/calendar/calender/fetchEventsByDate?period=${
          isPrev ? 'previous' : 'next'
        }`,
        {},
        {
          headers: {
            Authorization: `Bearer ${AuthToken}`,
          },
          params: {
            date: moment(date, 'DD-MM-YYYY').format('DD/MM/YYYY'),
            items_per_page: itemsPerPage,
            page: pageNumber,
          },
        },
      );
      if (!data.data || !data.data.event_data) {
        console.log('No events found');
        errorToast('No reminders found');
        throw new Error('No events found');
        // You can return a default value or throw an error or handle it in any other way.
      }
      let allEvents = data.data.event_data;
      if ([...allEvents].length == 0) {
        throw new Error('No events found');
      } else return allEvents;
    } catch (error) {
      console.log(error);
      if (error.response.status == 400) {
        errorToast('Sorry! No more reminders');
      } else {
        // Handle other errors
        console.error('Error fetching online data:', error);
      }
    }
  };
  const fetchOnlineDataBySearch = async (
    SearchTxt,
    itemsPerPage,
    pageNumber,
  ) => {
    try {
      const AuthToken =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjk2NTExMDc2LCJqdGkiOiI4ZGVjNGExMi1hNTcxLTRjNDEtOTRlZC05NzI3MDg1M2YyYjAiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMDkxMDAwMDAwMDA0NiIsIm5iZiI6MTY5NjUxMTA3Nn0.MYdqBgz6_-Ru8b1Mu1B8286aknzkTZ9DRyq7cVBcchM';

      const data = await axios.post(
        `https://app.evaluatehealth.world/calendar/calender/searchByKeyword`,
        {},
        {
          headers: {
            Authorization: `Bearer ${AuthToken}`,
          },
          params: {
            keyword: SearchTxt,
            items_per_page: itemsPerPage,
            page: pageNumber,
          },
        },
      );

      let allEvents = data.data.event_data;
      return allEvents;
    } catch (error) {
      if (error.response.status == 400) {
        errorToast('Sorry! No more reminders');
      }
    }
  };
  useEffect(() => {
    if (isConnected) {
      // console.log("ONLINE");
      handleOnline();
    } else {
      // console.log("OFFLINE");
      handleOffline();
    }
  }, [isConnected]);
  const FetchEvents = async (date, page, isPrev, itemsPerPage) => {
    console.log('DATE==', date);
    if (isConnected) {
      setLoading(true);
      try {
        let allEvents = await fetchOnlineData(date, itemsPerPage, page, isPrev);
        console.log(allEvents[1]);
        console.log(date);
        const len = [...allEvents].length;
        setDataLength(len);
        setData(data => [...data, ...allEvents]);
        if (!isPrev) setNextPage(nextPage + 1);
        else setPreviousPage(previousPage + 1);
        setLoading(false);
      } catch (error) {
        console.log('error while fetching data: ', error.response.status);

        if (error.response.status == 400) {
          errorToast('Sorry! No more reminders');
          console.log('ERROR CAUGHT!');
          setLoading(false);
        }
      }
    } else {
      console.log('NO NETWORK');
      if (isPrev) {
        setPreviousOfflineData(date);
      } else {
        setFutureOfflineData(date);
      }
    }
  };

  const createNewTask = () => {
    return <NewTask refCreateTask={refCreateTask} />;
  };
  const viewCard = () => {
    return (
      <CardSheet refCreateTask={refCreateTask} refViewTask={refViewTask} />
    );
  };

  const addTasks = () => {
    dispatch(resetSaveTask());
    dispatch(setIsEdit(false));
    refCreateTask.current?.open();
  };
  const viewSheet = () => {
    refViewTask.current.open();
  };

  const YourListItem = React.memo(({item, index}) => {
    return (
      <Pressable
        onPress={() => {
          viewSheet();
          dispatch(setEditingObject(item));
          dispatch(setViewData(item));
        }}>
        <View
          style={{
            backgroundColor: '#F6F4EB',
            borderRadius: 14,
            overflow: 'hidden',
            // height: cardHeight,
            marginTop: index == 0 ? 15 : 0,
            marginBottom: 15,
          }}>
          <ReminderCard item={item} key={index} />
        </View>
      </Pressable>
    );
  });
  useEffect(() => {
    if (Prev) {
      setData([]);
      // FetchEvents(newDate, 1, Prev, 10);
      setPreviousPage(2);
      console.log('FETCHED ');
    } else {
      setData([]);
      if (nextPage != 2) FetchEvents(currentDate, 1, Prev, 10);
      setNextPage(2);
      console.log('FETCHED NExt');
    }
  }, [Prev, currentDate]);
  useEffect(() => {
    if (isSearch == 3) {
      setData([]);
      handleSearchText(SearchText);
    } else if (isSearch == 0) {
      dispatch(setCurrentDate(new Date()));
    }
    console.log('SEARCHED TEXT');
  }, [isSearch, SearchText]);
  const handleSearchText = async txt => {
    let tempData = await fetchOnlineDataBySearch(txt, 10, searchPage);
    setData([...dataFetched, ...tempData]);
    setSearchPage(searchPage + 1);
  };
  return (
    <>
      {/* App Header */}
      <Header setFilterModal={setFilterModal} />

      <View
        style={{flex: 1, flexDirection: 'column', backgroundColor: '#272829'}}>
        <View style={{height: HEIGHT - 110}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              paddingHorizontal: 10,
            }}>
            {topReached && !Prev && (isSearch == 0 || isSearch == 2) ? (
              <Pressable
                onPress={() => {
                  setData([]);
                  // setPrev(!Prev);
                  dispatch(setIsPreviousCards(true));
                  FetchEvents(currentDate, 1, true, 10);
                  setPreviousPage(previousPage + 1);
                }}>
                <View
                  style={{
                    width: '100%',
                    padding: 20,
                    backgroundColor: isSearch == 2 ? Color.badge_bg : 'brown',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 15,
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '600',
                      color: Color.white,
                    }}>
                    {isSearch == 2 ? 'Previous Events' : 'Previous Reminders'}
                  </Text>
                </View>
              </Pressable>
            ) : null}
            {/* Render Reminder Cards  */}

            <FlatList
              data={dataFetched}
              ref={ref}
              refreshing={false}
              scrollToOverflowEnabled={true}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={() => {
                    setTopReached(true);
                  }}
                  enabled={true}
                />
              }
              ListFooterComponent={
                isLoading ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#272829',
                      width: '100%',
                      height: 50,
                      paddingVertical: 10,
                    }}>
                    <LottieView
                      source={require('../assets/Loading3.json')}
                      autoPlay
                      loop={true}
                      style={{width: 170, height: 90}}
                    />
                  </View>
                ) : null
              }
              onEndReached={event => {
                if (isSearch != 3 && isSearch != 1) {
                  if (!Prev) {
                    setNextPage(nextPage + 1);
                    FetchEvents(currentDate, nextPage + 1, false, 10);
                  } else {
                    FetchEvents(currentDate, previousPage, true, 10);
                    setPreviousPage(previousPage + 1);
                  }
                } else {
                  handleSearchText(SearchText);
                }
                console.log('END');
              }}
              onEndReachedThreshold={0}
              onScroll={event => {
                const yOffset = event.nativeEvent.contentOffset.y;
                const threshold = 0;
                if (yOffset < threshold && !topReached) {
                  setTopReached(true);
                } else if (yOffset >= threshold + 0.4 && topReached) {
                  setTopReached(false);
                }
              }}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return <YourListItem item={item} index={index} key={index} />;
              }}
            />
          </View>
          <View>
            {/* Search Date */}
            {/* <SearchDate setSearchDate={setSearchDate} /> */}
            {/* <SearchButton setSearchDate={setSearchDate} /> */}
            {/* Add Button  */}
            <CreateNewTask addTasks={addTasks} />
          </View>
        </View>

        <HandleBottomSheet
          dragFromTop={true}
          containerStyle={{backgroundColor: Color.calen_card_bg}}
          bottomSheetRef={refCreateTask}
          content={createNewTask()}
          draggableIcon={{backgroundColor: Color.WHITE, width: 100}}
        />
        <HandleBottomSheet
          dragFromTop={true}
          containerStyle={{backgroundColor: Color.calen_card_bg}}
          bottomSheetRef={refViewTask}
          content={viewCard()}
          // height={HEIGHT}
          draggableIcon={{backgroundColor: Color.WHITE, width: 100}}
        />
        <Modal
          visible={isFilterModal}
          transparent
          onRequestClose={() => {
            setFilterModal(false);
          }}
          // animationIn="slideInDown" // Set the slide-down animation
          // animationOut="slideOutUp"
          animationType="slide">
          <SearchComponent
            setFilterModal={setFilterModal}
            // setNewDate={setDate}
          />
        </Modal>
      </View>
    </>
  );
};

function Header({setFilterModal}) {
  const [selectedId, setSelectedId] = useState(0);
  const months = [3, 6, 8, 9];
  const Color = useSelector(state => state.theme).Colors;
  return (
    <AppHeader
      suffix={'Actions'}
      user={selectedId}
      onPressIcon={id => {
        setSelectedId(id);
      }}
      rightElement={
        <Pressable
          onPress={() => {
            setFilterModal(true);
          }}>
          <View
            style={{
              backgroundColor: Color.header_iconActive,
              padding: 8,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 15,
            }}>
            <IconIonicons
              name={'filter'}
              size={20}
              color={Color.badge}
              style={{height: 20, width: 20}}
            />
          </View>
        </Pressable>
      }
      showProfileBadge={true}
      profileBadge={'2'}
    />
  );
}

function SearchComponent({setFilterModal}) {
  const Color = useSelector(state => state.theme).Colors;
  const [newDate, setDate] = useState(new Date());
  const [newTime, setTime] = useState(new Date());
  const [txt, setTxt] = useState('');
  // const [isSearch, setSearchDate] = useState(false);
  const isSearch = useSelector(
    state => state.CalendarReducers.cal_states,
  ).IsSearch;
  const [searchVal, setSearchVal] = useState(isSearch);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(setCurrentDate(AddTimeToDate(newDate, newTime)));
  // }, [newDate, newTime]);
  const formattedTime = newTime.toLocaleString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  // const Color=useSelector(state=>state.theme).Colors;
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(1, 0, 0, 0.6)',
        // paddingHorizontal: 10,
        // paddingVertical: 140,
        // marginBottom:170,
      }}>
      <View
        style={{
          width: '100%',
          // flex: 1,
          borderRadius: 14,
          backgroundColor: Color.textfieldContainer,
          padding: 10,
          paddingVertical: 20,
        }}>
        <ScrollView
          nestedScrollEnabled={true}
          horizontal={false}
          scrollEnabled={true}>
          {/* Search By memeber */}
          <Pressable
            onPress={() => {
              setSearchVal(1);
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text
                  style={{
                    color: Color.white,
                    fontWeight: 'bold',
                    marginBottom: 10,
                    fontSize: 15,
                  }}>
                  Search by memeber
                </Text>
                {searchVal == 1 ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      flex: 1,
                    }}>
                    <MaterialIcons
                      name="check-circle"
                      size={20}
                      style={{height: 20, width: 20}}
                    />
                  </View>
                ) : null}
              </View>
              <ProfileSlider ActiveColor="white" />
            </View>
          </Pressable>
          {/* Search by Date  */}
          <Pressable
            onPress={() => {
              setSearchVal(2);
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                marginTop: 25,
              }}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text
                  style={{
                    color: Color.white,
                    fontWeight: 'bold',

                    fontSize: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  Search by Date
                </Text>

                {searchVal == 2 ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      flex: 1,
                      alignItems: 'center',
                    }}>
                    <MaterialIcons
                      name="check-circle"
                      size={20}
                      style={{height: 20, width: 20}}
                    />
                  </View>
                ) : null}
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  // backgroundColor: 'black',
                  borderRadius: 10,
                }}>
                <View>
                  <DateTimeScrollablePicker
                    open={true}
                    newDate={newDate}
                    activeColor={Color.badge_bg}
                    newTime={newTime}
                    minimumDate={new Date(1980, 1, 1)}
                    handleForDate={event => {
                      setDate(event);
                      setSearchVal(2);
                    }}
                    handleForTime={event => {
                      setTime(event);
                      setSearchVal(2);
                    }}
                    txtColor="white"
                  />
                </View>
              </View>
            </View>
          </Pressable>
          {/* Search by Text  */}
          <Pressable
            onPress={() => {
              setSearchVal(3);
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                marginBottom: 10,
              }}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text
                  style={{
                    color: Color.white,
                    fontWeight: 'bold',
                    marginVertical: 25,
                    fontSize: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  Search by Text
                </Text>
                {searchVal == 3 ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      flex: 1,
                      alignItems: 'center',
                    }}>
                    <MaterialIcons
                      name="check-circle"
                      size={20}
                      style={{height: 20, width: 20}}
                    />
                  </View>
                ) : null}
              </View>
              <View
                style={{
                  padding: 5,

                  flexDirection: 'row',
                  backgroundColor: 'black',
                  borderRadius: 10,
                }}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <TextInput
                    placeholder="Enter search text ..."
                    placeholderTextColor={'rgba(255,255,255,0.5)'}
                    //  multiline={true}
                    onChangeText={e => {
                      setSearchVal(3);
                      setTxt(e);
                    }}
                  />
                </View>
              </View>
            </View>
          </Pressable>
          {/* Save and Cancel  */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <Pressable
              onPress={() => {
                setFilterModal(false);
              }}>
              <View
                style={{
                  backgroundColor: Color.more_cancel,
                  padding: 10,
                  borderRadius: 10,
                }}>
                <Text style={{fontWeight: 500, color: Color.more_buttonActive}}>
                  Cancel
                </Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                setFilterModal(false);
                // setNewDate(newDate);
                dispatch(setIsSearch(searchVal));
                if (searchVal == 2)
                  dispatch(setCurrentDate(AddTimeToDate(newDate, newTime)));
                else if (searchVal == 3) dispatch(setSearchText(txt));
                dispatch(setIsPreviousCards(false));
                dispatch(setProfileSliderView(true));
              }}>
              <View
                style={{
                  backgroundColor: Color.more_save,
                  padding: 10,
                  borderRadius: 10,
                }}>
                <Text style={{fontWeight: 500, color: Color.more_buttonActive}}>
                  Save
                </Text>
              </View>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

function CreateNewTask({addTasks}) {
  const Color = useSelector(state => state.theme).Colors;
  const styles = getStyles(Color);
  return (
    <LinearGradient
      colors={[Color.buttonLinear1, Color.buttonLinear2, Color.buttonLinear3]}
      style={[styles.add]}>
      <TouchableOpacity onPress={() => addTasks()}>
        <IconEntypo name={'plus'} size={28} color={Color.buttonlinearIcon} />
      </TouchableOpacity>
    </LinearGradient>
  );
}
function SearchDate({setSearchDate}) {
  const {t} = useTranslation();
  const obj = t('HOME');
  // console.log(obj,"IN HOME");
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const Color = useSelector(state => state.theme).Colors;
  return (
    <View
      style={{
        // width: '100%',
        backgroundColor: '#80B3FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 5,
      }}>
      <Pressable
        onPress={() => {
          setSearchDate(true);
        }}>
        <Text style={{fontSize: 20, color: Color.white}}>
          {t('Calender.Search Date')}
        </Text>
      </Pressable>
    </View>
  );
}
function SearchButton({setSearchDate}) {
  const Color = useSelector(state => state.theme).Colors;
  const styles = getStyles(Color);
  return (
    <LinearGradient
      colors={[Color.buttonLinear1, Color.buttonLinear2, Color.buttonLinear3]}
      style={styles.search}>
      <TouchableOpacity
        onPress={() => {
          setSearchDate(true);
        }}>
        <IconIonicons
          name={'search'}
          size={28}
          color={Color.buttonlinearIcon}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
}
function CalendarTextInput() {
  const [newDate, setDate] = useState(new Date());
  const [newTime, setTime] = useState(new Date());
  const [open, setOpen] = useState(false);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const Color = useSelector(state => state.theme).Colors;
  const handleForDate = event => {
    // setTimeModal(true);
    setDate(event);
    newDate.setHours(event.getHours());
    newDate.setMinutes(event.getMinutes());
    newDate.setSeconds(event.getSeconds());
  };
  const handleForTime = () => {};

  const formattedTime = newTime.toLocaleString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return (
    <View>
      <Pressable
        onPress={() => {
          setOpen(!open);
        }}
        style={{
          backgroundColor: Color.textfieldContainer,
          borderRadius: 13,
          padding: 10,
        }}>
        <Text style={{color: Color.textfield_fontBaseColor}}>
          Choose search date
        </Text>

        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>
              {newDate.getDate()} {months[newDate.getMonth()]}{' '}
              {newDate.getFullYear()} , {formattedTime}
            </Text>
          </View>
          <MaterialIcons
            name={open ? 'arrow-drop-up' : 'arrow-drop-down'}
            size={25}
          />
        </View>

        {open ? (
          <>
            <DateTimeScrollablePicker
              newDate={newDate}
              activeColor={Color.badge_bg}
              newTime={newTime}
              handleForDate={handleForDate}
              handleForTime={handleForTime}
              open={open}
              txtColor={Color.calend_txt_color1}
            />
          </>
        ) : null}
      </Pressable>
    </View>
  );
}
const OldTasksStack = () => {
  const Color = useSelector(state => state.theme).Colors;
  const navigation = useNavigation();
  const todayDate = new Date();
  const [newDate, setDate] = useState(new Date());
  const [INDEX, setIndex] = useState(0);
  const [dataFetched, setData] = useState([]);
  const [dataLength, setDataLength] = useState(10);
  const [currIndex, setCurrentIndex] = useState(0);
  const [currStep, setCurrentStep] = useState(0);
  const [searchDate, setSearchDate] = useState(false);
  const [cardHeight, setHeight] = useState(120);
  const [nextPage, setNextPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [isFilterModal, setFilterModal] = useState(false);
  const [isNext, setIsNext] = useState(true);
  const [isPrev, setIsPrev] = useState(true);
  const refCreateTask = React.useRef(null);

  const refViewTask = React.useRef(null);
  // const {t}=useTranslation();
  const ref = useRef(null);
  const snapPoints = useMemo(() => ['1%', '50%', '95%'], []);
  const cardData = [
    {
      alarm_status: '',
      colour_code: '',
      confirm_date: '',
      confirm_end_time: '',
      confirm_start_time: '',
      details: 'running helps in losing weight quickly',
      eh_grp_id: '',
      eh_sch_evnt_id: '',
      eh_user_id: '00911000000003',
      end_date: '',
      end_time: 'nan:nan:nan',
      event_by: 'user',
      event_date: '2022-11-28T00:00:00',
      event_grp_id: '',
      event_id: 544,
      event_name: 'run for 45 mins',
      event_note_data: [[Object]],
      event_occurance_data: [],
      event_occurance_id: '',
      is_never: 0,
      month: 'November',
      occurance: '',
      priority: '2',
      sch_cat_id: '',
      sch_event_id: '',
      start_date: '2022-11-28T11:45:34',
      start_time: '11:45:34',
      status: 'confirmed',
      year: 2022,
    },
  ];
  const [Prev, setPrev] = useState(false);
  const [topReached, setTopReached] = useState(false);
  const FetchEvents = async (date, page, isPrev, itemsPerPage) => {
    setLoading(true);
    try {
      const AuthToken =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjk2NTExMDc2LCJqdGkiOiI4ZGVjNGExMi1hNTcxLTRjNDEtOTRlZC05NzI3MDg1M2YyYjAiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMDkxMDAwMDAwMDA0NiIsIm5iZiI6MTY5NjUxMTA3Nn0.MYdqBgz6_-Ru8b1Mu1B8286aknzkTZ9DRyq7cVBcchM';

      const data = await axios.post(
        `https://app.evaluatehealth.world/calendar/calender/fetchEventsByDate?period=${
          isPrev ? 'previous' : 'next'
        }`,
        {},
        {
          headers: {
            Authorization: `Bearer ${AuthToken}`,
          },
          params: {
            date: moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD'),

            items_per_page: itemsPerPage,
            page: page,
          },
        },
      );

      let allEvents = data.data.event_data;
      console.log(data);
      const len = [...allEvents].length;
      setDataLength(len);
      if (!isPrev) {
        setPrev(false);
        setData(data => [...data, ...allEvents]);
        setLoading(false);
      } else {
        allEvents = allEvents.reverse();
        setPrev(true);
        setData(data => [...allEvents, ...data]);
      }
    } catch (error) {
      console.log('error while fetching data: ', error.response.status);

      if (error.response.status == 400) {
        errorToast('Sorry! No more reminders');
        console.log('ERROR CAUGHT!');
        setLoading(false);
      }
    }
  };

  const createNewTask = () => {
    // console.log('In bottom ');
    return <NewTask />;
  };
  const viewCard = () => {
    // console.log('In bottom ');
    return (
      <CardSheet refCreateTask={refCreateTask} refViewTask={refViewTask} />
    );
  };

  const addTasks = () => {
    // refCreateTask.current?.snapToIndex(1);
    refCreateTask.current?.open();
  };
  const viewSheet = () => {
    refViewTask.current.open();
  };
  const handleOnConfirm = async event => {
    setData([]);
    setNextPage(1);
    setPreviousPage(1);
    setPrev(false);
    setDataLength(0);
    setSearchDate(false);
    // setIndex(findIndex(event));
    setDate(event);
    await FetchEvents(newDate, 1, false, 100);
  };
  const YourListItem = React.memo(({item, index}) => {
    return (
      <Pressable
        onPress={() => {
          viewSheet();
        }}>
        <View
          style={{
            backgroundColor: '#F6F4EB',
            // backgroundColor:item.colour_code,
            borderRadius: 15,
            overflow: 'hidden',
            // margin: 5,
            height: cardHeight,
            marginTop: index == 0 ? 8 : 0,
            marginBottom: 8,
          }}>
          <ReminderCard
            item={item}
            key={index}
            // backgroundColor={
            //   index < currIndex
            //     ? '#7E1717'
            //     : index >= currIndex && index < currIndex + currStep
            //     ? '#B9B4C7'
            //     : '#213555'
            // }
          />
        </View>
      </Pressable>
    );
  });

  const reminders = [...data].sort((a, b) => {
    if (a.year > b.year) {
      return 1;
    } else if (a.year == b.year) {
      if (a.monthNo > b.monthNo) {
        return 1;
      } else if (a.monthNo == b.monthNo) {
        return a.day > b.day ? 1 : -1;
      } else {
        return -1;
      }
    } else {
      return -1;
    }
  });
  // Binary search Logic for finding Index
  const findIndex = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let countSteps = 0;
    let lowerBound = 0;
    let upperBound = reminders.length - 1;
    let newIndex = 0;
    let up = 0;
    while (lowerBound <= upperBound) {
      const mid = Math.floor((lowerBound + upperBound) / 2);
      const feed = reminders[mid];
      if (feed.year < year) {
        newIndex = mid + 1;
        lowerBound = mid + 1;
      } else if (feed.year === year) {
        if (feed.monthNo < month) {
          newIndex = mid + 1;
          lowerBound = mid + 1;
        } else if (feed.monthNo === month) {
          if (feed.day < day) {
            newIndex = mid + 1;
            lowerBound = mid + 1;
          } else if (feed.day === day) {
            upperBound = mid - 1;
            newIndex = mid;
            up = up + 1;
          } else {
            upperBound = mid - 1;
          }
        } else {
          upperBound = mid - 1;
        }
      } else {
        upperBound = mid - 1;
      }
      countSteps++;
    }
    lowerBound = 0;
    upperBound = reminders.length - 1;
    while (lowerBound <= upperBound) {
      const mid = Math.floor((lowerBound + upperBound) / 2);
      const feed = reminders[mid];
      if (feed.year < year) {
        lowerBound = mid + 1;
      } else if (feed.year === year) {
        if (feed.monthNo < month) {
          lowerBound = mid + 1;
        } else if (feed.monthNo === month) {
          if (feed.day < day) {
            lowerBound = mid + 1;
          } else if (feed.day === day) {
            lowerBound = mid + 1;
            up = mid;
          } else {
            upperBound = mid - 1;
          }
        } else {
          upperBound = mid - 1;
        }
      } else {
        upperBound = mid - 1;
      }
      countSteps++;
    }
    console.log(
      'In BinarySearch CountSteps=',
      countSteps,
      'Data Length=',
      reminders.length,
    );
    if (newIndex >= reminders.length) {
      alert('Enter a proper date');
      return INDEX;
    }

    if (newIndex >= 0 && newIndex < reminders.length) {
      const today = new Date();
      up = lowerBound - newIndex;
      console.log('newIND', newIndex, 'up', up, 'lb', lowerBound);
      if (
        today.getDate() === day &&
        today.getMonth() === month - 1 &&
        today.getFullYear() === year
      ) {
        setCurrentStep(lowerBound - newIndex);
      }
    }

    return newIndex;
  };

  useEffect(() => {
    const afn = () => {
      setLoading(true);
      FetchEvents(todayDate, 1, false, 100);
      setNextPage(nextPage + 1);

      FetchEvents(todayDate, 1, true, 10);

      setPreviousPage(previousPage + 1);
      setLoading(false);
    };
    if (dataFetched.length == 0) {
      afn();
    }
    // setCurrentIndex(findIndex(new Date()));
    // setIndex(findIndex(new Date()));
  }, []);
  useEffect(() => {
    FetchEvents(newDate, 1, false, 100);
  }, [newDate]);
  useEffect(() => {
    if (ref.current && Prev) {
      // const PromiseThen= new Promise(() => {
      setTimeout(() => {
        ref.current.scrollToOffset({animated: false, offset: 128 * dataLength});
        setLoading(false);
      }, 1000);
      // });
    }
  }, [dataFetched, Prev]);

  // useEffect(() => {
  //   if (cardHeight != 0)
  //     ref.current.scrollToOffset({
  //       animated: true,
  //       offset: INDEX * cardHeight + 8 * INDEX,
  //     });
  // }, [INDEX, cardHeight]);

  return (
    <View>
      {/* App Header */}
      <Header setFilterModal={setFilterModal} />

      {isLoading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#272829',
            width: '100%',
            height: 50,
            paddingVertical: 10,
          }}>
          <LottieView
            source={require('../assets/Loading3.json')}
            autoPlay
            loop={true}
            style={{width: 170, height: 90}}
          />
        </View>
      ) : null}
      <View
        style={{flex: 1, flexDirection: 'column', backgroundColor: '#272829'}}>
        <View style={{marginBottom: 110}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              paddingHorizontal: 10,
            }}>
            {/* Render Reminder Cards  */}

            <FlatList
              data={dataFetched}
              ref={ref}
              refreshing={true}
              showsVerticalScrollIndicator={false}
              onEndReached={event => {
                setNextPage(nextPage + 1);
                setPrev(false);
                FetchEvents(newDate, nextPage + 1, false, 100);
                console.log('END');
              }}
              initialScrollIndex={0}
              onEndReachedThreshold={0.5}
              onScroll={event => {
                const yOffset = event.nativeEvent.contentOffset.y;
                const threshold = 1;
                // console.log(yOffset);

                if (yOffset < threshold && !topReached) {
                  // console.log('FlatList top reached!');

                  setPreviousPage(previousPage + 1);
                  setPrev(true);
                  FetchEvents(newDate, previousPage, true, 20);
                  setTopReached(true);
                } else if (yOffset >= threshold && topReached) {
                  setTopReached(false);
                }
              }}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return <YourListItem item={item} index={index} key={index} />;
              }}
            />
          </View>
          <View>
            {/* Search Date */}
            {/* <SearchDate setSearchDate={setSearchDate} /> */}
            <SearchButton setSearchDate={setSearchDate} />
            {/* Add Button  */}
          </View>
        </View>

        <DatePicker
          modal
          mode="date"
          open={searchDate}
          date={newDate}
          onConfirm={handleOnConfirm}
          onCancel={() => {
            setSearchDate(false);
          }}
        />

        <HandleBottomSheet
          dragFromTop={true}
          containerStyle={{backgroundColor: Color.calen_card_bg}}
          bottomSheetRef={refCreateTask}
          content={createNewTask()}
          // height={HEIGHT}
          draggableIcon={{backgroundColor: Color.WHITE, width: 100}}
        />
        <HandleBottomSheet
          dragFromTop={true}
          containerStyle={{backgroundColor: Color.calen_card_bg}}
          bottomSheetRef={refViewTask}
          content={viewCard()}
          // height={HEIGHT}
          draggableIcon={{backgroundColor: Color.WHITE, width: 100}}
        />
        <Modal visible={isFilterModal} transparent>
          <SearchComponent
            setFilterModal={setFilterModal}
            // setNewDate={setDate}
          />
        </Modal>
      </View>

      {/* <Bottomsheet
          ref={refCreateTask}
          contentContainerStyle={{backgroundColor: Color.calen_card_bg}}
          // containerHeight={HEIGHT}
          handleStyle={{backgroundColor: Color.calen_card_bg,margin:0}}
          handleIndicatorStyle={{backgroundColor:'black'}}
         
          backgroundStyle={{color:'black'}}
          snapPoints={snapPoints}
          index={2}
          onChange={() => {}}>
           
          <ScrollView
           horizontal={false}
             scrollEnabled={true}
             showsVerticalScrollIndicator={false}
             nestedScrollEnabled={true}
          >
          <NewTask />
          </ScrollView>
        
        </Bottomsheet> */}
    </View>
  );
};
export default TasksStack;

const getStyles = Color => {
  const styles = StyleSheet.create({
    add: {
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
      shadowColor: Color.buttonLinear1,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.8,
      shadowRadius: 8.62,
      elevation: 10,
      position: 'absolute',
      bottom: 100,
      right: 15,
      zIndex: 999,
      // backgroundColor: "#279AC6",
    },
    search: {
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
      shadowColor: Color.buttonLinear1,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.8,
      shadowRadius: 8.62,
      elevation: 10,
      position: 'absolute',
      bottom: 190,
      right: 15,
      zIndex: 999,
      // backgroundColor: "#279AC6",
    },
  });
  return styles;
};
// Find Index Logic in Linear Search

// const findIndex = date => {
//   const year = date.getFullYear();
//   const month = date.getMonth() + 1;
//   const day = date.getDate();
//   let countSteps=0;
//   let upperBound = 0;
//   let newIndex = 0;
//   {
//     reminders.map((feed, index) => {
//       if (feed.year < year) {
//         newIndex = newIndex + 1;
//       } else if (feed.year == year) {
//         if (feed.monthNo < month) {
//           newIndex = newIndex + 1;
//         } else if (feed.monthNo == month) {
//           if (feed.day < day) {
//             newIndex = newIndex + 1;
//           } else if (feed.day == day) {
//             upperBound = upperBound + 1;
//           }
//         }
//       }
//       countSteps++;
//     });
//   }
//   if (
//     today.getDate() == date.getDate() &&
//     today.getMonth() == date.getMonth() &&
//     today.getFullYear() == date.getFullYear()
//   ) {
//     console.log('in today',data.length);
//     setCurrentStep(upperBound);
//   }
//   if (newIndex >= reminders.length) {
//     alert('Enter proper date');
//     return 0;
//   }
//   return newIndex;
// };
