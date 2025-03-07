import {View} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';

const styles = StyleSheet.create(theme => ({
  view: {
    variants: {
      size: {
        small: {
          height: theme.spacing.s,
        },
        medium: {
          height: theme.spacing.m,
        },
        large: {
          height: theme.spacing.l,
        },
      },
    },
  },
}));

type Props = {
  size?: 'small' | 'medium' | 'large';
};

export const Spacing = ({size = 'medium'}: Props) => {
  styles.useVariants({
    size,
  });
  return <View style={styles.view} />;
};
