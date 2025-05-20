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
import {z} from 'zod';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

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
  const [incomeGrowthRate, setIncomeGrowthRate] = useState(
    user?.finance?.incomeGrowthRate ?? 3,
  );
  const {t} = useTranslation('addFinanceInfoScreen');
  const schema = z
    .object({
      income: z.coerce
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
      income: user?.finance?.monthlyNetIncome ?? 0,
    },
  });

  const validate = useCallback(async () => {
    const validationResult = await trigger('income');
    if (validationResult) {
      const income = Number(getValues('income'));
      console.log({income});

      userDataUpdated(prev => ({
        ...prev,
        finance: {
          ...prev?.finance,
          monthlyNetIncome: income,
          incomeGrowthRate: incomeGrowthRate,
        },
      }));
      return true;
    } else {
      return false;
    }
  }, [getValues, incomeGrowthRate, trigger, userDataUpdated]);

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
        {t('incomeTitle')}
      </AppText>
      <Spacing />
      <AppText size="body2" color="light" style={styles.text}>
        {t('incomeDescription')}
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
          name="income"
        />
        <AppText weight="bold" size="header1" color="highlight">
          {getDeviceCurrencySymbol(user?.currency)}
        </AppText>
      </View>

      {errors.income && (
        <AppText color="danger">{errors.income.message}</AppText>
      )}

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
