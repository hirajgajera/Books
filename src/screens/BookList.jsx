import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';

import {windowWidth, windowHeight} from '../common';

const BookList = ({data, onCardClick}) => {
  //render an item
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        onCardClick(true, item);
      }}
      style={styles.item}>
      <Image
        style={styles.imageStyle}
        source={{
          uri: `https://covers.openlibrary.org/b/id/${
            item.cover_id || item.cover_i
          }-L.jpg`,
        }}
      />
      <View style={styles.bookDetails}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.titleText}>
          {item.title}
        </Text>
        <Text> {item?.first_publish_year} </Text>
      </View>
    </TouchableOpacity>
  );

  //item seperator
  const ItemSeparator = () => <View style={styles.seperator} />;

  //end of the list component
  const EndOfList = () => (
    <View style={styles.endList}>
      <Text>That's All!</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        ListFooterComponent={EndOfList}
        ListFooterComponentStyle={{height: windowHeight / 20}}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',  
  },
  imageStyle: {
    width: windowWidth / 5,
    height: windowHeight / 22,
    marginBottom: 15,
  },
  bookDetails: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  titleText: {
    width: windowWidth / 1.7,
  },
  item: {
    width: windowWidth / 2.5,
    height: windowHeight / 18,
    backgroundColor: 'lightblue',
    borderRadius: 10,
    padding: 5,
    flexDirection: 'row',
  },
  seperator: {
    margin: 10,
  },
  endList: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BookList;