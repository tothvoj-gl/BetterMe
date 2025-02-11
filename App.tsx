/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  createStaticNavigation,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {Image} from 'react-native';
import {FinanceScreen} from './src/screens/finance/finance-screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProfileScreen} from './src/screens/profile-screen';
import {pallette} from './src/ui/colors';

function App(): React.JSX.Element {
  const HomeTabs = createBottomTabNavigator({
    screens: {
      Finance: {
        screen: FinanceScreen,
        options: {
          tabBarIcon: ({focused}) => {
            const icon = focused
              ? require('./chart_active.png')
              : require('./chart.png');
            return <Image source={icon} style={{height: 24, width: 24}} />;
          },
        },
      },
      Profile: {
        screen: ProfileScreen,
        options: {
          tabBarIcon: ({focused}) => {
            const icon = focused
              ? require('./profile_active.png')
              : require('./profile.png');
            return <Image source={icon} style={{height: 24, width: 24}} />;
          },
        },
      },
    },
    screenOptions: {
      tabBarActiveTintColor: pallette.primary900,
    },
  });

  const RootStack = createNativeStackNavigator({
    screens: {
      Home: {
        screen: HomeTabs,
        options: {
          headerShown: false,
        },
      },
    },
  });

  const Navigation = createStaticNavigation(RootStack);

  return <Navigation></Navigation>;
}

export default App;
