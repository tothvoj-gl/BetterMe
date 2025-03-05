import {Pressable} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import LinearGradient from 'react-native-linear-gradient';
import {pallette} from '../util/colors';
import {AppText} from './text';

export type Props = {
  onPress: () => void;
  label: string;
};

const styles = StyleSheet.create(() => ({
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    margin: 15,
  },
  buttonText: {
    textAlign: 'center',
    margin: 10,
  },
}));

export const AppButton = ({label, onPress}: Props) => {
  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
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
          <AppText style={styles.buttonText} color="secondary">
            {label}
          </AppText>
        </LinearGradient>
      )}
    </Pressable>
  );
};
