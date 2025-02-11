import {useEffect} from 'react';
import {Button, Image, Pressable, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {StyleSheet} from 'react-native-unistyles';
import LinearGradient from 'react-native-linear-gradient';
import {pallette} from '../ui/colors';

const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.background,
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

export const AppButton = () => {
  return (
    <Pressable>
      {({pressed}) => (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={
            pressed
              ? [pallette.primary900, pallette.secondary900]
              : [pallette.secondary900, pallette.primary900]
          }
          style={styles.linearGradient}>
          <Text style={styles.buttonText}>Let's start</Text>
        </LinearGradient>
      )}
    </Pressable>
  );
};
