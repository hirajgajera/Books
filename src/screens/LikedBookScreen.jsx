// In LikedBooksScreen.js
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import BookList from './BookList';

const LikedBooksScreen = () => {
  const navigation = useNavigation();

  //defining states
  const [likedBooks, setLikedBooks] = useState(null);

  // Use useFocusEffect to refetch data when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchLikedBooks();
    }, []),
  );

  //fetch all the liked books from localStorage
  const fetchLikedBooks = async () => {
    try {
      const likedBookKeys = await AsyncStorage.getAllKeys();
      const filteredLikedBookKeys = likedBookKeys.filter(key =>
        key.startsWith('like_'),
      );
      const likedBooksData = await AsyncStorage.multiGet(filteredLikedBookKeys);
      const parsedLikedBooks = likedBooksData.map(item => JSON.parse(item[1]));

      setLikedBooks(parsedLikedBooks);
    } catch (error) {
      console.error('Error fetching liked books:', error);
    }
  };

  //navigate to book detail screen
  const onCardClick = (res, bookDetail) => {
    navigation.navigate('BookDetails', {bookDetail});
  };

  return (
    <View style={styles.container}>
      <BookList data={likedBooks} onCardClick={onCardClick} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default LikedBooksScreen;
