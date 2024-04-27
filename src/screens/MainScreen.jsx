import React, {useState, useEffect, useRef} from 'react';
import {View, TextInput, StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Device from 'react-native-device-info';

import BookList from './BookList';
import useDeviceOrientation from '../hooks/useDeviceOrientation';

const MainScreen = () => {
  const isTablet = Device.isTablet();

  const navigation = useNavigation();
  const {height, width, isPortrait} = useDeviceOrientation();
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const pageNumber = useRef(0);
  const fetchType = useRef('initialList');

  //side effects
  useEffect(() => {
    getData(
      'https://openlibrary.org/subjects/sci-fi.json?details=true&limit=15&offset=0',
      'initialList',
    );
  }, []);

  //getting data (all and liked)
  const getData = async (url, purpose) => {
    const resp = await fetch(url);
    const respData = await resp.json();

    if (purpose === 'initialList') {
      if (respData.works.length) {
        setData(prevData => [...prevData, ...respData.works]);
      }
    } else {
      if (respData.docs.length) {
        setData(prevData => [...prevData, ...respData.docs]);
      }
    }
  };

  //search a book
  const searchBook = bookTitle => {
    console.log(bookTitle.length);
    if (bookTitle.length > 3) {
      if (fetchType.current !== 'search') {
        fetchType.current = 'search';
        pageNumber.current = 0;
      }
      if (bookTitle !== searchValue) {
        setData([]);
        setSearchValue(bookTitle);
      }
      getData(
        `https://openlibrary.org/search.json?title=${bookTitle}&limit=15&offset=${pageNumber.current}`,
        'search',
      );
    }
    if (bookTitle.length === 0) {
      setData([]);
      getData(
        'https://openlibrary.org/subjects/sci-fi.json?details=true&limit=15&offset=0',
        'initialList',
      );
      fetchType.current = 'initialList';
      pageNumber.current = 0;
    }
  };

  const fetchMoreData = () => {
    // console.log('pageNumber.current', pageNumber.current);
    pageNumber.current = pageNumber.current + 15;
    if (fetchType.current === 'initialList') {
      getData(
        `https://openlibrary.org/subjects/sci-fi.json?details=true&limit=15&offset=${pageNumber.current}`,
        'initialList',
      );
    } else {
      searchBook(searchValue);
    }
  };

  //navigate to details screen
  const onCardClick = (res, bookDetail) => {
    navigation.navigate('Book Details', {bookDetail});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.searchContainer,
          {
            width: width / 1.1,
            height: !isPortrait || isTablet ? height / 10 : height / 20,
          },
        ]}>
        <TextInput
          onChangeText={searchBook}
          placeholder="Search book by title"
          style={styles.input}
        />
      </View>
      <BookList
        data={data}
        onCardClick={onCardClick}
        fetchMoreData={fetchMoreData}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  searchContainer: {
    backgroundColor: 'lightgrey',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  input: {
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
