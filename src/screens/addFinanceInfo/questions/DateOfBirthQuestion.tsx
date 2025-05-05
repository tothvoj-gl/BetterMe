import React, {useCallback, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {AppText} from '../../../components/AppText';
import {subYears} from 'date-fns';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {StyleSheet, UnistylesRuntime} from 'react-native-unistyles';
import {Spacing} from '../../../components/Spacing';
import {QuestionProps} from '../AddFinanceInfoScreen';
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
}));
export const DateOfBirthQuestion = ({
  goToNextPage,
  userDataUpdated,
  index,
  requestedPage,
  currentIndex,
  setValidationError,
}: QuestionProps) => {
  const [date, setDate] = useState(subYears(new Date(), 18));
  const {t} = useTranslation('addFinanceInfoScreen');

  const validate = useCallback(() => {
    userDataUpdated(prev => ({...prev, birthDate: date}));
    return Promise.resolve(true);
  }, [date, userDataUpdated]);

  useGoToNextPage({
    index,
    currentIndex,
    requestedPage,
    goToNextPage,
    validate,
    setValidationError,
  });

  return (
    <View style={styles.container}>
      <AppText weight="bold" size="header3">
        {t('dateOfBirthTitle')}
      </AppText>
      <Spacing size="small" />
      <AppText size="body1" color="light" style={styles.text}>
        {t('dateOfBirthDescription')}
      </AppText>
      <Spacing />
      <DatePicker
        date={date}
        onDateChange={setDate}
        mode="date"
        maximumDate={subYears(new Date(), 18)}
        theme="light"
      />
    </View>
  );
};
