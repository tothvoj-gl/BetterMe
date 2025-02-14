import {Text, TextStyle} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {ReactNode} from 'react';

type Props = {
  children: ReactNode;
  color?: 'primary' | 'secondary';
  style?: TextStyle;
};

const styles = StyleSheet.create(theme => ({
  text: {
    fontFamily: 'DMSans-Regular',
    fontSize: 18,
    variants: {
      color: {
        primary: {
          color: theme.colors.textPrimary,
        },
        secondary: {
          color: theme.colors.textSecondary,
        },
      },
    },
  },
}));

export const AppText = ({children, style, color = 'primary'}: Props) => {
  styles.useVariants({
    color,
  });
  return <Text style={[styles.text, style]}>{children}</Text>;
};
