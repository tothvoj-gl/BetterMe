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
