import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function useFetchData(bookDetail) {
  const [book, setBook] = useState(null);
  const [bookAuthor, setBookAuthor] = useState(null);

  useEffect(() => {
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

    fetchBookAuthor(bookDetail);
    setBook(bookDetail);

    // Check if book is liked
    checkLikeStatus(bookDetail?.key);
    // Get review for the book
    getBookReview(bookDetail?.key);
  }, [bookDetail]);

  return book;
}
