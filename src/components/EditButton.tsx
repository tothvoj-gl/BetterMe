import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Button} from 'react-native';

type Props = {
  shouldShow: boolean;
};

export const EditButton = ({shouldShow}: Props) => {
  const {t} = useTranslation('screenNames');
  const {t: common} = useTranslation('common');
  const navigation = useNavigation();
  return (
    shouldShow && (
      <Button
        title={common('edit')}
        onPress={() => navigation.navigate(t('AddFinanceInfo'))}
      />
    )
  );
};
