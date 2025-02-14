import { StyleSheet as mockStylesheet} from 'react-native';
/* eslint-env jest */
jest.mock('react-native-unistyles', () => {
    return {
        StyleSheet: mockStylesheet,
    };
  });
