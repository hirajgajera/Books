import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {windowWidth, windowHeight} from '../common';

const BookDetailsScreen = ({route}) => {
  const {bookDetail} = route.params; // Extract book details from route params

  // define states
  const [book, setBook] = useState(null);
  const [bookAuthor, setBookAuthor] = useState(null);
  const [liked, setLiked] = useState(false);
  const [review, setReview] = useState('');

  // side effects
  useEffect(() => {
    fetchBookAuthor(bookDetail);
    setBook(bookDetail);

    // Check if book is liked
    checkLikeStatus(bookDetail?.key);
    // Get review for the book
    getBookReview(bookDetail?.key);
  }, [bookDetail]);

  //get author of the book
  const fetchBookAuthor = book => {
    let authors = [];
    if (book?.authors?.length) {
      book.authors.forEach(author => {
        authors.push(author.name);
      });
    } else if (book?.author_name?.length) {
      authors = book.author_name;
    }

    setBookAuthor(authors);
  };

  //liking and saving the book
  const saveLike = async (bookId, bookDetails) => {
    try {
      await AsyncStorage.setItem(`like_${bookId}`, JSON.stringify(bookDetails));
      setLiked(true);
    } catch (error) {
      console.error('Error saving like:', error);
    }
  };

  //unliking and unsaving the book
  const removeLike = async bookId => {
    try {
      await AsyncStorage.removeItem(`like_${bookId}`);
      setLiked(false); // Update the state to reflect unliking
    } catch (error) {
      console.error('Error removing like:', error);
    }
  };

  //check if book is liked by the user
  const checkLikeStatus = async bookId => {
    try {
      const bookDetailsString = await AsyncStorage.getItem(`like_${bookId}`);
      if (bookDetailsString) {
        const bookDetails = JSON.parse(bookDetailsString);
        setLiked(true);
      } else {
        setLiked(false);
      }
    } catch (error) {
      console.error('Error getting like status:', error);
    }
  };

  //save the book review
  const saveReview = async (bookId, review) => {
    try {
      await AsyncStorage.setItem(`review_${bookId}`, review);
    } catch (error) {
      console.error('Error saving review:', error);
    }
  };

  //get the book review
  const getBookReview = async bookId => {
    try {
      const savedReview = await AsyncStorage.getItem(`review_${bookId}`);
      if (savedReview) {
        setReview(savedReview);
      }
    } catch (error) {
      console.error('Error getting review:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {book && (
        <View style={styles.viewWrapper}>
          <Text style={styles.titleText}>{book.title}</Text>
          <Image
            style={styles.imageStyle}
            source={{
              uri: `https://covers.openlibrary.org/b/id/${
                book.cover_id || book.cover_i
              }-L.jpg`,
            }}
          />
          <Text style={styles.titleText}>
            First Published: {book.first_publish_year}
          </Text>

          <Text style={styles.titleText}>Authors</Text>
          {bookAuthor &&
            bookAuthor.map((author, index) => (
              <Text key={index} style={styles.modalText}>
                {author}
              </Text>
            ))}

          {/* Like Button */}
          <TouchableOpacity
            style={[styles.button, styles.buttonLike]}
            onPress={() => {
              liked ? removeLike(book.key) : saveLike(book.key, book);
            }}>
            <Text style={styles.textStyle}>{liked ? 'Unlike' : 'Like'}</Text>
          </TouchableOpacity>

          {/* Review Input */}
          <TextInput
            style={styles.input}
            placeholder="Add Review"
            onChangeText={text => setReview(text)}
            value={review}
          />
          <TouchableOpacity
            style={[styles.button, styles.buttonReview]}
            onPress={() => saveReview(book.key, review)}>
            <Text style={styles.textStyle}>Save Review</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  viewWrapper: {
    width: windowWidth / 1.2,
    height: windowHeight / 1.2,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
  },
  imageStyle: {
    width: windowWidth / 1.5,
    height: windowHeight / 3,
    marginBottom: 15,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 5,
  },
  buttonLike: {
    backgroundColor: '#4CAF50',
  },
  buttonReview: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    marginBottom: 15,
    width: windowWidth / 1.4,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default BookDetailsScreen;
