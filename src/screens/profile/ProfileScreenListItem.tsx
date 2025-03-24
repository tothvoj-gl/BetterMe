import React from 'react';
import {AppText} from '../../components/AppText';
import {Image, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    padding: theme.spacing.m,
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background,
  },
  image: {
    height: 12,
    width: 12,
    marginRight: theme.spacing.m,
    resizeMode: 'contain',
  },
}));

type Props = {
  onPress: () => void;
  label: string;
};

export const ProfileScreenListItem = ({label, onPress}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <AppText size="body2" weight="semiBold">
        {label}
      </AppText>
      <Image style={styles.image} source={require('./img/arrow.png')} />
    </TouchableOpacity>
  );
};
