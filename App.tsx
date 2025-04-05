import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Image, View} from 'react-native';
import {FinanceScreen} from './src/screens/finance/FinanceScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ProfileScreen} from './src/screens/profile/ProfileScreen';
import {pallette} from './src/util/colors';
import {StyleSheet} from 'react-native-unistyles';

import {AddFinanceInfoScreen} from './src/screens/addFinanceInfo/AddFinanceInfoScreen';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {LoginScreen} from './src/screens/login/LoginScreen';
import {
  useCurrentUser,
  useSubscribeToUserChanges,
} from './src/api/auth/useAuth';
import {useFetchRemoteConfig} from './src/api/remoteConfig';
import {LoadingSpinner} from './src/components/LoadingSpinner';
import {RegisterScreen} from './src/screens/login/RegisterScreen';
import {useTranslation} from 'react-i18next';

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: 'center',
  },
  tabIcon: {
    height: 24,
    width: 24,
  },
});

const activeChartIcon = require('./chart_active.png');
const chartIcon = require('./chart.png');
const activeProfileIcon = require('./profile_active.png');
const profileIcon = require('./profile.png');

// Create a client
const queryClient = new QueryClient();

function TabBarIcon(icon: any) {
  return <Image source={icon} style={styles.tabIcon} />;
}

const Tab = createBottomTabNavigator();
function HomeTabs() {
  const {t} = useTranslation('screenNames');
  return (
    <Tab.Navigator screenOptions={{tabBarActiveTintColor: pallette.primary900}}>
      <Tab.Screen
        name={t('Finance')}
        component={FinanceScreen}
        options={{
          tabBarIcon: ({focused}) => {
            const icon = focused ? activeChartIcon : chartIcon;
            return TabBarIcon(icon);
          },
        }}
      />
      <Tab.Screen
        name={t('Profile')}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => {
            const icon = focused ? activeProfileIcon : profileIcon;
            return TabBarIcon(icon);
          },
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();
function RootStack() {
  useFetchRemoteConfig();
  useSubscribeToUserChanges();

  const {isPending, data: user} = useCurrentUser();

  if (isPending) {
    return (
      <View style={styles.splash}>
        <LoadingSpinner />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {!user ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddFinanceInfo"
            component={AddFinanceInfoScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
