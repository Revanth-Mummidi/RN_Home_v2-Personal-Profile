import React, { useEffect, useState } from 'react';
import { View, Text, SectionList, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Contacts from 'react-native-contacts';

const CustomCheckBox = ({ label, selected, onToggle }) => {
  const handleToggle = () => {
    onToggle(!selected);
  };

  return (
    <TouchableOpacity onPress={handleToggle}>
      <View style={stylesss.checkboxContainer}>
        <View
          style={[
            stylesss.checkbox,
            { backgroundColor: selected ? '#007AFF' : 'transparent' },
          ]}
        >
          {selected && <Text style={stylesss.checkmark}>✓</Text>}
        </View>
        <Text>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ContactListScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    Contacts.getAll()
      .then(allContacts => {
        const contactDict = {};

        allContacts.forEach(contact => {
          if (contact.givenName != null) {
            const firstLetter = contact.givenName.charAt(0).toUpperCase();

            if (!contactDict[firstLetter]) {
              contactDict[firstLetter] = [];
            }

            contactDict[firstLetter].push(contact);
          }
        });

        const contactSections = Object.keys(contactDict).map(letter => ({
          title: letter,
          data: contactDict[letter],
        }));

        contactSections.sort((a, b) => a.title.localeCompare(b.title));

        setContacts(contactSections);
      })
      .catch(error => console.error(error));

      console.log(contacts)
  }, []);

  const toggleItemSelection = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const filteredContacts = contacts.map(section => ({
    ...section,
    data: section.data.filter(contact =>
      contact.givenName.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  const renderContact = ({ item }) => (
    <View style={stylesss.contactItem}>
      <CustomCheckBox
        label={item.givenName}
        selected={selectedItems.includes(item)}
        onToggle={() => toggleItemSelection(item)}
      />
    </View>
  );

  const renderSectionHeader = ({ section }) => (
    <View style={stylesss.sectionHeader}>
      <Text style={stylesss.sectionHeaderText}>{section.title}</Text>
    </View>
  );

  return (
    <View style={stylesss.container}>
      <TextInput
        style={stylesss.searchInput}
        placeholder="Search contacts"
        onChangeText={text => setSearchQuery(text)}
        value={searchQuery}
      />
      <SectionList
        sections={filteredContacts}
        renderItem={renderContact}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const stylesss = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    top:20,
    height:100
  },
  contactItem: {
    padding: 16,
  },
  sectionHeader: {
    backgroundColor: '#e0e0e0',
    padding: 8,
  },
  sectionHeaderText: {
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#007AFF',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: 'white',
  },
});

export default ContactListScreen;
