import React, {useCallback, useState} from 'react';
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

export const SexQuestion = ({
  goToNextPage,
  user,
  userDataUpdated,
  index,
  requestedPage,
  currentIndex,
  setValidationError,
}: QuestionProps) => {
  const {t} = useTranslation('addFinanceInfoScreen');
  const [sex, setSex] = useState(user?.sex || 'f');

  const validate = useCallback(() => {
    userDataUpdated(prev => ({...prev, sex: sex}));
    return Promise.resolve(true);
  }, [sex, userDataUpdated]);

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
      <AppText weight="bold" size="header3" style={styles.text}>
        {t('sexTitle')}
      </AppText>
      <Spacing size="small" />
      <AppText size="body2" color="light" style={styles.text}>
        {t('sexDescription')}
      </AppText>
      <Spacing />
      <AppRadioButtonGroup
        items={[
          {label: t('female'), value: 'f'},
          {label: t('male'), value: 'm'},
          {label: t('preferNotToSay'), value: 'na'},
        ]}
        initialIndex={sex === 'm' ? 1 : sex === 'na' ? 2 : 0}
        onPress={value => {
          setSex(value);
        }}
      />
    </View>
  );
};
