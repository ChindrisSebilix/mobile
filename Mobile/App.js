/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import HomeScreen from './screens/home-screen.js'
import AddScreen from './screens/add-screen.js'
import ClerkScreen from './screens/clerk-screen'

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Add: {screen: AddScreen},
  Clerk : {screen: ClerkScreen}
});

const App = createAppContainer(MainNavigator);


export default App;
