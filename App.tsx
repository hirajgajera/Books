import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import MainScreen from './src/screens/MainScreen';
import LikedBooksScreen from './src/screens/LikedBookScreen';
import BookDetail from './src/screens/BookDetail';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="AllBooks" component={MainScreen} />
      <Tab.Screen name="LikedBooks" component={LikedBooksScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MainTabScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="BookDetails" component={BookDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
