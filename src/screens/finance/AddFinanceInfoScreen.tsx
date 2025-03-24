import {Text, View} from 'react-native';
import {AppButton} from '../../components/AppButton';
import {StyleSheet} from 'react-native-unistyles';
import {SafeAreaView} from 'react-native-safe-area-context';

const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    alignSelf: 'flex-end',
    width: '100%',
  },
  text: {
    marginTop: 100,
    fontFamily: 'DMSans-Regular',
  },
}));

export const AddFinanceInfoScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Profiles</Text>
      <View style={styles.button}>
        <AppButton onPress={() => {}} label="Next" />
      </View>
    </SafeAreaView>
  );
};
