import React, {useCallback, useEffect, useState} from 'react';
import {AppText} from '../../../components/AppText';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {StyleSheet, UnistylesRuntime} from 'react-native-unistyles';
import {Spacing} from '../../../components/Spacing';
import {QuestionProps} from '../AddFinanceInfoScreen';
import {AppTextinput} from '../../../components/AppTextInput';
import {getDeviceCurrencySymbol} from '../../../util/data';
import useGoToNextPage from './useGoToNextPage';

const styles = StyleSheet.create(theme => ({
  container: {
    width: UnistylesRuntime.screen.width,
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing.m,
  },
  text: {
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export const ExpenseQuestion = ({
  goToNextPage,
  userDataUpdated,
  index,
  user,
  requestedPage,
  currentIndex,
  setValidationError,
}: QuestionProps) => {
  const [expense, setExpense] = useState('');
  const {t} = useTranslation('addFinanceInfoScreen');

  const onUpdate = useCallback(() => {
    if (!isNaN(Number(expense))) {
      userDataUpdated(prev => ({
        ...prev,
        finance: {...prev?.finance, monthlyNetExpense: Number(expense)},
      }));
      return true;
    } else {
      return false;
    }
  }, [expense, userDataUpdated]);

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
        {t('expenseTitle')}
      </AppText>
      <Spacing />
      <AppText size="body2" color="light" style={styles.text}>
        {t('expenseDescription')}
      </AppText>
      <Spacing />
      <View style={styles.inputContainer}>
        <AppTextinput
          keyboardType="numeric"
          placeholder={'1000'}
          maxWidth={250}
          value={expense}
          onChangeText={value => setExpense(value)}
        />
        <AppText weight="bold" size="header1" color="highlight">
          {getDeviceCurrencySymbol(user?.currency)}
        </AppText>
      </View>
    </View>
  );
};
