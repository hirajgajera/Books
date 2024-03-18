import React from 'react';
import MainScreen from '../src/screens/MainScreen';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect'; // Extend expect with custom matchers for React Native

jest.mock('../src/common', () => ({
  windowWidth: 360,
  windowHeight: 640,
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({works: [{id: 1, title: 'Book 1'}]}),
  }),
);

describe('MainScreen', () => {
  test('renders search input', () => {
    const {getByPlaceholderText} = render(<MainScreen />);
    expect(getByPlaceholderText('Search book by title')).toBeTruthy();
  });

  test('calls searchBook function when typing in search input', async () => {
    const {getByPlaceholderText} = render(<MainScreen />);
    const searchInput = getByPlaceholderText('Search book by title');
    fireEvent.changeText(searchInput, 'Harry Potter');
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
  });
});
