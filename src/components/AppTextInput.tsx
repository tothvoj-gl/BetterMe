import {
  KeyboardTypeOptions,
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
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions | undefined;
  maxWidth?: number;
  testID?: string;
};

const styles = StyleSheet.create(theme => ({
  input: {
    width: '100%',
    height: 60,
    borderRadius: 14,
    borderWidth: 1,
    fontFamily: 'DMSans-Regular',
    fontSize: 20,
    color: theme.colors.textPrimary,
    borderColor: theme.colors.border,
    padding: theme.spacing.m,
  },
}));

export const AppTextinput = ({
  placeholder,
  value,
  onChangeText,
  onBlur,
  secureTextEntry,
  keyboardType,
  maxWidth,
  testID,
}: Props) => {
  return (
    <TextInput
      testID={testID}
      textAlign="center"
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      placeholderTextColor={pallette.dark700}
      autoCapitalize="none"
      value={value}
      style={[styles.input, {maxWidth: maxWidth}]}
      onChangeText={onChangeText}
      onBlur={onBlur}
    />
  );
};
