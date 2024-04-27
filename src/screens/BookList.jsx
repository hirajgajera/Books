import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  LayoutAnimation,
} from 'react-native';
import Device from 'react-native-device-info';

import {windowWidth, windowHeight} from '../common';
import useDeviceOrientation from '../hooks/useDeviceOrientation';

const BookList = ({data, onCardClick, fetchMoreData}) => {
  // Device type checker
  const isTablet = Device.isTablet();

  const [colNum, setColNum] = useState(2);
  const {width, height, isPortrait} = useDeviceOrientation();

  useEffect(() => {
    if (!isPortrait || isTablet) {
      setColNum(3);
    } else {
      setColNum(2);
    }
  }, [isPortrait, isTablet]);

  // Calculate the item width based on the number of columns
  const itemWidth = width / colNum - 2 * 15; // Subtracting margins

  // Calculate the item height based on the device orientation
  let itemHeight = height / 4.5; // Default height for portrait mode
  if (!isPortrait || isTablet) {
    itemHeight = height / 2.5; // Adjusted height for landscape mode
  }

  //render an item
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        onCardClick(true, item);
      }}
      style={[styles.item, {width: itemWidth, height: itemHeight}]}>
      <Image
        style={[
          styles.imageStyle,
          {
            width: !isPortrait || isTablet ? width / 5 : width / 3,
            height: !isPortrait || isTablet ? height / 6 : height / 10,
          },
        ]}
        source={{
          uri: `https://covers.openlibrary.org/b/id/${
            item.cover_id || item.cover_i
          }-L.jpg`,
        }}
      />
      <View style={styles.bookDetails}>
        <Text
          numberOfLines={colNum}
          ellipsizeMode="tail"
          style={[
            styles.titleText,
            {
              width: !isPortrait || isTablet ? width / 5 : width / 3,
              height: !isPortrait || isTablet ? height / 12 : height / 30,
            },
          ]}>
          {item.title}
        </Text>
        <Text> {item?.first_publish_year} </Text>
      </View>
    </TouchableOpacity>
  );

  //end of the list component
  const EndOfList = () => (
    <View style={styles.endList}>
      <Text>That's All!</Text>
    </View>
  );

  //no data
  const NoData = () => (
    <View>
      <Text>No Data!</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {data?.length ? (
        <FlatList
          key={`flatList${colNum}`}
          style={styles.flatlist}
          data={data}
          numColumns={colNum}
          renderItem={renderItem}
          onEndReached={fetchMoreData}
          onEndReachedThreshold={0.7}
          ListFooterComponent={EndOfList}
          ListFooterComponentStyle={{
            height: windowHeight / 20,
          }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <NoData />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  flatlist: {
    width: windowWidth,
  },
  imageStyle: {
    marginBottom: 15,
  },
  bookDetails: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  titleText: {
    textAlign: 'center',
  },
  item: {
    backgroundColor: 'lightblue',
    borderRadius: 10,
    margin: 15,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  endList: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default BookList;
