import {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {pallette} from '../util/colors';

export type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  secureTextEntry?: boolean;
};

const styles = StyleSheet.create(theme => ({
  input: {
    width: '100%',
    height: 60,
    borderRadius: 14,
    borderWidth: 1,
    color: theme.colors.textPrimary,

    borderColor: theme.colors.border,
    marginBottom: theme.spacing.m,
    padding: theme.spacing.m,
  },
  buttonText: {
    textAlign: 'center',
    margin: 10,
  },
}));

export const AppTextinput = ({
  placeholder,
  value,
  onChangeText,
  onBlur,
  secureTextEntry,
}: Props) => {
  return (
    <TextInput
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      placeholderTextColor={pallette.dark700}
      autoCapitalize="none"
      value={value}
      style={styles.input}
      onChangeText={onChangeText}
      onBlur={onBlur}
    />
  );
};
