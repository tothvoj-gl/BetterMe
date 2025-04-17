import React, {useCallback, useEffect, useState} from 'react';
import {AppText} from '../../../components/AppText';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {StyleSheet, UnistylesRuntime} from 'react-native-unistyles';
import {Spacing} from '../../../components/Spacing';
import {QuestionProps} from '../AddFinanceInfoScreen';
import {AppRadioButtonGroup} from '../../../components/AppRadioButtonGroup';
import useGoToNextPage from './useGoToNextPage';

const styles = StyleSheet.create(theme => ({
  container: {
    width: UnistylesRuntime.screen.width,
    flexDirection: 'column',
    padding: theme.spacing.m,
  },
  text: {
    textAlign: 'center',
  },
}));

export const CurrencyQuestion = ({
  goToNextPage,

  userDataUpdated,
  index,
  requestedPage,
  currentIndex,
  setValidationError,
}: QuestionProps) => {
  const {t} = useTranslation('addFinanceInfoScreen');
  const [currency, setCurrency] = useState('EUR');

  const onUpdate = useCallback(() => {
    userDataUpdated(prev => ({...prev, currency: currency}));
    return true;
  }, [currency, userDataUpdated]);

  useGoToNextPage({
    index,
    currentIndex,
    requestedPage,
    goToNextPage,
    onUpdate,
    setValidationError,
  });

  return (
    <View style={styles.container}>
      <AppText weight="bold" size="header3" style={styles.text}>
        {t('currencyTitle')}
      </AppText>

      <Spacing />
      <AppRadioButtonGroup
        items={[
          {label: 'EUR', value: 'EUR'},
          {label: 'USD', value: 'USD'},
          {label: 'GBP', value: 'GBP'},
          {label: 'HUF', value: 'HUF'},
          {label: 'CZK', value: 'CZK'},
          {label: 'PLN', value: 'PLN'},
        ]}
        initialIndex={0}
        onPress={value => {
          setCurrency(value);
        }}
      />
    </View>
  );
};
