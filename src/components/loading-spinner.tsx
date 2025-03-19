import {ActivityIndicator, View} from 'react-native';
import {pallette} from '../util/colors';
import {StyleSheet} from 'react-native-unistyles';

const styles = StyleSheet.create(() => ({
  container: {},
}));

export const LoadingSpinner = () => (
  <View style={styles.container} testID="loading-indicator">
    <ActivityIndicator size="large" color={pallette.secondary900} />
  </View>
);
