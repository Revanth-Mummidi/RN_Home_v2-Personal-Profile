import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScreenHeader } from '../../_components';
// Dummy data
const notifications = [
  {
    id: '1',
    title: 'New Message',
    message: 'You have received a new message from John Doe',
    timestamp: '2 hours ago',
    type: 'message',
  },
  {
    id: '2',
    title: 'Reminder',
    message: "Don't forget to submit your assignment by tomorrow",
    timestamp: '1 day ago',
    type: 'reminder',
  },
  {
    id: '3',
    title: 'Meeting Invitation',
    message: 'You have been invited to a meeting at 3 PM',
    timestamp: '3 days ago',
    type: 'invitation',
  },
];
const Header = () => {
  return (
    <View style={[styles.headerContainer, { backgroundColor: '#279AC6' }]}>
      <Text style={styles.headerText}>Notifications</Text>
      <Icon name="bell" size={24} color="white" />
    </View>
  );
};


const NotificationPage = () => {
  const [data, setData] = useState(notifications);

  const dismissNotification = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const renderNotification = ({ item }) => {
    let notificationStyle, titleStyle, messageStyle;
    switch (item.type) {
      case 'message':
        notificationStyle = styles.messageNotification;
        titleStyle = styles.messageTitle;
        messageStyle = styles.messageMessage;
        break;
      case 'reminder':
        notificationStyle = styles.reminderNotification;
        titleStyle = styles.reminderTitle;
        messageStyle = styles.reminderMessage;
        break;
      case 'invitation':
        notificationStyle = styles.invitationNotification;
        titleStyle = styles.invitationTitle;
        messageStyle = styles.invitationMessage;
        break;
      default:
        notificationStyle = styles.defaultNotification;
        titleStyle = styles.defaultTitle;
        messageStyle = styles.defaultMessage;
    }

    return (
      <View style={[styles.notificationContainer, notificationStyle]}>
        <View style={styles.notificationContent}>
          <Text style={[styles.title, titleStyle]}>{item.title}</Text>
          <Text style={[styles.message, messageStyle]}>{item.message}</Text>
          <Text style={[styles.timestamp, messageStyle]}>{item.timestamp}</Text>
        </View>
        <TouchableOpacity
          style={styles.dismissButton}
          onPress={() => dismissNotification(item.id)}
        >
          <Icon name="close" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
    <ScreenHeader name={'Notification Screen'} />
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 40, // Add margin to the top of the page
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  defaultNotification: {
    backgroundColor: '#e5e5e5',
  },
  messageNotification: {
    backgroundColor: '#b5dffb',
  },
  reminderNotification: {
    backgroundColor: '#ffe08d',
  },
  invitationNotification: {
    backgroundColor: '#f7c4dd',
  },
  notificationContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  defaultTitle: {
    color: '#333',
  },
  messageTitle: {
    color: '#004080',
  },
  reminderTitle: {
    color: '#b36b00',
  },
  invitationTitle: {
    color: '#800040',
  },
  message: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  defaultMessage: {
    color: '#333',
  },
  messageMessage: {
    color: '#004080',
  },
  reminderMessage: {
    color: '#b36b00',
  },
  invitationMessage: {
    color: '#800040',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 8,
  },
  dismissButton: {
    padding: 8,
  },
});

export default NotificationPage;
