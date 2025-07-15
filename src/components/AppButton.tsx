import {Pressable} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import LinearGradient from 'react-native-linear-gradient';
import {pallette} from '../util/colors';
import {AppText} from './AppText';

export type Props = {
  onPress: () => void;
  label: string;
  disabled?: boolean;
  testID?: string;
};

const styles = StyleSheet.create(() => ({
  linearGradient: {
    borderRadius: 5,
    margin: 15,
    width: '80%',
    alignSelf: 'center',
  },
  buttonText: {
    textAlign: 'center',
    margin: 10,
  },
}));

export const AppButton = ({label, onPress, disabled, testID}: Props) => {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      testID={testID}>
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
