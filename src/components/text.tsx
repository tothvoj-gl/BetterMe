import {Text, TextStyle} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {ReactNode} from 'react';

type Props = {
  children: ReactNode;
  color?: 'primary' | 'secondary' | 'light' | 'highlight';
  size?:
    | 'body1'
    | 'body2'
    | 'header1'
    | 'header2'
    | 'header3'
    | 'header4'
    | 'header5';
  weight?: 'regular' | 'bold' | 'semiBold';
  style?: TextStyle;
};

const styles = StyleSheet.create(theme => ({
  text: {
    variants: {
      color: {
        primary: {
          color: theme.colors.textPrimary,
        },
        secondary: {
          color: theme.colors.textSecondary,
        },
        light: {
          color: theme.colors.textLight,
        },
        highlight: {
          color: theme.colors.textHighlight,
        },
      },
      size: {
        body1: {
          fontSize: 14,
          lineHeight: 21,
        },
        body2: {
          fontSize: 12,
          lineHeight: 18,
        },
        header1: {
          fontSize: 30,
          lineHeight: 45,
        },
        header2: {
          fontSize: 24,
          lineHeight: 36,
        },
        header3: {
          fontSize: 20,
          lineHeight: 30,
        },
        header4: {
          fontSize: 18,
          lineHeight: 27,
        },
        header5: {
          fontSize: 16,
          lineHeight: 24,
        },
      },
      weight: {
        regular: {
          fontFamily: 'DMSans-Regular',
        },
        bold: {fontFamily: 'DMSans-Bold'},
        semiBold: {fontFamily: 'DMSans-SemiBold'},
      },
    },
  },
}));

export const AppText = ({
  children,
  style,
  color = 'primary',
  size = 'body1',
  weight = 'regular',
}: Props) => {
  styles.useVariants({
    color,
    size,
    weight,
  });
  return <Text style={[styles.text, style]}>{children}</Text>;
};
