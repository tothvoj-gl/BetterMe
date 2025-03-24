import {TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {AppText} from './AppText';

export type Props = {
  onPress: () => void;
  label: string;
  disabled?: boolean;
};

const styles = StyleSheet.create(theme => ({
  button: {
    borderRadius: 5,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.background,
    margin: 15,
    borderWidth: 1,
    width: '80%',
    alignSelf: 'center',
  },
  buttonText: {
    textAlign: 'center',
    margin: 10,
    color: theme.colors.primary,
  },
}));

export const AppButtonOutline = ({label, onPress, disabled}: Props) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      style={styles.button}>
      <AppText style={styles.buttonText} color="secondary">
        {label}
      </AppText>
    </TouchableOpacity>
  );
};
