import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Image} from 'react-native';
import {FinanceScreen} from './src/screens/finance/finance-screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProfileScreen} from './src/screens/profile-screen';
import {pallette} from './src/ui/colors';
import {StyleSheet} from 'react-native-unistyles';
import {AddFinanceInfoScreen} from './src/screens/finance/add-finance-info-screen';

const styles = StyleSheet.create({
  tabIcon: {
    height: 24,
    width: 24,
  },
});

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
            return <Image source={icon} style={styles.tabIcon} />;
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
            return <Image source={icon} style={styles.tabIcon} />;
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
      AddFinanceInfo: {
        screen: AddFinanceInfoScreen,
        options: {
          headerShown: false,
        },
      },
    },
  });

  const Navigation = createStaticNavigation(RootStack);

  return <Navigation />;
}

export default App;
