import React, {useCallback, useState} from 'react';
import {AppText} from '../../../components/AppText';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {StyleSheet, UnistylesRuntime} from 'react-native-unistyles';
import {Spacing} from '../../../components/Spacing';
import {QuestionProps} from '../AddFinanceInfoScreen';
import {AppTextinput} from '../../../components/AppTextInput';
import {getDeviceCurrencySymbol} from '../../../util/data';
import useGoToNextPage from './useGoToNextPage';
import Slider from '@react-native-community/slider';
import {pallette} from '../../../util/colors';

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
  slider: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export const IncomeQuestion = ({
  goToNextPage,
  userDataUpdated,
  index,
  user,
  requestedPage,
  currentIndex,
  setValidationError,
}: QuestionProps) => {
  const [income, setIncome] = useState('');
  const [incomeGrowthRate, setIncomeGrowthRate] = useState(3);
  const {t} = useTranslation('addFinanceInfoScreen');

  const onUpdate = useCallback(() => {
    if (!isNaN(Number(income))) {
      userDataUpdated(prev => ({
        ...prev,
        finance: {
          ...prev?.finance,
          monthlyNetIncome: Number(income),
          incomeGrowthRate: incomeGrowthRate,
        },
      }));
      return true;
    } else {
      return false;
    }
  }, [income, incomeGrowthRate, userDataUpdated]);

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
        {t('incomeTitle')}
      </AppText>
      <Spacing />
      <AppText size="body2" color="light" style={styles.text}>
        {t('incomeDescription')}
      </AppText>
      <Spacing />
      <View style={styles.inputContainer}>
        <AppTextinput
          keyboardType="numeric"
          placeholder={'1000'}
          maxWidth={250}
          value={income}
          onChangeText={value => setIncome(value)}
        />
        <AppText weight="bold" size="header1" color="highlight">
          {getDeviceCurrencySymbol(user?.currency)}
        </AppText>
      </View>
      <Spacing />
      <AppText weight="bold" size="header3" style={styles.text}>
        {t('averageIncomeGrowthRateTitle')}
      </AppText>
      <Spacing />
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={25}
        value={incomeGrowthRate}
        onValueChange={value => setIncomeGrowthRate(value)}
        minimumTrackTintColor={pallette.secondary900}
        maximumTrackTintColor={pallette.primary900}
        step={1}
      />
      <AppText size="header3" style={styles.text}>
        {incomeGrowthRate}%
      </AppText>
    </View>
  );
};
