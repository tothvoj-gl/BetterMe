import { StyleSheet as mockStylesheet} from 'react-native';
/* eslint-env jest */
jest.mock('react-native-unistyles', () => {
    return {
        StyleSheet: {...mockStylesheet, create: ()=> {return {...mockStylesheet.create(), useVariants: jest.fn()};}},
    };
  });

  jest.mock('@react-native-firebase/firestore', () => {
    return {
        settings: jest.fn(),
        documentSet: jest.fn(),
    };
  });

  jest.mock('react-native-localize', () => ({
    getCountry: () => 'US',
    getLocales: jest.fn(() => [{languageTag:'en-US'}]),
  }));

  jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
  );

  jest.mock('@react-native-firebase/crashlytics', () => {
    return jest.fn(() => ({
      log: jest.fn(),
      recordError: jest.fn(),
      crash: jest.fn(),
      setUserId: jest.fn(),
      setAttribute: jest.fn(),
      setAttributes: jest.fn(),
      setCrashlyticsCollectionEnabled: jest.fn(),
    }));
  });

  jest.mock('@react-native-firebase/auth', () => {
    return jest.fn(() => ({
      signInWithEmailAndPassword: jest.fn(),
      createUserWithEmailAndPassword: jest.fn(),
      signOut: jest.fn(),
      onAuthStateChanged: jest.fn(),
      currentUser: {
        uid: 'test-user-123',
        email: 'test@example.com',
      },
    }));
  });

  jest.mock('@react-native-firebase/remote-config', () => {
    return jest.fn(() => ({
      getValue: jest.fn((key) => ({
        asString: () => {
          return '';
        },
        asBoolean: () => false,
        asNumber: () => 0,
      })),
      setDefaults: jest.fn(),
      fetch: jest.fn().mockResolvedValue(undefined),
      activate: jest.fn().mockResolvedValue(true),
      fetchAndActivate: jest.fn().mockResolvedValue(true),
    }));
  });


jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      setOptions: jest.fn(),
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
  };
});



