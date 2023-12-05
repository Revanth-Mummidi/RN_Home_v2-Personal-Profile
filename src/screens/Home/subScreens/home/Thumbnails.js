import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Pressable } from 'react-native';
import { Color } from '../../../../themes';
import { useNavigation } from '@react-navigation/native';
const ThumbnailGrid = () => {
    const navigation = useNavigation();
    const data = [
        { id: '1', category: 'Posts', image: 'https://marketplace.canva.com/EAE4ENZwprM/2/0/1600w/canva-white-minimalist-eat-well-healthy-food-nutrition-instagram-post-ZGiShTl7W78.jpg' },
        { id: '2', category: 'Doctor', image: 'https://www.sehat.com/sht-new-img/new/doctor.png' },
        { id: '3', category: 'Hospital/ Clinic', image: 'https://picsum.photos/id/7/367/267' },
        { id: '4', category: 'Tips', image: 'https://picsum.photos/id/10/367/267' },
        { id: '5', category: 'Diets', image: 'https://picsum.photos/id/11/367/267' },
        { id: '6', category: 'Videos', image: 'https://picsum.photos/id/14/367/267' },
    ];

    const renderThumbnail = ({ item }) => (
        <Pressable onPress={() => navigation.navigate('BookmarkPage')}>
        <View style={styles.thumbnailContainer}>
            <Image source={{ uri: item.image }} style={styles.thumbnailImage} />
            <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        </Pressable>
    );

    const renderRow = ({ item, index }) => {
        if (index % 2 === 0) {
            return (
                <View style={styles.rowContainer}>
                    {renderThumbnail({ item })}
                    {index < data.length - 1 && renderThumbnail({ item: data[index + 1] })}
                </View>
            );
        }
        return null;
    };

    return (
        <>

            <View style={{ backgroundColor: Color.mildBlue, height: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row',marginTop: 32 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: Color.white }}>Bookmarks</Text>
            </View>
            <View style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={renderRow}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.contentContainer}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    contentContainer: {
        paddingBottom: 8,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    thumbnailContainer: {
        flex: 1,
        alignItems: 'center',
    },
    thumbnailImage: {
        width: 175,
        height: 175,
        borderRadius: 10,
    },
    categoryText: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
    },
});

export default ThumbnailGrid;
