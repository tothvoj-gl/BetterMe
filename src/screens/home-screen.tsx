import {useEffect} from 'react';
import {Button, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {StyleSheet} from 'react-native-unistyles';

const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.primary,
  },
}));

export const HomeScreen = ({navigation}) => {
  useEffect(() => {
    auth()
      .createUserWithEmailAndPassword('granko87@gmail.com', 'pondelok')
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  });
  return (
    <View style={styles.container}>
      <Button
        title="Go to Jane's profile"
        onPress={() => navigation.navigate('Profile', {name: 'Jane'})}
      />
    </View>
  );
};
