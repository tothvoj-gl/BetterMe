import { StyleSheet as mockStylesheet} from "react-native";

jest.mock('react-native-unistyles', () => {
    return {
        StyleSheet: mockStylesheet,
    };
  });