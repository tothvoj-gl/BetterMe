import {useEffect} from 'react';
import {Button, Image, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {StyleSheet} from 'react-native-unistyles';

const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.background,
  },
}));

export const FinanceScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image source={require('./img/finance.png')} />
      <Button
        title="Go to Jane's profile"
        onPress={() => navigation.navigate('Profile', {name: 'Jane'})}
      />
    </View>
  );
};
