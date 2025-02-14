import {Image, View} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {AppButton} from '../../components/button';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    margin: 15,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: theme.colors.background,
    backgroundColor: 'transparent',
  },
}));

export const FinanceScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={require('./img/finance.png')} />
      <AppButton
        onPress={() => navigation.navigate('AddFinanceInfo')}
        label="Let's start"
      />
    </View>
  );
};
