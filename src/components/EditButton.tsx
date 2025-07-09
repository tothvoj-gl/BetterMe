import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Button, View} from 'react-native';
import {pallette} from '../util/colors';
import {StyleSheet} from 'react-native-unistyles';

const styles = StyleSheet.create(() => ({
  button: {marginRight: 10},
}));

type Props = {
  shouldShow: boolean;
};

export const EditButton = ({shouldShow}: Props) => {
  const {t} = useTranslation('screenNames');
  const {t: common} = useTranslation('common');
  const navigation = useNavigation();
  return (
    shouldShow && (
      <View style={styles.button}>
        <Button
          color={pallette.primary900}
          title={common('edit')}
          onPress={() => navigation.navigate(t('AddFinanceInfo'))}
        />
      </View>
    )
  );
};
