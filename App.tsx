import {
  createStaticNavigation,
  NavigationContainer,
  NavigationProp,
  StaticParamList,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Image} from 'react-native';
import {FinanceScreen} from './src/screens/finance/finance-screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProfileScreen} from './src/screens/profile-screen';
import {pallette} from './src/util/colors';
import {StyleSheet} from 'react-native-unistyles';
import {AddFinanceInfoScreen} from './src/screens/finance/add-finance-info-screen';
import {QueryClient} from '@tanstack/react-query';

const styles = StyleSheet.create({
  tabIcon: {
    height: 24,
    width: 24,
  },
});

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Finance: undefined;
};

// Create a client
const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const Tab = createBottomTabNavigator();

  function HomeTabs() {
    return (
      <Tab.Navigator
        screenOptions={{tabBarActiveTintColor: pallette.primary900}}>
        <Tab.Screen
          name="Finance"
          component={FinanceScreen}
          options={{
            tabBarIcon: ({focused}) => {
              const icon = focused
                ? require('./chart_active.png')
                : require('./chart.png');
              return <Image source={icon} style={styles.tabIcon} />;
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({focused}) => {
              const icon = focused
                ? require('./profile_active.png')
                : require('./profile.png');
              return <Image source={icon} style={styles.tabIcon} />;
            },
          }}
        />
      </Tab.Navigator>
    );
  }

  const Stack = createNativeStackNavigator();

  function RootStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen name="AddFinanceInfo" component={AddFinanceInfoScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
