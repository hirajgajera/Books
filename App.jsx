import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MainScreen from './src/screens/MainScreen';
import LikedBooksScreen from './src/screens/LikedBookScreen';
import BookDetail from './src/screens/BookDetail';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'AllBooks') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Liked Books') {
            iconName = focused ? 'heart' : 'heart-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="AllBooks"
        component={MainScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Liked Books" component={LikedBooksScreen} />
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
        <Stack.Screen name="Book Details" component={BookDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
