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
import {Asset} from '../../../model/types';
import {AssetType} from '../../../api/types';
import i18n from '../../../locales/i18n';
import {AppRadioButtonGroup} from '../../../components/AppRadioButtonGroup';

type Props = QuestionProps & {asset?: Asset; assetType: AssetType};

const styles = StyleSheet.create(theme => ({
  container: {
    width: UnistylesRuntime.screen.width,
    flexDirection: 'column',
    padding: theme.spacing.m,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonsContainer: {
    maxWidth: 200,
  },
}));

export const AssetQuestion = ({
  goToNextPage,
  userDataUpdated,
  index,
  user,
  requestedPage,
  currentIndex,
  setValidationError,
  assetType,
}: Props) => {
  const [value, setValue] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [keepInPension, setKeepInPension] = useState(false);
  const {t: common} = useTranslation('common');
  const {t} = useTranslation('addFinanceInfoScreen');

  const onUpdate = useCallback(() => {
    if (!isNaN(Number(value))) {
      userDataUpdated(prev => {
        const asset: Asset = {
          ...assetType,
          value: Number(value),
          keepInPension: keepInPension,
          dateModified: new Date(),
          monthlyPayment: isNaN(Number(monthlyContribution))
            ? 0
            : Number(monthlyContribution),
        };
        return {
          ...prev,
          finance: {
            ...prev?.finance,
            assets: prev?.finance?.assets
              ? [...prev?.finance?.assets, asset]
              : [asset],
          },
        };
      });
      return true;
    } else {
      return false;
    }
  }, [assetType, keepInPension, monthlyContribution, userDataUpdated, value]);

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
        {assetType[`question_${i18n.language}` as keyof AssetType]}
      </AppText>

      <Spacing />
      <View style={styles.inputContainer}>
        <AppTextinput
          keyboardType="numeric"
          placeholder={'1000'}
          maxWidth={250}
          value={value}
          onChangeText={val => setValue(val)}
        />
        <AppText weight="bold" size="header1" color="highlight">
          {getDeviceCurrencySymbol(user?.currency)}
        </AppText>
      </View>
      <Spacing size="extraLarge" />
      {assetType.supportsRegularPayments && (
        <>
          <AppText size="header4" style={styles.text}>
            {t('regularPaymentDescription')}
          </AppText>
          <Spacing size="small" />
          <View style={styles.inputContainer}>
            <AppTextinput
              keyboardType="numeric"
              placeholder={'0'}
              maxWidth={250}
              value={monthlyContribution}
              onChangeText={val => setMonthlyContribution(val)}
            />
            <AppText weight="bold" size="header1" color="highlight">
              {getDeviceCurrencySymbol(user?.currency)}
            </AppText>
          </View>
          <Spacing size="large" />
        </>
      )}
      <AppText size="header4" style={styles.text}>
        {t('keepInPensionDescription')}
      </AppText>

      <Spacing />
      <View style={styles.radioButtonsContainer}>
        <AppRadioButtonGroup
          items={[
            {label: common('yes'), value: 'true'},
            {label: common('no'), value: 'false'},
          ]}
          initialIndex={0}
          onPress={v => {
            setKeepInPension(!v);
          }}
        />
      </View>
    </View>
  );
};
