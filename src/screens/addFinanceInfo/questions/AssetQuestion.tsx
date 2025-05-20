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
import {z} from 'zod';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

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
  const {t: common} = useTranslation('common');
  const {t} = useTranslation('addFinanceInfoScreen');

  const existingAsset = user?.finance?.assets?.find(
    asset => asset.id === assetType.id,
  );
  const [keepInPension, setKeepInPension] = useState(
    !!existingAsset?.keepInPension,
  );

  console.log('elizaaa');

  const schema = z
    .object({
      value: z.coerce
        .number({message: t('incomeFieldError')})
        .min(0, t('incomeFieldError')),
      monthlyContribution: z.coerce
        .number({message: t('incomeFieldError')})
        .min(0, t('incomeFieldError')),
    })
    .required();
  type FormData = z.infer<typeof schema>;

  const {
    control,
    trigger,
    getValues,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: existingAsset?.value || 0,
      monthlyContribution: existingAsset?.monthlyPayment || 0,
    },
  });

  const validate = useCallback(async () => {
    const validationResult = await trigger();
    if (validationResult) {
      const value = Number(getValues('value'));
      const monthlyContribution = Number(getValues('monthlyContribution'));
      userDataUpdated(prev => {
        const asset: Asset = {
          ...assetType,
          value: value,
          keepInPension: keepInPension,
          dateModified: new Date(),
          monthlyPayment: monthlyContribution,
        };

        const userAssets = prev?.finance?.assets || [];
        const existingAssetIndex = userAssets.findIndex(
          item => item.id === assetType.id,
        );

        if (existingAssetIndex !== -1) {
          userAssets[existingAssetIndex] = asset;
        } else {
          userAssets.push(asset);
        }

        return {
          ...prev,
          finance: {
            ...prev?.finance,
            assets: userAssets,
          },
        };
      });
      return true;
    } else {
      return false;
    }
  }, [assetType, getValues, keepInPension, trigger, userDataUpdated]);

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
        {assetType[`question_${i18n.language}` as keyof AssetType]}
      </AppText>

      <Spacing />
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <AppTextinput
              keyboardType="numeric"
              placeholder={'1000'}
              maxWidth={250}
              onBlur={onBlur}
              value={String(value)}
              onChangeText={onChange}
            />
          )}
          name="value"
        />
        <AppText weight="bold" size="header1" color="highlight">
          {getDeviceCurrencySymbol(user?.currency)}
        </AppText>
      </View>

      {errors.value && <AppText color="danger">{errors.value.message}</AppText>}

      <Spacing size="extraLarge" />
      {assetType.supportsRegularPayments && (
        <>
          <AppText size="header4" style={styles.text}>
            {t('regularPaymentDescription')}
          </AppText>
          <Spacing size="small" />
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <AppTextinput
                  keyboardType="numeric"
                  placeholder={'0'}
                  maxWidth={250}
                  value={String(value)}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
              name="monthlyContribution"
            />
            <AppText weight="bold" size="header1" color="highlight">
              {getDeviceCurrencySymbol(user?.currency)}
            </AppText>
          </View>

          {errors.value && (
            <AppText color="danger">{errors.value.message}</AppText>
          )}

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
