import React, {useState, useEffect} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import BookList from './BookList';
import {windowWidth, windowHeight} from '../common';

const MainScreen = () => {
  const navigation = useNavigation();

  //define states
  const [data, setData] = useState(null);

  //side effects
  useEffect(() => {
    getData(
      'https://openlibrary.org/subjects/sci-fi.json?details=true',
      'initialList',
    );
  }, []);

  //getting data (all and liked)
  const getData = async (url, purpose) => {
    const resp = await fetch(url);
    const data = await resp.json();

    if (purpose === 'initialList') {
      if (data.works.length) setData(data.works);
    } else {
      if (data.docs.length) setData(data.docs);
    }
  };

  //search a book
  const searchBook = bookTitle => {
    if (bookTitle.length > 3) {
      getData(
        `https://openlibrary.org/search.json?title=${bookTitle}`,
        'search',
      );
    }
  };

  //navigate to details screen
  const onCardClick = (res, bookDetail) => {
    navigation.navigate('BookDetails', {bookDetail});
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapperContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            onChangeText={searchBook}
            placeholder="Search book by title"
            style={styles.input}
          />
        </View>
      </View>
      <BookList data={data} onCardClick={onCardClick} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapperContainer: {justifyContent: 'center', alignItems: 'center'},
  searchContainer: {
    width: windowWidth / 1.2,
    height: windowHeight / 15,
    backgroundColor: 'lightgrey',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  input: {
    width: windowWidth / 1.3,
    height: windowHeight / 20,
    margin: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#2196F3',
  },
});

export default MainScreen;
