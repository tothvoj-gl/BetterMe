import React from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';

const styles = StyleSheet.create(theme => ({
  separator: {width: '100%', height: 1, backgroundColor: theme.colors.border},
}));

export const Separator = () => {
  return <View style={styles.separator} />;
};
